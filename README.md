# 🛍️ StreetBrand - E-commerce Platform

ระบบ E-commerce สำหรับขาย Street Brand Fashion พร้อมระบบ Backend API (Node.js + MySQL) และ Frontend (React + Vite)

## 📝 รายละเอียดโปรเจค

### Frontend
- React + Vite
- Tailwind CSS + shadcn/ui
- React Router DOM
- Context API (Auth, Cart)
- API Integration

### Backend
- Node.js + Express.js
- MySQL + Sequelize (ORM)
- JWT Authentication
- RESTful API

## ✨ ฟีเจอร์หลัก

### 🔐 ระบบสมาชิก (Authentication)
- ✅ สมัครสมาชิก (Register) - เชื่อมต่อ Backend
- ✅ เข้าสู่ระบบ (Login) - Customer & Admin
- ✅ ออกจากระบบ (Logout)
- ✅ จัดการข้อมูลผู้ใช้

### 🛒 ระบบตะกร้าสินค้า (Shopping Cart)
- ✅ เพิ่มสินค้าลงตะกร้า
- ✅ ลบสินค้าออกจากตะกร้า
- ✅ ปรับจำนวนสินค้า
- ✅ แสดงจำนวนสินค้าบน Cart Icon
- ✅ คำนวณราคารวมอัตโนมัติ

### 🎯 ระบบสินค้า (Product Management)
- ✅ แสดงรายการสินค้า - ดึงจาก Backend API
- ✅ หน้ารายละเอียดสินค้า (Product Detail)
- ✅ เพิ่มสินค้าลงตะกร้าจากหน้ารายละเอียด
- ✅ Admin: CRUD Products

### 💳 ระบบชำระเงิน (Payment)
- ✅ หน้าชำระเงินที่สมบูรณ์
- ✅ กรอกข้อมูลการจัดส่ง
- ✅ เลือกวิธีการชำระเงิน
- ✅ สร้าง Order ผ่าน Backend API
- ✅ หน้ายืนยันการชำระเงินสำเร็จ

### 📦 ระบบคำสั่งซื้อ (Order Management)
- ✅ แสดงประวัติคำสั่งซื้อ (My Orders) - ดึงจาก API
- ✅ Admin: จัดการคำสั่งซื้อทั้งหมด
- ✅ อัพเดทสถานะคำสั่งซื้อ
- ✅ ติดตามสถานะการจัดส่ง

### 🎨 ระบบจัดการหลังบ้าน (Admin Dashboard)
- ✅ Dashboard - สถิติและกราฟ
- ✅ จัดการสินค้า (Products) - CRUD
- ✅ จัดการคำสั่งซื้อ (Orders)
- ✅ จัดการลูกค้า (Users)
- ✅ วิเคราะห์ข้อมูล (Analytics)
- ✅ ตั้งค่าระบบ (Settings)
- ✅ UI สวยงามด้วย shadcn/ui
- ✅ Responsive Design

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **React 19** - UI Library
- **Vite** - Build Tool & Dev Server
- **React Router DOM** - Client-side Routing
- **Tailwind CSS** - Utility-first CSS Framework
- **shadcn/ui** - UI Components
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **Express.js** - Web Framework
- **MySQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing

### State Management
- **React Context API** - Global State Management
  - AuthContext - จัดการ Authentication
  - CartContext - จัดการ Shopping Cart

## 📁 โครงสร้างโปรเจค

```
streetbrand/
├── frontend/
│   ├── src/
│   │   ├── assets/          # รูปภาพและ static files
│   │   ├── components/      # React Components
│   │   │   ├── ui/          # shadcn/ui components
│   │   │   ├── admin/       # Admin components
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/         # Context Providers
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/           # Page Components
│   │   │   ├── admin/       # Admin pages
│   │   │   ├── ForYou.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ...
│   │   ├── services/        # API Services
│   │   │   └── api.js
│   │   ├── config/          # Config files
│   │   │   └── api.js
│   │   └── App.jsx
│   └── package.json
└── backend/
    ├── src/
    │   ├── config/          # Database config
    │   ├── controllers/     # Route controllers
    │   ├── middleware/      # Auth & Error handlers
    │   ├── models/          # Sequelize models
    │   ├── routes/          # API routes
    │   └── server.js        # Main server file
    └── package.json
```

## 🚀 การติดตั้งและรันโปรเจค

### Backend Setup

1. **ติดตั้ง Dependencies:**
```bash
cd backend
npm install
```

2. **สร้าง MySQL Database:**
```sql
CREATE DATABASE streetbrand;
```

3. **สร้างไฟล์ `.env`:**
```env
PORT=5000
DB_NAME=streetbrand
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=your-super-secret-jwt-key-change-in-production
NODE_ENV=development
```

4. **สร้าง Admin User:**
```bash
node src/scripts/seedAdmin.js
```

5. **เริ่ม Backend Server:**
```bash
npm run dev
```

Backend จะรันที่: **http://localhost:5000**

### Frontend Setup

1. **ติดตั้ง Dependencies:**
```bash
cd frontend
npm install
```

2. **สร้างไฟล์ `.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

3. **รัน Frontend:**
```bash
npm run dev
```

Frontend จะรันที่: **http://localhost:5173**

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - สมัครสมาชิก
- `POST /api/auth/login` - ล็อกอิน Customer
- `POST /api/auth/admin/login` - ล็อกอิน Admin
- `GET /api/auth/me` - ข้อมูลผู้ใช้ปัจจุบัน

### Products
- `GET /api/products` - ดูสินค้าทั้งหมด
- `GET /api/products/:id` - ดูสินค้าตาม ID
- `POST /api/products` - เพิ่มสินค้า (Admin)
- `PUT /api/products/:id` - แก้ไขสินค้า (Admin)
- `DELETE /api/products/:id` - ลบสินค้า (Admin)

### Orders
- `POST /api/orders` - สร้างคำสั่งซื้อ
- `GET /api/orders/myorders` - ดูคำสั่งซื้อของตัวเอง
- `GET /api/orders` - ดูคำสั่งซื้อทั้งหมด (Admin)
- `GET /api/orders/:id` - ดูคำสั่งซื้อตาม ID
- `PUT /api/orders/:id` - อัพเดทสถานะ (Admin)

### Users
- `GET /api/users` - ดูผู้ใช้ทั้งหมด (Admin)
- `GET /api/users/:id` - ดูผู้ใช้ตาม ID (Admin)
- `PUT /api/users/:id` - แก้ไขผู้ใช้ (Admin)
- `DELETE /api/users/:id` - ระงับ/เปิดใช้ผู้ใช้ (Admin)

### Dashboard
- `GET /api/dashboard/stats` - สถิติ Dashboard (Admin)

## 🔐 Authentication

API endpoints ส่วนใหญ่ต้องใช้ Token (ยกเว้น register, login, get products)

ส่ง Token ใน Header:
```
Authorization: Bearer <your-token>
```

## 👤 Admin Login

**URL:** http://localhost:5173/admin/login

**ข้อมูลทดสอบ:**
- Username: `admin@streetbrand.com` หรือ `admin`
- Password: `admin123`

## 📱 หน้าต่างๆ ในระบบ

| หน้า | URL | รายละเอียด |
|------|-----|-----------|
| หน้าแรก | `/` | แสดงสินค้าแนะนำ, Brand, Blog |
| เข้าสู่ระบบ | `/login` | Login form |
| สมัครสมาชิก | `/register` | Register form |
| รายละเอียดสินค้า | `/product/:id` | Product details |
| ตะกร้าสินค้า | `/cart` | Shopping cart items |
| ชำระเงิน | `/payment` | Payment form & shipping info |
| คำสั่งซื้อของฉัน | `/my-orders` | Order history |
| ชำระเงินสำเร็จ | `/order-success` | Order confirmation |
| Admin Dashboard | `/admin` | Admin dashboard |
| Admin Products | `/admin/products` | จัดการสินค้า |
| Admin Orders | `/admin/orders` | จัดการคำสั่งซื้อ |
| Admin Users | `/admin/users` | จัดการลูกค้า |
| Admin Analytics | `/admin/analytics` | วิเคราะห์ข้อมูล |
| Admin Settings | `/admin/settings` | ตั้งค่าระบบ |

## 💾 Database Schema

### Users (users table)
- id, name, email, password, phone
- role: 'customer' | 'admin'
- status: 'active' | 'inactive' | 'blocked'
- totalOrders, totalSpent
- createdAt, updatedAt

### Products (products table)
- id, name, description, category, price, stock
- images (JSON), status, sales
- createdAt, updatedAt

### Orders (orders table)
- id, userId, orderItems (JSON), shippingAddress (JSON)
- paymentMethod, totalPrice, status
- paidAt, deliveredAt
- createdAt, updatedAt

## 🎨 Design Features

- **Modern UI** - Clean และใช้งานง่าย
- **Responsive** - รองรับทุกขนาดหน้าจอ
- **shadcn/ui** - Professional UI Components
- **Light Theme** - พื้นหลังสีขาว
- **Smooth Animations** - Transitions และ Hover effects
- **No Scrollbar** - UX ที่สะอาดตา

## 📊 Brand ที่รองรับ

- Stussy
- Anti Social Social Club (ASSC)
- Vlone
- Gallery Dept
- Denim Tears
- Amiri
- Essentials
- Supreme

## 🔄 การพัฒนาต่อ

### สิ่งที่สามารถเพิ่มได้:
- [ ] Real Payment Integration (Omise API)
- [ ] Product Search & Filter ขั้นสูง
- [ ] User Reviews & Ratings
- [ ] Wishlist/Favorites
- [ ] Order Tracking แบบ Real-time
- [ ] Email Notifications
- [ ] Social Media Login
- [ ] Image Upload สำหรับสินค้า
- [ ] Inventory Management
- [ ] Discount & Coupon System

## 👨‍💻 Developer

พัฒนาโดย AI Assistant สำหรับโปรเจค StreetBrand E-commerce

## 📄 License

MIT License - ใช้งานได้ฟรี

---

**Happy Shopping! 🛒✨**
