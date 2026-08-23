import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCreditCard,
  faBuildingColumns,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import { getCurrentUser } from "../services/authStorage";
import {
  getSelectedPlan,
  saveSubscription,
} from "../services/subscriptionStorage";
import "../styles/Subscription.css";

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
};

const Checkout = () => {
  const { navigate } = useRouter();

  const user = getCurrentUser();

  const [plan, setPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] =
    useState("card");
  const [processing, setProcessing] =
    useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const selectedPlan = getSelectedPlan();

    if (!selectedPlan) {
      navigate("/dashboard");
      return;
    }

    setPlan(selectedPlan);
  }, [navigate]);

  if (!plan) {
    return null;
  }

  const handlePayment = () => {
    setError("");

    if (!paymentMethod) {
      setError(
        "Please choose a payment method."
      );
      return;
    }

    setProcessing(true);

    /*
     * Demo only.
     * No real payment details are collected
     * or stored.
     */
    const subscription = {
      planId: plan.id,
      planName: plan.name,
      price: plan.price,
      status: "active",
      paymentMethod:
        plan.price === 0
          ? "free"
          : paymentMethod,
      startedAt: new Date().toISOString(),
      reference: `RNX-${Date.now()}`,
    };

    saveSubscription(subscription);

    setTimeout(() => {
      navigate("/payment-confirmation");
    }, 700);
  };

  return (
    <main className="checkout-page">
      <div className="checkout-wrapper">

        <button
          type="button"
          className="checkout-back"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
          />
          Back to plans
        </button>

        <div className="checkout-header">
          <p className="subscription-eyebrow">
            CHECKOUT
          </p>

          <h1>Complete your subscription</h1>

          <p>
            Review your plan and choose how
            you'd like to pay.
          </p>
        </div>

        <div className="checkout-grid">
          <section className="checkout-card">
            <h2>Payment Details</h2>

            <div className="checkout-user">
              <span>Account</span>

              <strong>
                {user?.firstName || "ReNexa"}{" "}
                {user?.lastName || "User"}
              </strong>

              <small>
                {user?.email || ""}
              </small>
            </div>

            {plan.price > 0 ? (
              <>
                <p className="checkout-label">
                  Payment Method
                </p>

                <label
                  className={`payment-option ${
                    paymentMethod === "card"
                      ? "payment-option--active"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={
                      paymentMethod === "card"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <FontAwesomeIcon
                    icon={faCreditCard}
                  />

                  <div>
                    <strong>
                      Debit / Credit Card
                    </strong>
                    <span>
                      Pay securely using your
                      card
                    </span>
                  </div>
                </label>

                <label
                  className={`payment-option ${
                    paymentMethod === "bank"
                      ? "payment-option--active"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={
                      paymentMethod === "bank"
                    }
                    onChange={(e) =>
                      setPaymentMethod(
                        e.target.value
                      )
                    }
                  />

                  <FontAwesomeIcon
                    icon={faBuildingColumns}
                  />

                  <div>
                    <strong>
                      Bank Transfer
                    </strong>
                    <span>
                      Pay from your bank account
                    </span>
                  </div>
                </label>

                <div className="checkout-demo-box">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                  />

                  <p>
                    This is currently a demo
                    checkout. No card number,
                    PIN, CVV, or bank credentials
                    are collected.
                  </p>
                </div>
              </>
            ) : (
              <div className="checkout-free">
                No payment is required for the
                Starter plan.
              </div>
            )}

            {error && (
              <p className="field-error">
                {error}
              </p>
            )}
          </section>

          <aside className="checkout-card checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-summary-plan">
              <div>
                <strong>{plan.name}</strong>
                <span>
                {plan.id === "monthly"
                    ? "Monthly subscription"
                    : "Single pickup payment"}
                </span>
              </div>

              <strong>
                {formatPrice(plan.price)}
              </strong>
            </div>

            <div className="checkout-summary-row">
              <span>Subtotal</span>
              <strong>
                {formatPrice(plan.price)}
              </strong>
            </div>

            <div className="checkout-summary-row">
              <span>Processing fee</span>
              <strong>₦0</strong>
            </div>

            <div className="checkout-total">
              <span>Total</span>
              <strong>
                {formatPrice(plan.price)}
              </strong>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handlePayment}
              disabled={processing}
            >
              {processing
                ? "Processing..."
                : plan.price === 0
                ? "Activate Free Plan"
                : `Confirm ${formatPrice(
                    plan.price
                  )}`}
            </button>

            <small className="checkout-terms">
              Demo payment only. Real payment
              verification will be connected to
              the backend later.
            </small>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;