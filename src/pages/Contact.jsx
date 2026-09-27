import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { FiMail, FiMapPin } from "react-icons/fi";
import MapEmbed from "../components/MapEmbed.jsx";
import { buildWhatsAppUrl } from "../lib/whatsapp.js";

const Contact = () => {
  const whatsappPrimary = buildWhatsAppUrl("Hello FOA Mini Importation, I'd like to know more.", "918983294206");
  const whatsappSecondary = buildWhatsAppUrl("Hello FOA Mini Importation, I'd like to know more.", "2348103526784");

  return (
    <div className="container-app py-12 pt-28">
      <h1 className="font-display text-4xl font-semibold">Get In Touch</h1>
      <p className="mt-3 max-w-xl text-charcoal/60">
        Have a question about an order, the Academy, or Membership? We reply fast on WhatsApp.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <ul className="space-y-5">
          <li className="flex items-center gap-3">
            <FaWhatsapp className="text-[#25D366]" size={22} />
            <a href={whatsappPrimary} target="_blank" rel="noopener noreferrer" className="hover:underline">
              +91 89832 94206 (Order confirmation)
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FaWhatsapp className="text-[#25D366]" size={22} />
            <a href={whatsappSecondary} target="_blank" rel="noopener noreferrer" className="hover:underline">
              +234 810 352 6784 (General enquiries)
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FiMail className="text-brand-600" size={22} />
            <a href="mailto:foaimportation.ltd@gmail.com" className="hover:underline">
              foaimportation.ltd@gmail.com
            </a>
          </li>
          <li className="flex items-start gap-3">
            <FiMapPin className="mt-1 shrink-0 text-brand-600" size={22} />
            <span>No 9, Agwado Ijaye Road, opposite Tanimowo Family Plaza, Ijaye, Lagos State, Nigeria</span>
          </li>
          <li className="flex items-center gap-3">
            <FaFacebookF className="text-brand-600" size={20} />
            <a
              href="https://www.facebook.com/share/1diicwezn8/?mibextid=wwxifr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              FOA Mini Importation on Facebook
            </a>
          </li>
        </ul>

        <MapEmbed />
      </div>
    </div>
  );
};

export default Contact;
