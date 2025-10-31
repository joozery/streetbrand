# 🗄️ MySQL Setup Guide

## ขั้นตอนการตั้งค่า MySQL

### 1. ตรวจสอบ MySQL
```bash
# ตรวจสอบว่า MySQL ติดตั้งแล้ว
mysql --version

# ตรวจสอบว่า MySQL server กำลังทำงาน
brew services list | grep mysql
```

### 2. เริ่ม MySQL Server (ถ้ายังไม่ทำงาน)
```bash
# เริ่ม MySQL service
brew services start mysql

# หรือรัน MySQL โดยตรง
mysql.server start
```

### 3. สร้าง Database

**วิธีที่ 1: ใช้ MySQL CLI**
```bash
mysql -u root -p
```

จากนั้นรัน SQL:
```sql
CREATE DATABASE streetbrand CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

**วิธีที่ 2: ใช้ script (แนะนำ)**
```bash
cd backend
mysql -u root -e "CREATE DATABASE IF NOT EXISTS streetbrand CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 4. ตั้งค่า .env

สร้างไฟล์ `backend/.env`:
```env
PORT=5000
DB_NAME=streetbrand
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=your-super-secret-jwt-key-change-in-production-please-change-this
NODE_ENV=development
```

**หมายเหตุ:**
- `DB_PASSWORD` ถ้า MySQL root ไม่มี password ให้เว้นว่างไว้
- ถ้ามี password ให้ใส่ password ของคุณ

### 5. ติดตั้ง Dependencies และเริ่ม Server

```bash
cd backend
npm install
npm run dev
```

### 6. สร้าง Admin User

เปิด terminal ใหม่:
```bash
cd backend
node src/scripts/seedAdmin.js
```

### 7. ทดสอบการเชื่อมต่อ

เปิด browser ไปที่:
```
http://localhost:5000/api/health
```

ควรจะเห็น:
```json
{"status":"OK","message":"Server is running"}
```

## 🔧 Troubleshooting

### MySQL ไม่มี password
ถ้า MySQL root ไม่มี password ให้ใส่ `DB_PASSWORD=` (เว้นว่าง) ในไฟล์ `.env`

### MySQL มี password
ถ้า MySQL root มี password ให้ใส่ password ใน `DB_PASSWORD=your_password`

### เช็ค MySQL Connection
```bash
mysql -u root -p
# Enter password (ถ้ามี)
# ถ้าเชื่อมต่อได้แสดงว่า MySQL ทำงานปกติ
```

### Reset MySQL Password
```bash
# หยุด MySQL
brew services stop mysql

# Start MySQL in safe mode
mysqld_safe --skip-grant-tables &

# Connect และ reset password
mysql -u root
USE mysql;
UPDATE user SET authentication_string=PASSWORD('newpassword') WHERE User='root';
FLUSH PRIVILEGES;
EXIT;

# Restart MySQL
brew services restart mysql
```

### ดู Database ที่มีอยู่
```bash
mysql -u root -e "SHOW DATABASES;"
```

### ดู Tables ใน Database
```bash
mysql -u root -e "USE streetbrand; SHOW TABLES;"
```

## 📊 Database Structure

เมื่อเริ่ม server ครั้งแรก Sequelize จะสร้าง tables อัตโนมัติ:

1. **users** - ข้อมูลผู้ใช้
2. **products** - ข้อมูลสินค้า
3. **orders** - ข้อมูลคำสั่งซื้อ

Tables จะถูกสร้างอัตโนมัติเมื่อ:
- รัน `npm run dev` ครั้งแรก
- Sequelize จะ sync models กับ database

## ✅ Checklist

- [ ] MySQL server กำลังทำงาน (`brew services list | grep mysql`)
- [ ] สร้าง database `streetbrand` แล้ว
- [ ] ไฟล์ `.env` ถูกต้อง
- [ ] ติดตั้ง dependencies (`npm install`)
- [ ] Backend server รันได้ (`npm run dev`)
- [ ] สร้าง admin user แล้ว (`node src/scripts/seedAdmin.js`)
- [ ] ทดสอบ API health check (`http://localhost:5000/api/health`)

---

**พร้อมใช้งาน! 🚀**

