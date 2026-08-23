import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faLock,
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";
import { useRouter } from "../router/Router";
import "../styles/Auth.css";
import { resetPassword } from "../services/authService";

const ResetPassword = () => {
  const { navigate } = useRouter();

  const [token, setToken] = useState(null);
  const [tokenMissing, setTokenMissing] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // The backend's reset link points here as:
  // https://renexa.vercel.app/reset-password?token=<token>
  // Our router only matches exact paths (no /:token segments), so
  // the token travels as a query param instead and we read it
  // straight from the browser URL.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (!urlToken) {
      setTokenMissing(true);
    } else {
      setToken(urlToken);
    }
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const next = {};

    if (!form.password) {
      next.password = "Password is required";
    } else if (form.password.length < 8) {
      next.password = "Use at least 8 characters";
    } else if (!/[A-Z]/.test(form.password)) {
      next.password = "Include at least one uppercase letter";
    } else if (!/[a-z]/.test(form.password)) {
      next.password = "Include at least one lowercase letter";
    } else if (!/\d/.test(form.password)) {
      next.password = "Include at least one number";
    } else if (!/[@$!%*?&]/.test(form.password)) {
      next.password = "Include at least one special character";
    }

    if (!form.confirmPassword) {
      next.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      next.confirmPassword = "Passwords do not match";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (!token) {
      setErrors((prev) => ({
        ...prev,
        form: "This reset link is invalid or missing a token. Please request a new one.",
      }));
      return;
    }

    setSubmitting(true);
    setErrors((prev) => ({ ...prev, form: "" }));

    try {
      await resetPassword(token, form.password, form.confirmPassword);
      setSuccess(true);
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        form: err.message || "Unable to reset your password. Please try again.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  if (tokenMissing) {
    return (
      <main className="auth-page">
        <div className="auth-card">

          <div className="auth-logo">
            <FontAwesomeIcon
              icon={faLeaf}
              className="auth-logo-icon"
            />
            <span>ReNexa</span>
          </div>

          <div className="forgot-success">
            <div className="forgot-success-icon">
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>

            <h1>Invalid reset link</h1>

            <p className="auth-subtitle">
              This password reset link is missing or invalid.
              Please request a new one.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => navigate("/forgot-password")}
          >
            Request New Link
          </button>

        </div>
      </main>
    );
  }

  if (success) {
    return (
      <main className="auth-page">
        <div className="auth-card">

          <div className="auth-logo">
            <FontAwesomeIcon
              icon={faLeaf}
              className="auth-logo-icon"
            />
            <span>ReNexa</span>
          </div>

          <div className="forgot-success">
            <div className="forgot-success-icon">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>

            <h1>Password reset</h1>

            <p className="auth-subtitle">
              Your password has been successfully updated.
              You can now log in with your new password.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <FontAwesomeIcon
            icon={faLeaf}
            className="auth-logo-icon"
          />
          <span>ReNexa</span>
        </div>

        <h1>Reset your password</h1>

        <p className="auth-subtitle">
          Create a new password for your ReNexa account.
        </p>

        <form onSubmit={handleSubmit} noValidate>

          <label className="field">
            <span>New Password</span>

            <div className="field-with-icon">
              <FontAwesomeIcon icon={faLock} />

              <input
                type="password"
                value={form.password}
                onChange={handleChange("password")}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            {errors.password && (
              <em className="field-error">
                {errors.password}
              </em>
            )}
          </label>

          <label className="field">
            <span>Confirm New Password</span>

            <div className="field-with-icon">
              <FontAwesomeIcon icon={faLock} />

              <input
                type="password"
                value={form.confirmPassword}
                onChange={handleChange("confirmPassword")}
                placeholder="••••••••"
                autoComplete="new-password"
              />
            </div>

            {errors.confirmPassword && (
              <em className="field-error">
                {errors.confirmPassword}
              </em>
            )}
          </label>

          {errors.form && (
            <em className="field-error">
              {errors.form}
            </em>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting ? "Resetting..." : "Reset Password"}
          </button>

        </form>

        <p className="auth-footer">
          Remember your password?{" "}
          <Link to="/login">Back to Login</Link>
        </p>

      </div>
    </main>
  );
};

export default ResetPassword;