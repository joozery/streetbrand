// Header.jsx
import { FaBell } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 shadow border-b bg-white">
      {/* Logo */}
      <div className="text-xs font-bold tracking-wide">SA_<br />SOM</div>

      {/* Search bar */}
<div className="w-full max-w-xl mx-6">
  <input
    type="text"
    placeholder="Search for product by brands, model or try # to discover more..."
    className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none text-sm font-light" // 👈 เพิ่ม font-light
  />
</div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Language dropdown */}
        <div className="text-sm font-medium cursor-pointer">EN ▾</div>

        {/* Notification icon */}
        <FaBell className="text-xl cursor-pointer" />

        {/* Profile image */}
        <img
          src="https://i.pravatar.cc/40" // เปลี่ยนลิงก์เป็นของจริงได้
          alt="profile"
          className="w-8 h-8 rounded-full object-cover"
        />
      </div>
    </header>
  );
}