import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faRecycle,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

const DashboardOverview = ({ onNavigate }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedBookings = JSON.parse(
      localStorage.getItem("wastepal-bookings") || "[]"
    );

    setBookings(savedBookings);
  }, []);

  /*
   * Total waste collected
   *
   * We only count bookings that have an actual weight value.
   * Until the booking/backend flow provides weight data,
   * the dashboard correctly displays 0 kg instead of inventing a number.
   */
  const totalWasteCollected = useMemo(() => {
    return bookings.reduce((total, booking) => {
      const weight = Number(
        booking.weight ||
        booking.wasteWeight ||
        booking.weightKg ||
        0
      );

      return total + (Number.isFinite(weight) ? weight : 0);
    }, 0);
  }, [bookings]);

  /*
   * Find the next upcoming booking.
   *
   * For now we use the booking date stored by the existing
   * frontend booking system.
   */
  const nextBooking = useMemo(() => {
    if (!bookings.length) return null;

    const now = new Date();

    const upcoming = bookings
      .map((booking) => {
        const dateTime = new Date(
          `${booking.date || ""} ${booking.time || ""}`
        );

        return {
          ...booking,
          parsedDate: dateTime,
        };
      })
      .filter(
        (booking) =>
          !Number.isNaN(booking.parsedDate.getTime()) &&
          booking.parsedDate >= now
      )
      .sort((a, b) => a.parsedDate - b.parsedDate);

    return upcoming[0] || null;
  }, [bookings]);

  const formatNextPickup = () => {
    if (!nextBooking) return "No upcoming pickup";

    return nextBooking.date || "Date not set";
  };

  const formatNextPickupTime = () => {
    if (!nextBooking) return "Schedule a pickup to get started";

    return nextBooking.time || "Time not set";
  };

  return (
    <div className="dash-overview">
      {/* Summary cards */}
      <div className="dash-cards">

        <div className="dash-card">
          <div className="dash-card-header">
            <p>Total Waste Collected</p>
          </div>

          <p className="dash-card-value">
            {totalWasteCollected} kg
          </p>

          <p className="dash-progress-label">
            Based on completed pickup data
          </p>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <p>Pickup Activity</p>
          </div>

          <p className="dash-card-value">
            {bookings.length}
          </p>

          <p className="dash-progress-label">
            {bookings.length === 1
              ? "Pickup booking made"
              : "Pickup bookings made"}
          </p>
        </div>

        <div className="dash-card dash-card--accent">
          <span className="dash-card-icon">
            <FontAwesomeIcon icon={faTruck} />
          </span>

          <p className="dash-card-header-label">
            Next Pickup
          </p>

          <p className="dash-card-value dash-card-value--sm">
            {formatNextPickup()}
          </p>

          <p className="dash-next-pickup-time">
            {formatNextPickupTime()}
          </p>

          <button
            type="button"
            className="btn btn-sm btn-outline"
            onClick={() => onNavigate("book-pickup")}
          >
            {nextBooking ? "View details" : "Schedule pickup"}
          </button>
        </div>

      </div>

      {/* Bookings + recycling brief */}
      <div className="dash-split">

        <div className="dash-panel">
          <div className="dash-panel-header">
            <h2>Upcoming Bookings</h2>

            <button
              type="button"
              className="dash-link-btn"
              onClick={() => onNavigate("reports")}
            >
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
                        {booking.wasteType || "Not specified"}
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
                        {booking.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="dash-empty-bookings"
                  >
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

        {/* Recycling Brief */}
        <div className="dash-panel dash-panel--recycling-brief">

          <span className="dash-recycling-brief-icon">
            <FontAwesomeIcon icon={faLightbulb} />
          </span>

          <p className="dash-recycling-brief-label">
            RECYCLING BRIEF
          </p>

          <h2>
            Small sorting habits make a difference.
          </h2>

          <p className="dash-recycling-brief-text">
            Keeping recyclable materials separated from general waste
            makes collection and processing easier. Before your next
            pickup, try to keep plastics, paper, glass, and other
            recyclable materials clean and separated where possible.
          </p>

          <div className="dash-recycling-tip">
            <FontAwesomeIcon icon={faRecycle} />

            <span>
              <strong>Quick tip:</strong> Empty and rinse recyclable
              containers before placing them with your recyclables.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;