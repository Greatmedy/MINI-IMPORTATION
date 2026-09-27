import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";

const Register = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get("next") || "/account";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    street: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    if (form.password.length < 6) next.password = "Password must be at least 6 characters.";
    if (form.confirmPassword !== form.password) next.confirmPassword = "Passwords do not match.";
    if (!form.street.trim()) next.street = "Street address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.state.trim()) next.state = "State is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const user = await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        confirmPassword: form.confirmPassword,
        address: { street: form.street, city: form.city, state: form.state },
      });
      showToast(`Welcome to FOA, ${user.name.split(" ")[0]}!`);
      navigate(next);
    } catch (err) {
      setErrors({ form: err.response?.data?.message || "Registration failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-app flex items-center justify-center py-16 pt-28">
      <div className="card w-full max-w-xl p-8">
        <h1 className="font-display text-2xl font-semibold">Create Your Account</h1>
        <p className="mt-1 text-sm text-charcoal/60">
          Join FOA to shop, enroll in Academy, and become a member.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label-field">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} className="input-field" />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="input-field" />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>
            <div>
              <label className="label-field">Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="080..." className="input-field" />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label-field">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} className="input-field" />
              {errors.password && <p className="field-error">{errors.password}</p>}
            </div>
            <div>
              <label className="label-field">Confirm Password</label>
              <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="input-field" />
              {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
            </div>
          </div>

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
              <input name="state" value={form.state} onChange={handleChange} placeholder="e.g. Lagos" className="input-field" />
              {errors.state && <p className="field-error">{errors.state}</p>}
            </div>
          </div>

          {errors.form && <p className="field-error">{errors.form}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full">
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-charcoal/60">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand-700 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
