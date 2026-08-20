import { useMemo, useState } from "react";
import PlanCard from "../components/PlanCard";
import OrderSummaryCard from "../components/OrderSummaryCard";
import styles from "../styles/SubscriptionPlanScreen.module.css";

/**
 * Renexa — Subscription / plan selection screen.
 * Sits before the checkout screen: the user picks a plan + billing cycle,
 * sees the resulting order summary, then continues to payment.
 *
 * Replace `PLANS` with your real plan catalogue (or pass it in as a prop —
 * left inline here since none was provided in the brief).
 *
 * @param {Object} props
 * @param {(selection: { plan: object, cycle: "monthly" | "annual", amount: number }) => void} props.onContinue
 */
export default function SubscriptionPlanScreen({ onContinue }) {
  const [cycle, setCycle] = useState("monthly");
  const [selectedPlanId, setSelectedPlanId] = useState("premium");

  const PLANS = useMemo(
    () => [
      {
        id: "basic",
        name: "Basic",
        tagline: "For getting started with Renexa",
        monthly: 2000,
        annual: 20000,
        features: ["Core features", "1 workspace", "Email support"],
      },
      {
        id: "premium",
        name: "Premium Plan",
        tagline: "Full access, priced for growing teams",
        monthly: 5000,
        annual: 50000,
        features: [
          "Everything in Basic",
          "Unlimited workspaces",
          "Priority support",
          "Advanced analytics",
        ],
        highlighted: true,
      },
    ],
    []
  );

  const selectedPlan = PLANS.find((plan) => plan.id === selectedPlanId);
  const amount = selectedPlan[cycle];
  const annualSavings = selectedPlan.monthly * 12 - selectedPlan.annual;

  function handleContinue() {
    onContinue({ plan: selectedPlan, cycle, amount });
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Choose your plan</h1>
          <p className={styles.subtitle}>
            Pick the subscription that fits, then continue to payment.
          </p>
        </header>

        <div className={styles.cycleToggle} role="radiogroup" aria-label="Billing cycle">
          <button
            type="button"
            role="radio"
            aria-checked={cycle === "monthly"}
            className={cycle === "monthly" ? styles.cycleActive : styles.cycleOption}
            onClick={() => setCycle("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={cycle === "annual"}
            className={cycle === "annual" ? styles.cycleActive : styles.cycleOption}
            onClick={() => setCycle("annual")}
          >
            Annual
            <span className={styles.savingsPill}>Save {annualSavings > 0 ? Math.round((annualSavings / (selectedPlan.monthly * 12)) * 100) : 0}%</span>
          </button>
        </div>

        <div className={styles.grid}>
          <div className={styles.plans}>
            {PLANS.map((plan) => (
              <PlanCard
                key={plan.id}
                name={plan.name}
                tagline={plan.tagline}
                amount={plan[cycle]}
                cadenceLabel={cycle === "monthly" ? "per month" : "per year"}
                features={plan.features}
                highlighted={plan.highlighted}
                selected={plan.id === selectedPlanId}
                onSelect={() => setSelectedPlanId(plan.id)}
              />
            ))}
          </div>

          <div className={styles.summaryColumn}>
            <OrderSummaryCard
              planName={selectedPlan.name}
              planDescription={cycle === "monthly" ? "Monthly subscription" : "Annual subscription"}
              amount={amount}
            />
            <button type="button" className={styles.continueButton} onClick={handleContinue}>
              Continue to payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
