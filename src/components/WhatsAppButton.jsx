import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppUrl } from "../lib/whatsapp.js";

const WhatsAppButton = ({ hidden }) => {
  if (hidden) return null;
  const href = buildWhatsAppUrl("Hello FOA Mini Importation, I'd like to know more.");

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with FOA Mini Importation on WhatsApp"
      className="fixed bottom-5 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
