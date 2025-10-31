import Product from '../models/Product.js';
import { Op } from 'sequelize';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { category, status, search } = req.query;
    const where = {};

    if (category && category !== 'all') {
      where.category = category;
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    const products = await Product.findAll({
      where,
      order: [['createdAt', 'DESC']],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'ไม่พบสินค้า' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, images, colors, sizes } = req.body;

    // Validate required fields
    if (!name || !category || !price || !stock) {
      return res.status(400).json({ message: 'กรุณากรอกข้อมูลให้ครบถ้วน (ชื่อ, หมวดหมู่, ราคา, สต็อก)' });
    }

    // Ensure arrays are properly formatted
    const productData = {
      name,
      description: description || '',
      category,
      price: parseFloat(price),
      stock: parseInt(stock),
      images: Array.isArray(images) ? images : [],
      colors: Array.isArray(colors) ? colors : [],
      sizes: Array.isArray(sizes) ? sizes : [],
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'ไม่พบสินค้า' });
    }

    const { name, description, category, price, stock, images, colors, sizes } = req.body;

    // Prepare update data
    const updateData = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (category) updateData.category = category;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (images !== undefined) updateData.images = Array.isArray(images) ? images : [];
    if (colors !== undefined) updateData.colors = Array.isArray(colors) ? colors : [];
    if (sizes !== undefined) updateData.sizes = Array.isArray(sizes) ? sizes : [];

    await product.update(updateData);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (product) {
      await product.destroy();
      res.json({ message: 'ลบสินค้าสำเร็จ' });
    } else {
      res.status(404).json({ message: 'ไม่พบสินค้า' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
