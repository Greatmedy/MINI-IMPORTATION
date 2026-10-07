import { motion } from "framer-motion";
import {
  FiTruck,
  FiBookOpen,
  FiUsers,
  FiMapPin,
  FiSearch,
} from "react-icons/fi";

const reasons = [
  {
    icon: FiSearch,
    title: "China Sourcing",
    description:
      "We help you source products from reliable suppliers in China.",
  },
  {
    icon: FiTruck,
    title: "Import & Logistics Support",
    description:
      "Get guidance through shipping, tracking, clearing and delivery.",
  },
  {
    icon: FiBookOpen,
    title: "FOA Academy",
    description:
      "Learn how to start and grow your importation business with practical training.",
  },
  {
    icon: FiUsers,
    title: "FOA Membership",
    description:
      "Get access to additional support, opportunities and business resources.",
  },
  {
    icon: FiMapPin,
    title: "Nigeria Delivery",
    description:
      "Products can be delivered to customers across Nigeria through our logistics network.",
  },
];

const Services = () => (
  <section className="container-app py-20">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="font-display text-3xl font-semibold sm:text-4xl">
        Why Choose FOA?
      </h2>
      <div className="mt-10 overflow-hidden rounded-3xl shadow-soft">
        <img
          src="/china-factory.jpg"
          alt="Chinese factory team inspecting products before export"
          className="h-72 w-full object-cover sm:h-96"
        />
      </div>
      <p className="mt-3 text-charcoal/60">
        Products, importation support, and practical training — so you can buy,
        learn, or build a business.
      </p>
    </div>

    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reasons.map((s, i) => (
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
          <p className="text-sm leading-relaxed text-charcoal/60">
            {s.description}
          </p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Services;
