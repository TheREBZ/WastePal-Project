import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faRecycle,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import { getAccessToken } from "../services/authStorage";
import {
  getMyBookings,
  getBookingStatusLabel,
} from "../services/bookingService";

const DashboardOverview = ({ onNavigate }) => {
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [bookingError, setBookingError] = useState("");

  useEffect(() => {
    const loadBookings = async () => {
      const accessToken = getAccessToken();
  
      if (!accessToken) {
        setLoadingBookings(false);
        return;
      }
  
      try {
        const response = await getMyBookings(accessToken);
  
        const bookingData =
          response?.data?.bookings ||
          response?.data ||
          [];
  
        setBookings(
          Array.isArray(bookingData) ? bookingData : []
        );
      } catch (error) {
        console.error("Unable to load bookings:", error);
  
        setBookingError(
          "Unable to load your pickup requests right now."
        );
      } finally {
        setLoadingBookings(false);
      }
    };
  
    loadBookings();
  }, []);

  const normalizeBooking = (booking) => ({
    id: booking.booking_id || booking.id,
    wasteType: booking.waste_type || "",
    address: booking.pickup_address || "",
    date: booking.pickup_date || "",
    time: booking.pickup_time || "",
    quantity: booking.quantity || 0,
    bagSize: booking.bagSize || "",
    status: booking.status || "booked",
  });

  const normalizedBookings = useMemo(
    () => bookings.map(normalizeBooking),
    [bookings]
  );
  const upcomingBookings = useMemo(() => {
    return normalizedBookings
      .filter((booking) =>
        ["booked", "claimed"].includes(booking.status)
      )
      .filter((booking) => booking.date)
      .sort((a, b) => {
        const first = new Date(
          `${a.date}T${a.time || "00:00"}`
        );
  
        const second = new Date(
          `${b.date}T${b.time || "00:00"}`
        );
  
        return first - second;
      });
  }, [normalizedBookings]);
  
  const totalWasteCollected = 0;

  /*
   * Find the next upcoming booking.
   *
   * For now we use the booking date stored by the existing
   * frontend booking system.
   */
  const nextBooking = upcomingBookings[0] || null;

  const formatNextPickup = () => {
    if (!nextBooking) return "No upcoming pickup";

    return nextBooking.date || "Date not set";
  };

  const formatNextPickupTime = () => {
    if (!nextBooking) {
      return "Schedule a pickup to get started";
    }
  
    return `${nextBooking.time || "Time not set"} • ${getBookingStatusLabel(
      nextBooking.status
    )}`;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "booked":
        return "dash-status--pending";
  
      case "claimed":
        return "dash-status--confirmed";
  
      case "completed":
        return "dash-status--completed";
  
      case "failed":
      case "cancelled":
        return "dash-status--failed";
  
      default:
        return "dash-status--pending";
    }
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
            {normalizedBookings.length}
          </p>

          <p className="dash-progress-label">
            {normalizedBookings.length === 1
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
          
          {loadingBookings && (
            <p className="dash-table-secondary">
              Loading pickup requests...
            </p>
          )}

          {bookingError && (
            <p className="field-error">
              {bookingError}
            </p>
          )}
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
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
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
                      className={`dash-status ${getStatusClass(
                        booking.status
                      )}`}
                    >
                      {getBookingStatusLabel(booking.status)}
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