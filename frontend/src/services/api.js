import axios from 'axios';
import API_BASE_URL from '../config/api.js';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Log warning if no token for protected endpoints
      if (config.url && !config.url.includes('/auth/') && !config.url.includes('/products') && !config.url.includes('/register')) {
        console.warn('No token found for protected endpoint:', config.url);
      }
    }
    
    // If FormData is being sent, remove Content-Type to let browser set it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        return Promise.reject(new Error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบว่า Backend ทำงานอยู่หรือไม่'));
      }
      return Promise.reject(new Error(error.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ'));
    }
    
    // Handle HTTP errors
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth token
  getToken() {
    return localStorage.getItem('token');
  }

  // Auth APIs
  async register(userData) {
    return apiClient.post('/auth/register', userData, {
      headers: {
        Authorization: undefined, // Remove auth for public endpoint
      },
    });
  }

  async login(email, password) {
    return apiClient.post('/auth/login', { email, password }, {
      headers: {
        Authorization: undefined, // Remove auth for public endpoint
      },
    });
  }

  async adminLogin(username, password) {
    return apiClient.post('/auth/admin/login', { username, password }, {
      headers: {
        Authorization: undefined, // Remove auth for public endpoint
      },
    });
  }

  async getMe() {
    return apiClient.get('/auth/me');
  }

  // Product APIs
  async getProducts(params = {}) {
    try {
      return await apiClient.get('/products', { 
        params,
        headers: {
          Authorization: undefined, // Public endpoint
        },
      });
    } catch (error) {
      console.error('getProducts error:', error);
      throw error;
    }
  }

  async getProductById(id) {
    return apiClient.get(`/products/${id}`, {
      headers: {
        Authorization: undefined, // Public endpoint
      },
    });
  }

  async createProduct(productData) {
    return apiClient.post('/products', productData);
  }

  async updateProduct(id, productData) {
    return apiClient.put(`/products/${id}`, productData);
  }

  async deleteProduct(id) {
    return apiClient.delete(`/products/${id}`);
  }

  // Order APIs
  async createOrder(orderData) {
    return apiClient.post('/orders', orderData);
  }

  async getMyOrders() {
    return apiClient.get('/orders/myorders');
  }

  async getAllOrders(params = {}) {
    return apiClient.get('/orders', { params });
  }

  async getOrderById(id) {
    return apiClient.get(`/orders/${id}`);
  }

  async updateOrderStatus(id, status) {
    return apiClient.put(`/orders/${id}`, { status });
  }

  async deleteOrder(id) {
    return apiClient.delete(`/orders/${id}`);
  }

  // User APIs (Admin only)
  async getUsers(params = {}) {
    return apiClient.get('/users', { params });
  }

  async getUserById(id) {
    return apiClient.get(`/users/${id}`);
  }

  async updateUser(id, userData) {
    return apiClient.put(`/users/${id}`, userData);
  }

  async blockUser(id) {
    return apiClient.delete(`/users/${id}`);
  }

  // Dashboard API (Admin only)
  async getDashboardStats() {
    return apiClient.get('/dashboard/stats');
  }

  // Upload APIs
  async uploadImages(files) {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    // apiClient interceptor will automatically:
    // 1. Add Authorization token from localStorage
    // 2. Remove Content-Type header for FormData (so browser can set it with boundary)
    return apiClient.post('/upload/images', formData);
  }

  // Generic request method (for backward compatibility)
  async request(endpoint, options = {}) {
    const { method = 'GET', body, params, requireAuth = true } = options;
    
    const config = {
      method,
      url: endpoint,
      params,
      headers: {
        ...options.headers,
      },
    };

    if (body) {
      config.data = typeof body === 'string' ? JSON.parse(body) : body;
    }

    if (!requireAuth) {
      config.headers.Authorization = undefined;
    }

    return apiClient(config);
  }
}

export default new ApiService();
