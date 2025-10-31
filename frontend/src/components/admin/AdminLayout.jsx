import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, Package, ShoppingCart, Users, BarChart3, Settings, 
  Menu, X, Search, Bell, LogOut, ChevronLeft, ChevronRight,
  Tag, Image, FileText, List, Warehouse, Percent, Truck, Star, FileBarChart
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { cn } from '../../lib/utils';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: 'แดชบอร์ด', path: '/admin' },
    { icon: Package, label: 'สินค้า', path: '/admin/products' },
    { icon: ShoppingCart, label: 'คำสั่งซื้อ', path: '/admin/orders' },
    { icon: Users, label: 'ลูกค้า', path: '/admin/users' },
    { icon: BarChart3, label: 'วิเคราะห์', path: '/admin/analytics' },
  ];

  // Simplify: hide secondary sections to avoid duplicated/overlapping management screens

  const handleLogout = () => {
    if (confirm('คุณต้องการออกจากระบบ Admin?')) {
      navigate('/admin/login');
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className={cn(
        "bg-card border-r transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-64" : "w-20"
      )}>
        {/* Logo */}
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            {sidebarOpen ? (
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  แอดมิน
                </h1>
                <p className="text-xs text-gray-500 mt-1">ระบบจัดการหลังบ้าน</p>
              </div>
            ) : (
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">A</h1>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              onClick={() => navigate(item.path)}
              variant={location.pathname === item.path ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-4",
                location.pathname === item.path && "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              )}
            >
              <item.icon className="h-5 w-5" />
              {sidebarOpen && <span>{item.label}</span>}
            </Button>
          ))}

          {sidebarOpen && <Separator className="my-2" />}

          <Button
            onClick={() => navigate('/admin/settings')}
            variant={location.pathname === '/admin/settings' ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-4",
              location.pathname === '/admin/settings' && "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
            )}
          >
            <Settings className="h-5 w-5" />
            {sidebarOpen && <span>ตั้งค่า</span>}
          </Button>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start gap-4 text-red-400 hover:text-red-300 hover:bg-red-500/20"
          >
            <LogOut className="h-5 w-5" />
            {sidebarOpen && <span>ออกจากระบบ</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-card border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </Button>

              {/* Search Bar */}
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="ค้นหา..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* Admin Profile */}
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="text-right">
                  <p className="text-sm font-semibold">ผู้ดูแลระบบ</p>
                  <p className="text-xs text-muted-foreground">Admin</p>
                </div>
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold">
                    A
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
