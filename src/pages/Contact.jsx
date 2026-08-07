import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
  faChevronRight,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import "../styles/Contact.css";

const TOPICS = ["General Inquiry", "Billing", "Technical Support", "Partnerships"];

const FAQS = [
  {
    q: "How do I schedule a special pickup?",
    a: "Special pickups can be scheduled directly from your dashboard under the 'Book Pickup' tab. Select your item type, preferred date, and we'll confirm availability within minutes.",
  },
  {
    q: "What materials do you recycle?",
    a: "We handle electronics, standard recyclables (paper, plastic, glass), and hazardous materials like batteries and paint through our certified partners.",
  },
  {
    q: "How is my recycling rate calculated?",
    a: "Your recycling rate compares the weight of materials diverted from landfill against your total waste output, tracked automatically at every pickup.",
  },
  {
    q: "Can I cancel or reschedule a pickup?",
    a: "Yes, pickups can be rescheduled or cancelled from your dashboard up to 12 hours before the scheduled time at no extra cost.",
  },
];

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  topic: TOPICS[0],
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | sent
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "First name is required";
    if (!form.lastName.trim()) next.lastName = "Last name is required";
    if (!form.email.trim()) {
      next.email = "Work email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Enter a valid email address";
    }
    if (!form.message.trim()) next.message = "Tell us how we can help";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("sent");
      setForm(initialForm);
    }, 900);
  };

  return (
    <Layout>
      <section className="contact-hero section-inner">
        <h1>Get in Touch</h1>
        <p>
          Have questions about our eco-friendly waste management solutions? We're
          here to help you make a positive impact.
        </p>
      </section>

      <section className="contact-grid section-inner">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="contact-form-row">
            <label className="field">
              <span>First Name</span>
              <input
                type="text"
                placeholder="Jane"
                value={form.firstName}
                onChange={handleChange("firstName")}
              />
              {errors.firstName && <em className="field-error">{errors.firstName}</em>}
            </label>
            <label className="field">
              <span>Last Name</span>
              <input
                type="text"
                placeholder="Doe"
                value={form.lastName}
                onChange={handleChange("lastName")}
              />
              {errors.lastName && <em className="field-error">{errors.lastName}</em>}
            </label>
          </div>

          <label className="field">
            <span>Work Email</span>
            <input
              type="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={handleChange("email")}
            />
            {errors.email && <em className="field-error">{errors.email}</em>}
          </label>

          <label className="field">
            <span>Topic</span>
            <select value={form.topic} onChange={handleChange("topic")}>
              {TOPICS.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Message</span>
            <textarea
              rows={4}
              placeholder="How can we help you?"
              value={form.message}
              onChange={handleChange("message")}
            />
            {errors.message && <em className="field-error">{errors.message}</em>}
          </label>

          <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>

          {status === "sent" && (
            <p className="contact-success" role="status">
              Thanks! Your message has been sent — we'll be in touch shortly.
            </p>
          )}
        </form>

        <aside className="contact-info">
          <h3>Office Information</h3>
          <div className="contact-info-item">
            <span className="contact-info-icon">
              <FontAwesomeIcon icon={faLocationDot} />
            </span>
            <div>
              <p className="contact-info-title">Headquarters</p>
              <p className="contact-info-text">123 Eco Way, Suite 400<br />Portland, OR 97204<br />United States</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <div>
              <p className="contact-info-title">Email Us</p>
              <p className="contact-info-text">hello@wastepal.com</p>
            </div>
          </div>
          <div className="contact-info-item">
            <span className="contact-info-icon">
              <FontAwesomeIcon icon={faPhone} />
            </span>
            <div>
              <p className="contact-info-title">Call Us</p>
              <p className="contact-info-text">+1 (800) 555-0199<br />Mon–Fri, 8am – 5pm PST</p>
            </div>
          </div>
          <div className="contact-map" aria-hidden="true">
            <span>Find Us</span>
          </div>
        </aside>
      </section>

      <section className="contact-faq" id="faq">
        <div className="section-inner">
          <h2>Quick Answers</h2>
          <p>Find instant answers to common questions before reaching out.</p>

          <div className="faq-list">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`} key={faq.q}>
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <FontAwesomeIcon icon={isOpen ? faChevronDown : faChevronRight} />
                  </button>
                  {isOpen && <p className="faq-answer">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
