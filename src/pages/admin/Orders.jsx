import { useEffect, useState } from "react";
import api from "../../lib/api.js";
import { formatNaira } from "../../lib/currency.js";
import { useToast } from "../../context/ToastContext.jsx";

const statuses = [
  "pending_confirmation",
  "paid",
  "packaged",
  "shipped",
  "ready_for_delivery",
  "delivered",
];

const statusLabels = {
  pending_confirmation: "Pending confirmation",
  paid: "Paid",
  packaged: "Packaged",
  shipped: "Shipped",
  ready_for_delivery: "Ready for delivery",
  delivered: "Delivered",
};

const Orders = () => {
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const load = () => {
    setLoading(true);
    api
      .get("/admin/orders", { params: filter ? { status: filter } : {} })
      .then(({ data }) => setOrders(data.orders))
      .finally(() => setLoading(false));
  };

  useEffect(load, [filter]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/admin/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
      showToast("Order status updated.");
    } catch (err) {
      showToast(err.response?.data?.message || "Could not update status.", "error");
    }
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Orders</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="input-field w-auto">
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{statusLabels[s]}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-charcoal/60">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="card p-8 text-center text-charcoal/60">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-soft">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-charcoal/10 text-xs uppercase text-charcoal/50">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o._id} className="border-b border-charcoal/5 last:border-0">
                  <td className="px-4 py-3 font-medium">#{o._id.slice(-6).toUpperCase()}</td>
                  <td className="px-4 py-3">
                    <p>{o.user?.name}</p>
                    <p className="text-xs text-charcoal/50">{o.user?.phone}</p>
                  </td>
                  <td className="px-4 py-3 font-semibold">{formatNaira(o.total)}</td>
                  <td className="px-4 py-3 text-charcoal/60">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o._id, e.target.value)}
                      className="input-field w-auto !py-2 text-xs"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{statusLabels[s]}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
