import { motion } from "framer-motion";
import { Truck, ShieldCheck, DollarSign, Star } from "lucide-react";
import featureReliable from "@/assets/feature-reliable.png";

const features = [
  { icon: Truck, title: "Fast & Reliable", desc: "Nationwide coverage with on-time delivery", color: "var(--funky-blue)" },
  { icon: ShieldCheck, title: "Fully Insured", desc: "Complete protection for your belongings", color: "var(--funky-green)" },
  { icon: DollarSign, title: "Affordable Rates", desc: "Transparent pricing, no hidden fees", color: "var(--funky-orange)" },
  { icon: Star, title: "5-Star Reviews", desc: "Trusted by 10,000+ customers", color: "var(--funky-yellow)", stars: true },
];

const WhyChooseUs = () => (
  <section className="py-14 md:py-20 bg-background bg-dotted relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-5xl">
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <div className="ribbon-heading inline-block">
          <h2 className="text-3xl md:text-4xl font-display text-foreground">
            Why Choose <span className="text-accent">Us?</span>
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="card-poster p-6 text-center cursor-default"
          >
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
              style={{ background: `hsl(${f.color} / 0.12)` }}
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {i === 0 ? (
                <img src={featureReliable} alt="Reliable" className="w-14 h-14 object-contain" />
              ) : (
                <f.icon className="w-8 h-8" style={{ color: `hsl(${f.color})` }} />
              )}
            </motion.div>
            <h3 className="font-display text-xl mb-1.5">{f.title}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">{f.desc}</p>
            {f.stars && (
              <div className="flex justify-center mt-3 gap-1">
                {[...Array(5)].map((_, j) => (
                  <motion.span
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + j * 0.08 }}
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
