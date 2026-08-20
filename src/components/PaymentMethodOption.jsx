import styles from "../styles/PaymentMethodOption.module.css";

/**
 * A single selectable payment method. Renders as a radio for accessibility
 * even though today there's only one option — this keeps the component
 * ready for when Renexa adds bank transfer / cards directly, etc.
 *
 * @param {Object} props
 * @param {string} props.id
 * @param {string} props.name - radio group name
 * @param {boolean} props.selected
 * @param {() => void} props.onSelect
 * @param {string} props.title
 * @param {string} props.description
 * @param {React.ReactNode} props.icon
 */
export default function PaymentMethodOption({
  id,
  name,
  selected,
  onSelect,
  title,
  description,
  icon,
}) {
  return (
    <label
      htmlFor={id}
      className={`${styles.option} ${selected ? styles.optionSelected : ""}`}
    >
      <input
        type="radio"
        id={id}
        name={name}
        checked={selected}
        onChange={onSelect}
        className={styles.radio}
      />
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </span>
    </label>
  );
}
