import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next") || "/account";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const user = await login(form.email, form.password);
      showToast(`Welcome back, ${user.name.split(" ")[0]}!`);
      navigate(user.role === "admin" ? "/admin" : next);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-app flex min-h-[80vh] items-center justify-center py-16 pt-28">
      <div className="card w-full max-w-md p-8">
        <h1 className="font-display text-2xl font-semibold">Welcome Back</h1>
        <p className="mt-1 text-sm text-charcoal/60">Log in to manage your orders, academy access, and membership.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label-field">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-field" />
          </div>
          <div>
            <label className="label-field">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="input-field" />
          </div>
          {error && <p className="field-error">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-charcoal/60">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-brand-700 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
