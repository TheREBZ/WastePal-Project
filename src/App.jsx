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
import SubscriptionPlan from "./pages/SubscriptionPlan";
import PaymentCheckout from "./pages/PaymentCheckout";
import SubscribeRoute from "./router/SubscribeRoute";
import CheckoutRoute from "./router/CheckoutRoute";


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
  "/subscription-plan": SubscriptionPlan,
  "/payment-checkout": PaymentCheckout,
  "/subscribe": SubscribeRoute,
   "/checkout": CheckoutRoute,
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
