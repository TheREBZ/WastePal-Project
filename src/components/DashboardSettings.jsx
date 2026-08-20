import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLocationDot,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { updateProfile } from "../services/authService";
import {
  getAccessToken,
  getCurrentUser,
  saveAuthSession,
} from "../services/authStorage";

const DashboardSettings = () => {
  const currentUser = getCurrentUser();

  const initialProfile = {
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phoneNumber || "",
  };

  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);

  const [preferences, setPreferences] = useState({
    smartNotifications: currentUser?.notificationsEnabled ?? true,
    smsAlerts: true,
    darkMode: false,
  });

  const [language, setLanguage] = useState(
    currentUser?.preferredLanguage || "English (US)"
  );

  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const handleField = (field) => (e) => {
    setDraft((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));

    setSavedMessage("");
    setErrorMessage("");
  };

  const togglePreference = async (key) => {
    const newValue = !preferences[key];

    setPreferences((prev) => ({
      ...prev,
      [key]: newValue,
    }));

    // Smart Notifications is connected to the backend.
    if (key === "smartNotifications") {
      try {
        const accessToken = getAccessToken();

        if (!accessToken) {
          throw new Error("Your session has expired. Please log in again.");
        }

        const updatedUser = await updateProfile(
          {
            notificationsEnabled: newValue,
          },
          accessToken
        );

        const userFromResponse =
          updatedUser?.data?.user ||
          updatedUser?.user ||
          updatedUser?.data ||
          null;

        if (userFromResponse) {
          const refreshToken =
            sessionStorage.getItem("renexa_refresh_token");

          saveAuthSession({
            accessToken,
            refreshToken,
            user: userFromResponse,
          });

          setProfile((prev) => ({
            ...prev,
            firstName: userFromResponse.firstName || prev.firstName,
            lastName: userFromResponse.lastName || prev.lastName,
            email: userFromResponse.email || prev.email,
            phone: userFromResponse.phoneNumber || prev.phone,
          }));
        }
      } catch (error) {
        // Revert toggle if API update fails.
        setPreferences((prev) => ({
          ...prev,
          [key]: !newValue,
        }));

        setErrorMessage(
          error.message || "Unable to update notification settings."
        );
      }
    }
  };

  const handleCancel = () => {
    setDraft(profile);
    setSavedMessage("");
    setErrorMessage("");
  };

  const handleSave = async () => {
    setSavedMessage("");
    setErrorMessage("");

    if (!draft.firstName.trim() || !draft.lastName.trim()) {
      setErrorMessage("First name and last name are required.");
      return;
    }

    if (!draft.phone.trim()) {
      setErrorMessage("Phone number is required.");
      return;
    }

    const accessToken = getAccessToken();

    if (!accessToken) {
      setErrorMessage("Your session has expired. Please log in again.");
      return;
    }

    setSaving(true);

    try {
      const response = await updateProfile(
        {
          firstName: draft.firstName.trim(),
          lastName: draft.lastName.trim(),
          phoneNumber: draft.phone.replace(/\s/g, ""),
        },
        accessToken
      );

      const updatedUser =
        response?.data?.user ||
        response?.user ||
        response?.data ||
        null;

      const userToStore = updatedUser
        ? {
            ...(currentUser || {}),
            ...updatedUser,
          }
        : {
            ...(currentUser || {}),
            firstName: draft.firstName.trim(),
            lastName: draft.lastName.trim(),
            phoneNumber: draft.phone.replace(/\s/g, ""),
          };

      const refreshToken =
        sessionStorage.getItem("renexa_refresh_token");

      saveAuthSession({
        accessToken,
        refreshToken,
        user: userToStore,
      });

      const updatedProfile = {
        firstName: userToStore.firstName || draft.firstName,
        lastName: userToStore.lastName || draft.lastName,
        email: userToStore.email || draft.email,
        phone: userToStore.phoneNumber || draft.phone,
      };

      setProfile(updatedProfile);
      setDraft(updatedProfile);

      setSavedMessage("Your changes have been saved.");
    } catch (error) {
      setErrorMessage(
        error.message || "Unable to save your changes. Please try again."
      );
    } finally {
      setSaving(false);
    }
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

            <span className="dash-photo-hint">
              Recommended 400x400px
            </span>
          </div>

          <div className="dash-form-grid">
            <label className="field">
              <span>First Name</span>

              <input
                type="text"
                value={draft.firstName}
                onChange={handleField("firstName")}
              />
            </label>

            <label className="field">
              <span>Last Name</span>

              <input
                type="text"
                value={draft.lastName}
                onChange={handleField("lastName")}
              />
            </label>

            <label className="field">
              <span>Email Address</span>

              <input
                type="email"
                value={draft.email}
                readOnly
              />
            </label>

            <label className="field">
              <span>Phone Number</span>

              <input
                type="tel"
                value={draft.phone}
                onChange={handleField("phone")}
              />
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
            <div className="dash-address-item">
              <span className="dash-address-icon">
                <FontAwesomeIcon icon={faLocationDot} />
              </span>

              <div>
                <p className="dash-table-primary">
                  Primary Address
                </p>

                <p className="dash-table-secondary">
                  Address management will be connected to your profile shortly.
                </p>
              </div>
            </div>
          </div>

          <h2 className="dash-preferences-title">
            Preferences
          </h2>

          <div className="dash-preference-row">
            <div>
              <p className="dash-table-primary">
                Smart Notifications
              </p>

              <p className="dash-table-secondary">
                Receive updates about your pickups and rewards
              </p>
            </div>

            <button
              type="button"
              className={`dash-toggle ${
                preferences.smartNotifications
                  ? "dash-toggle--on"
                  : ""
              }`}
              onClick={() =>
                togglePreference("smartNotifications")
              }
              aria-pressed={preferences.smartNotifications}
              aria-label="Toggle smart notifications"
            >
              <span />
            </button>
          </div>

          <div className="dash-preference-row">
            <div>
              <p className="dash-table-primary">
                SMS Alerts
              </p>

              <p className="dash-table-secondary">
                Text reminders 1 hour before pickup
              </p>
            </div>

            <button
              type="button"
              className={`dash-toggle ${
                preferences.smsAlerts
                  ? "dash-toggle--on"
                  : ""
              }`}
              onClick={() =>
                togglePreference("smsAlerts")
              }
              aria-pressed={preferences.smsAlerts}
              aria-label="Toggle SMS alerts"
            >
              <span />
            </button>
          </div>

          <div className="dash-preference-row">
            <div>
              <p className="dash-table-primary">
                Dark Mode
              </p>

              <p className="dash-table-secondary">
                Currently follows your device theme
              </p>
            </div>

            <button
              type="button"
              className={`dash-toggle ${
                preferences.darkMode
                  ? "dash-toggle--on"
                  : ""
              }`}
              onClick={() =>
                togglePreference("darkMode")
              }
              aria-pressed={preferences.darkMode}
              aria-label="Toggle dark mode"
            >
              <span />
            </button>
          </div>

          <label className="field">
            <span>Language</span>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </label>
        </section>
      </div>

      {(savedMessage || errorMessage) && (
        <p
          className={
            errorMessage
              ? "field-error"
              : "contact-success"
          }
        >
          {errorMessage || savedMessage}
        </p>
      )}

      <div className="dash-settings-actions">
        <button
          type="button"
          className="btn btn-outline"
          onClick={handleCancel}
          disabled={saving}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default DashboardSettings;