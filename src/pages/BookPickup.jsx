import { useState } from "react";
import { useRouter } from "../router/Router";
import "../styles/BookPickup.css";

const initialForm = {
  wasteType: "Plastic",
  address: "12 Oba street, Lagos Island",
  quantity: 2,
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
    navigate("/reviewbooking");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Book Waste Collection</h1>
        <p>Fill in the details to schedule a pickup</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="wasteType">Select Waste Type</label>
          <select id="wasteType" name="wasteType" value={formData.wasteType} onChange={handleChange}>
            <option>Plastic</option>
            <option>Paper</option>
            <option>E-waste</option>
            <option>Metal</option>
            <option>Glass</option>
            <option>Others</option>
          </select>

          <label htmlFor="address">Pickup Address</label>
          <input id="address" name="address" type="text" value={formData.address} onChange={handleChange} />

          <label htmlFor="quantity">Quantity</label>
          <input id="quantity" name="quantity" type="number" min="1" value={formData.quantity} onChange={handleChange} />

          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} />

          <label htmlFor="time">Time</label>
          <input id="time" name="time" type="time" value={formData.time} onChange={handleChange} />

          <button type="submit" className="btn btn-block btn-primary">Book Waste Pickup</button>
        </form>
      </div>
    </div>
  );
};

export default BookPickup;
