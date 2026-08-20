import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";
import { useRouter } from "../router/Router";
import "../styles/VerifyEmail.css";
import { verifyEmail, resendOtp } from "../services/authService";
import { saveAuthSession } from "../services/authStorage";
import {
  getRegistrationData,
  saveRegistrationData,
} from "../services/registrationStorage";

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
    setError("");
  
    const registrationData = getRegistrationData();
  
    if (!registrationData?.email) {
      setSubmitting(false);
      navigate("/signup");
      return;
    }
  
    try {
      // Verify the OTP.
      // The backend also returns access + refresh tokens here.
      const response = await verifyEmail(otp);
  
      const { accessToken, refreshToken, user } = response.data;
  
      // Save the authenticated session returned by verification.
      saveAuthSession({
        accessToken,
        refreshToken,
        user,
      });
  
      // Keep the registration details needed for the next
      // onboarding steps, but remove the password immediately.
      saveRegistrationData({
        ...registrationData,
        password: undefined,
      });
  
      navigate("/register");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    const registrationData = getRegistrationData();

    if (!registrationData?.email) return;

    setError("");

    try {
      await resendOtp(registrationData.email);
    } catch (err) {
      setError(err.message);
    }
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
          onClick={handleResend}
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