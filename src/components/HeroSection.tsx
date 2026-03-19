import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    {/* Full-width background image */}
    <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px]">
      <img
        src={heroBg}
        alt="Moving day scene"
        className="w-full h-full object-cover"
      />
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />

      {/* Text overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-display text-primary-foreground leading-none"
              animate={{ rotate: [-1, 1, -1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              I Hate{" "}
              <span className="text-funky-yellow" style={{ textShadow: "3px 3px 0 hsl(var(--funky-orange))" }}>
                Moving
              </span>
              <span className="text-2xl md:text-3xl text-funky-yellow">.co.uk</span>
            </motion.h1>

            <motion.p
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl text-primary-foreground mt-2 font-body"
            >
              We Make Moving{" "}
              <motion.span
                className="text-funky-yellow font-bold italic"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Easy
              </motion.span>
              {" & "}
              <motion.span
                className="text-funky-orange font-bold italic"
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
  </section>
);

export default HeroSection;
