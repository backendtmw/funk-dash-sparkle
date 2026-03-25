import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";
import { CheckCircle } from "lucide-react";

const benefits = [
  "Real person helps set up your home move request",
  "Full month of availability options",
  "At least £25 extra discount applied",
  "Insurance included on eligible bookings",
  "Simple, fast, no obligation",
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
    <div className="relative w-full min-h-[420px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[560px]">
      <img src={heroBg} alt="Moving day scene" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/75 to-primary/40" />

      <Sparkle delay={0} className="top-10 right-[18%]" />
      <Sparkle delay={0.5} className="top-20 right-[32%]" />
      <Sparkle delay={1} className="top-8 right-[48%]" />
      <Sparkle delay={1.5} className="bottom-16 right-[12%]" />

      <div className="relative flex items-center min-h-[420px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[560px]">
        <div className="container mx-auto px-6 md:px-10 py-10">
          <motion.div
            initial={{ x: -60, opacity: 0, filter: "blur(8px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[0.95] mb-4"
              style={{
                color: "hsl(var(--primary-foreground))",
                textShadow: "3px 3px 0 hsl(var(--funky-dark-blue)), -1px -1px 0 hsl(var(--funky-dark-blue))",
              }}
            >
              Get Your Home Move Sorted with a{" "}
              <span className="text-funky-yellow" style={{ textShadow: "3px 3px 0 hsl(var(--funky-orange)), 6px 6px 0 hsl(var(--funky-dark-blue))" }}>
                Real Person
              </span>
              {" + "}
              <span className="text-funky-orange" style={{ textShadow: "3px 3px 0 hsl(var(--funky-dark-blue))" }}>
                Exclusive Discount
              </span>
            </motion.h1>

            <motion.p
              initial={{ x: -60, opacity: 0, filter: "blur(6px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg md:text-xl text-primary-foreground/90 font-body leading-relaxed mb-6"
              style={{ textShadow: "1px 1px 3px hsl(var(--funky-dark-blue))" }}
            >
              We help you secure a home moving quote directly from AnyVan with at least{" "}
              <span className="text-funky-yellow font-bold">£25 extra discount</span>. You'll also see a full month of
              availability options, so you can choose the cheapest and most convenient moving date.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-2"
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
          </motion.div>
        </div>
      </div>
    </div>

    <div className="h-3" style={{ background: "linear-gradient(90deg, hsl(var(--funky-yellow)), hsl(var(--funky-orange)), hsl(var(--funky-yellow)))" }} />
  </section>
);

export default HeroSection;
