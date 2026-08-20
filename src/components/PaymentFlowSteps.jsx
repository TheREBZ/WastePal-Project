import styles from "../styles/PaymentFlowSteps.module.css";

const STEPS = [
  { label: "Generate link", description: "We create a secure Paystack link for this order." },
  { label: "Redirect to Paystack", description: "Complete payment on Paystack's secure page." },
  { label: "Instant activation", description: "You're brought back and your plan activates." },
];

/**
 * @param {Object} props
 * @param {0 | 1 | 2 | 3} [props.currentStep] - 0 = not started, 3 = complete.
 *   Purely visual; drive it from your checkout state machine if you want
 *   the steps to fill in as the user progresses.
 */
export default function PaymentFlowSteps({ currentStep = 0 }) {
  return (
    <ol className={styles.steps} aria-label="How Paystack payment works">
      {STEPS.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber <= currentStep;
        const isActive = stepNumber === currentStep + 1;

        return (
          <li key={step.label} className={styles.step}>
            <span
              className={`${styles.marker} ${isComplete ? styles.markerComplete : ""} ${
                isActive ? styles.markerActive : ""
              }`}
              aria-hidden="true"
            >
              {isComplete ? <CheckIcon /> : stepNumber}
            </span>
            <div className={styles.stepText}>
              <p className={styles.stepLabel}>{step.label}</p>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
            {stepNumber < STEPS.length && (
              <span className={styles.connector} aria-hidden="true" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5L6.2 11.5L13 4.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
