import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import api from "../lib/api.js";
import { formatNaira } from "../lib/currency.js";

const statusLabels = {
  none: "None",
  pending_confirmation: "Pending confirmation",
  verified: "Verified member",
  expired: "Expired",
  registered: "Registered student",
};

const orderStatusLabels = {
  pending_confirmation: "Pending confirmation",
  paid: "Paid",
  packaged: "Packaged",
  shipped: "Shipped",
  ready_for_delivery: "Ready for delivery",
  delivered: "Delivered",
};

const Account = () => {
  const { user, logout, updateUserLocal } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get("/orders/mine")
      .then(({ data }) => setOrders(data.orders))
      .finally(() => setLoadingOrders(false));
  }, []);

  if (!user) return null;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await api.put("/users/me", {
        name: form.name,
        phone: form.phone,
        address: { street: form.street, city: form.city, state: form.state },
      });
      updateUserLocal(data.user);
      showToast("Profile saved.");
    } catch (err) {
      showToast(err.response?.data?.message || "Could not save your profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="container-app py-12 pt-28">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">My Account</h1>
          <p className="text-charcoal/60">{user.email}</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary">
          Sign Out
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <form onSubmit={handleSave} className="card space-y-4 p-6 lg:col-span-2">
          <h2 className="font-display text-lg font-semibold">Profile</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-field">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="input-field" />
            </div>
          </div>
          <div>
            <label className="label-field">Street Address</label>
            <input name="street" value={form.street} onChange={handleChange} className="input-field" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">City</label>
              <input name="city" value={form.city} onChange={handleChange} className="input-field" />
            </div>
            <div>
              <label className="label-field">State</label>
              <input name="state" value={form.state} onChange={handleChange} className="input-field" />
            </div>
          </div>
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="font-display text-base font-semibold">Membership</h2>
            <p className="mt-2 text-sm">
              Status: <span className="font-semibold">{statusLabels[user.memberStatus]}</span>
            </p>
            {user.memberStatus === "verified" && user.membershipExpiresAt && (
              <p className="mt-1 text-sm text-charcoal/60">
                Valid until {new Date(user.membershipExpiresAt).toLocaleDateString()}
              </p>
            )}

            {user.memberStatus === "verified" && (
              <div className="mt-3 rounded-xl bg-blush p-3 text-sm">
                <p className="text-charcoal/70">Use the link below to source from 1688.com</p>
                <a  href="https://www.1688.com" target="_blank" rel="noopener noreferrer" className="btn-primary mt-2 w-full">
                  Go to 1688.com
                </a>
              </div>
            )}
            {user.memberStatus === "expired" && (
              <div className="mt-2">
                <p className="text-sm text-accent-600">Membership expired — renew {formatNaira(5000)}</p>
                <Link to="/membership" className="text-sm font-semibold text-brand-700 hover:underline">
                  Renew now
                </Link>
              </div>
            )}
            {user.memberStatus === "none" && (
              <Link to="/membership" className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:underline">
                Become a member
              </Link>
            )}
          </div>

          <div className="card p-6">
            <h2 className="font-display text-base font-semibold">Academy</h2>
            <p className="mt-2 text-sm">
              Status: <span className="font-semibold">{statusLabels[user.studentStatus]}</span>
            </p>
            {user.studentStatus === "registered" ? (
              <Link to="/account/academy" className="btn-primary mt-3 w-full">
                Watch academy lessons
              </Link>
            ) : (
              <div className="mt-3 rounded-xl bg-blush p-3 text-sm text-charcoal/70">
                <p>Enroll and wait for admin confirmation to unlock your lessons.</p>
                <Link to="/academy" className="mt-1 inline-block font-semibold text-brand-700 hover:underline">
                  Go to Academy
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-display text-xl font-semibold">Order History</h2>
        {loadingOrders ? (
          <p className="text-charcoal/60">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="card p-8 text-center text-charcoal/60">
            No orders yet.{" "}
            <Link to="/shop" className="font-semibold text-brand-700 hover:underline">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o._id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <p className="font-medium">Order #{o._id.slice(-6).toUpperCase()}</p>
                  <p className="text-xs text-charcoal/50">
                    {new Date(o.createdAt).toLocaleDateString()} &middot; {o.items.length} item(s)
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display font-semibold">{formatNaira(o.total)}</span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {orderStatusLabels[o.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
