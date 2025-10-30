import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ตรวจสอบ localStorage เมื่อ app เริ่มทำงาน
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      // จำลองการ register (ในโปรเจคจริงจะเชื่อมกับ API)
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        createdAt: new Date().toISOString()
      };

      // บันทึก user ลง localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      // จำลองการ login (ในโปรเจคจริงจะเชื่อมกับ API)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === email);

      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return { success: true, user: foundUser };
      } else {
        return { success: false, error: 'ไม่พบผู้ใช้งานนี้' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

