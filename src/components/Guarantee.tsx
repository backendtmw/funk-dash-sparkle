import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import mascotImg from "@/assets/mascot.png";

const Guarantee = () => (
  <section className="py-20 bg-funky-wave relative overflow-hidden">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, x: -60, rotate: -5 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.4 }}
          className="flex-1 flex items-center gap-6"
        >
          <motion.img
            src={mascotImg}
            alt="Guarantee mascot"
            className="w-24 h-24 md:w-32 md:h-32"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <div>
            <h2 className="text-3xl md:text-4xl font-display">
              <span className="text-accent">100% Satisfaction</span> Guarantee!
            </h2>
            <ul className="mt-3 space-y-2 font-body">
              {["On-Time", "Careful Handling", "No Stress"].map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  <CheckCircle className="w-5 h-5 text-funky-green" /> {item}
                </motion.li>
              ))}
            </ul>
            <motion.button
              className="btn-funky mt-4 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Now! <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* CTA Box */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="flex-1 max-w-md w-full"
        >
          <div className="card-funky p-8 text-center">
            <h3 className="font-display text-3xl mb-2">Ready to Move?</h3>
            <p className="text-muted-foreground font-body mb-4">Call Us Now!</p>
            <motion.a
              href="tel:08001234567"
              className="flex items-center justify-center gap-2 text-funky-green font-display text-3xl mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-7 h-7" /> 0800 123 4567
            </motion.a>
            <p className="text-muted-foreground font-body text-sm mb-4">Or Get Your Free Quote Online!</p>
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
