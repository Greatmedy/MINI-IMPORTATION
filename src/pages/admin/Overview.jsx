import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../lib/api.js";

const StatCard = ({ label, value }) => (
  <div className="card p-5">
    <p className="text-sm text-charcoal/60">{label}</p>
    <p className="mt-1 font-display text-3xl font-bold">{value}</p>
  </div>
);

const Overview = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/overview").then(({ data }) => setData(data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-charcoal/60">Loading overview...</p>;
  if (!data) return <p className="field-error">Could not load the overview.</p>;

  const { counts, pendingTutorialQueue, pendingMembershipQueue } = data;

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold">Overview</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Registered Users" value={counts.registeredUsers} />
        <StatCard label="Pending Tutorial" value={counts.pendingTutorial} />
        <StatCard label="Pending Membership" value={counts.pendingMembership} />
        <StatCard label="Open Orders" value={counts.openOrders} />
        <StatCard label="Published Lessons" value={counts.publishedLessons} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h2 className="mb-3 font-display text-lg font-semibold">Pending Tutorial Confirmations</h2>
          {pendingTutorialQueue.length === 0 ? (
            <p className="text-sm text-charcoal/50">Nothing pending.</p>
          ) : (
            <ul className="space-y-2">
              {pendingTutorialQueue.map((u) => (
                <li key={u._id} className="flex items-center justify-between rounded-xl bg-blush p-3 text-sm">
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-charcoal/50">{u.phone} &middot; {new Date(u.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Link to={`/admin/users/${u._id}`} className="btn-primary !px-3 !py-1.5 text-xs">
                    Verify
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-5">
          <h2 className="mb-3 font-display text-lg font-semibold">Pending Membership Confirmations</h2>
          {pendingMembershipQueue.length === 0 ? (
            <p className="text-sm text-charcoal/50">Nothing pending.</p>
          ) : (
            <ul className="space-y-2">
              {pendingMembershipQueue.map((u) => (
                <li key={u._id} className="flex items-center justify-between rounded-xl bg-blush p-3 text-sm">
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-charcoal/50">{u.phone} &middot; {new Date(u.createdAt).toLocaleDateString()}</p>
                  </div>
                  <Link to={`/admin/users/${u._id}`} className="btn-primary !px-3 !py-1.5 text-xs">
                    Verify
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
