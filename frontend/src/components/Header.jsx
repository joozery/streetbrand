import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaShoppingCart, FaUser, FaSignOutAlt, FaBox } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 shadow border-b bg-white sticky top-0 z-50">
      {/* Logo */}
      <div 
        className="text-xs font-bold tracking-wide cursor-pointer hover:opacity-80 transition"
        onClick={() => navigate('/')}
      >
        DELTA-<br />SHOP
      </div>

      {/* Search bar */}
      <div className="w-full max-w-xl mx-6">
        <input
          type="text"
          placeholder="Search for product by brands, model or try # to discover more..."
          className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none text-sm font-light"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Language dropdown */}
        <div className="text-sm font-medium cursor-pointer">EN ▾</div>

        {/* Notification icon */}
        <FaBell className="text-xl cursor-pointer hover:text-gray-600 transition" />

        {/* Cart Icon */}
        <div 
          className="relative cursor-pointer hover:text-gray-600 transition"
          onClick={() => navigate('/cart')}
        >
          <FaShoppingCart className="text-xl" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {getCartCount()}
            </span>
          )}
        </div>

        {/* User Menu */}
        {isAuthenticated ? (
          <div className="relative">
            <div
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800 transition"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border py-2 z-50">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold text-sm">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    navigate('/my-orders');
                    setShowUserMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <FaBox /> คำสั่งซื้อของฉัน
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
                >
                  <FaSignOutAlt /> ออกจากระบบ
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
          >
            <FaUser /> เข้าสู่ระบบ
          </button>
        )}
      </div>
    </header>
  );
}