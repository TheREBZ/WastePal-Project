const API_URL = "https://renexa.onrender.com/api";

const handleResponse = async (response) => {
  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
      data?.error ||
      "Something went wrong. Please try again."
    );
  }

  return data;
};

export const getPickers = async (accessToken) => {
  const response = await fetch(`${API_URL}/picker`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
};

export const createPicker = async (
  pickerData,
  accessToken
) => {
  const response = await fetch(`${API_URL}/picker`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(pickerData),
  });

  return handleResponse(response);
};

export const deletePicker = async (
  pickerId,
  accessToken
) => {
  const response = await fetch(
    `${API_URL}/picker/${pickerId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return handleResponse(response);
};