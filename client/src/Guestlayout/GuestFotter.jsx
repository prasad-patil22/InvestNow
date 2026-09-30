import React from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserTie,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const GuestFooter = () => {
  return (
    <footer className="investnow-footer">
      <style>{`
        .investnow-footer {
          background-color: var(--primary);
          color: var(--ivory);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 70px 5% 30px;
          border-top: 3px solid var(--accent);
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.2fr 1.2fr;
          gap: 28px;
          margin-bottom: 40px;
        }

        /* Hairline Column Divider */
        .footer-col {
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          padding-right: 18px;
        }

        .footer-col:last-child {
          border-right: none;
          padding-right: 0;
        }

        /* Serif-Italic Heritage Section Labels */
        .footer-col-title {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 16.5px;
          font-weight: 500;
          color: var(--accent);
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .footer-col-title::after {
          content: "";
          display: inline-block;
          flex-grow: 1;
          height: 1px;
          background: rgba(212, 175, 55, 0.3);
          margin-left: 8px;
        }

        .footer-brand-name {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 21px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: -0.01em;
          margin-bottom: 2px;
        }

        .footer-brand-sub {
          font-size: 11.5px;
          color: var(--ivory);
          font-weight: 500;
          margin-bottom: 14px;
          display: block;
          opacity: 0.9;
        }

        .footer-tagline {
          font-size: 13.5px;
          color: rgba(251, 248, 241, 0.8);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .footer-gst {
          font-size: 11.5px;
          color: var(--accent);
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 5px 10px;
          border-radius: 4px;
          display: inline-block;
          font-weight: 600;
          margin-bottom: 16px;
        }

        /* Social Media Icons */
        .footer-socials {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 8px;
        }

        .social-icon-link {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.5);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.25s ease;
          background: rgba(212, 175, 55, 0.08);
        }

        .social-icon-link:hover {
          background: var(--accent);
          color: var(--primary);
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links a {
          color: rgba(251, 248, 241, 0.85);
          text-decoration: none;
          font-size: 13.5px;
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: inline-block;
        }

        .footer-links a:hover {
          color: var(--accent);
          padding-left: 4px;
        }

        .footer-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 13px;
          color: rgba(251, 248, 241, 0.85);
          line-height: 1.55;
          margin-bottom: 12px;
        }

        .footer-contact-icon {
          color: var(--accent);
          font-size: 13px;
          margin-top: 3px;
          flex-shrink: 0;
        }

        .footer-compliance-box {
          background: rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(212, 175, 55, 0.25);
          padding: 18px 22px;
          border-radius: 6px;
          margin-bottom: 25px;
          font-size: 12.5px;
          color: rgba(251, 248, 241, 0.75);
          line-height: 1.6;
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 12.5px;
          color: rgba(251, 248, 241, 0.65);
        }

        .footer-bottom-links {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footer-bottom-links a {
          color: rgba(251, 248, 241, 0.65);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-bottom-links a:hover {
          color: var(--accent);
        }

        /* Mobile Screen Compact Footer Rules */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
          .footer-col {
            border-right: none;
            padding-right: 0;
          }
        }

        @media (max-width: 650px) {
          .investnow-footer {
            padding: 38px 5% 20px;
          }
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px 14px;
            margin-bottom: 22px;
          }
          .footer-col {
            border-right: none;
            padding-right: 0;
          }
          .footer-col:first-child {
            grid-column: span 2;
            border-bottom: 1px solid rgba(255, 255, 255, 0.12);
            padding-bottom: 16px;
            margin-bottom: 4px;
          }
          .footer-col-title {
            font-size: 14.5px;
            margin-bottom: 10px;
          }
          .footer-links {
            gap: 7px;
          }
          .footer-links a {
            font-size: 12.5px;
          }
          .footer-contact-item {
            font-size: 12px;
            margin-bottom: 8px;
          }
          .footer-tagline {
            font-size: 12.5px;
            margin-bottom: 12px;
            line-height: 1.5;
          }
          .footer-compliance-box {
            padding: 14px;
            margin-bottom: 18px;
            font-size: 11px;
            line-height: 1.5;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
            padding-top: 14px;
            gap: 10px;
            font-size: 11.5px;
          }
          .footer-bottom-links {
            justify-content: center;
            gap: 10px;
          }
        }
      `}</style>

      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand Info & Social Media */}
          <div className="footer-col">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <img
                src="/logo.png"
                alt="INVESTNOW Logo"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  objectFit: "contain",
                  background: "#FFFFFF",
                  padding: "4px",
                  border: "2px solid var(--accent)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/logo.jpeg";
                }}
              />
              <div>
                <div className="footer-brand-name">INVESTNOW</div>
                <span className="footer-brand-sub">Financial Services Pvt. Ltd.</span>
              </div>
            </div>
            <p className="footer-tagline">
              Your Trusted Partner in Wealth Growth & Protection. Providing structured, ethical, and goal-oriented financial consultation.
            </p>
            <div className="footer-gst">
              GSTIN: 29AAICI5060P1ZX
            </div>

            {/* Social Media Icons */}
            <div className="footer-socials">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://wa.me/917975347138" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="WhatsApp">
                <FaWhatsapp />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services Offered</Link></li>
              <li><Link to="/financial-goals">Financial Goals</Link></li>
              <li><Link to="/chalukya-developers">Chalukya Developers</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <div className="footer-col-title">Core Solutions</div>
            <ul className="footer-links">
              <li><Link to="/services#mutual-funds">Mutual Funds & SIPs</Link></li>
              <li><Link to="/services#insurance">Insurance Protection</Link></li>
              <li><Link to="/services#loans">Loans & Financing</Link></li>
              <li><Link to="/services#wealth">Wealth Management</Link></li>
              <li><Link to="/services#stocks">Stocks & Equity</Link></li>
            </ul>
          </div>

          {/* Column 4: Compliance Links */}
          <div className="footer-col">
            <div className="footer-col-title">Legal & Trust</div>
            <ul className="footer-links">
              <li><Link to="/trust-compliance">Trust & Compliance</Link></li>
              <li><Link to="/regulatory-information">Regulatory Info</Link></li>
              <li><Link to="/risk-disclosures">Risk Notices</Link></li>
              <li><Link to="/transparency">Transparency</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Column 5: Corporate Office Contact */}
          <div className="footer-col">
            <div className="footer-col-title">Corporate Office</div>
            <div className="footer-contact-item">
              <FaMapMarkerAlt className="footer-contact-icon" />
              <span>INVESTNOW FINANCIAL SERVICES PVT. LTD.<br />Kundapura, Karnataka – 576201</span>
            </div>
            <div className="footer-contact-item">
              <FaPhoneAlt className="footer-contact-icon" />
              <span>+91 79753 47138<br />+91 99802 92567</span>
            </div>
            <div className="footer-contact-item">
              <FaEnvelope className="footer-contact-icon" />
              <span>meetinvenstnow@gmail.com</span>
            </div>
            <div className="footer-contact-item">
              <FaUserTie className="footer-contact-icon" />
              <span>Prashanth: +91 97433 33355</span>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="footer-compliance-box">
          <strong style={{ color: "var(--accent)" }}>Regulatory Disclaimer:</strong> Financial investments, mutual funds, securities, and insurance products are subject to market risks. Please read all scheme-related documents, risk disclosures, and policy terms carefully before making investment decisions. Past performance is not indicative of future returns. INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED acts as an authorized consultant and does not promise guaranteed non-market returns.
        </div>

        {/* Footer Bottom Copyright */}
        <div className="footer-bottom">
          <div>
            © 2026 INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED. All rights reserved.
          </div>
          <div className="footer-bottom-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-and-conditions">Terms of Use</Link>
            <Link to="/trust-compliance">Compliance Hub</Link>
            <Link to="/investnowlogin">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GuestFooter;