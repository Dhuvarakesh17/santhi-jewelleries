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
    },
    {
      name: "Initial Link Bracelet",
      img: "/images/showcase/custom_name_bracelet.webp",
    },
    {
      name: "Cursive Signature Band",
      img: "/images/showcase/custom_name_bracelet.webp",
    },
  ];

  const menWomenBracelets = [
    {
      name: "Men's Bold Engraved",
      img: "/images/showcase/custom_men_bracelet.webp",
    },
    {
      name: "Heritage Men's Band",
      img: "/images/showcase/custom_men_bracelet.webp",
    },
    {
      name: "Unity Custom Cuff",
      img: "/images/showcase/custom_men_bracelet.webp",
    },
  ];

  const pendants = [
    {
      name: "Oval Photo Locket",
      img: "/images/showcase/custom_photo_pendant.webp",
      sub: "PHOTO PENDANTS",
    },
    {
      name: "Classic Memory Pendant",
      img: "/images/showcase/custom_photo_pendant.webp",
      sub: "PHOTO PENDANTS",
    },
    {
      name: "Heart Photo Keepsake",
      img: "/images/showcase/custom_photo_pendant.webp",
      sub: "PHOTO PENDANTS",
    },
  ];

  const rings = [
    {
      name: "Date Engraved Ring",
      img: "/images/showcase/custom_ring_1.webp",
      sub: "ENGAGEMENT/CUSTOM",
    },
    {
      name: "Initial Gold Band",
      img: "/images/showcase/custom_ring_1.webp",
      sub: "ENGAGEMENT/CUSTOM",
    },
    {
      name: "Custom Solitaire",
      img: "/images/showcase/custom_ring_1.webp",
      sub: "ENGAGEMENT/CUSTOM",
    },
  ];

  const lightweightItems = [
    {
      name: "Heart Haram",
      img: "/images/showcase/lightweight_heart_haram.webp",
      desc: "A delicate 22K gold necklace perfect for graceful everyday wear.",
    },
    {
      name: "Silver Bangle",
      img: "/images/showcase/lightweight_silver_bangle.webp",
      desc: "Pure silver handcrafted bangles with a radiant, polished finish.",
    },
    {
      name: "Baby Anklet (Thandai)",
      img: "/images/showcase/lightweight_baby_thandai.webp",
      desc: "Traditional silver anklets designed for comfort and heritage.",
    },
  ];

  return (
    <div className="overflow-hidden font-sans bg-white">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/showcase/custom_hero.webp"
            className="w-full h-full object-cover border border-[#5B0E23]/20"
            alt="Gold Customized Jewelry"
          />
          <div className="absolute inset-0 bg-black/45"></div>
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
            className="mb-8 font-serif text-4xl font-bold leading-tight lg:text-7xl"
          >
            Gold Customized Jewelry – <br className="hidden lg:block" />{" "}
            Bracelets, Rings & Pendants
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg font-light text-gray-200 lg:text-xl"
          >
            Experience the perfect blend of traditional craftsmanship and modern
            personalization. Every piece is a unique masterpiece crafted
            exclusively for you.
          </motion.p>
        </div>
        <div className="absolute hidden -translate-x-1/2 bottom-10 left-1/2 animate-bounce lg:block">
          <div className="w-px h-16 bg-gradient-to-b from-maroon-light to-transparent"></div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="max-w-5xl px-4 py-24 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative p-10 lg:p-16 border-x border-[#5B0E23]/20"
        >
          <div className="absolute top-0 px-6 -translate-x-1/2 -translate-y-1/2 bg-white left-1/2">
            <Heart className="w-8 h-8 text-maroon" />
          </div>
          <p className="text-xl lg:text-2xl text-[#5B0E23] leading-relaxed font-serif italic">
            "Customized gold jewelry allows you to transform your most cherished
            moments into timeless treasures. Our master artisans combine
            heritage techniques with your personal vision to create jewelry that
            speaks your unique language of elegance."
          </p>
        </motion.div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="py-24 bg-[#faf7f2]">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="mb-16 space-y-4 text-center">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#5B0E23]">
              Why Choose Customized Jewelry?
            </h2>
            <div className="h-1 w-24 bg-[#D4AF37] mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-[#5B0E23]/10 hover:border-[#5B0E23]/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#5B0E23]/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#5B0E23]/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#5B0E23] mb-3">
                  {item.title}
                </h3>
                <p className="leading-relaxed text-stone-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section id="gold-section" className="py-32 space-y-40">
        {/* BRACELETS */}
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#5B0E23] mb-6">
              Customized Gold Bracelets
            </h2>
            <p className="max-w-3xl text-lg font-light text-stone-600">
              Make a bold statement with our range of personalized bracelets.
              Whether it's your name in golden script or a rugged band for men,
              we craft it to perfection.
            </p>
          </div>

          <div className="space-y-20">
            {/* Name Bracelets Sub-grid */}
            <div>
              <h3 className="text-xl font-bold tracking-[0.2em] text-maroon uppercase border-b border-stone-100 pb-4 mb-10">
                1. Name Bracelets
              </h3>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {nameBracelets.map((item, i) => (
                  <ProductCard key={i} item={item} />
                ))}
              </div>
            </div>

            {/* Men & Women Sub-grid */}
            <div>
              <h3 className="text-xl font-bold tracking-[0.2em] text-maroon uppercase border-b border-stone-100 pb-4 mb-10">
                2. Bracelets for Men & Women
              </h3>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
                {menWomenBracelets.map((item, i) => (
                  <ProductCard key={i} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PENDANTS */}
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col justify-between gap-8 mb-16 lg:flex-row lg:items-end">
            <div className="lg:w-1/2">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#5B0E23] mb-6">
                Customized Gold Pendants
              </h2>
              <p className="text-lg font-light text-stone-600">
                Cherish your memories with our photo pendants and custom
                engravings. The perfect way to keep your loved ones close to
                your heart.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {pendants.map((item, i) => (
              <ProductCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* RINGS */}
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col justify-between gap-8 mb-16 text-right lg:flex-row lg:items-end lg:text-left">
            <div className="lg:w-full">
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#5B0E23] mb-6">
                Customized Gold Rings
              </h2>
              <p className="max-w-3xl text-lg font-light text-stone-600">
                From dream engagement rings to personalized daily bands, we
                bring your vision to life with exceptional detail and quality.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {rings.map((item, i) => (
              <ProductCard key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTWEIGHT SECTION */}
      <section className="py-32 bg-[#fff6ef] text-[#5B0E23] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-maroon/10 blur-[100px] rounded-full -mr-48 -mt-48"></div>
        <div className="relative z-10 px-4 mx-auto max-w-7xl lg:px-8">
          <div className="mb-20 space-y-4 text-center">
            <span className="text-sm font-bold tracking-widest uppercase text-[#5B0E23]">
              Everyday Elegance
            </span>
            <h2 className="font-serif text-4xl font-bold lg:text-5xl text-[#5B0E23]">
              Lightweight Gold Jewelry
            </h2>
            <div className="w-20 h-1 mx-auto mt-6 bg-[#D4AF37]"></div>
          </div>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {lightweightItems.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-8 border group bg-white border-[#5B0E23]/10 rounded-2xl"
              >
                <div className="mb-8 overflow-hidden aspect-square rounded-xl">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 border border-[#D4AF37]/25"
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

      {/* WHY BUY FROM US */}
      <section className="px-4 py-32 mx-auto max-w-7xl lg:px-8">
        <div className="mb-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#5B0E23] mb-4 uppercase tracking-[0.2em]">
            Why Buy From Us?
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {whyBuyFromUs.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group space-y-6 text-center p-8 bg-white border border-[#5B0E23]/15 rounded-2xl shadow-sm hover:shadow-xl hover:border-[#5B0E23]/35 transition-all duration-500"
            >
              <div className="flex justify-center text-maroon transition-transform duration-500 group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg text-[#5B0E23] uppercase tracking-widest">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-500">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-[#faf7f2] border-y border-[#5B0E23]/10">
        <div className="max-w-4xl px-4 mx-auto space-y-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#5B0E23]">
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
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="overflow-hidden transition-all duration-500 bg-white border shadow-sm group rounded-2xl border-stone-100 hover:shadow-xl"
  >
    <div className="aspect-[4/5] overflow-hidden relative">
      <img
        src={item.img}
        alt={item.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 border border-[#5B0E23]/20"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6 transition-transform duration-500 translate-y-full bg-gradient-to-t from-black/60 to-transparent group-hover:translate-y-0">
        <span className="flex items-center gap-2 text-xs font-bold tracking-widest text-white uppercase">
          View Details <ArrowRight size={14} />
        </span>
      </div>
    </div>
    <div className="p-8">
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

export default GoldCustomized;
