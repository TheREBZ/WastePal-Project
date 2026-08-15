import "../styles/WastePickerSignup.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";

const WastePickerSignup = () => {
  return (
    <main className="wp-container">
            <div className="auth-logo">
                <FontAwesomeIcon icon={faLeaf} className="auth-logo-icon" />
                <span>ReNexa</span>
            </div>
        <div className="wp-content">
            <h1>
                Waste picker Registration is currently unavailable
            </h1>
            <Link className="return-wp" to="/signup">Go back to Signup</Link>
        </div>
    </main>
  )
}

export default WastePickerSignup