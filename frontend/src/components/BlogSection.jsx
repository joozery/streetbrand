import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import blog1 from "../assets/blog1.png";
import blog2 from "../assets/blog2.png";
import blog3 from "../assets/blog3.png";

// ✅ Mock data
const blogs = [
  {
    id: 1,
    image: blog1,
    title: "Denim Tears",
    subtitle: "The Cotton History through Celebrities",
    heading: "Denim Tears: The Cotton History through Celebrities",
    excerpt:
      "เมื่อแฟชั่นไม่ใช่แค่ความเท่ แต่คือเครื่องมือบอกเล่ารื่องราวของคนผิวดำ Denim Tears กลายเป็นแบรนด์ที่ใช้เสื้อผ้าเล่าขับเคลื่อนสังคม...",
  },
  {
    id: 2,
    image: blog2,
    title: "Puma Speedcat 2025 Review!",
    subtitle: "Good or Not, Let's See!",
    heading: "Puma Speedcat 2025 Review! Good or Not, Let's See!",
    excerpt:
      "รีวิวรองเท้า Puma Speedcat ใหม่ปี 2025 ตามความจริง! ทำเกินราคารึเปล่า สีดีแค่ไหน ใครเหมาะกับรองเท้านี้...",
  },
  {
    id: 3,
    image: blog3,
    title: "Shield Your Eyes in Style",
    subtitle: "The Must-Have Miu Miu Sunglasses for 2025",
    heading: "Shield Your Eyes in Style: The Must-Have Miu Miu...",
    excerpt:
      "เสริมลุคหรูด้วยแว่นกันแดด Miu Miu ไอเท็ม must-have แห่งปี 2025 ที่ทั้งปังทั้งใช้งานได้จริง!",
  },
  {
    id: 4,
    image: blog3,
    title: "Goyard: Timeless Luxury",
    subtitle: "History of French Excellence",
    heading: "Goyard: The Brand You Can’t Buy Easily",
    excerpt: "แบรนด์เครื่องหนังจากฝรั่งเศสที่ซื้อต้องรู้วิธี!",
  },
];

// ✅ Custom arrow buttons
function NextArrow({ onClick }) {
  return (
    <button
      className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-black rounded-full p-2 z-10"
      onClick={onClick}
    >
      <FaChevronRight size={16} />
    </button>
  );
}

function PrevArrow({ onClick }) {
  return (
    <button
      className="absolute -left-5 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-black rounded-full p-2 z-10"
      onClick={onClick}
    >
      <FaChevronLeft size={16} />
    </button>
  );
}

export default function BlogSection() {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest Article</h2>
          <a href="#" className="text-sm text-gray-500 hover:text-black">
            More Latest Article &rarr;
          </a>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {blogs.map((blog) => (
              <div key={blog.id} className="px-2">
                <div className="bg-white rounded-lg overflow-hidden">
                  <div className="relative h-44 w-full">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-3 text-white">
                      <h3 className="text-sm font-bold">{blog.title}</h3>
                      <p className="text-xs text-gray-200">{blog.subtitle}</p>
                    </div>
                  </div>

                  <div className="mt-3 px-1">
                    <h4 className="text-sm font-semibold leading-snug line-clamp-2">
                      {blog.heading}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}