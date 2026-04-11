import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Award,
  ShieldCheck,
  Sparkles,
  Users,
  Star,
  TrendingUp,
  Heart,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Magnetic = ({ children }: { children: React.ReactNode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  const { x, y } = position;

  return (
    <motion.div
      style={{ position: "relative" }}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

const HeroSlider = () => {
  const slides = [
    {
      image: "/images/showcase/hero-scene-corosol.webp",
      subtitle: "Bridal Grandeur • Timeless Craftsmanship",
      title: "Royal Temple Jewellery",
      desc: "Celebrate every occasion with intricate gold artistry inspired by heritage motifs and modern elegance.",
    },
    {
      image: "/images/showcase/gold_5.webp",
      subtitle: "Daily Luxury • Modern Craftsmanship",
      title: "Designer Gold Bracelets",
      desc: "Sophisticated silhouettes designed for the modern woman. Elevate your everyday style with 22K pure gold.",
    },
    {
      image: "/images/showcase/gold_3.webp",
      subtitle: "Antique Style • Divine Brilliance",
      title: "Traditional Gold Jhumkas",
      desc: "Intricate Nagas and Temple jewelry craftsmanship that reflects our rich cultural legacy.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[95vh] w-full overflow-hidden bg-stone-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt="Hero Slide"
            className="object-cover w-full h-full border border-[#5B0E23]/20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 flex items-center h-full px-4 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-3xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-maroon-light tracking-[0.5em] uppercase text-xs lg:text-sm font-bold mb-6 block font-serif">
                {slides[current].subtitle}
              </span>
              <h1 className="text-5xl lg:text-8xl font-serif font-bold mb-8 leading-[1.1]">
                {slides[current].title}
              </h1>
              <p className="max-w-lg mb-12 text-lg font-light leading-relaxed lg:text-xl opacity-90">
                {slides[current].desc}
              </p>
              <div className="flex flex-col items-start gap-8 sm:flex-row">
                <Magnetic>
                  <Link
                    to="/category/Gold"
                    className="group relative px-12 py-6 bg-maroon text-white font-bold tracking-[0.25em] uppercase transition-all duration-500 flex items-center shadow-[0_20px_40px_-10px_rgba(91,14,35,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.3)] active:scale-95 overflow-hidden"
                  >
                    {/* Shine Layer */}
                    <div className="absolute inset-0 z-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer"></div>

                    {/* Border Trace SVG */}
                    <svg
                      className="absolute inset-0 z-10 w-full h-full pointer-events-none"
                      fill="none"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="calc(100% - 4px)"
                        height="calc(100% - 4px)"
                        className="stroke-[#D4AF37] stroke-[2px] [stroke-dasharray:400,0] group-hover:[stroke-dasharray:0,400] transition-all duration-1000"
                        strokeLinecap="square"
                      />
                    </svg>

                    <span className="relative z-20 flex items-center">
                      Browse Gold{" "}
                      <ChevronRight
                        size={22}
                        className="ml-3 transition-transform duration-500 group-hover:translate-x-2"
                      />
                    </span>
                  </Link>
                </Magnetic>

                <Magnetic>
                  <Link
                    to="/gold/customized"
                    className="group relative px-12 py-6 border-2 border-white/20 hover:border-[#D4AF37] text-white font-bold tracking-[0.25em] uppercase transition-all duration-500 backdrop-blur-sm active:scale-95 flex items-center bg-white/5 overflow-hidden"
                  >
                    {/* Liquid Fill */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#D4AF37] to-[#B8860B] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>

                    <span className="relative z-20 flex items-center transition-colors duration-500 group-hover:text-black">
                      Customization Order{" "}
                      <ArrowRight
                        size={20}
                        className="ml-3 transition-all duration-700 -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                      />
                    </span>
                  </Link>
                </Magnetic>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute z-20 flex gap-4 bottom-12 right-12">
        <button
          onClick={prevSlide}
          className="p-3 text-white transition-all border rounded-full border-white/20 hover:bg-white hover:text-black backdrop-blur-sm"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 text-white transition-all border rounded-full border-white/20 hover:bg-white hover:text-black backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slider Indicators */}
      <div className="absolute z-20 flex gap-3 -translate-x-1/2 bottom-12 left-1/2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 transition-all duration-500 rounded-full ${current === i ? "w-12 bg-maroon" : "w-4 bg-white/30 hover:bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
};

const ScrollReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Home = () => {
  // Assets & Data
  const goldPlate = "/images/showcase/gold_5.webp"; // Heavy gold haram/articulate piece
  const goldCategoryImg = "/images/showcase/gold_ring_1.webp";
  const silverCategoryImg = "/images/showcase/silver_anklet_1.webp";
  const diamondCategoryImg = "/images/showcase/diamond_ring_1.webp";

  const whyChooseData = [
    {
      icon: <Award size={36} />,
      title: "Legacy of Trust",
      desc: "Serving generations with integrity and unmatched purity since 1985.",
    },
    {
      icon: <ShieldCheck size={36} />,
      title: "BIS Hallmarked",
      desc: "100% certified gold purity as per international standards for absolute peace of mind.",
    },
    {
      icon: <Sparkles size={36} />,
      title: "Master Artistry",
      desc: "Exquisite handcrafted designs by award-winning artisans reflecting our rich heritage.",
    },
    {
      icon: <Users size={36} />,
      title: "Client First",
      desc: "Personalized service tailored to your unique celebrations, from weddings to everyday wear.",
    },
  ];

  const lightweightItems = [
    {
      name: "Heart Gold Haram",
      img: "/images/showcase/lightweight_heart_haram.webp",
      price: "Lightweight 22K",
    },
    {
      name: "Pure Silver Bangle",
      img: "/images/showcase/lightweight_silver_bangle.webp",
      price: "Everyday Wear",
    },
    {
      name: "Baby Thandai",
      img: "/images/showcase/lightweight_baby_thandai.webp",
      price: "Traditional",
    },
  ];

  const fashionableItems = [
    {
      name: "Fusion Gold Neck Piece",
      img: "/images/showcase/gold_2.webp",
      tag: "TRENDING",
    },
    {
      name: "Oxidized Silver Suite",
      img: "/images/showcase/silver_3.webp",
      tag: "NEW",
    },
    {
      name: "Glamour Diamond Ring",
      img: "/images/showcase/diamond_ext_1.webp",
      tag: "POPULAR",
    },
  ];

  return (
    <div className="overflow-hidden font-sans bg-white">
      <HeroSlider />

      {/* Signature Collections / Curated Showcase Section */}
      <section className="py-32 max-w-[1440px] mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-20 space-y-4 text-center">
            <span className="text-maroon text-[10px] font-black tracking-[0.4em] uppercase opacity-70">
              Signature Collections
            </span>
            <h2 className="font-serif text-4xl font-bold text-gray-900 uppercase lg:text-6xl">
              Curated Showcase
            </h2>
            <div className="w-24 h-1 mx-auto mt-6 bg-maroon"></div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <ScrollReveal delay={0.1}>
            <CategoryCard
              title="Gold"
              items="Heritage Jewels"
              image={goldCategoryImg}
              link="/category/Gold"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <CategoryCard
              title="Silver"
              items="Pure Radiance"
              image={silverCategoryImg}
              link="/category/Silver"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <CategoryCard
              title="Diamond"
              items="Luxury Solitaires"
              image={diamondCategoryImg}
              link="/category/Diamond"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Features Section - REIMAGINED */}
      <section className="py-32 bg-[#fff6ef] text-[#5B0E23] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] pointer-events-none"></div>
        <div className="relative z-10 px-4 mx-auto max-w-7xl lg:px-8">
          <ScrollReveal>
            <div className="mb-24 text-center">
              <span className="text-[#5B0E23] font-bold uppercase tracking-[0.5em] text-xs">
                Uncompromising Standards
              </span>
              <h2 className="mt-4 font-serif text-4xl font-bold lg:text-5xl text-[#5B0E23]">
                Why Choose Santhi Jewellers
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {whyChooseData.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  className="flex flex-col items-center h-full p-10 text-center transition-all duration-300 border bg-white border-[#5B0E23]/10 rounded-2xl group"
                >
                  <div className="mb-8 text-[#D4AF37] group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h3 className="mb-4 font-serif text-xl font-bold tracking-wider text-[#5B0E23] uppercase">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light leading-relaxed text-stone-600">
                    {item.desc}
                  </p>
                  <div className="w-8 h-[2px] bg-[#D4AF37] mt-8 opacity-50 group-hover:w-16 transition-all duration-500"></div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mastering the Fine Art of Gold Section */}
      <section className="py-32 overflow-hidden bg-stone-50">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col items-center gap-20 lg:flex-row">
            <ScrollReveal className="lg:w-1/2">
              <div className="relative p-4 border rounded-[40px] border-stone-500/60 bg-[#f4efed]">
                <div className="overflow-hidden border rounded-[32px] border-stone-500/60">
                  <img
                    src={goldPlate}
                    alt="Gold Artistry"
                    className="w-full h-[650px] object-cover rounded-[28px] shadow-2xl grayscale-[0.1] hover:grayscale-0 transition-all duration-700 border border-[#5B0E23]/20"
                  />
                </div>
                <div className="absolute z-20 px-8 py-6 bg-white border rounded-[20px] shadow-xl -bottom-6 left-6 border-stone-300/90">
                  <p className="font-serif text-5xl font-bold tracking-tight text-[#102341]">
                    Purity Guaranteed
                  </p>
                  <p className="mt-2 text-sm font-bold tracking-[0.25em] uppercase text-stone-400">
                    Certified Craftsmanship
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <div className="space-y-10 lg:w-1/2">
              <ScrollReveal delay={0.2}>
                <span className="text-maroon tracking-[0.4em] font-black text-xs uppercase block opacity-70">
                  The Art of Creation
                </span>
                <h2 className="text-5xl lg:text-7xl font-serif font-bold text-gray-900 leading-[1.1]">
                  Mastering The Fine Art Of Gold
                </h2>
                <p className="pl-6 mt-8 text-xl italic font-light leading-relaxed border-l-4 text-stone-500 border-maroon/20">
                  "Every piece at Santhi Jewellers tells a story of meticulous
                  dedication. From the initial hand-drawn sketch to the final
                  laser-precision polish, our master artisans ensure perfection
                  in every silhouette."
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="grid grid-cols-2 gap-12 pt-10">
                  <div className="space-y-2">
                    <h4 className="font-serif text-5xl font-bold text-maroon">
                      100%
                    </h4>
                    <p className="text-[10px] text-stone-500 uppercase tracking-[0.3em] font-black">
                      Hallmarked Gold
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-serif text-5xl font-bold text-maroon">
                      35+
                    </h4>
                    <p className="text-[10px] text-stone-500 uppercase tracking-[0.3em] font-black">
                      Years of Legacy
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Fashionable Trends Section */}
      <section className="py-32 bg-white">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <ScrollReveal>
            <div className="mb-24 space-y-6 text-center">
              <TrendingUp className="w-12 h-12 mx-auto text-maroon" />
              <h2 className="font-serif text-4xl font-bold text-gray-900 uppercase lg:text-6xl">
                Fashionable Trends
              </h2>
              <p className="max-w-2xl mx-auto text-lg font-light text-gray-500">
                Stay ahead with our most sought-after contemporary pieces that
                redefine modern luxury.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {fashionableItems.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-[24px] shadow-lg border border-stone-100">
                  <div className="h-[550px] overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110 border border-[#5B0E23]/20"
                    />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-12 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent group-hover:opacity-100">
                    <span className="text-[#D4AF37] font-black text-[10px] tracking-[0.4em] mb-4">
                      {item.tag}
                    </span>
                    <h4 className="mb-6 font-serif text-3xl font-bold leading-tight text-white">
                      {item.name}
                    </h4>
                    <Link
                      to="/category/Gold"
                      className="text-white text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 group/btn border-b border-white/30 pb-2 w-fit"
                    >
                      Explore Suite{" "}
                      <ChevronRight
                        size={16}
                        className="transition-transform group-hover/btn:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ title, items, image, link }) => (
  <Link
    to={link}
    className="group relative block h-[650px] overflow-hidden rounded-[16px] border border-[#5B0E23]/10 shadow-lg hover:shadow-2xl transition-all duration-700"
  >
    <img
      src={image}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110 border border-[#5B0E23]/20"
    />
    <div className="absolute inset-0 transition-all duration-700 bg-gradient-to-t from-white/95 via-white/40 to-white/5 group-hover:from-white group-hover:via-white/60"></div>
    <div className="absolute left-0 right-0 px-10 text-center bottom-12">
      <h3 className="text-4xl font-serif font-bold text-[#5B0E23] mb-3 uppercase tracking-wider">
        {title}
      </h3>
      <p className="text-stone-500 text-[11px] font-bold tracking-[0.4em] uppercase mb-8 opacity-80">
        {items}
      </p>
      <div className="w-12 h-[2px] bg-maroon mx-auto group-hover:w-full transition-all duration-700"></div>
    </div>
  </Link>
);

export default Home;
