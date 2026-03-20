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
    <section className="py-10 md:py-14 bg-background bg-dotted">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-4xl font-display text-center mb-8"
        >
          <span className="star-deco mr-2">↓</span>
          Get Your{" "}
          <span className="text-accent">Free</span> Quote Today!
          <span className="star-deco ml-2">↓</span>
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row gap-3 items-stretch justify-center"
        >
          {[
            { key: "name", placeholder: "Your Name", type: "text" },
            { key: "phone", placeholder: "Phone Number", type: "tel" },
            { key: "from", placeholder: "Moving From", type: "text" },
            { key: "to", placeholder: "Moving To", type: "text" },
          ].map((field) => (
            <input
              key={field.key}
              type={field.type}
              placeholder={field.placeholder}
              className="input-funky w-full md:w-auto flex-1"
              value={formData[field.key as keyof typeof formData]}
              onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            />
          ))}
          <motion.button
            type="submit"
            className="btn-funky flex items-center justify-center gap-2 whitespace-nowrap"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            Get My Free Quote! <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.form>

        {/* Divider */}
        <div className="mt-6 h-1 rounded-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--funky-gold)), transparent)" }} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-5"
        >
          <p className="text-muted-foreground mb-2.5 font-body text-sm">🎙️ Or tell us about your move via audio</p>
          <motion.button
            onClick={() => setIsRecording(!isRecording)}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-body text-sm border-2 transition-colors ${
              isRecording
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-card text-foreground border-funky-gold hover:border-accent"
            }`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            animate={isRecording ? { boxShadow: ["0 0 0 0 hsl(4 85% 55% / 0.4)", "0 0 0 12px hsl(4 85% 55% / 0)"] } : {}}
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
