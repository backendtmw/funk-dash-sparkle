import { motion } from "framer-motion";

const Footer = () => (
  <footer className="bg-funky-gradient relative overflow-hidden">
    <div className="h-1" style={{ background: "linear-gradient(90deg, hsl(var(--funky-yellow)), hsl(var(--funky-orange)), hsl(var(--funky-yellow)))" }} />

    <div className="py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-primary-foreground font-display text-lg md:text-xl mb-4"
        >
          Moving is a headache! We make it cheaper and easier.
        </motion.p>
        <p className="text-center text-primary-foreground/40 text-xs font-body">
          © 2026 ihatemoving.co.uk. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
