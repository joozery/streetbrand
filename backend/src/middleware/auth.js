import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production');
      
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password'] }
      });
      
      if (!req.user) {
        return res.status(401).json({ message: 'ไม่พบผู้ใช้' });
      }

      if (req.user.status === 'blocked') {
        return res.status(403).json({ message: 'บัญชีของคุณถูกระงับ' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token ไม่ถูกต้อง' });
    }
  } else {
    return res.status(401).json({ message: 'ไม่มี Token' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'ต้องเป็น Admin' });
  }
};

