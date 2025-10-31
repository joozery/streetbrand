import { useState, useEffect } from 'react';
import { Search, Edit, Ban, CheckCircle, Mail } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import api from '../../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const params = searchTerm ? { search: searchTerm } : {};
      const data = await api.getUsers(params);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchUsers();
  };

  const handleBlock = async (userId, currentStatus) => {
    try {
      await api.blockUser(userId);
      fetchUsers();
    } catch (error) {
      alert('ไม่สามารถเปลี่ยนสถานะได้: ' + error.message);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/30">ใช้งานอยู่</Badge>;
      case 'inactive':
        return <Badge variant="secondary">ไม่ใช้งาน</Badge>;
      case 'blocked':
        return <Badge className="bg-red-500/20 text-red-400 hover:bg-red-500/30">ถูกระงับ</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    blocked: users.filter(u => u.status === 'blocked').length,
  };

  const avatarColors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-rose-500',
    'from-indigo-500 to-purple-500',
  ];

  if (loading && users.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-600">กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-gray-900">จัดการลูกค้า</h1>
        <p className="text-gray-600 text-lg">จัดการบัญชีลูกค้าและกิจกรรม</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm mb-1">ลูกค้าทั้งหมด</p>
            <p className="text-3xl font-bold">{stats.total}</p>
          </CardContent>
        </Card>
        <Card className="border-green-500/50">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm mb-1">ใช้งานอยู่</p>
            <p className="text-3xl font-bold text-green-400">{stats.active}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm mb-1">ไม่ใช้งาน</p>
            <p className="text-3xl font-bold text-muted-foreground">{stats.inactive}</p>
          </CardContent>
        </Card>
        <Card className="border-red-500/50">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-sm mb-1">ถูกระงับ</p>
            <p className="text-3xl font-bold text-red-400">{stats.blocked}</p>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[250px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ค้นหาด้วยชื่อ, อีเมล, เบอร์โทร..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <Button onClick={handleSearch} variant="outline">
              <Search className="mr-2 h-4 w-4" />
              ค้นหา
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => (
          <Card key={user.id} className="hover:border-purple-500/50 transition">
            <CardContent className="p-6">
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className={`h-14 w-14 bg-gradient-to-br ${avatarColors[index % avatarColors.length]}`}>
                    <AvatarFallback className="text-white font-bold text-lg">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                {getStatusBadge(user.status)}
              </div>

              {/* User Details */}
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">เบอร์โทร:</span>
                  <span className="font-medium">{user.phone || '-'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">คำสั่งซื้อ:</span>
                  <span className="font-medium">{user.totalOrders || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ยอดใช้จ่ายรวม:</span>
                  <span className="font-bold text-green-400">฿{parseFloat(user.totalSpent || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">สมัครเมื่อ:</span>
                  <span className="font-medium">{new Date(user.createdAt).toLocaleDateString('th-TH')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  อีเมล
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  แก้ไข
                </Button>
                {user.status === 'active' ? (
                  <Button variant="outline" size="sm" className="text-red-400 hover:text-red-300" onClick={() => handleBlock(user.id, user.status)}>
                    <Ban className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="text-green-400 hover:text-green-300" onClick={() => handleBlock(user.id, user.status)}>
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          ไม่พบผู้ใช้
        </div>
      )}

      {/* Pagination */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
          <p className="text-muted-foreground text-sm">แสดง {users.length} ลูกค้า</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">ก่อนหน้า</Button>
            <Button variant="default" size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">1</Button>
            <Button variant="outline" size="sm">ถัดไป</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
