import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Shop all", path: "/" },
    { label: "For You", path: "/" },
    { label: "Streetwear", path: "/" },
    { label: "Luxury", path: "/" },
    { label: "Collectibles", path: "/" },
    { label: "K-Style", path: "/" },
    { label: "Mall", path: "/" },
  ];

  return (
    <nav className="bg-black shadow-md">
      <div className="flex justify-center items-center gap-6 px-6 py-3 text-sm font-medium whitespace-nowrap overflow-x-auto hide-scrollbar">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(item.path)}
            className={`transition duration-200 px-2 py-1 rounded-md ${
              location.pathname === item.path && item.label === "For You"
                ? "text-white font-semibold border-b-2 border-white"
                : "text-gray-300 hover:text-white hover:underline"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}