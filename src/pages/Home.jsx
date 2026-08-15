import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faCircleCheck,
  faRecycle,
  faTree,
  faTruck,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import Link from "../router/Link";
import "../styles/Home.css";

const STATS = [
  { icon: faCircleCheck, value: "10k+", label: "Pickups Completed" },
  { icon: faRecycle, value: "500 Tons", label: "Recycled Materials" },
  { icon: faTree, value: "25k", label: "Trees Saved" },
];

const Home = () => {
  return (
    <Layout>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-badge">
              <FontAwesomeIcon icon={faLeaf} /> Eco-friendly Waste Solutions
            </span>
            <h1>
              Smarter waste management for a <span>greener city.</span>
            </h1>
            <p>
              Renexa connects modern businesses and communities with efficient,
              tech-enabled pickup services. Reduce your footprint, track your
              recycling, and help build a sustainable future effortlessly.
            </p>
            <div className="hero-actions">
              <Link to="/signup" className="btn btn-primary">
                Schedule a Pickup
              </Link>
              <Link to="/how-it-works" className="btn btn-outline">
                How it Works
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-art">
              <FontAwesomeIcon icon={faTruck} className="hero-art-truck" />
              <div className="hero-art-city">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="hero-floating-card">
              <span className="hero-floating-icon">
                <FontAwesomeIcon icon={faClock} />
              </span>
              <div>
                <p className="hero-floating-title">Next Pickup</p>
                <p className="hero-floating-value">Tomorrow, 8:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-inner">
          {STATS.map((stat) => (
            <div className="stat-card" key={stat.label}>
              <span className="stat-icon">
                <FontAwesomeIcon icon={stat.icon} />
              </span>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
