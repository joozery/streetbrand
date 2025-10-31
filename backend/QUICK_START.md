# 🚀 Quick Start Guide

## ✅ ขั้นตอนรวดเร็ว (5 นาที)

### 1. ตั้งค่า MySQL (ทำเสร็จแล้ว)
- ✅ MySQL server ทำงานอยู่ (Remote: 145.223.21.117)
- ✅ Database `streetbrand` สร้างแล้ว
- ✅ ไฟล์ `.env` ถูกสร้างและตั้งค่าแล้ว

### 2. สร้างไฟล์ `.env`

ในโฟลเดอร์ `backend/` สร้างไฟล์ชื่อ `.env`:

**สำหรับ Remote Database (Production):**
```env
PORT=5000
DB_NAME=streetbrand
DB_USER=debian-sys-maint
DB_PASSWORD=Str0ngP@ssw0rd!
DB_HOST=145.223.21.117
DB_PORT=3306
JWT_SECRET=streetbrand-secret-key-2024-change-in-production
NODE_ENV=development
```

**สำหรับ Local Database (Development):**
```env
PORT=5000
DB_NAME=streetbrand
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=streetbrand-secret-key-2024-change-in-production
NODE_ENV=development
```

**หมายเหตุ:**
- ไฟล์ `.env` ถูกสร้างไว้แล้วสำหรับ remote database
- ถ้าต้องการใช้ local database ให้เปลี่ยน `DB_HOST=localhost` และ `DB_USER=root`

### 3. ติดตั้ง Dependencies (ถ้ายังไม่ได้ติดตั้ง)

```bash
cd backend
npm install
```

### 4. สร้าง Database (ถ้ายังไม่มี)

```bash
node src/scripts/createDatabase.js
```

จะสร้าง database `streetbrand` บน remote server

### 5. สร้าง Admin User

```bash
node src/scripts/seedAdmin.js
```

จะได้:
- Email: `admin@streetbrand.com`
- Password: `admin123`

### 6. เริ่ม Backend Server

```bash
npm run dev
```

ควรเห็น:
```
✅ MySQL Connected successfully
✅ Database synced
🚀 Server running on port 5000
📍 API: http://localhost:5000/api
```

### 7. ทดสอบ API

เปิด browser ไปที่:
```
http://localhost:5000/api/health
```

ควรเห็น:
```json
{"status":"OK","message":"Server is running"}
```

### 8. เริ่ม Frontend (Terminal ใหม่)

```bash
cd frontend
# สร้างไฟล์ .env
echo "VITE_API_URL=http://localhost:5000/api" > .env

npm install
npm run dev
```

### 9. เปิดเว็บ

- **Frontend:** http://localhost:5173
- **Admin:** http://localhost:5173/admin/login
- **Backend API:** http://localhost:5000/api

## 🔍 ตรวจสอบว่า Database เชื่อมต่อได้

### ดู Tables ที่ถูกสร้าง:

```bash
mysql -u root -e "USE streetbrand; SHOW TABLES;"
```

ควรเห็น:
- `users`
- `products`
- `orders`

### ดูข้อมูลใน Tables:

```bash
# ดู users
mysql -u root -e "USE streetbrand; SELECT id, name, email, role FROM users;"

# ดู products
mysql -u root -e "USE streetbrand; SELECT * FROM products;"

# ดู orders
mysql -u root -e "USE streetbrand; SELECT * FROM orders;"
```

## ❌ ถ้าเกิด Error

### Error: "Access denied for user 'root'@'localhost'"

**แก้ไข:**
1. ใส่ password ใน `.env`: `DB_PASSWORD=your_password`
2. หรือ reset MySQL password (ดูใน SETUP.md)

### Error: "Database 'streetbrand' doesn't exist"

**แก้ไข:**
```bash
mysql -u root -e "CREATE DATABASE streetbrand CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### Error: "Connection refused"

**แก้ไข:**
```bash
# เริ่ม MySQL server
brew services start mysql
```

## 📝 สรุป

1. ✅ MySQL ทำงานอยู่
2. ✅ Database `streetbrand` สร้างแล้ว
3. ⚠️ สร้างไฟล์ `.env` ในโฟลเดอร์ `backend/`
4. ⚠️ รัน `npm install` ใน backend (ถ้ายังไม่ได้ติดตั้ง)
5. ⚠️ รัน `node src/scripts/seedAdmin.js` เพื่อสร้าง admin
6. ⚠️ รัน `npm run dev` เพื่อเริ่ม backend server
7. ⚠️ สร้างไฟล์ `.env` ใน frontend และรัน `npm run dev`

---

**พร้อมใช้งาน! 🎉**

