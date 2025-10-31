import { useState, useEffect } from 'react';
import { Plus, Search, Eye, Edit, Trash2, X, Upload, XCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import api from '../../services/api';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    colors: [],
    sizes: [],
    images: [],
  });

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');

  const availableColors = ['ดำ', 'ขาว', 'เทา', 'น้ำเงิน', 'แดง', 'เขียว', 'เหลือง', 'ชมพู', 'ม่วง', 'ส้ม'];
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

  useEffect(() => {
    fetchProducts();
  }, [filterStatus, filterCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (filterStatus !== 'all') params.status = filterStatus;
      if (filterCategory !== 'all') params.category = filterCategory;
      if (searchTerm) params.search = searchTerm;
      
      const data = await api.getProducts(params);
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('โหลดข้อมูลสินค้าไม่สำเร็จ: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProducts();
  };

  const handleDelete = async (id) => {
    if (confirm('คุณต้องการลบสินค้านี้หรือไม่?')) {
      try {
        await api.deleteProduct(id);
        fetchProducts();
        alert('ลบสินค้าสำเร็จ');
      } catch (error) {
        alert('ลบสินค้าไม่สำเร็จ: ' + error.message);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      category: product.category || '',
      price: product.price || '',
      stock: product.stock || '',
      images: product.images || [],
    });
    setSelectedColors(Array.isArray(product.colors) ? product.colors : []);
    setSelectedSizes(Array.isArray(product.sizes) ? product.sizes : []);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      category: '',
      price: '',
      stock: '',
      colors: [],
      sizes: [],
      images: [],
    });
    setSelectedColors([]);
    setSelectedSizes([]);
    setNewColor('');
    setNewSize('');
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      alert('กรุณาเข้าสู่ระบบก่อนอัพโหลดรูปภาพ');
      return;
    }

    setUploading(true);
    try {
      const data = await api.uploadImages(files);
      
      if (data.success) {
        // Get base URL (remove /api from end)
        const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5002';
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, ...data.urls.map(url => `${baseUrl}${url}`)]
        }));
        alert(`อัพโหลดรูปภาพสำเร็จ ${data.count || data.urls.length} รูป`);
      } else {
        alert('อัพโหลดรูปภาพไม่สำเร็จ: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.message || error.message || 'เกิดข้อผิดพลาดในการอัพโหลด';
      alert('อัพโหลดรูปภาพไม่สำเร็จ: ' + errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addColor = (color) => {
    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const removeColor = (color) => {
    setSelectedColors(selectedColors.filter(c => c !== color));
  };

  const addCustomColor = () => {
    if (newColor && !selectedColors.includes(newColor)) {
      setSelectedColors([...selectedColors, newColor]);
      setNewColor('');
    }
  };

  const addSize = (size) => {
    if (!selectedSizes.includes(size)) {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const removeSize = (size) => {
    setSelectedSizes(selectedSizes.filter(s => s !== size));
  };

  const addCustomSize = () => {
    if (newSize && !selectedSizes.includes(newSize)) {
      setSelectedSizes([...selectedSizes, newSize]);
      setNewSize('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        images: formData.images,
        colors: selectedColors,
        sizes: selectedSizes,
      };

      if (editingProduct) {
        await api.updateProduct(editingProduct.id, productData);
        alert('อัพเดทสินค้าสำเร็จ');
      } else {
        await api.createProduct(productData);
        alert('เพิ่มสินค้าสำเร็จ');
      }

      handleCloseModal();
      fetchProducts();
    } catch (error) {
      alert('บันทึกไม่สำเร็จ: ' + error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">พร้อมขาย</Badge>;
      case 'low_stock':
        return <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">สต็อกต่ำ</Badge>;
      case 'out_of_stock':
        return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">สินค้าหมด</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const stats = {
    total: products.length,
    active: products.filter(p => p.status === 'active').length,
    lowStock: products.filter(p => p.status === 'low_stock').length,
    outOfStock: products.filter(p => p.status === 'out_of_stock').length,
  };

  const categories = ['T-Shirts', 'Hoodies', 'Pants', 'Jackets', 'Shoes', 'Accessories'];

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-gray-900">จัดการสินค้า</h1>
          <p className="text-gray-600 text-lg">จัดการสินค้าและคลังสินค้าของคุณ</p>
        </div>
        <Button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="mr-2 h-4 w-4" />
          เพิ่มสินค้า
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm mb-1">สินค้าทั้งหมด</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-green-500/50">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm mb-1">พร้อมขาย</p>
            <p className="text-3xl font-bold text-green-400">{stats.active}</p>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/50">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm mb-1">สต็อกต่ำ</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.lowStock}</p>
          </CardContent>
        </Card>
        <Card className="border-red-500/50">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm mb-1">สินค้าหมด</p>
            <p className="text-3xl font-bold text-red-400">{stats.outOfStock}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[250px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ค้นหาสินค้า..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">สถานะทั้งหมด</option>
              <option value="active">พร้อมขาย</option>
              <option value="low_stock">สต็อกต่ำ</option>
              <option value="out_of_stock">สินค้าหมด</option>
            </select>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="all">หมวดหมู่ทั้งหมด</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <Button onClick={handleSearch} variant="outline">
              <Search className="mr-2 h-4 w-4" />
              ค้นหา
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">สินค้า</th>
                  <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">หมวดหมู่</th>
                  <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">ราคา</th>
                  <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">สต็อก</th>
                  <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">ยอดขาย</th>
                  <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">สถานะ</th>
                  <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">จัดการ</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-accent/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.images && product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg border"
                            onError={(e) => {
                              e.target.src = '';
                              e.target.className = 'w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {product.name?.charAt(0)?.toUpperCase() || 'N'}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{product.category}</td>
                    <td className="px-6 py-4 font-medium">฿{parseFloat(product.price || 0).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${
                        product.stock === 0 ? 'text-red-400' : 
                        product.stock < 10 ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{product.sales || 0}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300" onClick={() => handleDelete(product.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              ไม่พบสินค้า
            </div>
          )}

          {/* Pagination */}
          <div className="bg-muted px-6 py-4 flex items-center justify-between border-t">
            <p className="text-muted-foreground text-sm">แสดง {products.length} สินค้า</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">ก่อนหน้า</Button>
              <Button variant="default" size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">1</Button>
              <Button variant="outline" size="sm">ถัดไป</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{editingProduct ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}</CardTitle>
                  <CardDescription>
                    {editingProduct ? 'แก้ไขข้อมูลสินค้า' : 'กรอกข้อมูลสินค้าใหม่'}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">ชื่อสินค้า *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="เช่น Stussy Basic Tee"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">คำอธิบาย</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="คำอธิบายสินค้า..."
                    rows={4}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">หมวดหมู่ *</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="">เลือกหมวดหมู่</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">ราคา (บาท) *</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="1990"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stock">จำนวนสต็อก *</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="45"
                      min="0"
                      required
                    />
                  </div>
                </div>

                {/* Colors */}
                <div className="space-y-2">
                  <Label>สีที่มี *</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {availableColors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => selectedColors.includes(color) ? removeColor(color) : addColor(color)}
                        className={`px-3 py-1 rounded-full text-sm border transition ${
                          selectedColors.includes(color)
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-white border-gray-300 hover:border-purple-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="เพิ่มสีอื่น (เช่น น้ำตาล)"
                      value={newColor}
                      onChange={(e) => setNewColor(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomColor())}
                      className="flex-1"
                    />
                    <Button type="button" onClick={addCustomColor} variant="outline" size="sm">
                      เพิ่ม
                    </Button>
                  </div>
                  {selectedColors.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedColors.map(color => (
                        <Badge key={color} className="flex items-center gap-1">
                          {color}
                          <XCircle className="h-3 w-3 cursor-pointer" onClick={() => removeColor(color)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sizes */}
                <div className="space-y-2">
                  <Label>ขนาดที่มี *</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => selectedSizes.includes(size) ? removeSize(size) : addSize(size)}
                        className={`px-3 py-1 rounded-full text-sm border transition ${
                          selectedSizes.includes(size)
                            ? 'bg-purple-500 text-white border-purple-500'
                            : 'bg-white border-gray-300 hover:border-purple-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="เพิ่มขนาดอื่น (เช่น 28, 30, 32)"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSize())}
                      className="flex-1"
                    />
                    <Button type="button" onClick={addCustomSize} variant="outline" size="sm">
                      เพิ่ม
                    </Button>
                  </div>
                  {selectedSizes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedSizes.map(size => (
                        <Badge key={size} className="flex items-center gap-1">
                          {size}
                          <XCircle className="h-3 w-3 cursor-pointer" onClick={() => removeSize(size)} />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label>รูปภาพสินค้า *</Label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  <label 
                    htmlFor="image-upload" 
                    className="block cursor-pointer"
                  >
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 hover:bg-purple-50/50 transition-all">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <Button 
                        type="button" 
                        variant="outline" 
                        disabled={uploading}
                        className="min-w-[200px] pointer-events-none"
                        onClick={(e) => e.preventDefault()}
                      >
                        {uploading ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            กำลังอัพโหลด...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            คลิกเพื่อเลือกไฟล์รูปภาพ
                          </>
                        )}
                      </Button>
                    <p className="text-xs text-muted-foreground mt-4">
                      รองรับ JPEG, PNG, GIF, WEBP, AVIF (สูงสุด 5MB ต่อไฟล์)
                    </p>
                    <p className="text-xs text-purple-600 mt-1 font-medium">
                      💡 สามารถเลือกหลายไฟล์ได้พร้อมกัน
                    </p>
                    </div>
                  </label>
                  
                  {/* Preview Images */}
                  {formData.images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        รูปภาพที่เลือก ({formData.images.length} รูป):
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {formData.images.map((imageUrl, index) => (
                          <div key={index} className="relative group border rounded-lg overflow-hidden">
                            <img
                              src={imageUrl}
                              alt={`Product ${index + 1}`}
                              className="w-full h-32 object-cover"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Image%3C/text%3E%3C/svg%3E';
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 opacity-90 hover:opacity-100 transition shadow-lg"
                              title="ลบรูปภาพ"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                              รูป {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 justify-end pt-4 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseModal}
                    disabled={formLoading || uploading}
                  >
                    ยกเลิก
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={formLoading || uploading || selectedColors.length === 0 || selectedSizes.length === 0 || formData.images.length === 0}
                  >
                    {formLoading ? 'กำลังบันทึก...' : editingProduct ? 'อัพเดทสินค้า' : 'เพิ่มสินค้า'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
