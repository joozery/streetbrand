import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function ProductSection() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // ดึงสินค้าทั้งหมดที่พร้อมขาย (active และ low_stock)
      const data = await api.getProducts();
      if (Array.isArray(data)) {
        // กรองเฉพาะสินค้าที่พร้อมขาย (active หรือ low_stock) และมีสต็อก
        const availableProducts = data.filter(
          product => 
            (product.status === 'active' || product.status === 'low_stock') && 
            product.stock > 0
        );
        setProducts(availableProducts.slice(0, 10)); // แสดงแค่ 10 รายการแรก
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      // Don't show alert for public endpoint errors
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-10 px-6">
        <div className="max-w-screen-xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Products</h2>
          <p className="text-gray-600">กำลังโหลดสินค้า...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-10 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Products</h2>

        {products.length === 0 ? (
          <p className="text-gray-600">ไม่มีสินค้าในขณะนี้</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-white rounded-xl shadow p-4 relative hover:shadow-lg transition h-full flex flex-col justify-between cursor-pointer"
              >
                {product.sales > 0 && (
                  <span className="absolute top-2 right-3 text-xs text-gray-400">
                    {product.sales} sold
                  </span>
                )}

                <div>
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{product.name.charAt(0)}</span>
                    </div>
                  )}

                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 min-h-[3rem]">
                    {product.name}
                  </h3>

                  {product.sales > 100 && (
                    <span className="inline-flex items-center text-xs text-green-600 font-medium mb-1">
                      <svg
                        className="w-3 h-3 mr-1 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0l3 7h7l-5.5 4.5L17 20l-7-4-7 4 2.5-8.5L0 7h7z" />
                      </svg>
                      Trending
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-xs text-gray-500">Starting from</p>
                  <p className="text-lg font-bold text-black">
                    ฿ {parseFloat(product.price || 0).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
