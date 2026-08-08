import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreenButton, faTruck, faMedal } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import "../styles/HowItWorks.css";

const HowItWorks = () => {
  return (
    <Layout>
      <section className="how-hero section-inner">
        <h1>
          Transforming Waste into <span>Impact.</span>
        </h1>
        <p>
          Our seamless process takes the effort out of eco-friendly living. From your
          doorstep to a sustainable future, here is how we make a difference together.
        </p>
      </section>

      <section className="how-steps section-inner">
        <div className="how-card how-card--sm">
          <span className="step-badge step-badge--1">1</span>
          <h3>Book Pickup</h3>
          <p>
            Schedule a collection via our intuitive app in just a few taps. Choose a
            time that fits your life.
          </p>
          <div className="how-illustration how-illustration--phone">
            <FontAwesomeIcon icon={faMobileScreenButton} />
          </div>
        </div>

        <div className="how-card how-card--sm">
          <span className="step-badge step-badge--2">2</span>
          <h3>Waste Collection</h3>
          <p>
            Our electric trucks arrive exactly when scheduled, ensuring silent,
            zero-emission pickups right from your door.
          </p>
          <div className="how-illustration how-illustration--truck">
            <FontAwesomeIcon icon={faTruck} />
          </div>
        </div>

        <div className="how-card how-card--sm">
          <span className="step-badge step-badge--3">3</span>
          <h3>AI-Powered Sorting</h3>
          <p>
            Our smart sorting facilities use AI-powered scanners to maximize recovery
            rates and minimize landfill waste.
          </p>
          <div className="how-tags">
            <span className="how-tag">AI Powered</span>
            <span className="how-tag">99% Accuracy</span>
          </div>
        </div>

        <div className="how-card how-card--sm">
          <span className="step-badge step-badge--4">4</span>
          <h3>Material Recovery</h3>
          <p>
            Recovered materials are processed and prepared to be reintegrated into the
            manufacturing cycle.
          </p>
          <div className="how-weights">
            <span>1728 kg</span>
            <span className="how-weights-arrow">→</span>
            <span className="how-weights-highlight">1117 kg</span>
          </div>
          <a className="how-link" href="#impact">
            See our impact metrics →
          </a>
        </div>
      </section>

      <section className="how-rewards section-inner">
        <div className="how-rewards-card">
          <div className="how-rewards-copy">
            <span className="step-badge step-badge--5">5</span>
            <h3>Earn Rewards</h3>
            <p>
              Your commitment to the planet pays off. Earn EcoPoints for every
              successful pickup and redeem them for exclusive discounts with our
              sustainable brand partners.
            </p>
          </div>
          <div className="how-rewards-balance">
            <span className="how-rewards-icon">
              <FontAwesomeIcon icon={faMedal} />
            </span>
            <div>
              <p className="how-rewards-label">Current Balance</p>
              <p className="how-rewards-value">2,450 pts</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
