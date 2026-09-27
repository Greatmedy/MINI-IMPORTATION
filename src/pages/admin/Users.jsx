import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import api from "../../lib/api.js";

const filters = [
  { value: "", label: "All" },
  { value: "student_pending", label: "Pending tutorial" },
  { value: "student_registered", label: "Registered student" },
  { value: "member_pending", label: "Pending membership" },
  { value: "member_verified", label: "Verified member" },
  { value: "member_expired", label: "Expired membership" },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (q) params.q = q;
    if (filter === "student_pending") params.studentStatus = "pending_confirmation";
    if (filter === "student_registered") params.studentStatus = "registered";
    if (filter === "member_pending") params.memberStatus = "pending_confirmation";
    if (filter === "member_verified") params.memberStatus = "verified";
    if (filter === "member_expired") params.memberStatus = "expired";

    const timeout = setTimeout(() => {
      api.get("/admin/users", { params }).then(({ data }) => setUsers(data.users)).finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [q, filter]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">Students / Users</h1>
        <div className="relative w-full sm:w-64">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, phone..."
            className="input-field pl-9"
          />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              filter === f.value ? "bg-brand-600 text-white" : "bg-white text-charcoal/70 hover:bg-blush"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-charcoal/60">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="card p-8 text-center text-charcoal/60">No users match this filter.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-soft">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-charcoal/10 text-xs uppercase text-charcoal/50">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">City / State</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Membership</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="cursor-pointer border-b border-charcoal/5 last:border-0 hover:bg-blush"
                >
                  <td className="px-4 py-3">
                    <Link to={`/admin/users/${u._id}`} className="font-medium hover:underline">
                      {u.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">{u.email}</td>
                  <td className="px-4 py-3 text-charcoal/70">{u.phone}</td>
                  <td className="px-4 py-3 text-charcoal/70">{u.address?.city}, {u.address?.state}</td>
                  <td className="px-4 py-3 text-charcoal/60">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blush px-2 py-1 text-xs font-medium">{u.studentStatus}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-blush px-2 py-1 text-xs font-medium">{u.memberStatus}</span>
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

export default Users;
