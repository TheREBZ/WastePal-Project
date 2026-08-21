import { useRouter } from "./Router";
import PaymentCheckout from "../pages/PaymentCheckout";
import { getSubscriptionSelection } from "../state/subscriptionSelection";

export default function CheckoutRoute() {
  const { navigate } = useRouter(); // TODO: same adjustment as SubscribeRoute
  const selection = getSubscriptionSelection();

  // Guard: someone landed here directly, or picked the Custom Plan
  // (which has no fee to check out with) — send them back to pick a plan.
  if (!selection || selection.billingType !== "fixed") {
    navigate("/subscribe");
    return null;
  }

  const { plan, amount } = selection;

  return (
    <PaymentCheckout
      plan={{
        name: plan.name,
        description: "Monthly subscription",
        amount,
      }}
      onChangePlan={() => navigate("/subscribe")}
      onCreatePaystackSession={createPaystackSession}
    />
  );
}

async function createPaystackSession(plan) {
  const response = await fetch("/api/payments/paystack/initialize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: plan.amount, planName: plan.name }),
  });

  if (!response.ok) throw new Error("Failed to initialize Paystack transaction.");
  return response.json(); // { authorizationUrl }
}
