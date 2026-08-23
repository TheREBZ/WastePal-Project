import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";
import { useRouter } from "../router/Router";
import renexaLogo from "../assets/Horizontal-logo-2.png";
import "../styles/Navbar.css";

const NAV_LINKS = [
  { label: "How it Works", to: "/how-it-works" },
  { label: "Features", to: "/features" },
  { label: "Pricing", to: "/pricing" },
];

const Navbar = () => {
  const { path } = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <img
            src={renexaLogo}
            alt="ReNexa Logo"
            className="footer-logo-icon"
            width={100}
            height={60}
          />
        </Link>

        <nav
          className={`navbar-links ${
            menuOpen ? "navbar-links--open" : ""
          }`}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar-link ${
                path === link.to
                  ? "navbar-link--active"
                  : ""
              }`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}

          <Link
            to="/signup"
            className="navbar-cta navbar-cta--mobile"
            onClick={closeMenu}
          >
            Get Started
          </Link>
        </nav>

        <div className="navbar-actions">
          <Link
            to="/signup"
            className="navbar-cta"
          >
            Get Started
          </Link>

          <button
            type="button"
            className="navbar-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() =>
              setMenuOpen((open) => !open)
            }
          >
            <FontAwesomeIcon
              icon={menuOpen ? faXmark : faBars}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;