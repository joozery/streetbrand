// src/components/BrandSection.jsx
import Amiri from "../assets/amiri.png";
import DenimTears from "../assets/denimtears.png";
import ASSC from "../assets/assc.png";
import GalleryDept from "../assets/gallerydept.webp";
import Vlone from "../assets/vlone.jpg";
import Essentials from "../assets/essentials.jpg";
import Stussy from "../assets/stussy.png";

const brands = [
  { name: "Amiri", img: Amiri },
  { name: "Denim Tears", img: DenimTears },
  { name: "ASSC", img: ASSC },
  { name: "Gallery Dept", img: GalleryDept },
  { name: "Vlone", img: Vlone },
  { name: "Essentials", img: Essentials },
  { name: "Stussy", img: Stussy },
];

export default function BrandSection() {
    return (
      <section className="py-10 bg-gray-50 px-6">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
  
          {brands.map((brand, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="w-20 h-20 rounded-full bg-white shadow flex items-center justify-center overflow-hidden">
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <p className="text-sm font-medium text-gray-800 text-center truncate w-20">
                {brand.name}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
  }