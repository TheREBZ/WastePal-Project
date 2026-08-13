import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLocationDot, faPlus } from "@fortawesome/free-solid-svg-icons";

const INITIAL_PROFILE = {
  firstName: "Esther",
  lastName: "Reyes",
  email: "esther.reyes@example.com",
  phone: "080-0123-4567",
};

const ADDRESSES = [
  { label: "Home (Default)", address: "123 Elm Way, Lagos, Nigeria" },
  { label: "Office", address: "456 Corporate estate, Abuja, Nigeria" },
];

const DashboardSettings = () => {
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [draft, setDraft] = useState(INITIAL_PROFILE);
  const [preferences, setPreferences] = useState({
    smartNotifications: true,
    smsAlerts: true,
    darkMode: false,
  });
  const [language, setLanguage] = useState("English (US)");
  const [savedMessage, setSavedMessage] = useState("");

  const handleField = (field) => (e) => {
    setDraft((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCancel = () => {
    setDraft(profile);
    setSavedMessage("");
  };

  const handleSave = () => {
    setProfile(draft);
    setSavedMessage("Your changes have been saved.");
    setTimeout(() => setSavedMessage(""), 2500);
  };

  return (
    <div className="dash-settings">
      <div className="dash-settings-grid">
        <section className="dash-panel">
          <h2>Personal Information</h2>
          <div className="dash-profile-photo">
            <span className="dash-profile-avatar">
              <FontAwesomeIcon icon={faUser} />
            </span>
            <button type="button" className="btn btn-sm btn-outline">
              Change Photo
            </button>
            <span className="dash-photo-hint">Recommended 400x400px</span>
          </div>

          <div className="dash-form-grid">
            <label className="field">
              <span>First Name</span>
              <input type="text" value={draft.firstName} onChange={handleField("firstName")} />
            </label>
            <label className="field">
              <span>Last Name</span>
              <input type="text" value={draft.lastName} onChange={handleField("lastName")} />
            </label>
            <label className="field">
              <span>Email Address</span>
              <input type="email" value={draft.email} onChange={handleField("email")} />
            </label>
            <label className="field">
              <span>Phone Number</span>
              <input type="tel" value={draft.phone} onChange={handleField("phone")} />
            </label>
          </div>
        </section>

        <section className="dash-panel">
          <div className="dash-panel-header">
            <h2>Addresses</h2>
            <button type="button" className="dash-link-btn">
              <FontAwesomeIcon icon={faPlus} /> Add
            </button>
          </div>
          <div className="dash-address-list">
            {ADDRESSES.map((addr) => (
              <div className="dash-address-item" key={addr.label}>
                <span className="dash-address-icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                <div>
                  <p className="dash-table-primary">{addr.label}</p>
                  <p className="dash-table-secondary">{addr.address}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="dash-preferences-title">Preferences</h2>
          <div className="dash-preference-row">
            <div>
              <p className="dash-table-primary">Smart Notifications</p>
              <p className="dash-table-secondary">Receive updates about your pickups and rewards</p>
            </div>
            <button
              type="button"
              className={`dash-toggle ${preferences.smartNotifications ? "dash-toggle--on" : ""}`}
              onClick={() => togglePreference("smartNotifications")}
              aria-pressed={preferences.smartNotifications}
              aria-label="Toggle smart notifications"
            >
              <span />
            </button>
          </div>

          <div className="dash-preference-row">
            <div>
              <p className="dash-table-primary">SMS Alerts</p>
              <p className="dash-table-secondary">Text reminders 1 hour before pickup</p>
            </div>
            <button
              type="button"
              className={`dash-toggle ${preferences.smsAlerts ? "dash-toggle--on" : ""}`}
              onClick={() => togglePreference("smsAlerts")}
              aria-pressed={preferences.smsAlerts}
              aria-label="Toggle SMS alerts"
            >
              <span />
            </button>
          </div>

          <div className="dash-preference-row">
            <div>
              <p className="dash-table-primary">Dark Mode</p>
              <p className="dash-table-secondary">Currently follows your device theme</p>
            </div>
            <button
              type="button"
              className={`dash-toggle ${preferences.darkMode ? "dash-toggle--on" : ""}`}
              onClick={() => togglePreference("darkMode")}
              aria-pressed={preferences.darkMode}
              aria-label="Toggle dark mode"
            >
              <span />
            </button>
          </div>

          <label className="field">
            <span>Language</span>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </label>
        </section>
      </div>

      <div className="dash-settings-actions">
        {savedMessage && <p className="contact-success">{savedMessage}</p>}
        <button type="button" className="btn btn-outline" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default DashboardSettings;
