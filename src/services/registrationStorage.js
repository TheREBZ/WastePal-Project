const STORAGE_KEY = "renexa_registration";

export const saveRegistrationData = (data) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getRegistrationData = () => {
  const data = sessionStorage.getItem(STORAGE_KEY);

  return data ? JSON.parse(data) : null;
};

export const clearRegistrationData = () => {
  sessionStorage.removeItem(STORAGE_KEY);
};