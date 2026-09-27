import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import api from "../lib/api.js";
import { formatNaira } from "../lib/currency.js";
import { buildWhatsAppUrl, buildOrderMessage } from "../lib/whatsapp.js";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, subtotal, clearCart } = useCart();
  const { showToast } = useToast();

  const draft = location.state;

  const [settings, setSettings] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!draft || items.length === 0) {
      navigate("/cart");
      return;
    }
    api.get("/settings").then(({ data }) => setSettings(data.settings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!settings || !draft) {
    return <div className="container-app py-28 pt-32 text-center text-charcoal/60">Loading payment details...</div>;
  }

  const deliveryFee = draft.address.state.toLowerCase().includes("lagos")
    ? settings.deliveryFeeLagos
    : settings.deliveryFeeOther;
  const total = subtotal + deliveryFee;

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      const payload = {
        items: items.map((it) => ({ product: it.productId, name: it.name, qty: it.qty, size: it.size })),
        address: draft.address,
        phone: draft.phone,
        note: draft.note,
      };
      const { data } = await api.post("/orders", payload);
      setOrder(data.order);
      clearCart();
    } catch (err) {
      showToast(err.response?.data?.message || "Could not save your order.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (order) {
    const whatsappHref = buildWhatsAppUrl(
      buildOrderMessage({ order, name: user.name, phone: draft.phone })
    );
    return (
      <div className="container-app py-16 pt-32">
        <div className="card mx-auto max-w-xl p-8 text-center">
          <p className="font-display text-2xl font-semibold text-green-700">Order Received! 🎉</p>
          <p className="mt-2 text-sm text-charcoal/70">
            Order <span className="font-semibold">#{order._id.slice(-6).toUpperCase()}</span> has been saved.
            Tap below to open WhatsApp with your order details already filled in, then attach your payment
            receipt in the chat so we can confirm and start processing.
          </p>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-flex">
            Open WhatsApp to confirm
          </a>
          <div className="mt-4">
            <Link to="/account" className="text-sm font-semibold text-brand-700 hover:underline">
              Go to my account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-12 pt-28">
      <h1 className="mb-8 font-display text-3xl font-semibold">Payment</h1>

      <div className="mx-auto max-w-xl">
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold">Pay by Bank Transfer</h2>
          <div className="mt-4 space-y-1 rounded-xl bg-blush p-4 text-sm">
            <p><span className="font-medium">Bank:</span> {settings.bankName}</p>
            <p><span className="font-medium">Account Name:</span> {settings.accountName}</p>
            <p><span className="font-medium">Account Number:</span> {settings.accountNumber}</p>
            <p className="mt-2 text-charcoal/60">{settings.paymentNote}</p>
          </div>

          <div className="mt-5 space-y-1 border-t border-charcoal/10 pt-4 text-sm">
            <div className="flex justify-between"><span>Goods subtotal</span><span>{formatNaira(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery fee</span><span>{formatNaira(deliveryFee)}</span></div>
            <div className="flex justify-between font-display text-xl font-bold"><span>Amount to pay</span><span>{formatNaira(total)}</span></div>
          </div>

          <button onClick={handleConfirm} disabled={submitting} className="btn-primary mt-6 w-full">
            {submitting ? "Saving order..." : "I have made the payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
