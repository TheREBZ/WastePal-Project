import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import {
  getSubscription,
  clearSelectedPlan,
} from "../services/subscriptionStorage";
import "../styles/Subscription.css";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price || 0);
};

const PaymentConfirmation = () => {
  const { navigate } = useRouter();

  const [subscription, setSubscription] =
    useState(null);

  useEffect(() => {
    const savedSubscription =
      getSubscription();

    if (!savedSubscription) {
      navigate("/dashboard");
      return;
    }

    setSubscription(savedSubscription);

    clearSelectedPlan();
  }, [navigate]);

  if (!subscription) {
    return null;
  }

  return (
    <main className="payment-confirmation-page">
      <section className="payment-confirmation-card">

        <span className="payment-success-icon">
          <FontAwesomeIcon
            icon={faCircleCheck}
          />
        </span>

        <p className="subscription-eyebrow">
          SUBSCRIPTION ACTIVE
        </p>

        <h1>You're all set</h1>

        <p className="payment-confirmation-copy">
          Your ReNexa{" "}
          <strong>
            {subscription.planName}
          </strong>{" "}
          {subscription.planId === "monthly"
            ? `Your ReNexa ${subscription.planName} plan has been activated successfully.`
            : "Your custom pickup payment has been confirmed successfully."}
        </p>

        <div className="payment-confirmation-details">
          <div>
            <span>Plan</span>
            <strong>
              {subscription.planName}
            </strong>
          </div>

          <div>
            <span>Amount</span>
            <strong>
              {formatPrice(
                subscription.price
              )}
            </strong>
          </div>

          <div>
            <span>Reference</span>
            <strong>
              {subscription.reference}
            </strong>
          </div>

          <div>
            <span>Status</span>
            <strong className="payment-active">
              Active
            </strong>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Return to Dashboard
          <FontAwesomeIcon
            icon={faArrowRight}
          />
        </button>

        <small className="checkout-terms">
          This transaction is currently simulated
          for the ReNexa beta.
        </small>
      </section>
    </main>
  );
};

export default PaymentConfirmation;