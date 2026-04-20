import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  Sparkles,
  ShieldCheck,
  Users,
  Compass,
  Hammer,
  Gem,
  CheckCircle2,
  Heart,
  UserSquare,
} from "lucide-react";

const ZoomReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const About = () => {
  const steps = [
    {
      icon: <Compass size={32} />,
      title: "Curation",
      desc: "Sourcing the world's most exquisite raw materials.",
    },
    {
      icon: <Hammer size={32} />,
      title: "Handcrafting",
      desc: "Shaping metal with heritage tools and patience.",
    },
    {
      icon: <Gem size={32} />,
      title: "Setting",
      desc: "Perfectly aligning stones for maximum brilliance.",
    },
    {
      icon: <CheckCircle2 size={32} />,
      title: "Quality Check",
      desc: "Rigorous 5-point inspection for every single piece.",
    },
  ];

  return (
    <div className="bg-[#fafafc]">
      {/* 1. HERO SECTION - EMOTIONAL & BOLD */}
      <section className="relative h-[60vh] lg:h-[88vh] flex items-center justify-center overflow-hidden bg-stone-900">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/showcase/about-us-bg-new.webp"
            alt="Heritage Jewellery Crafting"
            className="object-cover w-full h-full opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#fafafc]"></div>
        </motion.div>

        <div className="relative z-10 px-4 text-center max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 30, letterSpacing: "0.05em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.1em" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-cinzel text-4xl lg:text-9xl text-white font-black uppercase"
          >
            <span className="signature-animated">About</span> <br className="lg:hidden"/> <span className="gold-text-animated">Us</span>
          </motion.h1>
        </div>
      </section>

      {/* 2. OUR STORY - DUAL COLUMN DEPTH */}
      <section className="py-20 bg-white lg:py-32">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-14">
            <div className="space-y-8 lg:w-1/2">
              <ZoomReveal>
                <span className="text-[#480607] font-bold tracking-[0.3em] uppercase text-xs">
                  Generation of Trust
                </span>
                <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-[#480607] lg:text-6xl">
                  A Journey of Purity, <br className="hidden lg:block"/> Passion & Perfection
                </h2>
              </ZoomReveal>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 text-base leading-relaxed text-stone-600 lg:text-lg lg:leading-loose"
              >
                <p>
                  Santhi Jewellers was founded on a simple yet profound belief:
                  that every piece of jewelry should tell a story of integrity.
                  In 1985, our founder envisioned a boutique where purity was
                  non-negotiable and craftsmanship was an act of worship.
                </p>
                <p>
                  From a small workshop specializing in traditional Thali chains
                  and antique Nagas, we have grown into a multi-generational
                  institution. Today, while we embrace the precision of modern
                  design, our heart remains with the artisans who breathe life
                  into gold with their bare hands.
                </p>
              </motion.div>
            </div>
            <div className="relative lg:w-1/2 group">
              <div className="relative z-10 p-5 bg-gradient-to-br from-[#D4AF37] via-[#FFD700] to-[#A67C00] rounded-[60px] shadow-[0_20px_50px_rgba(212,175,55,0.4)] transition-all duration-700 hover:scale-[1.02]">
                <div className="overflow-hidden rounded-[45px] border-4 border-[#480607]/10">
                  <img
                    src="/images/about_bg_indriya.webp"
                    alt="Traditional Goldsmith"
                    className="w-full h-[500px] object-cover hover:scale-110 transition-transform duration-1000"
                  />
                </div>
              </div>
              <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-[100px] -z-10 group-hover:bg-[#D4AF37]/20 transition-all duration-700"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#480607]/5 rounded-full blur-[80px] -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PHILOSOPHY - THREE PILLARS */}
      <section className="py-20 lg:py-28 bg-[#fafafc]">
        <div className="px-4 mx-auto max-w-7xl lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {[
            {
              title: "Our Mission",
              desc: "To empower every occasion with jewelry that reflects uncompromised purity and the distinct personality of the wearer, ensuring trust is passed down through generations.",
            },
            {
              title: "Our Vision",
              desc: "To become the global hallmark of South Indian heritage jewelry, where ancient craftsmanship survives and thrives in the hearts of modern trendsetters.",
            },
            {
              title: "Our Values",
              desc: "Integrity in every transaction, purity in every ornament, and care in every customer relationship. We stand for trust, craftsmanship, transparency, and timeless design.",
            },
          ].map((item, i) => (
            <React.Fragment key={i}>
              <ZoomReveal delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="relative p-[2px] rounded-[32px] bg-gradient-to-br from-[#480607] via-[#8B1533] to-[#480607]/30 h-full shadow-lg group transition-all duration-700 hover:shadow-[0_20px_50px_rgba(72,6,7,0.25)]"
                >
                  <div className="bg-white p-6 lg:p-8 rounded-[30px] h-full flex flex-col border border-[#480607]/10">
                    <h3 className="mb-4 font-serif text-2xl font-bold tracking-wider uppercase maroon-gold-animated">
                      {item.title}
                    </h3>
                    <p className="text-sm font-light leading-relaxed lg:text-base text-stone-600">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              </ZoomReveal>
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="pt-10 pb-16 lg:pt-12 lg:pb-20 bg-white">
        <div className="px-4 mx-auto text-center max-w-7xl lg:px-8">
          <ZoomReveal>
            <div className="flex flex-col items-center">
              <span className="text-[#480607] font-bold tracking-[0.4em] uppercase text-xs block mb-3">
                Service Excellence
              </span>
              <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-12 lg:mb-14 uppercase tracking-widest leading-tight black-gold-animated">
                The Pillars of Santhi
              </h2>
            </div>
          </ZoomReveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: <Award size={40} />,
                title: "Certified Purity",
                desc: "100% BIS Hallmarked gold and certified diamonds for absolute trust.",
              },
              {
                icon: <Sparkles size={40} />,
                title: "Fine Artistry",
                desc: "Every curve and detail is meticulously handcrafted by award-winning artisans.",
              },
              {
                icon: <ShieldCheck size={40} />,
                title: "Trusted Legacy",
                desc: "A family-run institution serving our community with integrity since 1985.",
              },
              {
                icon: <Users size={40} />,
                title: "Bespoke Care",
                desc: "From custom orders to restoration, we put your happiness at the center.",
              },
            ].map((item, i) => (
              <React.Fragment key={i}>
                <ZoomReveal delay={i * 0.1}>
                  <div className="p-7 lg:p-8 space-y-5 group bg-white border border-[#480607]/15 hover:border-[#480607]/35 rounded-[24px] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_24px_48px_-20px_rgba(72,6,7,0.45)]">
                    <div className="text-[#FFD700] mx-auto w-fit group-hover:scale-125 group-hover:text-[#480607] transition-all duration-500">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold uppercase tracking-widest text-[#480607]">
                      {item.title}
                    </h4>
                    <p className="text-sm font-light leading-relaxed text-stone-500">
                      {item.desc}
                    </p>
                  </div>
                </ZoomReveal>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CRAFTSMANSHIP PROCESS SECTION */}
      <section className="py-16 lg:py-20 bg-[#fff6ef] text-[#480607] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-5 pointer-events-none"></div>
        <div className="relative z-10 px-4 mx-auto max-w-7xl lg:px-8">
          <ZoomReveal>
            <div className="flex flex-col items-center mb-12 lg:mb-14">
              <span className="text-[#480607] font-bold uppercase tracking-[0.5em] text-xs block mb-3">
                Behind The Masterpiece
              </span>
              <h2 className="mt-3 font-serif text-4xl font-bold lg:text-6xl drop-shadow-sm black-gold-animated">
                The Art of Creation
              </h2>
            </div>
          </ZoomReveal>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-[#480607]/20 z-0"></div>

            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <ZoomReveal delay={i * 0.15}>
                  <div className="relative z-10 flex flex-col items-center text-center group">
                    <div className="w-20 h-20 bg-[#FFD700] text-maroon rounded-full flex items-center justify-center border-4 border-[#480607]/15 shadow-2xl mb-6 group-hover:bg-[#480607] group-hover:text-[#fff6ef] transition-all duration-700 cursor-default">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-2 uppercase tracking-wider text-[#FFD700]">
                      {step.title}
                    </h3>
                    <p className="text-[#480607]/85 text-[11px] font-bold uppercase tracking-widest">
                      {step.desc}
                    </p>
                  </div>
                </ZoomReveal>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA - LEGACY CALL */}
      <section className="py-24 bg-[#480607] relative overflow-hidden">
        {/* Background Texture Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/silk.png')]"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <ZoomReveal>
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-wider">
              Begin Your <span className="signature-animated italic inline-block py-4">Legacy</span> With Us
            </h2>
            <p className="text-stone-300 text-lg lg:text-xl mb-12 font-light leading-relaxed max-w-2xl mx-auto">
              Step into a world of curated brilliance. Whether it's for a wedding or daily luxury, 
              we have the perfect piece waiting for you.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <a 
                href="/category/Gold"
                className="inline-block px-12 py-5 bg-[#FFD700] text-[#480607] font-bold tracking-[0.3em] uppercase rounded-full shadow-[0_15px_30px_rgba(255,215,0,0.3)] hover:shadow-[0_20px_40px_rgba(255,215,0,0.4)] transition-all duration-500"
              >
                EXPLORE COLLECTIONS
              </a>
            </motion.div>
          </ZoomReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
