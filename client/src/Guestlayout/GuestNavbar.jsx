import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaChevronDown, FaBars, FaTimes, FaBuilding } from "react-icons/fa";

const GuestNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="investnow-header">
      <style>{`
        .investnow-header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          box-shadow: 0 4px 20px rgba(7, 59, 42, 0.15);
        }

        /* Top Bar - Premium Deep Emerald */
        .top-bar {
          background-color: #073B2A;
          color: #F5F8F6;
          font-size: 13px;
          padding: 8px 5%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(212, 175, 55, 0.25);
        }

        .top-bar-info {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .top-bar-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #F5F8F6;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .top-bar-item:hover {
          color: #D4AF37;
        }

        .top-bar-icon {
          color: #D4AF37;
          font-size: 12px;
        }

        /* Main Navbar */
        .navbar-main {
          background: #073B2A;
          padding: 0 5%;
          height: 85px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .navbar-main.scrolled {
          height: 75px;
          background: #052B1E;
          border-bottom: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3);
        }

        /* Brand Logo Area */
        .navbar-brand {
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .brand-logo-img {
          width: 52px;
          height: 52px;
          object-fit: contain;
          border-radius: 50%;
          background: #FFFFFF;
          padding: 4px;
          border: 2px solid #D4AF37;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
          transition: all 0.3s ease;
        }

        .navbar-main.scrolled .brand-logo-img {
          width: 44px;
          height: 44px;
        }

        .brand-name {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 24px;
          font-weight: 700;
          color: #D4AF37;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }

        .brand-sub {
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #F5F8F6;
          letter-spacing: 0.5px;
        }

        /* Nav Menu */
        .nav-menu {
          display: flex;
          align-items: center;
          gap: 20px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          padding: 30px 4px;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s ease;
          border-bottom: 2px solid transparent;
        }

        .navbar-main.scrolled .nav-link {
          padding: 25px 4px;
        }

        .nav-link:hover, .nav-link.active {
          color: #D4AF37;
          border-bottom-color: #D4AF37;
        }

        .dropdown-icon {
          font-size: 10px;
          color: #D4AF37;
          transition: transform 0.2s ease;
        }

        .nav-item:hover .dropdown-icon {
          transform: rotate(180deg);
        }

        /* Dropdown Menu */
        .dropdown-menu-custom {
          position: absolute;
          top: 100%;
          left: 0;
          width: 250px;
          background: #073B2A;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 6px;
          padding: 10px 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          opacity: 0;
          visibility: hidden;
          transform: translateY(8px);
          transition: all 0.25s ease;
          list-style: none;
          margin: 0;
          z-index: 100;
        }

        .nav-item:hover .dropdown-menu-custom {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item-custom a {
          display: block;
          padding: 10px 20px;
          color: #F5F8F6;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .dropdown-item-custom a:hover {
          background: rgba(212, 175, 55, 0.15);
          color: #D4AF37;
        }

        /* Distinct Sub-Brand Highlight Box for Chalukya Developers */
        .chalukya-nav-box {
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid #D4AF37;
          border-radius: 6px;
          padding: 8px 16px !important;
          color: #D4AF37 !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(212, 175, 55, 0.15);
          border-bottom: 1px solid #D4AF37 !important;
          margin-left: 6px;
        }

        .chalukya-nav-box:hover, .chalukya-nav-box.active {
          background: #D4AF37;
          color: #073B2A !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        .chalukya-nav-box:hover .chalukya-box-icon,
        .chalukya-nav-box.active .chalukya-box-icon {
          color: #073B2A !important;
        }

        .chalukya-box-icon {
          color: #D4AF37;
          font-size: 14px;
          transition: color 0.2s ease;
        }

        .sub-brand-tag {
          font-size: 9px;
          background: #073B2A;
          color: #D4AF37;
          padding: 2px 6px;
          border-radius: 3px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 800;
          border: 1px solid rgba(212, 175, 55, 0.4);
        }

        .chalukya-nav-box:hover .sub-brand-tag,
        .chalukya-nav-box.active .sub-brand-tag {
          background: #073B2A;
          color: #FFFFFF;
        }

        /* Mobile Hamburger */
        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: #FFFFFF;
          font-size: 24px;
          cursor: pointer;
        }

        @media (max-width: 1100px) {
          .top-bar-info span { display: none; }
          .nav-link { font-size: 13px; padding: 25px 2px; }
        }

        @media (max-width: 992px) {
          .top-bar { display: none; }
          .mobile-toggle { display: block; }
          .nav-menu {
            position: fixed;
            top: 85px;
            right: -100%;
            width: 300px;
            height: calc(100vh - 85px);
            background: #073B2A;
            border-left: 1px solid rgba(212, 175, 55, 0.3);
            flex-direction: column;
            align-items: stretch;
            padding: 20px;
            gap: 10px;
            transition: right 0.3s ease;
            overflow-y: auto;
          }

          .nav-menu.active {
            right: 0;
          }

          .nav-link {
            padding: 14px 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            justify-content: space-between;
          }

          .dropdown-menu-custom {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            border: none;
            background: transparent;
            padding-left: 15px;
            display: none;
          }

          .dropdown-menu-custom.mobile-show {
            display: block;
          }

          .chalukya-nav-box {
            margin-left: 0;
            margin-top: 10px;
            justify-content: center;
          }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-info">
          <a href="tel:+917975347138" className="top-bar-item">
            <FaPhoneAlt className="top-bar-icon" /> +91 79753 47138
          </a>
          <a href="mailto:meetinvenstnow@gmail.com" className="top-bar-item">
            <FaEnvelope className="top-bar-icon" /> meetinvenstnow@gmail.com
          </a>
          <span className="top-bar-item" style={{ cursor: "default" }}>
            <FaMapMarkerAlt className="top-bar-icon" /> Kundapura, Karnataka
          </span>
        </div>

        <div style={{ color: "#D4AF37", fontSize: "12px", fontWeight: "600" }}>
          GSTIN: 29AAICI5060P1ZX
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`navbar-main ${isScrolled ? "scrolled" : ""}`}>
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <img
            src="/logo.png"
            alt="INVESTNOW Logo"
            className="brand-logo-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/logo.jpeg";
            }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span className="brand-name">INVESTNOW</span>
            <span className="brand-sub">Financial Services Pvt. Ltd.</span>
          </div>
        </Link>

        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle navigation">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <ul className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/about"
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
              onClick={closeMenu}
            >
              About Us
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/services"
              className={`nav-link ${location.pathname === "/services" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Services
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/financial-goals"
              className={`nav-link ${location.pathname === "/financial-goals" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Financial Goals
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/trust-compliance"
              className={`nav-link ${location.pathname.includes("trust") || location.pathname.includes("risk") || location.pathname.includes("regulatory") ? "active" : ""}`}
              onClick={(e) => {
                if (window.innerWidth <= 992) {
                  toggleDropdown("compliance");
                }
              }}
            >
              Compliance <FaChevronDown className="dropdown-icon" />
            </Link>
            <ul className={`dropdown-menu-custom ${activeDropdown === "compliance" ? "mobile-show" : ""}`}>
              <li className="dropdown-item-custom"><Link to="/trust-compliance" onClick={closeMenu}>Trust & Compliance Portal</Link></li>
              <li className="dropdown-item-custom"><Link to="/regulatory-information" onClick={closeMenu}>Regulatory Disclosures</Link></li>
              <li className="dropdown-item-custom"><Link to="/risk-disclosures" onClick={closeMenu}>Risk & Mandatory Notices</Link></li>
              <li className="dropdown-item-custom"><Link to="/transparency" onClick={closeMenu}>Transparency Policies</Link></li>
              <li className="dropdown-item-custom"><Link to="/privacy-policy" onClick={closeMenu}>Privacy Policy</Link></li>
              <li className="dropdown-item-custom"><Link to="/terms-and-conditions" onClick={closeMenu}>Terms & Conditions</Link></li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              to="/customer-support"
              className={`nav-link ${location.pathname === "/customer-support" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Customer Support
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-link ${location.pathname === "/contact" ? "active" : ""}`}
              onClick={closeMenu}
            >
              Contact Us
            </Link>
          </li>

          {/* Last Nav Item: Distinct Sub-brand Box for Chalukya Developers */}
          <li className="nav-item">
            <Link
              to="/chalukya-developers"
              className={`chalukya-nav-box ${location.pathname === "/chalukya-developers" ? "active" : ""}`}
              onClick={closeMenu}
            >
              <FaBuilding className="chalukya-box-icon" />
              <span>Chalukya Developers</span>
              <span className="sub-brand-tag">Land</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default GuestNavbar;