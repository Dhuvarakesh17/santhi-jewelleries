export interface ShowcaseItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
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

// Helper to generate 9 unique items per subcategory
const generateSubcategoryItems = (cat: string, sub: string, startIndex: number): ShowcaseItem[] => {
  return Array.from({ length: 9 }).map((_, i) => {
    // Pick from ALL_IMAGES using a offset to ensure variety across subcategories
    const imgIndex = (startIndex + i) % ALL_IMAGES.length;
    return {
      id: `${cat.toLowerCase()}-${sub.toLowerCase()}-${i + 1}`,
      name: `${cat} ${sub.slice(0, -1)} ${i + 1}`,
      category: cat,
      subcategory: sub,
      image: ALL_IMAGES[imgIndex],
      description: `A unique and masterfully crafted ${sub.toLowerCase()} piece from our exclusive ${cat} collection.`
    };
  });
};

export const JEWELLERY_DATA: ShowcaseItem[] = [
  // GOLD
  ...generateSubcategoryItems('Gold', 'Rings', 0),
  ...generateSubcategoryItems('Gold', 'Chains', 9),
  ...generateSubcategoryItems('Gold', 'Necklaces', 18),
  ...generateSubcategoryItems('Gold', 'Bangles', 2),
  ...generateSubcategoryItems('Gold', 'Earrings', 11),
  ...generateSubcategoryItems('Gold', 'Pendants', 20),
  ...generateSubcategoryItems('Gold', 'Bridal Sets', 5),

  // SILVER
  ...generateSubcategoryItems('Silver', 'Rings', 14),
  ...generateSubcategoryItems('Silver', 'Chains', 3),
  ...generateSubcategoryItems('Silver', 'Anklets', 12),
  ...generateSubcategoryItems('Silver', 'Bracelets', 1),
  ...generateSubcategoryItems('Silver', 'Earrings', 10),
  ...generateSubcategoryItems('Silver', 'Silver Articles', 19),

  // PLATINUM
  ...generateSubcategoryItems('Platinum', 'Rings', 6),
  ...generateSubcategoryItems('Platinum', 'Couple Rings', 15),
  ...generateSubcategoryItems('Platinum', 'Chains', 4),
  ...generateSubcategoryItems('Platinum', 'Bracelets', 13),
  ...generateSubcategoryItems('Platinum', 'Pendants', 7),

  // DIAMOND
  ...generateSubcategoryItems('Diamond', 'Rings', 17),
  ...generateSubcategoryItems('Diamond', 'Necklaces', 8),
  ...generateSubcategoryItems('Diamond', 'Earrings', 0),
  ...generateSubcategoryItems('Diamond', 'Bracelets', 9),
  ...generateSubcategoryItems('Diamond', 'Pendants', 18),
  ...generateSubcategoryItems('Diamond', 'Bridal Sets', 2),

  // CUSTOMIZED & LIGHTWEIGHT SPECIALS
  { id: 'custom-1', name: 'Name Bracelet', category: 'Gold', subcategory: 'Customized Jewelry', image: '/images/showcase/custom_name_bracelet.webp', description: 'Personalized gold name bracelet.' },
  { id: 'custom-2', name: 'Photo Pendant', category: 'Gold', subcategory: 'Customized Jewelry', image: '/images/showcase/custom_photo_pendant.webp', description: 'Memory photo engraved locket.' },
  { id: 'light-1', name: 'Heart Gold Haram', category: 'Gold', subcategory: 'Necklaces', image: '/images/showcase/lightweight_heart_haram.webp', description: 'Lightweight 22K gold heart haram.' },
  { id: 'light-2', name: 'Silver Baby Thandai', category: 'Silver', subcategory: 'Anklets', image: '/images/showcase/lightweight_baby_thandai.webp', description: 'Traditional baby silver anklets.' },
];
