import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import { saveAuthSession } from "../services/authStorage";
import { saveRegistrationData } from "../services/registrationStorage";
import "../styles/Auth.css";

const GoogleCallback = () => {
  const { navigate } = useRouter();

  const [error, setError] =
    useState("");

  useEffect(() => {
    const handleGoogleCallback = () => {
      try {
        const params =
          new URLSearchParams(
            window.location.hash.substring(1)
          );

        const callbackError =
          params.get("error");

        if (callbackError) {
          throw new Error(
            decodeURIComponent(
              callbackError
            )
          );
        }

        const accessToken =
          params.get("accessToken");

        const refreshToken =
          params.get("refreshToken");

        const encodedUser =
          params.get("user");

        if (
          !accessToken ||
          !refreshToken ||
          !encodedUser
        ) {
          throw new Error(
            "Google sign-in did not return a valid session."
          );
        }

        let user;

        try {
          user = JSON.parse(
            decodeURIComponent(
              encodedUser
            )
          );
        } catch {
          throw new Error(
            "Unable to read Google account information."
          );
        }

        saveAuthSession({
          accessToken,
          refreshToken,
          user,
        });

        /*
         * Existing user whose onboarding
         * is already finished.
         */
        if (
          user.profileCompleted ||
          user.onboardingStep ===
            "PROFILE_COMPLETE"
        ) {
          window.history.replaceState(
            {},
            "",
            "/oauth/callback"
          );

          navigate("/dashboard");
          return;
        }

        /*
         * Store Google user's basic details so
         * RegisterAs / profile pages can use
         * the same onboarding flow as normal
         * registration.
         */
        saveRegistrationData({
          firstName:
            user.firstName || "",
          lastName:
            user.lastName || "",
          email:
            user.email || "",
          phoneNumber:
            user.phoneNumber || "",
          googleSignup: true,
        });

        window.history.replaceState(
          {},
          "",
          "/oauth/callback"
        );

        /*
         * If an existing account already has
         * a role but hasn't completed profile,
         * continue directly to that profile.
         */
        if (
          user.role === "household"
        ) {
          navigate(
            "/household-profile"
          );
          return;
        }

        if (
          user.role ===
          "business_owner"
        ) {
          navigate(
            "/business-profile"
          );
          return;
        }

        /*
         * New Google users choose Household
         * or Business.
         */
        navigate("/register");
      } catch (err) {
        console.error(
          "Google callback error:",
          err
        );

        setError(
          err.message ||
            "Google authentication failed."
        );
      }
    };

    handleGoogleCallback();
  }, [navigate]);

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

        {!error ? (
          <>
            <div className="verify-icon">
              <FontAwesomeIcon
                icon={faCircleCheck}
              />
            </div>

            <h1>
              Signing you in
            </h1>

            <p className="auth-subtitle">
              Finishing your Google
              authentication...
            </p>
          </>
        ) : (
          <>
            <h1>
              Google sign-in failed
            </h1>

            <p className="field-error">
              {error}
            </p>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={() =>
                navigate("/login")
              }
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </main>
  );
};

export default GoogleCallback;