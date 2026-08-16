import { useState } from "react";
import { useRouter } from "../router/Router";
import "../styles/BookPickup.css";

const initialForm = {
  wasteType: "Plastic",
  address: "",
  quantity: "1",
  date: "",
  time: "",
};

const BookPickup = () => {
  const { navigate } = useRouter();
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("wastepal-booking", JSON.stringify(formData));
    navigate("/review-booking");
  };

  return (
    <div className="book-pickup-overall-page">
      <div className="auth-card book-pickup-container" >
        <h1>Book Waste Collection</h1>
        <p className="select-header">Fill in the details to schedule a pickup</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="wasteType">Select Waste Type</label>
          <select className="book-options" id="wasteType" name="wasteType" value={formData.wasteType} onChange={handleChange}>
            <option>Plastic</option>
            <option>Paper</option>
            <option>E-waste</option>
            <option>Metal</option>
            <option>Glass</option>
            <option>Others</option>
          </select>

          <label htmlFor="address">Pickup Address</label>
          <textarea className="book-options-text" id="address" name="address" type="text" value={formData.address} onChange={handleChange} />

          <label htmlFor="quantity">Quantity</label>
          <input className="book-options" id="quantity" name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} />

          <label htmlFor="date">Date</label>
          <input className="book-options" id="date" name="date" type="date" value={formData.date} onChange={handleChange} />

          <label htmlFor="time">Time</label>
          <input className="book-options" id="time" name="time" type="time" value={formData.time} onChange={handleChange} />

          <button type="submit" className="btn btn-block btn-primary">Book Waste Pickup</button>
        </form>
      </div>
    </div>
  );
};

export default BookPickup;
