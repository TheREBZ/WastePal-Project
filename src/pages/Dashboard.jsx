import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf,
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
  faEllipsis
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "../router/Router";
import DashboardOverview from "../components/DashboardOverview";
import DashboardSettings from "../components/DashboardSettings";
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
    desc: "Track your EcoPoints and redeem them with our sustainable brand partners.",
  },
  recycling: {
    title: "Recycling",
    desc: "See a breakdown of everything you've recycled, sorted by material type.",
  },
  reports: {
    title: "Reports",
    desc: "Download monthly sustainability reports for your household or business.",
  },
  support: {
    title: "Support",
    desc: `Reach our team or browse helpful articles about your account and pickups.
    <a href="https://kcemma.dedyn.io/webhook/5785de04-d0c1-449e-9e77-204560674434/chat" class="support-link btn-block btn btn-primary" target="_blank">Click here to speak with our support agent</a>`,
  },
};

const Dashboard = () => {
  const { navigate } = useRouter();
  const [activeView, setActiveView] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNav = (key) => {
    setActiveView(key);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const renderContent = () => {
    if (activeView === "overview") return <DashboardOverview onNavigate={handleNav} />;
    if (activeView === "settings") return <DashboardSettings />;

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
          <FontAwesomeIcon icon={faLeaf} className="dash-logo-icon" />
          <div>
            <p>Renexa</p>
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
            <h1>{activeView === "settings" ? "Settings" : `Hello, Esther`}</h1>
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
              E
            </div>
          </div>
        </header>

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
