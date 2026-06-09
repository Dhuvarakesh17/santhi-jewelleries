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
  ...generateSubcategoryItems('Gold', 'GOLD BRACELET', 'Bracelet', 3),
  ...generateSubcategoryItems('Gold', 'GOLD EARRINGS', 'Earrings', 2),
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
