import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaChartLine, FaUserTie, FaArrowRight, FaPhoneAlt } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="investnow-hero">
      <style>{`
        .investnow-hero {
          background-color: #F5F8F6;
          color: #17231E;
          padding: 60px 5% 80px 5%;
          min-height: calc(100vh - 90px);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .hero-container {
          max-width: 1280px;
          width: 100%;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 50px;
          align-items: center;
        }

        /* Left Content Styles */
        .hero-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          z-index: 2;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(212, 175, 55, 0.12);
          border: 1px solid rgba(212, 175, 55, 0.35);
          padding: 6px 16px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 700;
          color: #D4AF37;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #D4AF37;
          display: inline-block;
        }

        .hero-brand-subtitle {
          font-size: 15px;
          font-weight: 600;
          color: #0B6045;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .hero-brand-subtitle::after {
          content: "";
          display: inline-block;
          width: 40px;
          height: 2px;
          background-color: #D4AF37;
        }

        .hero-heading {
          font-size: 52px;
          line-height: 1.15;
          font-weight: 800;
          color: #073B2A;
          margin-bottom: 20px;
          letter-spacing: -0.5px;
        }

        .hero-heading .gold-text {
          color: #D4AF37;
          position: relative;
          display: inline-block;
        }

        .hero-tagline {
          font-size: 18px;
          font-weight: 600;
          color: #073B2A;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .hero-description {
          font-size: 17px;
          line-height: 1.6;
          color: #5B6B63;
          margin-bottom: 36px;
          max-width: 580px;
        }

        /* CTA Buttons */
        .hero-cta-group {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .btn-primary-gold {
          background-color: #D4AF37;
          color: #FFFFFF;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          border: 1px solid #D4AF37;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
        }

        .btn-primary-gold:hover {
          background-color: #B8941F;
          border-color: #B8941F;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(184, 148, 31, 0.4);
        }

        .btn-secondary-green {
          background-color: transparent;
          color: #073B2A;
          border: 2px solid #073B2A;
          padding: 12px 30px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .btn-secondary-green:hover {
          background-color: #073B2A;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(7, 59, 42, 0.25);
        }

        /* Hero Trust Badges */
        .hero-trust-row {
          display: flex;
          align-items: center;
          gap: 28px;
          margin-top: 40px;
          padding-top: 24px;
          border-top: 1px solid #DCE8E1;
          width: 100%;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .trust-icon {
          color: #D4AF37;
          font-size: 20px;
        }

        .trust-text {
          font-size: 13px;
          font-weight: 600;
          color: #17231E;
          line-height: 1.2;
        }

        .trust-text span {
          display: block;
          color: #87958E;
          font-size: 11px;
          font-weight: 500;
        }

        /* Right Image Styles */
        .hero-right {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          max-width: 540px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 45px rgba(7, 59, 42, 0.15);
          border: 4px solid #FFFFFF;
          background: #FFFFFF;
        }

        .hero-img {
          width: 100%;
          height: auto;
          aspect-ratio: 4/3;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .image-wrapper:hover .hero-img {
          transform: scale(1.03);
        }

        /* Floating Overlay Badge */
        .floating-card {
          position: absolute;
          bottom: 24px;
          left: -20px;
          background: #FFFFFF;
          padding: 16px 22px;
          border-radius: 14px;
          box-shadow: 0 12px 30px rgba(7, 59, 42, 0.15);
          display: flex;
          align-items: center;
          gap: 14px;
          border-left: 4px solid #D4AF37;
          z-index: 3;
        }

        .floating-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(7, 59, 42, 0.08);
          color: #073B2A;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .floating-title {
          font-size: 14px;
          font-weight: 700;
          color: #073B2A;
          margin-bottom: 2px;
        }

        .floating-sub {
          font-size: 12px;
          color: #5B6B63;
          font-weight: 500;
        }

        /* Decorative Backdrop Accent */
        .backdrop-accent {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 100%;
          height: 100%;
          border: 2px dashed #D4AF37;
          border-radius: 24px;
          z-index: 0;
          pointer-events: none;
          opacity: 0.5;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .hero-left {
            align-items: center;
            text-align: center;
          }

          .hero-brand-subtitle {
            justify-content: center;
          }

          .hero-brand-subtitle::after {
            display: none;
          }

          .hero-heading {
            font-size: 42px;
          }

          .hero-description {
            max-width: 100%;
          }

          .hero-cta-group {
            justify-content: center;
          }

          .hero-trust-row {
            justify-content: center;
          }

          .floating-card {
            left: 20px;
            bottom: 20px;
          }
        }

        @media (max-width: 768px) {
          .investnow-hero {
            padding: 40px 4% 60px 4%;
          }

          .hero-heading {
            font-size: 34px;
          }

          .hero-description {
            font-size: 15px;
          }

          .btn-primary-gold, .btn-secondary-green {
            width: 100%;
            justify-content: center;
            padding: 14px 20px;
          }

          .hero-cta-group {
            width: 100%;
            flex-direction: column;
            gap: 12px;
          }

          .hero-trust-row {
            flex-direction: column;
            gap: 16px;
            align-items: center;
          }

          .floating-card {
            position: relative;
            left: 0;
            bottom: 0;
            margin-top: 15px;
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="hero-container">
        {/* LEFT COLUMN: Content */}
        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Small Badge / Label */}
          <div className="hero-badge">
            <span className="badge-dot"></span>
            FINANCIAL SERVICES
          </div>

          <div className="hero-brand-subtitle">
            INVESTNOW — Financial Services Pvt. Ltd.
          </div>

          {/* Main Heading */}
          <h1 className="hero-heading">
            Build Your <span className="gold-text">Financial Future</span> with Confidence
          </h1>

          {/* Tagline */}
          <div className="hero-tagline">
            Your Trusted Partner in Wealth Growth & Protection
          </div>

          {/* Supporting Text */}
          <p className="hero-description">
            Smart financial solutions designed to help you grow, protect and manage your wealth with confidence.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <a href="#start" className="btn-primary-gold">
              Start Your Journey <FaArrowRight style={{ fontSize: "14px" }} />
            </a>
            <a href="#consultant" className="btn-secondary-green">
              Talk to a Consultant <FaPhoneAlt style={{ fontSize: "14px" }} />
            </a>
          </div>

          {/* Trust Metrics */}
          <div className="hero-trust-row">
            <div className="trust-item">
              <FaShieldAlt className="trust-icon" />
              <div className="trust-text">
                Wealth Protection
                <span>Secured Strategies</span>
              </div>
            </div>
            <div className="trust-item">
              <FaChartLine className="trust-icon" />
              <div className="trust-text">
                Portfolio Growth
                <span>Expert Advisors</span>
              </div>
            </div>
            <div className="trust-item">
              <FaUserTie className="trust-icon" />
              <div className="trust-text">
                Personalized Service
                <span>Dedicated Consultants</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Image */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: "540px" }}>
            <div className="backdrop-accent"></div>
            <div className="image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop"
                alt="INVESTNOW Financial Advisor and Growth Consulting"
                className="hero-img"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              className="floating-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="floating-icon-box">
                <FaChartLine style={{ color: "#D4AF37" }} />
              </div>
              <div>
                <div className="floating-title">Wealth Growth & Planning</div>
                <div className="floating-sub">Trusted by 10,000+ Investors</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
