import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import { formatNaira } from "../lib/currency.js";
import api from "../lib/api.js";

const Checkout = () => {
  const { user } = useAuth();
  const { items, subtotal } = useCart();
  const navigate = useNavigate();

  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    phone: user?.phone || "",
    note: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/login?next=/checkout");
      return;
    }
    if (items.length === 0) {
      navigate("/cart");
      return;
    }
    api.get("/settings").then(({ data }) => setSettings(data.settings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!settings) {
    return <div className="container-app py-28 pt-32 text-center text-charcoal/60">Loading checkout...</div>;
  }

  const deliveryFee = form.state.toLowerCase().includes("lagos")
    ? settings.deliveryFeeLagos
    : settings.deliveryFeeOther;
  const total = subtotal + deliveryFee;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.street.trim()) next.street = "Street address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.state.trim()) next.state = "State is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!validate()) return;
    navigate("/checkout/payment", {
      state: {
        address: { street: form.street, city: form.city, state: form.state },
        phone: form.phone,
        note: form.note,
      },
    });
  };

  return (
    <div className="container-app py-12 pt-28">
      <h1 className="mb-8 font-display text-3xl font-semibold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <form onSubmit={handleContinue} className="card space-y-4 p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">Delivery Details</h2>

          <div>
            <label className="label-field">Street Address</label>
            <input name="street" value={form.street} onChange={handleChange} className="input-field" />
            {errors.street && <p className="field-error">{errors.street}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">City</label>
              <input name="city" value={form.city} onChange={handleChange} className="input-field" />
              {errors.city && <p className="field-error">{errors.city}</p>}
            </div>
            <div>
              <label className="label-field">State</label>
              <input name="state" value={form.state} onChange={handleChange} className="input-field" placeholder="e.g. Lagos" />
              {errors.state && <p className="field-error">{errors.state}</p>}
            </div>
          </div>

          <div>
            <label className="label-field">Phone Number</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="input-field" />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>

          <div>
            <label className="label-field">Order Note (optional)</label>
            <textarea name="note" value={form.note} onChange={handleChange} rows={3} className="input-field" />
          </div>

          <button type="submit" className="btn-primary w-full">
            Proceed to Payment
          </button>
        </form>

        <div className="card h-fit p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">Order Summary</h2>
          <ul className="mb-4 space-y-2 text-sm">
            {items.map((it) => (
              <li key={`${it.productId}-${it.size || "n"}`} className="flex justify-between text-charcoal/70">
                <span>{it.name} x{it.qty}{it.size ? ` (${it.size})` : ""}</span>
                <span>{formatNaira(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-1 border-t border-charcoal/10 pt-3 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatNaira(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{formatNaira(deliveryFee)}</span></div>
            <div className="flex justify-between font-display text-lg font-semibold"><span>Total</span><span>{formatNaira(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
