import { motion } from "framer-motion";
import { Home, ShieldCheck, Truck, CheckCircle, Users, CreditCard, Clock, XCircle, Timer } from "lucide-react";

const features = [
  { icon: Home, title: "Full House Moving", desc: "Door-to-door moves across the UK", color: "var(--funky-blue)" },
  { icon: ShieldCheck, title: "Fully Insured", desc: "Goods in Transit cover included (eligible moves)", color: "var(--funky-green)" },
  { icon: Truck, title: "Professional Movers", desc: "Trusted and vetted moving teams", color: "var(--funky-orange)" },
  { icon: CheckCircle, title: "£25+ Discount", desc: "Applied automatically", color: "var(--funky-yellow)" },
];

const includes = [
  {
    icon: Users,
    title: "Moving team to Load and Move",
    desc: "A 2 person expert team will be on hand to help.",
    color: "var(--funky-blue)",
  },
  {
    icon: CreditCard,
    title: "Book now, pay later",
    desc: "You can choose to book today with our partner and they'll then take payment 72 hours before your moving date.",
    color: "var(--funky-green)",
  },
  {
    icon: ShieldCheck,
    title: "Complimentary cover",
    desc: "Our partner company provides Complimentary Cover with every move that includes £50,000 of fire and theft cover and up to £100 per item moved.",
    color: "var(--funky-orange)",
  },
  {
    icon: XCircle,
    title: "Free 48 hour cancellation",
    desc: "We know plans can change, so rest easy knowing you can always cancel your booking up to 48 hours before your move.",
    color: "var(--funky-yellow)",
  },
  {
    icon: Timer,
    title: "Waiting time up to 30 mins",
    desc: "With our partner AnyVan booking, you get a 30-minute waiting time should completion and picking up your keys take a little longer than you had planned.",
    color: "var(--funky-cyan)",
  },
];

const OurServices = () => (
  <section className="py-14 md:py-20 bg-background bg-dotted relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-4"
      >
        <div className="ribbon-heading inline-block">
          <h2 className="text-3xl md:text-4xl font-display text-foreground">
            What We <span className="text-accent">Offer</span>
          </h2>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-center text-muted-foreground font-body text-sm md:text-base mb-10 max-w-lg mx-auto"
      >
        We focus on <span className="font-semibold text-foreground">complete home moves only</span>. No storage, no part-loads — just a full house moving service.
      </motion.p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="card-poster p-4 sm:p-5 text-center cursor-default"
          >
            <motion.div
              className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl flex items-center justify-center"
              style={{ background: `hsl(${f.color} / 0.12)` }}
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <f.icon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: `hsl(${f.color})` }} />
            </motion.div>
            <h3 className="font-display text-base sm:text-lg mb-1">{f.title}</h3>
            <p className="text-muted-foreground font-body text-xs sm:text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Includes section */}
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl md:text-3xl font-display text-foreground">
          Includes<span className="text-accent">:</span>
        </h3>
      </motion.div>

      <div className="space-y-4">
        {includes.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="card-poster p-4 sm:p-5 flex items-start gap-4"
          >
            <div
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: `hsl(${item.color} / 0.12)` }}
            >
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: `hsl(${item.color})` }} />
            </div>
            <div>
              <h4 className="font-display text-sm sm:text-base text-foreground mb-1">{item.title}</h4>
              <p className="text-muted-foreground font-body text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default OurServices;
