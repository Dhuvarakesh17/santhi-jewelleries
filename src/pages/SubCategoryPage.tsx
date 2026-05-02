import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
import { buildProductPath } from "../utils/productPath";

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
    gem: "gems",
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
  if (normalized === "gems" || normalized === "signaturecollection") {
    return "luxury-frame--signature";
  }

  return "luxury-frame--gold";
};

const getCategoryPalette = (category: string) => {
  const normalized = normalizeCategory(category);

  if (normalized === "silver") {
    return {
      titleColor: "#480607",
      priceColor: "#555555",
    };
  }

  if (normalized === "diamond" || normalized === "platinum") {
    return {
      titleColor: "#480607",
      priceColor: "#8BA2D4",
    };
  }

  return {
    titleColor: "#480607",
    priceColor: "#D4AF37",
  };
};

const getTitleColorByCategory = (category: string) => {
  const normalized = normalizeCategory(category);

  if (normalized === "silver") {
    return "#555555"; // Davy's Grey
  }

  if (normalized === "diamond") {
    return "#8BA2D4";
  }

  if (normalized === "platinum") {
    return "#E5E4E2"; // Platinum
  }

  return "#FFD700"; // Gold
};

const buildCollectionTitle = (
  categoryParam?: string,
  subCategoryParam?: string,
) => {
  const category = (categoryParam ?? "").trim();
  const subCategory = (subCategoryParam ?? "").trim();

  if (!subCategory) {
    if (category.toLowerCase().includes("collection")) {
      return category.replace(/collection/i, "Collections").trim();
    }
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
      className="flex items-center justify-between w-full text-left group min-h-[40px] touch-manipulation"
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
  if (normalized === "signaturecollection") return "signature-animated";
  return "black-gold-animated";
};

const SubCategoryPage = () => {
  const { type, sub } = useParams();
  const navigate = useNavigate();
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

  // 🔄 RE-SYNC FILTERS ON NAVIGATION (Main Category or Subcategory changes)
  useEffect(() => {
    setCurrentPage(1);
    setAvailability([]);
    setJewelTypes([]);
    setIsSortOpen(false);
    setIsFilterOpen(true);
  }, [type, sub]);

  const items = useMemo(() => {
    const normalizedType = normalizeCategory(type || "");

    // 1. Filter by Main Category (Gold, Silver, etc.)
    const categoryItems = JEWELLERY_DATA.filter(
      (item) => normalizeCategory(item.category) === normalizedType,
    );

    // 2. Filter by Subcategory/Type if 'sub' slug is present
    const subCategoryMatch = (
      item: (typeof JEWELLERY_DATA)[0],
      slug: string,
    ) => {
      const normalizedSlug = normalizeText(slug);
      return (
        normalizeText(item.subcategory) === normalizedSlug ||
        normalizeText(item.type) === normalizedSlug ||
        // Handle names that might include the category like "GOLD BANGLES" vs "Bangles"
        normalizeText(item.subcategory).includes(normalizedSlug) ||
        normalizedSlug.includes(normalizeText(item.type))
      );
    };

    const targetItems = sub
      ? categoryItems.filter((item) => subCategoryMatch(item, sub))
      : categoryItems;

    // Default to main category if no specific subcategory matches found (prevents empty screen)
    const finalItems = targetItems.length > 0 ? targetItems : categoryItems;

    return finalItems.map((item, index): EnrichedItem => {
      const hash = hashString(item.id + item.name);
      const catBase = categoryBasePrice[item.category.toLowerCase()] ?? 40000;
      const price = catBase + (hash % 90000);
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

  // Derived filter options based on the current items set
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

  const ITEMS_PER_PAGE = 28;
  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / ITEMS_PER_PAGE),
  );

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, filteredItems]);

  // Current page correction
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredItems, totalPages]);

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

  const handleCardClick = (item: EnrichedItem) => {
    navigate(buildProductPath(item));
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
        <label className="flex items-center justify-between text-sm cursor-pointer group min-h-[40px] touch-manipulation">
          <span className="transition-colors text-stone-600 group-hover:text-maroon">
            In stock ({availabilityCounts.inStock})
          </span>
          <input
            type="checkbox"
            checked={availability.includes("in-stock")}
            onChange={() =>
              toggleSelection("in-stock", availability, setAvailability)
            }
            className="w-4 h-4 transition-transform rounded cursor-pointer accent-maroon group-hover:scale-110"
          />
        </label>
        <label className="flex items-center justify-between text-sm cursor-pointer group min-h-[40px] touch-manipulation">
          <span className="transition-colors text-stone-600 group-hover:text-maroon">
            Out of stock ({availabilityCounts.outOfStock})
          </span>
          <input
            type="checkbox"
            checked={availability.includes("out-of-stock")}
            onChange={() =>
              toggleSelection("out-of-stock", availability, setAvailability)
            }
            className="w-4 h-4 transition-transform rounded cursor-pointer accent-maroon group-hover:scale-110"
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
            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[#480607]/10"></div>
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
                className="w-full px-4 py-3 text-base font-medium transition-colors border rounded-lg outline-none border-stone-200 bg-white/50 text-stone-900 focus:border-maroon focus:ring-4 focus:ring-maroon/5 min-h-[44px]"
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
                className="w-full px-4 py-3 text-base font-medium transition-colors border rounded-lg outline-none border-stone-200 bg-white/50 text-stone-900 focus:border-maroon focus:ring-4 focus:ring-maroon/5 min-h-[44px]"
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
            <span className="transition-colors text-stone-600 group-hover:text-maroon">
              {jewelType} ({jewelTypeCounts.get(jewelType) || 0})
            </span>
            <input
              type="checkbox"
              checked={jewelTypes.includes(jewelType)}
              onChange={() =>
                toggleSelection(jewelType, jewelTypes, setJewelTypes)
              }
              className="w-4 h-4 transition-transform rounded cursor-pointer accent-maroon group-hover:scale-110"
            />
          </label>
        ))}
      </FilterSection>

      <div
        className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-1"} gap-3 mt-6 pb-4 sm:pb-0`}
      >
        <motion.button
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(91, 14, 35, 0.08)",
          }}
          whileTap={{ scale: 0.98 }}
          onClick={clearFilters}
          type="button"
          className="w-full text-maroon font-bold text-[10px] tracking-[0.25em] py-3.5 sm:py-4 rounded-xl border border-maroon/20 transition-all uppercase bg-maroon/[0.03] hover:border-maroon/40 min-h-[44px]"
        >
          Reset Filters
        </motion.button>
        {isMobile && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsMobileFilterOpen(false)}
            type="button"
            className="w-full bg-maroon text-white font-bold text-[10px] tracking-[0.25em] py-3.5 sm:py-4 rounded-xl border border-maroon transition-all uppercase min-h-[44px]"
          >
            Apply
          </motion.button>
        )}
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-2 sm:pt-4 pb-20 sm:pb-24 px-3 sm:px-4 lg:px-10 overflow-x-hidden">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative mb-4 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-maroon/5 blur-[80px] rounded-full pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative inline-block"
          >
            <motion.h1
              initial={{ letterSpacing: "0.02em", opacity: 0, y: 10 }}
              animate={{ letterSpacing: "0.05em", opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative inline-block mb-1 text-3xl sm:text-4xl font-extrabold uppercase font-cinzel lg:text-7xl group"
            >
              {(() => {
                const isChettinadu = titleText
                  .toUpperCase()
                  .includes("CHETTINADU");

                if (isChettinadu) {
                  return (
                    <div className="flex flex-col items-center gap-2">
                      <span className="scale-105 signature-animated">
                        {titleText}
                      </span>
                      <span className="bg-[#480607] text-white text-[10px] px-3 py-1 rounded-full animate-pulse tracking-[0.4em] font-black shadow-lg">
                        SPECIAL COLLECTION
                      </span>
                    </div>
                  );
                }

                const words = titleText.split(" ");
                if (words.length <= 1)
                  return (
                    <span
                      className={getAnimationClassByCategory(type ?? "gold")}
                    >
                      {titleText}
                    </span>
                  );

                const materialWord = words[0];
                const restOfTitle = words.slice(1).join(" ");

                return (
                  <span className="flex flex-wrap items-center justify-center gap-x-4">
                    <span
                      className={getAnimationClassByCategory(type ?? "gold")}
                    >
                      {materialWord}
                    </span>
                    <span className="text-[#3b3c36]">{restOfTitle}</span>
                  </span>
                );
              })()}

              {/* Shine Effect on Text */}
              <div className="absolute inset-0 w-full h-full -translate-x-full pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer"></div>
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
                  className="hidden lg:block h-fit sticky top-36 bg-[#480607]/[0.04] backdrop-blur-2xl border-2 border-[#480607]/20 shadow-2xl rounded-[32px] overflow-hidden"
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
                    className="fixed inset-x-0 bottom-0 z-[130] h-[85vh] rounded-t-[32px] bg-white border-t border-stone-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex flex-col lg:hidden"
                  >
                    <div className="flex-none sticky top-0 bg-white z-10 rounded-t-[32px]">
                      <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mt-3 mb-1"></div>
                      <div className="flex items-center justify-between px-5 pb-4 pt-2 border-b border-stone-100">
                        <h3 className="text-[12px] font-bold tracking-[0.22em] uppercase text-maroon">
                          Filters
                        </h3>
                        <button
                          type="button"
                          onClick={() => setIsMobileFilterOpen(false)}
                          className="flex items-center justify-center w-10 h-10 rounded-full text-stone-600 hover:bg-stone-100 min-h-[40px] min-w-[40px] touch-manipulation"
                          aria-label="Close filters"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 bg-white/50">
                      {renderFilters(true)}
                    </div>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>

            <section className="space-y-6">
              <div className="relative z-[10] flex flex-wrap items-center justify-between gap-6 px-4 py-4 border-y border-stone-100/60 bg-white/30 backdrop-blur-sm">
                <div className="flex flex-wrap items-center gap-4">
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(91, 14, 35, 0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-maroon/20 text-maroon font-bold text-[10px] tracking-[0.25em] uppercase transition-all shadow-sm min-h-[40px]"
                  >
                    <SlidersHorizontal
                      size={14}
                      strokeWidth={2.5}
                      className="transition-transform duration-500 group-hover:rotate-180"
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
                      className="transition-transform duration-500 group-hover:rotate-180"
                    />
                    {isFilterOpen ? "Hide Filters" : "Show Filters"}
                  </motion.button>

                  <div className="px-4 sm:px-6 py-2.5 rounded-full border border-black text-stone-700 font-bold text-[10px] tracking-[0.15em] sm:tracking-[0.25em] uppercase bg-white flex items-center min-h-[40px]">
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
                    className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white border border-black rounded-xl text-[12px] sm:text-[13px] font-bold text-stone-800 transition-all hover:border-black hover:shadow-xl hover:shadow-black/5 group min-h-[44px]"
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
                        <div className="py-2 overflow-hidden bg-white border border-black shadow-2xl rounded-2xl">
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
                  <div className="grid grid-cols-2 gap-3 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
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
                            onClick={() => handleCardClick(item)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                handleCardClick(item);
                              }
                            }}
                            className={`luxury-frame aspect-square relative overflow-hidden shadow-sm lg:hover:shadow-2xl transition-all duration-300 lg:duration-500 ${getFrameVariant(item.category)}`}
                          >
                            <div className="luxury-frame__inner w-full h-full overflow-hidden rounded-[8px] sm:rounded-[12px] bg-white">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="object-cover w-full h-full transition-transform duration-300 sm:duration-700 lg:group-hover:scale-110"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/400x500?text=Jewellery+Showcase";
                                }}
                              />
                            </div>

                            {normalizeCategory(item.category) ===
                              "signaturecollection" && (
                              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5">
                                <div className="bg-[#480607] text-white text-[7px] sm:text-[8px] font-black tracking-[0.2em] px-2 py-1 rounded-sm uppercase shadow-xl flex items-center gap-1">
                                  <Star size={8} fill="white" />
                                  Signature
                                </div>
                                <div className="bg-white/90 backdrop-blur-sm text-maroon text-[6px] sm:text-[7px] font-bold tracking-[0.1em] px-1.5 sm:px-2 py-0.5 rounded-sm uppercase border border-maroon/10">
                                  LTD Edition
                                </div>
                              </div>
                            )}

                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation();
                                handleWishlistClick(item);
                              }}
                              className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-[10px] bg-transparent flex items-center justify-center shadow-sm hover:shadow-md transition-all z-10 touch-manipulation"
                              aria-label={
                                isInWishlist(item.id)
                                  ? "Remove from wishlist"
                                  : "Add to wishlist"
                              }
                            >
                              <div
                                className={`transition-all duration-300 sm:duration-500 flex items-center justify-center rounded-[10px] w-full h-full ${isInWishlist(item.id) ? "bg-[#480607] shadow-[0_4px_12px_rgba(72,6,7,0.3)] scale-110" : "bg-white/90 border border-stone-200 group-hover:border-[#480607]/50 hover:bg-[#480607] group/icon"}`}
                              >
                                <Heart
                                  size={14}
                                  strokeWidth={2.5}
                                  className={`transition-colors duration-300 sm:w-4 sm:h-4 ${isInWishlist(item.id) ? "text-white fill-white" : "text-[#480607] group-hover/icon:text-white"}`}
                                />
                              </div>
                            </button>
                          </motion.div>
                          <div className="pt-2.5 sm:pt-3 space-y-1.5 sm:space-y-2 text-center px-1 sm:px-0">
                            <h3
                              className="text-[12px] sm:text-[14px] lg:text-[19px] leading-tight font-serif line-clamp-2"
                              style={{ color: palette.titleColor }}
                              title={item.name}
                            >
                              {item.name}
                            </h3>
                            <p
                              className="text-[13px] sm:text-base lg:text-[17px] font-extrabold flex justify-center items-start gap-[1px]"
                              style={{ color: palette.priceColor }}
                            >
                              <span>{formatCurrency(item.price)}</span>
                              <sup className="text-[0.6em] mt-1">*</sup>
                            </p>
                            {!item.inStock && (
                              <p className="text-[10px] sm:text-[12px] text-red-500 uppercase tracking-wider">
                                Out of stock
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex justify-center mt-16">
                      <div className="relative group">
                        {/* Decorative Background Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-maroon/20 via-[#FFD700]/20 to-maroon/20 rounded-[40px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        <div className="relative bg-white border-2 border-[#FFD700]/30 rounded-[28px] px-8 py-3 shadow-2xl shadow-maroon/5 flex items-center gap-6">
                          {/* Inner Bezel Effect */}
                          <div className="absolute inset-1 border border-[#FFD700]/10 rounded-[24px] pointer-events-none"></div>

                          <button
                            type="button"
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(1, prev - 1))
                            }
                            disabled={currentPage === 1}
                            className="flex items-center gap-2.5 text-maroon disabled:opacity-30 disabled:cursor-not-allowed group/nav transition-all"
                          >
                            <ChevronLeft
                              size={20}
                              className="transition-transform group-hover/nav:-translate-x-1"
                            />
                            <span className="text-[11px] font-black tracking-[0.3em] uppercase hidden sm:inline">
                              Prev
                            </span>
                          </button>

                          <div className="hidden w-px h-6 bg-stone-100 sm:block"></div>

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
                                      className="relative group/num py-1.5 min-w-[28px]"
                                    >
                                      <span
                                        className={`font-serif text-xl font-black transition-all duration-300 ${
                                          currentPage === page
                                            ? "text-maroon scale-125"
                                            : "text-stone-900/40 hover:text-maroon"
                                        }`}
                                      >
                                        {page}
                                      </span>
                                      {currentPage === page && (
                                        <motion.div
                                          layoutId="activePage"
                                          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-maroon rounded-full"
                                        />
                                      )}
                                    </button>,
                                  );
                                }
                              }
                              return pages;
                            })()}
                          </div>

                          <div className="hidden w-px h-6 bg-stone-100 sm:block"></div>
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(totalPages, prev + 1),
                              )
                            }
                            disabled={currentPage === totalPages}
                            className="flex items-center gap-2.5 text-maroon disabled:opacity-30 disabled:cursor-not-allowed group/nav transition-all"
                          >
                            <span className="text-[11px] font-black tracking-[0.3em] uppercase hidden sm:inline">
                              Next
                            </span>
                            <ChevronRight
                              size={20}
                              className="transition-transform group-hover/nav:translate-x-1"
                            />
                          </button>
                        </div>
                      </div>
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
