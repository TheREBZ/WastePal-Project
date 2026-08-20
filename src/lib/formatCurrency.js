/**
 * Formats a kobo-free Naira amount for display, e.g. 5000 -> "₦5,000".
 * Swap the locale/currency here if Renexa ever supports more than NGN.
 */
export function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}
