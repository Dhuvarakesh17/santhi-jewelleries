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
  // Real Gold Harams
  {
    id: "gold-haram-1",
    name: "Classic Mango Gold Haram",
    category: "Gold",
    subcategory: "GOLD HARAM",
    type: "Haram",
    images: [
      "/images/products/gold/Haram/haram1.webp",
      "/images/products/gold/Haram/haram1_view.webp"
    ],
    description: "A magnificent traditional mango-shaped haram necklace crafted in 22K gold, perfect for heritage bridal styling."
  },
  {
    id: "gold-haram-2",
    name: "Royal Temple Nakshi Haram",
    category: "Gold",
    subcategory: "GOLD HARAM",
    type: "Haram",
    images: [
      "/images/products/gold/Haram/haram2.webp",
      "/images/products/gold/Haram/haram2_view.webp"
    ],
    description: "Showcases intricate temple Nakshi work with divine motifs and heavy gold hangings, representing South Indian royalty."
  },
  {
    id: "gold-haram-3",
    name: "Elegant Peacock Bridal Haram",
    category: "Gold",
    subcategory: "GOLD HARAM",
    type: "Haram",
    images: [
      "/images/products/gold/Haram/haram3.webp",
      "/images/products/gold/Haram/haram3_view.webp"
    ],
    description: "A stunning long peacock haram adorned with delicate gold bead clusters and exceptional filigree patterns."
  },
  {
    id: "gold-haram-4",
    name: "Antique Gold Bead Haram",
    category: "Gold",
    subcategory: "GOLD HARAM",
    type: "Haram",
    images: [
      "/images/products/gold/Haram/haram4.webp",
      "/images/products/gold/Haram/haram4_view.webp"
    ],
    description: "Features multiple strands of classic gold beads leading down to a grand pendant with premium antique finish."
  },
  {
    id: "gold-haram-5",
    name: "Traditional Guttapusalu Haram",
    category: "Gold",
    subcategory: "GOLD HARAM",
    type: "Haram",
    images: [
      "/images/products/gold/Haram/haram5.webp",
      "/images/products/gold/Haram/haram5_view.webp"
    ],
    description: "Adorned with bunching gold beads along a masterfully designed chain, ideal for grand weddings and festivities."
  },
  {
    id: "gold-haram-6",
    name: "Delicate Leaf-Pattern Gold Haram",
    category: "Gold",
    subcategory: "GOLD HARAM",
    type: "Haram",
    images: [
      "/images/products/gold/Haram/haram6.webp",
      "/images/products/gold/Haram/haram6_view.webp"
    ],
    description: "A lightweight, long haram showcasing delicate leaf motifs linked beautifully in high-polish 22K gold."
  },
  {
    id: "gold-haram-7",
    name: "Contemporary Kundan Gold Haram",
    category: "Gold",
    subcategory: "GOLD HARAM",
    type: "Haram",
    images: [
      "/images/products/gold/Haram/haram7.webp",
      "/images/products/gold/Haram/haram7_view.webp"
    ],
    description: "Blends traditional Kundan artistry with contemporary long chain styling, finished with dainty gold drops."
  },
  {
    id: "gold-haram-8",
    name: "Grand Royal Heritage Haram",
    category: "Gold",
    subcategory: "GOLD HARAM",
    type: "Haram",
    images: [
      "/images/products/gold/Haram/haram8.webp",
      "/images/products/gold/Haram/haram8_view.webp"
    ],
    description: "The pinnacle of bridal luxury, featuring multiple layers of heavily sculpted gold panels and intricate engravings."
  },

  // Real Gold Necklaces
  {
    id: "gold-necklace-1",
    name: "Classic Gold Choker Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec1.webp",
      "/images/products/gold/necklace/nec1_sideview.webp"
    ],
    description: "An elegant and traditional gold choker necklace designed with intricate motifs, offering a royal look."
  },
  {
    id: "gold-necklace-2",
    name: "Antique Temple Gold Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec2.webp",
      "/images/products/gold/necklace/nec2_sideview.webp"
    ],
    description: "A heritage temple-style gold necklace showcasing premium craftsmanship with divine design patterns."
  },
  {
    id: "gold-necklace-3",
    name: "Elegant Floral Gold Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec3.webp",
      "/images/products/gold/necklace/nec3_sideview.webp"
    ],
    description: "Features delicate floral elements beautifully cast in pure gold, creating a graceful statement piece."
  },
  {
    id: "gold-necklace-4",
    name: "Majestic Heritage Haram Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec4.webp",
      "/images/products/gold/necklace/nec4_sideview.webp"
    ],
    description: "A longer traditional necklace featuring heavy gold work, ideal for bridal wear and grand celebrations."
  },
  {
    id: "gold-necklace-5",
    name: "Royal Peacock Gold Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec5.webp",
      "/images/products/gold/necklace/nec5_sideview.webp"
    ],
    description: "Adorned with majestic peacock carvings and intricate drop hangings in pure 22K gold."
  },
  {
    id: "gold-necklace-6",
    name: "Intricate Filigree Gold Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec6.webp",
      "/images/products/gold/necklace/nec6_sideview.webp"
    ],
    description: "Exquisite filigree patterns hand-woven in gold thread, combining classic artistry with a modern silhouette."
  },
  {
    id: "gold-necklace-7",
    name: "Traditional Mango Gold Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec7.webp",
      "/images/products/gold/necklace/nec7_sideview.webp"
    ],
    description: "The classic South Indian Manga Malai redesigned with a contemporary touch for the modern bride."
  },
  {
    id: "gold-necklace-8",
    name: "Modern Designer Gold Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec8.webp",
      "/images/products/gold/necklace/nec8_sideview.webp"
    ],
    description: "A stylish designer piece presenting fluid geometric links and polished gold drops."
  },
  {
    id: "gold-necklace-9",
    name: "Kundan Fusion Gold Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec9.webp",
      "/images/products/gold/necklace/nec9_sideview.webp"
    ],
    description: "Fuses traditional Kundan-inspired motifs with high-polish yellow gold drops."
  },
  {
    id: "gold-necklace-10",
    name: "Opulent Bridal Gold Haram",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec10.webp",
      "/images/products/gold/necklace/nec10_sideview.webp"
    ],
    description: "A grand bridal masterwork displaying multiple layers of finely detailed gold motifs."
  },
  {
    id: "gold-necklace-11",
    name: "Guttapusalu Style Gold Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec11.webp",
      "/images/products/gold/necklace/nec11_sideview.webp"
    ],
    description: "Inspired by the heritage Guttapusalu design, featuring rich gold bunching and delicate design work."
  },
  {
    id: "gold-necklace-12",
    name: "Contemporary Mesh Gold Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec12.webp",
      "/images/products/gold/necklace/nec12_sideview.webp"
    ],
    description: "Features a modern mesh collar layout that sits beautifully around the neck, radiating high-gleam lustre."
  },
  {
    id: "gold-necklace-13",
    name: "Delicate Dailywear Gold Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec13.webp",
      "/images/products/gold/necklace/nec13_sideview.webp"
    ],
    description: "A lightweight, minimal gold necklace suitable for everyday luxury and casual elegance."
  },
  {
    id: "gold-necklace-14",
    name: "Royal Coin Gold Necklace",
    category: "Gold",
    subcategory: "GOLD NECKLACE",
    type: "Necklace",
    images: [
      "/images/products/gold/necklace/nec14.webp",
      "/images/products/gold/necklace/nec14_sideview.webp"
    ],
    description: "Features auspicious coin shapes featuring intricate engravings, set along a thick gold band."
  },
  // Real Gold Chains
  {
    id: "gold-chain-1",
    name: "Classic Gold Rope Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain1.webp"
    ],
    description: "A beautifully designed classic gold rope chain crafted in pure 22K gold, weighing approximately 11 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-2",
    name: "Intricate Gold Box Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain2.webp"
    ],
    description: "A beautifully designed intricate gold box chain crafted in pure 22K gold, weighing approximately 14 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-3",
    name: "Elegant Gold Wheat Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain3.webp"
    ],
    description: "A beautifully designed elegant gold wheat chain crafted in pure 22K gold, weighing approximately 17 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-4",
    name: "Traditional Gold Cable Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain4.webp"
    ],
    description: "A beautifully designed traditional gold cable chain crafted in pure 22K gold, weighing approximately 20 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-5",
    name: "Modern Gold Curb Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain5.webp"
    ],
    description: "A beautifully designed modern gold curb chain crafted in pure 22K gold, weighing approximately 23 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-6",
    name: "Handcrafted Gold Figaro Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain6.webp"
    ],
    description: "A beautifully designed handcrafted gold figaro chain crafted in pure 22K gold, weighing approximately 26 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-7",
    name: "High-Polish Gold Singapore Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain7.webp"
    ],
    description: "A beautifully designed high-polish gold singapore chain crafted in pure 22K gold, weighing approximately 29 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-8",
    name: "Sleek Gold Mariner Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain8.webp"
    ],
    description: "A beautifully designed sleek gold mariner chain crafted in pure 22K gold, weighing approximately 32 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-9",
    name: "Premium Gold Snake Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain9.webp"
    ],
    description: "A beautifully designed premium gold snake chain crafted in pure 22K gold, weighing approximately 35 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-10",
    name: "Heavy Gold Herringbone Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain10.webp"
    ],
    description: "A beautifully designed heavy gold herringbone chain crafted in pure 22K gold, weighing approximately 38 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-11",
    name: "Lightweight Gold Bead/Ball Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain11.webp"
    ],
    description: "A beautifully designed lightweight gold bead/ball chain crafted in pure 22K gold, weighing approximately 41 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-12",
    name: "Dainty Gold Franco Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain12.webp"
    ],
    description: "A beautifully designed dainty gold franco chain crafted in pure 22K gold, weighing approximately 44 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-13",
    name: "Royal Gold Spiga Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain13.webp"
    ],
    description: "A beautifully designed royal gold spiga chain crafted in pure 22K gold, weighing approximately 47 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-14",
    name: "Bespoke Gold Belcher Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain14.webp"
    ],
    description: "A beautifully designed bespoke gold belcher chain crafted in pure 22K gold, weighing approximately 10 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-15",
    name: "Ornate Gold Rollo Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain15.webp"
    ],
    description: "A beautifully designed ornate gold rollo chain crafted in pure 22K gold, weighing approximately 13 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-16",
    name: "Classic Gold Rope Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain16.webp"
    ],
    description: "A beautifully designed classic gold rope chain crafted in pure 22K gold, weighing approximately 16 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-17",
    name: "Intricate Gold Box Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain17.webp"
    ],
    description: "A beautifully designed intricate gold box chain crafted in pure 22K gold, weighing approximately 19 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-18",
    name: "Elegant Gold Wheat Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain18.webp"
    ],
    description: "A beautifully designed elegant gold wheat chain crafted in pure 22K gold, weighing approximately 22 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-19",
    name: "Traditional Gold Cable Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain19.webp"
    ],
    description: "A beautifully designed traditional gold cable chain crafted in pure 22K gold, weighing approximately 25 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-20",
    name: "Modern Gold Curb Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain20.webp"
    ],
    description: "A beautifully designed modern gold curb chain crafted in pure 22K gold, weighing approximately 28 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-21",
    name: "Handcrafted Gold Figaro Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain21.webp"
    ],
    description: "A beautifully designed handcrafted gold figaro chain crafted in pure 22K gold, weighing approximately 31 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-22",
    name: "High-Polish Gold Singapore Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain22.webp"
    ],
    description: "A beautifully designed high-polish gold singapore chain crafted in pure 22K gold, weighing approximately 34 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-23",
    name: "Sleek Gold Mariner Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain23.webp"
    ],
    description: "A beautifully designed sleek gold mariner chain crafted in pure 22K gold, weighing approximately 37 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-24",
    name: "Premium Gold Snake Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain24.webp"
    ],
    description: "A beautifully designed premium gold snake chain crafted in pure 22K gold, weighing approximately 40 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-25",
    name: "Heavy Gold Herringbone Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain25.webp"
    ],
    description: "A beautifully designed heavy gold herringbone chain crafted in pure 22K gold, weighing approximately 43 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-26",
    name: "Lightweight Gold Bead/Ball Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain26.webp"
    ],
    description: "A beautifully designed lightweight gold bead/ball chain crafted in pure 22K gold, weighing approximately 46 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-27",
    name: "Dainty Gold Franco Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain27.webp"
    ],
    description: "A beautifully designed dainty gold franco chain crafted in pure 22K gold, weighing approximately 9 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-28",
    name: "Royal Gold Spiga Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain28.webp"
    ],
    description: "A beautifully designed royal gold spiga chain crafted in pure 22K gold, weighing approximately 12 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-29",
    name: "Bespoke Gold Belcher Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain29.webp"
    ],
    description: "A beautifully designed bespoke gold belcher chain crafted in pure 22K gold, weighing approximately 15 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-30",
    name: "Ornate Gold Rollo Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain30.webp"
    ],
    description: "A beautifully designed ornate gold rollo chain crafted in pure 22K gold, weighing approximately 18 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-31",
    name: "Classic Gold Rope Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain31.webp"
    ],
    description: "A beautifully designed classic gold rope chain crafted in pure 22K gold, weighing approximately 21 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-32",
    name: "Intricate Gold Box Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain32.webp"
    ],
    description: "A beautifully designed intricate gold box chain crafted in pure 22K gold, weighing approximately 24 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-34",
    name: "Elegant Gold Wheat Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain34.webp"
    ],
    description: "A beautifully designed elegant gold wheat chain crafted in pure 22K gold, weighing approximately 30 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-35",
    name: "Traditional Gold Cable Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain35.webp"
    ],
    description: "A beautifully designed traditional gold cable chain crafted in pure 22K gold, weighing approximately 33 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-36",
    name: "Modern Gold Curb Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain36.webp"
    ],
    description: "A beautifully designed modern gold curb chain crafted in pure 22K gold, weighing approximately 36 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-37",
    name: "Handcrafted Gold Figaro Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain37.webp"
    ],
    description: "A beautifully designed handcrafted gold figaro chain crafted in pure 22K gold, weighing approximately 39 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-38",
    name: "High-Polish Gold Singapore Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain38.webp"
    ],
    description: "A beautifully designed high-polish gold singapore chain crafted in pure 22K gold, weighing approximately 42 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-39",
    name: "Sleek Gold Mariner Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain39.webp"
    ],
    description: "A beautifully designed sleek gold mariner chain crafted in pure 22K gold, weighing approximately 45 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-40",
    name: "Premium Gold Snake Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain40.webp"
    ],
    description: "A beautifully designed premium gold snake chain crafted in pure 22K gold, weighing approximately 8 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-41",
    name: "Heavy Gold Herringbone Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain41.webp"
    ],
    description: "A beautifully designed heavy gold herringbone chain crafted in pure 22K gold, weighing approximately 11 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-42",
    name: "Lightweight Gold Bead/Ball Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain42.webp"
    ],
    description: "A beautifully designed lightweight gold bead/ball chain crafted in pure 22K gold, weighing approximately 14 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-43",
    name: "Dainty Gold Franco Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain43.webp"
    ],
    description: "A beautifully designed dainty gold franco chain crafted in pure 22K gold, weighing approximately 17 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-44",
    name: "Royal Gold Spiga Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain44.webp"
    ],
    description: "A beautifully designed royal gold spiga chain crafted in pure 22K gold, weighing approximately 20 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-45",
    name: "Bespoke Gold Belcher Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain45.webp"
    ],
    description: "A beautifully designed bespoke gold belcher chain crafted in pure 22K gold, weighing approximately 23 grams. Perfect for daily wear or special occasions."
  },
  {
    id: "gold-chain-46",
    name: "Ornate Gold Rollo Chain",
    category: "Gold",
    subcategory: "GOLD CHAIN",
    type: "Chain",
    images: [
      "/images/products/gold/chains/chain46.webp"
    ],
    description: "A beautifully designed ornate gold rollo chain crafted in pure 22K gold, weighing approximately 26 grams. Perfect for daily wear or special occasions."
  },
  ...generateSubcategoryItems('Gold', 'GOLD ANKLET', 'Anklet', 3),
  // Real Gold Couple Rings
  {
    id: "gold-couple-ring-1",
    name: "Eternal Love Gold Band 1",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing1.webp"
    ],
    description: "An elegant and finely crafted eternal love gold band 1 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-2",
    name: "Promise Gold Couple Ring 2",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing2.webp"
    ],
    description: "An elegant and finely crafted promise gold couple ring 2 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-3",
    name: "Infinity Gold Wedding Band 3",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing3.webp"
    ],
    description: "An elegant and finely crafted infinity gold wedding band 3 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-4",
    name: "Classic Duo Gold Ring 4",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing4.webp"
    ],
    description: "An elegant and finely crafted classic duo gold ring 4 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-5",
    name: "Two Hearts Gold Band 5",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing5.webp"
    ],
    description: "An elegant and finely crafted two hearts gold band 5 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-6",
    name: "Divine Union Gold Ring 6",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing6.webp"
    ],
    description: "An elegant and finely crafted divine union gold ring 6 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-7",
    name: "Devotion Gold Couple Ring 7",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing7.webp"
    ],
    description: "An elegant and finely crafted devotion gold couple ring 7 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-8",
    name: "Unity Gold Wedding Band 8",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing8.webp"
    ],
    description: "An elegant and finely crafted unity gold wedding band 8 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-9",
    name: "Destiny Gold Band 9",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing9.webp"
    ],
    description: "An elegant and finely crafted destiny gold band 9 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-10",
    name: "Soulmate Gold Couple Ring 10",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing10.webp"
    ],
    description: "An elegant and finely crafted soulmate gold couple ring 10 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-11",
    name: "True Love Gold Band 11",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing11.webp"
    ],
    description: "An elegant and finely crafted true love gold band 11 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-12",
    name: "Everlasting Gold Ring 12",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing12.webp"
    ],
    description: "An elegant and finely crafted everlasting gold ring 12 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-13",
    name: "Pure Romance Gold Band 13",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing13.webp"
    ],
    description: "An elegant and finely crafted pure romance gold band 13 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-14",
    name: "Amour Gold Couple Ring 14",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing14.webp"
    ],
    description: "An elegant and finely crafted amour gold couple ring 14 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-15",
    name: "Adore Gold Wedding Band 15",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing15.webp"
    ],
    description: "An elegant and finely crafted adore gold wedding band 15 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-16",
    name: "Togetherness Gold Ring 16",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing16.webp"
    ],
    description: "An elegant and finely crafted togetherness gold ring 16 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-17",
    name: "Bond Gold Couple Ring 17",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing17.webp"
    ],
    description: "An elegant and finely crafted bond gold couple ring 17 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-18",
    name: "Tribute Gold Wedding Band 18",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing18.webp"
    ],
    description: "An elegant and finely crafted tribute gold wedding band 18 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-19",
    name: "Majestic Duo Gold Ring 19",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing19.webp"
    ],
    description: "An elegant and finely crafted majestic duo gold ring 19 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-20",
    name: "Heritage Gold Couple Ring 20",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing20.webp"
    ],
    description: "An elegant and finely crafted heritage gold couple ring 20 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-21",
    name: "Gleaming Union Gold Band 21",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing21.webp"
    ],
    description: "An elegant and finely crafted gleaming union gold band 21 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-22",
    name: "Sparkling Promise Gold Ring 22",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing22.webp"
    ],
    description: "An elegant and finely crafted sparkling promise gold ring 22 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-25",
    name: "Affinity Gold Couple Ring 25",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing25.webp"
    ],
    description: "An elegant and finely crafted affinity gold couple ring 25 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-26",
    name: "Harmony Gold Band 26",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing26.webp"
    ],
    description: "An elegant and finely crafted harmony gold band 26 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-27",
    name: "Eternal Love Gold Band 27",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing27.webp"
    ],
    description: "An elegant and finely crafted eternal love gold band 27 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  {
    id: "gold-couple-ring-28",
    name: "Promise Gold Couple Ring 28",
    category: "Gold",
    subcategory: "GOLD RING",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/Couples_Rings/CoupleRing28.webp"
    ],
    description: "An elegant and finely crafted promise gold couple ring 28 in pure 22K gold, symbolizing a lifetime of love and commitment."
  },
  // Gold Gem Stone Rings
  {
    id: "gold-gem-stone-ring-1",
    name: "Navaratna Classic Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring1.webp"
    ],
    description: "A magnificent 22K gold ring featuring the nine sacred Navaratna gemstones, representing cosmic harmony and prosperity."
  },
  {
    id: "gold-gem-stone-ring-2",
    name: "Ruby Floral Halo Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring2.webp"
    ],
    description: "An exquisite 22K gold ring set with a brilliant crimson ruby in a delicate floral pavé setting."
  },
  {
    id: "gold-gem-stone-ring-3",
    name: "Emerald Solitaire Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring3.webp"
    ],
    description: "A majestic 22K gold ring showcasing a deep forest-green emerald solitaire in a classic four-prong mount."
  },
  {
    id: "gold-gem-stone-ring-4",
    name: "Blue Sapphire Crown Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring4.webp"
    ],
    description: "A royal blue sapphire crown ring set in high-polish 22K gold, capturing timeless elegance."
  },
  {
    id: "gold-gem-stone-ring-5",
    name: "Traditional Red Coral Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring5.webp"
    ],
    description: "A traditional red coral gemstone ring in custom-crafted 22K gold, believed to bring energy and good fortune."
  },
  {
    id: "gold-gem-stone-ring-6",
    name: "Amethyst Cluster Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring6.webp"
    ],
    description: "A vibrant amethyst cluster gemstone ring in a hand-polished 22K gold setting."
  },
  {
    id: "gold-gem-stone-ring-7",
    name: "Pearl Solitaire Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring7.webp"
    ],
    description: "A serene and lustrous natural pearl solitaire ring set in a beautiful 22K gold halo mount."
  },
  {
    id: "gold-gem-stone-ring-8",
    name: "Citrine Cushion Cut Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring8.webp"
    ],
    description: "A golden citrine cushion-cut ring set in textured 22K gold, radiating warm solar energy."
  },
  {
    id: "gold-gem-stone-ring-9",
    name: "Topaz Statement Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring9.webp"
    ],
    description: "A statement light-blue topaz ring in rich 22K gold, designed to capture the light from every angle."
  },
  {
    id: "gold-gem-stone-ring-10",
    name: "Garnet Vintage Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring10.webp"
    ],
    description: "A vintage-inspired deep red garnet ring crafted in ornate 22K gold filigree work."
  },
  {
    id: "gold-gem-stone-ring-11",
    name: "Opal Fire Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring11.webp"
    ],
    description: "A stunning fire opal gemstone ring in 22K gold, displaying a beautiful play of colors."
  },
  {
    id: "gold-gem-stone-ring-12",
    name: "Zircon Sparkling Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring12.webp"
    ],
    description: "A sparkling white zircon ring in premium 22K gold, offering brilliant diamond-like fire."
  },
  {
    id: "gold-gem-stone-ring-13",
    name: "Aquamarine Ocean Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring13.webp"
    ],
    description: "A calming pastel blue aquamarine ring set in polished 22K gold, representing clarity and peace."
  },
  {
    id: "gold-gem-stone-ring-14",
    name: "Peridot Leaf Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring14.webp"
    ],
    description: "A refreshing olive-green peridot leaf-inspired ring in organic-style 22K gold."
  },
  {
    id: "gold-gem-stone-ring-15",
    name: "Tourmaline Modern Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring15.webp"
    ],
    description: "A modern multi-tone tourmaline ring set in sleek 22K gold bands."
  },
  {
    id: "gold-gem-stone-ring-16",
    name: "Jade Traditional Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring16.webp"
    ],
    description: "A classic green jade gemstone ring with polished 22K gold borders."
  },
  {
    id: "gold-gem-stone-ring-17",
    name: "Fancy Multi-Gemstone Gold Ring",
    category: "Gold",
    subcategory: "GOLD GEM STONE RINGS",
    type: "Ring",
    images: [
      "/images/products/gold/Rings/ring17.webp"
    ],
    description: "A striking multi-gemstone statement ring in 22K gold, combining rubies, emeralds, and sapphires."
  },
  {
    id: "gold-bracelet-1",
    name: "Traditional Nagas Gold Bracelet 1",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet1.webp"
    ],
    description: "A majestic 22K gold Nagas bracelet featuring detailed handcarvings of traditional motifs and high-polish borders."
  },
  {
    id: "gold-bracelet-2",
    name: "Classic Solid Gold Kada 2",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet2.webp"
    ],
    description: "A heavy, solid 22K gold kada showing off a classic round design with a smooth internal comfort fit."
  },
  {
    id: "gold-bracelet-3",
    name: "Intricate Filigree Gold Bracelet 3",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet3.webp"
    ],
    description: "An intricate 22K gold filigree bracelet combining fine wirework lace and elegant polished endings."
  },
  {
    id: "gold-bracelet-5",
    name: "Royal Peacock Motif Gold Bracelet 5",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet5.webp"
    ],
    description: "A stunning peacock-motif gold bracelet detailed with textured gold feathers and ruby eyes."
  },
  {
    id: "gold-bracelet-6",
    name: "Ornate Antique Gold Bangle-Bracelet 6",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet6.webp"
    ],
    description: "An ornate antique-finish gold bracelet designed with traditional patterns for wedding elegance."
  },
  {
    id: "gold-bracelet-7",
    name: "Sleek Contemporary Gold Kada 7",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet7.webp"
    ],
    description: "A sleek contemporary kada in 22K gold with minimalist linear engravings and secure lock system."
  },
  {
    id: "gold-bracelet-8",
    name: "Textured Designer Gold Bracelet 8",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet8.webp"
    ],
    description: "A designer gold bracelet highlighting unique hand-carved textures and modern styling."
  },
  {
    id: "gold-bracelet-9",
    name: "Vintage Gold Link Bracelet 9",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet9.webp"
    ],
    description: "A timeless vintage gold link bracelet in 22K gold, offering smooth articulation and shine."
  },
  {
    id: "gold-bracelet-10",
    name: "Modern Adjustable Gold Kada 10",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet10.webp"
    ],
    description: "A modern adjustable 22K gold kada featuring stylish spherical terminal beads."
  },
  {
    id: "gold-bracelet-11",
    name: "Gold Bead Cascading Bracelet 11",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet11.webp"
    ],
    description: "A gorgeous gold bead cascading bracelet in pure 22K gold, catching light gracefully."
  },
  {
    id: "gold-bracelet-12",
    name: "Exquisite Floral Gold Kada 12",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet12.webp"
    ],
    description: "An exquisite floral-inspired kada in 22K gold, featuring blooming floral patterns."
  },
  {
    id: "gold-bracelet-13",
    name: "Geometric Charm Gold Bracelet 13",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet13.webp"
    ],
    description: "A chic geometric charm bracelet in 22K gold, perfect for everyday sophistication."
  },
  {
    id: "gold-bracelet-14",
    name: "Fancy Heart-Link Gold Bracelet 14",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet14.webp"
    ],
    description: "A romantic heart-link gold bracelet in pure 22K gold, symbolizing love and elegance."
  },
  {
    id: "gold-bracelet-15",
    name: "Gild Leaf Designer Bracelet 15",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet15.webp"
    ],
    description: "A delicate leaf-motif designer bracelet in 22K gold, bringing organic natural beauty."
  },
  {
    id: "gold-bracelet-16",
    name: "Antique Temple Laxmi Kada 16",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet16.webp"
    ],
    description: "A heavy antique temple kada depicting Goddess Lakshmi, crafted for grand occasions."
  },
  {
    id: "gold-bracelet-17",
    name: "Delicate Rope Chain Gold Bracelet 17",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet17.webp"
    ],
    description: "A beautiful rope-chain gold bracelet in pure 22K gold, offering durability and classic style."
  },
  {
    id: "gold-bracelet-18",
    name: "Crescent Charm Gold Kada 18",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet18.webp"
    ],
    description: "A modern crescent-charm kada featuring delicate textured gold spheres."
  },
  {
    id: "gold-bracelet-19",
    name: "Cluster Bead Gold Bracelet 19",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet19.webp"
    ],
    description: "A rich cluster-bead gold bracelet in 22K gold with a robust lock mechanism."
  },
  {
    id: "gold-bracelet-20",
    name: "Handcrafted Heritage Gold Bracelet 20",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet20.webp"
    ],
    description: "A masterfully handcrafted heritage gold bracelet, showcasing the peak of Indian goldsmithing."
  },
  {
    id: "gold-bracelet-21",
    name: "Dangling Pearl Gold Kada 21",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet21.webp"
    ],
    description: "A regal kada decorated with dangling freshwater pearls and fine gold wire filigree."
  },
  {
    id: "gold-bracelet-22",
    name: "Polished Sleek Gold Bracelet 22",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet22.webp"
    ],
    description: "A sleek, highly polished gold bracelet in 22K gold, representing timeless minimalism."
  },
  {
    id: "gold-bracelet-23",
    name: "Double Layer Gold Chain Bracelet 23",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet23.webp"
    ],
    description: "A delicate double-layer gold chain bracelet, offering a layered elegant look."
  },
  {
    id: "gold-bracelet-24",
    name: "Cascading Coin Gold Bracelet 24",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet24.webp"
    ],
    description: "A traditional coin gold bracelet (Kasumala style) featuring polished gold discs."
  },
  {
    id: "gold-bracelet-25",
    name: "Traditional Gold Vanki-Bracelet 25",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet25.webp"
    ],
    description: "A unique Vanki-style gold bracelet featuring traditional curved styling."
  },
  {
    id: "gold-bracelet-26",
    name: "Abstract Grid Gold Kada 26",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet26.webp"
    ],
    description: "A modern abstract grid-pattern kada in 22K gold, perfect for designer tastes."
  },
  {
    id: "gold-bracelet-27",
    name: "Petal Design Gold Bracelet 27",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet27.webp"
    ],
    description: "A graceful petal-designed gold bracelet, bringing soft floral elegance to your wrist."
  },
  {
    id: "gold-bracelet-28",
    name: "Premium Bridal Heavy Gold Kada 28",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet28.webp"
    ],
    description: "A grand premium bridal heavy kada featuring intricate Nagas patterns and gold bead fringes."
  },
  {
    id: "gold-bracelet-29",
    name: "Embossed Pattern Gold Bracelet 29",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet29.webp"
    ],
    description: "An embossed pattern gold bracelet in 22K gold, displaying deep textured engravings."
  },
  {
    id: "gold-bracelet-30",
    name: "Elegant Daily-Wear Gold Kada 30",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet30.webp"
    ],
    description: "An elegant lightweight daily-wear kada, combining modern comfort and shine."
  },
  {
    id: "gold-bracelet-31",
    name: "Royal Mughal Style Kada 31",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet31.webp"
    ],
    description: "A spectacular Mughal-inspired kada featuring ornate endpoints and royal craftsmanship."
  },
  {
    id: "gold-bracelet-32",
    name: "Intertwined Gold Band Bracelet 32",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet32.webp"
    ],
    description: "An intertwined gold band bracelet, representing union and eternal fashion."
  },
  {
    id: "gold-bracelet-34",
    name: "Glimmering Hexagonal Gold Kada 34",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet34.webp"
    ],
    description: "A glimmering hexagonal-profile kada in 22K gold with diamond-cut facets."
  },
  {
    id: "gold-bracelet-35",
    name: "Luxury Statement Gold Bracelet 35",
    category: "Gold",
    subcategory: "GOLD BRACELET",
    type: "Bracelet",
    images: [
      "/images/products/gold/Bracelet/bracelet35.webp"
    ],
    description: "A luxury statement gold bracelet showcasing bold design, high weight, and majestic styling."
  },
  {
    id: "gold-earing-1",
    name: "Traditional Nagas Jhumka 1",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing1.webp"
    ],
    description: "A majestic pair of 22K gold Nagas jhumkas showcasing exquisite craftsmanship and classic detailing."
  },
  {
    id: "gold-earing-2",
    name: "Classic Gold Studs 2",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing2.webp"
    ],
    description: "Simple, elegant 22K gold studs featuring a brilliant high-polish finish, perfect for daily wear."
  },
  {
    id: "gold-earing-3",
    name: "Floral Filigree Earrings 3",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing3.webp"
    ],
    description: "Delicate floral filigree earrings in 22K gold, combining traditional art with modern grace."
  },
  {
    id: "gold-earing-4",
    name: "Contemporary Gold Hoops 4",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing4.webp"
    ],
    description: "Chic contemporary gold hoop earrings in pure 22K gold, adding instant shine to any outfit."
  },
  {
    id: "gold-earing-5",
    name: "Royal Peacock Jhumkas 5",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing5.webp"
    ],
    description: "Stunning peacock-motif jhumkas in 22K gold, decorated with intricate feather details."
  },
  {
    id: "gold-earing-6",
    name: "Ornate Gold Chandbalis 6",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing6.webp"
    ],
    description: "Ornate gold chandbalis in 22K gold, displaying classic moon-shaped heritage patterns."
  },
  {
    id: "gold-earing-7",
    name: "Sleek Gold Drop Earrings 7",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing7.webp"
    ],
    description: "Sleek and long 22K gold drop earrings, offering a beautiful linear flow and elegant motion."
  },
  {
    id: "gold-earing-8",
    name: "Textured Gold Studs 8",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing8.webp"
    ],
    description: "Artistic textured gold studs in 22K gold, catching and scattering light beautifully."
  },
  {
    id: "gold-earing-9",
    name: "Vintage Gold Jhumkas 9",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing9.webp"
    ],
    description: "Vintage-inspired gold jhumkas featuring delicate hanging gold beads and fine engraving."
  },
  {
    id: "gold-earing-10",
    name: "Modern Threader Earrings 10",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing10.webp"
    ],
    description: "Sleek and modern 22K gold threader earrings for a minimal yet sophisticated look."
  },
  {
    id: "gold-earing-11",
    name: "Gold Bead Drop Earrings 11",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing11.webp"
    ],
    description: "Beautiful gold bead drop earrings crafted in premium 22K gold with a delicate dangle."
  },
  {
    id: "gold-earing-12",
    name: "Designer Gold Studs 12",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing12.webp"
    ],
    description: "Exquisite designer gold studs showcasing a modern starburst geometry in 22K gold."
  },
  {
    id: "gold-earing-13",
    name: "Geometric Gold Hoops 13",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing13.webp"
    ],
    description: "Stylish geometric gold hoops in high-polish 22K gold, designed for the modern woman."
  },
  {
    id: "gold-earing-15",
    name: "Gild Leaf Studs 15",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing15.webp"
    ],
    description: "Lush leaf-motif gold studs in 22K gold, representing nature's beauty and organic elegance."
  },
  {
    id: "gold-earing-16",
    name: "Antique Temple Jhumkas 16",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing16.webp"
    ],
    description: "Ornate antique temple jhumkas featuring traditional deity motifs and dangling gold beads."
  },
  {
    id: "gold-earing-17",
    name: "Delicate Gold Drops 17",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing17.webp"
    ],
    description: "Delicate 22K gold drops displaying detailed micro-granulation and high-polish shine."
  },
  {
    id: "gold-earing-18",
    name: "Crescent Gold Chandbalis 18",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing18.webp"
    ],
    description: "Beautiful crescent-shaped chandbalis in 22K gold, perfect for festive celebrations."
  },
  {
    id: "gold-earing-19",
    name: "Cluster Gold Studs 19",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing19.webp"
    ],
    description: "Sparkling cluster-motif gold studs in 22K gold, providing a full-lobed, rich appearance."
  },
  {
    id: "gold-earing-20",
    name: "Handcrafted Nagas Earrings 20",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing20.webp"
    ],
    description: "Masterfully handcrafted Nagas earrings in 22K gold, depicting rich heritage artistry."
  },
  {
    id: "gold-earing-21",
    name: "Dangling Pearl Gold Jhumkas 21",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing21.webp"
    ],
    description: "Regal gold jhumkas adorned with hanging freshwater pearls and intricate gold work."
  },
  {
    id: "gold-earing-22",
    name: "Polished Gold Loop Earrings 22",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing22.webp"
    ],
    description: "Bold and polished gold loop earrings in 22K gold, representing timeless simplicity."
  },
  {
    id: "gold-earing-23",
    name: "Double Drop Gold Studs 23",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing23.webp"
    ],
    description: "Sophisticated double drop gold studs in 22K gold, offering twice the elegance."
  },
  {
    id: "gold-earing-24",
    name: "Cascading Gold Earrings 24",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing24.webp"
    ],
    description: "Cascading gold earrings in 22K gold, catching the light with every move."
  },
  {
    id: "gold-earing-25",
    name: "Traditional Sui Dhaga 25",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing25.webp"
    ],
    description: "Traditional Sui Dhaga earrings in 22K gold, featuring a long delicate chain design."
  },
  {
    id: "gold-earing-26",
    name: "Abstract Gold Studs 26",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing26.webp"
    ],
    description: "Abstract designer gold studs in 22K gold, showcasing a unique contemporary pattern."
  },
  {
    id: "gold-earing-27",
    name: "Petal Design Gold Earrings 27",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing27.webp"
    ],
    description: "Graceful petal-designed gold earrings in 22K gold, bringing a soft floral touch."
  },
  {
    id: "gold-earing-28",
    name: "Premium Bridal Jhumkas 28",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing28.webp"
    ],
    description: "Grand premium bridal jhumkas in 22K gold, the ultimate statement piece for wedding wear."
  },
  {
    id: "gold-earing-29",
    name: "Embossed Gold Studs 29",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing29.webp"
    ],
    description: "Beautifully embossed gold studs in 22K gold, featuring a classic dome pattern."
  },
  {
    id: "gold-earing-30",
    name: "Elegant Hoop Earrings 30",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing30.webp"
    ],
    description: "Elegant lightweight hoop earrings in 22K gold, combining comfort and timeless style."
  },
  {
    id: "gold-earing-31",
    name: "Royal Heritage Jhumkas 31",
    category: "Gold",
    subcategory: "GOLD EARRINGS",
    type: "Earrings",
    images: [
      "/images/products/gold/Earings/earing31.webp"
    ],
    description: "Spectacular heritage jhumkas in 22K gold, showcasing royal South Indian design artistry."
  },
  ...generateSubcategoryItems('Gold', 'GOLD BANGLES', 'Bangles', 2),

  // SILVER
  // Real Silver Couple Rings
  {
    id: "silver-couple-ring-1",
    name: "Sterling Silver Promise Band 1",
    category: "Silver",
    subcategory: "Rings",
    type: "Ring",
    images: [
      "/images/products/silver/Rings/SilverCoupleRing1.webp"
    ],
    description: "A gorgeous, high-polish sterling silver promise band 1 in fine sterling silver, perfect for celebrating shared milestones."
  },
  {
    id: "silver-couple-ring-2",
    name: "Classic Duo Silver Ring 2",
    category: "Silver",
    subcategory: "Rings",
    type: "Ring",
    images: [
      "/images/products/silver/Rings/SilverCoupleRing2.webp"
    ],
    description: "A gorgeous, high-polish classic duo silver ring 2 in fine sterling silver, perfect for celebrating shared milestones."
  },
  {
    id: "silver-couple-ring-3",
    name: "True Love Silver Couple Band 3",
    category: "Silver",
    subcategory: "Rings",
    type: "Ring",
    images: [
      "/images/products/silver/Rings/SilverCoupleRing3.webp"
    ],
    description: "A gorgeous, high-polish true love silver couple band 3 in fine sterling silver, perfect for celebrating shared milestones."
  },
  {
    id: "silver-couple-ring-4",
    name: "Eternal Union Silver Ring 4",
    category: "Silver",
    subcategory: "Rings",
    type: "Ring",
    images: [
      "/images/products/silver/Rings/SilverCoupleRing4.webp"
    ],
    description: "A gorgeous, high-polish eternal union silver ring 4 in fine sterling silver, perfect for celebrating shared milestones."
  },
  ...generateSubcategoryItems('Silver', 'Traditional', 'Traditional', 3),
  ...generateSubcategoryItems('Silver', 'Nagas', 'Nagas', 3),
  ...generateSubcategoryItems('Silver', 'Antique', 'Antique', 3),
  ...generateSubcategoryItems('Silver', 'Swarovski', 'Swarovski', 3),
  ...generateSubcategoryItems('Silver', 'Victorian', 'Victorian', 2),
  ...generateSubcategoryItems('Silver', 'Necklace Sets', 'Necklace Set', 2),

  // DIAMOND
  // Real Diamond Rings
  {
    id: "diamond-ring-1",
    name: "Solitaire Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing1.webp"
    ],
    description: "An exceptionally crafted solitaire diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-2",
    name: "Halo Diamond Engagement Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing2.webp"
    ],
    description: "An exceptionally crafted halo diamond engagement ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-3",
    name: "Vintage Eternity Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing3.webp"
    ],
    description: "An exceptionally crafted vintage eternity diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-4",
    name: "Classic Princess Cut Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing4.webp"
    ],
    description: "An exceptionally crafted classic princess cut ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-5",
    name: "Elegant Marquise Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing5.webp"
    ],
    description: "An exceptionally crafted elegant marquise diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-6",
    name: "Royal Oval Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing6.webp"
    ],
    description: "An exceptionally crafted royal oval diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-7",
    name: "Three-Stone Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing7.webp"
    ],
    description: "An exceptionally crafted three-stone diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-8",
    name: "Sparkling Pavé Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing8.webp"
    ],
    description: "An exceptionally crafted sparkling pavé diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-9",
    name: "Twisted Shank Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing9.webp"
    ],
    description: "An exceptionally crafted twisted shank diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-10",
    name: "Floral Cluster Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing10.webp"
    ],
    description: "An exceptionally crafted floral cluster diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-11",
    name: "Classic Cushion Cut Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing11.webp"
    ],
    description: "An exceptionally crafted classic cushion cut ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-12",
    name: "Emerald Cut Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing12.webp"
    ],
    description: "An exceptionally crafted emerald cut diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-13",
    name: "Infinity Twist Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing13.webp"
    ],
    description: "An exceptionally crafted infinity twist diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-14",
    name: "V-Shaped Chevron Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing14.webp"
    ],
    description: "An exceptionally crafted v-shaped chevron diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-15",
    name: "Double Halo Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing15.webp"
    ],
    description: "An exceptionally crafted double halo diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-16",
    name: "Split Shank Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing16.webp"
    ],
    description: "An exceptionally crafted split shank diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-17",
    name: "Teardrop Pear Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing17.webp"
    ],
    description: "An exceptionally crafted teardrop pear diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-18",
    name: "Nature-Inspired Leaf Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing18.webp"
    ],
    description: "An exceptionally crafted nature-inspired leaf ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-19",
    name: "Art Deco Geometric Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing19.webp"
    ],
    description: "An exceptionally crafted art deco geometric diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-20",
    name: "Rose Gold Blossom Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing20.webp"
    ],
    description: "An exceptionally crafted rose gold blossom diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-21",
    name: "Majestic Crown Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing21.webp"
    ],
    description: "An exceptionally crafted majestic crown diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-22",
    name: "Delicate Beaded Band Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing22.webp"
    ],
    description: "An exceptionally crafted delicate beaded band diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-23",
    name: "Tension Set Solitaire Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing23.webp"
    ],
    description: "An exceptionally crafted tension set solitaire ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-24",
    name: "Braided Vine Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing24.webp"
    ],
    description: "An exceptionally crafted braided vine diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-25",
    name: "Starlight Cluster Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing25.webp"
    ],
    description: "An exceptionally crafted starlight cluster diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-26",
    name: "Modern Tension-Fit Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing26.webp"
    ],
    description: "An exceptionally crafted modern tension-fit ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-27",
    name: "Royal Tiara Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing27.webp"
    ],
    description: "An exceptionally crafted royal tiara diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-28",
    name: "Empress Marquise Diamond Band",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing28.webp"
    ],
    description: "An exceptionally crafted empress marquise diamond band featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-29",
    name: "Luminous Half-Bezel Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing29.webp"
    ],
    description: "An exceptionally crafted luminous half-bezel diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-30",
    name: "Scalloped Eternity Diamond Band",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing30.webp"
    ],
    description: "An exceptionally crafted scalloped eternity diamond band featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-31",
    name: "Vintage Milgrain Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing31.webp"
    ],
    description: "An exceptionally crafted vintage milgrain diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-32",
    name: "Crossed Path Diamond Band",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing32.webp"
    ],
    description: "An exceptionally crafted crossed path diamond band featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-33",
    name: "Sunset Orange Accent Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing33.webp"
    ],
    description: "An exceptionally crafted sunset orange accent diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-34",
    name: "Timeless Channel-Set Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing34.webp"
    ],
    description: "An exceptionally crafted timeless channel-set diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-35",
    name: "Duet Pear & Round Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing35.webp"
    ],
    description: "An exceptionally crafted duet pear & round diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-36",
    name: "Graceful Ribbon Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing36.webp"
    ],
    description: "An exceptionally crafted graceful ribbon diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-37",
    name: "Sleek Knife-Edge Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing37.webp"
    ],
    description: "An exceptionally crafted sleek knife-edge diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-38",
    name: "Intertwining Love Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing38.webp"
    ],
    description: "An exceptionally crafted intertwining love diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
  {
    id: "diamond-ring-39",
    name: "Flawless Radiant Cut Diamond Ring",
    category: "Diamond",
    subcategory: "Diamond Rings",
    type: "Ring",
    images: [
      "/images/products/diamond/Rings/DiamondRing39.webp"
    ],
    description: "An exceptionally crafted flawless radiant cut diamond ring featuring brilliant-cut diamonds of superior clarity and radiance, meticulously set to catch the light from every angle."
  },
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
  // --- Gem Stone Rings ---
  {
    id: "gem-stone-ring-1",
    name: "African Blue Sapphire Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/African blue sapphire.webp"
    ],
    description: "A majestic African blue sapphire set in a sophisticated ring shank, representing wisdom and royalty."
  },
  {
    id: "gem-stone-ring-2",
    name: "African Diamond Cluster Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/african diamonds ring.webp"
    ],
    description: "A stunning array of brilliant-cut African diamonds clusters, creating exceptional fire and sparkle."
  },
  {
    id: "gem-stone-ring-3",
    name: "Alexandrite Gemstone Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/alexandrite ring.webp"
    ],
    description: "A rare Alexandrite gemstone ring showing dramatic color shifts from green under daylight to reddish-purple under light."
  },
  {
    id: "gem-stone-ring-4",
    name: "Amethyst Gemstone Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/Amethyest ring.webp"
    ],
    description: "A beautiful purple Amethyst gemstone ring that exudes peace, balance, and serene luxury."
  },
  {
    id: "gem-stone-ring-5",
    name: "Aquamarine Gemstone Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/aquamarine ring.webp"
    ],
    description: "A light pastel blue Aquamarine gemstone ring that evokes the clarity of pure water and calming energy."
  },
  {
    id: "gem-stone-ring-6",
    name: "Australian Opal Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/australia-opal ring.webp"
    ],
    description: "A radiant Australian Opal ring displaying a mesmerizing play-of-color with vibrant flashes of rainbow light."
  },
  {
    id: "gem-stone-ring-7",
    name: "Neelam Blue Sapphire Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/blue-sapphire-neelam ring .webp"
    ],
    description: "A powerful Neelam Blue Sapphire ring crafted with precision to bring protection, clarity, and prosperity."
  },
  {
    id: "gem-stone-ring-8",
    name: "Brazilian Emerald Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/brazil-emerald ring.webp"
    ],
    description: "A rich green Brazilian Emerald ring highlighting the classic charm and lush green hue of this precious gem."
  },
  {
    id: "gem-stone-ring-9",
    name: "Burma Blue Sapphire Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/burma-blue-sapphire ring .webp"
    ],
    description: "An authentic Burma Blue Sapphire set in a handcrafted ring, celebrated for its royal blue color."
  },
  {
    id: "gem-stone-ring-10",
    name: "Burmese Ruby Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/burma-ruby ring.webp"
    ],
    description: "A rare Burmese Ruby gemstone ring of deep pigeon-blood red, symbolizing love, passion, and courage."
  },
  {
    id: "gem-stone-ring-11",
    name: "Burma Yellow Sapphire Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/burma-yellow-sapphire ring.webp"
    ],
    description: "A stunning Burmese Yellow Sapphire ring radiating brilliant golden energy and good fortune."
  },
  {
    id: "gem-stone-ring-12",
    name: "Ceylon Blue Sapphire Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/ceylon-blue-sapphire ring.webp"
    ],
    description: "A high-clarity Ceylon Blue Sapphire ring from Sri Lanka, displaying a spectacular cornflower blue shade."
  },
  {
    id: "gem-stone-ring-13",
    name: "Colombian Emerald Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/colombia emerald ring .webp"
    ],
    description: "A premium Colombian Emerald ring featuring the highly coveted vivid green hue with exceptional transparency."
  },
  {
    id: "gem-stone-ring-14",
    name: "Cultured Pearl Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/cultured-pearl ring.webp"
    ],
    description: "A luminous cultured freshwater Pearl ring styled in a classic halo design for timeless elegance."
  },
  {
    id: "gem-stone-ring-15",
    name: "Ceylon Yellow Sapphire Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/cyelon-yellow ring.webp"
    ],
    description: "A bright and pure Ceylon Yellow Sapphire ring, prized for its excellent clarity and astrological benefits."
  },
  {
    id: "gem-stone-ring-16",
    name: "Emerald-Cut Gemstone Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/emerald-cut-gemstones ring.webp"
    ],
    description: "An architectural emerald-cut multi-gemstone ring, showcasing clean step-cut facets and brilliance."
  },
  {
    id: "gem-stone-ring-17",
    name: "Ethiopian Emerald Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/ethiopia-emerald ring.webp"
    ],
    description: "A lively green Ethiopian Emerald ring with subtle blue undertones, set in premium metal craftsmanship."
  },
  {
    id: "gem-stone-ring-18",
    name: "Fire Opal Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/fire-opal ring.webp"
    ],
    description: "A bright orange Fire Opal ring reflecting a warm golden-red play of color, full of natural passion."
  },
  {
    id: "gem-stone-ring-19",
    name: "Golden Yellow Sapphire Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/golden-yellow-sapphire ring.webp"
    ],
    description: "A deep golden Yellow Sapphire ring that radiates majesty, confidence, and abundant luck."
  },
  {
    id: "gem-stone-ring-20",
    name: "Intense Yellow Sapphire Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/intence-yellow-sapphire ring.webp"
    ],
    description: "An intensely saturated Yellow Sapphire ring capturing brilliant solar rays and outstanding lustre."
  },
  {
    id: "gem-stone-ring-21",
    name: "Italian Red Coral Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/italian-red-coral ring.webp"
    ],
    description: "An auspicious Italian Red Coral (Moonga) ring, set in a polished bezel to symbolize vital energy and strength."
  },
  {
    id: "gem-stone-ring-22",
    name: "Japanese Red Coral Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/japanese-red-coral ring.webp"
    ],
    description: "A high-quality Japanese Red Coral ring with a rich deep red oxblood finish, highly valued for its purity."
  },
  {
    id: "gem-stone-ring-23",
    name: "Lapis Lazuli Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/lapis ring.webp"
    ],
    description: "A deep celestial blue Lapis Lazuli ring flecked with golden pyrite inclusions, symbolizing truth and wisdom."
  },
  {
    id: "gem-stone-ring-24",
    name: "Lemon Topaz Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/lemon-topaz ring.webp"
    ],
    description: "A bright, refreshing Lemon Topaz gemstone ring that sparkles with a lively yellow-green brilliance."
  },
  {
    id: "gem-stone-ring-25",
    name: "London Blue Topaz Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/london-blue-topaz-stone-ring_2.webp"
    ],
    description: "A deep, dramatic London Blue Topaz ring featuring a rich, dark teal-blue tone and brilliant cut."
  },
  {
    id: "gem-stone-ring-26",
    name: "Madagascar Blue Sapphire Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/madagascar-blue-sapphire ring.webp"
    ],
    description: "A gorgeous blue Sapphire ring sourced from Madagascar, exhibiting outstanding fire and brilliance."
  },
  {
    id: "gem-stone-ring-27",
    name: "Navaratna Stone Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/navarathna stone ring.webp"
    ],
    description: "A traditional Navaratna ring featuring nine sacred gemstones, representing harmony, protection, and planetary balance."
  },
  {
    id: "gem-stone-ring-28",
    name: "Classic Pearl Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/pearl ring.webp"
    ],
    description: "A timeless classic solitaire Pearl ring showcasing a perfectly round, high-lustre natural pearl."
  },
  {
    id: "gem-stone-ring-29",
    name: "Designer Sapphire Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/Sapphire Ring Designs.webp"
    ],
    description: "A modern designer Blue Sapphire ring surrounded by a delicate pavé diamond halo."
  },
  {
    id: "gem-stone-ring-30",
    name: "Star Ruby Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/star-ruby ring.webp"
    ],
    description: "A rare Star Ruby ring showing a sharp six-rayed star asterism under direct light, symbolizing courage."
  },
  {
    id: "gem-stone-ring-31",
    name: "Classic Topaz Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/Topaz ring.webp"
    ],
    description: "A beautiful Sky Blue Topaz ring that reflects clear light, perfect for elegant daily wear."
  },
  {
    id: "gem-stone-ring-32",
    name: "White Sapphire Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/white-sapphire ring.webp"
    ],
    description: "A brilliant White Sapphire ring with diamond-like sparkle, offering superb clarity and white light dispersion."
  },
  {
    id: "gem-stone-ring-33",
    name: "Zircon Gemstone Ring",
    category: "Gems",
    subcategory: "Gem Stone Rings",
    type: "Ring",
    images: [
      "/images/products/Gems/Gem Stone Rings/zircon stone ring.webp"
    ],
    description: "A high-dispersion Zircon ring that flashes with intense fire, presenting a beautiful ethical diamond alternative."
  },
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
