import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";

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
    <div className="relative w-full h-[320px] sm:h-[400px] md:h-[460px] lg:h-[520px]">
      <img src={heroBg} alt="Moving day scene" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/60 to-primary/20" />

      <Sparkle delay={0} className="top-10 right-[18%]" />
      <Sparkle delay={0.5} className="top-20 right-[32%]" />
      <Sparkle delay={1} className="top-8 right-[48%]" />
      <Sparkle delay={1.5} className="bottom-16 right-[12%]" />
      <Sparkle delay={0.8} className="top-24 left-[6%]" />

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial={{ x: -60, opacity: 0, filter: "blur(8px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display leading-[0.95]"
              style={{
                color: "hsl(var(--primary-foreground))",
                textShadow: "3px 3px 0 hsl(var(--funky-dark-blue)), -1px -1px 0 hsl(var(--funky-dark-blue))",
              }}
            >
              I Hate{" "}
              <span
                className="text-funky-yellow block sm:inline"
                style={{ textShadow: "3px 3px 0 hsl(var(--funky-orange)), 6px 6px 0 hsl(var(--funky-dark-blue))" }}
              >
                Moving
              </span>
              <span className="text-2xl md:text-3xl text-funky-yellow align-top ml-1">.co.uk</span>
            </motion.h1>

            <motion.p
              initial={{ x: -60, opacity: 0, filter: "blur(6px)" }}
              animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl md:text-2xl text-primary-foreground mt-4 font-body italic max-w-lg"
              style={{ textShadow: "1px 1px 3px hsl(var(--funky-dark-blue))" }}
            >
              We Make Moving{" "}
              <motion.span
                className="text-funky-yellow font-bold not-italic"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Easy
              </motion.span>
              {" & "}
              <motion.span
                className="text-funky-orange font-bold not-italic"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                Stress-Free!
              </motion.span>
            </motion.p>
          </motion.div>
        </div>
      </div>
    </div>

    {/* Golden wave divider */}
    <div className="h-3" style={{ background: "linear-gradient(90deg, hsl(var(--funky-yellow)), hsl(var(--funky-orange)), hsl(var(--funky-yellow)))" }} />
  </section>
);

export default HeroSection;
