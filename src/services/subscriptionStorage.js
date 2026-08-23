const SELECTED_PLAN_KEY = "renexa_selected_plan";
const SUBSCRIPTION_KEY = "renexa_subscription";

export const saveSelectedPlan = (plan) => {
  localStorage.setItem(
    SELECTED_PLAN_KEY,
    JSON.stringify(plan)
  );
};

export const getSelectedPlan = () => {
  const plan = localStorage.getItem(
    SELECTED_PLAN_KEY
  );

  return plan ? JSON.parse(plan) : null;
};

export const clearSelectedPlan = () => {
  localStorage.removeItem(SELECTED_PLAN_KEY);
};

export const saveSubscription = (subscription) => {
  localStorage.setItem(
    SUBSCRIPTION_KEY,
    JSON.stringify(subscription)
  );
};

export const getSubscription = () => {
  const subscription = localStorage.getItem(
    SUBSCRIPTION_KEY
  );

  return subscription
    ? JSON.parse(subscription)
    : null;
};

export const clearSubscription = () => {
  localStorage.removeItem(SUBSCRIPTION_KEY);
};