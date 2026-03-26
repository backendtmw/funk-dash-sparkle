import { motion } from "framer-motion";
import { ChevronRight, CheckCircle } from "lucide-react";
import stepQuote from "@/assets/step-quote.png";
import stepPack from "@/assets/step-pack.png";
import stepSettle from "@/assets/step-settle.png";

const steps = [
  {
    num: "1",
    title: "Get a Quote",
    desc: "Fill out the form or send your details via audio.",
    img: stepQuote,
  },
  {
    num: "2",
    title: "We Set It Up",
    desc: "A real person processes your request and sends:",
    bullets: ["Your quote", "Discounted booking link", "Full availability options"],
    img: stepPack,
  },
  {
    num: "3",
    title: "You Move",
    desc: "Choose your date and move with confidence.",
    img: stepSettle,
  },
];

const HowItWorks = () => (
  <section className="section-blue py-16 md:py-20 relative overflow-hidden">
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

    <div className="container mx-auto px-4 max-w-5xl relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-12"
      >
        <div className="ribbon-heading inline-block">
          <h2 className="text-3xl md:text-4xl font-display text-foreground">
            How It <span className="text-accent">Works</span>
          </h2>
        </div>
      </motion.div>

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
            <motion.div
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center font-display text-lg z-20 shadow-lg"
              style={{ background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--funky-orange)))", color: "white" }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {step.num}
            </motion.div>

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
            <p className="text-primary-foreground/60 font-body text-sm italic mb-2">{step.desc}</p>

            {step.bullets && (
              <div className="space-y-1 mt-2">
                {step.bullets.map((b, bi) => (
                  <div key={bi} className="flex items-center gap-1.5 justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-funky-green flex-shrink-0" />
                    <span className="text-primary-foreground/70 font-body text-xs">{b}</span>
                  </div>
                ))}
              </div>
            )}

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
  </section>
);

export default HowItWorks;
