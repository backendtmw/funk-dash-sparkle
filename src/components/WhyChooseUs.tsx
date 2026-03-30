import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const reasons = [
  "We connect you with a trusted UK-wide moving partner",
  "£25+ exclusive discount with our partner Anyvan.",
  "We send a full month of availability so you can choose the cheapest date",
  "A real person handles everything for you",
];

const WhyChooseUs = () => (
  <section className="py-14 md:py-20 bg-background bg-dotted relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-8"
      >
        <div className="ribbon-heading inline-block">
          <h2 className="text-3xl md:text-4xl font-display text-foreground">
            Why Use <span className="text-accent">Us?</span>
          </h2>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center text-muted-foreground font-body text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto"
      >
        Moving house is stressful — comparing prices, checking availability, and managing timing.
        We make it simple:
      </motion.p>

      <div className="space-y-3 mb-10">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-3 card-poster p-4"
          >
            <CheckCircle className="w-5 h-5 text-funky-green flex-shrink-0 mt-0.5" />
            <span className="font-body text-sm md:text-base text-card-foreground">{r}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
