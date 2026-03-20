import { motion } from "framer-motion";
import serviceHome from "@/assets/service-home.png";
import serviceOffice from "@/assets/service-office.png";
import servicePacking from "@/assets/service-packing.png";
import serviceStorage from "@/assets/service-storage.png";

const services = [
  { title: "Home Moving", desc: "Safe door-to-door home removals", img: serviceHome },
  { title: "Office Relocation", desc: "Minimal downtime business moves", img: serviceOffice },
  { title: "Packing & Unpacking", desc: "Professional packing services", img: servicePacking },
  { title: "Storage Solutions", desc: "Secure short & long-term storage", img: serviceStorage },
];

const OurServices = () => (
  <section className="py-14 md:py-20 bg-background bg-dotted relative overflow-hidden">
    <div className="container mx-auto px-4 max-w-5xl">
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
            Our <span className="text-accent">Services</span>
          </h2>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="card-poster p-5 text-center cursor-pointer group"
          >
            <div className="overflow-hidden rounded-xl mb-4">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-36 object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="font-display text-xl mb-1">{s.title}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default OurServices;
