import { useState } from "react";
import OrderSummaryCard from "../components/OrderSummaryCard";
import PaymentMethodOption from "../components/PaymentMethodOption";
import PaymentFlowSteps from "../components/PaymentFlowSteps";
import styles from "../styles/PaymentCheckoutScreen.module.css";

/**
 * Renexa — Payment checkout screen.
 *
 * Flow: user lands here with a plan already chosen (from
 * SubscriptionPlanScreen) -> clicks "Pay with Paystack" -> we call the
 * backend to create a Paystack payment link/session -> redirect.
 *
 * Wire `onCreatePaystackSession` to your real API call. It must resolve to
 * `{ authorizationUrl: string }` (the standard shape returned by Paystack's
 * "initialize transaction" endpoint) or reject/throw on failure.
 *
 * @param {Object} props
 * @param {{ name: string, description: string, amount: number }} props.plan
 * @param {(plan: object) => Promise<{ authorizationUrl: string }>} props.onCreatePaystackSession
 * @param {() => void} [props.onChangePlan] - "back" affordance, optional
 */
export default function PaymentCheckoutScreen({
  plan,
  onCreatePaystackSession,
  onChangePlan,
}) {
  const [status, setStatus] = useState("idle"); // idle | generating | ready | redirecting | error
  const [paymentLink, setPaymentLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const currentStep = status === "redirecting" ? 2 : status === "ready" ? 1 : 0;

  async function handleGenerateLink() {
    setStatus("generating");
    setErrorMessage("");
    try {
      const session = await onCreatePaystackSession(plan);
      setPaymentLink(session.authorizationUrl);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err?.message || "We couldn't generate a payment link. Please try again."
      );
    }
  }

  function handlePayWithPaystack() {
    if (!paymentLink) return;
    setStatus("redirecting");
    window.location.assign(paymentLink);
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          {onChangePlan && (
            <button type="button" className={styles.backLink} onClick={onChangePlan}>
              <BackArrowIcon /> Change plan
            </button>
          )}
          <h1 className={styles.title}>Make subscription payment</h1>
          <p className={styles.subtitle}>
            Secure your plan and continue enjoying Renexa
          </p>
        </header>

        <div className={styles.grid}>
          <section className={styles.methodCard} aria-labelledby="payment-method-heading">
            <h2 id="payment-method-heading" className={styles.sectionLabel}>
              Payment method
            </h2>

            <PaymentMethodOption
              id="method-paystack"
              name="payment-method"
              selected
              onSelect={() => {}}
              title="Paystack"
              description="Pay securely via Paystack payment link"
              icon={<PaystackIcon />}
            />

            <div className={styles.howItWorks}>
              <h3 className={styles.howItWorksTitle}>How it works</h3>
              <PaymentFlowSteps currentStep={currentStep} />
            </div>

            <div className={styles.action}>
              {status !== "ready" && status !== "redirecting" && (
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleGenerateLink}
                  disabled={status === "generating"}
                >
                  {status === "generating" ? (
                    <>
                      <Spinner /> Generating link…
                    </>
                  ) : (
                    "Generate payment link"
                  )}
                </button>
              )}

              {(status === "ready" || status === "redirecting") && (
                <button
                  type="button"
                  className={styles.paystackButton}
                  onClick={handlePayWithPaystack}
                  disabled={status === "redirecting"}
                >
                  <PaystackMark />
                  {status === "redirecting" ? "Redirecting…" : "Pay with Paystack"}
                </button>
              )}

              {status === "error" && (
                <p className={styles.errorText} role="alert">
                  {errorMessage}
                </p>
              )}

              <p className={styles.helperText}>
                <LockIcon /> You'll be redirected to Paystack to complete your
                payment.
              </p>
            </div>
          </section>

          <OrderSummaryCard
            planName={plan.name}
            planDescription={plan.description}
            amount={plan.amount}
          />
        </div>
      </div>
    </div>
  );
}

function PaystackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="3" rx="1" fill="var(--paystack-green)" />
      <rect x="3" y="10.5" width="18" height="3" rx="1" fill="var(--paystack-green)" opacity="0.75" />
      <rect x="3" y="16" width="12" height="3" rx="1" fill="var(--paystack-green)" opacity="0.5" />
    </svg>
  );
}

function PaystackMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="white" fillOpacity="0.2" />
      <path d="M8 12l2.5 2.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BackArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M9.5 3L4.5 8L9.5 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="3.5" y="7" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function Spinner() {
  return <span className={styles.spinner} aria-hidden="true" />;
}
