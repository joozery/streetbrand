import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useEffect } from 'react';

export default function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) return null;

  // Handle different API response structures
  const orderItems = order.orderItems || order.items || [];
  const totalAmount = order.totalAmount || order.totalPrice || order.total || 0;
  const shippingAddress = order.shippingAddress || {};
  const shippingInfo = shippingAddress;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6 animate-bounce">
            <FaCheckCircle className="text-green-500 text-6xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            ชำระเงินสำเร็จ!
          </h1>
          <p className="text-xl text-gray-600">
            ขอบคุณสำหรับการสั่งซื้อ
          </p>
        </div>

        {/* Order Info Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="text-center pb-6 border-b mb-6">
            <p className="text-gray-600 mb-2">หมายเลขคำสั่งซื้อ</p>
            <p className="text-3xl font-bold text-black">#{order.id}</p>
          </div>

          {/* Order Summary */}
          <div className="space-y-4 mb-6 pb-6 border-b">
            <h3 className="font-semibold text-lg">สรุปคำสั่งซื้อ</h3>
            {orderItems.length > 0 ? (
              orderItems.map((item, index) => (
                <div key={item.id || index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name || `สินค้า ${index + 1}`} x {item.quantity || 1}
                  </span>
                  <span className="font-medium">
                    ฿{parseFloat((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">ไม่พบรายการสินค้า</p>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center text-xl font-bold mb-6">
            <span>ยอดรวมทั้งหมด</span>
            <span className="text-2xl">฿{parseFloat(totalAmount).toLocaleString()}</span>
          </div>

          {/* Shipping Info */}
          {shippingAddress && Object.keys(shippingAddress).length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold mb-3">ข้อมูลการจัดส่ง</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {shippingAddress.name && (
                  <p><strong>ชื่อผู้รับ:</strong> {shippingAddress.name}</p>
                )}
                {shippingAddress.phone && (
                  <p><strong>เบอร์โทร:</strong> {shippingAddress.phone}</p>
                )}
                {shippingAddress.address && (
                  <p><strong>ที่อยู่:</strong> {shippingAddress.address}</p>
                )}
                {(shippingAddress.district || shippingAddress.province || shippingAddress.postalCode) && (
                  <p>
                    {shippingAddress.district || ''} 
                    {shippingAddress.province || ''} 
                    {shippingAddress.postalCode || ''}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-900 mb-2">ขั้นตอนถัดไป</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ เราได้รับคำสั่งซื้อของคุณแล้ว</li>
              <li>✓ กำลังดำเนินการจัดเตรียมสินค้า</li>
              <li>✓ จะจัดส่งภายใน 2-3 วันทำการ</li>
              <li>✓ ตรวจสอบสถานะได้ที่ "คำสั่งซื้อของฉัน"</li>
            </ul>
          </div>

          {/* Email Confirmation */}
          {shippingAddress?.name && (
            <p className="text-center text-sm text-gray-500">
              เราได้ส่งอีเมลยืนยันการสั่งซื้อไปยัง {shippingAddress.name} แล้ว
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/my-orders')}
            className="flex-1 bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            ดูคำสั่งซื้อของฉัน
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 border-2 border-black text-black py-4 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            กลับไปช้อปต่อ
          </button>
        </div>
      </div>
    </div>
  );
}

