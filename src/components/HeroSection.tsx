import { motion } from "framer-motion";
import heroImg from "@/assets/hero-moving.png";
import mascotImg from "@/assets/mascot.png";

const HeroSection = () => (
  <section className="relative overflow-hidden bg-funky-gradient wave-divider">
    {/* Floating decorative blobs */}
    <motion.div
      className="absolute top-10 left-10 w-32 h-32 rounded-full opacity-20"
      style={{ background: "hsl(var(--funky-yellow))" }}
      animate={{ y: [0, -20, 0], x: [0, 10, 0], scale: [1, 1.1, 1] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.div
      className="absolute bottom-20 right-20 w-24 h-24 rounded-full opacity-15"
      style={{ background: "hsl(var(--funky-pink))" }}
      animate={{ y: [0, 15, 0], rotate: [0, 180, 360] }}
      transition={{ duration: 6, repeat: Infinity }}
    />

    <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Left: Text + Mascot */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ x: -100, opacity: 0, rotate: -10 }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="flex items-center gap-4 justify-center md:justify-start mb-4"
          >
            <motion.img
              src={mascotImg}
              alt="Moving mascot"
              className="w-20 h-20 md:w-28 md:h-28"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-7xl font-display text-primary-foreground leading-tight"
          >
            I Hate{" "}
            <span className="text-funky-yellow" style={{ textShadow: "3px 3px 0 hsl(var(--funky-orange))" }}>
              Moving
            </span>
            <span className="text-2xl md:text-3xl text-funky-yellow">.co.uk</span>
          </motion.h1>

          <motion.p
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-primary-foreground mt-3 font-body"
          >
            We Make Moving{" "}
            <motion.span
              className="text-funky-yellow font-bold italic"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Easy
            </motion.span>
            {" & "}
            <motion.span
              className="text-funky-orange font-bold italic"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              Stress-Free!
            </motion.span>
          </motion.p>
        </div>

        {/* Right: Hero Image */}
        <motion.div
          className="flex-1"
          initial={{ x: 100, opacity: 0, rotate: 5 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
        >
          <motion.img
            src={heroImg}
            alt="Moving day scene"
            className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl"
            whileHover={{ scale: 1.03, rotate: -1 }}
            transition={{ type: "spring" }}
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default HeroSection;
