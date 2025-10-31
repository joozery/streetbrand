import { useState, useEffect } from 'react';
import { Eye, Search, Download, Truck, CheckCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import api from '../../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [selectedTab]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = selectedTab !== 'all' ? { status: selectedTab } : {};
      const data = await api.getAllOrders(params);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      alert('อัพเดทสถานะไม่สำเร็จ: ' + error.message);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            สำเร็จ
          </Badge>
        );
      case 'processing':
        return <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">กำลังจัดเตรียม</Badge>;
      case 'shipped':
        return (
          <Badge className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 flex items-center gap-1">
            <Truck className="h-3 w-3" />
            จัดส่งแล้ว
          </Badge>
        );
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30">รอดำเนินการ</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTotalRevenue = () => {
    return orders.reduce((sum, order) => sum + parseFloat(order.totalPrice || 0), 0);
  };

  const tabs = [
    { key: 'all', label: 'ทั้งหมด', count: orders.length },
    { key: 'pending', label: 'รอดำเนินการ', count: orders.filter(o => o.status === 'pending').length },
    { key: 'processing', label: 'กำลังจัดเตรียม', count: orders.filter(o => o.status === 'processing').length },
    { key: 'shipped', label: 'จัดส่งแล้ว', count: orders.filter(o => o.status === 'shipped').length },
    { key: 'completed', label: 'สำเร็จ', count: orders.filter(o => o.status === 'completed').length },
  ];

  if (loading && orders.length === 0) {
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
          <h1 className="text-4xl font-bold mb-2 text-gray-900">คำสั่งซื้อ</h1>
          <p className="text-gray-600 text-lg">จัดการและติดตามคำสั่งซื้อของลูกค้า</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
          <Download className="mr-2 h-4 w-4" />
          ส่งออกข้อมูล
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-none text-white">
          <CardContent className="p-6">
            <p className="text-green-100 text-sm mb-1">รายได้รวม</p>
            <p className="text-3xl font-bold">฿{getTotalRevenue().toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-none text-white">
          <CardContent className="p-6">
            <p className="text-blue-100 text-sm mb-1">คำสั่งซื้อทั้งหมด</p>
            <p className="text-3xl font-bold">{orders.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-none text-white">
          <CardContent className="p-6">
            <p className="text-purple-100 text-sm mb-1">ค่าเฉลี่ยต่อออเดอร์</p>
            <p className="text-3xl font-bold">฿{orders.length > 0 ? Math.round(getTotalRevenue() / orders.length).toLocaleString() : '0'}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-none text-white">
          <CardContent className="p-6">
            <p className="text-orange-100 text-sm mb-1">รอดำเนินการ</p>
            <p className="text-3xl font-bold">{orders.filter(o => o.status === 'pending').length}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setSelectedTab}>
        <TabsList className="w-full justify-start">
          {tabs.map(tab => (
            <TabsTrigger key={tab.key} value={tab.key}>
              {tab.label} ({tab.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          {/* Search Bar */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="ค้นหาด้วย รหัสคำสั่งซื้อ, ชื่อลูกค้า, อีเมล..."
                    className="pl-10"
                  />
                </div>
                <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>การชำระเงินทั้งหมด</option>
                  <option>บัตรเครดิต</option>
                  <option>พร้อมเพย์</option>
                  <option>โอนธนาคาร</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">รหัสคำสั่งซื้อ</th>
                      <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">ลูกค้า</th>
                      <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">สินค้า</th>
                      <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">ยอดเงิน</th>
                      <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">การชำระเงิน</th>
                      <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">วันที่</th>
                      <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">สถานะ</th>
                      <th className="text-left text-muted-foreground text-sm font-medium px-6 py-4">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-accent/50 transition">
                        <td className="px-6 py-4">
                          <p className="font-bold">#{order.id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">{order.user?.name || 'N/A'}</p>
                            <p className="text-sm text-muted-foreground">{order.user?.email || 'N/A'}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {order.orderItems?.length || 0} รายการ
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold">฿{parseFloat(order.totalPrice || 0).toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">{order.paymentMethod}</td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('th-TH')}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(order.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <select
                              className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            >
                              <option value="pending">รอดำเนินการ</option>
                              <option value="processing">กำลังจัดเตรียม</option>
                              <option value="shipped">จัดส่งแล้ว</option>
                              <option value="completed">สำเร็จ</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {orders.length === 0 && (
                <div className="p-8 text-center text-muted-foreground">
                  ไม่พบคำสั่งซื้อ
                </div>
              )}

              {/* Pagination */}
              <div className="bg-muted px-6 py-4 flex items-center justify-between border-t">
                <p className="text-muted-foreground text-sm">แสดง {orders.length} คำสั่งซื้อ</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">ก่อนหน้า</Button>
                  <Button variant="default" size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">1</Button>
                  <Button variant="outline" size="sm">ถัดไป</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
