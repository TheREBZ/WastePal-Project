import { useEffect, useState } from "react";
import "../styles/AdminPickerDash.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Link from "../router/Link";
import { useRouter } from "../router/Router";
import { getAccessToken } from "../services/authStorage";
import {
  getPickers,
  createPicker,
  deletePicker,
} from "../services/pickerService";
import { assignPicker } from "../services/bookingService";

const ZONES = [
  { label: "Surulere", value: "surulere" },
  { label: "Amuwo-Odofin", value: "amuwo_odofin" },
  { label: "Lagos Island", value: "lagos_island" },
  { label: "Ikeja", value: "ikeja" },
];

const CLIENT_TYPES = [
  { label: "Household", value: "household" },
  { label: "Small Business", value: "small_business" },
  {
    label: "Household & Small Shops",
    value: "household_and_small_shops",
  },
  {
    label: "Large Businesses",
    value: "large_businesses",
  },
];

const AdminPickerDash = () => {
  const { navigate } = useRouter();

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    clientType: "",
    zone: ZONES[0].value,
  });

  const [pickers, setPickers] = useState([]);
  const [selectedPickerId, setSelectedPickerId] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [loadingPickers, setLoadingPickers] = useState(true);
  const [creatingPicker, setCreatingPicker] = useState(false);
  const [assigning, setAssigning] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const loadPickers = async () => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      setError("Admin session not found.");
      setLoadingPickers(false);
      return;
    }

    setLoadingPickers(true);
    setError("");

    try {
      const response = await getPickers(accessToken);

      const pickerData =
        response?.data?.pickers ||
        response?.data ||
        [];

      setPickers(
        Array.isArray(pickerData)
          ? pickerData
          : []
      );
    } catch (err) {
      console.error("Unable to load pickers:", err);

      setError(
        err.message ||
          "Unable to load picker accounts."
      );
    } finally {
      setLoadingPickers(false);
    }
  };

  useEffect(() => {
    const savedBooking = sessionStorage.getItem(
      "renexa_admin_selected_booking"
    );

    if (savedBooking) {
      try {
        setSelectedBooking(JSON.parse(savedBooking));
      } catch {
        sessionStorage.removeItem(
          "renexa_admin_selected_booking"
        );
      }
    }

    loadPickers();
  }, []);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    setSuccessMessage("");
    setError("");
  };

  const handleCreatePicker = async (event) => {
    event.preventDefault();

    const accessToken = getAccessToken();

    if (!accessToken) {
      setError("Admin session not found.");
      return;
    }

    setCreatingPicker(true);
    setSuccessMessage("");
    setError("");

    try {
      const response = await createPicker(
        {
          fullName: form.fullName.trim(),
          phoneNumber: form.phoneNumber.replace(/\s|-/g, ""),
          clientType: form.clientType,
          zone: form.zone,
        },
        accessToken
      );

      const newPicker =
        response?.data?.picker ||
        response?.data ||
        null;

      if (newPicker) {
        setPickers((current) => [
          newPicker,
          ...current,
        ]);

        setSelectedPickerId(
          newPicker.id || newPicker.picker_id || ""
        );
      }

      setSuccessMessage(
        "Picker profile created successfully."
      );

      setForm({
        fullName: "",
        phoneNumber: "",
        clientType: "",
        zone: ZONES[0].value,
      });

      // Reload from backend so UI reflects the real saved list
      await loadPickers();
    } catch (err) {
      setError(
        err.message ||
          "Unable to create picker."
      );
    } finally {
      setCreatingPicker(false);
    }
  };

  const handleDeletePicker = async (pickerId) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      setError("Admin session not found.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this picker?"
    );

    if (!confirmed) return;

    setError("");
    setSuccessMessage("");

    try {
      await deletePicker(
        pickerId,
        accessToken
      );

      setPickers((current) =>
        current.filter(
          (picker) =>
            (picker.id || picker.picker_id) !== pickerId
        )
      );

      if (selectedPickerId === pickerId) {
        setSelectedPickerId("");
      }

      setSuccessMessage(
        "Picker account deleted successfully."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete picker."
      );
    }
  };

  const handleAssignPicker = async () => {
    if (!selectedBooking) {
      setError(
        "No pickup request selected."
      );
      return;
    }

    if (!selectedPickerId) {
      setError(
        "Please select a picker first."
      );
      return;
    }

    const accessToken = getAccessToken();

    if (!accessToken) {
      setError("Admin session not found.");
      return;
    }

    setAssigning(true);
    setSuccessMessage("");
    setError("");

    try {
      await assignPicker(
        selectedBooking.id,
        selectedPickerId,
        accessToken
      );

      setSuccessMessage(
        "Picker assigned successfully."
      );

      sessionStorage.removeItem(
        "renexa_admin_selected_booking"
      );

      setTimeout(() => {
        navigate("/adminevents");
      }, 1200);
    } catch (err) {
      setError(
        err.message ||
          "Unable to assign picker."
      );
    } finally {
      setAssigning(false);
    }
  };

  return (
    <main className="auth-page admin-dash">
      <h1 className="dash-head">
        PICKER DASHBOARD{" "}
        <span>(ADMIN SIDE)</span>
      </h1>

      <p className="dash-notice">
        Only admins can see this page
      </p>

      <Link
        to="/dashboard"
        className="trouble-registering"
      >
        <p>Go back to Dashboard</p>
      </Link>

      <Link
        to="/adminevents"
        className="trouble-registering"
      >
        <p>Go to Pickup Requests</p>
      </Link>

      {selectedBooking && (
        <section className="auth-card admin-dash-content">
          <h1>Selected Pickup Request</h1>

          <div className="picker-details">
            <div className="picker-info">
              <h1>Booking</h1>
              <p>{selectedBooking.id}</p>
            </div>

            <div className="picker-info">
              <h1>User</h1>
              <p>
                {selectedBooking.requester ||
                  "Unknown user"}
              </p>
            </div>

            <div className="picker-info">
              <h1>Waste Type</h1>
              <p>{selectedBooking.wasteType}</p>
            </div>

            <div className="picker-info">
              <h1>Quantity</h1>
              <p>
                {selectedBooking.quantity}{" "}
                {Number(selectedBooking.quantity) === 1
                  ? "bag"
                  : "bags"}
              </p>
            </div>

            <div className="picker-info">
              <h1>Pickup Date</h1>
              <p>
                {selectedBooking.date || "Not set"}
              </p>
            </div>

            <div className="picker-info">
              <h1>Pickup Time</h1>
              <p>
                {selectedBooking.time || "Not set"}
              </p>
            </div>

            <div className="picker-info">
              <h1>Address</h1>
              <p>{selectedBooking.address}</p>
            </div>
          </div>

          <label className="field">
            <span>Select Picker</span>

            <select
              value={selectedPickerId}
              onChange={(e) =>
                setSelectedPickerId(e.target.value)
              }
              disabled={loadingPickers || assigning}
            >
              <option value="">
                Select a picker
              </option>

              {pickers.map((picker) => {
                const pickerId =
                  picker.id || picker.picker_id;

                return (
                  <option
                    key={pickerId}
                    value={pickerId}
                  >
                    {picker.fullName} — {picker.zone}
                  </option>
                );
              })}
            </select>
          </label>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={handleAssignPicker}
            disabled={
              !selectedPickerId ||
              assigning
            }
          >
            {assigning
              ? "Assigning..."
              : "Assign Selected Picker"}
          </button>
        </section>
      )}

      <section className="auth-card admin-dash-content">
        <h1>Create Picker Profile</h1>

        <form onSubmit={handleCreatePicker}>
          <label className="field">
            <span>Full Name</span>

            <input
              type="text"
              placeholder="Enter picker name"
              value={form.fullName}
              onChange={handleChange("fullName")}
              required
            />
          </label>

          <label className="field">
            <span>Phone Number</span>

            <input
              type="tel"
              placeholder="Enter picker phone number"
              value={form.phoneNumber}
              onChange={handleChange("phoneNumber")}
              required
            />
          </label>

          <label className="field">
            <span>Client Type</span>

            <select
              value={form.clientType}
              onChange={handleChange("clientType")}
              required
            >
              <option
                value=""
                disabled
              >
                Select client type
              </option>

              {CLIENT_TYPES.map((type) => (
                <option
                  key={type.value}
                  value={type.value}
                >
                  {type.label}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Zone</span>

            <select
              value={form.zone}
              onChange={handleChange("zone")}
              required
            >
              {ZONES.map((zone) => (
                <option
                  key={zone.value}
                  value={zone.value}
                >
                  {zone.label}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={creatingPicker}
          >
            {creatingPicker
              ? "Creating..."
              : "Save Picker Profile"}
          </button>
        </form>
      </section>

      <section className="auth-card admin-dash-content">
        <h1>Available Pickers</h1>

        {loadingPickers ? (
          <p>Loading pickers...</p>
        ) : pickers.length === 0 ? (
          <p>
            No picker accounts created yet.
          </p>
        ) : (
          <div className="picker-example-container">
            {pickers.map((picker) => {
              const pickerId =
                picker.id || picker.picker_id;

              return (
                <div
                  className="auth-card picker-details-container"
                  key={pickerId}
                >
                  <FontAwesomeIcon
                    icon={faCircleUser}
                    className="picker-example-icon-container"
                  />

                  <p className="picker-status">
                    {picker.isActive === false
                      ? "Inactive"
                      : "Active"}
                  </p>

                  <div className="picker-details">
                    <div className="picker-info">
                      <h1>Full Name</h1>
                      <p>{picker.fullName}</p>
                    </div>

                    <div className="picker-info">
                      <h1>Phone Number</h1>
                      <p>{picker.phoneNumber}</p>
                    </div>

                    <div className="picker-info">
                      <h1>Zone</h1>
                      <p>{picker.zone}</p>
                    </div>

                    <div className="picker-info">
                      <h1>Client Type</h1>
                      <p>{picker.clientType}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() =>
                      handleDeletePicker(pickerId)
                    }
                  >
                    Delete Picker
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {successMessage && (
        <p className="picker-save-success">
          {successMessage}
        </p>
      )}

      {error && (
        <p className="field-error">
          {error}
        </p>
      )}
    </main>
  );
};

export default AdminPickerDash;