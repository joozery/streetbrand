import HeroSlider from "../components/HeroSlider";
import BrandSection from "../components/BrandSection";
import ProductSection from "../components/ProductSection"; // ✅ เพิ่มใหม่
import BlogSection from "../components/BlogSection";

export default function ForYou() {
  return (
    <div className="bg-black">
      <HeroSlider />
      <div className="bg-white">
        <BrandSection />
        <ProductSection /> {/* ✅ แสดงสินค้าต่อจากแบรนด์ */} 
        <BlogSection />
      </div>
    </div>
  );
}