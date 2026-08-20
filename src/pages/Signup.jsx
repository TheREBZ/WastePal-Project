import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faUser,
  faEnvelope,
  faPhone,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";
import { useRouter } from "../router/Router";
import "../styles/Auth.css";
import { saveRegistrationData } from "../services/registrationStorage";
import { registerUser } from "../services/authService";

const Signup = () => {
  const { navigate } = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field) => (e) => {
    const value =
      field === "agree" ? e.target.checked : e.target.value;

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const next = {};

    if (!form.firstName.trim()) {
      next.firstName = "First name is required";
    } else if (form.firstName.trim().length < 2) {
      next.firstName = "First name must be at least 2 characters";
    }

    if (!form.lastName.trim()) {
      next.lastName = "Last name is required";
    } else if (form.lastName.trim().length < 2) {
      next.lastName = "Last name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      next.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }

    if (!form.phoneNumber.trim()) {
      next.phoneNumber = "Phone number is required";
    } else if (
      !/^(\+234|0)[789][01]\d{8}$/.test(
        form.phoneNumber.replace(/\s/g, "")
      )
    ) {
      next.phoneNumber = "Enter a valid Nigerian phone number";
    }

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
    } else if (!/[^A-Za-z0-9]/.test(form.password)) {
      next.password = "Include at least one special character";
    }

    if (!form.confirmPassword) {
      next.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      next.confirmPassword = "Passwords do not match";
    }

    if (!form.agree) {
      next.agree = "You must agree to continue";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);
    setErrors((prev) => ({ ...prev, form: "" }));

    const payload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim().toLowerCase(),
      phoneNumber: form.phoneNumber.replace(/\s/g, ""),
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    try {
      await registerUser(payload);

      // Email + password are kept only long enough to silently log the
      // user in right after OTP verification (VerifyEmail.jsx), since
      // /auth/register and /auth/verify-email don't return tokens.
      // VerifyEmail.jsx clears the password out of storage once that
      // login call succeeds.
      saveRegistrationData({
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        password: form.password,
      });

      navigate("/verify-email");
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        form: error.message,
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignup = () => {
    // Google authentication will be implemented later.
  };

  return (
    <main className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">
          <FontAwesomeIcon icon={faLeaf} className="auth-logo-icon" />
          <span>ReNexa</span>
        </div>

        <h1>Create your account</h1>

        <p className="auth-subtitle">
          Start optimizing your waste management today.
        </p>

        <form onSubmit={handleSubmit} noValidate>

          <div className="auth-form-row">

            <label className="field">
              <span>First Name</span>

              <div className="field-with-icon">
                <FontAwesomeIcon icon={faUser} />

                <input
                  type="text"
                  value={form.firstName}
                  onChange={handleChange("firstName")}
                  placeholder="Jane"
                  autoComplete="given-name"
                />
              </div>

              {errors.firstName && (
                <em className="field-error">
                  {errors.firstName}
                </em>
              )}
            </label>

            <label className="field">
              <span>Last Name</span>

              <div className="field-with-icon">
                <FontAwesomeIcon icon={faUser} />

                <input
                  type="text"
                  value={form.lastName}
                  onChange={handleChange("lastName")}
                  placeholder="Doe"
                  autoComplete="family-name"
                />
              </div>

              {errors.lastName && (
                <em className="field-error">
                  {errors.lastName}
                </em>
              )}
            </label>

          </div>

          <label className="field">
            <span>Email Address</span>

            <div className="field-with-icon">
              <FontAwesomeIcon icon={faEnvelope} />

              <input
                type="email"
                value={form.email}
                onChange={handleChange("email")}
                placeholder="jane@example.com"
                autoComplete="email"
              />
            </div>

            {errors.email && (
              <em className="field-error">
                {errors.email}
              </em>
            )}
          </label>

          <label className="field">
            <span>Phone Number</span>

            <div className="field-with-icon">
              <FontAwesomeIcon icon={faPhone} />

              <input
                type="tel"
                value={form.phoneNumber}
                onChange={handleChange("phoneNumber")}
                placeholder="08101234567"
                autoComplete="tel"
              />
            </div>

            {errors.phoneNumber && (
              <em className="field-error">
                {errors.phoneNumber}
              </em>
            )}
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
            <span>Confirm Password</span>

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

          <label className="auth-checkbox auth-checkbox--terms">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={handleChange("agree")}
            />

            <span>
              I agree to the{" "}
              <Link to="/terms">Terms of Service</Link>{" "}
              and{" "}
              <Link to="/privacy">Privacy Policy</Link>.
            </span>
          </label>

          {errors.agree && (
            <em className="field-error">
              {errors.agree}
            </em>
          )}

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
            {submitting ? "Creating account..." : "Sign up"}
          </button>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={handleGoogleSignup}
          >
            Or Continue with Google
          </button>

        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Log in</Link>
        </p>

      </div>
    </main>
  );
};

export default Signup;