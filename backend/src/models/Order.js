import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Product from './Product.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  orderItems: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  shippingAddress: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.ENUM('บัตรเครดิต', 'พร้อมเพย์', 'โอนธนาคาร'),
    allowNull: false,
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
  paidAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  deliveredAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'orders',
  timestamps: true,
  getterMethods: {
    totalAmount() {
      return this.totalPrice;
    },
  },
  setterMethods: {
    totalAmount(value) {
      this.setDataValue('totalPrice', value);
    },
  },
});

// Define associations
Order.belongsTo(User, { foreignKey: 'userId', as: 'User' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' }); // Alias for compatibility

export default Order;
