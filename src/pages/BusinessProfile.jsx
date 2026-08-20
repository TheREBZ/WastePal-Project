import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faBuilding,
  faCity,
  faMap,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import "../styles/Auth.css";
import {
  getRegistrationData,
  clearRegistrationData,
} from "../services/registrationStorage";
import { completeProfile } from "../services/authService";
import { getAccessToken } from "../services/authStorage";

const BusinessProfile = () => {
  const { navigate } = useRouter();

  const [form, setForm] = useState({
    businessName: "",
    businessType: "",
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

    if (!form.businessName.trim()) {
      next.businessName = "Business name is required";
    }

    if (!form.businessType.trim()) {
      next.businessType = "Business type is required";
    }

    if (!form.city.trim()) {
      next.city = "City is required";
    }

    if (!form.lga.trim()) {
      next.lga = "LGA is required";
    }

    if (!form.addressText.trim()) {
      next.addressText = "Business address is required";
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
      // Backend's completeProfileSchema (business branch) expects
      // exactly: role, businessName, businessType, businesscity,
      // businessLga, businessAddress — note "businesscity" is lowercase
      // "c" on the backend, matching that exactly here.
      await completeProfile(
        {
          role: "business_owner",
          businessName: form.businessName.trim(),
          businessType: form.businessType.trim(),
          businesscity: form.city.trim(),
          businessLga: form.lga.trim(),
          businessAddress: form.addressText.trim(),
        },
        accessToken
      );

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

        <h1>Business Profile</h1>

        <p className="auth-subtitle">
          Tell us a little about your business.
        </p>

        <form onSubmit={handleSubmit} noValidate>

          <label className="field">
            <span>Business Name</span>

            <div className="field-with-icon">
              <FontAwesomeIcon icon={faBuilding} />

              <input
                type="text"
                value={form.businessName}
                onChange={handleChange("businessName")}
                placeholder="Acme Ltd"
              />
            </div>

            {errors.businessName && (
              <em className="field-error">
                {errors.businessName}
              </em>
            )}
          </label>

          <label className="field">
            <span>Business Type</span>

            <div className="field-with-icon">
              <FontAwesomeIcon icon={faBuilding} />

              <input
                type="text"
                value={form.businessType}
                onChange={handleChange("businessType")}
                placeholder="Restaurant"
              />
            </div>

            {errors.businessType && (
              <em className="field-error">
                {errors.businessType}
              </em>
            )}
          </label>

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
            <span>Business Address</span>

            <div className="field-with-icon">
              <FontAwesomeIcon icon={faLocationDot} />

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

export default BusinessProfile;