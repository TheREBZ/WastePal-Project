import { useLayoutEffect } from "react";
import { useRouter } from "../router/Router";
import { getCurrentUser, isAuthenticated } from "../services/authStorage";

// Wraps an admin-only page. Anyone who isn't logged in gets sent to
// /login; anyone logged in but not an admin gets sent to /dashboard.
// This only hides the page in the UI — it is NOT a substitute for
// real protection on the backend. Any actual admin data these pages
// eventually fetch must be guarded server-side too (the same way
// GET /api/user/all-profile already requires authorize(UserRole.ADMIN)),
// since a client-side check like this can't stop someone from calling
// the API directly.
const RequireAdmin = ({ children }) => {
  const { navigate } = useRouter();
  const currentUser = getCurrentUser();
  const isAdmin = isAuthenticated() && currentUser?.role === "admin";

  useLayoutEffect(() => {
    if (!isAdmin) {
      navigate(isAuthenticated() ? "/dashboard" : "/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  if (!isAdmin) {
    return null;
  }

  return children;
};

export default RequireAdmin;