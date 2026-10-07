import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingBag, FiBookOpen, FiPackage, FiUsers, FiStar, FiMail, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Hero from "../components/Hero.jsx";
import Services from "../components/Services.jsx";
import AcademyTeaser from "../components/AcademyTeaser.jsx";
import MembershipTeaser from "../components/MembershipTeaser.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ProductCardSkeleton from "../components/ProductCardSkeleton.jsx";
import MapEmbed from "../components/MapEmbed.jsx";
import api from "../lib/api.js";
import { buildWhatsAppUrl } from "../lib/whatsapp.js";

const testimonials = [
  {
    name: "Chinedu O.",
    city: "Lagos",
    quote:
      "I started with just the phone accessories bundle and sold out in 10 days. FOA handled the shipping stress so I could focus on selling.",
    stars: 5,
    context: "Wireless Earbuds Pro X",
  },
  {
    name: "Amaka B.",
    city: "Port Harcourt",
    quote:
      "The Academy training simplified everything about sourcing from China. I now know exactly how to calculate my landed cost before I order.",
    stars: 5,
    context: "FOA Academy",
  },
  {
    name: "Tunde A.",
    city: "Abuja",
    quote:
      "Being a member means I don't stress about customs anymore. My orders get cleared and delivered while I run my business from my phone.",
    stars: 5,
    context: "Membership",
  },
  {
    name: "Ngozi E.",
    city: "Ibadan",
    quote:
      "Customer service on WhatsApp is fast and honest. My beauty products arrived exactly as pictured and my customers keep reordering.",
    stars: 4,
    context: "Skincare Glow Serum",
  },
];

const paths = [
  {
    icon: FiShoppingBag,
    title: "I Want To Buy",
    text: "Browse products sourced by FOA and order for delivery.",
    to: "/shop",
    label: "Shop With FOA",
  },
  {
    icon: FiBookOpen,
    title: "I Want To Learn",
    text: "Learn how to import from China and start an importation business with little capital.",
    to: "/academy",
    label: "Start Learning",
  },
  {
    icon: FiPackage,
    title: "I Want To Import",
    text: "Let FOA help you source, ship and manage your goods from China.",
    to: "/services",
    label: "Import With FOA",
  },
  {
    icon: FiUsers,
    title: "I Want To Become A Member",
    text: "Join the FOA community and access member-focused support and opportunities.",
    to: "/membership",
    label: "Become A Member",
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    api
      .get("/products", { params: { featured: "true" } })
      .then(({ data }) => {
        if (active) setProducts(data.products.slice(0, 8));
      })
      .catch(() => active && setError("Could not load featured products right now."))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const whatsappPrimary = buildWhatsAppUrl("Hello FOA Mini Importation, I'd like to know more.", "918983294206");
  const whatsappSecondary = buildWhatsAppUrl("Hello FOA Mini Importation, I'd like to know more.", "2347017765446");

  return (
    <div>
      <Hero />
      <Services />

      <section className="bg-blush py-20">
        <div className="container-app">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">What Are You Looking For?</h2>
            <p className="mt-3 text-charcoal/60">
              Buy ready products, learn the business, import with support, or join the membership.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {paths.map((path) => (
              <div key={path.title} className="card flex flex-col p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <path.icon size={22} />
                </div>
                <h3 className="font-display text-xl font-semibold">{path.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/65">{path.text}</p>
                <Link to={path.to} className="btn-secondary mt-5 w-fit">
                  {path.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            A Business You Can Find. A Team You Can Reach.
          </h2>
          <p className="mt-4 text-charcoal/70">
            FOA Mini Importation Limited is building a trusted importation community connecting Nigerian
            entrepreneurs with products, suppliers, logistics support and practical importation education.
          </p>
          <p className="mt-4 text-charcoal/70">
            You don’t need a physical shop to start. With your phone, internet connection and the right
            knowledge, you can begin building your importation business from wherever you are.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-4 text-sm sm:grid-cols-2">
          <div className="card p-5">
            <p className="font-semibold">FOA Mini Importation Limited</p>
            <p className="mt-1 text-charcoal/60">Lagos, Nigeria</p>
            <p className="mt-1 text-charcoal/60">No 9, Agwado Ijaye Road, opposite Tanimowo Family Plaza, Ijaye, Lagos State</p>
          </div>
          <div className="card p-5">
            <p><a className="hover:text-brand-600" href="mailto:foaimportation.ltd@gmail.com">foaimportation.ltd@gmail.com</a></p>
            <p className="mt-2"><a className="hover:text-brand-600" href={whatsappSecondary} target="_blank" rel="noopener noreferrer">WhatsApp +234 701 776 5446</a></p>
            <p className="mt-2 text-charcoal/60">foaimportation.com</p>
          </div>
        </div>
      </section>

      <AcademyTeaser />
      <MembershipTeaser />

      <section className="bg-blush py-20">
        <div className="container-app">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">The FOA Store</h2>
            <Link to="/shop" className="btn-secondary">
              Shop Now
            </Link>
          </div>

          {error && <p className="field-error">{error}</p>}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="container-app py-20">
        <h2 className="mb-10 text-center font-display text-3xl font-semibold sm:text-4xl">
          What Our Customers Say
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card p-5"
            >
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <FiStar
                    key={s}
                    size={16}
                    className={s < t.stars ? "fill-brand-500 text-brand-500" : "text-charcoal/20"}
                  />
                ))}
              </div>
              <p className="text-sm italic text-charcoal/70">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-semibold">{t.name} &middot; {t.city}</p>
              <p className="text-xs text-charcoal/50">{t.context}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-20 text-white">
        <div className="container-app grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 font-display text-3xl font-semibold sm:text-4xl">Get In Touch</h2>
            <p className="mb-6 text-white/70">
              Have a question about an order, the Academy, or Membership? Reach us directly,
              we reply fast on WhatsApp.
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-[#25D366]" size={20} />
                <a href={whatsappPrimary} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  +91 89832 94206 (Order confirmation)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-[#25D366]" size={20} />
                <a href={whatsappSecondary} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  +234 701 776 5446 (General enquiries)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-brand-400" size={20} />
                <a href="mailto:foaimportation.ltd@gmail.com" className="hover:underline">
                  foaimportation.ltd@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-1 shrink-0 text-brand-400" size={20} />
                <span>No 9, Agwado Ijaye Road, opposite Tanimowo Family Plaza, Ijaye, Lagos State, Nigeria</span>
              </li>
            </ul>
          </div>
          <MapEmbed />
        </div>
      </section>
    </div>
  );
};

export default Home;