import { useEffect, useState } from "react";
import { useRouter } from "../router/Router";
import "../styles/ReviewBookings.css";

const ReviewBooking = () => {
  const { navigate } = useRouter();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const savedBooking = sessionStorage.getItem("wastepal-booking");
    if (savedBooking) {
      setBooking(JSON.parse(savedBooking));
    }
  }, []);

  const handleConfirm = () => {
    sessionStorage.removeItem("wastepal-booking");
    navigate("/dashboard");
  };

  if (!booking) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Review Booking</h1>
          <p>No booking details found. Please schedule a pickup first.</p>
          <button type="button" className="btn btn-block btn-primary" onClick={() => navigate("/bookpickup")}>
            Go to Book Pickup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Review Booking</h1>
        <ul>
          <li><strong>Waste Type:</strong> {booking.wasteType}</li>
          <li><strong>Pickup Address:</strong> {booking.address}</li>
          <li><strong>Quantity:</strong> {booking.quantity} {booking.quantity > 1 ? "Bags" : "Bag"}</li>
          <li><strong>Date:</strong> {booking.date || "Not set"}</li>
          <li><strong>Time:</strong> {booking.time || "Not set"}</li>
        </ul>
        <button type="button" className="btn btn-block btn-primary" onClick={handleConfirm}>Confirm Booking</button>
      </div>
    </div>
  );
};

export default ReviewBooking;
