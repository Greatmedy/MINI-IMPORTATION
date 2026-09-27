import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import foalogo from "../assets/foalogo.jpg";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/academy", label: "Academy" },
  { to: "/membership", label: "Membership" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

const Navbar = ({ onMobileMenuChange }) => {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();
  const { count, setIsOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    onMobileMenuChange?.(mobileOpen);
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen, onMobileMenuChange]);

  const submitSearch = (e) => {
    e.preventDefault();
    navigate(`/shop?q=${encodeURIComponent(query)}`);
    setMobileOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 bg-white/70 shadow-sm backdrop-blur-xl">
      <div className="container-app flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-15 items-center justify-center rounded-xl bg-brand-600 font-display text-sm font-bold text-white">
            <img src={foalogo} alt="FOA Mini Importation" className="h-10 w-19 rounded-lg" />
          </span>
          <span className="hidden font-display text-lg font-semibold text-charcoal sm:block">
            FOA Mini Importation
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-medium text-charcoal/80 transition hover:text-brand-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={submitSearch} className="relative hidden max-w-xs flex-1 md:block">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full rounded-xl border border-charcoal/15 bg-white/80 py-2 pl-9 pr-3 text-sm focus:border-brand-500"
          />
        </form>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open cart"
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-charcoal transition hover:bg-blush"
          >
            <FiShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent-600 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          <Link
            to={user ? "/account" : "/login"}
            aria-label={user ? "Account" : "Login"}
            className="hidden h-11 w-11 items-center justify-center rounded-full text-charcoal transition hover:bg-blush sm:flex"
          >
            <FiUser size={20} />
          </Link>

          {!user && (
            <Link to="/login" className="hidden text-sm font-semibold text-brand-700 hover:underline sm:block">
              Login
            </Link>
          )}
          {!user && (
            <Link to="/register" className="btn-primary hidden !px-4 !py-2 text-xs sm:inline-flex">
              Register
            </Link>
          )}

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/40 bg-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container-app flex flex-col gap-1 py-4">
              <form onSubmit={submitSearch} className="relative mb-2">
                <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="w-full rounded-xl border border-charcoal/15 bg-white py-3 pl-9 pr-3 text-sm"
                />
              </form>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="rounded-xl px-3 py-3 text-base font-medium text-charcoal hover:bg-blush"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2 border-t border-charcoal/10 pt-4">
                <Link to={user ? "/account" : "/login"} className="btn-secondary flex-1">
                  <FiUser /> {user ? "My Account" : "Login"}
                </Link>
                {!user && (
                  <Link to="/register" className="btn-primary flex-1">
                    Register
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
