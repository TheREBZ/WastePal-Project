import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";
import { useRouter } from "../router/Router";
import "../styles/Auth.css";

const Login = () => {
  const { navigate } = useRouter();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    const value = field === "remember" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.email.trim()) next.email = "Email address is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";
    if (!form.password) next.password = "Password is required";
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
          <FontAwesomeIcon icon={faLeaf} className="auth-logo-icon" />
          <span>WastePal</span>
        </div>
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Log in to manage your eco-impact.</p>

        <form onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span>Email Address</span>
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="jane@example.com"
            />
            {errors.email && <em className="field-error">{errors.email}</em>}
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              placeholder="••••••••"
            />
            {errors.password && <em className="field-error">{errors.password}</em>}
          </label>

          <div className="auth-row">
            <label className="auth-checkbox">
              <input type="checkbox" checked={form.remember} onChange={handleChange("remember")} />
              Remember me
            </label>
            <Link to="/forgot-password" className="auth-link">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? "Logging in..." : "Login"}
          </button>
          <button type="submit" className="btn btn-primary btn-block">Login with Google</button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
