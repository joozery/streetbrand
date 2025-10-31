import { Settings as SettingsIcon, Bell, Shield, Mail, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Separator } from '../../components/ui/separator';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2 text-gray-900">ตั้งค่าระบบ</h1>
        <p className="text-gray-600 text-lg">จัดการการตั้งค่าและการกำหนดค่าระบบ</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                <SettingsIcon className="h-5 w-5 text-white" />
              </div>
              <CardTitle>ทั่วไป</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">ชื่อเว็บไซต์</Label>
              <Input id="siteName" defaultValue="DELTA-SHOP" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">สกุลเงิน</Label>
              <select id="currency" className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>THB (฿)</option>
                <option>USD ($)</option>
              </select>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              บันทึกการเปลี่ยนแปลง
            </Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <CardTitle>การแจ้งเตือน</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer p-3 bg-muted/50 rounded-lg hover:bg-muted transition">
              <span className="text-sm">คำสั่งซื้อใหม่</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-3 bg-muted/50 rounded-lg hover:bg-muted transition">
              <span className="text-sm">แจ้งเตือนสต็อกต่ำ</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer p-3 bg-muted/50 rounded-lg hover:bg-muted transition">
              <span className="text-sm">ลูกค้าใหม่</span>
              <input type="checkbox" className="rounded" />
            </label>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              บันทึกการเปลี่ยนแปลง
            </Button>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <CardTitle>ความปลอดภัย</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full">เปลี่ยนรหัสผ่าน</Button>
            <Button variant="outline" className="w-full">การยืนยันตัวตนแบบ 2 ชั้น</Button>
            <Button variant="outline" className="w-full">ประวัติการเข้าสู่ระบบ</Button>
            <Separator />
            <Button variant="destructive" className="w-full">
              ออกจากระบบทุกอุปกรณ์
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <CardTitle>การตั้งค่าอีเมล</CardTitle>
            </div>
            <CardDescription>กำหนดค่าอีเมลสำหรับระบบ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="adminEmail">อีเมลผู้ดูแลระบบ</Label>
              <Input id="adminEmail" type="email" defaultValue="admin@streetbrand.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notifEmail">อีเมลสำหรับแจ้งเตือน</Label>
              <Input id="notifEmail" type="email" defaultValue="notifications@streetbrand.com" />
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              บันทึกการเปลี่ยนแปลง
            </Button>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <CardTitle>ธีมและการแสดงผล</CardTitle>
            </div>
            <CardDescription>ปรับแต่งรูปลักษณ์ของระบบ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">ธีม</Label>
              <select id="theme" className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option>Dark Mode (โหมดมืด)</option>
                <option>Light Mode (โหมดสว่าง)</option>
                <option>Auto (อัตโนมัติ)</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>สีหลัก</Label>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-lg bg-purple-500 cursor-pointer border-2 border-white"></div>
                <div className="w-10 h-10 rounded-lg bg-pink-500 cursor-pointer"></div>
                <div className="w-10 h-10 rounded-lg bg-blue-500 cursor-pointer"></div>
                <div className="w-10 h-10 rounded-lg bg-green-500 cursor-pointer"></div>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              บันทึกการเปลี่ยนแปลง
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
