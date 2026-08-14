import React from "react";
import "./BookPickup.css";

const BookPickup = () => {
  return (
    <div className="book-pickup">
      <h1>Book Waste Collection</h1>
      <form>
        <label>Waste Type</label>
        <select>
          <option>Plastic</option>
          <option>Paper</option>
          <option>E-waste</option>
          <option>Metal</option>
          <option>Glass</option>
          <option>Others</option>
        </select>

        <label>Pickup Address</label>
        <input type="text" defaultValue="12 Oba street, Lagos Island" />

        <label>Quantity</label>
        <input type="number" defaultValue={2} />

        <label>Date</label>
        <input type="date" />

        <label>Time</label>
        <input type="time" />

        <button className="btn">Book Waste Pickup</button>
      </form>
    </div>
  );
}

export default BookPickup;
