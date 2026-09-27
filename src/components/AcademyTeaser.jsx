import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatNaira } from "../lib/currency.js";

const AcademyTeaser = () => (
  <section className="bg-blush py-20">
    <div className="container-app grid items-center gap-10 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl shadow-soft"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400"
          alt="Student learning mini importation on a laptop"
          className="h-full w-full object-cover"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-600">FOA Academy</p>
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">
          Become a master of mini importation
        </h2>
        <p className="mt-4 text-charcoal/70">
          Learn how to pick winning products, source directly from verified factories, calculate
          landed cost, price for profit, and sell on Jumia, Konga, Jiji, Instagram, and WhatsApp,
          taught step-by-step by the FOA team.
        </p>
        <p className="mt-4 font-display text-2xl font-bold text-brand-700">
          {formatNaira(15000)} <span className="text-base font-normal text-charcoal/60">one-time enrollment</span>
        </p>
        <Link to="/academy" className="btn-primary mt-6 inline-flex">
          Enroll now
        </Link>
      </motion.div>
    </div>
  </section>
);

export default AcademyTeaser;
