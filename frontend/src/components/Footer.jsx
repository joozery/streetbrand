// src/components/Footer.jsx
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaTiktok,
    FaYoutube,
    FaLine,
    FaLinkedinIn,
  } from "react-icons/fa";
  
  export default function Footer() {
    return (
      <footer className="bg-white border-t">
        {/* Black top bar */}
        <div className="bg-red-800 text-white text-xs py-3 text-center tracking-wider font-medium">
          <div className="flex justify-center gap-6 uppercase">
            {Array(5)
              .fill("The Real Deal")
              .map((text, i) => (
                <span key={i}>{text}</span>
              ))}
          </div>
        </div>
  
        {/* Main Footer Content */}
        <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          {/* Logo / Brand */}
          <div>
            <div className="text-2xl font-bold mb-4">SA_SOM</div>
          </div>
  
          {/* About Section */}
          <div>
            <h4 className="font-semibold mb-2">About SASOM</h4>
            <ul className="space-y-1 text-gray-600">
              <li><a href="#">Buyer Manual</a></li>
              <li><a href="#">Authentication</a></li>
              <li><a href="#">Seller Manual</a></li>
              <li><a href="#">Sasom Product Guideline</a></li>
            </ul>
          </div>
  
          {/* Support Section */}
          <div>
            <h4 className="font-semibold mb-2">Customer Support</h4>
            <ul className="space-y-1 text-gray-600">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
  
          {/* Socials */}
          <div>
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-3 text-gray-700 text-xl mb-2">
              <FaFacebookF />
              <FaInstagram />
              <FaTwitter />
              <FaTiktok />
              <FaYoutube />
              <FaLine />
              <FaLinkedinIn />
            </div>
            <a href="#" className="text-sm text-black font-medium">
              Sell with SASOM
            </a>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="border-t text-center text-xs text-gray-500 py-4 px-4 flex flex-col md:flex-row justify-between items-center max-w-screen-xl mx-auto">
          <div className="mb-2 md:mb-0">
            © 2025 Copyright | sasom &nbsp; | &nbsp;
            <a href="#" className="hover:underline">Terms & Conditions</a> &nbsp;|&nbsp;
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
          <div className="flex flex-wrap gap-2 justify-center text-sm">
            <img src="/images/visa.svg" className="h-4" />
            <img src="/images/mastercard.svg" className="h-4" />
            <img src="/images/jcb.svg" className="h-4" />
            <img src="/images/opn.svg" className="h-4" />
          </div>
        </div>
      </footer>
    );
  }