import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { formatNaira } from "../lib/currency.js";

const benefits = [
  "Open to fresh business ideas from the FOA desk",
  "Import from China without owning a physical shop",
  "Help getting registered on Jumia, Konga, or Jiji",
  "We take, sort, track, and clear your orders",
];

const MembershipTeaser = () => (
  <section className="container-app py-20">
    <div className="grid items-center gap-10 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="order-2 lg:order-1"
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-600">Membership</p>
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          Ongoing support for people building an importation business
        </h2>
        <ul className="mt-5 space-y-3">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2 text-charcoal/70">
              <FiCheck className="mt-1 shrink-0 text-brand-600" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-display text-2xl font-bold text-brand-700">
          {formatNaira(5000)} <span className="text-base font-normal text-charcoal/60">per month</span>
        </p>
        <Link to="/membership" className="btn-primary mt-6 inline-flex">
          Become a member
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="order-1 overflow-hidden rounded-3xl shadow-soft lg:order-2"
      >
        <img
          src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1400"
          alt="Nigerian entrepreneur planning an importation business"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  </section>
);

export default MembershipTeaser;
