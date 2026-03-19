import { motion } from "framer-motion";
import { Truck, ShieldCheck, DollarSign, Star } from "lucide-react";
import featureReliable from "@/assets/feature-reliable.png";

const features = [
  { icon: Truck, title: "Fast & Reliable", desc: "Nationwide Service", color: "var(--funky-blue)" },
  { icon: ShieldCheck, title: "Fully Insured", desc: "Safe & Secure", color: "var(--funky-green)" },
  { icon: DollarSign, title: "Affordable Rates", desc: "No Hidden Fees", color: "var(--funky-orange)" },
  { icon: Star, title: "5-Star Reviews", desc: "Trusted by 10,000+ Customers", color: "var(--funky-yellow)", stars: true },
];

const WhyChooseUs = () => (
  <section className="py-12 bg-background bg-dotted relative overflow-hidden">
    <div className="container mx-auto px-4">
      {/* Heading with arrows */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-3">
          <motion.span
            className="text-3xl"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-display">
            Why Choose <span className="text-funky-orange">Us?</span>
          </h2>
          <motion.span
            className="text-3xl"
            animate={{ x: [0, -8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ←
          </motion.span>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -3 : 3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", bounce: 0.4 }}
            whileHover={{ y: -8, rotate: i % 2 === 0 ? 2 : -2, scale: 1.05 }}
            className="card-poster p-5 text-center cursor-default"
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center"
              style={{ background: `hsl(${f.color} / 0.12)` }}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {i === 0 ? (
                <img src={featureReliable} alt="Reliable" className="w-14 h-14 object-contain" />
              ) : (
                <f.icon className="w-8 h-8" style={{ color: `hsl(${f.color})` }} />
              )}
            </motion.div>
            <h3 className="font-display text-lg mb-1">{f.title}</h3>
            <p className="text-muted-foreground font-body text-sm">{f.desc}</p>
            {f.stars && (
              <div className="flex justify-center mt-2 gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + j * 0.1 }}
                    className="star-deco text-lg"
                  >
                    ★
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
