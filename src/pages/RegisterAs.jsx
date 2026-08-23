import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faHouse,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import { getRegistrationData, saveRegistrationData } from "../services/registrationStorage";
import { setAccountType, refreshAccessToken, } from "../services/authService";
import { getAccessToken, getRefreshToken, getCurrentUser, saveAuthSession } from "../services/authStorage";
import { useState } from "react";
import "../styles/Auth.css";

const RegisterAs = () => {
  const { navigate } = useRouter();
  const [error, setError] = useState("");
  const [submittingRole, setSubmittingRole] = useState(null);

  const handleSelect = async (role) => {
    const registrationData = getRegistrationData();
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!registrationData || !accessToken || !refreshToken) {
      // No in-progress signup / no session — start over.
      navigate("/signup");
      return;
    }

    setError("");
    setSubmittingRole(role);

    try {
      await setAccountType(role, accessToken);
      const response = await setAccountType(role, accessToken);

      // Account type has changed in the database, but the existing
      // access token still contains the old role.
      // Refresh the tokens so the new JWT contains the selected role.
      const refreshResponse = await refreshAccessToken(refreshToken);

      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: refreshedUser,
      } = refreshResponse.data;

      saveAuthSession({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        user: {
          ...getCurrentUser(),
          ...refreshedUser,
        },
      });

      saveRegistrationData({
        ...registrationData,
        role,
      });

      if (role === "household") {
        navigate("/household-profile");
      }

      if (role === "business_owner") {
        navigate("/business-profile");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmittingRole(null);
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

        <h1>How will you be using ReNexa?</h1>

        <p className="auth-subtitle">
          Choose the account type that best describes you.
        </p>

        <div className="register-options">

          <button
            type="button"
            className="register-option"
            onClick={() => handleSelect("household")}
            disabled={submittingRole !== null}
          >
            <div className="register-option-icon">
              <FontAwesomeIcon icon={faHouse} />
            </div>

            <div className="register-option-content">
              <strong>Household</strong>

              <span>
                {submittingRole === "household"
                  ? "Saving..."
                  : "For individuals and households looking to manage their waste responsibly."}
              </span>
            </div>
          </button>

          <button
            type="button"
            className="register-option"
            onClick={() => handleSelect("business_owner")}
            disabled={submittingRole !== null}
          >
            <div className="register-option-icon">
              <FontAwesomeIcon icon={faBuilding} />
            </div>

            <div className="register-option-content">
              <strong>Business</strong>

              <span>
                {submittingRole === "business_owner"
                  ? "Saving..."
                  : "For businesses looking to manage their waste and recycling needs."}
              </span>
            </div>
          </button>

        </div>

        {error && <em className="field-error">{error}</em>}

        <p className="auth-footer">
          Already have an account?{" "}
          <button
            type="button"
            className="auth-inline-button"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </p>

      </div>
    </main>
  );
};

export default RegisterAs;