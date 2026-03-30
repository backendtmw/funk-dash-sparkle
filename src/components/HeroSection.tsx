import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";
import { CheckCircle, ArrowRight } from "lucide-react";

const benefits = [
  "Real human support (no bots)",
  "Same-day quote setup",
  "Full month of availability with prices shown",
  "£25+ exclusive discount with our nationwide partner Anyvan",
  "Fully insured house move",
  "No obligation, no hidden fees",
];

const Sparkle = ({ delay, className }: { delay: number; className: string }) => (
  <motion.span
    className={`absolute text-funky-yellow text-2xl pointer-events-none select-none ${className}`}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5], rotate: [0, 180, 360] }}
    transition={{ duration: 2, repeat: Infinity, delay }}
  >
    ✦
  </motion.span>
);

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="relative w-full min-h-[480px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px]">
      <img src={heroBg} alt="Moving day scene" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />

      <Sparkle delay={0} className="top-10 right-[18%]" />
      <Sparkle delay={0.5} className="top-20 right-[32%]" />
      <Sparkle delay={1} className="top-8 right-[48%]" />
      <Sparkle delay={1.5} className="bottom-16 right-[12%]" />

      <div className="relative flex items-center min-h-[480px] sm:min-h-[520px] md:min-h-[560px] lg:min-h-[600px]">
        <div className="container mx-auto px-6 md:px-10 py-10">
          <motion.div
            initial={{ x: -60, opacity: 0, filter: "blur(8px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display leading-[0.95] mb-4"
              style={{
                color: "hsl(var(--primary-foreground))",
                textShadow: "3px 3px 0 hsl(var(--funky-dark-blue)), -1px -1px 0 hsl(var(--funky-dark-blue))",
              }}
            >
              Personalized Home Move Support —{" "}
              <span className="text-funky-yellow" style={{ textShadow: "3px 3px 0 hsl(var(--funky-orange)), 6px 6px 0 hsl(var(--funky-dark-blue))" }}>
                Plus an Exclusive
              </span>{" "}
              <span className="text-funky-orange" style={{ textShadow: "3px 3px 0 hsl(var(--funky-dark-blue))" }}>
                Partner Discount
              </span>
            </motion.h1>

            <motion.p
              initial={{ x: -60, opacity: 0, filter: "blur(6px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-primary-foreground/90 font-body leading-relaxed mb-6"
              style={{ textShadow: "1px 1px 3px hsl(var(--funky-dark-blue))" }}
            >
              Get your home move arranged by a real person — with a{" "}
              <span className="text-funky-yellow font-bold">£25+ exclusive discount with our nationwide partner Anyvan</span>, full availability options, and zero stress.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-8"
            >
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-2.5"
                >
                  <CheckCircle className="w-4 h-4 text-funky-green flex-shrink-0" />
                  <span className="text-primary-foreground/90 font-body text-sm" style={{ textShadow: "1px 1px 2px hsl(var(--funky-dark-blue))" }}>
                    {b}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            <motion.a
              href="#quote-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="btn-funky inline-flex items-center gap-2 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              👉 Get Your Discounted Quote <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>

    <div className="h-3" style={{ background: "linear-gradient(90deg, hsl(var(--funky-yellow)), hsl(var(--funky-orange)), hsl(var(--funky-yellow)))" }} />
  </section>
);

export default HeroSection;
