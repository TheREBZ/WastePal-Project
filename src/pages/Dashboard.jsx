import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
  faGaugeHigh,
  faTruck,
  faGift,
  faRecycle,
  faChevronDown,
  faFileLines,
  faHeadset,
  faGear,
  faArrowRightFromBracket,
  faBell,
  faCircleCheck,
  faEllipsis,
  faUsers,
  faClipboardList,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import DashboardOverview from "../components/DashboardOverview";
import DashboardSettings from "../components/DashboardSettings";
import BookPickup from "./BookPickup";
import "../styles/Dashboard.css";
import { getCurrentUser, getAccessToken, clearAuthSession } from "../services/authStorage";
import { logoutUser } from "../services/authService";
import DashboardSubscription from "../components/DashboardSubscription";
import dashboardLogo from "../assets/Horizontal-Logo-5.png";
import DashboardReports from "../components/DashboardReports";

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: faGaugeHigh },
  { key: "book-pickup", label: "Book Pickup", icon: faTruck },
  { key: "rewards", label: "Rewards", icon: faGift },
  { key: "recycling", label: "Recycling", icon: faRecycle },
  { key: "reports", label: "Reports", icon: faFileLines },
  { key: "support", label: "Support", icon: faHeadset },
  { key: "subscription", label: "Subscription", icon: faCreditCard, }, // subscription (currently mock informations)
  { key: "settings", label: "Settings", icon: faGear },
];

// Admin roles items

const ADMIN_NAV_ITEMS = [
  { key: "admin-picker", label: "Picker Dashboard", icon: faUsers, route: "/adminpicker" },
  { key: "admin-events", label: "Event Logs", icon: faClipboardList, route: "/adminevents" },
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
  },
  support: {
    title: "Support",
    desc: "Reach our team or browse helpful articles about your account and pickups.",
  },
};

const Dashboard = () => {
  const { navigate } = useRouter();
  const [activeView, setActiveView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedReportId, setExpandedReportId] = useState(null);
  const user = getCurrentUser();

  const handleNav = (key) => {
    setActiveView(key);
    setSidebarOpen(false);
  };

  const handleAdminNav = (route) => {
    setSidebarOpen(false);
    navigate(route);
  };

  const handleLogout = async () => {
    const accessToken = getAccessToken();
  
    try {
      if (accessToken) {
        await logoutUser(accessToken);
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      clearAuthSession();
      navigate("/login");
    }
  };

  const toggleReport = (id) => {
    setExpandedReportId((current) => (current === id ? null : id));
  };

  const renderReports = () => (
    <div className="reports-container">
      <div className="report-header-text">
        <div>
          <h2>Your Reports</h2>
          <p>
            A running record of your monthly recycling activity. Select a
            report to view the full breakdown.
          </p>
        </div>
      </div>
      <div className="reports-demo-notice">
      <span>
        These reports contain demo information for now. Real user data will be
        displayed here once available.
      </span>
    </div>
  
      <div className="report-panel">
        <div className="report-table-wrapper">
          <table className="dash-table dash-reports-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Generated</th>
                <th>Waste diverted</th>
                <th>Recycling rate</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
  
            <tbody>
              {SAMPLE_REPORTS.map((report) => {
                const isOpen = expandedReportId === report.id;
  
                return (
                  <>
                    <tr
                      key={report.id}
                      className={`dash-reports-row ${
                        isOpen ? "dash-reports-row--active" : ""
                      }`}
                      onClick={() => toggleReport(report.id)}
                    >
                      <td className="dash-table-primary">
                        {report.period}
                      </td>
  
                      <td>{report.generatedOn}</td>
  
                      <td>{report.wasteDiverted}</td>
  
                      <td>{report.recyclingRate}</td>
  
                      <td>
                        <span
                          className={`dash-status ${
                            report.status === "Pending"
                              ? "dash-status--pending"
                              : "dash-status--confirmed"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
  
                      <td className="dash-reports-chevron">
                        <button
                          type="button"
                          className="dash-reports-toggle"
                          aria-expanded={isOpen}
                          aria-controls={`report-details-${report.id}`}
                          aria-label={`${
                            isOpen ? "Hide" : "Show"
                          } details for ${report.period}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleReport(report.id);
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
                      className="dash-reports-details-row"
                      id={`report-details-${report.id}`}
                      hidden={!isOpen}
                    >
                      <td colSpan={6}>
                        <div className="dash-report-details">
                          {report.details}
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="support-container">
      <div className="support-card">
        <div className="support-icon">
          <FontAwesomeIcon icon={faHeadset} />
        </div>
  
        <div className="support-content">
          <h2>Need some help?</h2>
          <p>
            Have a question about your pickups, account, or recycling activity?
            Our support agent is here to help.
          </p>
  
          <a
            href="https://kcemma.dedyn.io/webhook/5785de04-d0c1-449e-9e77-204560674434/chat"
            className="support-link btn btn-primary"
            target="_blank"
            rel="noreferrer"
          >
            Speak with support
          </a>
        </div>
      </div>
    </div>
  );
  
  const renderContent = () => {
    if (activeView === "overview") return <DashboardOverview onNavigate={handleNav} />;
    if (activeView === "book-pickup") return <BookPickup />;
    if (activeView === "subscription") {return <DashboardSubscription />;}
    if (activeView === "settings") return <DashboardSettings />;
    if (activeView === "reports") { return <DashboardReports />;}
    if (activeView === "support") return renderSupport();

    const copy = PLACEHOLDER_COPY[activeView];
    return (
      <div className="dash-placeholder">
        <span className="dash-placeholder-icon">
          <FontAwesomeIcon icon={faCircleCheck} />
        </span>
        <h2>{copy.title}</h2>
        <p dangerouslySetInnerHTML={{__html: copy.desc}}></p>
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
        <FontAwesomeIcon icon={faEllipsis} />
        <span>Menu</span>
      </button>

      <aside className={`dash-sidebar ${sidebarOpen ? "dash-sidebar--open" : ""}`}>
        <div className="dash-logo">
          <div>
          <img
            src={dashboardLogo}
            alt="ReNexa Logo"
            className="footer-logo-icon"
            width={100}
            height={60}
          />
            <span>Version 0.01 (Beta)</span>
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

          {user?.role === "admin" && (
            <>
              <p
                style={{
                  margin: "16px 0 4px",
                  padding: "0 12px",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#8a8a8a",
                }}
              >
                Admin
              </p>

              {ADMIN_NAV_ITEMS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  className="dash-nav-item"
                  onClick={() => handleAdminNav(item.route)}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  {item.label}
                </button>
              ))}
            </>
          )}
        </nav>

        <button type="button" className="dash-logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
          Log Out
        </button>
      </aside>

      <div className="dash-main">
        <header className="dash-topbar">
          <div>
            <h1>{activeView === "settings"
            ? "Settings"
            : activeView === "book-pickup"
            ? "Book-pickup"
            : activeView === "recycling"
            ? "Recycling"
            : activeView === "reports"
            ? "Reports"
            : activeView === "support"
            ? "Support"
            : activeView === "rewards"
            ? "Rewards"
            : activeView === "subscription"
            ? "Subscription"
            : `Hey, ${user?.firstName || "there"}`}</h1>
            <p>
              {activeView === "settings"
                ? "Manage your personal information, addresses, and account preferences."
                : activeView === "book-pickup" ? "Create an order for your waste to be collected"
                : activeView === "recycling" ? "Here's how we turn your waste into reuseable and sustainable products"
                : activeView === "rewards" ? "Here's an overview of your points and rewards accumulated"
                : activeView === "reports" ? "Here's your waste booking history reports"
                : activeView === "support" ? "Reach out to our support agents for assistance"
                : activeView === "subscription" ? "Manage your ReNexa plan and subscription."
                : "Welcome to your profile dashboard"}
            </p>
          </div>
          <div className="dash-topbar-actions">
            <button type="button" className="dash-icon-btn" aria-label="Notifications">
              <FontAwesomeIcon icon={faBell} />
            </button>
          </div>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
