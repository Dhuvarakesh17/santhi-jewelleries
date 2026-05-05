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
  // User requested product
  {
    id: "102",
    name: "Lakshmi Maavilakku Kinnam (250g - 1kg)",
    category: "Silver",
    subcategory: "Traditional",
    type: "Kinnam",
    images: [
      "/images/products/silver/lakshmi-maavilakku-kinnam-250g-front.webp",
      "/images/products/silver/lakshmi-maavilakku-kinnam-250g-side.webp"
    ],
    description: "A beautiful, traditional, and auspicious Lakshmi Maavilakku Kinnam masterfully crafted in premium silver."
  },
  {
    id: "silver-maravai-thambulam",
    name: "Maravai Thambulam (250g - 1kg)",
    category: "Silver",
    subcategory: "Traditional",
    type: "Thambulam",
    images: [
      "/images/products/silver/maravai-thambulam-front.webp",
      "/images/products/silver/maravai-thambulam-side.webp"
    ],
    description: "A beautifully crafted traditional Maravai Thambulam."
  },
  {
    id: "silver-plain-sombu",
    name: "Plain Sombu 200 Gram",
    category: "Silver",
    subcategory: "Traditional",
    type: "Sombu",
    images: [
      "/images/products/silver/plain-sombu-200g-front.webp"
    ],
    description: "A classic, elegant plain silver Sombu."
  },
  {
    id: "silver-plate-180g",
    name: "Silver Plate (180g - 1KG)",
    category: "Silver",
    subcategory: "Traditional",
    type: "Plate",
    images: [
      "/images/products/silver/silver-plate-180g-front.webp"
    ],
    description: "A premium silver plate for traditional offerings."
  },
  {
    id: "silver-poo-koodai",
    name: "Poo Koodai 650 Gram",
    category: "Silver",
    subcategory: "Traditional",
    type: "Poo Koodai",
    images: [
      "/images/products/silver/poo-koodai-650g-front.webp",
      "/images/products/silver/poo-koodai-650g-side.webp"
    ],
    description: "An intricately designed silver Poo Koodai for floral offerings."
  },
  {
    id: "silver-set-kinnam",
    name: "Silver Set Kinnam",
    category: "Silver",
    subcategory: "Traditional",
    type: "Kinnam",
    images: [
      "/images/products/silver/set-kinnam-front.webp",
      "/images/products/silver/set-kinnam-one.webp"
    ],
    description: "A complete set of traditional silver Kinnams."
  },
  {
    id: "silver-gopura-vizhaku",
    name: "Silver Gopura Vizhaku 850 Gram",
    category: "Silver",
    subcategory: "Traditional",
    type: "Vizhaku",
    images: [
      "/images/products/silver/silver-gopura-vizhaku-850g-front.webp",
      "/images/products/silver/silver-gopura-vizhaku-850g-side.webp"
    ],
    description: "A grand silver Gopura Vizhaku weighing 850 grams."
  },
  {
    id: "silver-paneer-chembu",
    name: "Silver Paneer Chembu / Gulabdani",
    category: "Silver",
    subcategory: "Traditional",
    type: "Chembu",
    images: [
      "/images/products/silver/silver-paneer-chembu-front.webp"
    ],
    description: "A beautiful silver Paneer Chembu (Gulabdani) for sprinkling rose water."
  },
  {
    id: "silver-sembu",
    name: "Silver Sembu",
    category: "Silver",
    subcategory: "Traditional",
    type: "Sembu",
    images: [
      "/images/products/silver/sembu-front.webp"
    ],
    description: "A premium silver Sembu for auspicious rituals."
  },
  {
    id: "silver-judda",
    name: "Silver Judda 35 Gram",
    category: "Silver",
    subcategory: "Traditional",
    type: "Judda",
    images: [
      "/images/products/silver/silver-judda-35g-front.webp"
    ],
    description: "An elegant silver Judda hair accessory."
  },
  {
    id: "silver-thenga-chatti",
    name: "Silver Thenga Chatti",
    category: "Silver",
    subcategory: "Traditional",
    type: "Chatti",
    images: [
      "/images/products/silver/thenga-chatti-front.webp",
      "/images/products/silver/thenga-chatti-side.webp"
    ],
    description: "A beautifully crafted traditional Silver Thenga Chatti."
  },
  {
    id: "silver-vilaku-chatti-moodi",
    name: "Vilaku Chatti with Moodi",
    category: "Silver",
    subcategory: "Traditional",
    type: "Chatti",
    images: [
      "/images/products/silver/vilaku-chatti-moodi-front.webp"
    ],
    description: "An elegant Silver Vilaku Chatti complete with a beautifully designed moodi (lid)."
  },
  {
    id: "silver-anna-vizhaku",
    name: "Anna Vizhaku",
    category: "Silver",
    subcategory: "Traditional",
    type: "Vizhaku",
    images: [
      "/images/products/silver/anna-vizhaku-front.webp",
      "/images/products/silver/anna-vizhaku-top.webp",
      "/images/products/silver/anna-vizhaku-backtop.webp"
    ],
    description: "A beautifully crafted traditional silver Anna Vizhaku, featuring exquisite details."
  },
  {
    id: "silver-anna-vizhaku-1kg",
    name: "Anna Vizhaku 1KG",
    category: "Silver",
    subcategory: "Traditional",
    type: "Vizhaku",
    images: [
      "/images/products/silver/anna-vizhaku-1kg-front.webp"
    ],
    description: "A grand, heavy 1KG silver Anna Vizhaku, perfect for grand auspicious occasions."
  },
  {
    id: "silver-annam-engraving-thambulam",
    name: "Annam Engraving Thambulam",
    category: "Silver",
    subcategory: "Traditional",
    type: "Thambulam",
    images: [
      "/images/products/silver/annam-engraving-thambulam-front.webp"
    ],
    description: "An elegant silver Thambulam plate featuring beautiful Annam bird engravings."
  },
  {
    id: "silver-asta-lakshmi-basket",
    name: "Asta Lakshmi Flower Basket (250g - 1kg)",
    category: "Silver",
    subcategory: "Traditional",
    type: "Basket",
    images: [
      "/images/products/silver/asta-lakshmi-flower-basket-front.webp",
      "/images/products/silver/asta-lakshmi-flower-basket-zoom.webp"
    ],
    description: "An auspicious Asta Lakshmi Flower Basket available from 250 grams to 1kg."
  },
  {
    id: "silver-chettinadu-anna-vizhaku",
    name: "Chettinadu Anna Vizhaku 1KG",
    category: "Silver",
    subcategory: "Antique",
    type: "Vizhaku",
    images: [
      "/images/products/silver/chettinadu-anna-vizhaku-1kg-front.webp",
      "/images/products/silver/chettinadu-anna-vizhaku-1kg-top.webp"
    ],
    description: "A premium 1KG Chettinadu Anna Vizhaku showcasing authentic heritage craftsmanship."
  },
  {
    id: "silver-chettinadu-vizhaku",
    name: "Chettinadu Vizhaku 1KG",
    category: "Silver",
    subcategory: "Antique",
    type: "Vizhaku",
    images: [
      "/images/products/silver/chettinadu-vizhaku-1kg-front.webp"
    ],
    description: "A classic heavy 1KG Chettinadu Vizhaku."
  },
  {
    id: "silver-engraving-sangu",
    name: "Engraving Sangu 180 Gram",
    category: "Silver",
    subcategory: "Traditional",
    type: "Sangu",
    images: [
      "/images/products/silver/engraving-sangu-180g-front.webp",
      "/images/products/silver/engraving-sangu-180g-top.webp"
    ],
    description: "An intricately engraved silver Sangu weighing 180 grams."
  },
  {
    id: "silver-engraving-sombu",
    name: "Engraving Sombu 300 Gram",
    category: "Silver",
    subcategory: "Traditional",
    type: "Sombu",
    images: [
      "/images/products/silver/engraving-sombu-300g-front.webp",
      "/images/products/silver/engraving-sombu-300g-back.webp"
    ],
    description: "A beautifully detailed silver Sombu featuring traditional engravings."
  },
  {
    id: "silver-kadagam-1kg",
    name: "Kadagam 1KG",
    category: "Silver",
    subcategory: "Traditional",
    type: "Kadagam",
    images: [
      "/images/products/silver/kadagam-1kg-front.webp",
      "/images/products/silver/kadagam-1kg-left.webp"
    ],
    description: "A grand and majestic 1KG silver Kadagam."
  },
  {
    id: "silver-kathirikai",
    name: "Silver Kathirikai",
    category: "Silver",
    subcategory: "Traditional",
    type: "Pooja Item",
    images: [
      "/images/products/silver/kathirikai-front.webp"
    ],
    description: "A traditional silver Kathirikai for auspicious occasions."
  },
  {
    id: "silver-kerala-samai",
    name: "Kerala Samai Kuthu Vilakku Pair",
    category: "Silver",
    subcategory: "Traditional",
    type: "Vilakku",
    images: [
      "/images/products/silver/kerala-samai-kuthu-vilakku-front.webp",
      "/images/products/silver/silver-gemini-generated-1.webp"
    ],
    description: "An authentic pair of Kerala Samai Kuthu Vilakku, ranging from 500g to 1KG."
  },
  {
    id: "silver-karaikudi-items",
    name: "Karaikudi Silver Items",
    category: "Silver",
    subcategory: "Antique",
    type: "Karaikudi Items",
    images: [
      "/images/products/silver/karaikudi-items-front.webp",
      "/images/products/silver/karaikudi-items-side.webp"
    ],
    description: "Authentic and heavy set of Karaikudi heritage silver items."
  },
  {
    id: "silver-kilukki",
    name: "Silver Kilukki",
    category: "Silver",
    subcategory: "Traditional",
    type: "Kilukki",
    images: [
      "/images/products/silver/kilukki-front.webp",
      "/images/products/silver/kilukki-side.webp"
    ],
    description: "A beautifully crafted traditional silver Kilukki."
  },
  {
    id: "silver-koppi",
    name: "Silver Koppi",
    category: "Silver",
    subcategory: "Traditional",
    type: "Koppi",
    images: [
      "/images/products/silver/koppi-front.webp"
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

  // GEMS (Navaratna)
  ...generateSubcategoryItems('Gems', 'Ruby', 'Ruby Stone', 1),
  ...generateSubcategoryItems('Gems', 'Emerald', 'Emerald Stone', 1),
  ...generateSubcategoryItems('Gems', 'Sapphire', 'Sapphire Stone', 1),

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
