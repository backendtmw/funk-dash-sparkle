import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";

const Sparkle = ({ delay, className }: { delay: number; className: string }) => (
  <motion.span
    className={`absolute text-funky-yellow text-2xl pointer-events-none ${className}`}
    animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5], rotate: [0, 180, 360] }}
    transition={{ duration: 2, repeat: Infinity, delay }}
  >
    ✦
  </motion.span>
);

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px]">
      <img src={heroBg} alt="Moving day scene" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
      
      {/* Sparkle decorations */}
      <Sparkle delay={0} className="top-8 right-[20%]" />
      <Sparkle delay={0.5} className="top-16 right-[30%]" />
      <Sparkle delay={1} className="top-6 right-[45%]" />
      <Sparkle delay={1.5} className="bottom-20 right-[15%]" />
      <Sparkle delay={0.8} className="top-20 left-[5%]" />

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
          >
            {/* Logo-style title with outline effect */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-display leading-none"
              style={{
                color: "hsl(var(--primary-foreground))",
                textShadow: "3px 3px 0 hsl(var(--funky-dark-blue)), -1px -1px 0 hsl(var(--funky-dark-blue))",
              }}
              animate={{ rotate: [-1, 1, -1] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              I Hate{" "}
              <span
                className="text-funky-yellow block md:inline"
                style={{ textShadow: "3px 3px 0 hsl(var(--funky-orange)), 6px 6px 0 hsl(var(--funky-dark-blue))" }}
              >
                Moving
              </span>
              <span className="text-2xl md:text-3xl text-funky-yellow">.co.uk</span>
            </motion.h1>

            <motion.p
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-primary-foreground mt-3 font-body italic"
              style={{ textShadow: "1px 1px 3px hsl(var(--funky-dark-blue))" }}
            >
              We Make Moving{" "}
              <motion.span
                className="text-funky-yellow font-bold not-italic"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Easy
              </motion.span>
              {" & "}
              <motion.span
                className="text-funky-orange font-bold not-italic"
                animate={{ scale: [1, 1.15, 1] }}
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
