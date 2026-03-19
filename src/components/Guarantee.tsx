import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import guaranteeGroup from "@/assets/guarantee-group.png";

const Guarantee = () => (
  <section className="py-16 bg-funky-wave bg-dotted relative overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8 items-center">
        {/* Guarantee section */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="flex-1"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.img
              src={guaranteeGroup}
              alt="Happy customers"
              className="w-40 h-40 md:w-52 md:h-52 object-contain"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div>
              <div className="ribbon-heading inline-block mb-4">
                <h2 className="text-2xl md:text-3xl font-display text-foreground">
                  100% Satisfaction Guarantee!
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {["On-Time", "Careful Handling", "No Stress"].map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-2 font-body"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                  >
                    <CheckCircle className="w-5 h-5 text-funky-green flex-shrink-0" /> {item}
                  </motion.div>
                ))}
              </div>
              <motion.button
                className="btn-funky mt-5 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book Now! <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="w-full max-w-sm"
        >
          <div className="card-poster p-8 text-center">
            <h3 className="font-display text-3xl mb-2">Ready to Move?</h3>
            <p className="text-muted-foreground font-body mb-3">Call Us Now!</p>
            <motion.a
              href="tel:08001234567"
              className="flex items-center justify-center gap-2 text-funky-green font-display text-3xl mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-7 h-7" /> 0800 123 4567
            </motion.a>
            <p className="text-muted-foreground font-body text-sm mb-4 italic">Or Get Your Free Quote Online!</p>
            <motion.button
              className="btn-funky w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Guarantee;
