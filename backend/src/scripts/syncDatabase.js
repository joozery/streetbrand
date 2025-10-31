import dotenv from 'dotenv';
import { connectDB } from '../config/database.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

dotenv.config();

const syncDatabase = async () => {
  try {
    console.log('🔄 กำลังเชื่อมต่อฐานข้อมูล...');
    await connectDB();
    
    console.log('🔄 กำลังสร้าง/อัพเดท tables...');
    
    // Sync all models
    // force: false = ไม่ลบข้อมูลเดิม, alter: true = อัพเดท structure
    await User.sync({ alter: true });
    console.log('✅ Table: users');
    
    await Product.sync({ alter: true });
    console.log('✅ Table: products');
    
    await Order.sync({ alter: true });
    console.log('✅ Table: orders');
    
    console.log('');
    console.log('✅ สร้าง/อัพเดท tables สำเร็จแล้ว!');
    console.log('');
    console.log('📋 Tables ที่สร้าง:');
    console.log('   - users (id, name, email, password, phone, role, status, totalOrders, totalSpent)');
    console.log('   - products (id, name, description, category, price, stock, images, colors, sizes, status, sales)');
    console.log('   - orders (id, userId, orderItems, shippingAddress, paymentMethod, totalPrice, status, paidAt, deliveredAt)');
    console.log('');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

syncDatabase();

