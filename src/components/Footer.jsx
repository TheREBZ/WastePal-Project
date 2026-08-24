import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "../router/Link";
import renexaLogo from "../assets/Horizontal-logo-2.png";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img
              src={renexaLogo}
              alt="ReNexa Logo"
              className="footer-logo-icon"
              width={110}
              height={66}
            />
          </Link>

          <p className="footer-description">
            Smarter waste management for cleaner homes,
            businesses, and communities.
          </p>

          <div className="footer-socials">
            <a href="#" aria-label="Facebook">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>

            <a href="#" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>

            <a href="#" aria-label="X">
              <FontAwesomeIcon icon={faXTwitter} />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
        </div>

        <nav className="footer-nav">
          <Link to="/how-it-works">How it Works</Link>
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact</Link>
        </nav>

      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>
            © {new Date().getFullYear()} ReNexa. All rights reserved.
          </p>

          <div className="footer-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;