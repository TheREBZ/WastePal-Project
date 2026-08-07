import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullseye,
  faEye,
  faShieldHeart,
  faLightbulb,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import Layout from "../components/Layout";
import "../styles/AboutUs.css";

const VALUES = [
  {
    icon: faShieldHeart,
    title: "Trust & Transparency",
    desc: "We track every kilogram from doorstep to facility and publish the numbers, no exceptions.",
  },
  {
    icon: faLightbulb,
    title: "Relentless Innovation",
    desc: "From AI sorting to smart bins, we keep pushing what's possible for everyday waste management.",
  },
  {
    icon: faPeopleGroup,
    title: "Community First",
    desc: "We build with the neighborhoods we serve, not just for them, through local partnerships and open feedback.",
  },
];

const AboutUs = () => {
  return (
    <Layout>
      <section className="about-hero section-inner">
        <span className="about-eyebrow">Our Story</span>
        <h1>Redefining waste for a greener tomorrow.</h1>
        <p>
          We believe that effective waste management is the cornerstone of
          sustainable living. WastePal combines cutting-edge technology with
          environmental stewardship to create a cleaner, smarter world.
        </p>

        <div className="about-cards">
          <div className="about-card">
            <span className="about-card-icon">
              <FontAwesomeIcon icon={faBullseye} />
            </span>
            <h3>Our Mission</h3>
            <p>
              To empower communities and businesses with intelligent, transparent,
              and eco-conscious waste management solutions, reducing landfill
              dependency one pickup at a time.
            </p>
          </div>
          <div className="about-card">
            <span className="about-card-icon">
              <FontAwesomeIcon icon={faEye} />
            </span>
            <h3>Our Vision</h3>
            <p>
              A zero-waste future where every discarded item is viewed as a
              valuable resource, meticulously tracked and efficiently repurposed
              through a seamless circular economy.
            </p>
          </div>
        </div>
      </section>

      <section className="about-story section-inner">
        <div className="about-story-copy">
          <h2>Rooted in sustainability, built for scale.</h2>
          <p>
            What started as a small neighborhood pickup service has grown into a
            technology platform trusted by thousands of households and businesses,
            without losing sight of the communities we set out to serve.
          </p>
        </div>
        <div className="about-story-image" aria-hidden="true" />
      </section>

      <section className="about-impact">
        <div className="about-impact-inner section-inner">
          <h2>Real, Measurable Impact</h2>
          <p>Transparency is our core value. We track every metric so you can see the tangible benefits we deliver to the planet.</p>
          <div className="about-impact-stats">
            <div>
              <p className="about-impact-value">500k</p>
              <p className="about-impact-label">Tons Recycled</p>
            </div>
            <div>
              <p className="about-impact-value">1.2M</p>
              <p className="about-impact-label">Trees Saved</p>
            </div>
            <div>
              <p className="about-impact-value">-45%</p>
              <p className="about-impact-label">Carbon Footprint</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values section-inner">
        <h2>Our Values</h2>
        <div className="about-values-grid">
          {VALUES.map((value) => (
            <div className="about-value-card" key={value.title}>
              <span className="about-card-icon">
                <FontAwesomeIcon icon={value.icon} />
              </span>
              <h3>{value.title}</h3>
              <p>{value.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default AboutUs;
