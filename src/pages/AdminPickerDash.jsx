import { useState } from "react";
import "../styles/AdminPickerDash.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const ZONES = [
  "Surelere",
  "Amuwo-Odofin",
  "Lagos-Island",
  "Ikeja",
];

const CLIENT_TYPES = [
  "Household",
  "Small Business",
  "Household & Small shops",
  "Large Busineses",
];

const AdminPickerDash = () => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    clientType: "",
    zone: ZONES[0],
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    setSaved(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSaved(true);
  };

  return (
    <main className="auth-page admin-dash">
      <h1 className="dash-head">
        PICKER DASHBOARD <span>(ADMIN SIDE)</span>
      </h1>

      <p className="dash-notice">
        Only admins can see this page
      </p>

      {/* Create Picker */}

      <section className="auth-card admin-dash-content">
        <h1>Create Picker Profile</h1>

        <form onSubmit={handleSubmit}>
          <label className="field">
            <span>Full Name</span>

            <div>
              <input
                type="text"
                placeholder="Enter picker name"
                value={form.fullName}
                onChange={handleChange("fullName")}
                required
              />
            </div>
          </label>

          <label className="field">
            <span>Phone Number</span>

            <div>
              <input
                type="tel"
                placeholder="Enter picker phone number"
                value={form.phone}
                onChange={handleChange("phone")}
                required
              />
            </div>
          </label>

          <label className="field">
            <span>Client Type</span>

            <div>
              <select
                value={form.clientType}
                onChange={handleChange("clientType")}
                required
              >
                <option value="" disabled>
                  Select client type
                </option>

                {CLIENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="field">
            <span>Zone</span>

            <div>
              <select
                value={form.zone}
                onChange={handleChange("zone")}
                required
              >
                {ZONES.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <button
            type="submit"
            className="btn btn-primary btn-block"
          >
            Save Picker Profile
          </button>

          {saved && (
            <p className="picker-save-success">
              Picker profile saved successfully.
            </p>
          )}
        </form>
      </section>

      {/* Profile Preview */}

      <h1>Profile Example</h1>

      <section className="picker-example-container">
        <div>
          <div className="auth-card picker-details-container">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="picker-example-icon-container"
            />

            <p className="picker-status">
              Active
            </p>

            <div className="picker-details">
              <div className="picker-info">
                <h1>Full Name</h1>
                <p>
                  {form.fullName || "Picker Name"}
                </p>
              </div>

              <div className="picker-info">
                <h1>Phone Number</h1>
                <p>
                  {form.phone || "080XXXXXXXX"}
                </p>
              </div>

              <div className="picker-info">
                <h1>Zone</h1>
                <p>
                  {form.zone}
                </p>
              </div>

              <div className="picker-info">
                <h1>Client Type</h1>
                <p>
                  {form.clientType || "Household"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminPickerDash;