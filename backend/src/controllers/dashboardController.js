import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import { Op } from 'sequelize';
import sequelize from '../config/database.js';

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    // Total Revenue
    const revenueResult = await Order.sum('totalPrice', {
      where: { status: 'completed' },
    });
    const totalRevenue = revenueResult || 0;

    // Counts
    const totalOrders = await Order.count();
    const totalUsers = await User.count({ where: { role: 'customer' } });
    const totalProducts = await Product.count();
    const pendingOrders = await Order.count({ where: { status: 'pending' } });
    const activeProducts = await Product.count({ where: { status: 'active' } });
    const lowStockProducts = await Product.count({ where: { status: 'low_stock' } });
    const outOfStockProducts = await Product.count({ where: { status: 'out_of_stock' } });

    // Recent Orders
    const recentOrders = await Order.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
      limit: 10,
    });
    
    // Map orders to include totalAmount and OrderItems for frontend compatibility
    const recentOrdersFormatted = recentOrders.map(order => ({
      ...order.toJSON(),
      totalAmount: order.totalPrice,
      OrderItems: order.orderItems || [],
    }));

    // Top Products
    const topProducts = await Product.findAll({
      attributes: ['id', 'name', 'sales'],
      order: [['sales', 'DESC']],
      limit: 5,
    });

    res.json({
      totalRevenue,
      totalOrders,
      totalUsers,
      totalProducts,
      recentOrders: recentOrdersFormatted,
      topProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
