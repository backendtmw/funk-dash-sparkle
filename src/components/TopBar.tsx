import { motion } from "framer-motion";
import { Phone } from "lucide-react";

const TopBar = () => (
  <motion.div
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="bg-funky-gradient py-2 px-4 flex items-center justify-end gap-4"
  >
    <span className="text-primary-foreground font-body text-sm">Call Us Today!</span>
    <a href="tel:08001234567" className="flex items-center gap-2 text-funky-yellow font-display text-lg">
      <Phone className="w-4 h-4" /> 0800 123 4567
    </a>
    <button className="btn-funky text-sm !px-4 !py-1.5">Get Instant Quote</button>
  </motion.div>
);

export default TopBar;
