import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faCity,
  faMap,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import "../styles/Auth.css";
import {
  getRegistrationData,
  clearRegistrationData,
} from "../services/registrationStorage";
import { completeProfile } from "../services/authService";
import { getAccessToken, getRefreshToken, getCurrentUser, saveAuthSession } from "../services/authStorage";

const HouseholdProfile = () => {
  const { navigate } = useRouter();

  const [form, setForm] = useState({
    city: "",
    lga: "",
    addressText: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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

    if (!form.city.trim()) {
      next.city = "City is required";
    }

    if (!form.lga.trim()) {
      next.lga = "LGA is required";
    }

    if (!form.addressText.trim()) {
      next.addressText = "Address is required";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const registrationData = getRegistrationData();
    const accessToken = getAccessToken();

    if (!registrationData || !accessToken) {
      navigate("/signup");
      return;
    }

    setSubmitting(true);
    setErrors((prev) => ({ ...prev, form: "" }));

    try {
      // Backend's completeProfileSchema (household branch) expects
      // exactly: role, lga, city, residentialAddress
      const response = await completeProfile(
        {
          role: "household",
          city: form.city.trim(),
          lga: form.lga.trim(),
          residentialAddress: form.addressText.trim(),
        },
        accessToken
      );

      // Merge the updated user (now with address fields) into the
      // stored session so Dashboard/Settings see it immediately.
      const updatedUser = response?.data?.user;

      if (updatedUser) {
        saveAuthSession({
          accessToken,
          refreshToken: getRefreshToken(),
          user: { ...getCurrentUser(), ...updatedUser },
        });
      }

      // Registration is complete — no need to keep the staging data around.
      clearRegistrationData();
      navigate("/dashboard");
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: err.message }));
    } finally {
      setSubmitting(false);
    }
  };

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

        <h1>Household Profile</h1>

        <p className="auth-subtitle">
          Tell us a little about where you live.
        </p>

        <form onSubmit={handleSubmit} noValidate>

          <label className="field">
            <span>City</span>

            <div className="field-with-icon">
              <FontAwesomeIcon icon={faCity} />

              <input
                type="text"
                value={form.city}
                onChange={handleChange("city")}
                placeholder="Lagos"
              />
            </div>

            {errors.city && (
              <em className="field-error">
                {errors.city}
              </em>
            )}
          </label>

          <label className="field">
            <span>Local Government Area</span>

            <div className="field-with-icon">
              <FontAwesomeIcon icon={faMap} />

              <input
                type="text"
                value={form.lga}
                onChange={handleChange("lga")}
                placeholder="Surulere"
              />
            </div>

            {errors.lga && (
              <em className="field-error">
                {errors.lga}
              </em>
            )}
          </label>

          <label className="field">
            <span>Residential Address</span>

            <div className="field-with-icon">
              <FontAwesomeIcon icon={faHouse} />

              <input
                type="text"
                value={form.addressText}
                onChange={handleChange("addressText")}
                placeholder="123 Example Street"
              />
            </div>

            {errors.addressText && (
              <em className="field-error">
                {errors.addressText}
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
            {submitting ? "Saving..." : "Continue"}
          </button>

        </form>

      </div>
    </main>
  );
};

export default HouseholdProfile;