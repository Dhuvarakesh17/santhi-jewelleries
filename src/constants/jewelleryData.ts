import { 
  GOLD_IMAGES, 
  SILVER_IMAGES, 
  DIAMOND_IMAGES, 
  GEM_IMAGES, 
  PLATINUM_IMAGES,
  NO_IMAGE 
} from "./imageAssets";

export interface ShowcaseItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  type: string;
  images: string[];
  description: string;
}

// Track used image indices globally for this generation pass
const usedIndices: Record<string, number> = {
  Gold: 0,
  Silver: 0,
  Diamond: 0,
  Gems: 0,
  Platinum: 0,
  "Signature Collection": 0,
};

const getCategoryImages = (cat: string) => {
  switch (cat) {
    case "Gold": return GOLD_IMAGES;
    case "Silver": return SILVER_IMAGES;
    case "Diamond": return DIAMOND_IMAGES;
    case "Gems": return GEM_IMAGES;
    case "Platinum": return PLATINUM_IMAGES;
    default: return GOLD_IMAGES; // Default for Signature or others
  }
};

// Helper to generate unique items per subcategory
const generateSubcategoryItems = (cat: string, sub: string, type: string, count: number = 8): ShowcaseItem[] => {
  const images = getCategoryImages(cat);
  
  return Array.from({ length: count }).map((_, i) => {
    const currentIndex = usedIndices[cat] || 0;
    const imgPath = currentIndex < images.length ? images[currentIndex] : NO_IMAGE;
    
    // Increment global category counter
    if (usedIndices[cat] !== undefined) {
      usedIndices[cat]++;
    }

    return {
      id: `${cat.toLowerCase()}-${sub.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      name: `${cat} ${type} ${i + 1}`,
      category: cat,
      subcategory: sub,
      type: type,
      images: imgPath === NO_IMAGE ? ["/images/placeholder.webp"] : [imgPath],
      description: `A unique and masterfully crafted ${type.toLowerCase()} piece from our exclusive ${cat} collection.`
    };
  });
};

export const JEWELLERY_DATA: ShowcaseItem[] = [
  // ===== CHETTINADU SILVER COLLECTIONS =====
  {
    id: "102",
    name: "Lakshmi Maavilakku Kinnam (250g - 1kg)",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Kinnam",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/lakshmi-maavilakku-kinnam-250g-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/lakshmi-maavilakku-kinnam-250g-side.webp",
      "/images/products/silver/ChettiNadu Silver Collections/lakshmi-maavilakku-kinnam-front.webp"
    ],
    description: "A beautiful, traditional, and auspicious Lakshmi Maavilakku Kinnam masterfully crafted in premium silver."
  },
  {
    id: "silver-maravai-thambulam",
    name: "Maravai Thambulam (250g - 1kg)",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Thambulam",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/maravai-thambulam-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/maravai-thambulam-side.webp"
    ],
    description: "A beautifully crafted traditional Maravai Thambulam."
  },
  {
    id: "silver-plain-sombu",
    name: "Plain Sombu 200 Gram",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Sombu",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/plain-sombu-200g-front.webp"
    ],
    description: "A classic, elegant plain silver Sombu."
  },
  {
    id: "silver-plate-180g",
    name: "Silver Plate (180g - 1KG)",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Plate",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/silver-plate-180g-front.webp"
    ],
    description: "A premium silver plate for traditional offerings."
  },
  {
    id: "silver-poo-koodai",
    name: "Poo Koodai 650 Gram",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Poo Koodai",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/poo-koodai-650g-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/poo-koodai-650g-side.webp"
    ],
    description: "An intricately designed silver Poo Koodai for floral offerings."
  },
  {
    id: "silver-set-kinnam",
    name: "Silver Set Kinnam",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Kinnam",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/set-kinnam-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/set-kinnam-one.webp"
    ],
    description: "A complete set of traditional silver Kinnams."
  },
  {
    id: "silver-gopura-vizhaku",
    name: "Silver Gopura Vizhaku 850 Gram",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Vizhaku",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/silver-gopura-vizhaku-850g-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/silver-gopura-vizhaku-850g-side.webp"
    ],
    description: "A grand silver Gopura Vizhaku weighing 850 grams."
  },
  {
    id: "silver-paneer-chembu",
    name: "Silver Paneer Chembu / Gulabdani",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Chembu",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/silver-paneer-chembu-front.webp"
    ],
    description: "A beautiful silver Paneer Chembu (Gulabdani) for sprinkling rose water."
  },
  {
    id: "silver-sembu",
    name: "Silver Sembu",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Sembu",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/sembu-front.webp"
    ],
    description: "A premium silver Sembu for auspicious rituals."
  },
  {
    id: "silver-judda",
    name: "Silver Judda 35 Gram",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Judda",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/silver-judda-35g-front.webp"
    ],
    description: "An elegant silver Judda hair accessory."
  },
  {
    id: "silver-thenga-chatti",
    name: "Silver Thenga Chatti",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Chatti",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/thenga-chatti-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/thenga-chatti-side.webp"
    ],
    description: "A beautifully crafted traditional Silver Thenga Chatti."
  },
  {
    id: "silver-vilaku-chatti-moodi",
    name: "Vilaku Chatti with Moodi",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Chatti",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/vilaku-chatti-moodi-front.webp"
    ],
    description: "An elegant Silver Vilaku Chatti complete with a beautifully designed moodi (lid)."
  },
  {
    id: "silver-anna-vizhaku",
    name: "Anna Vizhaku",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Vizhaku",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/anna-vizhaku-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/anna-vizhaku-top.webp",
      "/images/products/silver/ChettiNadu Silver Collections/anna-vizhaku-backtop.webp"
    ],
    description: "A beautifully crafted traditional silver Anna Vizhaku, featuring exquisite details."
  },
  {
    id: "silver-anna-vizhaku-1kg",
    name: "Anna Vizhaku 1KG",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Vizhaku",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/anna-vizhaku-1kg-front.webp"
    ],
    description: "A grand, heavy 1KG silver Anna Vizhaku, perfect for grand auspicious occasions."
  },
  {
    id: "silver-annam-engraving-thambulam",
    name: "Annam Engraving Thambulam",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Thambulam",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/annam-engraving-thambulam-front.webp"
    ],
    description: "An elegant silver Thambulam plate featuring beautiful Annam bird engravings."
  },
  {
    id: "silver-asta-lakshmi-basket",
    name: "Asta Lakshmi Flower Basket (250g - 1kg)",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Basket",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/asta-lakshmi-flower-basket-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/asta-lakshmi-flower-basket-zoom.webp"
    ],
    description: "An auspicious Asta Lakshmi Flower Basket available from 250 grams to 1kg."
  },
  {
    id: "silver-chettinadu-anna-vizhaku",
    name: "Chettinadu Anna Vizhaku 1KG",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Vizhaku",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/chettinadu-anna-vizhaku-1kg-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/chettinadu-anna-vizhaku-1kg-top.webp"
    ],
    description: "A premium 1KG Chettinadu Anna Vizhaku showcasing authentic heritage craftsmanship."
  },
  {
    id: "silver-chettinadu-vizhaku",
    name: "Chettinadu Vizhaku 1KG",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Vizhaku",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/chettinadu-vizhaku-1kg-front.webp"
    ],
    description: "A classic heavy 1KG Chettinadu Vizhaku."
  },
  {
    id: "silver-engraving-sangu",
    name: "Engraving Sangu 180 Gram",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Sangu",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/engraving-sangu-180g-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/engraving-sangu-180g-top.webp"
    ],
    description: "An intricately engraved silver Sangu weighing 180 grams."
  },
  {
    id: "silver-engraving-sombu",
    name: "Engraving Sombu 300 Gram",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Sombu",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/engraving-sombu-300g-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/engraving-sombu-300g-back.webp"
    ],
    description: "A beautifully detailed silver Sombu featuring traditional engravings."
  },
  {
    id: "silver-kadagam-1kg",
    name: "Kadagam 1KG",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Kadagam",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/kadagam-1kg-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/kadagam-1kg-left.webp"
    ],
    description: "A grand and majestic 1KG silver Kadagam."
  },
  {
    id: "silver-kathirikai",
    name: "Silver Kathirikai",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Pooja Item",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/kathirikai-front.webp"
    ],
    description: "A traditional silver Kathirikai for auspicious occasions."
  },
  {
    id: "silver-kerala-samai",
    name: "Kerala Samai Kuthu Vilakku Pair",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Vilakku",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/kerala-samai-kuthu-vilakku-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/silver-gemini-generated-1.webp"
    ],
    description: "An authentic pair of Kerala Samai Kuthu Vilakku, ranging from 500g to 1KG."
  },
  {
    id: "silver-karaikudi-items",
    name: "Karaikudi Silver Items",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Karaikudi Items",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/karaikudi-items-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/karaikudi-items-side.webp"
    ],
    description: "Authentic and heavy set of Karaikudi heritage silver items."
  },
  {
    id: "silver-kilukki",
    name: "Silver Kilukki",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Kilukki",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/kilukki-front.webp",
      "/images/products/silver/ChettiNadu Silver Collections/kilukki-side.webp"
    ],
    description: "A beautifully crafted traditional silver Kilukki."
  },
  {
    id: "silver-koppi",
    name: "Silver Koppi",
    category: "Silver",
    subcategory: "CHETTINADU SILVER COLLECTIONS",
    type: "Koppi",
    images: [
      "/images/products/silver/ChettiNadu Silver Collections/koppi-front.webp"
    ],
    description: "A premium silver Koppi piece."
  },
  // Multi-image demo product
  {
    id: "101",
    name: "Gold Jhumka",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold-jhumka-front.webp",
      "/images/products/gold-jhumka-left.webp",
      "/images/products/gold-jhumka-right.webp"
    ],
    description: "A unique and masterfully crafted earrings piece from our exclusive Gold collection."
  },

  // GOLD - Using smaller counts to ensure image uniqueness with current assets
  ...generateSubcategoryItems('Gold', 'GOLD NECKLACE', 'Necklace', 4),
  ...generateSubcategoryItems('Gold', 'GOLD CHAIN', 'Chain', 4),
  ...generateSubcategoryItems('Gold', 'GOLD ANKLET', 'Anklet', 3),
  ...generateSubcategoryItems('Gold', 'GOLD RING', 'Ring', 4),
  ...generateSubcategoryItems('Gold', 'GOLD BRACELET', 'Bracelet', 3),
  ...generateSubcategoryItems('Gold', 'GOLD EARRINGS', 'Earrings', 2),
  ...generateSubcategoryItems('Gold', 'GOLD BANGLES', 'Bangles', 2),

  // SILVER
  ...generateSubcategoryItems('Silver', 'Traditional', 'Traditional', 3),
  ...generateSubcategoryItems('Silver', 'Nagas', 'Nagas', 3),
  ...generateSubcategoryItems('Silver', 'Antique', 'Antique', 3),
  ...generateSubcategoryItems('Silver', 'Swarovski', 'Swarovski', 3),
  ...generateSubcategoryItems('Silver', 'Victorian', 'Victorian', 2),
  ...generateSubcategoryItems('Silver', 'Necklace Sets', 'Necklace Set', 2),

  // DIAMOND
  ...generateSubcategoryItems('Diamond', 'Diamond Rings', 'Ring', 2),
  ...generateSubcategoryItems('Diamond', 'Diamond Necklace', 'Necklace', 2),
  ...generateSubcategoryItems('Diamond', 'Diamond Earrings', 'Earrings', 1),
  ...generateSubcategoryItems('Diamond', 'Diamond Pendants', 'Pendant', 1),
  ...generateSubcategoryItems('Diamond', 'Diamond Chain', 'Chain', 1),

  // PLATINUM
  ...generateSubcategoryItems('Platinum', 'Rings', 'Ring', 1),
  ...generateSubcategoryItems('Platinum', 'Couple Rings', 'Couple Ring', 1),
  ...generateSubcategoryItems('Platinum', 'Chains', 'Chain', 1),
  ...generateSubcategoryItems('Platinum', 'Bracelets', 'Bracelet', 1),

  // ===== GEMS (Navaratna) =====
  // --- Ruby ---
  {
    id: "gem-ruby",
    name: "Ruby",
    category: "Gems",
    subcategory: "Ruby",
    type: "Gemstone",
    images: ["/images/products/Gems/Ruby/ruby.webp"],
    description: "A vibrant, premium-quality natural Ruby — the king of gemstones, symbolizing passion and prosperity."
  },
  {
    id: "gem-star-ruby",
    name: "Star Ruby",
    category: "Gems",
    subcategory: "Ruby",
    type: "Gemstone",
    images: ["/images/products/Gems/Ruby/star-ruby.webp"],
    description: "A rare Star Ruby displaying a mesmerizing six-rayed asterism, prized by collectors."
  },
  {
    id: "gem-pink-sapphire",
    name: "Pink Sapphire",
    category: "Gems",
    subcategory: "Ruby",
    type: "Gemstone",
    images: ["/images/products/Gems/Ruby/pink-sapphire.webp"],
    description: "A delicate Pink Sapphire with brilliant lustre, perfect for elegant jewellery settings."
  },
  // --- Pearl ---
  {
    id: "gem-pearl",
    name: "Pearl",
    category: "Gems",
    subcategory: "Pearl",
    type: "Gemstone",
    images: ["/images/products/Gems/Pearl/pearl.webp"],
    description: "A luminous natural Pearl radiating timeless elegance and purity."
  },
  {
    id: "gem-white-coral",
    name: "White Coral",
    category: "Gems",
    subcategory: "Pearl",
    type: "Gemstone",
    images: ["/images/products/Gems/Pearl/white-coral.webp"],
    description: "A pristine White Coral gemstone believed to bring peace and mental clarity."
  },
  // --- Red Coral ---
  {
    id: "gem-red-coral",
    name: "Red Coral",
    category: "Gems",
    subcategory: "Red Coral",
    type: "Gemstone",
    images: ["/images/products/Gems/Red Coral/red-coral.webp"],
    description: "A vibrant natural Red Coral (Moonga) — an auspicious gemstone associated with Mars."
  },
  // --- Emerald ---
  {
    id: "gem-emerald",
    name: "Emerald",
    category: "Gems",
    subcategory: "Emerald",
    type: "Gemstone",
    images: ["/images/products/Gems/Emerald/emerald.webp"],
    description: "A vivid green natural Emerald (Panna), the gemstone of Mercury, symbolizing wisdom and growth."
  },
  {
    id: "gem-peridot",
    name: "Peridot",
    category: "Gems",
    subcategory: "Emerald",
    type: "Gemstone",
    images: ["/images/products/Gems/Emerald/peridot.webp"],
    description: "A brilliant olive-green Peridot, a refreshing alternative gemstone in the Emerald family."
  },
  // --- Yellow Sapphire ---
  {
    id: "gem-yellow-sapphire",
    name: "Yellow Sapphire",
    category: "Gems",
    subcategory: "Yellow Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Yellow Sapphire/yellow-sapphire.webp"],
    description: "A radiant Yellow Sapphire (Pukhraj), the gemstone of Jupiter, bringing wisdom and fortune."
  },
  {
    id: "gem-citrine",
    name: "Citrine",
    category: "Gems",
    subcategory: "Yellow Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Yellow Sapphire/citrine.webp"],
    description: "A warm golden Citrine gemstone, known as the merchant's stone for attracting abundance."
  },
  // --- Diamond ---
  {
    id: "gem-diamond",
    name: "Diamond",
    category: "Gems",
    subcategory: "Diamond",
    type: "Gemstone",
    images: ["/images/products/Gems/Diamond/diamond.webp"],
    description: "A dazzling natural Diamond of exceptional clarity — the eternal symbol of luxury and strength."
  },
  {
    id: "gem-white-sapphire",
    name: "White Sapphire",
    category: "Gems",
    subcategory: "Diamond",
    type: "Gemstone",
    images: ["/images/products/Gems/Diamond/white-sapphire.webp"],
    description: "A brilliant White Sapphire, a stunning and affordable alternative to diamond."
  },
  {
    id: "gem-white-topaz",
    name: "White Topaz",
    category: "Gems",
    subcategory: "Diamond",
    type: "Gemstone",
    images: ["/images/products/Gems/Diamond/white-topaz.webp"],
    description: "A sparkling White Topaz with excellent clarity and fire."
  },
  {
    id: "gem-zircon",
    name: "Zircon",
    category: "Gems",
    subcategory: "Diamond",
    type: "Gemstone",
    images: ["/images/products/Gems/Diamond/zircon.webp"],
    description: "A natural Zircon with exceptional brilliance, often used as a diamond substitute."
  },
  // --- Blue Sapphire ---
  {
    id: "gem-blue-sapphire",
    name: "Blue Sapphire",
    category: "Gems",
    subcategory: "Blue Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Blue Sapphire/blue-sapphire.webp"],
    description: "A majestic Blue Sapphire (Neelam), the powerful gemstone of Saturn for rapid fortune."
  },
  {
    id: "gem-aquamarine",
    name: "Aquamarine",
    category: "Gems",
    subcategory: "Blue Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Blue Sapphire/aquamarine.webp"],
    description: "A serene Aquamarine with calming ocean-blue hues, symbolizing tranquility."
  },
  {
    id: "gem-blue-topaz",
    name: "Blue Topaz",
    category: "Gems",
    subcategory: "Blue Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Blue Sapphire/blue-topaz.webp"],
    description: "A vivid Blue Topaz displaying a stunning Swiss-blue colour with exceptional clarity."
  },
  {
    id: "gem-blue-zircon",
    name: "Blue Zircon",
    category: "Gems",
    subcategory: "Blue Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Blue Sapphire/blue-zircon.webp"],
    description: "A brilliant Blue Zircon with dazzling fire and dispersion."
  },
  {
    id: "gem-iolite",
    name: "Iolite",
    category: "Gems",
    subcategory: "Blue Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Blue Sapphire/iolite.webp"],
    description: "A violet-blue Iolite known as the Viking's compass stone, prized for its pleochroism."
  },
  {
    id: "gem-neelambari",
    name: "Neelambari",
    category: "Gems",
    subcategory: "Blue Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Blue Sapphire/neelambari.webp"],
    description: "A deep-hued Neelambari stone, a traditional favourite in South Indian gem collections."
  },
  {
    id: "gem-purple-sapphire",
    name: "Purple Sapphire",
    category: "Gems",
    subcategory: "Blue Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Blue Sapphire/purple-sapphire.webp"],
    description: "A regal Purple Sapphire displaying a rich violet hue with superb saturation."
  },
  {
    id: "gem-star-sapphires",
    name: "Star Sapphire",
    category: "Gems",
    subcategory: "Blue Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Blue Sapphire/star-sapphires.webp"],
    description: "A rare Star Sapphire exhibiting a captivating six-rayed star phenomenon."
  },
  {
    id: "gem-tanzanite",
    name: "Tanzanite",
    category: "Gems",
    subcategory: "Blue Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Blue Sapphire/tanzanite.webp"],
    description: "An exquisite Tanzanite with mesmerizing violet-blue colour, rarer than diamonds."
  },
  {
    id: "gem-turquoise",
    name: "Turquoise",
    category: "Gems",
    subcategory: "Blue Sapphire",
    type: "Gemstone",
    images: ["/images/products/Gems/Blue Sapphire/turquoise.webp"],
    description: "A vibrant Turquoise gemstone with a distinctive sky-blue hue, cherished for centuries."
  },
  // --- Hessonite ---
  {
    id: "gem-hessonite",
    name: "Hessonite",
    category: "Gems",
    subcategory: "Hessonite",
    type: "Gemstone",
    images: ["/images/products/Gems/Hessonite/hessonite.webp"],
    description: "A warm honey-coloured Hessonite (Gomed), the gemstone of Rahu for protection and clarity."
  },
  {
    id: "gem-amethyst",
    name: "Amethyst",
    category: "Gems",
    subcategory: "Hessonite",
    type: "Gemstone",
    images: ["/images/products/Gems/Hessonite/amethyst.webp"],
    description: "A stunning purple Amethyst, the stone of spiritual wisdom and calm."
  },
  {
    id: "gem-ametrine",
    name: "Ametrine",
    category: "Gems",
    subcategory: "Hessonite",
    type: "Gemstone",
    images: ["/images/products/Gems/Hessonite/amertine.webp"],
    description: "A unique Ametrine blending Amethyst purple and Citrine gold in a single gemstone."
  },
  // --- Cat's Eye ---
  {
    id: "gem-cats-eye",
    name: "Cat's Eye",
    category: "Gems",
    subcategory: "Cat's Eye",
    type: "Gemstone",
    images: ["/images/products/Gems/Cat's Eye/cats-eye.webp"],
    description: "A remarkable Cat's Eye (Lehsunia) chrysoberyl displaying a sharp chatoyant band."
  },
  {
    id: "gem-fire-opal",
    name: "Fire Opal",
    category: "Gems",
    subcategory: "Cat's Eye",
    type: "Gemstone",
    images: ["/images/products/Gems/Cat's Eye/fire-opal.webp"],
    description: "A fiery Fire Opal with vivid orange-red play of colour, radiating warmth and energy."
  },

  // SIGNATURE COLLECTION
  { 
    id: 'sig-1', 
    name: 'Maharani Antique Haram', 
    category: 'Signature Collection', 
    subcategory: 'Antique Haram', 
    type: 'Necklace', 
    images: ['/images/showcase/gold_heritage_heavy_necklace.webp'], 
    description: 'A grand architectural masterpiece featuring complex Nagas work and royal antique finish.' 
  },
  { 
    id: 'sig-2', 
    name: 'Victorian Queen Necklace', 
    category: 'Signature Collection', 
    subcategory: 'Victorian', 
    type: 'Necklace', 
    images: ['/images/showcase/Queen necklace 🍂🍂.webp'], 
    description: 'Bespoke Victorian-inspired design set with premium gemstones and intricate gold lace work.' 
  },
  { 
    id: 'sig-3', 
    name: 'Royal Peacock Malai', 
    category: 'Signature Collection', 
    subcategory: 'Signature Malai', 
    type: 'Necklace', 
    images: ['/images/showcase/silver_antique_malai.webp'], 
    description: 'Hand-carved peacock motifs in heavy silver with gold duality plating.' 
  },
  { 
    id: 'sig-4', 
    name: 'Golden Empress Choker', 
    category: 'Signature Collection', 
    subcategory: 'Bridal Sets', 
    type: 'Choker', 
    images: ['/images/showcase/gold_choker_bridal_set.webp'], 
    description: 'The pinnacle of bridal luxury, a heavy choker set with cascading gold droplets.' 
  },
  { 
    id: 'sig-5', 
    name: 'Temple Flower Cuff', 
    category: 'Signature Collection', 
    subcategory: 'Bracelet', 
    type: 'Cuff', 
    images: ['/images/showcase/gold_flower_cuff.webp'], 
    description: 'A bold, structural cuff bracelet featuring blooming floral Nagas artistry.' 
  },
  { 
    id: 'sig-6', 
    name: 'Heritage Nagas Jhumka', 
    category: 'Signature Collection', 
    subcategory: 'Earrings', 
    type: 'Jhumka', 
    images: ['/images/showcase/gold-jhumka1.webp'], 
    description: 'Traditional temple jhumkas with exquisite deity carvings and pearl drops.' 
  },
];
