import { motion } from "framer-motion";
import serviceHome from "@/assets/service-home.png";
import serviceOffice from "@/assets/service-office.png";
import servicePacking from "@/assets/service-packing.png";
import serviceStorage from "@/assets/service-storage.png";

const services = [
  { title: "Home Moving", img: serviceHome },
  { title: "Office Relocation", img: serviceOffice },
  { title: "Packing & Unpacking", img: servicePacking },
  { title: "Storage Solutions", img: serviceStorage },
];

const OurServices = () => (
  <section className="py-20 bg-background relative overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 30, rotate: -3 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="text-4xl md:text-5xl font-display text-center mb-12"
      >
        Our <span className="text-funky-orange">Services</span> 🚚
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -8 : 8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, type: "spring", bounce: 0.4 }}
            whileHover={{ y: -15, rotate: i % 2 === 0 ? 3 : -3, scale: 1.05 }}
            className="card-funky p-4 text-center cursor-pointer group"
          >
            <motion.div
              className="overflow-hidden rounded-xl mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-40 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
            <h3 className="font-display text-xl">{s.title}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default OurServices;
