import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Photo credit: Unsplash — cargo containers / air freight handling, used
// under the Unsplash License. Source: images.unsplash.com

const Hero = () => (
  <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-16">
    <div className="absolute inset-0 -z-10">
      <img
        src="https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=2000"
        alt="Shipping containers and cargo being prepared for import into Nigeria"
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
    </div>

    <div className="container-app relative py-24 text-white">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur"
      >
        Import smarter. Sell faster. Build in Nigeria.
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
      >
        Factory prices from China, landed in Lagos, ready to resell.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
      >
        FOA Mini Importation sources and delivers genuine imported goods across Nigeria,
        teaches you the mini importation business through FOA Academy, and gives paid
        members hands-on help sourcing, sorting, tracking, and clearing every order.
        You don't need a physical shop to start, your phone and a WhatsApp line are enough.
      </motion.p>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
        }}
        className="mt-9 flex flex-wrap gap-3"
      >
        {[
          { to: "/shop", label: "Shop With FOA", primary: true },
          { to: "/academy", label: "Enroll in our Training course" },
          { to: "/membership", label: "Become A Member" },
        ].map((btn) => (
          <motion.div
            key={btn.to}
            variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
          >
            <Link to={btn.to} className={btn.primary ? "btn-primary" : "btn-outline-invert"}>
              {btn.label}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Hero;
