import { motion } from "framer-motion";
import { ShieldCheck, CheckCircle, Package, AlertTriangle, PlusCircle, Smile } from "lucide-react";
import insuranceShield from "@/assets/insurance-shield.png";

const coveredItems = ["Furniture (sofas, beds, wardrobes)", "Boxes & personal belongings", "Appliances & large items"];
const benefits = [
  "Your items are protected while being transported",
  "You're working with insured, professional movers",
  "You're not taking unnecessary risks",
];

const InsuranceProtection = () => (
  <section className="py-14 md:py-20 section-blue relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-5xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-10"
      >
        <div className="ribbon-heading inline-block">
          <h2 className="text-3xl md:text-4xl font-display text-foreground">
            🛡️ Your Items Are <span className="text-accent">Protected</span>
          </h2>
        </div>
      </motion.div>

      {/* Hero block */}
      <motion.div
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row items-center gap-8 mb-10"
      >
        <motion.img
          src={insuranceShield}
          alt="Insurance protection shield"
          className="w-36 h-36 md:w-48 md:h-48 object-contain flex-shrink-0"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        />
        <div className="text-primary-foreground text-center md:text-left">
         <p className="font-body text-sm md:text-base leading-relaxed mb-3">
            We protect your belongings in case of{" "}
            <span className="font-semibold text-funky-green">fire or theft</span>. Every eligible move includes Goods in Transit insurance.
          </p>
          <div className="inline-flex items-center gap-2 bg-funky-yellow/15 border-2 border-funky-yellow/40 rounded-2xl px-5 py-2.5">
            <ShieldCheck className="w-5 h-5 text-funky-yellow" />
            <span className="font-display text-lg sm:text-xl text-funky-yellow">Cover up to £50,000 per move</span>
          </div>
          <p className="font-body text-sm text-primary-foreground/70 mt-3">
            Protection throughout your move.
          </p>
        </div>
      </motion.div>

      {/* Two-column cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="card-poster p-5 sm:p-6"
        >
          <h3 className="font-display text-lg sm:text-xl mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-funky-green" /> What This Means For You
          </h3>
          <ul className="space-y-3">
            {benefits.map((b, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2.5 font-body text-sm text-card-foreground"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
              >
                <CheckCircle className="w-4 h-4 text-funky-green flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="card-poster p-5 sm:p-6"
        >
          <h3 className="font-display text-lg sm:text-xl mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-funky-orange" /> 📦 What's Covered?
          </h3>
          <ul className="space-y-3">
            {coveredItems.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2.5 font-body text-sm text-card-foreground"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
              >
                <Package className="w-4 h-4 text-funky-orange flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Transparency & Extra protection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="card-poster p-5 sm:p-6"
        >
          <h3 className="font-display text-lg sm:text-xl mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-funky-yellow" /> Important to Know
          </h3>
          <ul className="space-y-2 font-body text-sm text-card-foreground">
            <li className="flex items-start gap-2">
              <span className="text-funky-yellow mt-0.5">•</span>
              Cover amounts can vary by mover
            </li>
            <li className="flex items-start gap-2">
              <span className="text-funky-yellow mt-0.5">•</span>
              High-value items may need extra cover
            </li>
            <li className="flex items-start gap-2">
              <span className="text-funky-yellow mt-0.5">•</span>
              Full insurance details included with your quote
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="card-poster p-5 sm:p-6"
        >
          <h3 className="font-display text-lg sm:text-xl mb-3 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-funky-cyan" /> Need More Protection?
          </h3>
          <p className="font-body text-sm text-card-foreground leading-relaxed">
            Moving high-value items? You can increase your cover for extra peace of mind.
          </p>
          <p className="font-body text-sm text-funky-cyan font-semibold mt-2">
            Choose the level of protection that suits your move.
          </p>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex flex-col items-center gap-3 bg-primary-foreground/10 border-2 border-funky-gold/30 rounded-3xl px-6 sm:px-8 py-6">
          <Smile className="w-10 h-10 text-funky-yellow" />
          <h3 className="font-display text-xl sm:text-2xl text-primary-foreground">Move With Confidence</h3>
          <p className="font-body text-sm text-primary-foreground/80 max-w-md">
            Insured movers and built-in protection — your move is in safe hands.
          </p>
          <p className="font-display text-funky-green text-base sm:text-lg">
            No stress. No risk. Just a smoother, safer move.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default InsuranceProtection;
