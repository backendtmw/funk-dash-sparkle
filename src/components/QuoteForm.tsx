import { motion } from "framer-motion";
import { ArrowRight, Mic, ShieldCheck, Clock, Star, Phone, CheckCircle } from "lucide-react";
import { useState } from "react";

const trustPoints = [
  { icon: ShieldCheck, text: "Insured up to £50k" },
  { icon: Clock, text: "Quote in 60 seconds" },
  { icon: Star, text: "4.9★ rated service" },
];

const QuoteForm = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", from: "", to: "" });
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote requested:", formData);
  };

  return (
    <section className="py-10 md:py-14 bg-background bg-dotted" id="quote-form">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Urgency banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-3"
        >
          <span className="inline-flex items-center gap-2 bg-funky-green/15 text-funky-green font-body text-sm font-semibold px-4 py-1.5 rounded-full border border-funky-green/30">
            <CheckCircle className="w-4 h-4" />
            Over 10,000 moves completed — Join them today!
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-4xl font-display text-center mb-2"
        >
          <span className="star-deco mr-2">✦</span>
          Get Your{" "}
          <span className="text-accent">Free</span> Quote in Seconds!
          <span className="star-deco ml-2">✦</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-center text-muted-foreground font-body text-sm mb-6"
        >
          No obligation • No hidden fees • Takes less than a minute
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-6"
        >
          {trustPoints.map((tp, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 text-xs font-body text-muted-foreground bg-card border border-border/50 rounded-full px-3 py-1.5"
            >
              <tp.icon className="w-3.5 h-3.5 text-funky-green" />
              {tp.text}
            </div>
          ))}
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="card-poster p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-3 items-stretch">
            {[
              { key: "name", placeholder: "Your Name", type: "text" },
              { key: "phone", placeholder: "Phone Number", type: "tel" },
              { key: "from", placeholder: "Moving From (postcode)", type: "text" },
              { key: "to", placeholder: "Moving To (postcode)", type: "text" },
            ].map((field) => (
              <input
                key={field.key}
                type={field.type}
                placeholder={field.placeholder}
                required
                className="input-funky w-full md:w-auto flex-1"
                value={formData[field.key as keyof typeof formData]}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
              />
            ))}
            <motion.button
              type="submit"
              className="btn-funky flex items-center justify-center gap-2 whitespace-nowrap text-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              Get My Free Quote! <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Below form — phone CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-5 pt-4 border-t border-border/30">
            <p className="text-muted-foreground font-body text-sm">Prefer to talk?</p>
            <motion.a
              href="tel:08001234567"
              className="inline-flex items-center gap-2 btn-gold text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <Phone className="w-4 h-4" /> Call 0800 123 4567
            </motion.a>
          </div>
        </motion.form>

        {/* Divider */}
        <div className="mt-6 h-1 rounded-full" style={{ background: "linear-gradient(90deg, transparent, hsl(var(--funky-gold)), transparent)" }} />

        {/* Audio option */}
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
