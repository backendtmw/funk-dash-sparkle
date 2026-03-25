import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const TopBar = () => (
  <motion.div
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="bg-funky-gradient py-2.5 px-6 flex items-center justify-between"
  >
    <div className="flex items-center gap-2">
      <Sparkles className="w-4 h-4 text-funky-yellow" />
      <span className="text-primary-foreground font-body text-sm">
        Moving is a headache! We make it cheaper and easier.
      </span>
    </div>
    <motion.a
      href="#quote-form"
      className="btn-funky !text-sm !px-5 !py-1.5"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Get Instant Quote
    </motion.a>
  </motion.div>
);

export default TopBar;
