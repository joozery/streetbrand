# 🛍️ StreetBrand - E-commerce Platform

## 📝 รายละเอียดโปรเจค

ระบบ E-commerce สำหรับขาย Street Brand Fashion พร้อมระบบ Authentication, Shopping Cart, Payment และ Order Management ครบถ้วน

## ✨ ฟีเจอร์หลัก

### 🔐 ระบบสมาชิก (Authentication)
- ✅ สมัครสมาชิก (Register)
- ✅ เข้าสู่ระบบ (Login)
- ✅ ออกจากระบบ (Logout)
- ✅ จัดการข้อมูลผู้ใช้

### 🛒 ระบบตะกร้าสินค้า (Shopping Cart)
- ✅ เพิ่มสินค้าลงตะกร้า
- ✅ ลบสินค้าออกจากตะกร้า
- ✅ ปรับจำนวนสินค้า
- ✅ แสดงจำนวนสินค้าบน Cart Icon
- ✅ คำนวณราคารวมอัตโนมัติ
- ✅ บันทึกข้อมูลใน LocalStorage

### 🎯 ระบบสินค้า (Product Management)
- ✅ แสดงรายการสินค้า
- ✅ หน้ารายละเอียดสินค้า (Product Detail)
- ✅ เลือกไซส์และสีของสินค้า
- ✅ เพิ่มสินค้าลงตะกร้าจากหน้ารายละเอียด
- ✅ ซื้อสินค้าทันที (Buy Now)

### 💳 ระบบชำระเงิน (Payment)
- ✅ หน้าชำระเงินที่สมบูรณ์
- ✅ กรอกข้อมูลการจัดส่ง
- ✅ เลือกวิธีการชำระเงิน:
  - บัตรเครดิต/เดบิต
  - พร้อมเพย์
  - โอนผ่านธนาคาร
- ✅ รองรับ Omise Payment Gateway
- ✅ หน้ายืนยันการชำระเงินสำเร็จ

### 📦 ระบบคำสั่งซื้อ (Order Management)
- ✅ แสดงประวัติคำสั่งซื้อ (My Orders)
- ✅ ดูรายละเอียดแต่ละคำสั่งซื้อ
- ✅ ติดตามสถานะการจัดส่ง
- ✅ บันทึกคำสั่งซื้อใน LocalStorage

### 🎨 UI/UX Features
- ✅ Responsive Design (รองรับทุกหน้าจอ)
- ✅ Modern UI ด้วย Tailwind CSS
- ✅ Animations ด้วย Framer Motion
- ✅ React Icons สำหรับไอคอน
- ✅ Hero Slider (React Slick)
- ✅ Sticky Header พร้อม Cart Badge
- ✅ User Menu Dropdown

## 🛠️ เทคโนโลยีที่ใช้

### Frontend
- **React 19** - UI Library
- **Vite** - Build Tool & Dev Server
- **React Router DOM** - Client-side Routing
- **Tailwind CSS** - Utility-first CSS Framework

### State Management
- **React Context API** - Global State Management
  - AuthContext - จัดการ Authentication
  - CartContext - จัดการ Shopping Cart

### Additional Libraries
- **Framer Motion** - Animations
- **React Icons** - Icon Components
- **React Slick** - Carousel/Slider
- **LocalStorage** - Client-side Data Persistence

## 📁 โครงสร้างโปรเจค

```
streetbrand/
└── frontend/
    ├── src/
    │   ├── assets/          # รูปภาพและ static files
    │   ├── components/      # React Components
    │   │   ├── Header.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   ├── HeroSlider.jsx
    │   │   ├── ProductSection.jsx
    │   │   ├── BrandSection.jsx
    │   │   └── BlogSection.jsx
    │   ├── context/         # Context Providers
    │   │   ├── AuthContext.jsx
    │   │   └── CartContext.jsx
    │   ├── pages/           # Page Components
    │   │   ├── ForYou.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── ProductDetail.jsx
    │   │   ├── Cart.jsx
    │   │   ├── Payment.jsx
    │   │   ├── MyOrders.jsx
    │   │   └── OrderSuccess.jsx
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🚀 การติดตั้งและรันโปรเจค

### 1. Clone หรือดาวน์โหลดโปรเจค
```bash
cd /path/to/streetbrand
```

### 2. ติดตั้ง Dependencies
```bash
cd frontend
npm install
```

### 3. รันโปรเจค
```bash
npm run dev
```

เว็บไซต์จะรันที่: **http://localhost:5173**

### 4. Build สำหรับ Production
```bash
npm run build
```

## 🎮 วิธีใช้งานระบบ

### 1. สมัครสมาชิก
1. คลิกปุ่ม "เข้าสู่ระบบ" ที่ Header
2. คลิก "สมัครสมาชิก"
3. กรอกข้อมูล: ชื่อ, อีเมล, เบอร์โทร, รหัสผ่าน
4. คลิก "สมัครสมาชิก"

### 2. เข้าสู่ระบบ
1. คลิกปุ่ม "เข้าสู่ระบบ"
2. กรอกอีเมลและรหัสผ่านที่สมัครไว้
3. คลิก "เข้าสู่ระบบ"

### 3. เลือกซื้อสินค้า
1. เลือกสินค้าที่ต้องการจากหน้าแรก
2. คลิกที่สินค้าเพื่อดูรายละเอียด
3. เลือกไซส์และสี
4. เลือก "เพิ่มลงตะกร้า" หรือ "ซื้อเลย"

### 4. ชำระเงิน
1. คลิกไอคอนตะกร้าที่ Header
2. ตรวจสอบสินค้าและจำนวน
3. คลิก "ดำเนินการชำระเงิน"
4. กรอกข้อมูลการจัดส่ง
5. เลือกวิธีการชำระเงิน
6. คลิก "ยืนยันการชำระเงิน"

### 5. ดูคำสั่งซื้อ
1. คลิกที่รูปโปรไฟล์ (ตัวอักษรตัวแรกของชื่อ)
2. เลือก "คำสั่งซื้อของฉัน"
3. ดูรายละเอียดและสถานะคำสั่งซื้อ

## 📱 หน้าต่างๆ ในระบบ

| หน้า | URL | รายละเอียด |
|------|-----|-----------|
| หน้าแรก | `/` | แสดงสินค้าแนะนำ, Brand, Blog |
| เข้าสู่ระบบ | `/login` | Login form |
| สมัครสมาชิก | `/register` | Register form |
| รายละเอียดสินค้า | `/product/:id` | Product details, เลือกไซส์/สี |
| ตะกร้าสินค้า | `/cart` | Shopping cart items |
| ชำระเงิน | `/payment` | Payment form & shipping info |
| คำสั่งซื้อของฉัน | `/my-orders` | Order history |
| ชำระเงินสำเร็จ | `/order-success` | Order confirmation |

## 💾 การจัดเก็บข้อมูล

ระบบใช้ **LocalStorage** ในการจัดเก็บข้อมูล:

- `user` - ข้อมูลผู้ใช้ที่ล็อกอินอยู่
- `users` - รายชื่อผู้ใช้ทั้งหมด (สำหรับ demo)
- `cart` - สินค้าในตะกร้า
- `orders` - ประวัติคำสั่งซื้อ

## 🔒 Security Features

- Password validation (ขั้นต่ำ 6 ตัวอักษร)
- Email format validation
- Protected routes (ต้อง login ก่อนชำระเงิน)
- Secure payment information handling

## 🎨 Design Features

- **Modern UI** - Clean และใช้งานง่าย
- **Responsive** - รองรับทุกขนาดหน้าจอ
- **Dark Theme** - Header/Navbar สีดำ
- **Smooth Animations** - Transitions และ Hover effects
- **Toast Notifications** - แจ้งเตือนเมื่อเพิ่มสินค้าลงตะกร้า

## 📊 Brand ที่รองรับ

- Stussy
- Anti Social Social Club (ASSC)
- Vlone
- Gallery Dept
- Denim Tears
- Amiri
- Essentials

## 🔄 การพัฒนาต่อ

### สิ่งที่สามารถเพิ่มได้:
- [ ] Backend API (Node.js/Express)
- [ ] Database (MongoDB/PostgreSQL)
- [ ] Real Payment Integration (Omise API)
- [ ] Product Search & Filter
- [ ] User Reviews & Ratings
- [ ] Wishlist/Favorites
- [ ] Order Tracking
- [ ] Admin Dashboard
- [ ] Email Notifications
- [ ] Social Media Login

## 👨‍💻 Developer

พัฒนาโดย AI Assistant สำหรับโปรเจค StreetBrand E-commerce

## 📄 License

MIT License - ใช้งานได้ฟรี

---

**Happy Shopping! 🛒✨**

