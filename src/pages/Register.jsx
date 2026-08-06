import "../styles/Register.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  return (
    <main className='register-container'>
        <h1>Register As</h1>
        <section className="profile-select-container">
            <button className="profile-btn">
                <FontAwesomeIcon icon={faUser} className="icon"/>
                <p>User</p>
            </button>
            <button className='profile-btn'>
                <FontAwesomeIcon icon={faUser} className="icon"/>
                <p>Waste Picker</p>
            </button>
            <button className="trouble-registering">Having Trouble Registering?</button>
        </section>
    </main>
  )
}

export default Register;
