import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faClock,
  faCircleCheck,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { getAccessToken } from "../services/authStorage";
import {
  getMyBookings,
  getBookingStatusLabel,
} from "../services/bookingService";

const DashboardReports = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedBookingId, setExpandedBookingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let isMounted = true;

    const loadBookingHistory = async () => {
      const accessToken = getAccessToken();

      if (!accessToken) {
        if (isMounted) {
          setError("Your session has expired. Please log in again.");
          setLoading(false);
        }

        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await getMyBookings(accessToken);

        const bookingData =
          response?.data?.bookings ??
          response?.data ??
          [];

        if (isMounted) {
          setBookings(
            Array.isArray(bookingData)
              ? bookingData
              : []
          );
        }
      } catch (err) {
        console.error(
          "Unable to load booking history:",
          err
        );

        if (isMounted) {
          setError(
            err.message ||
              "Unable to load your pickup history right now."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadBookingHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  const normalizedBookings = useMemo(() => {
    return bookings.map((booking) => ({
      id: booking.booking_id || booking.id,

      wasteType:
        booking.waste_type || "Not specified",

      address:
        booking.pickup_address ||
        "Address not provided",

      quantity:
        Number(booking.quantity) || 0,

      bagSize:
        booking.bagSize || "",

      date:
        booking.pickup_date || "",

      time:
        booking.pickup_time || "",

      status:
        booking.status || "booked",

      completionStatus:
        booking.completion_status || null,

      completedAt:
        booking.completed_at || null,

      createdAt:
        booking.created_at ||
        booking.time_of_booking ||
        null,

      picker:
        booking.picker?.fullName ||
        booking.picker?.name ||
        "Not assigned",

      statusLogs:
        Array.isArray(booking.statusLogs)
          ? booking.statusLogs
          : [],
    }));
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    if (statusFilter === "all") {
      return normalizedBookings;
    }

    return normalizedBookings.filter(
      (booking) =>
        booking.status === statusFilter
    );
  }, [normalizedBookings, statusFilter]);

  const completedCount =
    normalizedBookings.filter(
      (booking) =>
        booking.status === "completed"
    ).length;

  const pendingCount =
    normalizedBookings.filter(
      (booking) =>
        booking.status === "booked"
    ).length;

  const confirmedCount =
    normalizedBookings.filter(
      (booking) =>
        booking.status === "claimed"
    ).length;

  const formatDate = (value) => {
    if (!value) return "Not available";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return new Intl.DateTimeFormat(
      "en-NG",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    ).format(date);
  };

  const formatTime = (value) => {
    if (!value) return "Not set";

    return value.slice(0, 5);
  };

  const formatText = (value) => {
    if (!value) return "Not specified";

    return value
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  const getStatusIcon = (status) => {
    if (status === "completed") {
      return faCircleCheck;
    }

    if (
      status === "failed" ||
      status === "cancelled"
    ) {
      return faTriangleExclamation;
    }

    return faClock;
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "booked":
        return "dash-status--pending";

      case "claimed":
      case "picked_up":
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

  const toggleBooking = (bookingId) => {
    setExpandedBookingId((current) =>
      current === bookingId
        ? null
        : bookingId
    );
  };

  return (
    <div className="reports-container">
      <div className="report-header-text">
        <div>
          <h2>Pickup History</h2>

          <p>
            View all your waste pickup requests
            and follow their progress from
            booking to completion.
          </p>
        </div>
      </div>

      <div className="report-history-summary">
        <div className="report-history-card">
          <span>Total Requests</span>
          <strong>{normalizedBookings.length}</strong>
        </div>

        <div className="report-history-card">
          <span>Pending</span>
          <strong>{pendingCount}</strong>
        </div>

        <div className="report-history-card">
          <span>Confirmed</span>
          <strong>{confirmedCount}</strong>
        </div>

        <div className="report-history-card">
          <span>Completed</span>
          <strong>{completedCount}</strong>
        </div>
      </div>

      <div className="report-history-controls">
        <label>
          <span>Filter by status</span>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
          >
            <option value="all">
              All Requests
            </option>

            <option value="booked">
              Pending
            </option>

            <option value="claimed">
              Confirmed
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="failed">
              Failed
            </option>

            <option value="cancelled">
              Cancelled
            </option>
          </select>
        </label>
      </div>

      {loading && (
        <div className="reports-demo-notice">
          Loading your pickup history...
        </div>
      )}

      {error && (
        <p className="field-error">
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        normalizedBookings.length === 0 && (
          <div className="dash-empty-bookings">
            <p>No pickup history yet.</p>

            <span>
              Your pickup requests will appear here
              once you start using ReNexa.
            </span>
          </div>
        )}

      {!loading &&
        !error &&
        normalizedBookings.length > 0 && (
          <div className="report-panel">
            <div className="report-table-wrapper">
              <table className="dash-table dash-reports-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Waste Type</th>
                    <th>Quantity</th>
                    <th>Picker</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map((booking) => {
                    const isOpen =
                      expandedBookingId === booking.id;

                    return (
                      <>
                        <tr
                          key={booking.id}
                          className={`dash-reports-row ${
                            isOpen
                              ? "dash-reports-row--active"
                              : ""
                          }`}
                          onClick={() =>
                            toggleBooking(booking.id)
                          }
                        >
                          <td>
                            <p className="dash-table-primary">
                              {formatDate(booking.date)}
                            </p>

                            <p className="dash-table-secondary">
                              {formatTime(booking.time)}
                            </p>
                          </td>

                          <td>
                            {formatText(
                              booking.wasteType
                            )}
                          </td>

                          <td>
                            {booking.quantity}{" "}
                            {booking.quantity === 1
                              ? "bag"
                              : "bags"}

                            {booking.bagSize
                              ? ` • ${formatText(
                                  booking.bagSize
                                )}`
                              : ""}
                          </td>

                          <td>{booking.picker}</td>

                          <td>
                            <span
                              className={`dash-status ${getStatusClass(
                                booking.status
                              )}`}
                            >
                              <FontAwesomeIcon
                                icon={getStatusIcon(
                                  booking.status
                                )}
                              />{" "}
                              {getBookingStatusLabel(
                                booking.status
                              )}
                            </span>
                          </td>

                          <td className="dash-reports-chevron">
                            <button
                              type="button"
                              className="dash-reports-toggle"
                              aria-expanded={isOpen}
                              onClick={(event) => {
                                event.stopPropagation();

                                toggleBooking(
                                  booking.id
                                );
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faChevronDown}
                                className={
                                  isOpen
                                    ? "dash-reports-chevron--open"
                                    : ""
                                }
                              />
                            </button>
                          </td>
                        </tr>

                        <tr
                          key={`${booking.id}-details`}
                          className="dash-reports-details-row"
                          hidden={!isOpen}
                        >
                          <td colSpan={6}>
                            <div className="dash-report-details">
                              <div className="report-detail-grid">
                                <div>
                                  <span>
                                    Booking ID
                                  </span>

                                  <strong>
                                    {booking.id}
                                  </strong>
                                </div>

                                <div>
                                  <span>
                                    Pickup Address
                                  </span>

                                  <strong>
                                    {booking.address}
                                  </strong>
                                </div>

                                <div>
                                  <span>
                                    Current Status
                                  </span>

                                  <strong>
                                    {getBookingStatusLabel(
                                      booking.status
                                    )}
                                  </strong>
                                </div>

                                <div>
                                  <span>
                                    Assigned Picker
                                  </span>

                                  <strong>
                                    {booking.picker}
                                  </strong>
                                </div>

                                <div>
                                  <span>
                                    Requested On
                                  </span>

                                  <strong>
                                    {formatDate(
                                      booking.createdAt
                                    )}
                                  </strong>
                                </div>

                                {booking.completedAt && (
                                  <div>
                                    <span>
                                      Completed On
                                    </span>

                                    <strong>
                                      {formatDate(
                                        booking.completedAt
                                      )}
                                    </strong>
                                  </div>
                                )}

                                {booking.completionStatus && (
                                  <div>
                                    <span>
                                      Completion Result
                                    </span>

                                    <strong>
                                      {formatText(
                                        booking.completionStatus
                                      )}
                                    </strong>
                                  </div>
                                )}
                              </div>

                              {booking.statusLogs.length >
                                0 && (
                                <div className="report-status-history">
                                  <h3>
                                    Status History
                                  </h3>

                                  {booking.statusLogs
                                    .slice()
                                    .sort(
                                      (a, b) =>
                                        new Date(
                                          a.changed_at
                                        ) -
                                        new Date(
                                          b.changed_at
                                        )
                                    )
                                    .map((log) => (
                                      <div
                                        key={log.log_id}
                                        className="report-status-history-item"
                                      >
                                        <span>
                                          {getBookingStatusLabel(
                                            log.status
                                          )}
                                        </span>

                                        <small>
                                          {formatDate(
                                            log.changed_at
                                          )}
                                        </small>
                                      </div>
                                    ))}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>

              {filteredBookings.length === 0 && (
                <div className="dash-empty-bookings">
                  <p>
                    No pickup history found.
                  </p>

                  <span>
                    There are no bookings matching
                    this filter.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default DashboardReports;