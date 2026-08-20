import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/tokens.css";
import { RouterProvider, useRouter } from "./router/Router";

import Home from "./pages/Home";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookPickup from "./pages/BookPickup";
import ReviewBooking from "./pages/ReviewBooking";
import Rewards from "./pages/Rewards";
import Recycling from "./pages/Recycling";
import SubscriptionPlanScreen from "./pages/SubscriptionPlanScreen";
import PaymentCheckoutScreen from "./pages/PaymentCheckoutScreen";


const ROUTES = {
  "/": Home,
  "/features": Features,
  "/how-it-works": HowItWorks,
  "/pricing": Pricing,
  "/about": AboutUs,
  "/contact": Contact,
  "/login": Login,
  "/signup": Signup,
  "/register": Register,
  "/dashboard": Dashboard,
  "/book-pickup": BookPickup,
  "/review-booking": ReviewBooking,
  "/rewards": Rewards,
  "/recycling": Recycling,
  "/subscription-plan": SubscriptionPlanScreen,
  "/payment-checkout": PaymentCheckoutScreen,
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
