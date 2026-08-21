import { useMemo, useState } from "react";
import PlanCard from "../components/PlanCard";
import OrderSummaryCard from "../components/OrderSummaryCard";
import styles from "../styles/SubscriptionPlanScreen.module.css";

/**
 * Renexa — Subscription / plan selection screen.
 *
 * Two plan types, not two billing cycles of the same plan:
 * - "monthly": fixed recurring fee, paid upfront via the checkout screen.
 * - "custom": pay-per-service — no fixed fee, so there's nothing to check
 *   out with here. Selecting it just confirms the choice and sends the
 *   user on to book their first service instead of to /checkout.
 *
 * Replace `PLANS` with your real plan data if pricing differs.
 *
 * @param {Object} props
 * @param {(selection: { plan: object, billingType: "fixed" | "per-service", amount: number | null }) => void} props.onContinue
 */
export default function SubscriptionPlanScreen({ onContinue }) {
  const [selectedPlanId, setSelectedPlanId] = useState("monthly");

  const PLANS = [
    {
      id: "monthly",
      name: "Monthly Plan",
      tagline: "One fixed fee, unlimited pickups scheduled",
      billingType: "fixed",
      amount: 5000,
      cadenceLabel: "per month",
      features: [
        "Unlimited scheduled pickups",
        "Priority scheduling",
        "Rewards on every pickup",
      ],
      highlighted: true,
    },
    {
      id: "custom",
      name: "Custom Plan",
      tagline: "Pay only for the pickups you book — no monthly fee",
      billingType: "per-service",
      amount: 750,
      priceLabel: "Pay per service",
      features: [
        "No recurring charge",
        "Priced per pickup at checkout",
        "Cancel or pause anytime",
      ],
    },
  ];

  const selectedPlan = PLANS.find((plan) => plan.id === selectedPlanId);
  const isFixedPlan = selectedPlan.billingType === "fixed";

  function handleContinue() {
    onContinue({
      plan: selectedPlan,
      billingType: selectedPlan.billingType,
      amount: isFixedPlan ? selectedPlan.amount : null,
    });
  }

  return (
    <div className= "auth-page">
      <div className="auth-card">
        <header className={styles.header}>
          <h1 className={styles.title}>Choose your plan</h1>
          <p className={styles.subtitle}>
            Pick the subscription that fits, then continue to Payment.
          </p>
        </header>

        <div className={styles.grid}>
          <div className={styles.plans}>
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                name={plan.name}
                tagline={plan.tagline}
                pricingType={plan.billingType}
                amount={plan.amount}
                cadenceLabel={plan.cadenceLabel}
                priceLabel={plan.priceLabel}
                features={plan.features}
                highlighted={plan.highlighted}
                selected={plan.id === selectedPlanId}
                onSelect={() => setSelectedPlanId(plan.id)}
              />
            ))}
          </div>

          <div className={styles.summaryColumn}>
            {isFixedPlan ? (
              <OrderSummaryCard
                planName={selectedPlan.name}
                planDescription="Monthly subscription"
                amount={selectedPlan.amount}
              />
            ) : (
              <div className={styles.customNotice}>
                <h2 className={styles.customNoticeHeading}>Custom Plan</h2>
                <p className={styles.customNoticeText}>
                  There's no subscription fee to pay today. You'll see the
                  price for each pickup when you book it, and only pay for
                  the services you use.
                </p>
              </div>
            )}

            <button type="button" className= "btn btn-block btn-primary" onClick={handleContinue}>
              {isFixedPlan ? "Continue to payment" : "Continue to book a pickup"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}