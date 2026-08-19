import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGaugeHigh,
  faTruck,
  faGift,
  faRecycle,
  faFileLines,
  faHeadset,
  faGear,
  faArrowRightFromBracket,
  faBell,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import DashboardOverview from "../components/DashboardOverview";
import DashboardSettings from "../components/DashboardSettings";
import BookPickup from "./BookPickup";
import "../styles/Dashboard.css";

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: faGaugeHigh },
  { key: "book-pickup", label: "Book Pickup", icon: faTruck },
  { key: "rewards", label: "Rewards", icon: faGift },
  { key: "recycling", label: "Recycling", icon: faRecycle },
  { key: "reports", label: "Reports", icon: faFileLines },
  { key: "support", label: "Support", icon: faHeadset },
  { key: "settings", label: "Settings", icon: faGear },
];

const PLACEHOLDER_COPY = {
  "book-pickup": {
    title: "Book Pickup",
    desc: "Schedule a one-off or recurring pickup for your home or office.",
  },
  rewards: {
    title: "Rewards",
    desc: "Coming soon, this feature will be available in our next phase.",
  },
  recycling: {
    title: "Recycling",
    desc: "Coming soon, this feature will be available in our next phase.",
  }
};
const SAMPLE_REPORTS = [
  {
    id: "rpt-2026-08",
    period: "August 2026",
    generatedOn: "Aug 12, 2026",
    wasteDiverted: "22 kg",
    recyclingRate: "43%",
    status: "Pending",
    details:
      "From your 1 pickup this month. plastics made up the largest share. No contamination flags on your bins.",
  },
  {
    id: "rpt-2026-07",
    period: "July 2026",
    generatedOn: "Aug 1, 2026",
    wasteDiverted: "42 kg",
    recyclingRate: "78%",
    status: "Complete",
    details:
      "From your 3 pickups this month. Paper and cardboard made up the largest share, followed by mixed plastics. No contamination flags on your bins.",
  },
  {
    id: "rpt-2026-06",
    period: "June 2026",
    generatedOn: "Jul 1, 2026",
    wasteDiverted: "37 kg",
    recyclingRate: "74%",
    status: "Complete",
    details:
      "From your 3 pickups this month. Glass volume was up compared to May. One pickup was rescheduled due to a public holiday.",
  },
  {
    id: "rpt-2026-05",
    period: "May 2026",
    generatedOn: "Jun 1, 2026",
    wasteDiverted: "31 kg",
    recyclingRate: "71%",
    status: "Complete",
    details:
      "From your 2 pickups this month. You dropped off e-waste for the first time, adding 4 kg toward your total diverted.",
  },
];

const Dashboard = () => {
  const { navigate } = useRouter();
  const [activeView, setActiveView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedReportId, setExpandedReportId] = useState(null);

  const handleNav = (key) => {
    setActiveView(key);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleReport = (id) => {
    setExpandedReportId((current) => (current === id ? null : id));
  };

  const renderReports = () => (
    <div className="dash-panel dash-reports-panel">
      <div className="dash-panel-header">
        <h2>Your Reports</h2>
      </div>
      <p className="dash-reports-intro">
        A running record of your monthly recycling activity. Select a row for the full breakdown.
      </p>

      <table className="dash-table dash-reports-table">
        <thead>
          <tr>
            <th>Period</th>
            <th>Generated</th>
            <th>Waste diverted</th>
            <th>Recycling rate</th>
            <th>Status</th>
            <th aria-hidden="true"></th>
          </tr>
        </thead>
        <tbody>
          {SAMPLE_REPORTS.map((report) => {
            const isOpen = expandedReportId === report.id;
            return (
              <Fragment key={report.id}>
                <tr
                  className={`dash-reports-row ${isOpen ? "dash-reports-row--active" : ""}`}
                  onClick={() => toggleReport(report.id)}
                >
                  <td className="dash-table-primary">{report.period}</td>
                  <td>{report.generatedOn}</td>
                  <td>{report.wasteDiverted}</td>
                  <td>{report.recyclingRate}</td>
                  <td>
                    <span className="dash-status dash-status--confirmed">{report.status}</span>
                  </td>
                  <td className="dash-reports-chevron">
                    <button
                      type="button"
                      className="dash-reports-toggle"
                      aria-expanded={isOpen}
                      aria-controls={`report-details-${report.id}`}
                      aria-label={`${isOpen ? "Hide" : "Show"} details for ${report.period}`}
                      onClick={(event) => {
                        // Stop this from also bubbling to the row's onClick above,
                        // which would toggle twice and appear to do nothing.
                        event.stopPropagation();
                        toggleReport(report.id);
                      }}
                    >
                      <FontAwesomeIcon icon={faChevronDown} className={isOpen ? "dash-reports-chevron--open" : ""} />
                    </button>
                  </td>
                </tr>
                <tr className="dash-reports-details-row" id={`report-details-${report.id}`} hidden={!isOpen}>
                  <td colSpan={6}>{report.details}</td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );

const renderSupport = () => (
    <div className="dash-panel dash-support-panel">
      <span className="dash-placeholder-icon">
        <FontAwesomeIcon icon={faRobot} />
      </span>
      <h2>Talk to Support</h2>
      <p>Get help from our AI support assistant, any time your questions come up.</p>
      <a
        className="dash-support-btn"
        href="#"
        target="_blank"
        rel="noreferrer"
        aria-disabled="true"
        onClick={(event) => {
          // Remove this guard once the AI support URL is wired up above.
          event.preventDefault();
        }}
      >
        Open AI Support
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
      </a>
    </div>
  );
  
  const renderContent = () => {
    if (activeView === "overview") return <DashboardOverview onNavigate={handleNav} />;
    if (activeView === "book-pickup") return <BookPickup />;
    if (activeView === "settings") return <DashboardSettings />;
    if (activeView === "reports") return renderReports();
    if (activeView === "support") return renderSupport();

    const copy = PLACEHOLDER_COPY[activeView];
    return (
      <div className="dash-placeholder">
        <span className="dash-placeholder-icon">
          <FontAwesomeIcon icon={faCircleCheck} />
        </span>
        <h2>{copy.title}</h2>
        <p>{copy.desc}</p>
      </div>
    );
  };

  return (
    <div className="dash-shell">
      <button
        type="button"
        className="dash-mobile-toggle"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label="Toggle navigation"
      >
        <FontAwesomeIcon icon={faGaugeHigh} />
        <span>Menu</span>
      </button>

      <aside className={`dash-sidebar ${sidebarOpen ? "dash-sidebar--open" : ""}`}>
        <div className="dash-logo">
          <img src="/assets/Horizontal-logo-2.png" alt="Renexa Logo" width={100} height={60} />
          <div>
            {/* <p>WastePal</p> */}
            <span>Business Plan</span>
          </div>
        </div>

        <nav className="dash-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`dash-nav-item ${activeView === item.key ? "dash-nav-item--active" : ""}`}
              onClick={() => handleNav(item.key)}
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="dash-logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Log Out
        </button>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <div>
            <h1>{activeView === "settings" ? "Settings" : `Hello, Sarah`}</h1>
            <p>
              {activeView === "settings"
                ? "Manage your personal information, addresses, and account preferences."
                : "Here's your eco-impact and upcoming schedule."}
            </p>
          </div>
          <div className="dash-topbar-actions">
            <button type="button" className="dash-icon-btn" aria-label="Notifications">
              <FontAwesomeIcon icon={faBell} />
            </button>
            <div className="dash-avatar" aria-hidden="true">
              S
            </div>
          </div>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
