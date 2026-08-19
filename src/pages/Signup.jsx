import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";
import { useRouter } from "../router/Router";
import "../styles/Auth.css";

const Signup = () => {
  const { navigate } = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "", password: "", agree: false });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    const value = field === "agree" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    if (!form.email.trim()) next.email = "Email address is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!form.password) next.password = "Password is required";
    else if (form.password.length < 8) next.password = "Use at least 8 characters";
    if (!form.agree) next.agree = "You must agree to continue";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/dashboard");
    }, 700);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/assets/Horizontal-logo-2.png" alt="Renexa Logo" width={100} height={60} />
        </div>
        <h1>Create your account</h1>
        <p className="auth-subtitle">Start optimizing your waste management today.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Full Name</span>
            <div className="field-with-icon">
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                value={form.fullName}
                onChange={handleChange("fullName")}
                placeholder="Jane Doe"
              />
            </div>
            {errors.fullName && <em className="field-error">{errors.fullName}</em>}
          </label>

          <label className="field">
            <span>Email Address</span>
            <div className="field-with-icon">
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="jane@example.com"
              />
            </div>
            {errors.email && <em className="field-error">{errors.email}</em>}
          </label>

          <label className="field">
            <span>Password</span>
            <div className="field-with-icon">
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                placeholder="••••••••"
              />
            </div>
            {errors.password && <em className="field-error">{errors.password}</em>}
          </label>

          <label className="auth-checkbox auth-checkbox--terms">
            <input type="checkbox" checked={form.agree} onChange={handleChange("agree")} />
            <span>
              I agree to the <Link to="/terms">Terms of Service</Link> and{" "}
              <Link to="/privacy">Privacy Policy</Link>.
            </span>
          </label>
          {errors.agree && <em className="field-error">{errors.agree}</em>}

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
};

export default Signup;
