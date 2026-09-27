import { useEffect, useState } from "react";
import api from "../../lib/api.js";
import { useToast } from "../../context/ToastContext.jsx";

const blank = {
  bankName: "",
  accountName: "",
  accountNumber: "",
  paymentNote: "",
  whatsappNumber: "",
  deliveryFeeLagos: "",
  deliveryFeeOther: "",
};

const Settings = () => {
  const { showToast } = useToast();
  const [form, setForm] = useState(blank);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get("/settings")
      .then(({ data }) => setForm({ ...blank, ...data.settings }))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/settings", form);
      setForm({ ...blank, ...data.settings });
      showToast("Settings saved.");
    } catch (err) {
      showToast(err.response?.data?.message || "Could not save settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-charcoal/60">Loading settings...</p>;

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold">Settings</h1>

      <form onSubmit={handleSubmit} className="card max-w-xl space-y-4 p-6">
        <h2 className="font-display text-base font-semibold">Company Bank Details</h2>
        <p className="text-sm text-charcoal/60">Shown to customers on every payment page.</p>

        <div>
          <label className="label-field">Bank Name</label>
          <input name="bankName" value={form.bankName} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="label-field">Account Name</label>
          <input name="accountName" value={form.accountName} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="label-field">Account Number</label>
          <input name="accountNumber" value={form.accountNumber} onChange={handleChange} className="input-field" />
        </div>
        <div>
          <label className="label-field">Payment Note</label>
          <textarea name="paymentNote" value={form.paymentNote} onChange={handleChange} rows={3} className="input-field" />
        </div>

        <div className="border-t border-charcoal/10 pt-4">
          <label className="label-field">WhatsApp Confirmation Number (digits only)</label>
          <input name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} className="input-field" />
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-charcoal/10 pt-4">
          <div>
            <label className="label-field">Delivery Fee — Lagos (₦)</label>
            <input type="number" name="deliveryFeeLagos" value={form.deliveryFeeLagos} onChange={handleChange} className="input-field" />
          </div>
          <div>
            <label className="label-field">Delivery Fee — Other States (₦)</label>
            <input type="number" name="deliveryFeeOther" value={form.deliveryFeeOther} onChange={handleChange} className="input-field" />
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary w-full">
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default Settings;
