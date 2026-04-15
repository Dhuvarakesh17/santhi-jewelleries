import React from "react";
import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  Sparkles,
  Users,
  Target,
  Eye,
  ChevronRight,
  Brush,
  Hammer,
  Microscope,
  PackageCheck,
} from "lucide-react";
import { Link } from "react-router-dom";

const ZoomReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 30 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom bounce-out ease
      delay,
    }}
  >
    {children}
  </motion.div>
);

const About = () => {
  const steps = [
    {
      icon: <Brush size={32} />,
      title: "The Vision",
      desc: "Design & Sketching",
    },
    {
      icon: <Hammer size={32} />,
      title: "Mastering",
      desc: "Handcrafting & Smelting",
    },
    {
      icon: <Microscope size={32} />,
      title: "Precision",
      desc: "Quality & Purity Check",
    },
    {
      icon: <PackageCheck size={32} />,
      title: "Heritage",
      desc: "The Final Masterpiece",
    },
  ];

  return (
    <div className="overflow-hidden font-sans bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[560px] lg:h-[620px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/about_bg_indriya.webp"
            alt="About Santhi Jewellers"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 w-full px-4 mx-auto text-white text-center max-w-7xl lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 1.1, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <span className="text-[#D4AF37] font-script text-5xl lg:text-7xl lowercase mb-4 block drop-shadow-md">
              our legacy
            </span>
            <h1 className="mb-8 font-heading text-5xl lg:text-9xl font-black uppercase tracking-[0.1em] leading-none drop-shadow-2xl">
              About Us
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. BRAND STORY SECTION - TINTED BACKGROUND */}
      <section className="py-16 lg:py-20 bg-[#faf7f2]">
        <div className="px-4 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-14">
            <div className="space-y-8 lg:w-1/2">
              <ZoomReveal>
                <span className="text-maroon font-bold tracking-[0.3em] uppercase text-xs">
                  Generation of Trust
                </span>
                <h2 className="text-4xl lg:text-7xl font-aurora font-light leading-none mt-2 black-gold-animated tracking-tight uppercase">
                  A Journey of Purity, <br className="hidden lg:block"/> Passion & Perfection
                </h2>
              </ZoomReveal>
            </div>
            <div className="relative lg:w-1/2">
              <ZoomReveal delay={0.3}>
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative z-10"
                >
                  <div className="absolute -inset-4 border-2 border-maroon/5 rounded-[32px] z-0"></div>
                  <img
                    src="/images/showcase/gold_5.webp"
                    alt="Our Heritage"
                    className="w-full h-[360px] lg:h-[520px] object-cover rounded-[24px] shadow-[0_32px_64px_-16px_rgba(91,14,35,0.2)] relative z-10"
                  />
                </motion.div>
              </ZoomReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION, VISION & VALUES SECTION */}
      <section className="pt-16 pb-10 lg:pt-20 lg:pb-12 bg-[#fff6ef] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-5 pointer-events-none"></div>
        <div className="relative z-10 grid grid-cols-1 gap-8 px-4 mx-auto max-w-7xl lg:px-8 md:grid-cols-2 lg:grid-cols-3">
          <ZoomReveal>
            <motion.div
              whileHover={{ y: -15, scale: 1.02 }}
              className="bg-white p-8 lg:p-10 rounded-[32px] border border-[#5B0E23]/10 group transition-all duration-700 hover:border-[#5B0E23]/30 h-full flex flex-col">
              <h3 className="mb-5 font-serif text-3xl font-bold tracking-wider uppercase black-gold-animated">
                Our Mission
              </h3>
              <p className="text-base font-light leading-relaxed lg:text-lg text-stone-600">
                To bridge the gap between ancient artistry and modern design,
                ensuring every customer walks away with a piece that is as
                authentic as it is timeless. We strive for transparency in every
                transaction.
              </p>
            </motion.div>
          </ZoomReveal>

          <ZoomReveal delay={0.2}>
            <motion.div
              whileHover={{ y: -15, scale: 1.02 }}
              className="bg-white p-8 lg:p-10 rounded-[32px] border border-[#5B0E23]/10 group transition-all duration-700 hover:border-[#5B0E23]/30 h-full flex flex-col">
              <h3 className="mb-5 font-serif text-3xl font-bold tracking-wider uppercase black-gold-animated">
                Our Vision
              </h3>
              <p className="text-base font-light leading-relaxed lg:text-lg text-stone-600">
                To be the global benchmark for luxury handcrafted jewelry,
                recognized for our unwavering dedication to ethical sourcing,
                artisan empowerment, and the preservation of heritage Indian
                craftsmanship.
              </p>
            </motion.div>
          </ZoomReveal>

          <ZoomReveal delay={0.3}>
            <motion.div
              whileHover={{ y: -15, scale: 1.02 }}
              className="bg-white p-8 lg:p-10 rounded-[32px] border border-[#5B0E23]/10 group transition-all duration-700 hover:border-[#5B0E23]/30 h-full flex flex-col">
              <h3 className="mb-5 font-serif text-3xl font-bold tracking-wider uppercase black-gold-animated">
                Our Values
              </h3>
              <p className="text-base font-light leading-relaxed lg:text-lg text-stone-600">
                Integrity in every transaction, purity in every ornament, and
                care in every customer relationship. We stand for trust,
                craftsmanship, transparency, and timeless design.
              </p>
            </motion.div>
          </ZoomReveal>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="pt-10 pb-16 lg:pt-12 lg:pb-20 bg-white">
        <div className="px-4 mx-auto text-center max-w-7xl lg:px-8">
          <ZoomReveal>
            <div className="flex flex-col items-center">
              <span className="text-maroon font-bold tracking-[0.4em] uppercase text-xs block mb-3">
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
              <ZoomReveal key={i} delay={i * 0.1}>
                <div className="p-7 lg:p-8 space-y-5 group bg-white border border-[#5B0E23]/15 hover:border-[#5B0E23]/35 rounded-[24px] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_24px_48px_-20px_rgba(91,14,35,0.45)]">
                  <div className="text-[#D4AF37] mx-auto w-fit group-hover:scale-125 group-hover:text-[#5B0E23] transition-all duration-500">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-[#5B0E23]">
                    {item.title}
                  </h4>
                  <p className="text-sm font-light leading-relaxed text-stone-500">
                    {item.desc}
                  </p>
                </div>
              </ZoomReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CRAFTSMANSHIP PROCESS SECTION */}
      <section className="py-16 lg:py-20 bg-[#fff6ef] text-[#5B0E23] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')] opacity-5 pointer-events-none"></div>
        <div className="relative z-10 px-4 mx-auto max-w-7xl lg:px-8">
          <ZoomReveal>
            <div className="flex flex-col items-center mb-12 lg:mb-14">
              <span className="text-maroon font-bold uppercase tracking-[0.5em] text-xs block mb-3">
                Behind The Masterpiece
              </span>
              <h2 className="mt-3 font-serif text-4xl font-bold lg:text-6xl drop-shadow-sm black-gold-animated">
                The Art of Creation
              </h2>
            </div>
          </ZoomReveal>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-[#5B0E23]/20 z-0"></div>

            {steps.map((step, i) => (
              <ZoomReveal key={i} delay={i * 0.15}>
                <div className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-20 h-20 bg-[#D4AF37] text-maroon rounded-full flex items-center justify-center border-4 border-[#5B0E23]/15 shadow-2xl mb-6 group-hover:bg-[#5B0E23] group-hover:text-[#fff6ef] transition-all duration-700 cursor-default">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-2 uppercase tracking-wider text-[#D4AF37]">
                    {step.title}
                  </h3>
                  <p className="text-[#5B0E23]/85 text-[11px] font-bold uppercase tracking-widest">
                    {step.desc}
                  </p>
                </div>
              </ZoomReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="relative py-20 overflow-hidden bg-white lg:py-24">
        <div className="relative z-10 max-w-4xl px-4 mx-auto space-y-8 text-center lg:space-y-10">
          <ZoomReveal>
            <h2 className="text-4xl lg:text-6xl font-serif font-bold leading-tight drop-shadow-sm black-gold-animated">
              Begin Your Legacy With Us
            </h2>
          </ZoomReveal>
          <ZoomReveal delay={0.3}>
            <Link
              to="/category/Gold"
              className="relative inline-flex items-center gap-6 bg-maroon text-white px-14 py-7 rounded-full font-bold tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(91,14,35,0.4)] hover:bg-[#3D0916] transition-all group overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full transition-transform duration-500 -translate-x-full bg-white/10 group-hover:translate-x-0"></div>
              <span className="relative z-10 uppercase text-[#D4AF37]">
                EXPLORE COLLECTIONS
              </span>
              <ChevronRight
                size={24}
                className="relative z-10 text-[#D4AF37] group-hover:translate-x-2 transition-transform duration-500"
              />
            </Link>
          </ZoomReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
