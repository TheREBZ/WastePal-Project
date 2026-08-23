import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
  faLocationDot,
  faRecycle,
  faBagShopping,
  faArrowLeft,
  faCircleCheck,
  faRuler,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import "../styles/ReviewBookings.css";
import { createBooking } from "../services/bookingService";
import { getAccessToken } from "../services/authStorage";

// Backend enum values -> friendly display labels
const WASTE_TYPE_LABELS = {
  plastic: "Plastic",
  paper: "Paper",
  e_waste: "E-waste",
  metal: "Metal",
  glass: "Glass",
  other: "Others",
};

const BAG_SIZE_LABELS = {
  large: "Big",
  medium: "Medium",
  small: "Small",
};

const ReviewBooking = () => {
  const { navigate } = useRouter();

  const [booking, setBooking] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedBooking = sessionStorage.getItem("wastepal-booking");

    if (savedBooking) {
      try {
        setBooking(JSON.parse(savedBooking));
      } catch {
        sessionStorage.removeItem("wastepal-booking");
      }
    }
  }, []);

  const handleConfirm = async () => {
    if (!booking) return;

    const accessToken = getAccessToken();

    if (!accessToken) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      // Backend expects exactly: waste_type, pickup_address, quantity,
      // bagSize, pickup_date (ISO date), pickup_time ("HH:mm").
      await createBooking(
        {
          waste_type: booking.wasteType,
          pickup_address: booking.address,
          quantity: Number(booking.bag),
          bagSize: booking.bagSize,
          pickup_date: booking.date,
          pickup_time: booking.time,
        },
        accessToken
      );

      setIsConfirmed(true);

      setTimeout(() => {
        sessionStorage.removeItem("wastepal-booking");
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError(err.message || "Unable to create your booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!booking) {
    return (
      <main className="review-booking-page">
        <div className="review-booking-empty">
          <h1>No booking found</h1>

          <p>
            We couldn't find any pickup details to review.
            Please schedule a pickup first.
          </p>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="review-booking-page">
      <div className="review-booking-wrapper">

        <button
          type="button"
          className="review-back-button"
          onClick={() => navigate("/dashboard")}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to booking
        </button>

        <div className="review-booking-header">
          <h1>Review your pickup request</h1>

          <p>
            Please check your collection details before
            confirming your booking.
          </p>
        </div>

        <section className="review-booking-card">
          <div className="review-booking-grid">

            <div className="review-detail">
              <span className="review-detail-label">
                Waste Type
              </span>

              <div className="review-detail-value">
                <span className="review-detail-icon">
                  <FontAwesomeIcon icon={faRecycle} />
                </span>

                {WASTE_TYPE_LABELS[booking.wasteType] || booking.wasteType || "Not specified"}
              </div>
            </div>

            <div className="review-detail">
              <span className="review-detail-label">
                Number of Bags
              </span>

              <div className="review-detail-value">
                <span className="review-detail-icon">
                  <FontAwesomeIcon icon={faBagShopping} />
                </span>

                {booking.bag || "1"}{" "}
                {Number(booking.bag) > 1 ? "Bags" : "Bag"}
              </div>
            </div>

            <div className="review-detail">
              <span className="review-detail-label">
                Bag Size
              </span>

              <div className="review-detail-value">
                <span className="review-detail-icon">
                  <FontAwesomeIcon icon={faRuler} />
                </span>

                {BAG_SIZE_LABELS[booking.bagSize] || booking.bagSize || "Not specified"}
              </div>
            </div>

            <div className="review-detail review-detail--full">
              <span className="review-detail-label">
                Pickup Address
              </span>

              <div className="review-detail-value">
                <span className="review-detail-icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>

                {booking.address || "No address provided"}
              </div>
            </div>

            <div className="review-detail">
              <span className="review-detail-label">
                Date
              </span>

              <div className="review-detail-value">
                <span className="review-detail-icon">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </span>

                {booking.date || "Not set"}
              </div>
            </div>

            <div className="review-detail">
              <span className="review-detail-label">
                Time
              </span>

              <div className="review-detail-value">
                <span className="review-detail-icon">
                  <FontAwesomeIcon icon={faClock} />
                </span>

                {booking.time || "Not set"}
              </div>
            </div>

          </div>

          {error && (
            <p className="field-error">
              {error}
            </p>
          )}

          <div className="review-booking-actions">
            <button
              type="button"
              className="btn btn-primary review-confirm-button"
              onClick={handleConfirm}
              disabled={isConfirmed || submitting}
            >
              {isConfirmed ? (
                <>
                  <FontAwesomeIcon icon={faCircleCheck} />
                  Booking Confirmed
                </>
              ) : submitting ? (
                "Confirming..."
              ) : (
                "Submit Pickup request"
              )}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ReviewBooking;