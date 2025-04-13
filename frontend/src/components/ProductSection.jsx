import product1 from "../assets/product1.jpg";
import product2 from "../assets/product1.jpg";
import product3 from "../assets/product1.jpg";
import product4 from "../assets/product1.jpg";
import product5 from "../assets/product1.jpg";

const products = [
  {
    name: "adidas Samba OG Cloud White Core Black",
    price: 1990,
    sold: "24.3k",
    trending: true,
    image: product1,
  },
  {
    name: "Supreme Tiger Keychain Silver",
    price: 1399,
    sold: null,
    trending: false,
    image: product2,
  },
  {
    name: "New Balance 530 White Silver Navy",
    price: 1847,
    sold: "31.6k",
    trending: true,
    image: product3,
  },
  {
    name: "Pop Mart Mantel Clock (Hirono Shelter Series)",
    price: 199,
    sold: null,
    trending: false,
    image: product4,
  },
  {
    name: "On Cloudtilt 1 Pearl Ivory",
    price: 11150,
    sold: null,
    trending: false,
    image: product5,
  },
];

export default function ProductSection() {
  return (
    <section className="bg-gray-50 py-10 px-6">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 relative hover:shadow-lg transition h-full flex flex-col justify-between"
            >
              {product.sold && (
                <span className="absolute top-2 right-3 text-xs text-gray-400">
                  {product.sold} sold
                </span>
              )}

              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-4"
                />

                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 min-h-[3rem]">
                  {product.name}
                </h3>

                {product.trending && (
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
                  ฿ {product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}