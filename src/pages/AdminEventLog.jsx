import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faCalendarDays,
  faMagnifyingGlass,
  faCircleCheck,
  faClock,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/AdminEventLog.css";
import Link from "../router/Link";
import { useRouter } from "../router/Router";
import { getAccessToken } from "../services/authStorage";
import {
  getAdminBookings,
  getBookingStatusLabel,
} from "../services/bookingService";

const AdminEventLog = () => {
  const { navigate } = useRouter();

  const [bookings, setBookings] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      setError("Admin session not found. Please log in again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await getAdminBookings(accessToken);

      const bookingData =
        response?.data?.bookings ||
        response?.data ||
        [];

      setBookings(
        Array.isArray(bookingData)
          ? bookingData
          : []
      );
    } catch (err) {
      console.error("Unable to load admin bookings:", err);

      setError(
        err.message ||
          "Unable to load pickup requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const normalizedBookings = useMemo(() => {
    return bookings.map((booking) => ({
      id: booking.booking_id || booking.id,

      wasteType:
        booking.waste_type || "Not specified",

      address:
        booking.pickup_address ||
        "No address provided",

      quantity: booking.quantity || 0,

      bagSize: booking.bagSize || "",

      date: booking.pickup_date || "",

      time: booking.pickup_time || "",

      status: booking.status || "booked",

      requester:
        booking.requester?.firstName
          ? `${booking.requester.firstName} ${
              booking.requester.lastName || ""
            }`.trim()
          : booking.requester?.email ||
            "Unknown user",

      picker:
        booking.picker?.fullName ||
        booking.picker?.name ||
        (booking.picker?.firstName
          ? `${booking.picker.firstName} ${
              booking.picker.lastName || ""
            }`.trim()
          : null),
    }));
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return normalizedBookings.filter(
      (booking) => {
        const matchesStatus =
          statusFilter === "all" ||
          booking.status === statusFilter;

        const matchesSearch =
          !searchValue ||
          booking.requester
            .toLowerCase()
            .includes(searchValue) ||
          booking.id
            ?.toString()
            .toLowerCase()
            .includes(searchValue) ||
          booking.wasteType
            .toLowerCase()
            .includes(searchValue) ||
          booking.address
            .toLowerCase()
            .includes(searchValue);

        return matchesStatus && matchesSearch;
      }
    );
  }, [
    normalizedBookings,
    statusFilter,
    search,
  ]);

  const handleAssignPicker = (booking) => {
    sessionStorage.setItem(
      "renexa_admin_selected_booking",
      JSON.stringify(booking)
    );

    navigate("/adminpicker");
  };

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

  const completedCount =
    normalizedBookings.filter(
      (booking) =>
        booking.status === "completed"
    ).length;

  const failedCount =
    normalizedBookings.filter(
      (booking) =>
        booking.status === "failed" ||
        booking.status === "cancelled"
    ).length;

  const currentDate =
    new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date());

  return (
    <div className="admin-log-shell">
      <main className="admin-log-main">

        <header className="admin-log-header">
          <div>
            <Link
              to="/dashboard"
              className="trouble-registering"
            >
              Go back to Dashboard
            </Link>

            <p className="admin-log-eyebrow">
              ADMINISTRATION
            </p>

            <p className="dash-notice">
              Only admins can see this page
            </p>

            <h1>Pickup Requests</h1>

            <p>
              Review pickup requests, assign waste
              pickers, and track collection progress.
            </p>

            <Link
              to="/adminpicker"
              className="trouble-registering"
            >
              Go to Picker Dashboard
            </Link>
          </div>

          <div className="admin-log-date">
            <FontAwesomeIcon
              icon={faCalendarDays}
            />

            <span>{currentDate}</span>
          </div>
        </header>

        <section className="admin-log-summary">
          <div className="admin-log-card">
            <div className="admin-log-card-icon">
              <FontAwesomeIcon
                icon={faClipboardList}
              />
            </div>

            <span>Total Requests</span>

            <strong>
              {normalizedBookings.length}
            </strong>

            <small>
              All pickup requests
            </small>
          </div>

          <div className="admin-log-card">
            <div className="admin-log-card-icon">
              <FontAwesomeIcon
                icon={faClock}
              />
            </div>

            <span>Pending</span>

            <strong>{pendingCount}</strong>

            <small>
              Waiting for assignment
            </small>
          </div>

          <div className="admin-log-card">
            <div className="admin-log-card-icon">
              <FontAwesomeIcon
                icon={faCircleCheck}
              />
            </div>

            <span>Confirmed</span>

            <strong>
              {confirmedCount}
            </strong>

            <small>
              Picker assigned
            </small>
          </div>

          <div className="admin-log-card">
            <div className="admin-log-card-icon">
              <FontAwesomeIcon
                icon={
                  failedCount > 0
                    ? faTriangleExclamation
                    : faCircleCheck
                }
              />
            </div>

            <span>Completed</span>

            <strong>
              {completedCount}
            </strong>

            <small>
              {failedCount > 0
                ? `${failedCount} issue${
                    failedCount === 1
                      ? ""
                      : "s"
                  } recorded`
                : "Fulfilled pickups"}
            </small>
          </div>
        </section>

        <section className="admin-log-panel">
          <div className="admin-log-panel-header">
            <div>
              <h2>Pickup Requests</h2>

              <p>
                Current pickup requests recorded
                by the system.
              </p>
            </div>

            <button
              type="button"
              className="admin-log-refresh"
              onClick={loadBookings}
              disabled={loading}
            >
              {loading
                ? "Refreshing..."
                : "Refresh"}
            </button>
          </div>

          <div className="admin-log-filters">
            <div className="admin-log-search">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
              />

              <input
                type="text"
                placeholder="Search requests..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
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
          </div>

          {loading && (
            <div className="admin-log-empty">
              Loading pickup requests...
            </div>
          )}

          {error && (
            <p className="field-error">
              {error}
            </p>
          )}

          {!loading && !error && (
            <div className="admin-log-table-wrapper">
              <table className="admin-log-table">
                <thead>
                  <tr>
                    <th>Booking</th>
                    <th>User</th>
                    <th>Waste</th>
                    <th>Pickup</th>
                    <th>Picker</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredBookings.map(
                    (booking) => (
                      <tr key={booking.id}>
                        <td>
                          <span className="admin-log-event-id">
                            {booking.id}
                          </span>
                        </td>

                        <td>
                          <strong>
                            {booking.requester}
                          </strong>

                          <small>
                            {booking.address}
                          </small>
                        </td>

                        <td>
                          <strong>
                            {booking.wasteType}
                          </strong>

                          <small>
                            {booking.quantity}{" "}
                            {Number(
                              booking.quantity
                            ) === 1
                              ? "bag"
                              : "bags"}

                            {booking.bagSize
                              ? ` • ${booking.bagSize}`
                              : ""}
                          </small>
                        </td>

                        <td>
                          <strong>
                            {booking.date ||
                              "Date not set"}
                          </strong>

                          <small>
                            {booking.time ||
                              "Time not set"}
                          </small>
                        </td>

                        <td>
                          {booking.picker ||
                            "Not assigned"}
                        </td>

                        <td>
                          <span
                            className={`admin-log-status admin-log-status--${booking.status}`}
                          >
                            {getBookingStatusLabel(
                              booking.status
                            )}
                          </span>
                        </td>

                        <td>
                          {booking.status ===
                          "booked" ? (
                            <button
                              type="button"
                              className="btn btn-sm btn-primary"
                              onClick={() =>
                                handleAssignPicker(
                                  booking
                                )
                              }
                            >
                              Assign Picker
                            </button>
                          ) : booking.status ===
                            "claimed" ? (
                            <span className="admin-log-action-text">
                              Assigned
                            </span>
                          ) : booking.status ===
                            "completed" ? (
                            <span className="admin-log-action-text">
                              Completed
                            </span>
                          ) : (
                            <span className="admin-log-action-text">
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>

              {filteredBookings.length ===
                0 && (
                <div className="admin-log-empty">
                  No pickup requests found.
                </div>
              )}
            </div>
          )}
        </section>

      </main>
    </div>
  );
};

export default AdminEventLog;