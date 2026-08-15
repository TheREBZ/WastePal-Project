import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";
import { useRouter } from "../router/Router";
import "../styles/Auth.css";

const ForgotPassword = () => {
  const { navigate } = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Email address is required");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address");
      return;
    }

    setSubmitting(true);

    // API integration will be added later.
    // POST:
    // https://renexa.onrender.com/api/auth/forgot-password

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <main className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <FontAwesomeIcon icon={faLeaf} className="auth-logo-icon" />
          <span>ReNexa</span>
        </div>

        {!submitted ? (
          <>
            <h1>Forgot Password?</h1>

            <p className="auth-subtitle">
              Enter the email address associated with your account and
              we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <label className="field">
                <span>Email Address</span>

                <div className="field-with-icon">
                  <FontAwesomeIcon icon={faEnvelope} />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    placeholder="jane@example.com"
                    autoComplete="email"
                  />
                </div>

                {error && (
                  <em className="field-error">{error}</em>
                )}
              </label>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={submitting}
              >
                {submitting ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="auth-footer">
              Remember your password?{" "}
              <Link to="/login">Back to Login</Link>
            </p>
          </>
        ) : (
          <>
            <div className="forgot-success">
              <div className="forgot-success-icon">
                ✓
              </div>

              <h1>Check your email</h1>

              <p className="auth-subtitle">
                If an account exists for <strong>{email}</strong>, a
                password reset link has been sent to that address.
              </p>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() => navigate("/login")}
            >
              Back to Login
            </button>

            <p className="auth-footer">
              Didn't receive the email?{" "}
              <button
                type="button"
                className="auth-inline-button"
                onClick={() => setSubmitted(false)}
              >
                Try again
              </button>
            </p>
          </>
        )}

      </div>
    </main>
  );
};

export default ForgotPassword;
