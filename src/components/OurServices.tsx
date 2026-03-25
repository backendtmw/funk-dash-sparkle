import { motion } from "framer-motion";
import { Home, ShieldCheck, Truck, CheckCircle } from "lucide-react";

const features = [
  { icon: Home, title: "Full House Moving", desc: "Complete door-to-door home removals across the UK", color: "var(--funky-blue)" },
  { icon: ShieldCheck, title: "Fully Insured", desc: "Goods in Transit insurance included on eligible bookings", color: "var(--funky-green)" },
  { icon: Truck, title: "Professional Movers", desc: "Trusted, vetted moving professionals via AnyVan", color: "var(--funky-orange)" },
  { icon: CheckCircle, title: "£25+ Discount", desc: "Exclusive discount applied automatically to your quote", color: "var(--funky-yellow)" },
];

const OurServices = () => (
  <section className="py-14 md:py-20 bg-background bg-dotted relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-4"
      >
        <div className="ribbon-heading inline-block">
          <h2 className="text-3xl md:text-4xl font-display text-foreground">
            What We <span className="text-accent">Offer</span>
          </h2>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center text-muted-foreground font-body text-sm md:text-base mb-10 max-w-lg mx-auto"
      >
        We specialise in one thing only — <span className="font-semibold text-foreground">full house moves</span>. No storage, no part-loads, just a complete home moving service.
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="card-poster p-5 text-center cursor-default"
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
              style={{ background: `hsl(${f.color} / 0.12)` }}
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <f.icon className="w-8 h-8" style={{ color: `hsl(${f.color})` }} />
            </motion.div>
            <h3 className="font-display text-lg mb-1">{f.title}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default OurServices;
