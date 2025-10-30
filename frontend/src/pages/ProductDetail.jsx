import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaHeart, FaShare, FaStar } from 'react-icons/fa';
import product1 from '../assets/product1.jpg';

// จำลองข้อมูลสินค้า (ในโปรเจคจริงจะดึงจาก API)
const mockProducts = {
  1: {
    id: 1,
    name: "adidas Samba OG Cloud White Core Black",
    price: 1990,
    originalPrice: 2500,
    sold: "24.3k",
    rating: 4.8,
    reviews: 1234,
    trending: true,
    image: product1,
    description: "รองเท้าผ้าใบคลาสสิกจาก adidas ที่ได้รับความนิยมสูงสุดในขณะนี้ ด้วยดีไซน์ที่เรียบง่ายแต่สะดุดตา เหมาะกับทุกสไตล์การแต่งกาย",
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    colors: ['White/Black', 'All White', 'All Black'],
    features: [
      'วัสดุหนังคุณภาพสูง',
      'พื้นรองเท้ากันลื่น',
      'น้ำหนักเบา สวมใส่สบาย',
      'ทนทานต่อการใช้งาน'
    ]
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // ในโปรเจคจริงจะดึงข้อมูลจาก API ตาม id
  const product = mockProducts[id] || mockProducts[1];

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('กรุณาเลือกไซส์');
      return;
    }
    if (!selectedColor) {
      alert('กรุณาเลือกสี');
      return;
    }

    addToCart({
      ...product,
      selectedSize,
      selectedColor
    }, quantity);

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate('/cart'), 500);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          ✓ เพิ่มสินค้าลงตะกร้าแล้ว
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-6">
          <span className="cursor-pointer hover:text-black" onClick={() => navigate('/')}>
            หน้าแรก
          </span>
          {' > '}
          <span className="cursor-pointer hover:text-black">สินค้า</span>
          {' > '}
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="relative">
              {product.trending && (
                <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  🔥 Trending
                </span>
              )}
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-96 object-contain"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-4 mt-6">
              {[1, 2, 3, 4].map((_, idx) => (
                <div key={idx} className="w-20 h-20 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-black transition">
                  <img src={product.image} alt="" className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                  <span className="ml-2 text-gray-600">{product.rating}</span>
                </div>
                <span className="text-gray-500">({product.reviews} รีวิว)</span>
                <span className="text-gray-500">ขายแล้ว {product.sold}</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-black">฿{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">฿{product.originalPrice.toLocaleString()}</span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-2">รายละเอียดสินค้า</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-3">คุณสมบัติเด่น</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg mb-3">เลือกไซส์</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 border-2 rounded-lg font-medium transition ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold text-lg mb-3">เลือกสี</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-2 border-2 rounded-lg font-medium transition ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-lg mb-3">จำนวน</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-black transition"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:border-black transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white border-2 border-black text-black py-4 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <FaShoppingCart />
                เพิ่มลงตะกร้า
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                ซื้อเลย
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex gap-4">
              <button className="flex-1 border border-gray-300 py-3 rounded-lg hover:border-black transition flex items-center justify-center gap-2">
                <FaHeart className="text-red-500" />
                <span>บันทึก</span>
              </button>
              <button className="flex-1 border border-gray-300 py-3 rounded-lg hover:border-black transition flex items-center justify-center gap-2">
                <FaShare className="text-blue-500" />
                <span>แชร์</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

