import { motion } from "framer-motion";
import { Star } from "lucide-react";

const socials = [
  { name: "Facebook", icon: "📘" },
  { name: "Instagram", icon: "📸" },
  { name: "Twitter", icon: "🐦" },
  { name: "YouTube", icon: "🎬" },
];

const Footer = () => (
  <footer className="bg-funky-gradient relative overflow-hidden">
    {/* Top gold border */}
    <div className="h-1" style={{ background: "linear-gradient(90deg, hsl(var(--funky-yellow)), hsl(var(--funky-orange)), hsl(var(--funky-yellow)))" }} />

    <div className="py-6">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-primary-foreground font-body text-sm">
            <span className="font-display text-base">Follow Us:</span>
            {socials.map((s) => (
              <motion.a
                key={s.name}
                href="#"
                className="text-lg hover:text-funky-yellow transition-colors"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={s.name}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-primary-foreground text-sm font-body">
              <span className="bg-primary-foreground/20 px-2.5 py-1 rounded-lg text-xs font-display">Google Reviews</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-funky-yellow text-funky-yellow" />
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-primary-foreground text-sm font-body">
              <span className="bg-funky-green/30 px-2.5 py-1 rounded-lg text-xs font-display">Trustpilot</span>
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-funky-green text-funky-green" />
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-primary-foreground/40 text-xs mt-5 font-body">
          © 2026 I Hate Moving. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
