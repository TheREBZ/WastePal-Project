import "../styles/Register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLeaf } from '@fortawesome/free-solid-svg-icons';
import Link from "../router/Link";

const Register = () => {
  return (
    <main className='register-container'>
        <div className="auth-logo">
          <FontAwesomeIcon icon={faLeaf} className="auth-logo-icon" />
          <span>ReNexa</span>
        </div>
        <h1>Register as</h1>
        <section className="profile-select-container">
            <Link to="/signup" className="profile-btn">
                <FontAwesomeIcon icon={faUser} className="icon"/>
                <p>User</p>
            </Link>
            <Link to="/wastepickersignup" className='profile-btn'>
                <FontAwesomeIcon icon={faUser} className="icon"/>
                <p>Waste Picker</p>
            </Link>
            <button className="trouble-registering">Having Trouble Registering?</button>
        </section>
    </main>
  )
}

export default Register;
