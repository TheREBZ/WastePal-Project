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

const ROUTES = {
  "/": Home,
  "/Register": Register,
  "/signup": Signup,
  "/wastepickersignup": WastePickerSignup,
  "/login": Login,
  "/features": Features,
  "/how-it-works": HowItWorks,
  "/pricing": Pricing,
  "/about": AboutUs,
  "/contact": Contact,
  "/dashboard": Dashboard,
  "/adminpicker": AdminPickerDash,
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
