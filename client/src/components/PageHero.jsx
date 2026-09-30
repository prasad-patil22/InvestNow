import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const PageHero = ({ title, subtitle, badge, breadcrumbs = [] }) => {
  return (
    <div className="page-hero-wrapper">
      <style>{`
        .page-hero-wrapper {
          background-color: var(--primary);
          color: var(--ivory);
          padding: 70px 5% 55px;
          position: relative;
          overflow: hidden;
          border-bottom: 1px solid var(--hairline);
        }

        .page-hero-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .hero-breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 13px;
          color: rgba(251, 248, 241, 0.7);
          margin-bottom: 24px;
        }

        .hero-breadcrumb a {
          color: var(--accent);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .hero-breadcrumb a:hover {
          color: var(--ivory);
          text-decoration: underline;
        }

        .hero-breadcrumb-separator {
          font-size: 9px;
          color: rgba(251, 248, 241, 0.4);
        }

        /* Heritage Serif Kicker Mark */
        .page-hero-kicker {
          font-family: 'Fraunces', Georgia, serif;
          font-style: italic;
          font-size: 14px;
          color: var(--accent);
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .page-hero-kicker::before,
        .page-hero-kicker::after {
          content: "";
          display: inline-block;
          width: 24px;
          height: 1px;
          background-color: var(--accent);
        }

        .page-hero-title {
          font-family: 'Fraunces', Georgia, serif;
          font-size: 42px;
          font-weight: 600;
          color: var(--ivory);
          margin-bottom: 14px;
          line-height: 1.18;
          letter-spacing: -0.01em;
        }

        .page-hero-subtitle {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          color: rgba(251, 248, 241, 0.85);
          max-width: 750px;
          line-height: 1.65;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .page-hero-wrapper {
            padding: 45px 5% 40px;
          }
          .page-hero-title {
            font-size: 30px;
          }
          .page-hero-subtitle {
            font-size: 15px;
          }
        }
      `}</style>

      <div className="page-hero-container">
        {/* Breadcrumb Navigation */}
        <div className="hero-breadcrumb">
          <Link to="/">Home</Link>
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              <FaChevronRight className="hero-breadcrumb-separator" />
              {item.path ? (
                <Link to={item.path}>{item.label}</Link>
              ) : (
                <span style={{ color: "var(--ivory)" }}>{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {badge && <div className="page-hero-kicker">{badge}</div>}

        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default PageHero;
