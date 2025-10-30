import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    navigate('/payment');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <FaShoppingBag className="text-gray-300 text-8xl mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">ตะกร้าสินค้าว่างเปล่า</h2>
          <p className="text-gray-600 mb-8">คุณยังไม่มีสินค้าในตะกร้า เริ่มช้อปปิ้งเลย!</p>
          <button
            onClick={() => navigate('/')}
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            เริ่มช้อปปิ้ง
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">ตะกร้าสินค้า ({cartItems.length})</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            ล้างตะกร้าทั้งหมด
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        {item.selectedSize && (
                          <p className="text-sm text-gray-600 mb-1">
                            ไซส์: <span className="font-medium">{item.selectedSize}</span>
                          </p>
                        )}
                        {item.selectedColor && (
                          <p className="text-sm text-gray-600 mb-3">
                            สี: <span className="font-medium">{item.selectedColor}</span>
                          </p>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border-2 border-gray-300 rounded-lg hover:border-black transition flex items-center justify-center"
                        >
                          <FaMinus className="text-xs" />
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border-2 border-gray-300 rounded-lg hover:border-black transition flex items-center justify-center"
                        >
                          <FaPlus className="text-xs" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-black">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          ฿{item.price.toLocaleString()} ต่อชิ้น
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">สรุปคำสั่งซื้อ</h2>

              {/* Price Details */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>ราคาสินค้า ({cartItems.length} รายการ)</span>
                  <span>฿{getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ค่าจัดส่ง</span>
                  <span className="text-green-600 font-medium">ฟรี</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>ส่วนลด</span>
                  <span>-฿0</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-xl font-bold mb-6">
                <span>ยอดรวมทั้งหมด</span>
                <span className="text-2xl">฿{getCartTotal().toLocaleString()}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition mb-4"
              >
                ดำเนินการชำระเงิน
              </button>

              {/* Continue Shopping */}
              <button
                onClick={() => navigate('/')}
                className="w-full border-2 border-black text-black py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                ช้อปปิ้งต่อ
              </button>

              {/* Info */}
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  จัดส่งฟรีทั่วประเทศ
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  รับประกันสินค้าแท้ 100%
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  เปลี่ยน-คืนได้ภายใน 7 วัน
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

