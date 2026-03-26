import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import guaranteeGroup from "@/assets/guarantee-group.png";

const guaranteePoints = ["Full House Moving Only", "Insured Movers", "£25+ Discount Applied", "No Hidden Costs"];

const Guarantee = () => (
  <section className="py-14 md:py-20 bg-funky-wave bg-dotted relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="flex flex-col items-center text-center">
        <motion.img
          src={guaranteeGroup}
          alt="Happy customers"
          className="w-32 h-32 md:w-44 md:h-44 object-contain mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          animate={{ y: [0, -6, 0] }}
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="ribbon-heading inline-block mb-6">
            <h2 className="text-2xl md:text-3xl font-display text-foreground">
              Move With Confidence
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-8">
          {guaranteePoints.map((item, i) => (
            <motion.div
              key={item}
              className="flex items-center gap-2.5 font-body text-sm"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <CheckCircle className="w-5 h-5 text-funky-green flex-shrink-0" />
              <span>{item}</span>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#quote-form"
          className="btn-funky inline-flex items-center gap-2 w-full sm:w-auto justify-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          👉 Get Your Discounted Quote <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </div>
  </section>
);

export default Guarantee;
