# Street Brand Backend API

Backend API สำหรับระบบ Street Brand E-commerce (ใช้ MySQL + Sequelize)

## 🚀 Installation

1. ติดตั้ง dependencies:
```bash
cd backend
npm install
```

2. สร้าง Database MySQL:
```sql
CREATE DATABASE streetbrand;
```

3. สร้างไฟล์ `.env`:
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

4. สร้าง Admin User:
```bash
node src/scripts/seedAdmin.js
```

5. รัน server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - สมัครสมาชิก
- `POST /api/auth/login` - ล็อกอิน (Customer)
- `POST /api/auth/admin/login` - ล็อกอิน (Admin)
- `GET /api/auth/me` - ข้อมูลผู้ใช้ปัจจุบัน (ต้องมี Token)

### Products
- `GET /api/products` - ดูสินค้าทั้งหมด
- `GET /api/products/:id` - ดูสินค้าตาม ID
- `POST /api/products` - เพิ่มสินค้า (Admin only)
- `PUT /api/products/:id` - แก้ไขสินค้า (Admin only)
- `DELETE /api/products/:id` - ลบสินค้า (Admin only)

### Orders
- `POST /api/orders` - สร้างคำสั่งซื้อ (ต้องมี Token)
- `GET /api/orders/myorders` - ดูคำสั่งซื้อของตัวเอง
- `GET /api/orders` - ดูคำสั่งซื้อทั้งหมด (Admin only)
- `GET /api/orders/:id` - ดูคำสั่งซื้อตาม ID
- `PUT /api/orders/:id` - อัพเดทสถานะคำสั่งซื้อ (Admin only)

### Users
- `GET /api/users` - ดูผู้ใช้ทั้งหมด (Admin only)
- `GET /api/users/:id` - ดูผู้ใช้ตาม ID (Admin only)
- `PUT /api/users/:id` - แก้ไขผู้ใช้ (Admin only)
- `DELETE /api/users/:id` - ระงับ/เปิดใช้ผู้ใช้ (Admin only)

### Dashboard
- `GET /api/dashboard/stats` - สถิติ Dashboard (Admin only)

## 🔐 Authentication

API endpoints ส่วนใหญ่ต้องใช้ Token (ยกเว้น register, login, get products)

ส่ง Token ใน Header:
```
Authorization: Bearer <your-token>
```

## 📝 Example Request

### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "0812345678"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Admin Login
```bash
POST /api/auth/admin/login
Content-Type: application/json

{
  "username": "admin@streetbrand.com",
  "password": "admin123"
}
```

### Create Product (Admin)
```bash
POST /api/products
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "name": "Stussy Basic Tee",
  "category": "T-Shirts",
  "price": 1990,
  "stock": 45,
  "description": "Premium quality t-shirt"
}
```

## 🗄️ Database Models

### User (users table)
- id, name, email, password, phone
- role: 'customer' | 'admin'
- status: 'active' | 'inactive' | 'blocked'
- totalOrders, totalSpent
- createdAt, updatedAt

### Product (products table)
- id, name, description, category, price, stock
- images (JSON), status, sales
- createdAt, updatedAt

### Order (orders table)
- id, userId, orderItems (JSON), shippingAddress (JSON)
- paymentMethod, totalPrice, status
- paidAt, deliveredAt
- createdAt, updatedAt

## 🔧 Tech Stack

- **Express.js** - Web framework
- **MySQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
