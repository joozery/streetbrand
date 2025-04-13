import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Banner1 from "../assets/Banner1.webp";
import Banner2 from "../assets/Banner.webp";

const slideImages = [Banner1, Banner2];

export default function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    appendDots: (dots) => (
      <div style={{ position: "absolute", bottom: "20px", width: "100%" }}>
        <ul className="flex justify-center space-x-2">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-gray-400 opacity-70 hover:opacity-100" />
    ),
  };

  return (
    <div className="relative w-full slick-custom-arrows">
      <Slider {...settings}>
        {slideImages.map((src, index) => (
          <div key={index}>
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-[500px] object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}