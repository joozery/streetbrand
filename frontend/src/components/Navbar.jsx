// src/components/Navbar.jsx

export default function Navbar() {
    const menuItems = [
      "Shop all",
      "For You",
      "Streetwear",
      "Luxury",
      "Collectibles",
      "K-Style",
      "Mall",
    ];
  
    return (
      <nav className="bg-black shadow-md">
        <div className="flex justify-center items-center gap-6 px-6 py-3 text-sm font-medium whitespace-nowrap overflow-x-auto hide-scrollbar">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              className={`transition duration-200 px-2 py-1 rounded-md ${
                item === "For You"
                  ? "text-white font-semibold border-b-2 border-white"
                  : "text-gray-300 hover:text-white hover:underline"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>
    );
  }