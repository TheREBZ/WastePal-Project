import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobileScreenButton,
  faTruck,
  faClipboardCheck,
  faRecycle,
} from "@fortawesome/free-solid-svg-icons";
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
          Our seamless process takes the effort out of responsible waste
          management. From scheduling a pickup to collection and recovery,
          ReNexa helps make waste disposal simpler and more reliable.
        </p>
      </section>

      <section className="how-steps section-inner">

        {/* Step 1 */}
        <div className="how-card how-card--sm">
          <span className="step-badge step-badge--1">
            1
          </span>

          <h3>Book Pickup</h3>

          <p>
            Schedule a waste collection directly from your dashboard.
            Choose your waste type, pickup address, date, time, and
            quantity.
          </p>

          <div className="how-illustration how-illustration--phone">
            <FontAwesomeIcon
              icon={faMobileScreenButton}
            />
          </div>
        </div>

        {/* Step 2 */}
        <div className="how-card how-card--sm">
          <span className="step-badge step-badge--2">
            2
          </span>

          <h3>Waste Collection</h3>

          <p>
            Your pickup request is received and prepared for collection
            by one of our available waste pickers.
          </p>

          <div className="how-illustration how-illustration--truck">
            <FontAwesomeIcon icon={faTruck} />
          </div>
        </div>

        {/* Step 3 */}
        <div className="how-card how-card--sm">
          <span className="step-badge step-badge--3">
            3
          </span>

          <h3>Track Your Pickup</h3>

          <p>
            Follow the progress of your request from your dashboard.
            Your booking starts as pending and becomes confirmed once
            a waste picker has been assigned.
          </p>

          <div className="how-illustration how-illustration--phone">
            <FontAwesomeIcon
              icon={faClipboardCheck}
            />
          </div>

          <div className="how-tags">
            <span className="how-tag">
              Pending
            </span>

            <span className="how-tag">
              Confirmed
            </span>
          </div>
        </div>

        {/* Step 4 */}
        <div className="how-card how-card--sm">
          <span className="step-badge step-badge--4">
            4
          </span>

          <h3>Material Recovery</h3>

          <p>
            Collected recyclable materials can be separated and
            prepared for recovery, helping reduce the amount of useful
            material that ends up as general waste.
          </p>

          <div className="how-illustration how-illustration--truck">
            <FontAwesomeIcon icon={faRecycle} />
          </div>

          <a
            className="how-link"
            href="#waste-fact"
          >
            Learn more about waste →
          </a>
        </div>

      </section>

      {/* Waste awareness section */}
      <section
        className="how-rewards section-inner"
        id="waste-fact"
      >
        <div className="how-rewards-card">

          <div className="how-rewards-copy">
            <span className="step-badge step-badge--5">
              ?
            </span>

            <h3>Did You Know?</h3>

            <p>
              Lagos generates approximately 13,000 tonnes of waste
              every day. As the city continues to grow, proper waste
              collection, responsible disposal, and separating
              recyclable materials can all play a part in keeping
              communities cleaner.
            </p>
          </div>

          <div className="how-rewards-balance">
            <span className="how-rewards-icon">
              <FontAwesomeIcon icon={faRecycle} />
            </span>

            <div>
              <p className="how-rewards-label">
                Lagos Daily Waste
              </p>

              <p className="how-rewards-value">
                ~13,000 tonnes
              </p>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;