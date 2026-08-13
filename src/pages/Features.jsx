import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faRobot,
  faTruckFast,
  faChartLine,
  faGift,
  faWifi,
  faStore,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import Link from "../router/Link";
import "../styles/Features.css";

const FEATURES = [
  {
    icon: faCalendarCheck,
    title: "Pickup Scheduling",
    desc: "Easily schedule on-demand pickups or set up recurring collections tailored to your specific waste generation patterns.",
  },
  {
    icon: faRobot,
    title: "AI Waste Scanner",
    desc: "Utilize machine learning to instantly identify materials and determine the correct recycling stream with a simple photo.",
  },
  {
    icon: faTruckFast,
    title: "Live Vehicle Tracking",
    desc: "Track collection vehicles in real-time, reducing missed pickups and improving operational transparency.",
  },
  {
    icon: faChartLine,
    title: "Environmental Analytics",
    desc: "Gain deep insights into your waste footprint. Our analytics dashboard visualizes diversion rates, carbon offset, and long-term trends to help you meet sustainability goals.",
    chart: true,
  },
  {
    icon: faGift,
    title: "Rewards Program",
    desc: "Earn points for consistent recycling and low waste generation, redeemable for eco-friendly products or community donations.",
  },
  {
    icon: faWifi,
    title: "Smart Bin Integration",
    desc: "Connect with IoT-enabled bins to monitor fill levels remotely, optimizing collection routes and preventing overflow.",
  },
  {
    icon: faStore,
    title: "Eco Marketplace",
    desc: "Access a curated selection of sustainable products and packaging alternatives directly within the platform.",
  },
  {
    icon: faTriangleExclamation,
    title: "Illegal Dumping Reporting",
    desc: "Quickly report unauthorized dumping with geotagged photos, routing issues directly to municipal enforcement teams.",
  },
];

const Features = () => {
  return (
    <Layout>
      <section className="features-hero section-inner">
        <h1>Smarter Waste Management for a Cleaner World</h1>
        <p>
          Discover the suite of features designed to optimize collection, encourage
          recycling, and provide actionable environmental insights.
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
              <div className="feature-chart" aria-hidden="true">
                <span style={{ height: "40%" }} />
                <span style={{ height: "65%" }} />
                <span style={{ height: "50%" }} />
                <span style={{ height: "80%" }} />
                <span style={{ height: "95%" }} className="feature-chart-highlight" />
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="features-cta">
        <div className="features-cta-inner section-inner">
          <h2>Ready to transform your waste management?</h2>
          <Link to="/signup" className="btn btn-primary">
            Sign up
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Features;
