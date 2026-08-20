import { formatNaira } from "../lib/formatCurrency";
import styles from "../styles/OrderSummaryCard.module.css";

/**
 * Sticky order summary shown alongside plan selection and checkout.
 *
 * @param {Object} props
 * @param {string} props.planName - e.g. "Premium Plan"
 * @param {string} props.planDescription - e.g. "Monthly subscription"
 * @param {number} props.amount - plan amount in Naira (major unit)
 * @param {{ label: string, amount: number }[]} [props.lineItems] - extra
 *   rows above the total (discounts, proration, tax). Amount may be
 *   negative for discounts.
 */
export default function OrderSummaryCard({
  planName,
  planDescription,
  amount,
  lineItems = [],
}) {
  const total = amount + lineItems.reduce((sum, item) => sum + item.amount, 0);

  return (
    <aside className={styles.card} aria-label="Order summary">
      <h2 className={styles.heading}>Order summary</h2>

      <div className={styles.plan}>
        <span className={styles.planIcon} aria-hidden="true">
          <CrownIcon />
        </span>
        <div>
          <p className={styles.planName}>{planName}</p>
          <p className={styles.planDescription}>{planDescription}</p>
        </div>
      </div>

      <dl className={styles.lines}>
        <div className={styles.line}>
          <dt>Plan amount</dt>
          <dd className={styles.amountMono}>{formatNaira(amount)}</dd>
        </div>

        {lineItems.map((item) => (
          <div className={styles.line} key={item.label}>
            <dt>{item.label}</dt>
            <dd className={styles.amountMono}>
              {item.amount < 0 ? "-" : ""}
              {formatNaira(Math.abs(item.amount))}
            </dd>
          </div>
        ))}
      </dl>

      <div className={styles.totalRow}>
        <span>Total amount</span>
        <span className={styles.totalAmount}>{formatNaira(total)}</span>
      </div>
    </aside>
  );
}

function CrownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 8L7.5 11L12 4L16.5 11L21 8L19 18H5L3 8Z"
        fill="currentColor"
      />
    </svg>
  );
}
