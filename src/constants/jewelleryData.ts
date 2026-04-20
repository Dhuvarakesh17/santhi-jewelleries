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
  image: string;
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
      image: imgPath,
      description: `A unique and masterfully crafted ${type.toLowerCase()} piece from our exclusive ${cat} collection.`
    };
  });
};

export const JEWELLERY_DATA: ShowcaseItem[] = [
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
    image: '/images/showcase/gold_heritage_heavy_necklace.webp', 
    description: 'A grand architectural masterpiece featuring complex Nagas work and royal antique finish.' 
  },
  { 
    id: 'sig-2', 
    name: 'Victorian Queen Necklace', 
    category: 'Signature Collection', 
    subcategory: 'Victorian', 
    type: 'Necklace', 
    image: '/images/showcase/Queen necklace 🍂🍂.webp', 
    description: 'Bespoke Victorian-inspired design set with premium gemstones and intricate gold lace work.' 
  },
  { 
    id: 'sig-3', 
    name: 'Royal Peacock Malai', 
    category: 'Signature Collection', 
    subcategory: 'Signature Malai', 
    type: 'Necklace', 
    image: '/images/showcase/silver_antique_malai.webp', 
    description: 'Hand-carved peacock motifs in heavy silver with gold duality plating.' 
  },
  { 
    id: 'sig-4', 
    name: 'Golden Empress Choker', 
    category: 'Signature Collection', 
    subcategory: 'Bridal Sets', 
    type: 'Choker', 
    image: '/images/showcase/gold_choker_bridal_set.webp', 
    description: 'The pinnacle of bridal luxury, a heavy choker set with cascading gold droplets.' 
  },
  { 
    id: 'sig-5', 
    name: 'Temple Flower Cuff', 
    category: 'Signature Collection', 
    subcategory: 'Bracelet', 
    type: 'Cuff', 
    image: '/images/showcase/gold_flower_cuff.webp', 
    description: 'A bold, structural cuff bracelet featuring blooming floral Nagas artistry.' 
  },
  { 
    id: 'sig-6', 
    name: 'Heritage Nagas Jhumka', 
    category: 'Signature Collection', 
    subcategory: 'Earrings', 
    type: 'Jhumka', 
    image: '/images/showcase/gold-jhumka1.webp', 
    description: 'Traditional temple jhumkas with exquisite deity carvings and pearl drops.' 
  },
];
