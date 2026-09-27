import { Link } from "react-router-dom";
import { FiTruck, FiBookOpen, FiShield, FiPackage } from "react-icons/fi";

const services = [
  {
    icon: FiTruck,
    title: "Importation from China",
    description:
      "We source directly from verified factories and trading companies in China, consolidate your goods into a single shipment, arrange air freight, and deliver right to your door in Lagos or anywhere else in Nigeria.",
    cta: { to: "/shop", label: "Shop imported goods" },
  },
  {
    icon: FiBookOpen,
    title: "FOA Academy Training",
    description:
      "A one-time, practical course covering product selection, sourcing from 1688/AliExpress/Alibaba, freight forwarding, landed cost calculation, pricing for resale, and selling on Jumia, Konga, Jiji, Instagram, and WhatsApp.",
    cta: { to: "/academy", label: "Enroll in the Academy" },
  },
  {
    icon: FiShield,
    title: "Importation Assistance & Guidance",
    description:
      "Not sure which supplier to trust or how to clear customs? We verify suppliers, help you choose the right shipping method, and guide you through customs clearance so you avoid the costly mistakes new importers make.",
    cta: { to: "/contact", label: "Ask us a question" },
  },
  {
    icon: FiPackage,
    title: "Order Handling for Members",
    description:
      "Paid members get hands-on help — our team takes your order, sorts it, tracks it in transit, and clears it through customs, so you can focus entirely on selling without owning a physical shop.",
    cta: { to: "/membership", label: "Become a member" },
  },
];

const ServicesPage = () => (
  <div className="container-app py-12 pt-28">
    <div className="mx-auto max-w-2xl text-center">
      <h1 className="font-display text-4xl font-semibold">Our Services</h1>
      <p className="mt-3 text-charcoal/60">
        From sourcing to selling, FOA Mini Importation supports every step of your import business.
      </p>
    </div>

    <div className="mt-12 grid gap-6 sm:grid-cols-2">
      {services.map((s) => (
        <div key={s.title} className="card p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <s.icon size={24} />
          </div>
          <h2 className="mb-2 font-display text-lg font-semibold">{s.title}</h2>
          <p className="text-sm leading-relaxed text-charcoal/60">{s.description}</p>
          <Link to={s.cta.to} className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:underline">
            {s.cta.label} &rarr;
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default ServicesPage;
