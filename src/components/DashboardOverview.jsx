import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faRecycle, faLeaf } from "@fortawesome/free-solid-svg-icons";

const CHART_DATA = [30, 55, 42, 68, 48, 72, 60];

const DashboardOverview = ({ onNavigate }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(
      localStorage.getItem("wastepal-bookings") || "[]"
    );

    setBookings(savedBookings);
  }, []);
  return (
    <div className="dash-overview">
      <div className="dash-cards">
        <div className="dash-card">
          <div className="dash-card-header">
            <p>Total Waste Collected</p>
            <span className="dash-pill dash-pill--up">+15% this month</span>
          </div>
          <p className="dash-card-value">1,240 kg</p>
          <div className="dash-mini-chart" aria-hidden="true">
            {CHART_DATA.map((value, index) => (
              <span key={index} style={{ height: `${value}%` }} />
            ))}
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <p>EcoPoints</p>
          </div>
          <p className="dash-card-value">4,500</p>
          <div className="dash-progress">
            <div className="dash-progress-bar" style={{ width: "68%" }} />
          </div>
          <p className="dash-progress-label">1,500 pts to next reward tier</p>
        </div>

        <div className="dash-card dash-card--accent">
          <span className="dash-card-icon">
            <FontAwesomeIcon icon={faTruck} />
          </span>
          <p className="dash-card-header-label">Next Pickup</p>
          <p className="dash-card-value dash-card-value--sm">2 days 14 hrs</p>
          <button type="button" className="btn btn-sm btn-outline" onClick={() => onNavigate("book-pickup")}>
            View details
          </button>
        </div>
      </div>

      <div className="dash-split">
        <div className="dash-panel">
          <div className="dash-panel-header">
            <h2>Upcoming Bookings</h2>
            <button type="button" className="dash-link-btn" onClick={() => onNavigate("book-pickup")}>
              See all
            </button>
          </div>
          <table className="dash-table">
            <thead>
              <tr>
                <th className="date-time">Date &amp; Time</th>
                <th className="waste-type">Waste Type</th>
                <th className="location">Location</th>
                <th className="status">Status</th>
              </tr>
            </thead>
            <tbody className="dash-table-body">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <p className="dash-table-primary">
                      {booking.date || "Date not set"}
                    </p>
                    <p className="dash-table-secondary">
                      {booking.time || "Time not set"}
                    </p>
                  </td>

                  <td>
                    <p className="dash-table-type">
                      {booking.wasteType}
                    </p>
                  </td>

                  <td>
                    <p className="dash-table-location">
                      {booking.address || "Address not provided"}
                    </p>
                  </td>

                  <td>
                    <span
                      className={`dash-status ${
                        booking.status === "Confirmed"
                          ? "dash-status--confirmed"
                          : "dash-status--pending"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="dash-empty-bookings">
                  <p>No upcoming bookings yet.</p>
                  <span>
                    Schedule a pickup to see it here.
                  </span>
                </td>
              </tr>
            )}
          </tbody>
          </table>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onNavigate("book-pickup")}
          >
            Schedule Pickup
          </button>
        </div>

        <div className="dash-panel dash-panel--impact">
          <h2>Impact Preview</h2>
          <span className="dash-impact-icon">
            <FontAwesomeIcon icon={faLeaf} />
          </span>
          <p className="dash-impact-value">15</p>
          <p className="dash-impact-label">Trees saved this year</p>
          <div className="dash-impact-row">
            <div>
              <FontAwesomeIcon icon={faRecycle} />
              <p>220 kg</p>
              <span>CO2 offset</span>
            </div>
            <div>
              <FontAwesomeIcon icon={faLeaf} />
              <p>1,085 L</p>
              <span>Water saved</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
