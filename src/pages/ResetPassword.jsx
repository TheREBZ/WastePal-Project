import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faLock,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";
import { useRouter } from "../router/Router";
import "../styles/Auth.css";

const ResetPassword = () => {
  const { navigate } = useRouter();

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  /*
    The backend sends the reset token as part of the reset URL:

    /reset-password/:token

    We'll extract that token when we connect the real API.
    For now, the page is frontend-only.
  */

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    // API integration will be added later.
    //
    // POST:
    // /api/auth/reset-password/:token
    //
    // Body:
    // {
    //   password,
    //   confirmPassword
    // }

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 700);
  };

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