// Minimal in-memory handoff between /subscribe and /checkout (or
// /book-pickup, for the Custom Plan). Not persisted on purpose — if the
// user refreshes on /checkout with nothing selected, we send them back
// to /subscribe (see CheckoutRoute).
let currentSelection = null;

export function setSubscriptionSelection(selection) {
  currentSelection = selection;
}

export function getSubscriptionSelection() {
  return currentSelection;
}
