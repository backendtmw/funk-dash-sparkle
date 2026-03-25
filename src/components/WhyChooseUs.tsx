import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const reasons = [
  "Connecting you directly to a trusted UK moving platform",
  "Helping you access exclusive home move discounts",
  "Showing a full month of availability options",
  "Removing the need to contact multiple companies",
  "Making the process faster, easier, and clearer",
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
            Why Use <span className="text-accent">ihatemoving.co.uk?</span>
          </h2>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center text-muted-foreground font-body text-base md:text-lg mb-8 leading-relaxed"
      >
        Moving house is stressful — comparing prices, finding availability, and dealing with timing issues.
        We simplify everything by:
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

      {/* Takeaway CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="card-poster p-6 md:p-8 text-center"
      >
        <h3 className="font-display text-xl md:text-2xl text-foreground mb-3">
          Moving is a headache! — we make it simple
        </h3>
        <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed mb-2">
          ☑️ We'll refer you to our trusted partner and can provide you with at least{" "}
          <span className="font-semibold text-funky-green">£25 off</span> your moving quote.
        </p>
        <p className="font-body text-sm text-muted-foreground italic">
          That's enough to cover a takeaway or two for your first night in your new home 😊
        </p>
      </motion.div>
    </div>
  </section>
);

export default WhyChooseUs;
