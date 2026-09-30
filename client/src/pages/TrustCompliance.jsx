import React, { useRef } from "react";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaExclamationTriangle,
  FaEye,
  FaUserShield,
  FaFileContract,
  FaArrowRight,
} from "react-icons/fa";

const Spot = ({ className = "", children, ...rest }) => {
  const ref = useRef(null);
  const move = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={move} className={`spot ${className}`} {...rest}>
      {children}
    </div>
  );
};

const TrustCompliance = () => {
  const complianceSections = [
    {
      title: "Regulatory Information",
      path: "/regulatory-information",
      icon: <FaShieldAlt />,
      desc: "Information regarding applicable regulatory guidelines, corporate details, and service-specific compliance policies.",
    },
    {
      title: "Risk Disclosures",
      path: "/risk-disclosures",
      icon: <FaExclamationTriangle />,
      desc: "Important notices regarding financial market risks, product issuer terms, and non-guarantee of returns.",
    },
    {
      title: "Transparency & Disclosures",
      path: "/transparency",
      icon: <FaEye />,
      desc: "Our commitment to open communication, clear fee structures, and transparent customer service.",
    },
    {
      title: "Privacy Policy",
      path: "/privacy-policy",
      icon: <FaUserShield />,
      desc: "How we collect, protect, and handle client information in accordance with applicable data privacy guidelines.",
    },
    {
      title: "Terms & Conditions",
      path: "/terms-and-conditions",
      icon: <FaFileContract />,
      desc: "The standard terms governing website access, service consultations, and client interactions.",
    },
  ];

  return (
    <div className="tc-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');

        .tc-page {
          --primary:#073B2A; --secondary:#0B6045; --accent:#D4AF37; --bg:#F5F8F6;
          --ivory:#FBF8F1; --text:#17231E; --muted:#5B6B63; --deep:#0A1310;
          background:var(--bg); color:var(--text); overflow-x:hidden;
          font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
        }
        .tc-page h2,.tc-page h3,.tc-page h4 { font-family:'Fraunces',Georgia,serif; margin:0; }
        .tc-page .wrap { max-width:1200px; margin:0 auto; }
        .tc-page section.sec { padding:104px 5%; position:relative; }

        .head { max-width:660px; margin-bottom:56px; }
        .head h2 { font-size:clamp(30px,4vw,44px); font-weight:600; line-height:1.15; letter-spacing:-.015em; margin-bottom:14px; color:var(--primary); }
        .head p { font-size:16.5px; line-height:1.7; margin:0; color:var(--muted); max-width:56ch; }

        /* Dark Bento Grid for Disclosures */
        .dark-sec { background:#0A1310; color:#FDFBF5; isolation:isolate; }
        .dark-sec::before { content:''; position:absolute; inset:0; z-index:-1; background:radial-gradient(600px 400px at 90% 0%,rgba(11,96,69,.45),transparent 70%),radial-gradient(500px 400px at 0% 100%,rgba(212,175,55,.15),transparent 70%); }
        .dgrid-bg { position:absolute; inset:0; z-index:-1; width:100%; height:100%; opacity:.4; }

        .compliance-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-bottom:60px; }
        .spot {
          --mx:50%; --my:50%; position:relative; overflow:hidden; border-radius:24px; padding:34px;
          background:linear-gradient(165deg, rgba(16, 42, 33, 0.8), rgba(8, 24, 18, 0.95));
          border:1px solid rgba(212, 175, 55, 0.22);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          display:flex; flex-direction:column; justify-content:space-between;
          transition:all .3s ease;
        }
        .spot::before {
          content:''; position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .3s;
          background:radial-gradient(360px circle at var(--mx) var(--my),rgba(212,175,55,.25),transparent 60%);
        }
        .spot:hover { border-color:#D4AF37; transform:translateY(-4px); box-shadow:0 16px 36px rgba(212, 175, 55, 0.2); }
        .spot:hover::before { opacity:1; }
        .spot > * { position:relative; }

        .compliance-icon {
          width:50px; height:50px; border-radius:16px; display:grid; place-items:center; font-size:22px;
          color:var(--accent); background:rgba(212,175,55,.12); border:1px solid rgba(212,175,55,.3); margin-bottom:20px;
        }
        .compliance-card-title { font-size:22px; font-weight:600; color:#FDFBF5; margin:0 0 10px; }
        .compliance-card-desc { font-size:14.5px; line-height:1.65; color:rgba(253,251,245,.68); margin:0 0 25px; }

        .read-more-link {
          color:var(--accent); font-weight:600; font-size:14px; text-decoration:none;
          display:inline-flex; align-items:center; gap:8px; transition:gap .25s, color .25s;
        }
        .read-more-link:hover { gap:13px; color:#fff; }

        .disclosure-box {
          background:var(--ivory); padding:44px; border-radius:28px; border:1px solid rgba(7,59,42,.12);
          border-left:4px solid var(--accent); color:var(--text);
        }
        .disclosure-box-title { font-size:24px; font-weight:600; color:var(--primary); margin-bottom:16px; }
        .disclosure-list { list-style:disc; padding-left:22px; margin:0; color:var(--muted); font-size:15px; line-height:1.8; }

        @media (max-width:1024px) {
          .compliance-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:600px) {
          .tc-page section.sec { padding:70px 6%; }
          .compliance-grid { grid-template-columns:1fr; }
          .disclosure-box { padding:30px 20px; }
        }
      `}</style>

      {/* Hero Header */}
      <PageHero
        title="Trust, Transparency & Responsible Information"
        subtitle="Explore our regulatory disclosures, risk notices, privacy commitments, and corporate governance standards."
        badge="GOVERNANCE & TRUST"
        breadcrumbs={[{ label: "Trust & Compliance" }]}
      />

      <section className="sec dark-sec">
        <svg className="dgrid-bg" aria-hidden="true">
          <defs>
            <pattern id="tcGrid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M56 0H0V56" fill="none" stroke="rgba(255,255,255,.05)" />
            </pattern>
            <radialGradient id="tcFade" cx="50%" cy="30%" r="70%">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="tcMask">
              <rect width="100%" height="100%" fill="url(#tcFade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#tcGrid)" mask="url(#tcMask)" />
        </svg>

        <div className="wrap">
          <div className="head" style={{ color: "#FDFBF5" }}>
            <h2 style={{ color: "#FDFBF5" }}>Corporate Disclosures & Policies</h2>
            <p style={{ color: "rgba(253,251,245,.7)" }}>
              We operate with high standards of corporate transparency and responsible client communication.
            </p>
          </div>

          <div className="compliance-grid">
            {complianceSections.map((c, i) => (
              <Spot key={i}>
                <div>
                  <div className="compliance-icon">{c.icon}</div>
                  <h3 className="compliance-card-title">{c.title}</h3>
                  <p className="compliance-card-desc">{c.desc}</p>
                </div>
                <div>
                  <Link to={c.path} className="read-more-link">
                    Read Policy Document <FaArrowRight size={12} />
                  </Link>
                </div>
              </Spot>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          {/* Key Risk Summary Box */}
          <div className="disclosure-box">
            <h3 className="disclosure-box-title">Essential Risk & Regulatory Notice</h3>
            <ul className="disclosure-list">
              <li>Financial products (such as mutual funds, equities, and insurance plans) carry underlying product and market risks.</li>
              <li>Past financial performance does not serve as a guarantee of future returns.</li>
              <li>Please contact INVESTNOW for applicable regulatory and service-specific information regarding individual product issuers.</li>
              <li>Clients should carefully evaluate their individual risk capacity and read official offer documents prior to executing financial decisions.</li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Have Questions Regarding Compliance or Policies?"
        primaryBtnText="Contact Support"
        primaryBtnLink="/contact"
        secondaryBtnText="Back to Home"
        secondaryBtnLink="/"
      />
    </div>
  );
};

export default TrustCompliance;
