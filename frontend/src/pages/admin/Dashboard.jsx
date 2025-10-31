import { useEffect, useState } from 'react';
import { ShoppingCart, Users, Package, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import api from '../../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await api.getDashboardStats();
      
      setStats({
        totalRevenue: data.stats.totalRevenue,
        totalOrders: data.stats.totalOrders,
        totalUsers: data.stats.totalUsers,
        totalProducts: data.stats.totalProducts,
      });

      setRecentOrders(data.recentOrders || []);
      setTopProducts(data.topProducts || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = stats ? [
    {
      icon: DollarSign,
      label: 'รายได้รวม',
      value: `฿${parseFloat(stats.totalRevenue || 0).toLocaleString()}`,
      change: '+12.5%',
      trending: 'up',
      bgColor: 'from-green-500 to-emerald-600'
    },
    {
      icon: ShoppingCart,
      label: 'คำสั่งซื้อทั้งหมด',
      value: stats.totalOrders?.toLocaleString() || '0',
      change: '+8.2%',
      trending: 'up',
      bgColor: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Users,
      label: 'ลูกค้าทั้งหมด',
      value: stats.totalUsers?.toLocaleString() || '0',
      change: '+23.1%',
      trending: 'up',
      bgColor: 'from-purple-500 to-pink-600'
    },
    {
      icon: Package,
      label: 'สินค้าทั้งหมด',
      value: stats.totalProducts?.toLocaleString() || '0',
      change: '-2.4%',
      trending: 'down',
      bgColor: 'from-orange-500 to-red-600'
    },
  ] : [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'processing':
        return 'bg-blue-500/20 text-blue-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'สำเร็จ';
      case 'processing':
        return 'กำลังดำเนินการ';
      case 'pending':
        return 'รอดำเนินการ';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">แดชบอร์ด</h1>
        <p className="text-gray-600 text-lg">ยินดีต้อนรับกลับมา! นี่คือสถิติในวันนี้</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.bgColor}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trending === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.trending === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>คำสั่งซื้อล่าสุด</CardTitle>
            <CardDescription>รายการคำสั่งซื้อล่าสุดของคุณ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length > 0 ? recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold">#{order.id}</p>
                      <p className="text-sm text-muted-foreground">{order.user?.name || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-semibold">฿{parseFloat(order.totalPrice || 0).toLocaleString()}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                </div>
              )) : (
                <p className="text-muted-foreground text-center py-8">ไม่มีคำสั่งซื้อ</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>สินค้าขายดี</CardTitle>
            <CardDescription>สินค้าที่ขายดีที่สุดในเดือนนี้</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.length > 0 ? topProducts.map((product, index) => (
                <div key={product.id} className="flex items-center justify-between pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="font-medium">{product.name}</p>
                  </div>
                  <p className="font-bold text-muted-foreground">{product.sales || 0}</p>
                </div>
              )) : (
                <p className="text-muted-foreground text-center py-8">ไม่มีข้อมูลสินค้า</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ภาพรวมรายได้</CardTitle>
            <CardDescription>แนวโน้มรายได้ในช่วง 12 เดือนที่ผ่านมา</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">กราฟแสดงแนวโน้มรายได้</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ยอดขายแยกตามหมวดหมู่</CardTitle>
            <CardDescription>สัดส่วนการขายแยกตามหมวดหมู่สินค้า</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">กราฟแสดงสัดส่วนหมวดหมู่</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
