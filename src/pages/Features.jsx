import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faClipboardList,
  faUserCheck,
  faChartLine,
  faCreditCard,
  faHeadset,
  faBuilding,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import Link from "../router/Link";
import "../styles/Features.css";

const FEATURES = [
  {
    icon: faCalendarCheck,
    title: "Pickup Scheduling",
    desc: "Schedule waste pickups directly from your dashboard by choosing your waste type, pickup address, date, time, quantity, and bag size.",
  },

  {
    icon: faClipboardList,
    title: "Pickup Status Tracking",
    desc: "Follow your pickup request as it moves from Pending to Confirmed once a waste picker has been assigned, and later to Completed after collection.",
  },

  {
    icon: faUserCheck,
    title: "Waste Picker Assignment",
    desc: "Pickup requests are reviewed and assigned to available waste pickers, helping create a clearer and more organized collection process.",
  },

  {
    icon: faChartLine,
    title: "Pickup History & Reports",
    desc: "Keep track of your pickup activity and view a running record of completed and upcoming waste collection requests from your dashboard.",
    chart: true,
  },

  {
    icon: faCreditCard,
    title: "Flexible Payment Plans",
    desc: "Choose between a monthly subscription with scheduled pickups or a custom pay-as-you-go option depending on your waste collection needs.",
  },

  {
    icon: faHeadset,
    title: "Support Access",
    desc: "Reach support directly from your dashboard whenever you need help with pickups, your account, or other ReNexa services.",
  },

  {
    icon: faBuilding,
    title: "Household & Business Accounts",
    desc: "ReNexa supports both household and business profiles, allowing users to register with details that match how they plan to use the platform.",
  },

  {
    icon: faRecycle,
    title: "Recycling Awareness",
    desc: "Get practical recycling tips and waste information designed to encourage better sorting habits and more responsible waste disposal.",
  },
];

const Features = () => {
  return (
    <Layout>
      <section className="features-hero section-inner">
        <h1>Practical Tools for Smarter Waste Management</h1>

        <p>
          ReNexa brings waste pickup, tracking, payments, and support
          together in one simple platform for households and businesses.
        </p>
      </section>

      <section className="features-grid section-inner">
        {FEATURES.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <span className="feature-icon">
              <FontAwesomeIcon icon={feature.icon} />
            </span>

            <h3>{feature.title}</h3>

            <p>{feature.desc}</p>

            {feature.chart && (
              <div
                className="feature-chart"
                aria-hidden="true"
              >
                <span style={{ height: "35%" }} />
                <span style={{ height: "50%" }} />
                <span style={{ height: "65%" }} />
                <span style={{ height: "78%" }} />
                <span
                  style={{ height: "92%" }}
                  className="feature-chart-highlight"
                />
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="features-cta">
        <div className="features-cta-inner section-inner">
          <h2>
            Ready to make waste collection simpler?
          </h2>

          <Link
            to="/signup"
            className="btn btn-primary"
          >
            Get Started
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Features;