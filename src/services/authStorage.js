const ACCESS_TOKEN_KEY = "renexa_access_token";
const REFRESH_TOKEN_KEY = "renexa_refresh_token";
const USER_KEY = "renexa_user";

export const saveAuthSession = ({
  accessToken,
  refreshToken,
  user,
}) => {
  sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAccessToken = () => {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = () => {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getCurrentUser = () => {
  const user = sessionStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
};

export const clearAuthSession = () => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
  return Boolean(getAccessToken());
};