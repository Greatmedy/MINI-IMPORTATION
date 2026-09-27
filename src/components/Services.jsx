import { motion } from "framer-motion";
import { FiTruck, FiBookOpen, FiShield, FiPackage } from "react-icons/fi";

const services = [
  {
    icon: FiTruck,
    title: "Importation from China",
    description:
      "Sourcing, consolidation, air freight, and reliable delivery from Chinese factories straight into Lagos so your goods land fast and intact.",
  },
  {
    icon: FiBookOpen,
    title: "FOA Academy",
    description:
      "Learn to source, price, and sell like a professional mini importer, from picking winning products to closing sales on Instagram and WhatsApp.",
  },
  {
    icon: FiShield,
    title: "Importation Assistance & Guidance",
    description:
      "Supplier verification, shipping method selection, and customs clearance support so you avoid the costly mistakes new importers make.",
  },
  {
    icon: FiPackage,
    title: "Order Handling for Members",
    description:
      "Our team takes your order, sorts it, tracks it, and clears it through customs, members focus on selling, we handle the logistics.",
  },
];

const Services = () => (
  <section className="container-app py-20">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="font-display text-3xl font-semibold sm:text-4xl">What We Do</h2>
      <p className="mt-3 text-charcoal/60">
        Everything you need to start and grow an import business in Nigeria, sourcing, training, and support.
      </p>
    </div>

    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="card p-6"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <s.icon size={24} />
          </div>
          <h3 className="mb-2 font-display text-lg font-semibold">{s.title}</h3>
          <p className="text-sm leading-relaxed text-charcoal/60">{s.description}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Services;
