import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import guaranteeGroup from "@/assets/guarantee-group.png";

const guaranteePoints = ["On-Time Delivery", "Careful Handling", "No Hidden Costs", "No Stress"];

const Guarantee = () => (
  <section className="py-14 md:py-20 bg-funky-wave bg-dotted relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-10 items-center">
        {/* Left: Guarantee */}
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
              className="w-44 h-44 md:w-56 md:h-56 object-contain flex-shrink-0"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div>
              <div className="ribbon-heading inline-block mb-5">
                <h2 className="text-2xl md:text-3xl font-display text-foreground">
                  100% Satisfaction Guarantee!
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
              <motion.button
                className="btn-funky mt-6 flex items-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                Book Now! <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Right: CTA */}
        <motion.div
          initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:max-w-sm flex-shrink-0"
        >
          <div className="card-poster p-8 text-center">
            <h3 className="font-display text-3xl mb-2">Ready to Move?</h3>
            <p className="text-muted-foreground font-body mb-4">Call Us Now!</p>
            <motion.a
              href="tel:08001234567"
              className="flex items-center justify-center gap-2 text-funky-green font-display text-3xl mb-5"
              whileHover={{ scale: 1.04 }}
            >
              <Phone className="w-7 h-7" /> 0800 123 4567
            </motion.a>
            <p className="text-muted-foreground font-body text-sm mb-5 italic">Or Get Your Free Quote Online!</p>
            <motion.button
              className="btn-funky w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
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
