import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import guaranteeGroup from "@/assets/guarantee-group.png";

const guaranteePoints = ["Full House Moving Only", "Insured Movers", "£25+ Discount Applied", "No Hidden Costs"];

const Guarantee = () => (
  <section className="py-14 md:py-20 bg-funky-wave bg-dotted relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          <div className="flex flex-col sm:flex-row items-center gap-8">
            <motion.img
              src={guaranteeGroup}
              alt="Happy customers"
              className="w-36 h-36 md:w-48 md:h-48 object-contain flex-shrink-0"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div>
              <div className="ribbon-heading inline-block mb-5">
                <h2 className="text-2xl md:text-3xl font-display text-foreground">
                  Move With Confidence
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-4">
                {guaranteePoints.map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-2.5 font-body text-sm"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <CheckCircle className="w-5 h-5 text-funky-green flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.a
                href="#quote-form"
                className="btn-funky mt-6 inline-flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                Get Your Discounted Quote <ArrowRight className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Guarantee;
