import React from "react";
import "./ReviewBooking.css";

const ReviewBooking = () => {
  return (
    <div className="review-booking">
      <h1>Review Booking</h1>
      <ul>
        <li><strong>Waste Type:</strong> Plastic</li>
        <li><strong>Pickup Address:</strong> 12 Oba street, Lagos Island</li>
        <li><strong>Quantity:</strong> 2 Bags</li>
        <li><strong>Date:</strong> August 14, 2026</li>
        <li><strong>Time:</strong> 12:00 pm</li>
      </ul>
      <button className="btn">Confirm Booking</button>
    </div>
  );
}

export default ReviewBooking;
