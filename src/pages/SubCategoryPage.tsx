import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Heart,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Star,
  X,
} from "lucide-react";
import { JEWELLERY_DATA } from "../constants/jewelleryData";
import { useWishlist } from "../context/WishlistContext";

type EnrichedItem = {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  image: string;
  description: string;
  price: number;
  inStock: boolean;
  bestScore: number;
  addedRank: number;
};

const hashString = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 100000;
  }
  return hash;
};

const categoryBasePrice: Record<string, number> = {
  gold: 85000,
  silver: 9000,
  diamond: 125000,
  platinum: 95000,
};

const normalizeText = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const normalizeCategory = (value: string) => {
  const normalized = normalizeText(value);
  const aliases: Record<string, string> = {
    diamonds: "diamond",
    signaturescollection: "signaturecollection",
  };
  return aliases[normalized] || normalized;
};

const getFrameVariant = (category: string) => {
  const normalized = normalizeCategory(category);

  if (normalized === "silver") return "luxury-frame--silver";
  if (normalized === "diamond" || normalized === "platinum") {
    return "luxury-frame--diamond";
  }

  return "luxury-frame--gold";
};

const getCategoryPalette = (category: string) => {
  const normalized = normalizeCategory(category);

  if (normalized === "silver") {
    return {
      titleColor: "#5B0E23",
      priceColor: "#5c636a",
    };
  }

  if (normalized === "diamond" || normalized === "platinum") {
    return {
      titleColor: "#5B0E23",
      priceColor: "#4a5568",
    };
  }

  return {
    titleColor: "#5B0E23",
    priceColor: "#C9A84C",
  };
};

const getTitleColorByCategory = (category: string) => {
  const normalized = normalizeCategory(category);

  if (normalized === "silver") {
    return "#5c636a"; // Darker Silver
  }

  if (normalized === "diamond") {
    return "#7E86A1";
  }

  if (normalized === "platinum") {
    return "#E5E4E2"; // Platinum
  }

  return "#D4AF37"; // Gold
};

const buildCollectionTitle = (
  categoryParam?: string,
  subCategoryParam?: string,
) => {
  const category = (categoryParam ?? "").trim();
  const subCategory = (subCategoryParam ?? "").trim();

  if (!subCategory) {
    return `${category} Collections`.trim();
  }

  const normalizedCategory = normalizeCategory(category);
  const subCategoryWords = subCategory
    .split(/\s+/)
    .map((word) => normalizeCategory(word));

  const hasCategoryInSub = subCategoryWords.includes(normalizedCategory);

  return hasCategoryInSub ? subCategory : `${category} ${subCategory}`.trim();
};

const imagePriorityMatch = (imagePath: string, normalizedType: string) => {
  const normalizedImagePath = normalizeText(imagePath);

  if (normalizedType === "diamond") {
    return normalizedImagePath.includes("diamond") ? 1 : 0;
  }

  if (normalizedType === "silver") {
    return normalizedImagePath.includes("silver") ? 1 : 0;
  }

  if (normalizedType === "gold") {
    return normalizedImagePath.includes("gold") ? 1 : 0;
  }

  return 0;
};

const formatCurrency = (value: number) => `₹ ${value.toLocaleString("en-IN")}`;
const formatFilterRange = (value: number) =>
  `₹${Math.round(value).toLocaleString("en-IN")}`;
const parseCurrencyInput = (value: string) =>
  Number(value.replace(/[^0-9]/g, ""));

const getPriceBucket = (price: number) => {
  if (price < 50000) return "under-50k";
  if (price <= 150000) return "50k-150k";
  return "above-150k";
};

const FilterSection: React.FC<{
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, isOpen, onToggle, children }) => (
  <div className="pb-6 mb-6 border-b border-stone-100 last:border-0 last:mb-0">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left group"
      type="button"
    >
      <span className="text-[11px] tracking-[0.25em] font-bold text-stone-800 uppercase group-hover:text-maroon transition-colors">
        {title}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <ChevronDown
          size={18}
          className="text-stone-400 group-hover:text-maroon"
        />
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-5 space-y-4">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const getAnimationClassByCategory = (category: string) => {
  const normalized = normalizeCategory(category);
  if (normalized === "silver") return "silver-animated";
  if (normalized === "diamond" || normalized === "platinum")
    return "diamond-animated";
  return "black-gold-animated";
};

const SubCategoryPage = () => {
  const { type, sub } = useParams();
  const { addToWishlist, removeFromWishlist, isInWishlist, openWishlist } =
    useWishlist();
  const [sortBy, setSortBy] = useState("best-selling");
  const [currentPage, setCurrentPage] = useState(1);
  const [availability, setAvailability] = useState<string[]>([]);
  const [jewelTypes, setJewelTypes] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [openSections, setOpenSections] = useState({
    availability: true,
    price: true,
    jewelType: true,
  });
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortOptions = [
    { value: "best-selling", label: "Best Selling" },
    { value: "newest", label: "Latest Arrivals" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "name-a-z", label: "Alphabetically, A-Z" },
  ];

  const items = useMemo(() => {
    const normalizedType = normalizeCategory(type || "");
    const categoryItems = JEWELLERY_DATA.filter(
      (item) => normalizeCategory(item.category) === normalizedType,
    );

    const subcategoryItems = sub
      ? categoryItems.filter(
          (item) => normalizeText(item.subcategory) === normalizeText(sub),
        )
      : categoryItems;

    // Keep strict category filtering, but avoid empty pages for unmatched subcategory slugs.
    const selectedItems =
      sub && subcategoryItems.length === 0 ? categoryItems : subcategoryItems;

    return selectedItems.map((item, index): EnrichedItem => {
      const hash = hashString(item.id + item.name);
      const catBase = categoryBasePrice[item.category.toLowerCase()] ?? 40000;
      const price = catBase + (hash % 90000) + index * 213;
      const inStock = hash % 9 !== 0;

      return {
        ...item,
        price,
        inStock,
        bestScore: 100000 - (hash % 100000),
        addedRank: index,
      };
    });
  }, [type, sub]);

  const availableJewelTypes = useMemo(
    () => Array.from(new Set(items.map((item) => item.subcategory))).sort(),
    [items],
  );

  const minPrice = useMemo(
    () => (items.length ? Math.min(...items.map((item) => item.price)) : 0),
    [items],
  );

  const maxPrice = useMemo(
    () => (items.length ? Math.max(...items.map((item) => item.price)) : 0),
    [items],
  );

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const availabilityCounts = useMemo(
    () => ({
      inStock: items.filter((item) => item.inStock).length,
      outOfStock: items.filter((item) => !item.inStock).length,
    }),
    [items],
  );

  const jewelTypeCounts = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((item) => {
      counts.set(item.subcategory, (counts.get(item.subcategory) || 0) + 1);
    });
    return counts;
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedType = normalizeCategory(type || "");

    const filtered = items.filter((item) => {
      const availabilityMatch = availability.length
        ? availability.includes(item.inStock ? "in-stock" : "out-of-stock")
        : true;

      const priceMatch =
        item.price >= priceRange[0] && item.price <= priceRange[1];

      const jewelTypeMatch = jewelTypes.length
        ? jewelTypes.includes(item.subcategory)
        : true;

      return availabilityMatch && priceMatch && jewelTypeMatch;
    });

    const sorted = [...filtered];
    switch (sortBy) {
      case "price-low-high":
        sorted.sort((a, b) => {
          const imagePriorityDiff =
            imagePriorityMatch(b.image, normalizedType) -
            imagePriorityMatch(a.image, normalizedType);

          if (imagePriorityDiff !== 0) return imagePriorityDiff;

          return a.price - b.price;
        });
        break;
      case "price-high-low":
        sorted.sort((a, b) => {
          const imagePriorityDiff =
            imagePriorityMatch(b.image, normalizedType) -
            imagePriorityMatch(a.image, normalizedType);

          if (imagePriorityDiff !== 0) return imagePriorityDiff;

          return b.price - a.price;
        });
        break;
      case "name-a-z":
        sorted.sort((a, b) => {
          const imagePriorityDiff =
            imagePriorityMatch(b.image, normalizedType) -
            imagePriorityMatch(a.image, normalizedType);

          if (imagePriorityDiff !== 0) return imagePriorityDiff;

          return a.name.localeCompare(b.name);
        });
        break;
      case "newest":
        sorted.sort((a, b) => {
          const imagePriorityDiff =
            imagePriorityMatch(b.image, normalizedType) -
            imagePriorityMatch(a.image, normalizedType);

          if (imagePriorityDiff !== 0) return imagePriorityDiff;

          return b.addedRank - a.addedRank;
        });
        break;
      case "best-selling":
      default:
        sorted.sort((a, b) => {
          const imagePriorityDiff =
            imagePriorityMatch(b.image, normalizedType) -
            imagePriorityMatch(a.image, normalizedType);

          if (imagePriorityDiff !== 0) return imagePriorityDiff;

          return b.bestScore - a.bestScore;
        });
        break;
    }

    return sorted;
  }, [availability, items, jewelTypes, priceRange, sortBy]);

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [type, sub, availability, jewelTypes, priceRange, sortBy]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!isMobileFilterOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isMobileFilterOpen]);

  const toggleSelection = (
    value: string,
    state: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const clearFilters = () => {
    setAvailability([]);
    setJewelTypes([]);
    setPriceRange([minPrice, maxPrice]);
    setSortBy("best-selling");
    setCurrentPage(1);
  };

  const handleWishlistClick = (item: EnrichedItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist({
        id: item.id,
        name: item.name,
        price: formatCurrency(item.price),
        image: item.image,
        category: item.category,
      });
    }

    openWishlist();
  };

  const titleText = buildCollectionTitle(type, sub);
  const collectionText = titleText.toLowerCase();
  const rangeSpan = Math.max(maxPrice - minPrice, 1);
  const minThumbPercent = ((priceRange[0] - minPrice) / rangeSpan) * 100;
  const maxThumbPercent = ((priceRange[1] - minPrice) / rangeSpan) * 100;

  const updatePriceRange = (nextMin: number, nextMax: number) => {
    const safeMin = Number.isFinite(nextMin) ? nextMin : minPrice;
    const safeMax = Number.isFinite(nextMax) ? nextMax : maxPrice;

    setPriceRange([
      Math.max(minPrice, Math.min(safeMin, safeMax)),
      Math.min(maxPrice, Math.max(safeMax, safeMin)),
    ]);
  };

  const renderFilters = (isMobile = false) => (
    <>
      <FilterSection
        title="Availability"
        isOpen={openSections.availability}
        onToggle={() =>
          setOpenSections((prev) => ({
            ...prev,
            availability: !prev.availability,
          }))
        }
      >
        <label className="flex items-center justify-between text-sm cursor-pointer group">
          <span className="text-stone-600 group-hover:text-maroon transition-colors">
            In stock ({availabilityCounts.inStock})
          </span>
          <input
            type="checkbox"
            checked={availability.includes("in-stock")}
            onChange={() =>
              toggleSelection("in-stock", availability, setAvailability)
            }
            className="w-4 h-4 accent-maroon rounded cursor-pointer transition-transform group-hover:scale-110"
          />
        </label>
        <label className="flex items-center justify-between text-sm cursor-pointer group">
          <span className="text-stone-600 group-hover:text-maroon transition-colors">
            Out of stock ({availabilityCounts.outOfStock})
          </span>
          <input
            type="checkbox"
            checked={availability.includes("out-of-stock")}
            onChange={() =>
              toggleSelection("out-of-stock", availability, setAvailability)
            }
            className="w-4 h-4 accent-maroon rounded cursor-pointer transition-transform group-hover:scale-110"
          />
        </label>
      </FilterSection>

      <FilterSection
        title="Price"
        isOpen={openSections.price}
        onToggle={() =>
          setOpenSections((prev) => ({
            ...prev,
            price: !prev.price,
          }))
        }
      >
        <div className="space-y-5">
          <div className="flex items-center justify-between text-sm uppercase tracking-[0.12em] text-stone-500">
            <span className="font-semibold tracking-[0.28em]">Range</span>
            <span className="font-semibold text-[#1f2430] tracking-normal uppercase">
              {formatFilterRange(priceRange[0])} -{" "}
              {formatFilterRange(priceRange[1])}
            </span>
          </div>

          <div className="relative h-9">
            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#5b0e23]/10"></div>
            <div
              className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-maroon"
              style={{
                left: `${minThumbPercent}%`,
                right: `${100 - maxThumbPercent}%`,
              }}
            ></div>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[0]}
              onChange={(event) => {
                const nextMin = Number(event.target.value);
                updatePriceRange(nextMin, priceRange[1]);
              }}
              className="absolute inset-0 w-full bg-transparent appearance-none price-range-thumb"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(event) => {
                const nextMax = Number(event.target.value);
                updatePriceRange(priceRange[0], nextMax);
              }}
              className="absolute inset-0 w-full bg-transparent appearance-none price-range-thumb"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-1">
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-stone-400 uppercase">
                Min (₹)
              </p>
              <input
                type="text"
                inputMode="numeric"
                value={Math.round(priceRange[0]).toString()}
                onChange={(event) => {
                  const nextMin = parseCurrencyInput(event.target.value);
                  if (Number.isNaN(nextMin)) return;
                  updatePriceRange(nextMin, priceRange[1]);
                }}
                className="w-full rounded-lg border border-stone-200 bg-white/50 px-4 py-3 text-base font-medium text-stone-900 outline-none transition-colors focus:border-maroon focus:ring-4 focus:ring-maroon/5"
              />
            </div>
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-stone-400 uppercase">
                Max (₹)
              </p>
              <input
                type="text"
                inputMode="numeric"
                value={Math.round(priceRange[1]).toString()}
                onChange={(event) => {
                  const nextMax = parseCurrencyInput(event.target.value);
                  if (Number.isNaN(nextMax)) return;
                  updatePriceRange(priceRange[0], nextMax);
                }}
                className="w-full rounded-lg border border-stone-200 bg-white/50 px-4 py-3 text-base font-medium text-stone-900 outline-none transition-colors focus:border-maroon focus:ring-4 focus:ring-maroon/5"
              />
            </div>
          </div>
        </div>
      </FilterSection>

      <FilterSection
        title="Jewel Type"
        isOpen={openSections.jewelType}
        onToggle={() =>
          setOpenSections((prev) => ({
            ...prev,
            jewelType: !prev.jewelType,
          }))
        }
      >
        {availableJewelTypes.map((jewelType) => (
          <label
            key={jewelType}
            className="flex items-center justify-between text-sm cursor-pointer group"
          >
            <span className="text-stone-600 group-hover:text-maroon transition-colors">
              {jewelType} ({jewelTypeCounts.get(jewelType) || 0})
            </span>
            <input
              type="checkbox"
              checked={jewelTypes.includes(jewelType)}
              onChange={() =>
                toggleSelection(jewelType, jewelTypes, setJewelTypes)
              }
              className="w-4 h-4 accent-maroon rounded cursor-pointer transition-transform group-hover:scale-110"
            />
          </label>
        ))}
      </FilterSection>

      <div
        className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-1"} gap-3 mt-6`}
      >
        <motion.button
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(91, 14, 35, 0.08)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={clearFilters}
          type="button"
          className="w-full text-maroon font-bold text-[10px] tracking-[0.25em] py-4 rounded-xl border border-maroon/20 transition-all uppercase bg-maroon/[0.03] hover:border-maroon/40"
        >
          Reset Filters
        </motion.button>
        {isMobile && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsMobileFilterOpen(false)}
            type="button"
            className="w-full bg-maroon text-white font-bold text-[10px] tracking-[0.25em] py-4 rounded-xl border border-maroon transition-all uppercase"
          >
            Apply
          </motion.button>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-4 pb-24 px-4 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative mb-8 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-maroon/5 blur-[80px] rounded-full pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block relative"
          >
            <motion.h1
              initial={{ letterSpacing: "0.02em", opacity: 0, y: 10 }}
              animate={{ letterSpacing: "0.05em", opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative font-cinzel text-4xl lg:text-7xl font-extrabold uppercase inline-block mb-1 group"
            >
              {(() => {
                const words = titleText.split(" ");
                if (words.length <= 1) return <span className={getAnimationClassByCategory(type ?? "gold")}>{titleText}</span>;
                
                const materialWord = words[0];
                const restOfTitle = words.slice(1).join(" ");
                
                return (
                  <span className="flex flex-wrap items-center justify-center gap-x-4">
                    <span className={getAnimationClassByCategory(type ?? "gold")}>
                      {materialWord}
                    </span>
                    <span className="text-[#3b3c36]">
                      {restOfTitle}
                    </span>
                  </span>
                );
              })()}
              
              {/* Shine Effect on Text */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
            </motion.h1>

            {/* Refined minimalist underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="mt-2 flex flex-col items-center gap-0.5"
            >
              <div className="h-[1.5px] w-full bg-slate-200 max-w-[140px]"></div>
              <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-maroon/40 to-transparent max-w-[60px]"></div>
            </motion.div>
          </motion.div>
        </div>

        {items.length > 0 ? (
          <div
            className={`grid grid-cols-1 ${isFilterOpen ? "lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]" : ""} gap-8 lg:gap-12 pb-10`}
          >
            <AnimatePresence>
              {isFilterOpen && (
                <motion.aside
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="hidden lg:block h-fit sticky top-[120px] bg-[#5B0E23]/[0.04] backdrop-blur-2xl border-2 border-[#5B0E23]/20 shadow-2xl rounded-[32px] overflow-hidden"
                >
                  <div className="max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar p-8">
                    {renderFilters()}
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isMobileFilterOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[120] bg-black/45 lg:hidden"
                    onClick={() => setIsMobileFilterOpen(false)}
                  />
                  <motion.aside
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 240, damping: 28 }}
                    className="fixed inset-x-0 bottom-0 z-[130] max-h-[88vh] rounded-t-3xl bg-white border-t border-stone-200 shadow-2xl overflow-hidden lg:hidden"
                  >
                    <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
                      <h3 className="text-[12px] font-bold tracking-[0.22em] uppercase text-maroon">
                        Filters
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="p-2 rounded-full text-stone-600 hover:bg-stone-100"
                        aria-label="Close filters"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="overflow-y-auto max-h-[calc(88vh-72px)] px-5 py-5 bg-[#5B0E23]/[0.03]">
                      {renderFilters(true)}
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>

            <section className="space-y-8">
              <div className="relative z-[10] flex flex-wrap items-center justify-between gap-6 px-4 py-8 border-y border-stone-100/60 bg-white/30 backdrop-blur-sm">
                <div className="flex flex-wrap items-center gap-4">
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(91, 14, 35, 0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden group inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-maroon/20 text-maroon font-bold text-[10px] tracking-[0.25em] uppercase transition-all shadow-sm"
                  >
                    <SlidersHorizontal
                      size={14}
                      strokeWidth={2.5}
                      className="group-hover:rotate-180 transition-transform duration-500"
                    />
                    Filters
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(91, 14, 35, 0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsFilterOpen((prev) => !prev)}
                    className="hidden lg:inline-flex group items-center gap-3 px-6 py-2.5 rounded-full border border-maroon/20 text-maroon font-bold text-[10px] tracking-[0.25em] uppercase transition-all shadow-sm"
                  >
                    <SlidersHorizontal
                      size={14}
                      strokeWidth={2.5}
                      className="group-hover:rotate-180 transition-transform duration-500"
                    />
                    {isFilterOpen ? "Hide Filters" : "Show Filters"}
                  </motion.button>

                  <div className="px-6 py-2.5 rounded-full border border-stone-200/60 text-stone-500 font-bold text-[10px] tracking-[0.25em] uppercase bg-stone-50/50">
                    {filteredItems.length} Products Found
                  </div>
                </div>

                <div
                  className="relative min-w-[220px] w-full sm:w-auto sm:min-w-[260px]"
                  onMouseLeave={() => setIsSortOpen(false)}
                >
                  <p className="absolute -top-6 left-1 text-[9px] font-bold tracking-[0.3em] text-stone-400 uppercase">
                    Sort By
                  </p>
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="w-full flex items-center justify-between px-6 py-4 bg-white border border-stone-200 rounded-xl text-[13px] font-bold text-stone-800 transition-all hover:border-maroon/40 hover:shadow-xl hover:shadow-maroon/5 group"
                  >
                    <span className="tracking-wide">
                      {sortOptions.find((opt) => opt.value === sortBy)?.label}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-maroon transition-transform duration-500 ${isSortOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isSortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "circOut" }}
                        className="absolute z-[100] top-full right-0 mt-0 w-full bg-transparent pt-1"
                      >
                        <div className="bg-white border border-stone-200 rounded-2xl shadow-2xl overflow-hidden py-2">
                          {sortOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSortBy(option.value);
                                setIsSortOpen(false);
                              }}
                              className={`w-full text-left px-6 py-3.5 text-[12px] transition-colors hover:bg-maroon/5 ${
                                sortBy === option.value
                                  ? "text-maroon font-bold bg-maroon/[0.03]"
                                  : "text-stone-600 font-bold uppercase tracking-wider"
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {filteredItems.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {paginatedItems.map((item, index) => {
                      const palette = getCategoryPalette(item.category);

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.5,
                            delay: (index % 4) * 0.1,
                          }}
                          className="group"
                        >
                          <motion.div
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            className={`luxury-frame aspect-square relative overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 ${getFrameVariant(item.category)}`}
                          >
                            <div className="luxury-frame__inner w-full h-full overflow-hidden rounded-[12px] bg-white">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="object-cover w-full h-full transition-all duration-700 group-hover:scale-110"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/400x500?text=Jewellery+Showcase";
                                }}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleWishlistClick(item)}
                              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 border border-stone-200 flex items-center justify-center shadow-sm hover:shadow-md hover:border-[#5B0E23] transition-all"
                              aria-label={
                                isInWishlist(item.id)
                                  ? "Remove from wishlist"
                                  : "Add to wishlist"
                              }
                            >
                              <Heart
                                size={17}
                                className={
                                  isInWishlist(item.id)
                                    ? "text-[#5B0E23] fill-[#5B0E23]"
                                    : "text-[#5B0E23]"
                                }
                              />
                            </button>
                          </motion.div>
                          <div className="pt-3 space-y-2 text-center">
                            <h3
                              className="text-[19px] leading-tight font-serif"
                              style={{ color: palette.titleColor }}
                            >
                              {item.name}
                            </h3>
                            <p
                              className="text-[17px] font-medium"
                              style={{ color: palette.priceColor }}
                            >
                              {formatCurrency(item.price)}
                            </p>
                            {!item.inStock && (
                              <p className="text-[12px] text-red-500 uppercase tracking-wider">
                                Out of stock
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-12 pt-12 pb-12 border-t border-stone-100/60 mt-8">
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        className="flex items-center gap-3 text-maroon disabled:opacity-20 disabled:cursor-not-allowed group transition-all"
                      >
                        <ChevronLeft
                          size={18}
                          className="group-hover:-translate-x-1 transition-transform"
                        />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                          Previous
                        </span>
                      </button>

                      <div className="flex items-center gap-8">
                        {(() => {
                          const windowSize = 3;
                          const currentBlock = Math.floor(
                            (currentPage - 1) / windowSize,
                          );
                          const startPage = currentBlock * windowSize + 1;
                          const pages = [];
                          for (let i = 0; i < windowSize; i++) {
                            const page = startPage + i;
                            if (page <= totalPages) {
                              pages.push(
                                <button
                                  key={page}
                                  type="button"
                                  onClick={() => setCurrentPage(page)}
                                  className="relative group py-2"
                                >
                                  <span
                                    className={`font-serif text-xl transition-all duration-300 ${
                                      currentPage === page
                                        ? "text-maroon font-bold scale-110"
                                        : "text-stone-400 hover:text-maroon"
                                    }`}
                                  >
                                    {page}
                                  </span>
                                  {currentPage === page && (
                                    <motion.div
                                      layoutId="activePage"
                                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-maroon rounded-full"
                                    />
                                  )}
                                </button>,
                              );
                            }
                          }
                          return pages;
                        })()}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1),
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-3 text-maroon disabled:opacity-20 disabled:cursor-not-allowed group transition-all"
                      >
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase">
                          Next
                        </span>
                        <ChevronRight
                          size={18}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-24 text-center bg-white border border-stone-200">
                  <h2 className="mb-4 font-serif text-2xl text-stone-400">
                    No items match these filters.
                  </h2>
                  <button
                    onClick={clearFilters}
                    type="button"
                    className="text-[#D4AF37] font-bold uppercase tracking-[0.3em] text-[11px] border-b border-[#D4AF37]/30 pb-1 hover:border-[#D4AF37] transition-all"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </section>
          </div>
        ) : (
          <div className="py-32 text-center bg-white border rounded-lg shadow-sm border-gray-50">
            <h2 className="mb-6 font-serif text-3xl italic text-gray-300">
              No items available in this category yet.
            </h2>
            <Link
              to="/"
              className="text-gold font-bold tracking-[0.3em] uppercase hover:underline"
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubCategoryPage;
