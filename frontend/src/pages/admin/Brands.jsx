import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaEye, FaToggleOn, FaToggleOff, FaImage } from 'react-icons/fa';

export default function Brands() {
  const [showModal, setShowModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const brands = [
    { 
      id: 1, 
      name: 'Stussy', 
      logo: '/src/assets/stussy.png',
      productsCount: 45,
      status: 'active',
      order: 1,
      description: 'Street fashion pioneer since 1980'
    },
    { 
      id: 2, 
      name: 'Anti Social Social Club', 
      logo: '/src/assets/assc.png',
      productsCount: 32,
      status: 'active',
      order: 2,
      description: 'Contemporary streetwear brand'
    },
    { 
      id: 3, 
      name: 'Vlone', 
      logo: '/src/assets/vlone.jpg',
      productsCount: 28,
      status: 'active',
      order: 3,
      description: 'Hip-hop inspired streetwear'
    },
    { 
      id: 4, 
      name: 'Gallery Dept', 
      logo: '/src/assets/gallerydept.webp',
      productsCount: 21,
      status: 'active',
      order: 4,
      description: 'Vintage-inspired streetwear'
    },
    { 
      id: 5, 
      name: 'Denim Tears', 
      logo: '/src/assets/denimtears.png',
      productsCount: 15,
      status: 'inactive',
      order: 5,
      description: 'Cultural commentary through fashion'
    },
    { 
      id: 6, 
      name: 'Amiri', 
      logo: '/src/assets/amiri.png',
      productsCount: 38,
      status: 'active',
      order: 6,
      description: 'Luxury streetwear brand'
    },
  ];

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-500/20 text-green-400 border-green-500/50'
      : 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingBrand(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Brand Management</h1>
          <p className="text-gray-400">Manage your brand portfolio</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          <FaPlus />
          Add Brand
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Brands</p>
          <p className="text-3xl font-bold text-white">{brands.length}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-green-500/50">
          <p className="text-gray-400 text-sm mb-1">Active Brands</p>
          <p className="text-3xl font-bold text-green-400">
            {brands.filter(b => b.status === 'active').length}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold text-white">
            {brands.reduce((sum, b) => sum + b.productsCount, 0)}
          </p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <p className="text-gray-400 text-sm mb-1">Avg Products/Brand</p>
          <p className="text-3xl font-bold text-white">
            {Math.round(brands.reduce((sum, b) => sum + b.productsCount, 0) / brands.length)}
          </p>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <div 
            key={brand.id} 
            className="bg-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition overflow-hidden"
          >
            {/* Brand Logo */}
            <div className="h-48 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-6">
              <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                <div className="text-4xl font-bold text-gray-800">{brand.name.substring(0, 2)}</div>
              </div>
            </div>

            {/* Brand Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{brand.name}</h3>
                  <p className="text-gray-400 text-sm">{brand.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(brand.status)}`}>
                  {brand.status}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 pb-4 border-b border-gray-700">
                <div>
                  <p className="text-gray-400 text-xs mb-1">Products</p>
                  <p className="text-white font-bold text-lg">{brand.productsCount}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Display Order</p>
                  <p className="text-white font-bold text-lg">#{brand.order}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(brand)}
                  className="flex-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 py-2 rounded-lg transition text-sm font-medium flex items-center justify-center gap-2"
                >
                  <FaEdit />
                  Edit
                </button>
                <button className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 py-2 rounded-lg transition text-sm font-medium flex items-center justify-center gap-2">
                  <FaEye />
                  View
                </button>
                <button className="px-3 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {editingBrand ? 'Edit Brand' : 'Add New Brand'}
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Brand Name */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Brand Name *
                </label>
                <input
                  type="text"
                  defaultValue={editingBrand?.name}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter brand name"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={editingBrand?.description}
                  rows="3"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  placeholder="Enter brand description"
                />
              </div>

              {/* Logo Upload */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Brand Logo
                </label>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition cursor-pointer">
                  <FaImage className="text-gray-500 text-4xl mx-auto mb-3" />
                  <p className="text-gray-400 text-sm mb-1">Click to upload logo</p>
                  <p className="text-gray-500 text-xs">PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Display Order */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  defaultValue={editingBrand?.order || brands.length + 1}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                  min="1"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Status
                </label>
                <select 
                  defaultValue={editingBrand?.status || 'active'}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-gray-700 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                {editingBrand ? 'Update Brand' : 'Add Brand'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

