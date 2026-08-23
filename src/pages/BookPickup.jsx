import { useState } from "react";
import { useRouter } from "../router/Router";
import "../styles/BookPickup.css";

const initialForm = {
  wasteType: "plastic",
  address: "",
  bag: "1",
  bagSize: "large",
  date: "",
  time: "",
};

const BookPickup = () => {
  const { navigate } = useRouter();

  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.address.trim()) {
      setError("Please enter your pickup address.");
      return;
    }

    if (!formData.date) {
      setError("Please select a pickup date.");
      return;
    }

    if (!formData.time) {
      setError("Please select a pickup time.");
      return;
    }

    sessionStorage.setItem(
      "wastepal-booking",
      JSON.stringify({
        ...formData,
        address: formData.address.trim(),
      })
    );

    navigate("/review-booking");
  };

  return (
    <div className="book-pickup-page">
      <div className="book-pickup-header">
        <h2>Book Waste Collection</h2>
        <p>
          Fill in the details below to schedule a waste pickup.
        </p>
      </div>

      <div className="book-pickup-card">
        <form
          className="book-pickup-form"
          onSubmit={handleSubmit}
        >
          <div className="book-form-group">
            <label htmlFor="wasteType">
              Select Waste Type
            </label>

            <select
              id="wasteType"
              name="wasteType"
              value={formData.wasteType}
              onChange={handleChange}
            >
              <option value="plastic">Plastic</option>
              <option value="paper">Paper</option>
              <option value="e_waste">E-waste</option>
              <option value="metal">Metal</option>
              <option value="glass">Glass</option>
              <option value="other">Others</option>
            </select>
          </div>

          <div className="book-form-group">
            <label htmlFor="address">
              Pickup Address
            </label>

            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Please enter specific details about your address, flat/block number and any available landmarks in your area."
            />
          </div>

          <div className="book-form-grid">
            <div className="book-form-group">
              <label htmlFor="bag">
                Number of Bags
              </label>

              <input
                id="bag"
                name="bag"
                type="number"
                min="1"
                value={formData.bag}
                onChange={handleChange}
              />
            </div>

            <div className="book-form-group">
              <label htmlFor="bagSize">
                Select Bag Size
              </label>

              <select
                id="bagSize"
                name="bagSize"
                value={formData.bagSize}
                onChange={handleChange}
              >
                <option value="large">Big</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
              </select>
            </div>

            <div className="book-form-group">
              <label htmlFor="date">
                Date
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="book-form-group">
              <label htmlFor="time">
                Time
              </label>

              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <p className="field-error">
              {error}
            </p>
          )}

          <div className="book-pickup-actions">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Continue to Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookPickup;