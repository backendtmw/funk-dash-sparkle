import { motion } from "framer-motion";
import { Star } from "lucide-react";

const socials = [
  { name: "Facebook", icon: "📘" },
  { name: "Instagram", icon: "📸" },
  { name: "Twitter", icon: "🐦" },
  { name: "YouTube", icon: "🎬" },
];

const Footer = () => (
  <footer className="bg-funky-gradient py-6 relative overflow-hidden">
    {/* Subtle sparkles */}
    <motion.span
      className="absolute top-2 left-[10%] text-funky-yellow opacity-20"
      animate={{ opacity: [0.1, 0.3, 0.1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      ✦
    </motion.span>

    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-primary-foreground font-body text-sm">
          <span className="font-display">Follow Us:</span>
          {socials.map((s) => (
            <motion.a
              key={s.name}
              href="#"
              className="flex items-center gap-1 hover:text-funky-yellow transition-colors"
              whileHover={{ scale: 1.15, rotate: 5 }}
            >
              <span>{s.icon}</span>
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-primary-foreground text-sm font-body">
            <span className="bg-primary-foreground/20 px-2 py-1 rounded-lg text-xs font-display">Google Reviews</span>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-funky-yellow text-funky-yellow" />
            ))}
          </div>
          <div className="flex items-center gap-1 text-primary-foreground text-sm font-body">
            <span className="bg-funky-green/30 px-2 py-1 rounded-lg text-xs font-display">Trustpilot</span>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-funky-green text-funky-green" />
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-primary-foreground/50 text-xs mt-4 font-body">
        © 2026 I Hate Moving. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
