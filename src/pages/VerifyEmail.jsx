import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";
import { useRouter } from "../router/Router";
import "../styles/VerifyEmail.css";

const VerifyEmail = () => {
  const { navigate } = useRouter();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setOtp(value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    setSubmitting(true);

    // API integration will be added here.
    // POST:
    // https://renexa.onrender.com/api/auth/verify-email

    setTimeout(() => {
      setSubmitting(false);
      navigate("/login");
    }, 700);
  };

  return (
    <main className="auth-page verify-page">
      <div className="auth-card verify-card">

        <div className="auth-logo">
          <FontAwesomeIcon icon={faLeaf} className="auth-logo-icon" />
          <span>Renexa</span>
        </div>

        <div className="verify-icon">
          <FontAwesomeIcon icon={faEnvelope} />
        </div>

        <h1>Verify your email</h1>

        <p className="auth-subtitle">
          We've sent a 6-digit verification code to your email address.
          Enter the code below to verify your account.
        </p>

        <form onSubmit={handleSubmit} noValidate>

          <label className="field verify-field">
            <span>Verification Code</span>

            <input
              className="otp-input"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={handleChange}
              placeholder="000000"
              aria-label="6-digit verification code"
            />

            {error && (
              <em className="field-error">{error}</em>
            )}
          </label>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={submitting}
          >
            {submitting ? "Verifying..." : "Verify Email"}
          </button>

        </form>

        <p className="verify-helper">
          Didn't receive the code?
        </p>

        <button
          type="button"
          className="verify-resend"
          onClick={() => {
            // Resend OTP endpoint can be added when the backend supports it.
          }}
        >
          Resend code
        </button>

        <p className="auth-footer">
          Already verified?{" "}
          <Link to="/login">Log in</Link>
        </p>

      </div>
    </main>
  );
};

export default VerifyEmail;