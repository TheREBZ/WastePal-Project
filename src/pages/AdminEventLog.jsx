import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faCalendarDays,
  faMagnifyingGlass,
  faCircleCheck,
  faClock,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import "../styles/AdminEventLog.css";

const EVENTS = [
  {
    id: "EVT-001",
    type: "booking_created",
    description: "New pickup booking created",
    user: "Esther Johnson",
    booking: "BK-1042",
    time: "10:42 AM",
    date: "Today",
    status: "Success",
  },
  {
    id: "EVT-002",
    type: "booking_matched",
    description: "Booking matched with waste picker",
    user: "Toheeb Wallace",
    booking: "BK-1041",
    time: "10:18 AM",
    date: "Today",
    status: "Success",
  },
  {
    id: "EVT-003",
    type: "picker_activity",
    description: "Picker marked as active",
    user: "Michael Adams",
    booking: "—",
    time: "9:54 AM",
    date: "Today",
    status: "Success",
  },
  {
    id: "EVT-004",
    type: "pickup_completed",
    description: "Pickup marked as completed",
    user: "Daniel Smith",
    booking: "BK-1039",
    time: "9:21 AM",
    date: "Today",
    status: "Success",
  },
  {
    id: "EVT-005",
    type: "payment_sale",
    description: "Payment recorded",
    user: "Sarah Williams",
    booking: "BK-1038",
    time: "Yesterday",
    date: "Yesterday",
    status: "Success",
  },
  {
    id: "EVT-006",
    type: "booking_created",
    description: "New pickup booking created",
    user: "David James",
    booking: "BK-1037",
    time: "Yesterday",
    date: "Yesterday",
    status: "Success",
  },
  {
    id: "EVT-007",
    type: "picker_activity",
    description: "Picker activity updated",
    user: "Toheeb Wallace",
    booking: "—",
    time: "Yesterday",
    date: "Yesterday",
    status: "Success",
  },
];

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: faGaugeHigh },
  { key: "events", label: "Event Logs", icon: faClipboardList },
  { key: "users", label: "Users", icon: faUsers },
  { key: "pickers", label: "Pickers", icon: faTruck },
  { key: "performance", label: "Performance", icon: faChartLine },
  { key: "reports", label: "Reports", icon: faFileLines },
  { key: "settings", label: "Settings", icon: faGear },
];

const AdminEventLog = () => {
  const { navigate } = useRouter();
  const [eventFilter, setEventFilter] = useState("all");
  const [search, setSearch] = useState("");

  const handleNav = (key) => {
    setActiveNav(key);
    setSidebarOpen(false);

    // Event Logs is currently the only admin section we're building.
    if (key === "pickers") {
      navigate("/adminpicker");
    }
  };

  const filteredEvents = EVENTS.filter((event) => {
    const matchesType =
      eventFilter === "all" || event.type === eventFilter;

    const searchValue = search.toLowerCase();

    const matchesSearch =
      event.description.toLowerCase().includes(searchValue) ||
      event.user.toLowerCase().includes(searchValue) ||
      event.booking.toLowerCase().includes(searchValue);

    return matchesType && matchesSearch;
  });

  return (
    <div className="admin-log-shell">

      {/* Main */}

      <main className="admin-log-main">

        <button
          type="button"
          className="admin-log-mobile-toggle"
          onClick={() => setSidebarOpen((open) => !open)}
        >
          Menu
        </button>

        <header className="admin-log-header">
          <div>
            <p className="admin-log-eyebrow">
              ADMINISTRATION
            </p>

            <h1>Event Logs</h1>

            <p>
              Monitor activity and events happening across
              the ReNexa platform.
            </p>
          </div>

          <div className="admin-log-date">
            <FontAwesomeIcon icon={faCalendarDays} />
            <span>August 14, 2026</span>
          </div>
        </header>

        {/* Summary Cards */}

        <section className="admin-log-summary">

          <div className="admin-log-card">
            <div className="admin-log-card-icon">
              <FontAwesomeIcon icon={faClipboardList} />
            </div>

            <span>Total Events</span>
            <strong>128</strong>
            <small>Recorded activity</small>
          </div>

          <div className="admin-log-card">
            <div className="admin-log-card-icon">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>

            <span>Successful Events</span>
            <strong>121</strong>
            <small>94.5% of all events</small>
          </div>

          <div className="admin-log-card">
            <div className="admin-log-card-icon">
              <FontAwesomeIcon icon={faClock} />
            </div>

            <span>Today's Events</span>
            <strong>24</strong>
            <small>Activity today</small>
          </div>

          <div className="admin-log-card">
            <div className="admin-log-card-icon">
              <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>

            <span>Issues</span>
            <strong>7</strong>
            <small>Requires attention</small>
          </div>

        </section>

        {/* Event Log */}

        <section className="admin-log-panel">

          <div className="admin-log-panel-header">
            <div>
              <h2>Activity Log</h2>
              <p>
                Recent events recorded by the system.
              </p>
            </div>

            <button
              type="button"
              className="admin-log-refresh"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>

          {/* Filters */}

          <div className="admin-log-filters">

            <div className="admin-log-search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />

              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={eventFilter}
              onChange={(e) => setEventFilter(e.target.value)}
            >
              <option value="all">All Events</option>
              <option value="booking_created">
                Booking Created
              </option>
              <option value="booking_matched">
                Booking Matched
              </option>
              <option value="pickup_completed">
                Pickup Completed
              </option>
              <option value="payment_sale">
                Payment
              </option>
              <option value="picker_activity">
                Picker Activity
              </option>
            </select>

          </div>

          {/* Table */}

          <div className="admin-log-table-wrapper">

            <table className="admin-log-table">

              <thead>
                <tr>
                  <th>Event</th>
                  <th>Description</th>
                  <th>User / Picker</th>
                  <th>Booking</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {filteredEvents.map((event) => (

                  <tr key={event.id}>

                    <td>
                      <span className="admin-log-event-id">
                        {event.id}
                      </span>
                    </td>

                    <td>
                      <strong>
                        {event.description}
                      </strong>

                      <small>
                        {event.type}
                      </small>
                    </td>

                    <td>
                      {event.user}
                    </td>

                    <td>
                      {event.booking}
                    </td>

                    <td>
                      <span>{event.time}</span>
                      <small>{event.date}</small>
                    </td>

                    <td>
                      <span className="admin-log-status">
                        {event.status}
                      </span>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

            {filteredEvents.length === 0 && (
              <div className="admin-log-empty">
                No events found.
              </div>
            )}

          </div>

        </section>

        <p className="admin-log-footer">
          Event data is currently displayed using mock data.
          Live event data will be connected to the backend later.
        </p>

      </main>
    </div>
  );
};

export default AdminEventLog;