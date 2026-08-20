import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import Link from "../router/Link";
import "../styles/Pricing.css";

const PLANS = [
  {
    name: "Monthly Subscription",
    price: "₦3,182",
    period: "/month",
    desc: "Perfect for Household and Businesses that are looking for a reliable monthly pickup system.",
    features: [
      "1 Time Monthly Payment",
      "4 Scheduled pickups per month",
    ],
    cta: "Get Started",
    to: "/signup",
  },
  {
    name: "Custom",
    price: "₦750",
    period: "/pickup",
    desc: "Custom pickup solutions for household and businesses.",
    features: [
      "Request pickup at anytime",
      "Pay as you go",
      "Reliable and Efficient pickups",
      "Cheap and easy",
    ],
    cta: "Get started",
    to: "/signup",
    recommended: true,
  },
];

const Pricing = () => {
  return (
    <Layout>
      <section className="pricing-hero section-inner">
        <h1>Simple, transparent pricing</h1>
        <p>
          Choose the plan that best fits your waste management needs. From
          individuals to large enterprises, we have a solution for a cleaner
          tomorrow.
        </p>
      </section>

      <section className="pricing-grid section-inner">
        {PLANS.map((plan) => (
          <div
            className={`pricing-card ${plan.recommended ? "pricing-card--recommended" : ""}`}
            key={plan.name}
          >
            {plan.recommended && <span className="pricing-badge">Recommended</span>}
            <h3>{plan.name}</h3>
            <p className="pricing-desc">{plan.desc}</p>
            <p className="pricing-price">
              {plan.price}
              <span>{plan.period}</span>
            </p>
            <ul className="pricing-features">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <FontAwesomeIcon icon={faCheck} className="pricing-check" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to={plan.to}
              className={`btn price-btn btn-block ${plan.recommended ? "btn-primary" : "btn-outline"}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </section>
    </Layout>
  );
};

export default Pricing;
