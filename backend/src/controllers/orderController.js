import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'ไม่มีสินค้าในคำสั่งซื้อ' });
    }

    let totalPrice = 0;
    for (const item of orderItems) {
      const product = await Product.findByPk(item.product);
      if (!product) {
        return res.status(404).json({ message: `ไม่พบสินค้า: ${item.name}` });
      }
      totalPrice += parseFloat(product.price) * item.quantity;

      // Update stock
      await product.update({
        stock: product.stock - item.quantity,
        sales: product.sales + item.quantity,
      });
    }

    const order = await Order.create({
      userId: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    // Update user stats
    const user = await User.findByPk(req.user.id);
    await user.update({
      totalOrders: user.totalOrders + 1,
      totalSpent: parseFloat(user.totalSpent) + totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    
    // Map orders to include totalAmount and OrderItems for frontend compatibility
    const ordersWithTotalAmount = orders.map(order => ({
      ...order.toJSON(),
      totalAmount: order.totalPrice,
      OrderItems: order.orderItems || [],
    }));
    
    res.json(ordersWithTotalAmount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;
    const where = status && status !== 'all' ? { status } : {};

    const orders = await Order.findAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });
    
    // Map orders to include totalAmount for frontend compatibility
    const ordersWithTotalAmount = orders.map(order => ({
      ...order.toJSON(),
      totalAmount: order.totalPrice,
      OrderItems: order.orderItems || [],
    }));
    
    res.json(ordersWithTotalAmount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone'],
        },
      ],
    });

    if (order) {
      // Check if user owns the order or is admin
      if (order.userId === req.user.id || req.user.role === 'admin') {
        const orderData = {
          ...order.toJSON(),
          totalAmount: order.totalPrice,
          OrderItems: order.orderItems || [],
          User: order.User || order.user,
        };
        res.json(orderData);
      } else {
        res.status(403).json({ message: 'ไม่มีสิทธิ์เข้าถึง' });
      }
    } else {
      res.status(404).json({ message: 'ไม่พบคำสั่งซื้อ' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (order) {
      await order.update({
        status,
        deliveredAt: status === 'completed' ? new Date() : order.deliveredAt,
      });
      res.json(order);
    } else {
      res.status(404).json({ message: 'ไม่พบคำสั่งซื้อ' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete order
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (order) {
      await order.destroy();
      res.json({ message: 'ลบคำสั่งซื้อสำเร็จ' });
    } else {
      res.status(404).json({ message: 'ไม่พบคำสั่งซื้อ' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
