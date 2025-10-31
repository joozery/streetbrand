# ⚙️ Configuration Guide

## 📝 สร้างไฟล์ `.env`

ไฟล์ `.env` อยู่ใน `backend/.env` แต่ยังว่างอยู่ ให้เพิ่มเนื้อหาดังนี้:

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

**วิธีสร้าง:**

1. **ใช้ Text Editor:**
   - เปิด `backend/.env` ด้วย Text Editor
   - คัดลอกเนื้อหาข้างบนใส่เข้าไป
   - Save

2. **ใช้ Terminal:**
```bash
cd backend
cat > .env << 'EOF'
PORT=5000
DB_NAME=streetbrand
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=streetbrand-secret-key-2024-change-in-production
NODE_ENV=development
EOF
```

## ✅ สถานะปัจจุบัน

- ✅ MySQL server ทำงานอยู่
- ✅ Database `streetbrand` สร้างแล้ว
- ✅ MySQL connection ใช้งานได้ (root user)
- ✅ Backend dependencies ติดตั้งแล้ว
- ⚠️  ไฟล์ `.env` ยังว่าง - ต้องเพิ่ม config

## 🚀 ขั้นตอนต่อไป

### 1. เพิ่ม Config ใน .env
เพิ่มเนื้อหาข้างบนใน `backend/.env`

### 2. สร้าง Admin User
```bash
cd backend
node src/scripts/seedAdmin.js
```

### 3. เริ่ม Backend Server
```bash
npm run dev
```

ควรเห็น:
```
✅ MySQL Connected successfully
✅ Database synced
🚀 Server running on port 5000
```

### 4. ทดสอบ API
เปิด browser: http://localhost:5000/api/health

### 5. เริ่ม Frontend
```bash
cd frontend
echo "VITE_API_URL=http://localhost:5000/api" > .env
npm run dev
```

## 🔍 ตรวจสอบการเชื่อมต่อ Database

### ดู Tables ที่ถูกสร้าง:
```bash
mysql -u root -e "USE streetbrand; SHOW TABLES;"
```

เมื่อเริ่ม backend server ครั้งแรก Sequelize จะสร้าง tables อัตโนมัติ:
- `users`
- `products`  
- `orders`

### ดูข้อมูลใน Database:
```bash
# ดู admin user
mysql -u root -e "USE streetbrand; SELECT id, name, email, role FROM users WHERE role='admin';"
```

## 💡 Tips

- ถ้า MySQL root มี password ให้ใส่ใน `DB_PASSWORD=your_password`
- ถ้า MySQL port ไม่ใช่ 3306 ให้เปลี่ยน `DB_PORT=your_port`
- เปลี่ยน `JWT_SECRET` เป็นค่าที่ปลอดภัยกว่าใน production

