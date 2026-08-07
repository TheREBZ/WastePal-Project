import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faRecycle, faLeaf } from "@fortawesome/free-solid-svg-icons";

const CHART_DATA = [30, 55, 42, 68, 48, 72, 60];

const BOOKINGS = [
  {
    date: "Nov 19, 2024",
    time: "08:00 AM - 10:00 AM",
    type: "Recyclables",
    location: "Main Office",
    status: "Confirmed",
  },
  {
    date: "Nov 22, 2024",
    time: "01:00 PM - 03:00 PM",
    type: "E-Waste",
    location: "Warehouse A",
    status: "Confirmed",
  },
  {
    date: "Nov 28, 2024",
    time: "09:00 AM - 11:00 AM",
    type: "General",
    location: "Main Office",
    status: "Pending",
  },
];

const DashboardOverview = ({ onNavigate }) => {
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
                <th>Date &amp; Time</th>
                <th>Waste Type</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {BOOKINGS.map((booking) => (
                <tr key={booking.date}>
                  <td>
                    <p className="dash-table-primary">{booking.date}</p>
                    <p className="dash-table-secondary">{booking.time}</p>
                  </td>
                  <td>{booking.type}</td>
                  <td>{booking.location}</td>
                  <td>
                    <span
                      className={`dash-status ${
                        booking.status === "Confirmed" ? "dash-status--confirmed" : "dash-status--pending"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="btn btn-primary" onClick={() => onNavigate("book-pickup")}>
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
