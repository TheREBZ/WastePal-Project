import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faLeaf,
  faCrown,
  faBuilding,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import {
  getSubscription,
  saveSelectedPlan,
} from "../services/subscriptionStorage";
import "../styles/Subscription.css";

const PLANS = [
  {
    id: "monthly",
    name: "Monthly Subscription",
    price: 3182,
    period: "/month",
    description:
      "Perfect for households and businesses looking for a reliable monthly pickup system.",
    icon: faCrown,
    features: [
      "1 time monthly payment",
      "4 scheduled pickups per month",
    ],
  },

  {
    id: "custom",
    name: "Custom",
    price: 750,
    period: "/pickup",
    description:
      "Custom pickup solutions for households and businesses.",
    icon: faLeaf,
    popular: true,
    features: [
      "Request pickup at any time",
      "Pay as you go",
      "Reliable and efficient pickups",
      "Cheap and easy",
    ],
  },
];

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
};

const DashboardSubscription = () => {
  const { navigate } = useRouter();

  const [subscription, setSubscription] =
    useState(null);

  useEffect(() => {
    setSubscription(getSubscription());
  }, []);

  const handleChoosePlan = (plan) => {
    if (
      subscription?.status === "active" &&
      subscription?.planId === plan.id
    ) {
      return;
    }

    saveSelectedPlan(plan);

    navigate("/checkout");
  };

  return (
    <div className="subscription-page">
      <div className="subscription-heading">
        <div>
          <p className="subscription-eyebrow">
            RENEXA PLANS
          </p>

          <h2>
            Choose how you want to pay for pickups
          </h2>

          <p>
            Choose between a monthly pickup plan or pay only when
            you request a custom collection.
          </p>
        </div>
      </div>

      {subscription?.status === "active" && (
        <div className="subscription-current">
          <FontAwesomeIcon
            icon={faCircleCheck}
          />

          <div>
            <strong>
              Current Plan:{" "}
              {subscription.planName}
            </strong>

            <span>
              Your subscription is currently
              active.
            </span>
          </div>
        </div>
      )}

      <div className="subscription-grid">
        {PLANS.map((plan) => {
          const isCurrent =
            subscription?.status === "active" &&
            subscription?.planId === plan.id;

          return (
            <article
              key={plan.id}
              className={`subscription-card ${
                plan.popular
                  ? "subscription-card--popular"
                  : ""
              }`}
            >
              {plan.popular && (
                <span className="subscription-popular">
                  Most Popular
                </span>
              )}

              <div className="subscription-plan-icon">
                <FontAwesomeIcon
                  icon={plan.icon}
                />
              </div>

              <h3>{plan.name}</h3>

              <p className="subscription-description">
                {plan.description}
              </p>

              <div className="subscription-price">
                <strong>
                  {formatPrice(plan.price)}
                </strong>

                <span>{plan.period}</span>
              </div>

              <div className="subscription-features">
                {plan.features.map(
                  (feature) => (
                    <div
                      key={feature}
                      className="subscription-feature"
                    >
                      <FontAwesomeIcon
                        icon={faCheck}
                      />
                      <span>{feature}</span>
                    </div>
                  )
                )}
              </div>

              <button
                type="button"
                className={`btn btn-block ${
                  plan.popular
                    ? "btn-primary"
                    : "btn-outline"
                }`}
                onClick={() =>
                  handleChoosePlan(plan)
                }
                disabled={isCurrent}
              >
                {isCurrent
                ? "Current Plan"
                : plan.id === "monthly"
                ? "Choose Monthly Plan"
                : "Choose Custom"}
              </button>
            </article>
          );
        })}
      </div>

      <p className="subscription-note">
        Subscription payments are currently in
        demo mode while payment processing is
        being integrated.
      </p>
    </div>
  );
};

export default DashboardSubscription;