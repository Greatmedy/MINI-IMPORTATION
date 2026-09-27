import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../lib/api.js";
import { formatNaira } from "../../lib/currency.js";
import { useToast } from "../../context/ToastContext.jsx";

const orderStatusLabels = {
  pending_confirmation: "Pending confirmation",
  paid: "Paid",
  packaged: "Packaged",
  shipped: "Shipped",
  ready_for_delivery: "Ready for delivery",
  delivered: "Delivered",
};

const Toggle = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`relative h-8 w-14 shrink-0 rounded-full transition disabled:opacity-50 ${
      checked ? "bg-green-600" : "bg-charcoal/20"
    }`}
  >
    <span
      className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${
        checked ? "left-7" : "left-1"
      }`}
    />
  </button>
);

const UserDetail = () => {
  const { id } = useParams();
  const { showToast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savingStudent, setSavingStudent] = useState(false);
  const [savingMember, setSavingMember] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");

  const load = () => {
    setLoading(true);
    api
      .get(`/admin/users/${id}`)
      .then(({ data }) => {
        setData(data);
        setExpiryDate(
          data.user.membershipExpiresAt
            ? new Date(data.user.membershipExpiresAt).toISOString().slice(0, 10)
            : ""
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(load, [id]);

  if (loading) return <p className="text-charcoal/60">Loading student record...</p>;
  if (!data) return <p className="field-error">Could not load this user.</p>;

  const { user, orders, enrollments, membershipRequests } = data;

  const toggleStudent = async (next) => {
    setSavingStudent(true);
    try {
      const { data: res } = await api.patch(`/admin/users/${id}`, { isStudent: next });
      setData((d) => ({ ...d, user: res.user }));
      showToast(next ? "Student confirmed and registered." : "Academy access revoked.");
    } catch (err) {
      showToast(err.response?.data?.message || "Could not update student status.", "error");
    } finally {
      setSavingStudent(false);
    }
  };

  const toggleMembership = async (next) => {
    setSavingMember(true);
    try {
      const payload = { isMember: next };
      if (next && expiryDate) payload.membershipExpiresAt = new Date(expiryDate).toISOString();
      const { data: res } = await api.patch(`/admin/users/${id}`, payload);
      setData((d) => ({ ...d, user: res.user }));
      setExpiryDate(res.user.membershipExpiresAt ? new Date(res.user.membershipExpiresAt).toISOString().slice(0, 10) : "");
      showToast(next ? "Membership verified for 30 days." : "Membership revoked / marked expired.");
    } catch (err) {
      showToast(err.response?.data?.message || "Could not update membership status.", "error");
    } finally {
      setSavingMember(false);
    }
  };

  const saveExpiryOnly = async () => {
    if (!expiryDate) return;
    setSavingMember(true);
    try {
      const { data: res } = await api.patch(`/admin/users/${id}`, {
        isMember: true,
        membershipExpiresAt: new Date(expiryDate).toISOString(),
      });
      setData((d) => ({ ...d, user: res.user }));
      showToast("Expiry date updated.");
    } catch (err) {
      showToast(err.response?.data?.message || "Could not update expiry date.", "error");
    } finally {
      setSavingMember(false);
    }
  };

  return (
    <div>
      <Link to="/admin/users" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-charcoal/60 hover:text-brand-600">
        <FiArrowLeft /> Back to Students / Users
      </Link>

      <h1 className="mb-6 font-display text-2xl font-semibold">{user.name}</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card p-6 lg:col-span-1">
          <h2 className="mb-3 font-display text-base font-semibold">Profile</h2>
          <dl className="space-y-2 text-sm">
            <div><dt className="text-charcoal/50">Email</dt><dd>{user.email}</dd></div>
            <div><dt className="text-charcoal/50">Phone</dt><dd>{user.phone}</dd></div>
            <div>
              <dt className="text-charcoal/50">Delivery Address</dt>
              <dd>{user.address?.street}, {user.address?.city}, {user.address?.state}</dd>
            </div>
            <div><dt className="text-charcoal/50">Joined</dt><dd>{new Date(user.createdAt).toLocaleDateString()}</dd></div>
          </dl>
        </div>

        <div className="card p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Tutorial / Academy</h2>
            <span className="rounded-full bg-blush px-3 py-1 text-xs font-semibold">{user.studentStatus}</span>
          </div>
          <p className="mb-4 text-sm text-charcoal/60">
            ON = Confirm tutorial payment / Registered student. OFF = revoke academy access.
          </p>
          <div className="flex items-center gap-3">
            <Toggle checked={user.isStudent} onChange={toggleStudent} disabled={savingStudent} />
            <span className="text-sm font-medium">
              {user.isStudent ? "Registered student" : "Not registered"}
            </span>
          </div>
          {enrollments.length > 0 && (
            <div className="mt-4 border-t border-charcoal/10 pt-3 text-xs text-charcoal/50">
              Latest enrollment: {new Date(enrollments[0].createdAt).toLocaleString()} &middot; {formatNaira(enrollments[0].amount)}
            </div>
          )}
        </div>

        <div className="card p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-semibold">Membership</h2>
            <span className="rounded-full bg-blush px-3 py-1 text-xs font-semibold">{user.memberStatus}</span>
          </div>
          <p className="mb-4 text-sm text-charcoal/60">
            ON = Confirm this month's payment / Verified member (sets expiry +30 days). OFF = revoke / expired.
          </p>
          <div className="flex items-center gap-3">
            <Toggle checked={user.isMember} onChange={toggleMembership} disabled={savingMember} />
            <span className="text-sm font-medium">{user.isMember ? "Verified member" : "Not verified"}</span>
          </div>

          <div className="mt-4 border-t border-charcoal/10 pt-3">
            <label className="label-field">Expiry date</label>
            <div className="flex gap-2">
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="input-field"
              />
              <button onClick={saveExpiryOnly} disabled={savingMember} className="btn-secondary shrink-0 !px-3 text-xs">
                Save
              </button>
            </div>
            {user.membershipExpiresAt && (
              <p className="mt-1 text-xs text-charcoal/50">
                Current expiry: {new Date(user.membershipExpiresAt).toLocaleDateString()}
              </p>
            )}
          </div>

          {membershipRequests.length > 0 && (
            <div className="mt-4 border-t border-charcoal/10 pt-3 text-xs text-charcoal/50">
              Latest request: {new Date(membershipRequests[0].createdAt).toLocaleString()} &middot; {formatNaira(membershipRequests[0].amount)}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-4 font-display text-lg font-semibold">Orders</h2>
        {orders.length === 0 ? (
          <p className="card p-6 text-center text-sm text-charcoal/60">No orders yet.</p>
        ) : (
          <div className="space-y-2">
            {orders.map((o) => (
              <div key={o._id} className="card flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
                <span className="font-medium">#{o._id.slice(-6).toUpperCase()}</span>
                <span>{new Date(o.createdAt).toLocaleDateString()}</span>
                <span className="font-semibold">{formatNaira(o.total)}</span>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                  {orderStatusLabels[o.status]}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
