export interface ShowcaseItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  type: string;
  image: string;
  description: string;
}

const ALL_IMAGES = [
  '/images/showcase/gold_1.webp', '/images/showcase/gold_2.webp', '/images/showcase/gold_3.webp',
  '/images/showcase/gold_4.webp', '/images/showcase/gold_5.webp', '/images/showcase/gold_ring_1.webp',
  '/images/showcase/gold_chain_1.webp', '/images/showcase/gold_bangle_1.webp', '/images/showcase/gold_ext_1.webp',
  '/images/showcase/silver_1.webp', '/images/showcase/silver_2.webp', '/images/showcase/silver_3.webp',
  '/images/showcase/silver_anklet_1.webp', '/images/showcase/silver_ring_1.webp', '/images/showcase/silver_ext_1.webp',
  '/images/showcase/diamond_ring_1.webp', '/images/showcase/diamond_pendant_1.webp', '/images/showcase/diamond_ext_1.webp',
  '/images/showcase/platinum_band_1.webp', '/images/showcase/platinum_chain_1.webp', '/images/showcase/platinum_2.webp'
];

// Helper to generate unique items per subcategory
const generateSubcategoryItems = (cat: string, sub: string, type: string, startIndex: number): ShowcaseItem[] => {
  return Array.from({ length: 32 }).map((_, i) => {
    // Pick from ALL_IMAGES using a offset to ensure variety across subcategories
    const imgIndex = (startIndex + i) % ALL_IMAGES.length;
    return {
      id: `${cat.toLowerCase()}-${sub.toLowerCase().replace(/\s+/g, '-')}-${i + 1}`,
      name: `${cat} ${type} ${i + 1}`,
      category: cat,
      subcategory: sub,
      type: type,
      image: ALL_IMAGES[imgIndex],
      description: `A unique and masterfully crafted ${type.toLowerCase()} piece from our exclusive ${cat} collection.`
    };
  });
};

export const JEWELLERY_DATA: ShowcaseItem[] = [
  // GOLD
  ...generateSubcategoryItems('Gold', 'GOLD NECKLACE', 'Necklace', 0),
  ...generateSubcategoryItems('Gold', 'GOLD CHAIN', 'Chain', 9),
  ...generateSubcategoryItems('Gold', 'GOLD ANKLET', 'Anklet', 18),
  ...generateSubcategoryItems('Gold', 'GOLD RING', 'Ring', 2),
  ...generateSubcategoryItems('Gold', 'GOLD BRACELET', 'Bracelet', 11),
  ...generateSubcategoryItems('Gold', 'GOLD EARRINGS', 'Earrings', 20),
  ...generateSubcategoryItems('Gold', 'GOLD BANGLES', 'Bangles', 5),

  // SILVER
  ...generateSubcategoryItems('Silver', 'Traditional', 'Traditional', 14),
  ...generateSubcategoryItems('Silver', 'Nagas', 'Nagas', 3),
  ...generateSubcategoryItems('Silver', 'Antique', 'Antique', 12),
  ...generateSubcategoryItems('Silver', 'Swarovski', 'Swarovski', 1),
  ...generateSubcategoryItems('Silver', 'Victorian', 'Victorian', 10),
  ...generateSubcategoryItems('Silver', 'Necklace Sets', 'Necklace Set', 19),

  // PLATINUM
  ...generateSubcategoryItems('Platinum', 'Rings', 'Ring', 6),
  ...generateSubcategoryItems('Platinum', 'Couple Rings', 'Couple Ring', 15),
  ...generateSubcategoryItems('Platinum', 'Chains', 'Chain', 4),
  ...generateSubcategoryItems('Platinum', 'Bracelets', 'Bracelet', 13),
  ...generateSubcategoryItems('Platinum', 'Pendants', 'Pendant', 7),

  // DIAMOND
  ...generateSubcategoryItems('Diamond', 'Diamond Rings', 'Ring', 17),
  ...generateSubcategoryItems('Diamond', 'Diamond Necklace', 'Necklace', 8),
  ...generateSubcategoryItems('Diamond', 'Diamond Earrings', 'Earrings', 0),
  ...generateSubcategoryItems('Diamond', 'Diamond Pendants', 'Pendant', 18),
  ...generateSubcategoryItems('Diamond', 'Diamond Chain', 'Chain', 9),
  ...generateSubcategoryItems('Diamond', 'Diamond Kada', 'Kada', 2),

  // SIGNATURE COLLECTION (MOST EXCLUSIVE)
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
  ...generateSubcategoryItems('Signature Collection', 'Heritage', 'Masterpiece', 5),
  ...generateSubcategoryItems('Signature Collection', 'Signature Selection', 'Bespoke', 12),

  // CUSTOMIZED & LIGHTWEIGHT SPECIALS
  { id: 'custom-1', name: 'Gold Fingerprint Ring', category: 'Gold', subcategory: 'Fingerprint Rings', type: 'Ring', image: '/images/showcase/custom_name_bracelet.webp', description: 'Personalized gold name bracelet.' },
  { id: 'custom-2', name: 'Gold Photo Pendant', category: 'Gold', subcategory: 'Other Customized Products', type: 'Pendant', image: '/images/showcase/custom_photo_pendant.webp', description: 'Memory photo engraved locket.' },
  { id: 'light-1', name: 'Gold Heart Haram', category: 'Gold', subcategory: 'GOLD HARAM', type: 'Haram', image: '/images/showcase/lightweight_heart_haram.webp', description: 'Lightweight 22K gold heart haram.' },
  { id: 'light-2', name: 'Silver Baby Thandai', category: 'Silver', subcategory: 'Baby Anklets', type: 'Anklet', image: '/images/showcase/lightweight_baby_thandai.webp', description: 'Traditional baby silver anklets.' },
];
