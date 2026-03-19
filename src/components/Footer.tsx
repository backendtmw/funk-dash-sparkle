import { motion } from "framer-motion";
import { Star } from "lucide-react";

const Footer = () => (
  <footer className="bg-funky-gradient py-6">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 text-primary-foreground font-body text-sm"
        >
          <span>Follow Us:</span>
          {["Facebook", "Instagram", "Twitter", "YouTube"].map((s) => (
            <a key={s} href="#" className="hover:text-funky-yellow transition-colors underline">{s}</a>
          ))}
        </motion.div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 text-primary-foreground text-sm font-body">
            <span className="bg-primary-foreground/20 px-2 py-1 rounded text-xs font-display">Google Reviews</span>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-funky-yellow text-funky-yellow" />
            ))}
          </div>
          <div className="flex items-center gap-1 text-primary-foreground text-sm font-body">
            <span className="bg-funky-green/30 px-2 py-1 rounded text-xs font-display">Trustpilot</span>
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-funky-green text-funky-green" />
            ))}
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-primary-foreground/60 text-xs mt-4 font-body"
      >
        © 2026 I Hate Moving. All rights reserved.
      </motion.p>
    </div>
  </footer>
);

export default Footer;
