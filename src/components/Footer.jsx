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
            <img img src="Public/assets/Horizontal-logo-2.png" alt="Renexa Logo" className="footer-logo-icon" width={100} height={60} />
          </div>
          <p>© {new Date().getFullYear()} Renexa. Eco-friendly waste management solutions.</p>
        </div>
        <nav className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
