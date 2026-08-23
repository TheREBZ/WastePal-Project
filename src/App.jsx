import "./styles/variables.css";
import "./styles/globals.css";
import { RouterProvider, useRouter } from "./router/Router";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import WastePickerSignup from "./pages/WastePickerSignup";
import AdminPickerDash from "./pages/AdminPickerDash";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import RegisterAs from "./pages/RegisterAs";
import HouseholdProfile from "./pages/HouseholdProfile";
import BusinessProfile from "./pages/BusinessProfile";
import AdminEventLog from "./pages/AdminEventLog";
import ReviewBooking from "./pages/ReviewBooking";
import RequireAdmin from "./components/RequireAdmin";
import GoogleCallback from "./pages/GoogleCallback";
import Checkout from "./pages/Checkout";
import PaymentConfirmation from "./pages/PaymentConfirmation";

const ProtectedAdminPickerDash = () => (
  <RequireAdmin>
    <AdminPickerDash />
  </RequireAdmin>
);

const ProtectedAdminEventLog = () => (
  <RequireAdmin>
    <AdminEventLog />
  </RequireAdmin>
);

const ROUTES = {
  "/": Home,
  "/register": Register,
  "/signup": Signup,
  "/forgot-password": ForgotPassword,
  "/wastepickersignup": WastePickerSignup,
  "/login": Login,
  "/features": Features,
  "/how-it-works": HowItWorks,
  "/pricing": Pricing,
  "/about": AboutUs,
  "/contact": Contact,
  "/dashboard": Dashboard,
  "/adminpicker": ProtectedAdminPickerDash,
  "/verify-email": VerifyEmail,
  "/reset-password": ResetPassword,
  "/register-as": RegisterAs,
  "/household-profile": HouseholdProfile,
  "/business-profile": BusinessProfile,
  "/adminevents": ProtectedAdminEventLog,
  "/review-booking": ReviewBooking,
  "/oauth/callback": GoogleCallback,
  "/checkout": Checkout,
  "/payment-confirmation": PaymentConfirmation,
};

const AppRoutes = () => {
  const { path } = useRouter();
  const Page = ROUTES[path] || Home;
  return <Page />;
};

const App = () => {
  return (
    <RouterProvider>
      <AppRoutes />
    </RouterProvider>
  );
};

export default App;