const API_URL = "https://renexa.onrender.com/api";

const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      "Something went wrong. Please try again."
    );
  }

  return data;
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return handleResponse(response);
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return handleResponse(response);
};

export const refreshAccessToken = async (refreshToken) => {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    });
  
    return handleResponse(response);
  };
  
  export const logoutUser = async (accessToken) => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return handleResponse(response);
  };

export const verifyEmail = async (otp) => {
  const response = await fetch(`${API_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      otp,
    }),
  });

  return handleResponse(response);
};

export const resendOtp = async (email) => {
  const response = await fetch(`${API_URL}/auth/resend-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  return handleResponse(response);
};

export const forgotPassword = async (email) => {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

  return handleResponse(response);
};

export const resetPassword = async (token, password, confirmPassword) => {
  const response = await fetch(`${API_URL}/auth/reset-password/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      confirmPassword,
    }),
  });

  return handleResponse(response);
};

// --- Authenticated profile endpoints (require a Bearer access token) ---

export const setAccountType = async (role, accessToken) => {
  const response = await fetch(`${API_URL}/user/account-type`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      role,
    }),
  });

  return handleResponse(response);
};

export const completeProfile = async (profileData, accessToken) => {
  const response = await fetch(`${API_URL}/user/profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileData),
  });

  return handleResponse(response);
};

export const updateProfile = async (profileData, accessToken) => {
  const response = await fetch(`${API_URL}/user/update-user-profile`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(profileData),
  });

  return handleResponse(response);
};