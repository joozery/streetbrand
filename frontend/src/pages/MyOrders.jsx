import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBox, FaShoppingBag, FaTruck, FaCheckCircle } from 'react-icons/fa';

export default function MyOrders() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // ดึงคำสั่งซื้อจาก localStorage
    const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    const userOrders = allOrders.filter(order => order.userId === user?.id);
    setOrders(userOrders.reverse()); // แสดงคำสั่งซื้อล่าสุดก่อน
  }, [isAuthenticated, user, navigate]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <FaCheckCircle className="text-green-500" />;
      case 'processing':
        return <FaBox className="text-blue-500" />;
      case 'shipping':
        return <FaTruck className="text-orange-500" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-600" />;
      default:
        return <FaShoppingBag className="text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid':
        return 'ชำระเงินแล้ว';
      case 'processing':
        return 'กำลังดำเนินการ';
      case 'shipping':
        return 'กำลังจัดส่ง';
      case 'delivered':
        return 'จัดส่งสำเร็จ';
      default:
        return 'รอดำเนินการ';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipping':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <FaShoppingBag className="text-gray-300 text-8xl mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">ยังไม่มีคำสั่งซื้อ</h2>
          <p className="text-gray-600 mb-8">เริ่มช้อปปิ้งและสร้างคำสั่งซื้อแรกของคุณเลย!</p>
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">คำสั่งซื้อของฉัน</h1>
          <p className="text-gray-600">ติดตามและจัดการคำสั่งซื้อของคุณ</p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg p-6">
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between mb-6 pb-4 border-b">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">
                      คำสั่งซื้อ #{order.id}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString('th-TH', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">ยอดรวม</p>
                  <p className="text-2xl font-bold">฿{order.total.toLocaleString()}</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                      <div className="flex gap-4 text-sm text-gray-600">
                        {item.selectedSize && <span>ไซส์: {item.selectedSize}</span>}
                        {item.selectedColor && <span>สี: {item.selectedColor}</span>}
                        <span>จำนวน: {item.quantity}</span>
                      </div>
                      <p className="text-sm font-semibold mt-1">
                        ฿{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FaTruck />
                  ข้อมูลการจัดส่ง
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>ชื่อผู้รับ:</strong> {order.shippingInfo.name}</p>
                  <p><strong>เบอร์โทร:</strong> {order.shippingInfo.phone}</p>
                  <p><strong>ที่อยู่:</strong> {order.shippingInfo.address}</p>
                  <p>
                    {order.shippingInfo.city} {order.shippingInfo.postalCode}
                  </p>
                </div>
              </div>

              {/* Order Actions */}
              <div className="flex gap-3">
                <button className="flex-1 border-2 border-black text-black py-2 rounded-lg font-medium hover:bg-gray-50 transition">
                  ดูรายละเอียด
                </button>
                {order.status === 'delivered' && (
                  <button className="flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                    ซื้ออีกครั้ง
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

