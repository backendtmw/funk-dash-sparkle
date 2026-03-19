import { motion } from "framer-motion";
import { ArrowRight, Mic } from "lucide-react";
import { useState } from "react";

const QuoteForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", from: "", to: "" });
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote requested:", formData);
  };

  return (
    <section className="py-8 bg-background bg-dotted">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-display text-center mb-6"
        >
          <span className="star-deco mr-2">↓</span>
          Get Your{" "}
          <span className="text-accent">Free</span> Quote Today!
          <span className="star-deco ml-2">↓</span>
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-3 items-center justify-center max-w-5xl mx-auto"
        >
          {[
            { key: "name", placeholder: "Your Name" },
            { key: "phone", placeholder: "Phone Number" },
            { key: "from", placeholder: "Moving From" },
            { key: "to", placeholder: "Moving To" },
          ].map((field, i) => (
            <motion.input
              key={field.key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              type="text"
              placeholder={field.placeholder}
              className="input-funky w-full md:w-auto flex-1"
              value={formData[field.key as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            />
          ))}
          <motion.button
            type="submit"
            className="btn-funky flex items-center gap-2 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get My Free Quote! <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.form>

        {/* Golden divider */}
        <div className="max-w-5xl mx-auto mt-4 h-1 rounded-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--funky-gold)), transparent)" }} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-4"
        >
          <p className="text-muted-foreground mb-2 font-body text-sm">🎙️ Or tell us about your move via audio</p>
          <motion.button
            onClick={() => setIsRecording(!isRecording)}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-body text-sm border-2 transition-all ${
              isRecording
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-card text-foreground border-funky-gold hover:border-accent"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isRecording ? { boxShadow: ["0 0 0 0 hsl(4 85% 55% / 0.4)", "0 0 0 15px hsl(4 85% 55% / 0)"] } : {}}
            transition={isRecording ? { duration: 1.5, repeat: Infinity } : {}}
          >
            <Mic className="w-4 h-4" /> {isRecording ? "Recording..." : "Record Audio"}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteForm;
