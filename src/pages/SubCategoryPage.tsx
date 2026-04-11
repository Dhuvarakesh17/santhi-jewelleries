import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Heart, SlidersHorizontal } from "lucide-react";
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

const formatCurrency = (value: number) => `Rs ${value.toLocaleString("en-IN")}`;

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
  <div className="pb-5 mb-5 border-b border-stone-200">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full text-left"
      type="button"
    >
      <span className="text-[11px] tracking-[0.35em] font-semibold text-stone-700 uppercase">
        {title}
      </span>
      <ChevronDown
        size={18}
        className={`text-stone-700 transition-transform ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    {isOpen && <div className="pt-4 space-y-3">{children}</div>}
  </div>
);

const SubCategoryPage = () => {
  const { type, sub } = useParams();
  const { addToWishlist, removeFromWishlist, isInWishlist, openWishlist } =
    useWishlist();
  const [sortBy, setSortBy] = useState("best-selling");
  const [currentPage, setCurrentPage] = useState(1);
  const [availability, setAvailability] = useState<string[]>([]);
  const [jewelTypes, setJewelTypes] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [openSections, setOpenSections] = useState({
    availability: true,
    price: true,
    jewelType: true,
  });

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

  const titleText = `${type ?? ""} ${sub || "Collections"}`.trim();

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-16 pb-24 px-4 lg:px-10">
      <div className="max-w-[1440px] mx-auto">
        {/* Title Section */}
        <div className="mb-12 space-y-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl font-bold tracking-widest uppercase lg:text-5xl text-luxury-text"
          >
            {titleText}
          </motion.h1>
          <div className="h-0.5 w-24 bg-gold mx-auto"></div>
          <p className="font-sans tracking-wide text-gray-500">
            {sub
              ? `A curated selection of the finest ${type?.toLowerCase()} ${sub?.toLowerCase()} masterpieces.`
              : `Explore our prestigious collection of ${type?.toLowerCase()} jewellery.`}
          </p>
        </div>

        {items.length > 0 ? (
          <div
            className={`grid grid-cols-1 ${isFilterOpen ? "lg:grid-cols-[320px_minmax(0,1fr)]" : ""} gap-8 lg:gap-10`}
          >
            {isFilterOpen && (
              <aside className="p-6 bg-white border border-stone-200 h-fit lg:sticky lg:top-28">
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
                  <label className="flex items-center justify-between text-sm cursor-pointer text-stone-600">
                    <span>In stock ({availabilityCounts.inStock})</span>
                    <input
                      type="checkbox"
                      checked={availability.includes("in-stock")}
                      onChange={() =>
                        toggleSelection(
                          "in-stock",
                          availability,
                          setAvailability,
                        )
                      }
                      className="accent-[#5B0E23]"
                    />
                  </label>
                  <label className="flex items-center justify-between text-sm cursor-pointer text-stone-600">
                    <span>Out of stock ({availabilityCounts.outOfStock})</span>
                    <input
                      type="checkbox"
                      checked={availability.includes("out-of-stock")}
                      onChange={() =>
                        toggleSelection(
                          "out-of-stock",
                          availability,
                          setAvailability,
                        )
                      }
                      className="accent-[#5B0E23]"
                    />
                  </label>
                </FilterSection>

                <FilterSection
                  title="Price"
                  isOpen={openSections.price}
                  onToggle={() =>
                    setOpenSections((prev) => ({ ...prev, price: !prev.price }))
                  }
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-[30px] text-stone-800">
                      <span>{formatCurrency(priceRange[0])}</span>
                      <span>{formatCurrency(priceRange[1])}</span>
                    </div>
                    <div className="relative pt-2">
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[0]}
                        onChange={(event) => {
                          const nextMin = Number(event.target.value);
                          setPriceRange((prev) => [
                            Math.min(nextMin, prev[1]),
                            prev[1],
                          ]);
                        }}
                        className="w-full accent-black"
                      />
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(event) => {
                          const nextMax = Number(event.target.value);
                          setPriceRange((prev) => [
                            prev[0],
                            Math.max(nextMax, prev[0]),
                          ]);
                        }}
                        className="w-full accent-black"
                      />
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
                      className="flex items-center justify-between text-sm cursor-pointer text-stone-600"
                    >
                      <span>
                        {jewelType} ({jewelTypeCounts.get(jewelType) || 0})
                      </span>
                      <input
                        type="checkbox"
                        checked={jewelTypes.includes(jewelType)}
                        onChange={() =>
                          toggleSelection(jewelType, jewelTypes, setJewelTypes)
                        }
                        className="accent-[#5B0E23]"
                      />
                    </label>
                  ))}
                </FilterSection>

                <button
                  onClick={clearFilters}
                  type="button"
                  className="w-full border border-[#5B0E23] text-[#5B0E23] font-semibold text-sm py-2 hover:bg-[#5B0E23] hover:text-white transition-colors"
                >
                  Clear Filters
                </button>
              </aside>
            )}

            <section className="space-y-8">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsFilterOpen((prev) => !prev)}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-stone-300 bg-white text-stone-800 hover:border-[#5B0E23] hover:text-[#5B0E23] transition-colors"
                  >
                    <SlidersHorizontal size={16} />
                    {isFilterOpen ? "Close Filters" : "Open Filters"}
                  </button>
                  <p className="text-lg text-stone-700">
                    {filteredItems.length} products
                  </p>
                </div>
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="border border-[#D9A56A] bg-white px-4 py-2.5 text-stone-800 min-w-[220px] focus:outline-none focus:border-[#5B0E23]"
                >
                  <option value="best-selling">Best selling</option>
                  <option value="newest">Newest</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Alphabetically, A-Z</option>
                </select>
              </div>

              {filteredItems.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                    {paginatedItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -10 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: index * 0.02 }}
                        className="group"
                      >
                        <div className="overflow-hidden bg-white aspect-square relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "https://via.placeholder.com/400x500?text=Jewellery+Showcase";
                            }}
                          />
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
                        </div>
                        <div className="pt-3 space-y-2 text-center">
                          <h3 className="text-[19px] leading-tight font-serif text-stone-800">
                            {item.name}
                          </h3>
                          <p className="text-[#C57E3E] text-[17px] font-medium">
                            {formatCurrency(item.price)}
                          </p>
                          {!item.inStock && (
                            <p className="text-[12px] text-red-500 uppercase tracking-wider">
                              Out of stock
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-4">
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm border border-stone-300 bg-white text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#5B0E23] hover:text-[#5B0E23]"
                      >
                        Prev
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => setCurrentPage(page)}
                            className={`w-9 h-9 text-sm border transition-colors ${
                              currentPage === page
                                ? "bg-[#5B0E23] text-white border-[#5B0E23]"
                                : "bg-white text-stone-700 border-stone-300 hover:border-[#5B0E23] hover:text-[#5B0E23]"
                            }`}
                          >
                            {page}
                          </button>
                        ),
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(totalPages, prev + 1),
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm border border-stone-300 bg-white text-stone-700 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#5B0E23] hover:text-[#5B0E23]"
                      >
                        Next
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
                    className="text-[#5B0E23] font-semibold uppercase tracking-[0.2em] hover:underline"
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
