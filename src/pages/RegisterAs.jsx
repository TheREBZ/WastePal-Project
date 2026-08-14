import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faHouse,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import "../styles/Auth.css";

const RegisterAs = () => {
  const { navigate } = useRouter();

  const handleSelect = (role) => {
    if (role === "household") {
        navigate("/household-profile");
      }
    if (role === "business_owner") {
    navigate("/business-profile");
    }
    // We'll pass the selected role into the next step
    // when we connect the API.
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
          >
            <div className="register-option-icon">
              <FontAwesomeIcon icon={faHouse} />
            </div>

            <div className="register-option-content">
              <strong>Household</strong>

              <span>
                For individuals and households looking to
                manage their waste responsibly.
              </span>
            </div>
          </button>

          <button
            type="button"
            className="register-option"
            onClick={() => handleSelect("business_owner")}
          >
            <div className="register-option-icon">
              <FontAwesomeIcon icon={faBuilding} />
            </div>

            <div className="register-option-content">
              <strong>Business</strong>

              <span>
                For businesses looking to manage their
                waste and recycling needs.
              </span>
            </div>
          </button>

        </div>

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