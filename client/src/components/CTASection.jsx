import React from "react";
import { Link } from "react-router-dom";

const CTASection = ({
  title = "Let's Build Your Financial Roadmap",
  subtitle = "Talk to our dedicated financial consultants to create a clear, goal-oriented wealth strategy.",
  primaryBtnText = "Contact Us",
  primaryBtnLink = "/contact",
  secondaryBtnText = "Explore Services",
  secondaryBtnLink = "/services",
}) => {
  return (
    <section className="cta-banner-wrapper">
      <style>{`
        .cta-banner-wrapper {
          background-color: var(--ivory);
          color: var(--text);
          padding: 70px 5%;
          text-align: center;
          position: relative;
          border-top: 1px solid var(--hairline);
          border-bottom: 1px solid var(--hairline);
        }

        .cta-banner-container {
          max-width: 850px;
          margin: 0 auto;
        }

        .cta-banner-kicker {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 14px;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .cta-banner-kicker::before,
        .cta-banner-kicker::after {
          content: "";
          display: inline-block;
          width: 24px;
          height: 1px;
          background-color: var(--accent);
        }

        .cta-banner-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 36px;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 14px;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }

        .cta-banner-subtitle {
          font-size: 16px;
          color: var(--muted);
          margin-bottom: 32px;
          line-height: 1.65;
        }

        .cta-btn-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-heritage-primary {
          background-color: var(--primary);
          color: var(--ivory);
          padding: 14px 32px;
          border-radius: 3px;
          font-size: 15px;
          font-weight: 600;
          border: 1px solid var(--primary);
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }

        .btn-heritage-primary:hover {
          background-color: var(--secondary);
          border-color: var(--secondary);
          color: var(--ivory);
        }

        .btn-heritage-outline {
          background-color: transparent;
          color: var(--primary);
          border: 1px solid var(--primary);
          padding: 14px 30px;
          border-radius: 3px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          text-decoration: none;
        }

        .btn-heritage-outline:hover {
          background-color: var(--gold-wash);
          border-color: var(--accent);
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .cta-banner-wrapper {
            padding: 50px 5%;
          }
          .cta-banner-title {
            font-size: 26px;
          }
          .cta-banner-subtitle {
            font-size: 15px;
          }
          .btn-heritage-primary, .btn-heritage-outline {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="cta-banner-container">
        <div className="cta-banner-kicker">Wealth Growth & Protection</div>
        <h2 className="cta-banner-title">{title}</h2>
        <p className="cta-banner-subtitle">{subtitle}</p>
        <div className="cta-btn-group">
          <Link to={primaryBtnLink} className="btn-heritage-primary">
            {primaryBtnText}
          </Link>
          {secondaryBtnText && (
            <Link to={secondaryBtnLink} className="btn-heritage-outline">
              {secondaryBtnText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
