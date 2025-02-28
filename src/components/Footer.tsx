import { useState } from "react";
import footerLogo from "../assets/footer-logo.svg";
import footerBg from "../assets/footer-bg-ele.svg";

export default function Footer() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index: any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <footer>
      <div className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <img
              src={footerLogo}
              alt="McKesson logo above business, care, connectivity logo"
            ></img>
            <div className="contact-info">
              <p>
                Medical Professionals
                <br />
                855.571.2100
              </p>
              <p>
                Help Desk
                <br />
                800.422.0280
              </p>
              <p>
                Accounts Receivable
                <br />
                800.453.5100
              </p>
            </div>
          </div>

          <div className="footer-section">
            <h3>Medical Supplies</h3>
            <ul className="under-line">
              {[
                "Government",
                "Home Health",
                "Laboratory",
                "McKesson Brands",
                "Oncology",
                "Pharmaceuticals",
                "Physician Office",
                "Preferred Suppliers",
              ].map((item) => (
                <li className="footer-link" key={item}>
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Solutions</h3>
            <ul className="under-line">
              {[
                "Analytics and Reporting",
                "Clinic Set Up and Equipment",
                "Distribution",
                "Commerce Services",
                "Financial Services",
                "Inventory Management",
                "Lab Management",
                "Patient Care and Engagement",
                "Training and Compliance",
              ].map((item) => (
                <li className="footer-link" key={item}>
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>Insights</h3>
            <ul className="under-line">
              {[
                "CLIA 101: Answers to your most common questions about CLIA: waived tests",
                'The pros and cons of the "buy and bill" model of pharmaceutical distribution',
                "How low unit of measure can streamline your patient care",
                "Drug Supply Chain Security Act",
                "USP General Chapter -480+",
                "Upcoming Wishness",
              ].map((item) => (
                <li className="footer-link" key={item}>
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h3>About McKesson</h3>
            <ul className="under-line">
              {[
                "Contact Us",
                "McKesson Choice Rewards",
                "McKesson Corporate",
                "Careers",
              ].map((item) => (
                <li className="footer-link" key={item}>
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>
            {/* <div className="account-actions">
                <button>Login To SupplyManager</button>
                <button>Request an Account</button>
              </div> */}
            <ul className="under-line">
              {["Login To SupplyManager", "Request an Account"].map((item) => (
                <li className="footer-link" key={item}>
                  <a href="/">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-secondary">
        <div className="footer-spacing">
          <div className="footer-bottom">
            <div className="legal-links">
              {[
                "Disclaimer",
                "Privacy Policy",
                "Forms and Policies",
                "McKesson.com",
                "Do Not Sell My Personal Information",
              ].map((item) => (
                <a key={item} href="/">
                  {item}
                </a>
              ))}
            </div>
            <hr className="footer-border" />
            <div className="copyright">
              © 2025 McKesson Medical-Surgical Inc.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
