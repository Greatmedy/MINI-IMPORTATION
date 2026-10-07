import { Link } from "react-router-dom";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { FiMail, FiMapPin } from "react-icons/fi";
import { buildWhatsAppUrl } from "../lib/whatsapp.js";
import foalogo from "../assets/foalogo.jpg";

const Footer = () => {
  const year = new Date().getFullYear();
  const whatsappPrimary = buildWhatsAppUrl("Hello FOA Mini Importation, I'd like to know more.", "918983294206");
  const whatsappSecondary = buildWhatsAppUrl("Hello FOA Mini Importation, I'd like to know more.", "2347017765446");

  return (
    <footer className="bg-charcoal text-white/80">
      <div className="container-app grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-15 items-center justify-center rounded-xl bg-brand-600 font-display text-sm font-bold text-white">
              <img src={foalogo} alt="FOA Mini Importation" className="h-10 w-19 rounded-lg" />
            </span>
            <span className="font-display text-lg font-semibold text-white">FOA Mini Importation</span>
          </div>
          <p className="text-sm leading-relaxed">
            Import from China, learn the business, and grow with FOA. We source products, guide shipping
            and clearing, and teach practical importation through FOA Academy.
          </p>
          <a
            href="https://www.facebook.com/share/1diicwezn8/?mibextid=wwxifr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="FOA Mini Importation on Facebook"
            className="mt-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-brand-600"
          >
            <FaFacebookF />
          </a>
        </div>

        <div>
          <h3 className="mb-3 font-display text-base font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-brand-400">Shop</Link></li>
            <li><Link to="/academy" className="hover:text-brand-400">Academy</Link></li>
            <li><Link to="/membership" className="hover:text-brand-400">Membership</Link></li>
            <li><Link to="/services" className="hover:text-brand-400">Services</Link></li>
            <li><Link to="/contact" className="hover:text-brand-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-base font-semibold text-white">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-brand-400">Privacy Policy</Link></li>
            <li><Link to="/refund" className="hover:text-brand-400">Refund Policy</Link></li>
            <li><Link to="/terms" className="hover:text-brand-400">Terms of Use</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-display text-base font-semibold text-white">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <FiMapPin className="mt-0.5 shrink-0 text-brand-400" />
              <span>No 9, Agwado Ijaye Road, opposite Tanimowo Family Plaza, Ijaye, Lagos State, Nigeria</span>
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="shrink-0 text-brand-400" />
              <a href="mailto:foaimportation.ltd@gmail.com" className="hover:text-brand-400">
                foaimportation.ltd@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp className="shrink-0 text-brand-400" />
              <a href={whatsappPrimary} target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">
                +91 89832 94206 (Orders)
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp className="shrink-0 text-brand-400" />
              <a href={whatsappSecondary} target="_blank" rel="noopener noreferrer" className="hover:text-brand-400">
                +234 701 776 5446 (General)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <p className="container-app text-center text-xs text-white/50">
          &copy; {year} FOA Importation Ltd. All rights reserved. Developed by <a href="https://apextechs.vercel.app" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-400 hover:underline">APEX TECH</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
