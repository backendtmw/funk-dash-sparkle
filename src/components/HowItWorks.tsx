import { motion } from "framer-motion";
import { ArrowRight, Mic, ChevronRight } from "lucide-react";
import { useState } from "react";

const steps = [
  { num: "1", title: "Get a Quote", desc: "In 60 Seconds", emoji: "📱" },
  { num: "2", title: "We Pack & Move", desc: "Hassle-Free", emoji: "📦" },
  { num: "3", title: "Enjoy New Home", desc: "Stress-Free", emoji: "🏠" },
];

const HowItWorks = () => {
  const [callbackForm, setCallbackForm] = useState({ name: "", phone: "", time: "Morning" });
  const [isRecording, setIsRecording] = useState(false);

  return (
    <section className="py-20 bg-funky-gradient relative overflow-hidden">
      {/* Floating emoji decorations */}
      {["📦", "🚛", "🏡", "⭐"].map((emoji, i) => (
        <motion.span
          key={i}
          className="absolute text-4xl opacity-20 pointer-events-none"
          style={{ top: `${20 + i * 20}%`, left: `${5 + i * 25}%` }}
          animate={{ y: [0, -30, 0], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        >
          {emoji}
        </motion.span>
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display text-primary-foreground text-center md:text-left mb-12"
        >
          How It <span className="text-funky-yellow">Works?</span>
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Steps */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, type: "spring" }}
                >
                  <motion.div
                    className="relative text-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <motion.div
                      className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-display text-sm z-10"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      {step.num}
                    </motion.div>
                    <div className="w-28 h-28 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-5xl border-2 border-primary-foreground/20">
                      {step.emoji}
                    </div>
                    <h3 className="font-display text-primary-foreground text-lg mt-3">{step.title}</h3>
                    <p className="text-primary-foreground/70 font-body text-sm">{step.desc}</p>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <motion.div
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="hidden md:block"
                    >
                      <ChevronRight className="w-8 h-8 text-funky-yellow" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Callback Form */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="w-full max-w-sm bg-card rounded-3xl p-6 shadow-2xl border-2 border-border"
          >
            <h3 className="font-display text-2xl text-center mb-1">Request a Callback</h3>
            <p className="text-muted-foreground text-center text-sm font-body mb-4">Let Us Contact You!</p>

            <div className="space-y-3">
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

              <div>
                <p className="text-muted-foreground text-xs mb-2 font-body">🎙️ Record your message</p>
                <button
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-body border-2 transition-all ${
                    isRecording
                      ? "bg-accent text-accent-foreground border-accent"
                      : "bg-card text-foreground border-border hover:border-accent"
                  }`}
                >
                  <Mic className="w-3 h-3" /> {isRecording ? "Recording..." : "Record Audio"}
                </button>
              </div>

              <motion.button
                className="btn-funky w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Request Callback <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
