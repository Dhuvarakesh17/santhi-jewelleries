import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Search,
  Heart,
  User,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_DATA } from "../config/menuConfig";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { wishlist, openWishlist } = useWishlist();

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  const handleMouseEnter = (title: string) => setActiveMenu(title);
  const handleMouseLeave = () => setActiveMenu(null);

  const handleCategoryClick = (category: string) => {
    if (category === "Gold Customization Order") {
      navigate("/gold/customized");
    } else {
      navigate(`/category/${category}`);
    }
    setActiveMenu(null);
  };

  const filteredItems = useMemo(() => {
    if (!searchQuery) return [];
    const query = searchQuery.toLowerCase();
    const results: { title: string; category: string; path: string }[] = [];

    MENU_DATA.forEach((item) => {
      if (item.title.toLowerCase().includes(query)) {
        results.push({
          title: item.title,
          category: "Main Category",
          path:
            item.title === "Gold Customization Order"
              ? "/gold/customized"
              : `/category/${item.title}`,
        });
      }
      if (item.items) {
        item.items.forEach((sub) => {
          if (sub.toLowerCase().includes(query)) {
            results.push({
              title: sub,
              category: item.title,
              path:
                item.title === "Gold Customization Order"
                  ? "/gold/customized"
                  : `/category/${item.title}/${sub}`,
            });
          }
        });
      }
      if (item.columns) {
        item.columns.forEach((col) => {
          col.items.forEach((sub) => {
            if (sub.toLowerCase().includes(query)) {
              results.push({
                title: sub,
                category: `${item.title} / ${col.title}`,
                path: `/category/${item.title}/${sub}`,
              });
            }
          });
        });
      }
    });

    return results.slice(0, 8);
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#5B0E23]/10 font-serif">
      <nav className="max-w-[1440px] mx-auto px-4 lg:px-8 py-3 lg:py-4 flex justify-between items-center relative">
        {/* Mobile Menu Button - Left */}
        <button
          className="p-2 lg:hidden text-stone-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo - Center on Mobile, Left on Desktop */}
        <Link
          to="/"
          className="flex items-center flex-shrink-0 order-2 gap-3 group font-calisto lg:mr-6 lg:order-1 focus:outline-none"
        >
          <img
            src="/images/logo.png"
            alt="Santhi Jewellers"
            className="object-contain w-auto h-10 lg:h-12 filter drop-shadow-sm"
          />
          <div className="flex flex-col items-start lg:items-center">
            <span className="text-2xl lg:text-3xl font-bold text-[#5B0E23] tracking-tighter leading-none group-hover:opacity-80 transition-opacity">
              SANTHI
            </span>
            <span className="text-[10px] lg:text-[11px] tracking-[0.4em] font-medium text-stone-500 -mt-0.5 opacity-80 uppercase">
              JEWELLERS
            </span>
          </div>
        </Link>

        {/* Navigation Links - Desktop Center */}
        <div className="items-center order-2 hidden space-x-6 lg:flex">
          {MENU_DATA.map((item) => (
            <div
              key={item.title}
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
              className="relative py-4 group"
            >
              <div className="flex items-center">
                {item.type === "link" ? (
                  <Link
                    to={item.path || "#"}
                    className="relative text-[13px] font-bold text-[#5B0E23] uppercase tracking-[0.15em] transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#5B0E23] after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleCategoryClick(item.title)}
                    className={`relative flex items-center text-[13px] font-bold uppercase tracking-[0.15em] text-[#5B0E23] transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#5B0E23] after:transition-all after:duration-300 ${activeMenu === item.title ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
                  >
                    {item.title}
                    <ChevronDown
                      size={14}
                      className={`ml-1 transition-transform duration-300 ${activeMenu === item.title ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>

              <AnimatePresence>
                {activeMenu === item.title && item.type !== "link" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full left-0 bg-white shadow-2xl border-t-2 border-[#5B0E23] p-8 z-[100] ${item.type === "megamenu" ? "w-[800px] -left-48" : "min-w-[240px]"}`}
                  >
                    {item.type === "megamenu" ? (
                      <div className="grid grid-cols-3 gap-12">
                        {item.columns?.map((col) => (
                          <div key={col.title} className="space-y-4">
                            <h4 className="text-[12px] font-bold text-[#5B0E23] tracking-[0.2em] border-b border-stone-100 pb-2">
                              {col.title}
                            </h4>
                            <ul className="space-y-2">
                              {col.items.map((sub) => (
                                <li key={sub}>
                                  <Link
                                    to={`/category/${item.title}/${sub}`}
                                    className="text-[13px] text-stone-500 hover:text-[#5B0E23] transition-colors block"
                                  >
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-3">
                        {item.items?.map((sub) => (
                          <li key={sub}>
                            <Link
                              to={
                                sub === "Customized Jewelry" ||
                                item.title === "Gold Customization Order"
                                  ? "/gold/customized"
                                  : `/category/${item.title}/${sub}`
                              }
                              className="text-[13px] text-stone-600 hover:text-[#5B0E23] hover:pl-2 transition-all block"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Utility Icons - Right */}
        <div className="flex items-center order-3 ml-auto space-x-2 lg:space-x-5">
          {/* Search Toggle */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-stone-800 hover:text-[#5B0E23] transition-colors focus:outline-none"
            >
              <Search size={22} strokeWidth={2.5} />
            </button>
            <AnimatePresence>
              {isSearchOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-72 lg:w-96 bg-white shadow-2xl p-4 border border-stone-100 rounded-lg z-[110]"
                >
                  <div className="relative">
                    <input
                      autoFocus
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search jewelry collections..."
                      className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-md focus:outline-none focus:border-[#5B0E23] text-sm"
                    />
                    <Search
                      size={16}
                      className="absolute -translate-y-1/2 left-3 top-1/2 text-stone-400"
                    />
                  </div>
                  {filteredItems.length > 0 && (
                    <div className="pt-3 mt-4 border-t border-stone-100">
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 px-2">
                        Suggestions
                      </p>
                      <div className="space-y-1">
                        {filteredItems.map((res, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              navigate(res.path);
                              setIsSearchOpen(false);
                              setSearchQuery("");
                            }}
                            className="flex items-center justify-between w-full px-2 py-2 text-left rounded hover:bg-stone-50 group"
                          >
                            <span className="text-sm text-stone-700">
                              {res.title}
                            </span>
                            <span className="text-[10px] text-stone-400 font-sans italic">
                              {res.category}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={openWishlist}
            className="relative p-2 text-stone-800 hover:text-[#5B0E23] transition-colors"
          >
            <Heart
              size={22}
              strokeWidth={2.5}
              className={
                wishlist.length > 0 ? "fill-[#5B0E23] text-[#5B0E23]" : ""
              }
            />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#5B0E23] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              className="fixed inset-0 bg-white z-[150] flex flex-col p-6 lg:hidden"
            >
              <div className="flex items-center justify-between pb-4 mb-8 border-b border-stone-100">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex flex-col items-center font-calisto"
                >
                  <span className="text-2xl font-bold text-[#5B0E23] tracking-tighter leading-none">
                    SANTHI
                  </span>
                  <span className="text-[10px] tracking-[0.3em] font-medium text-stone-400 uppercase">
                    JEWELLERS
                  </span>
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-stone-800 bg-stone-50"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col space-y-4 overflow-y-auto">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold tracking-widest uppercase py-2 border-b border-stone-50 hover:text-[#5B0E23]"
                >
                  Home
                </Link>
                {MENU_DATA.map((item) => (
                  <div
                    key={item.title}
                    className="py-2 space-y-4 border-b border-stone-50"
                  >
                    <button
                      onClick={() => handleCategoryClick(item.title)}
                      className="flex items-center justify-between w-full text-lg font-bold tracking-widest text-left uppercase text-stone-800"
                    >
                      {item.title}
                      {item.type !== "link" && (
                        <ChevronDown size={20} className="text-stone-300" />
                      )}
                    </button>
                    {item.type === "megamenu" ? (
                      <div className="pl-4 space-y-4">
                        {item.columns?.map((col) => (
                          <div key={col.title} className="space-y-2">
                            <p className="text-[10px] font-bold text-[#5B0E23] tracking-widest uppercase opacity-60">
                              {col.title}
                            </p>
                            <div className="flex flex-col space-y-2">
                              {col.items.map((sub) => (
                                <Link
                                  key={sub}
                                  to={`/category/${item.title}/${sub}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-sm font-medium text-stone-600"
                                >
                                  · {sub}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      item.items && (
                        <div className="flex flex-col pl-4 space-y-3 border-l-2 border-stone-100">
                          {item.items.map((sub) => (
                            <Link
                              key={sub}
                              to={
                                sub === "Customized Jewelry" ||
                                item.title === "Gold Customization Order"
                                  ? "/gold/customized"
                                  : `/category/${item.title}/${sub}`
                              }
                              onClick={() => setMobileMenuOpen(false)}
                              className="text-sm font-medium text-stone-600"
                            >
                              {sub}
                            </Link>
                          ))}
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
