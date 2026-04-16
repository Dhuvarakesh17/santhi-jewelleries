import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, Search, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_DATA } from "../config/menuConfig";
import { JEWELLERY_DATA } from "../constants/jewelleryData";
import { useWishlist } from "../context/WishlistContext";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState<string | null>(
    null,
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlist, openWishlist } = useWishlist();

  // Close dropdown on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
    setMobileExpandedMenu(null);
  }, [location.pathname]);

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

  const normalizeText = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const filteredItems = useMemo(() => {
    if (!searchQuery) return [];
    const query = normalizeText(searchQuery);
    const queryTokens = query.split(" ").filter(Boolean);
    const results: { title: string; category: string; path: string }[] = [];

    const matchesQuery = (...values: string[]) => {
      if (!queryTokens.length) return false;

      const searchableText = normalizeText(values.join(" "));
      return queryTokens.every((token) => searchableText.includes(token));
    };

    const pushResult = (title: string, category: string, path: string) => {
      if (
        results.some((result) => result.title === title && result.path === path)
      ) {
        return;
      }

      results.push({ title, category, path });
    };

    MENU_DATA.forEach((item) => {
      if (matchesQuery(item.title)) {
        pushResult(
          item.title,
          "Main Category",
          item.title === "Gold Customization Order"
            ? "/gold/customized"
            : `/category/${item.title}`,
        );
      }
      if (item.items) {
        item.items.forEach((sub) => {
          if (matchesQuery(item.title, sub)) {
            pushResult(
              sub,
              item.title,
              item.title === "Gold Customization Order"
                ? "/gold/customized"
                : `/category/${item.title}/${sub}`,
            );
          }
        });
      }
      if (item.columns) {
        item.columns.forEach((col) => {
          col.items.forEach((sub) => {
            if (matchesQuery(item.title, col.title, sub)) {
              pushResult(
                sub,
                `${item.title} / ${col.title}`,
                `/category/${item.title}/${sub}`,
              );
            }
          });
        });
      }
    });

    JEWELLERY_DATA.forEach((item) => {
      if (
        matchesQuery(
          item.name,
          item.category,
          item.subcategory,
          item.description,
        )
      ) {
        pushResult(
          item.name,
          `${item.category} / ${item.subcategory}`,
          `/category/${item.category}/${item.subcategory}`,
        );
      }
    });

    return results.slice(0, 20);
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-[5000] bg-white shadow-md border-b border-[#5B0E23]/10 font-serif">
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
        <div className="items-center order-2 hidden gap-4 ml-auto mr-6 xl:gap-5 lg:flex">
          {MENU_DATA.map((item) => (
            <div
              key={item.title}
              onMouseEnter={() => handleMouseEnter(item.title)}
              onMouseLeave={handleMouseLeave}
              className="relative py-4 group shrink-0"
            >
              <div className="flex items-center">
                {item.type === "link" ? (
                  <Link
                    to={item.path || "#"}
                    className={`relative text-[12px] xl:text-[13px] font-bold text-[#5B0E23] uppercase transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#5B0E23] after:transition-all after:duration-300 hover:after:w-full ${item.title === "Home" ? "tracking-[0.02em]" : "tracking-[0.1em] xl:tracking-[0.13em]"}`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleCategoryClick(item.title)}
                    className={`relative flex items-center text-[12px] xl:text-[13px] font-bold uppercase tracking-[0.1em] xl:tracking-[0.13em] text-[#5B0E23] transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#5B0E23] after:transition-all after:duration-300 ${activeMenu === item.title ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
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
                    className={`absolute top-full left-0 bg-white shadow-2xl border-t-2 border-[#5B0E23] p-8 z-[5001] ${item.type === "megamenu" ? "w-[800px] -left-48" : "min-w-[240px]"}`}
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
                                    onClick={() => setActiveMenu(null)}
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
                              onClick={() => setActiveMenu(null)}
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
        <div className="flex items-center order-3 space-x-2 lg:space-x-5">
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
                  className="fixed inset-x-0 top-[6.75rem] bottom-0 sm:bottom-auto sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80 lg:w-96 bg-white shadow-2xl p-4 border-t border-stone-100 sm:border rounded-t-2xl sm:rounded-lg z-[110] overflow-y-auto"
                >
                  <div className="relative pb-3">
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
                    <div className="pt-3 mt-2 border-t border-stone-100">
                      <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2 px-2 sticky top-0 bg-white py-2">
                        Suggestions
                      </p>
                      <div className="space-y-1 pb-4">
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
            <div className="bg-[#5A1024] shadow-md flex items-center justify-center rounded-[7px] w-8 h-8 transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <Heart
                size={16}
                strokeWidth={2.5}
                className="text-white fill-white"
              />
            </div>
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

              <div className="flex flex-col pb-8 space-y-2 overflow-y-auto">
                {MENU_DATA.map((item) => (
                  <div
                    key={item.title}
                    className="py-2 border-b border-stone-50"
                  >
                    <button
                      onClick={() => {
                        if (item.type === "link") {
                          setMobileMenuOpen(false);
                          navigate(item.path || "/");
                          return;
                        }

                        setMobileExpandedMenu((prev) =>
                          prev === item.title ? null : item.title,
                        );
                      }}
                      className="flex items-center justify-between w-full text-lg font-bold tracking-widest text-left uppercase text-stone-800"
                    >
                      {item.title}
                      {item.type !== "link" && (
                        <ChevronDown
                          size={20}
                          className={`text-stone-300 transition-transform duration-300 ${mobileExpandedMenu === item.title ? "rotate-180" : ""}`}
                        />
                      )}
                    </button>
                    {item.type === "megamenu" &&
                    mobileExpandedMenu === item.title ? (
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
                    ) : item.items && mobileExpandedMenu === item.title ? (
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
                    ) : null}
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
