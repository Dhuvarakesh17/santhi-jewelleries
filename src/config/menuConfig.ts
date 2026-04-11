export interface SubColumn {
  title: string;
  items: string[];
}

export interface MenuItem {
  title: string;
  type: "dropdown" | "megamenu" | "link";
  items?: string[];
  columns?: SubColumn[];
  path?: string;
}

export const MENU_DATA: MenuItem[] = [
  {
    title: "Home",
    type: "link",
    path: "/",
  },
  {
    title: "Gold",
    type: "megamenu",
    columns: [
      {
        title: "GOLD COLLECTIONS",
        items: [
          "GOLD HARAM",
          "GOLD NECKLACE",
          "GOLD CHAIN",
          "GOLD ANKLET",
          "GOLD RING",
          "GOLD BRACELET",
          "GOLD EARRINGS",
          "GOLD BANGLES",
          "GOLD THALI CHAIN",
          "GOLD MANGALYAM & URUKAL",
        ],
      },
      {
        title: "MORE GOLD COLLECTIONS",
        items: [
          "Gold Kada",
          "Gold Mugappu",
          "Gold Pendant",
          "Gold Mattal",
          "Gold Watch",
          "Gold Idol",
          "Gold Baby Vel Kappu",
        ],
      },
    ],
  },
  {
    title: "Silver",
    type: "megamenu",
    columns: [
      {
        title: "SILVER HARAM & NECKLACES",
        items: [
          "Traditional",
          "Nagas",
          "Antique",
          "Layer",
          "Swarovski",
          "Victorian",
          "Necklace Sets",
        ],
      },
      {
        title: "SILVER BANGLES",
        items: [
          "Nagas",
          "Antique",
          "Precious Stone",
          "Baby Bangles",
          "Swarovski Bangles",
          "Other Bangle Collections",
        ],
      },
      {
        title: "SILVER EARRINGS",
        items: [
          "Nagas",
          "Antique",
          "Swarovski",
          "Kundan Stud",
          "Fancy",
          "Traditional",
        ],
      },
      {
        title: "SILVER ANKLETS",
        items: ["Traditional", "Antique", "Fancy", "Rose Gold", "Baby Anklets"],
      },
      {
        title: "SILVER MUGAPPU CHAIN",
        items: [],
      },
    ],
  },
  {
    title: "Diamonds",
    type: "dropdown",
    items: [
      "Diamond Chain",
      "Diamond Rings",
      "Diamond Kada",
      "Diamond Earrings",
      "Diamond Necklace",
      "Diamond Pendants",
      "Diamond Mugappu",
    ],
  },
  {
    title: "Signature Collection",
    type: "dropdown",
    items: [
      "Toe Rings",
      "Rings",
      "Kappu",
      "Bracelet",
      "Chains",
      "Silver Malai",
      "Pendant",
      "Silver Coin",
      "Frames",
      "Silver Idols",
      "Silver Keychain",
      "Kunghuma Chimil",
      "Sandhana Pela",
      "Other signature Collection",
    ],
  },
  {
    title: "Gold Customization Order",
    type: "dropdown",
    items: ["Fingerprint Rings", "Other Customized Products"],
  },
  {
    title: "About us",
    type: "link",
    path: "/about",
  },
];
