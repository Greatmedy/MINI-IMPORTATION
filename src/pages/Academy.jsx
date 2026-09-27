import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import api from "../lib/api.js";
import { formatNaira } from "../lib/currency.js";
import { buildWhatsAppUrl, buildEnrollmentMessage } from "../lib/whatsapp.js";

const topics = [
  "How to pick winning products that actually sell in Nigeria",
  "Where to source: 1688, AliExpress, and Alibaba compared",
  "Working with freight forwarders and understanding shipping options",
  "Calculating landed cost so you always price for profit",
  "Pricing for resale without scaring off buyers",
  "Selling on Jumia, Konga, and Jiji the right way",
  "Building sales on Instagram and WhatsApp from zero",
];

const Academy = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get("/settings")
      .then(({ data }) => setSettings(data.settings))
      .finally(() => setLoadingSettings(false));
  }, []);

  const handlePaymentClick = async () => {
    if (!user) {
      navigate("/login?next=/academy");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/enrollments");
      await refreshUser();
      setEnrolled(true);
    } catch (err) {
      showToast(err.response?.data?.message || "Could not save your enrollment.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const alreadyStudent = user?.studentStatus === "registered";
  const alreadyPending = user?.studentStatus === "pending_confirmation";
  const showConfirmation = enrolled || alreadyPending;

  const whatsappHref = user
    ? buildWhatsAppUrl(buildEnrollmentMessage({ name: user.name, phone: user.phone, email: user.email }))
    : "#";

  return (
    <div className="container-app py-12 pt-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">FOA Academy</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Become a Master of Mini Importation</h1>
        <p className="mt-4 text-charcoal/70">
          A practical, one-time training built for Nigerians who want to import and resell without
          guesswork. Learn directly from the FOA team's experience sourcing and selling in this market.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <ul className="grid gap-3 sm:grid-cols-2">
          {topics.map((t) => (
            <li key={t} className="flex items-start gap-2 rounded-xl bg-white p-4 shadow-soft">
              <FiCheck className="mt-0.5 shrink-0 text-brand-600" />
              <span className="text-sm text-charcoal/80">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        {alreadyStudent ? (
          <div className="card p-8 text-center">
            <p className="font-display text-xl font-semibold text-green-700">You're a Registered Student 🎉</p>
            <p className="mt-2 text-sm text-charcoal/70">Your academy lessons are ready whenever you are.</p>
            <a href="/account/academy" className="btn-primary mt-5 inline-flex">
              Watch academy lessons
            </a>
          </div>
        ) : showConfirmation ? (
          <div className="card p-8 text-center">
            <p className="font-display text-xl font-semibold">Enrollment received confirm your payment</p>
            <p className="mt-2 text-sm text-charcoal/70">
              Tap below to open WhatsApp with your details already filled in, then attach your payment
              receipt in the chat. Our team will verify and unlock your lessons shortly.
            </p>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 inline-flex">
              Open WhatsApp to confirm
            </a>
          </div>
        ) : (
          <div className="card p-8">
            <h2 className="font-display text-xl font-semibold">Enrollment Fee</h2>
            <p className="mt-1 font-display text-3xl font-bold text-brand-700">
              {formatNaira(15000)} <span className="text-base font-normal text-charcoal/60">one-time</span>
            </p>

            {!loadingSettings && settings && (
              <div className="mt-5 space-y-1 rounded-xl bg-blush p-4 text-sm">
                <p><span className="font-medium">Bank:</span> {settings.bankName}</p>
                <p><span className="font-medium">Account Name:</span> {settings.accountName}</p>
                <p><span className="font-medium">Account Number:</span> {settings.accountNumber}</p>
                <p className="mt-2 text-charcoal/60">{settings.paymentNote}</p>
              </div>
            )}

            <button onClick={handlePaymentClick} disabled={submitting} className="btn-primary mt-6 w-full">
              {submitting ? "Saving..." : "I have made the payment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Academy;
