import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaCreditCard, FaMapMarkerAlt, FaPhone, FaUser } from 'react-icons/fa';
import visa from '../assets/visa.png';
import mastercard from '../assets/mastercard.png';
import jcb from '../assets/jcb.png';
import amex from '../assets/amex.png';
import omise from '../assets/omise.png';

export default function Payment() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState('creditcard');
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleCardChange = (e) => {
    setCardInfo({
      ...cardInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // จำลองการชำระเงิน
    setTimeout(() => {
      // บันทึกคำสั่งซื้อ
      const order = {
        id: Date.now(),
        userId: user.id,
        items: cartItems,
        total: getCartTotal(),
        shippingInfo,
        paymentMethod,
        status: 'paid',
        createdAt: new Date().toISOString()
      };

      // บันทึกลง localStorage
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      orders.push(order);
      localStorage.setItem('orders', JSON.stringify(orders));

      // ล้างตะกร้า
      clearCart();

      // ไปหน้าสำเร็จ
      navigate('/order-success', { state: { order } });
    }, 2000);
  };

  const shippingCost = 0;
  const total = getCartTotal() + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">ชำระเงิน</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FaMapMarkerAlt />
                  ข้อมูลการจัดส่ง
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อ-นามสกุล
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleShippingChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      เบอร์โทรศัพท์
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={handleShippingChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ที่อยู่
                    </label>
                    <textarea
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      rows="3"
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      จังหวัด
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      รหัสไปรษณีย์
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={shippingInfo.postalCode}
                      onChange={handleShippingChange}
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FaCreditCard />
                  วิธีการชำระเงิน
                </h2>

                {/* Payment Method Selection */}
                <div className="space-y-3 mb-6">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-black transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="creditcard"
                      checked={paymentMethod === 'creditcard'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="flex-1 font-medium">บัตรเครดิต/เดบิต</span>
                    <div className="flex gap-2">
                      <img src={visa} alt="Visa" className="h-6" />
                      <img src={mastercard} alt="Mastercard" className="h-6" />
                      <img src={jcb} alt="JCB" className="h-6" />
                      <img src={amex} alt="Amex" className="h-6" />
                    </div>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-black transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="promptpay"
                      checked={paymentMethod === 'promptpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="flex-1 font-medium">พร้อมเพย์</span>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-black transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="banktransfer"
                      checked={paymentMethod === 'banktransfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <span className="flex-1 font-medium">โอนผ่านธนาคาร</span>
                  </label>
                </div>

                {/* Card Information (only show if credit card selected) */}
                {paymentMethod === 'creditcard' && (
                  <div className="space-y-4 pt-4 border-t">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        หมายเลขบัตร
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardInfo.cardNumber}
                        onChange={handleCardChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ชื่อบนบัตร
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={cardInfo.cardName}
                        onChange={handleCardChange}
                        placeholder="JOHN DOE"
                        className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          วันหมดอายุ
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={cardInfo.expiryDate}
                          onChange={handleCardChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardInfo.cvv}
                          onChange={handleCardChange}
                          placeholder="123"
                          maxLength="3"
                          className="block w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Omise Logo */}
                <div className="mt-6 pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                    <span>ชำระเงินปลอดภัยด้วย</span>
                    <img src={omise} alt="Omise" className="h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">สรุปคำสั่งซื้อ</h2>

                {/* Items */}
                <div className="space-y-3 mb-6 pb-6 border-b max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-500">จำนวน: {item.quantity}</p>
                        <p className="text-sm font-semibold">
                          ฿{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Details */}
                <div className="space-y-3 mb-6 pb-6 border-b">
                  <div className="flex justify-between text-gray-600">
                    <span>ราคาสินค้า</span>
                    <span>฿{getCartTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>ค่าจัดส่ง</span>
                    <span className="text-green-600 font-medium">ฟรี</span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between text-xl font-bold mb-6">
                  <span>ยอดรวมทั้งหมด</span>
                  <span className="text-2xl">฿{total.toLocaleString()}</span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'กำลังประมวลผล...' : 'ยืนยันการชำระเงิน'}
                </button>

                {/* Security Info */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    🔒 การชำระเงินของคุณปลอดภัย<br />เข้ารหัสด้วย SSL/TLS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

