import { useEffect, useState } from "react";
import { useRouter } from "../router/Router";
import "../styles/ReviewBookings.css";

const ReviewBooking = () => {
  const { navigate } = useRouter();
  const [booking, setBooking] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const savedBooking = sessionStorage.getItem("wastepal-booking");
    if (savedBooking) {
      setBooking(JSON.parse(savedBooking));
    }
  }, []);

  const handleConfirm = () => {
    setIsConfirmed(true);
    setTimeout(() => {
    sessionStorage.removeItem("wastepal-booking");
    navigate("/dashboard");
    }, 1500);
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
      <div className="auth-card review-booking-card">
        <h1>Review Booking</h1>
          <p><strong>Waste Type:</strong> </p>
          <p>{booking.wasteType}</p>
          <p><strong>Pickup Address:</strong></p>
          <p>{booking.address}</p>
          <p><strong>Quantity:</strong> {booking.quantity} {booking.quantity > 1 ? "Bags" : "Bag"}</p>
          <p><strong>Date:</strong> {booking.date || "Not set"}</p>
          <p><strong>Time:</strong> {booking.time || "Not set"}</p>
        <button type="button" className="btn btn-block btn-primary" onClick={handleConfirm} disabled={isConfirmed}>{isConfirmed ? "Confirmed" : "Confirm Booking"}</button>
      </div>
    </div>
  );
};

export default ReviewBooking;
