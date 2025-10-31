# 👨‍💼 Admin Dashboard - StreetBrand

## 🎨 ภาพรวม

Admin Dashboard แบบมืออาชีพสำหรับจัดการระบบ E-commerce ด้วย **Modern Dark Theme** ที่เข้ากับธีม Street Brand

## ✨ Features

### 🏠 Dashboard (หน้าแรก)
- **สถิติแบบ Real-time:**
  - Total Revenue (รายได้รวม)
  - Total Orders (จำนวนคำสั่งซื้อ)
  - Total Users (จำนวนผู้ใช้)
  - Total Products (จำนวนสินค้า)
- **Recent Orders Table** - แสดงคำสั่งซื้อล่าสุด
- **Top Products List** - สินค้าขายดี Top 5
- **Revenue Overview Chart** (Placeholder)
- **Sales by Category Chart** (Placeholder)

### 📦 Products Management
- **แสดงรายการสินค้า:** ตารางแสดงสินค้าทั้งหมด
- **Stats Cards:**
  - Total Products
  - Active Products
  - Low Stock Products
  - Out of Stock Products
- **ฟีเจอร์:**
  - 🔍 Search สินค้า
  - 🎯 Filter ตาม Status และ Category
  - ✏️ แก้ไขสินค้า
  - 🗑️ ลบสินค้า
  - 👁️ ดูรายละเอียด
  - ➕ เพิ่มสินค้าใหม่
- **Color-coded Status:**
  - 🟢 Active (สีเขียว)
  - 🟡 Low Stock (สีเหลือง)
  - 🔴 Out of Stock (สีแดง)

### 🛒 Orders Management
- **แสดงคำสั่งซื้อ:** ตารางคำสั่งซื้อทั้งหมด
- **Stats Cards:**
  - Total Revenue
  - Total Orders
  - Average Order Value
  - Pending Orders
- **Tabs System:**
  - All Orders
  - Pending
  - Processing
  - Shipped
  - Completed
- **ฟีเจอร์:**
  - 🔍 Search orders
  - 🎯 Filter by payment method
  - 📊 Status badges
  - 🔄 Update order status
  - 👁️ View details
  - 📥 Export orders

### 👥 Users Management
- **แสดงผู้ใช้:** Card-based layout
- **Stats Cards:**
  - Total Users
  - Active Users
  - Inactive Users
  - Blocked Users
- **ข้อมูลผู้ใช้:**
  - Avatar with gradient
  - Name & Email
  - Phone number
  - Total orders
  - Total spent
  - Join date
- **Actions:**
  - 📧 Send email
  - ✏️ Edit user
  - 🚫 Block/Unblock user

### 📊 Analytics
- **Key Metrics:**
  - Revenue Growth
  - Order Growth
  - Customer Retention
  - Avg Order Value
- **Charts Placeholder:**
  - Sales Trend
  - Revenue by Product
  - Customer Demographics
  - Traffic Sources

### ⚙️ Settings
- **General Settings:** Site name, Currency
- **Notifications:** Toggle alerts
- **Security:** Change password, 2FA

## 🎨 Design System

### Color Palette
```css
Background:
- Gray-900: Main background
- Gray-800: Card background
- Gray-700: Input/Select background
- Black: Sidebar background

Accent Colors:
- White: Primary buttons, active states
- Purple-Pink Gradient: Admin branding
- Green: Success, Active status
- Blue: Info, Processing
- Yellow: Warning, Low stock
- Red: Error, Out of stock
```

### Components
- **Sidebar:** Collapsible, dark black
- **Top Bar:** Search, notifications, admin profile
- **Cards:** Rounded-2xl, border, hover effects
- **Tables:** Hover rows, color-coded statuses
- **Buttons:** Gradient, solid, ghost styles
- **Badges:** Status indicators with icons

### Typography
- **Headers:** Bold, White
- **Body:** Gray-300 to Gray-400
- **Labels:** Gray-400, uppercase in some places

## 🚀 การเข้าถึง Admin

### URL
```
http://localhost:5173/admin/login
```

### Demo Credentials
```
Username: admin
Password: admin123
```

### Admin Routes
| Route | หน้า | รายละเอียด |
|-------|------|-----------|
| `/admin/login` | Login | หน้าเข้าสู่ระบบ Admin |
| `/admin` | Dashboard | หน้าแรก/สถิติ |
| `/admin/products` | Products | จัดการสินค้า |
| `/admin/orders` | Orders | จัดการคำสั่งซื้อ |
| `/admin/users` | Users | จัดการผู้ใช้ |
| `/admin/analytics` | Analytics | กราฟและวิเคราะห์ |
| `/admin/settings` | Settings | ตั้งค่าระบบ |

## 📁 โครงสร้างไฟล์ Admin

```
frontend/src/
├── components/
│   └── admin/
│       └── AdminLayout.jsx       # Layout หลัก (Sidebar + TopBar)
└── pages/
    └── admin/
        ├── AdminLogin.jsx        # หน้า Login
        ├── Dashboard.jsx         # Dashboard หลัก
        ├── Products.jsx          # จัดการสินค้า
        ├── Orders.jsx            # จัดการคำสั่งซื้อ
        ├── Users.jsx             # จัดการผู้ใช้
        ├── Analytics.jsx         # Analytics/กราฟ
        └── Settings.jsx          # Settings
```

## 💡 การใช้งาน

### 1. เข้าสู่ระบบ
```
1. เปิด http://localhost:5173/admin/login
2. กรอก Username: admin
3. กรอก Password: admin123
4. คลิก "Sign In"
```

### 2. Navigation
- **Sidebar:** คลิกที่เมนูต่างๆ เพื่อเปลี่ยนหน้า
- **Toggle Sidebar:** คลิกไอคอน ☰ เพื่อซ่อน/แสดง sidebar
- **Search:** ใช้ search bar บน top bar
- **Logout:** คลิก Logout ที่ด้านล่าง sidebar

### 3. จัดการสินค้า
```
1. ไปที่ Products
2. ใช้ Search หรือ Filter เพื่อหาสินค้า
3. คลิก ✏️ เพื่อแก้ไข
4. คลิก 👁️ เพื่อดูรายละเอียด
5. คลิก ➕ Add Product เพื่อเพิ่มสินค้าใหม่
```

### 4. จัดการคำสั่งซื้อ
```
1. ไปที่ Orders
2. เลือก Tab (All, Pending, Processing, etc.)
3. ดูรายละเอียดคำสั่งซื้อ
4. Update Status ตามต้องการ
5. Export ข้อมูลได้ที่ปุ่ม Export
```

### 5. จัดการผู้ใช้
```
1. ไปที่ Users
2. ดูข้อมูลผู้ใช้ในรูปแบบ Card
3. คลิก 📧 เพื่อส่งอีเมล
4. คลิก ✏️ เพื่อแก้ไขข้อมูล
5. คลิก 🚫 เพื่อ Block/Unblock
```

## 🎯 Key Features

### Responsive Design
- ✅ รองรับทุกขนาดหน้าจอ
- ✅ Mobile-friendly sidebar
- ✅ Collapsible menu

### Professional UI/UX
- ✅ Dark theme สไตล์ Street Brand
- ✅ Smooth transitions & animations
- ✅ Hover effects
- ✅ Color-coded status indicators
- ✅ Clear visual hierarchy

### Data Visualization
- ✅ Stats cards with trends
- ✅ Tables with sorting/filtering
- ✅ Chart placeholders (ready for libraries)
- ✅ Real-time updates (simulated)

### Security
- ✅ Separate admin login
- ✅ Protected routes
- ✅ Session management (localStorage)

## 🔒 Security Notes

**สำหรับ Production:**
1. ใช้ Backend API จริงแทน localStorage
2. Implement JWT authentication
3. Role-based access control (RBAC)
4. Encrypt sensitive data
5. Add rate limiting
6. Enable HTTPS
7. Add activity logs

## 📊 Mock Data

ระบบใช้ Mock Data สำหรับ Demo:
- Products: 8 items
- Orders: 5 items
- Users: 6 items
- Stats: Simulated metrics

**Note:** ในโปรเจคจริง ควรเชื่อมกับ Backend API

## 🎨 Customization

### เปลี่ยนสี Theme
แก้ไขใน `AdminLayout.jsx`:
```javascript
// Sidebar background
className="bg-black" → "bg-gray-900"

// Active menu item
className="bg-white text-black" → "bg-purple-500 text-white"
```

### เพิ่มเมนูใหม่
แก้ไขใน `AdminLayout.jsx`:
```javascript
const menuItems = [
  // ... existing items
  { icon: FaNewIcon, label: 'New Menu', path: '/admin/new-menu' },
];
```

### เปลี่ยน Logo
แก้ไขใน `AdminLayout.jsx`:
```javascript
<h1 className="text-2xl font-bold">YOUR LOGO</h1>
```

## 🚀 Next Steps

### Features ที่ควรเพิ่ม:
- [ ] Chart Library (Chart.js, Recharts)
- [ ] Export to CSV/Excel
- [ ] Bulk actions
- [ ] Advanced filters
- [ ] Image upload for products
- [ ] Rich text editor for descriptions
- [ ] Real-time notifications
- [ ] Activity logs
- [ ] Data backup/restore
- [ ] Email templates
- [ ] SMS notifications
- [ ] Inventory management
- [ ] Promotion/Discount management
- [ ] Shipping management

### Integration:
- [ ] Backend API
- [ ] Database (MongoDB/PostgreSQL)
- [ ] Authentication (JWT)
- [ ] File storage (AWS S3, Cloudinary)
- [ ] Email service (SendGrid)
- [ ] Analytics (Google Analytics)
- [ ] Payment Gateway (Omise)

## 🎓 Best Practices

1. **State Management:** ใช้ Context API หรือ Redux
2. **API Calls:** สร้าง services layer
3. **Error Handling:** ใช้ try-catch และ error boundaries
4. **Loading States:** แสดง skeleton/spinner
5. **Form Validation:** ใช้ library เช่น Yup, Zod
6. **Code Splitting:** Lazy load components
7. **Testing:** เขียน unit tests

## 📝 License

MIT License

---

**Designed & Built with ❤️ for StreetBrand E-commerce**

