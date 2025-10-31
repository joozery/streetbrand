import User from '../models/User.js';
import { Op } from 'sequelize';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = { role: 'customer' };

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
      ];
    }

    const users = await User.findAll({
      where,
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'ไม่พบผู้ใช้' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ message: 'ไม่พบผู้ใช้' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete/Block user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const blockUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (user) {
      const newStatus = user.status === 'blocked' ? 'active' : 'blocked';
      await user.update({ status: newStatus });
      res.json({ message: newStatus === 'blocked' ? 'ระงับผู้ใช้สำเร็จ' : 'เปิดใช้งานผู้ใช้สำเร็จ' });
    } else {
      res.status(404).json({ message: 'ไม่พบผู้ใช้' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
