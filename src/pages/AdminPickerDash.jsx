import "../styles/AdminPickerDash.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const AdminPickerDash = () => {
    const zone = ["Surelere", "Amuwo-Odofin", "Lagos-Island", "Ikeja"]
  return (
    <main className="auth-page admin-dash">
        <h1 className="dash-head">PICKER DASHBOARD <span>(ADMIN SIDE)</span></h1>
        <p className="dash-notice">Only admins can see this page</p>
        <section className="auth-card admin-dash-content">
            <h1> Create Picker profile</h1>
            <form>
                <label className="field">
                    <span>Full name</span>
                    <div>
                        <input type="text" placeholder="Enter picker name" required/>
                    </div>
                </label>
                <label className="field">
                    <span>Phone number</span>
                    <div>
                        <input type="text" placeholder="Enter picker phone number" required/>
                    </div>
                </label>
                <label className="field">
                    <span>Client type</span>
                    <div>
                        <input type="text" placeholder="Enter client type (example: Household)" required/>
                    </div>
                </label>
                <label className="field">
                    <span>Zones</span>
                    <div>
                        <select type="text" required>
                            {zone.map((zones)=>(
                                <option key={zones} value={zones}>
                                    {zones}
                                </option>
                            ))}
                        </select>
                    </div>
                </label>
                <button type="submit" className="btn btn-primary btn-block">Save Picker Profile</button>
            </form>
        </section>
                <h1>Profile Example</h1>
        <section className="picker-example-container">
            <div>
                <div className="auth-card picker-details-container">
                        <FontAwesomeIcon icon={faCircleUser} className="picker-example-icon-container" />
                        <p className="picker-status">Active</p>
                    <div className="picker-details">
                        <div className="picker-info">
                            <h1>Full Name</h1>
                            <p>Toheeb Wallace</p>
                        </div>
                        <div className="picker-info">
                            <h1>Phone number</h1>
                            <p>080232454223</p>
                        </div>
                        <div className="picker-info">
                            <h1>Zone</h1>
                            <p>Surelere</p>
                        </div>
                        <div className="picker-info">
                            <h1>Client Type</h1>
                            <p>Household & Small shops</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  )
}

export default AdminPickerDash