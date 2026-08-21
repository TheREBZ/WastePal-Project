import { useRouter } from "./Router";
import SubscriptionPlan from "../pages/SubscriptionPlan";
import { setSubscriptionSelection } from "../state/subscriptionSelection";

export default function SubscribeRoute() {
  const { navigate } = useRouter(); // TODO: adjust if useRouter exposes a different name (push/setPath/etc.)

  return (
    <SubscriptionPlan
      onContinue={(selection) => {
        if (selection.billingType === "fixed") {
          // Monthly Plan: has a fee to pay now — go through checkout.
          setSubscriptionSelection(selection);
          navigate("/checkout");
        } else {
          // Custom Plan: pay-per-service, nothing to charge today —
          // skip checkout and send them straight to booking.
          setSubscriptionSelection(selection);
          navigate("/book-pickup");
        }
      }}
    />
  );
}
