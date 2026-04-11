import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { Instagram, Twitter } from "./SocialIcons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#5B0E23] text-white pt-24 pb-12 border-t border-[#D4AF37]/20 relative overflow-hidden">
      {/* Background Motif - Subtle */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 relative z-10">
        {/* Brand Info */}
        <div className="space-y-8">
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <img
              src="/images/logo.png"
              alt="Santhi Jewellers"
              className="h-11 w-auto object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
            />
            <div className="flex flex-col items-start text-white">
              <span className="text-2xl font-bold tracking-tighter leading-none">
                SANTHI
              </span>
              <span className="text-[10px] tracking-[0.4em] font-medium text-[#D4AF37] -mt-0.5 uppercase">
                JEWELLERS
              </span>
            </div>
          </Link>
          <p className="text-sm text-stone-300 leading-relaxed font-light italic">
            "Crafting timeless legacies since 1985. We bring you the finest
            22K/24K gold, certified diamonds, and heritage silver articles."
          </p>
          <div className="flex space-x-5">
            <a
              href="#"
              className="p-3 bg-white/5 rounded-full hover:bg-[#D4AF37] hover:text-[#5B0E23] transition-all duration-300"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="p-3 bg-white/5 rounded-full hover:bg-[#D4AF37] hover:text-[#5B0E23] transition-all duration-300"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Collections */}
        <div>
          <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-8">
            Our Collections
          </h4>
          <ul className="space-y-5 text-sm text-stone-200">
            <li>
              <Link
                to="/category/Gold"
                className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"
              >
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />{" "}
                Gold Necklaces
              </Link>
            </li>
            <li>
              <Link
                to="/category/Diamond"
                className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"
              >
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />{" "}
                Diamond Solitaires
              </Link>
            </li>
            <li>
              <Link
                to="/category/Silver"
                className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"
              >
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />{" "}
                Silver Articles
              </Link>
            </li>
            <li>
              <Link
                to="/gold/customized"
                className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"
              >
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />{" "}
                Custom Designs
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Info */}
        <div>
          <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-8">
            Information
          </h4>
          <ul className="space-y-5 text-sm text-stone-200">
            <li>
              <a
                href="#"
                className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"
              >
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />{" "}
                Our Heritage
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"
              >
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />{" "}
                Hallmarking Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"
              >
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />{" "}
                Shipping & Privacy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-[#D4AF37] transition-all flex items-center gap-2 group"
              >
                <ChevronRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />{" "}
                Term of Use
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#D4AF37] mb-8">
            Contact Us
          </h4>
          <ul className="space-y-6 text-sm text-stone-200">
            <li className="flex items-start space-x-4">
              <div className="p-2 bg-white/5 rounded-md text-[#D4AF37]">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-bold text-white mb-1">Head Office</p>
                <p className="text-stone-300 font-light">
                  Karaikudi, Tamil Nadu
                </p>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div className="p-2 bg-white/5 rounded-md text-[#D4AF37]">
                <Phone size={20} />
              </div>
              <div>
                <p className="font-bold text-white mb-1">Call Us</p>
                <p className="text-stone-300 font-light">+91 94432 11809</p>
              </div>
            </li>
            <li className="flex items-center space-x-4">
              <div className="p-2 bg-white/5 rounded-md text-[#D4AF37]">
                <Mail size={20} />
              </div>
              <div>
                <p className="font-bold text-white mb-1">Email Us</p>
                <p className="text-stone-300 font-light">
                  care@santhijewellers.com
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 mt-24 pt-8 border-t border-white/10 text-center">
        <p className="text-[11px] text-stone-400 uppercase tracking-widest font-light">
          © {new Date().getFullYear()} Santhi Jewellers. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
