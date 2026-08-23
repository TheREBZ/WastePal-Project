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


// CREATE A NEW PICKUP REQUEST
export const createBooking = async (
  bookingData,
  accessToken
) => {
  const response = await fetch(
    `${API_URL}/booking/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bookingData),
    }
  );

  return handleResponse(response);
};


// GET BOOKINGS FOR CURRENT LOGGED-IN USER
export const getMyBookings = async (accessToken) => {
  const response = await fetch(
    `${API_URL}/booking/bookings/mine`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return handleResponse(response);
};


// GET ALL BOOKINGS - ADMIN
export const getAdminBookings = async (accessToken) => {
  const response = await fetch(
    `${API_URL}/booking/bookings`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return handleResponse(response);
};


// ASSIGN A PICKER TO A BOOKING - ADMIN
export const assignPicker = async (
  bookingId,
  pickerId,
  accessToken
) => {
  const response = await fetch(
    `${API_URL}/booking/${bookingId}/assign`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        pickerId,
      }),
    }
  );

  return handleResponse(response);
};


// COMPLETE A BOOKING
export const completeBooking = async (
  bookingId,
  completionData,
  accessToken
) => {
  const response = await fetch(
    `${API_URL}/booking/${bookingId}/complete`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(completionData),
    }
  );

  return handleResponse(response);
};


// USER-FACING STATUS LABELS
export const getBookingStatusLabel = (status) => {
  switch (status) {
    case "booked":
      return "Pending";

    case "claimed":
      return "Confirmed";

    case "completed":
      return "Completed";

    case "failed":
      return "Failed";

    case "cancelled":
      return "Cancelled";

    default:
      return "Pending";
  }
};