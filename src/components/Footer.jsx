import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <FontAwesomeIcon icon={faLeaf} className="footer-logo-icon" />
            <span>WastePal</span>
          </div>
          <p>© {new Date().getFullYear()} WastePal. Eco-friendly waste management solutions.</p>
        </div>
        <nav className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/careers">Careers</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
