import { useState } from "react";
import SubscriptionPlanScreen from "./Subscription/SubscriptionPlanScreen";
import PaymentCheckoutScreen from "./Checkout/PaymentCheckoutScreen";

/**
 * Example only — shows how the two screens hand off to each other.
 * In the real app, swap this local `step` state for your router
 * (e.g. react-router routes at /subscribe and /checkout), and swap
 * `createPaystackSession` for a real call to your backend.
 */
export default function ExampleSubscriptionFlow() {
  const [step, setStep] = useState("plan"); // "plan" | "checkout"
  const [selection, setSelection] = useState(null);

  if (step === "plan") {
    return (
      <SubscriptionPlanScreen
        onContinue={(selected) => {
          setSelection(selected);
          setStep("checkout");
        }}
      />
    );
  }

  return (
    <PaymentCheckoutScreen
      plan={{
        name: selection.plan.name,
        description:
          selection.cycle === "monthly" ? "Monthly subscription" : "Annual subscription",
        amount: selection.amount,
      }}
      onChangePlan={() => setStep("plan")}
      onCreatePaystackSession={createPaystackSession}
    />
  );
}

/**
 * Replace with a real fetch to your backend. Your backend should call
 * Paystack's "Initialize Transaction" endpoint server-side (it needs your
 * secret key) and return the authorization_url here — never call Paystack
 * directly from the browser with a secret key.
 */
async function createPaystackSession(plan) {
  const response = await fetch("/api/payments/paystack/initialize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: plan.amount,
      planName: plan.name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to initialize Paystack transaction.");
  }

  const data = await response.json();
  // Expecting: { authorizationUrl: string }
  return data;
}
