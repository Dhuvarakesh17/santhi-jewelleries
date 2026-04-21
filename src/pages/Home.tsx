import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
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
      image: "/images/showcase/hero-hd-4.webp",
      subtitle: "Antique Style • Divine Brilliance",
      title: "Traditional Gold Classics",
      desc: "Intricate Nagas and Temple jewelry craftsmanship that reflects our rich cultural legacy.",
    },
    {
      image: "/images/showcase/hero-section11.webp",
      subtitle: "Daily Luxury • Modern Craftsmanship",
      title: "Designer Gold Collections",
      desc: "Sophisticated silhouettes designed for the modern woman. Elevate your everyday style with 22K pure gold.",
    },
    {
      image: "/images/showcase/hero-section1.webp",
      subtitle: "Diamond Dreams • Eternal Sparkle",
      title: "Signature Diamond Luxe",
      desc: "Unmistakable brilliance set in handcrafted gold. Discover our exclusive range of boutique diamond masterpieces.",
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
    <section className="relative h-[60vh] lg:h-[88vh] min-h-[420px] lg:min-h-[560px] w-full overflow-hidden bg-stone-900">
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
            className="object-cover object-top lg:object-[right_10%] w-full h-full border border-[#480607]/20"
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
              <span className="text-maroon-light tracking-[0.4em] uppercase text-[10px] lg:text-sm font-bold mb-4 lg:mb-6 block font-serif">
                {slides[current].subtitle}
              </span>
              <h1 className="text-3xl lg:text-8xl font-serif font-bold mb-6 lg:mb-8 leading-tight">
                {slides[current].title}
              </h1>
              <p className="max-w-lg mb-8 lg:mb-12 text-sm font-light leading-relaxed lg:text-xl opacity-90 line-clamp-2 lg:line-clamp-none">
                {slides[current].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Static Action Buttons */}
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
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#D4AF37] to-[#8B1533] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>

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
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute z-20 flex gap-4 bottom-8 right-12">
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
      <div className="absolute z-20 flex gap-3 -translate-x-1/2 bottom-8 left-1/2">
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
      type: "gold",
    },
    {
      name: "Oxidized Silver Suite",
      img: "/images/showcase/silver_3.webp",
      tag: "NEW",
      type: "silver",
    },
    {
      name: "Glamour Diamond Ring",
      img: "/images/showcase/diamond_ext_1.webp",
      tag: "POPULAR",
      type: "diamond",
    },
  ];

  const renderMetalHighlightedName = (
    name: string,
    type: string,
    colorClass: string,
  ) => {
    const keywordByType: Record<string, string> = {
      gold: "Gold",
      silver: "Silver",
      diamond: "Diamond",
    };

    const keyword = keywordByType[type.toLowerCase()];
    if (!keyword) return name;

    const match = name.match(new RegExp(`\\b(${keyword})\\b`, "i"));
    if (!match || match.index === undefined) return name;

    const start = match.index;
    const end = start + match[0].length;

    return (
      <>
        {name.slice(0, start)}
        <span className={colorClass}>{name.slice(start, end)}</span>
        {name.slice(end)}
      </>
    );
  };

  const testimonials = [
    {
      text: "I had an excellent experience with Anu Jewellers while getting our engagement ring made. The craftsmanship was outstanding, with my name and my fiancee's name, along with my fingerprint, engraved beautifully on the ring.",
      author: "Ram Aravinth A V",
    },
    {
      text: "Recently had a custom requirement to buy the product. The interaction I had online and was handled by staff named Sandhya. She was very polite and too helpful in understanding the requirements and delivered it. The service I received from Anu Jewellers is beyond expectations.",
      author: "Seshadri",
    },
    {
      text: "I purchased silver earrings and a silver with gold plated necklace from Sri Anu Jewellers. I was scared to buy online but their response made me comfortable and I received the product next day. I am so happy to see my product exactly as shown.",
      author: "Rajalakshmi Chandrasekaran",
    },
    {
      text: "I recently made an online purchase from Anu Jewels and I'm thoroughly enjoying my new anklet and toe ring. The online shopping experience was seamless, and customer service was top-notch.",
      author: "Chithra M",
    },
    {
      text: "Purchased customized gold couple rings and provided a custom design. They delivered exactly what I envisioned, and the output was perfect. My expectations were fully met. Excellent service.",
      author: "Kishorepandi Nagarajan",
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="overflow-hidden font-sans bg-white">
      <HeroSlider />

      {/* Signature Collections / Curated Showcase Section */}
      <section className="py-8 lg:py-10 max-w-[1440px] mx-auto px-4 lg:px-8">
        <ScrollReveal>
          <div className="mb-8 space-y-3 text-center lg:mb-10">
            <h2 className="font-serif text-3xl font-bold uppercase lg:text-5xl black-gold-animated">
              Curated Showcase
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-3">
          <ScrollReveal delay={0.1}>
            <CategoryCard
              title="Gold"
              items="Heritage Jewels"
              image={goldCategoryImg}
              link="/category/Gold"
              type="gold"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <CategoryCard
              title="Silver"
              items="Pure Radiance"
              image={silverCategoryImg}
              link="/category/Silver"
              type="silver"
            />
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <CategoryCard
              title="Diamond"
              items="Luxury Solitaires"
              image={diamondCategoryImg}
              link="/category/Diamond"
              type="diamond"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Mastering the Fine Art of Gold Section */}
      <section className="py-12 overflow-hidden lg:py-14 bg-stone-50">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col items-center gap-10 lg:flex-row">
            <ScrollReveal className="lg:w-1/2">
              <div className="relative p-2 bg-gradient-to-br from-[#D4AF37] via-[#FBF5B7] to-[#8A6E2F] rounded-[44px] shadow-2xl">
                <div className="relative p-3 bg-white/10 backdrop-blur-sm rounded-[38px] border border-white/20">
                  <div className="overflow-hidden border-2 rounded-[32px] border-[#D4AF37]/30 shadow-inner">
                    <img
                      src={goldPlate}
                      alt="Gold Artistry"
                      className="w-full h-[380px] lg:h-[520px] object-cover rounded-[30px] shadow-2xl grayscale-[0.05] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                    />
                  </div>
                </div>
                {/* Frame Corner Accents */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-[#FBF5B7] rounded-tl-[44px] -m-1"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-[#8A6E2F] rounded-br-[44px] -m-1"></div>
              </div>
            </ScrollReveal>
            <div className="space-y-8 lg:w-1/2">
              <ScrollReveal delay={0.2}>
                <span className="text-maroon tracking-[0.4em] font-black text-xs uppercase block opacity-70">
                  The Art of Creation
                </span>
                <h2 className="text-4xl lg:text-6xl font-serif font-bold text-gray-900 leading-[1.1]">
                  Mastering The Fine Art Of{" "}
                  <span className="gold-text-animated">Gold</span>
                </h2>
                <p className="pl-5 mt-6 text-lg italic font-light leading-relaxed border-l-4 text-stone-500 border-maroon/20">
                  "Every piece at Santhi Jewellers tells a story of meticulous
                  dedication. From the initial hand-drawn sketch to the final
                  laser-precision polish, our master artisans ensure perfection
                  in every silhouette."
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <div className="grid grid-cols-2 gap-8 pt-8">
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
      <section className="py-12 bg-white lg:py-14">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <ScrollReveal>
            <div className="mb-8 space-y-4 text-center lg:mb-10">
              <h2 className="font-serif text-4xl font-bold uppercase lg:text-6xl black-gold-animated">
                Fashionable Trends
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-8 lg:gap-10 md:grid-cols-3 lg:grid-cols-3">
            {fashionableItems.map((item, i) => {
              const frames = {
                gold: {
                  border: "bg-[#D4AF37]",
                  shadow: "hover:shadow-[0_25px_60px_rgba(255,215,0,0.3)]",
                  accent: "bg-[#D4AF37]",
                  glow: "shadow-[0_0_20px_rgba(255,215,0,0.5)]",
                  text: "text-[#FFD700]",
                },
                silver: {
                  border: "bg-[#555555]",
                  shadow: "hover:shadow-[0_25px_60px_rgba(85,85,85,0.3)]",
                  accent: "bg-[#555555]",
                  glow: "shadow-[0_0_20px_rgba(85,85,85,0.4)]",
                  text: "text-[#555555]",
                },
                diamond: {
                  border: "bg-[#8BA2D4]",
                  shadow: "hover:shadow-[0_25px_60px_rgba(139,162,212,0.3)]",
                  accent: "bg-[#8BA2D4]",
                  glow: "shadow-[0_0_20px_rgba(139,162,212,0.4)]",
                  text: "text-[#8BA2D4]",
                },
              };
              const style =
                frames[item.type as keyof typeof frames] || frames.gold;

              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -12, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className={`relative p-1 ${style.border} rounded-[28px] shadow-2xl ${style.shadow} transition-all duration-500`}
                  >
                    <div className="group relative overflow-hidden rounded-[24px] bg-black h-[360px] lg:h-[460px]">
                      <div className="h-full w-full overflow-hidden">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="object-cover w-full h-full transition-transform duration-[1500ms] group-hover:scale-110"
                        />
                      </div>

                      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10 z-30">
                        <span
                          className={`${style.text} font-black text-[10px] tracking-[0.4em] mb-4 uppercase`}
                        >
                          {item.tag}
                        </span>
                        <h4 className="mb-6 font-serif text-3xl font-bold leading-tight text-white drop-shadow-xl">
                          {renderMetalHighlightedName(
                            item.name,
                            item.type,
                            style.text,
                          )}
                        </h4>
                        <Link
                          to={`/category/${item.type}`}
                          className="text-white text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2 group/btn border-b border-white/30 pb-2 w-fit transition-colors hover:border-white"
                        >
                          Explore Suite{" "}
                          <ChevronRight
                            size={16}
                            className="transition-transform group-hover/btn:translate-x-1"
                          />
                        </Link>
                        <div
                          className={`w-12 h-[2.5px] ${style.accent} mt-5 ${style.glow}`}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 border-t border-stone-100 bg-stone-50/30 testimonials-section">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="mb-12 text-center section-header">
            <span className="text-[#D4AF37] text-xs font-black tracking-[0.4em] uppercase mb-3 block">
              What Our Clients Say
            </span>
            <h2 className="relative inline-block pb-4 font-serif text-4xl font-bold tracking-tight text-maroon lg:text-6xl">
              Testimonials
              <div className="absolute left-1/2 bottom-0 w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transform -translate-x-1/2"></div>
            </h2>
          </div>

          <div
            className={`testimonials-carousel ${isPaused ? "is-paused" : ""}`}
          >
            <div className="testimonials-viewport">
              <div className="testimonials-track">
                {duplicatedTestimonials.map((item, index) => (
                  <article
                    key={`${item.author}-${index}`}
                    className="testimonials-slide"
                  >
                    <blockquote
                      className="testimonials-slider__text"
                      onMouseEnter={() => setIsPaused(true)}
                      onMouseLeave={() => setIsPaused(false)}
                      onTouchStart={() => setIsPaused(true)}
                      onTouchEnd={() => setIsPaused(false)}
                      onTouchCancel={() => setIsPaused(false)}
                    >
                      <span className="testimonial-stars">★★★★★</span>
                      <p>{item.text}</p>
                      <cite>{item.author}</cite>
                    </blockquote>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const CategoryCard = ({ title, items, image, link, type = "gold" }) => {
  const frames = {
    gold: {
      border: "bg-[#D4AF37]",
      shadow: "hover:shadow-[0_25px_60px_rgba(255,215,0,0.3)]",
      accent: "bg-[#D4AF37]",
      glow: "shadow-[0_0_20px_rgba(255,215,0,0.5)]",
      text: "text-[#FFD700]",
    },
    silver: {
      border: "bg-[#555555]",
      shadow: "hover:shadow-[0_25px_60px_rgba(85,85,85,0.3)]",
      accent: "bg-[#555555]",
      glow: "shadow-[0_0_20px_rgba(85,85,85,0.4)]",
      text: "text-[#555555]",
    },
    diamond: {
      border: "bg-[#8BA2D4]",
      shadow: "hover:shadow-[0_25px_60px_rgba(139,162,212,0.3)]",
      accent: "bg-[#8BA2D4]",
      glow: "shadow-[0_0_20px_rgba(139,162,212,0.4)]",
      text: "text-[#8BA2D4]",
    },
  };

  const style = frames[type.toLowerCase()] || frames.gold;

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className={`relative p-1 ${style.border} rounded-[28px] shadow-2xl ${style.shadow} transition-all duration-500`}
    >
      <Link
        to={link}
        className="group relative block h-[280px] sm:h-[320px] lg:h-[380px] overflow-hidden rounded-[24px] bg-black"
      >
        {/* Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
        />

        {/* Content */}
        <div className="absolute left-0 right-0 px-6 text-center bottom-8 z-30">
          <h3 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-2 uppercase tracking-wider drop-shadow-xl">
            {title}
          </h3>

          <p
            className={`${style.text} text-[10px] font-bold tracking-[0.4em] uppercase mb-5`}
          >
            {items}
          </p>

          <div
            className={`w-12 h-[2.5px] ${style.accent} mx-auto group-hover:w-32 transition-all duration-500 ${style.glow}`}
          ></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Home;
