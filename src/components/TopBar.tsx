import { motion } from "framer-motion";
import { Phone, Sparkles } from "lucide-react";

const TopBar = () => (
  <motion.div
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="bg-funky-gradient py-2.5 px-6 flex items-center justify-between"
  >
    <div className="flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-funky-yellow" />
      <span className="text-primary-foreground/80 font-body text-sm hidden sm:inline">Trusted by 10,000+ Happy Movers!</span>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-primary-foreground font-body text-sm hidden md:inline">Call Us Today!</span>
      <a href="tel:08001234567" className="flex items-center gap-2 text-primary-foreground font-display text-lg hover:text-funky-yellow transition-colors">
        <Phone className="w-4 h-4 text-funky-yellow" /> 0800 123 4567
      </a>
      <motion.button
        className="btn-funky !text-sm !px-5 !py-1.5"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Instant Quote
      </motion.button>
    </div>
  </motion.div>
);

export default TopBar;
