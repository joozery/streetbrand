import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const setupDatabase = async () => {
  try {
    // Connect to MySQL without selecting database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
    });

    console.log('✅ Connected to MySQL server');

    // Create database if not exists
    const dbName = process.env.DB_NAME || 'streetbrand';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
    console.log(`✅ Database "${dbName}" created or already exists`);

    await connection.end();
    console.log('✅ Database setup completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Make sure your .env file has correct database credentials');
    console.log('2. Run: node src/scripts/seedAdmin.js (to create admin user)');
    console.log('3. Run: npm run dev (to start the server)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    console.log('\n💡 Tips:');
    console.log('- Make sure MySQL server is running');
    console.log('- Check your MySQL username and password in .env file');
    console.log('- Default MySQL root password is usually empty or "root"');
    process.exit(1);
  }
};

setupDatabase();

