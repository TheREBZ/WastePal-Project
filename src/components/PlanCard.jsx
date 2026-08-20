import { formatNaira } from "../lib/formatCurrency";
import styles from "../styles/PlanCard.module.css";

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {string} props.tagline
 * @param {number} props.amount - amount for the currently selected billing cycle
 * @param {string} props.cadenceLabel - "per month" | "per year"
 * @param {string[]} props.features
 * @param {boolean} [props.highlighted] - visually promote this plan
 * @param {boolean} props.selected
 * @param {() => void} props.onSelect
 */
export default function PlanCard({
  name,
  tagline,
  amount,
  cadenceLabel,
  features,
  highlighted,
  selected,
  onSelect,
}) {
  return (
    <div
      className={`${styles.card} ${highlighted ? styles.highlighted : ""} ${
        selected ? styles.selected : ""
      }`}
    >
      {highlighted && <span className={styles.badge}>Most popular</span>}

      <h3 className={styles.name}>{name}</h3>
      <p className={styles.tagline}>{tagline}</p>

      <p className={styles.price}>
        <span className={styles.priceAmount}>{formatNaira(amount)}</span>
        <span className={styles.priceCadence}>{cadenceLabel}</span>
      </p>

      <ul className={styles.features}>
        {features.map((feature) => (
          <li key={feature} className={styles.feature}>
            <CheckIcon />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={selected ? styles.selectButtonActive : styles.selectButton}
        onClick={onSelect}
      >
        {selected ? "Selected" : `Choose ${name}`}
      </button>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8.5L6.2 11.5L13 4.5"
        stroke="var(--renexa-success)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
