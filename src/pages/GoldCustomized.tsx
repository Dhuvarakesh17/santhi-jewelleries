import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  Gift,
  Sparkles,
  Scroll,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Heart,
  Award,
  ArrowRight,
} from "lucide-react";

const GoldCustomized = () => {
  // Specialized Data for this page
  const whyChoose = [
    {
      icon: <Sparkles className="text-maroon" />,
      title: "Express Your Style",
      desc: "Transform your names, initials, or special dates into wearable art.",
    },
    {
      icon: <Gift className="text-maroon" />,
      title: "Gift Something Special",
      desc: "Create meaningful gifts for weddings, birthdays, and anniversaries.",
    },
    {
      icon: <Star className="text-maroon" />,
      title: "Own a Unique Piece",
      desc: "One-of-a-kind designs handcrafted with precision and 22K gold.",
    },
    {
      icon: <Scroll className="text-maroon" />,
      title: "Celebrate Traditions",
      desc: "Blending timeless heritage craftsmanship with modern personalization.",
    },
  ];

  const whyBuyFromUs = [
    {
      icon: <Award size={28} />,
      title: "Expert Craftsmanship",
      desc: "Decades of experience in traditional and modern jewellery making.",
    },
    {
      icon: <CheckCircle2 size={28} />,
      title: "Premium Quality",
      desc: "BIS Hallmarked gold and high-grade silver for lasting brilliance.",
    },
    {
      icon: <ShieldCheck size={28} />,
      title: "Secure Ordering",
      desc: "Confidential custom designs and safe transaction processes.",
    },
    {
      icon: <Clock size={28} />,
      title: "Timely Delivery",
      desc: "Committed schedules to ensure your jewelry arrives for your special day.",
    },
  ];

  const nameBracelets = [
    {
      name: "Classic Script Name",
      img: "/images/showcase/custom_name_bracelet.webp",
      metal: "gold",
    },
    {
      name: "Initial Link Bracelet",
      img: "/images/showcase/custom_name_bracelet.webp",
      metal: "gold",
    },
    {
      name: "Cursive Signature Band",
      img: "/images/showcase/custom_name_bracelet.webp",
      metal: "gold",
    },
  ];

  const menWomenBracelets = [
    {
      name: "Men's Bold Engraved",
      img: "/images/showcase/custom_men_bracelet.webp",
      metal: "gold",
    },
    {
      name: "Heritage Men's Band",
      img: "/images/showcase/custom_men_bracelet.webp",
      metal: "gold",
    },
    {
      name: "Unity Star Cuff",
      img: "/images/showcase/star_gold_bracelet.webp",
      metal: "gold",
    },
  ];

  const pendants = [
    {
      name: "Oval Photo Locket",
      img: "/images/showcase/custom_photo_pendant.webp",
      sub: "PHOTO PENDANTS",
      metal: "gold",
    },
    {
      name: "Classic Memory Pendant",
      img: "/images/showcase/Product Shoot - TARA SRI by Tibarumal Gems & Jewels.webp",
      sub: "PHOTO PENDANTS",
      metal: "gold",
    },
    {
      name: "Heart Photo Keepsake",
      img: "/images/showcase/gorgeous necklace.webp",
      sub: "PHOTO PENDANTS",
      metal: "gold",
    },
  ];

  const rings = [
    {
      name: "Date Engraved Ring",
      img: "/images/showcase/Forever Gleam Solitaire Gold-Plated Adjustable Ring.webp",
      sub: "ENGAGEMENT/CUSTOM",
      metal: "gold",
    },
    {
      name: "Initial Gold Band",
      img: "/images/showcase/Lulu Dainty Twist Adjustable Ring in Rose Gold.webp",
      sub: "ENGAGEMENT/CUSTOM",
      metal: "gold",
    },
    {
      name: "Custom Solitaire",
      img: "/images/showcase/Ring.webp",
      sub: "ENGAGEMENT/CUSTOM",
      metal: "diamond",
    },
  ];

  const lightweightItems = [
    {
      name: "Heart Haram",
      img: "/images/showcase/lightweight_heart_haram.webp",
      desc: "A delicate 22K gold necklace perfect for graceful everyday wear.",
      metal: "gold",
    },
    {
      name: "Silver Bangle",
      img: "/images/showcase/lightweight_silver_bangle.webp",
      desc: "Pure silver handcrafted bangles with a radiant, polished finish.",
      metal: "silver",
    },
    {
      name: "Baby Anklet (Thandai)",
      img: "/images/showcase/lightweight_baby_thandai.webp",
      desc: "Traditional silver anklets designed for comfort and heritage.",
      metal: "silver",
    },
  ];

  return (
    <div className="overflow-hidden font-sans bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[62vh] min-h-[460px] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/showcase/gold_custom_hero_new.webp"
            className="w-full h-full object-cover"
            alt="Gold Customized Jewelry"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 max-w-5xl px-4 text-white">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-maroon-light font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            Bespoke Creations
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 font-heading text-4xl lg:text-7xl leading-[1.1] text-white drop-shadow-2xl tracking-normal"
          >
            <span className="font-script text-5xl lg:text-8xl text-[#FFD700] lowercase block mb-2">
              Gold
            </span>
            Customized Jewelry – <br className="hidden lg:block" />{" "}
            <span className="text-3xl lg:text-5xl opacity-90 block mt-4 font-light tracking-wide">
              Bracelets, Rings & Pendants
            </span>
          </motion.h1>
        </div>
        <div className="absolute hidden -translate-x-1/2 bottom-10 left-1/2 animate-bounce lg:block">
          <div className="w-px h-16 bg-gradient-to-b from-maroon-light to-transparent"></div>
        </div>
      </section>

      {/* INTRO SECTION - Calligraphy Design */}
      <section className="relative py-20 lg:py-28 bg-[#fafafa] overflow-hidden">
        {/* Soft Background Accents */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50">
          <svg className="w-full h-full" viewBox="0 0 1440 400" fill="none">
            <path
              d="M-100 350C200 300 400 50 800 150C1200 250 1500 0 1500 0"
              stroke="#FFD700"
              strokeWidth="1.2"
            />
            <path
              d="M-50 400C300 350 500 100 900 200C1300 300 1600 50 1600 50"
              stroke="#FFD700"
              strokeWidth="1.2"
            />
          </svg>
        </div>

        <div className="max-w-5xl px-4 mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-12"
          >
            <p className="text-2xl lg:text-4xl text-stone-600 font-serif leading-[1.6] italic max-w-5xl mx-auto">
              Our master artisans combine heritage techniques with your personal
              vision <br className="hidden lg:block" />
              to create jewelry that speaks your unique{" "}
              <span className="font-script text-5xl lg:text-7xl text-[#FFD700] lowercase">
                language
              </span>{" "}
              of elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section
        id="gold-section"
        className="py-16 lg:py-20 space-y-16 lg:space-y-20"
      >
        {/* BRACELETS */}
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="mb-10 lg:mb-12">
            <h2 className="text-4xl lg:text-6xl font-heading font-bold black-gold-animated mb-6 uppercase tracking-wide">
              Customized Gold Bracelets
            </h2>
          </div>

          <div className="space-y-10 lg:space-y-12">
            {/* Name Bracelets Sub-grid */}
            <div>
              <h3 className="text-lg font-bold tracking-[0.15em] text-maroon uppercase border-b border-stone-100 pb-3 mb-6 lg:mb-8">
                1. Name Bracelets
              </h3>
              <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {nameBracelets.map((item, i) => (
                  <ProductCard key={i} item={item} />
                ))}
              </div>
            </div>

            {/* Men & Women Sub-grid */}
            <div>
              <h3 className="text-lg font-bold tracking-[0.15em] text-maroon uppercase border-b border-stone-100 pb-3 mb-6 lg:mb-8">
                2. Bracelets for Men & Women
              </h3>
              <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {menWomenBracelets.map((item, i) => (
                  <ProductCard key={i} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PENDANTS */}
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col justify-between gap-6 mb-10 lg:mb-12 lg:flex-row lg:items-end">
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold black-gold-animated mb-6">
                Customized Gold Pendants
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pendants.map((item, i) => (
              <ProductCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* RINGS */}
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col justify-between gap-6 mb-10 lg:mb-12 text-right lg:flex-row lg:items-end lg:text-left">
            <div className="lg:w-full">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold black-gold-animated mb-6">
                Customized Gold Rings
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rings.map((item, i) => (
              <ProductCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTWEIGHT SECTION */}
      <section className="py-16 lg:py-20 bg-[#fff6ef] text-[#5B0E23] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-maroon/10 blur-[100px] rounded-full -mr-48 -mt-48"></div>
        <div className="relative z-10 px-4 mx-auto max-w-7xl lg:px-8">
          <div className="mb-10 lg:mb-12 space-y-3 text-center">
            <h2 className="font-serif text-4xl font-bold lg:text-5xl black-gold-animated">
              Lightweight Gold Jewelry
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-3">
            {lightweightItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className={`p-6 lg:p-7 border-[3px] group bg-white rounded-2xl ${
                  item.metal === "gold"
                    ? "border-[#D4AF37]/35"
                    : item.metal === "silver"
                      ? "border-[#C0C0C0]/45"
                      : "border-[#A5D8FF]/55"
                }`}
              >
                <div className="mb-8 overflow-hidden aspect-square rounded-xl">
                  <img
                    src={item.img}
                    alt={item.name}
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 border-[3px] ${
                      item.metal === "gold"
                        ? "border-[#D4AF37]/55"
                        : item.metal === "silver"
                          ? "border-[#C0C0C0]/70"
                          : "border-[#A5D8FF]/80"
                    }`}
                  />
                </div>
                <h4 className="mb-4 font-serif text-2xl font-bold text-[#5B0E23]">
                  {item.name}
                </h4>
                <p className="font-light leading-relaxed text-stone-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 lg:py-20 bg-[#faf7f2] border-y border-[#5B0E23]/10">
        <div className="max-w-4xl px-4 mx-auto space-y-7 lg:space-y-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold black-gold-animated tracking-wide uppercase">
            Order Your Gold Customized Jewelry Today
          </h2>
          <p className="text-lg font-light tracking-wide text-stone-600">
            Let us help you create a piece that lasts forever. Contact our
            jewelry experts to start your customization journey.
          </p>
          <div className="pt-6">
            <a
              href="/category/gold"
              className="bg-[#5B0E23] hover:bg-[#3D0916] text-white px-10 py-5 font-bold tracking-[0.2em] transition-all uppercase inline-flex items-center gap-4 mx-auto group shadow-xl hover:shadow-2xl"
            >
              Explore Collection{" "}
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-2"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ProductCardProps {
  item: {
    name: string;
    img: string;
    sub?: string;
    metal?: "gold" | "silver" | "diamond";
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const metal = item.metal || "gold";
  const cardBorderClass =
    metal === "gold"
      ? "border-[#D4AF37]/35"
      : metal === "silver"
        ? "border-[#C0C0C0]/45"
        : "border-[#A5D8FF]/55";

  const imageBorderClass =
    metal === "gold"
      ? "border-[#D4AF37]/55"
      : metal === "silver"
        ? "border-[#C0C0C0]/70"
        : "border-[#A5D8FF]/80";

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`overflow-hidden transition-all duration-500 bg-white border-[3px] shadow-sm group rounded-2xl hover:shadow-xl ${cardBorderClass}`}
    >
      <div className="aspect-[4/4.8] overflow-hidden relative">
        <img
          src={item.img}
          alt={item.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 border-[3px] ${imageBorderClass}`}
        />
      </div>
      <div className="p-6">
        {item.sub && (
          <span className="text-[10px] text-maroon font-bold tracking-[0.2em] uppercase mb-2 block">
            {item.sub}
          </span>
        )}
        <h4 className="text-xl font-serif font-bold text-[#5B0E23] group-hover:text-maroon transition-colors uppercase">
          {item.name}
        </h4>
      </div>
    </motion.div>
  );
};

export default GoldCustomized;
