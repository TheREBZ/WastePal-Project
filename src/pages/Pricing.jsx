import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import Link from "../router/Link";
import "../styles/Pricing.css";

const PLANS = [
  {
    name: "Basic",
    price: "₦5,000",
    period: "/month",
    desc: "Perfect for individuals starting their eco-journey.",
    features: [
      "Basic recycling guidelines",
      "1 Scheduled pickup per month",
      "Community forum access",
    ],
    cta: "Get Started",
    to: "/signup",
  },
  {
    name: "Household",
    price: "₦12,000",
    period: "/month",
    desc: "Ideal for families managing daily waste.",
    features: [
      "Advanced sorting guide",
      "Weekly scheduled pickups",
      "Sorting guide provided",
      "Priority email support",
    ],
    cta: "Start Free Trial",
    to: "/signup",
    recommended: true,
  },
  {
    name: "Business",
    price: "₦30,000",
    period: "/month",
    desc: "Tailored for small offices and retail spaces.",
    features: [
      "Multiple waste dispose option",
      "Bi-weekly bulk pickups",
      "Monthly sustainability reports",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    to: "/contact",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "Custom solutions for large organizations.",
    features: [
      "Multi-location management",
      "Daily custom pickups",
      "Real-time tracking API",
      "24/7 priority support",
    ],
    cta: "Contact Sales",
    to: "/contact",
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
              className={`btn btn-block ${plan.recommended ? "btn-primary" : "btn-outline"}`}
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
