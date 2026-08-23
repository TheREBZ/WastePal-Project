import { useRouter } from "../router/Router";
import "../styles/Auth.css";

const GoogleCallback = () => {
  const { navigate } = useRouter();

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Google Authentication</h1>

        <p className="auth-subtitle">
          Google sign-in is being connected. If you were redirected here,
          return to the login page and try again once the integration is ready.
        </p>

        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => navigate("/login")}
        >
          Back to Login
        </button>
      </div>
    </main>
  );
};

export default GoogleCallback;