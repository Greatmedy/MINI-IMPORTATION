import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import api from "../lib/api.js";
import { formatNaira } from "../lib/currency.js";
import { buildWhatsAppUrl, buildMembershipMessage } from "../lib/whatsapp.js";

const benefits = [
  "Open to fresh business ideas from the FOA desk",
  "Import from China to Nigeria without owning a physical or offline store",
  "Help getting registered and set up on Jumia, Konga, or Jiji",
  "We take, sort, track, and clear your orders through customs",
];

const Membership = () => {
  const { user, refreshUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [requested, setRequested] = useState(false);
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
      navigate("/login?next=/membership");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/memberships");
      await refreshUser();
      setRequested(true);
    } catch (err) {
      showToast(err.response?.data?.message || "Could not save your request.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const isVerified = user?.memberStatus === "verified";
  const isExpired = user?.memberStatus === "expired";
  const isPending = user?.memberStatus === "pending_confirmation";
  const showConfirmation = requested || isPending;

  const whatsappHref = user
    ? buildWhatsAppUrl(buildMembershipMessage({ name: user.name, phone: user.phone, email: user.email }))
    : "#";

  return (
    <div className="container-app py-12 pt-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Membership</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Run Your Import Business, No Shop Needed</h1>
        <p className="mt-4 text-charcoal/70">
          Membership is monthly. Once our team confirms your payment, access lasts 30 days.
          When the month ends, verification is switched off until you renew, pay again anytime
          to get re-verified.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl">
        <ul className="space-y-3">
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-soft">
              <FiCheck className="mt-0.5 shrink-0 text-brand-600" />
              <span className="text-sm text-charcoal/80">{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-12 max-w-xl">
        {isVerified ? (
          <div className="card p-8 text-center">
            <p className="font-display text-xl font-semibold text-green-700">You're a Verified Member ✅</p>
            <p className="mt-2 text-sm text-charcoal/70">
              Valid until {user.membershipExpiresAt ? new Date(user.membershipExpiresAt).toLocaleDateString() : "—"}.
              We'll notify you before it's time to renew.
            </p>
          </div>
        ) : showConfirmation ? (
          <div className="card p-8 text-center">
            <p className="font-display text-xl font-semibold">Request received — confirm your payment</p>
            <p className="mt-2 text-sm text-charcoal/70">
              Tap below to open WhatsApp with your details already filled in, then attach your payment
              receipt in the chat. Our team will verify you within 24 hours.
            </p>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 inline-flex">
              Open WhatsApp to confirm
            </a>
          </div>
        ) : (
          <div className="card p-8">
            {isExpired && (
              <p className="mb-4 rounded-xl bg-accent-600/10 p-3 text-sm font-medium text-accent-700">
                Your membership expired. Pay again below to get re-verified.
              </p>
            )}
            <h2 className="font-display text-xl font-semibold">Membership Fee</h2>
            <p className="mt-1 font-display text-3xl font-bold text-brand-700">
              {formatNaira(5000)} <span className="text-base font-normal text-charcoal/60">per month</span>
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

export default Membership;
