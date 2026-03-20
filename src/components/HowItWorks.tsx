import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useState } from "react";
import stepQuote from "@/assets/step-quote.png";
import stepPack from "@/assets/step-pack.png";
import stepSettle from "@/assets/step-settle.png";

const steps = [
  { num: "1", title: "Get a Quote", desc: "In 60 Seconds", img: stepQuote },
  { num: "2", title: "We Pack & Move", desc: "Hassle-Free", img: stepPack },
  { num: "3", title: "You Settle In", desc: "Relax & Enjoy!", img: stepSettle },
];

const HowItWorks = () => {
  const [callbackForm, setCallbackForm] = useState({ name: "", phone: "", time: "Morning" });

  return (
    <section className="section-blue py-16 md:py-20 relative overflow-hidden">
      {/* Floating sparkles */}
      {["✦", "★", "✧", "⭐"].map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-funky-yellow text-xl opacity-20 pointer-events-none"
          style={{ top: `${15 + i * 20}%`, left: `${8 + i * 22}%` }}
          animate={{ y: [0, -20, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.4 }}
        >
          {s}
        </motion.span>
      ))}

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Ribbon heading */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="ribbon-heading inline-block">
            <h2 className="text-3xl md:text-4xl font-display text-foreground">
              How It <span className="text-accent">Works?</span>
            </h2>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Steps */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative text-center"
                >
                  {/* Step number */}
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center font-display text-lg z-20 shadow-lg"
                    style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--funky-orange)))", color: "white" }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  >
                    {step.num}
                  </motion.div>

                  {/* Image card */}
                  <motion.div
                    className="rounded-2xl overflow-hidden mb-4 pt-5 px-3 pb-3"
                    style={{
                      background: "hsl(0 0% 100% / 0.08)",
                      border: "2px solid hsl(var(--funky-gold) / 0.3)",
                    }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img src={step.img} alt={step.title} className="w-full h-32 object-contain" />
                  </motion.div>

                  <h3 className="font-display text-primary-foreground text-xl mb-1">{step.title}</h3>
                  <p className="text-primary-foreground/60 font-body text-sm italic">{step.desc}</p>

                  {/* Arrow */}
                  {i < steps.length - 1 && (
                    <motion.div
                      className="hidden sm:block absolute -right-5 top-1/2 -translate-y-1/2 z-10"
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ChevronRight className="w-7 h-7 text-funky-yellow" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Callback Form */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:max-w-sm flex-shrink-0"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ border: "3px solid hsl(var(--funky-gold))" }}>
              <div className="bg-funky-gradient px-6 py-5 text-center">
                <h3 className="font-display text-2xl text-primary-foreground">Request a Callback</h3>
                <p className="text-primary-foreground/80 text-sm font-body mt-1">Let Us Contact You!</p>
              </div>

              <div className="bg-card p-6 space-y-3.5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input-funky w-full"
                  value={callbackForm.name}
                  onChange={(e) => setCallbackForm({ ...callbackForm, name: e.target.value })}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input-funky w-full"
                  value={callbackForm.phone}
                  onChange={(e) => setCallbackForm({ ...callbackForm, phone: e.target.value })}
                />
                <select
                  className="input-funky w-full"
                  value={callbackForm.time}
                  onChange={(e) => setCallbackForm({ ...callbackForm, time: e.target.value })}
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                </select>

                <motion.button
                  className="btn-gold w-full flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Request Callback <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
