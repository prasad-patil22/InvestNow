import React, { useState, useEffect, useRef } from "react";
import { apiUrl } from "../api";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaUmbrella,
  FaGraduationCap,
  FaHome,
  FaBriefcase,
  FaShieldAlt,
  FaArrowRight,
  FaBullseye,
  FaClipboardList,
  FaCogs,
  FaSyncAlt,
  FaCheckDouble,
  FaExclamationTriangle,
  FaSync,
} from "react-icons/fa";

const renderIcon = (iconName) => {
  switch (iconName) {
    case "FaChartLine":
      return <FaChartLine />;
    case "FaUmbrella":
      return <FaUmbrella />;
    case "FaGraduationCap":
      return <FaGraduationCap />;
    case "FaHome":
      return <FaHome />;
    case "FaBriefcase":
      return <FaBriefcase />;
    case "FaShieldAlt":
      return <FaShieldAlt />;
    case "FaBullseye":
      return <FaBullseye />;
    case "FaClipboardList":
      return <FaClipboardList />;
    case "FaCogs":
      return <FaCogs />;
    case "FaSyncAlt":
      return <FaSyncAlt />;
    case "FaCheckDouble":
      return <FaCheckDouble />;
    default:
      return <FaBullseye />;
  }
};

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

const FinancialGoals = () => {
  const [goalsData, setGoalsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchGoalsContent = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(apiUrl("/api/financial-goals"));
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      const result = await res.json();
      if (result.success && result.data) {
        setGoalsData(result.data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to fetch Financial Goals resources:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoalsContent();
  }, []);

  const getSortedItems = (array) => {
    if (!array || !Array.isArray(array)) return [];
    return [...array].sort((a, b) => (a.priority || 0) - (b.priority || 0));
  };

  const pillars = getSortedItems(goalsData?.pillars);
  const journeySteps = getSortedItems(goalsData?.journeySteps);

  return (
    <div className="fg-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');

        .fg-page {
          --primary:#073B2A; --secondary:#0B6045; --accent:#D4AF37; --bg:#F5F8F6;
          --ivory:#FBF8F1; --text:#17231E; --muted:#5B6B63; --deep:#0A1310;
          background:var(--bg); color:var(--text); overflow-x:hidden;
          font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
        }
        .fg-page h2,.fg-page h3,.fg-page h4 { font-family:'Fraunces',Georgia,serif; margin:0; }
        .fg-page .wrap { max-width:1200px; margin:0 auto; }
        .fg-page section.sec { padding:104px 5%; position:relative; }

        .head { max-width:660px; margin-bottom:56px; }
        .head h2 { font-size:clamp(30px,4vw,44px); font-weight:600; line-height:1.15; letter-spacing:-.015em; margin-bottom:14px; color:var(--primary); }
        .head p { font-size:16.5px; line-height:1.7; margin:0; color:var(--muted); max-width:56ch; }

        /* Dark Bento Pillars Section */
        .dark-sec { background:#0A1310; color:#FDFBF5; isolation:isolate; }
        .dark-sec::before { content:''; position:absolute; inset:0; z-index:-1; background:radial-gradient(600px 400px at 90% 0%,rgba(11,96,69,.45),transparent 70%),radial-gradient(500px 400px at 0% 100%,rgba(212,175,55,.15),transparent 70%); }
        .dgrid-bg { position:absolute; inset:0; z-index:-1; width:100%; height:100%; opacity:.4; }

        .pillars-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
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
          background:radial-gradient(320px circle at var(--mx) var(--my),rgba(212,175,55,.25),transparent 60%);
        }
        .spot:hover { border-color:#D4AF37; transform:translateY(-4px); box-shadow:0 16px 36px rgba(212, 175, 55, 0.2); }
        .spot:hover::before { opacity:1; }
        .spot > * { position:relative; }

        .p-icon {
          width:50px; height:50px; border-radius:16px; display:grid; place-items:center; font-size:22px;
          color:var(--accent); background:rgba(212,175,55,.12); border:1px solid rgba(212,175,55,.3); margin-bottom:20px;
        }
        .p-title { font-size:22px; font-weight:600; color:#FDFBF5; margin:0 0 10px; }
        .p-desc { font-size:14.5px; line-height:1.65; color:rgba(253,251,245,.68); margin:0 0 20px; }

        .p-bullets { list-style:none; padding:0; margin:0 0 26px 0; display:flex; flex-direction:column; gap:10px; }
        .p-bullet { font-size:13.5px; color:rgba(253,251,245,.88); display:flex; align-items:center; gap:10px; }
        .p-bullet::before { content:'•'; color:var(--accent); font-size:18px; }

        .pill-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:var(--accent); color:var(--deep); font-weight:600; font-size:14px;
          padding:12px 20px; border-radius:999px; text-decoration:none; transition:transform .25s, box-shadow .25s;
          width:100%; box-sizing:border-box;
        }
        .pill-btn:hover { transform:translateY(-2px); box-shadow:0 10px 26px rgba(212,175,55,.35); }

        /* Journey Roadmap Section */
        .journey-sec { background:var(--ivory); }
        .journey-roadmap { display:grid; grid-template-columns:repeat(5,1fr); gap:20px; margin-top:40px; position:relative; }
        .journey-card {
          background:#fff; border:1px solid rgba(7,59,42,.12); border-radius:24px; padding:30px 22px; text-align:center;
          position:relative; transition:transform .3s, box-shadow .3s, border-color .3s;
          display:flex; flex-direction:column; align-items:center;
        }
        .journey-card:hover { border-color:var(--accent); transform:translateY(-4px); box-shadow:0 16px 36px rgba(7,59,42,.08); }
        
        .step-badge {
          font-family:'Fraunces',serif; font-size:12px; font-weight:600; letter-spacing:.05em;
          color:var(--deep); background:var(--accent); padding:4px 12px; border-radius:999px; margin-bottom:16px;
        }
        .step-ic {
          width:52px; height:52px; border-radius:50%; border:1px solid var(--primary); color:var(--primary);
          display:grid; place-items:center; font-size:20px; margin-bottom:16px; transition:all .3s;
        }
        .journey-card:hover .step-ic { background:var(--primary); color:var(--accent); border-color:var(--primary); }
        
        .step-t { font-size:18px; font-weight:600; color:var(--primary); margin-bottom:10px; }
        .step-d { font-size:13.5px; line-height:1.6; color:var(--muted); margin:0; }

        /* States */
        .state { max-width:560px; margin:90px auto; text-align:center; padding:52px 32px; background:#fff; border-radius:28px; border:1px solid rgba(7,59,42,.1); }
        .state h3 { font-size:26px; color:var(--primary); margin:18px 0 10px; }
        .state p { color:var(--muted); line-height:1.65; margin:0 0 24px; font-size:15px; }
        .state .warn { font-size:38px; color:var(--accent); }
        .retry { display:inline-flex; align-items:center; gap:10px; border:none; cursor:pointer; background:var(--accent); color:var(--deep); font:600 14px 'Inter',sans-serif; padding:13px 24px; border-radius:999px; transition:transform .25s, box-shadow .25s; }
        .retry:hover { transform:translateY(-2px); box-shadow:0 10px 26px rgba(212,175,55,.35); }
        .loader { width:56px; height:56px; animation:spin 1.1s linear infinite; margin:0 auto; }
        @keyframes spin { to { transform:rotate(360deg); } }

        @media (max-width:1024px) {
          .pillars-grid { grid-template-columns:repeat(2,1fr); }
          .journey-roadmap { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:650px) {
          .pillars-grid, .journey-roadmap { grid-template-columns:1fr; }
          .fg-page section.sec { padding:70px 6%; }
        }
      `}</style>

      <PageHero
        title="Financial Goals. Clearly Planned."
        subtitle="Structure your financial milestones with clarity, discipline, and expert guidance."
        badge="GOAL-BASED PLANNING"
        breadcrumbs={[{ label: "Financial Goals" }]}
      />

      {loading ? (
        <div className="state" role="status">
          <svg className="loader" viewBox="0 0 56 56" aria-hidden="true">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(212,175,55,.2)" strokeWidth="5" />
            <path d="M28 6a22 22 0 0 1 22 22" fill="none" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <h3>Loading Financial Goals content...</h3>
        </div>
      ) : error ? (
        <div className="state" role="alert">
          <FaExclamationTriangle className="warn" />
          <h3>Unable to load resources</h3>
          <p>We couldn't reach the server to fetch financial goals data. Please check your connection or backend service status.</p>
          <button className="retry" onClick={fetchGoalsContent}><FaSync /> Try again</button>
        </div>
      ) : (
        <>
          {/* Major Goal Cards (Pillars of Financial Planning) */}
          <section className="sec dark-sec">
            <svg className="dgrid-bg" aria-hidden="true">
              <defs>
                <pattern id="fgGrid" width="56" height="56" patternUnits="userSpaceOnUse">
                  <path d="M56 0H0V56" fill="none" stroke="rgba(255,255,255,.05)" />
                </pattern>
                <radialGradient id="fgFade" cx="50%" cy="30%" r="70%">
                  <stop offset="0" stopColor="#fff" />
                  <stop offset="1" stopColor="#000" />
                </radialGradient>
                <mask id="fgMask">
                  <rect width="100%" height="100%" fill="url(#fgFade)" />
                </mask>
              </defs>
              <rect width="100%" height="100%" fill="url(#fgGrid)" mask="url(#fgMask)" />
            </svg>

            <div className="wrap">
              <div className="head" style={{ color: "#FDFBF5" }}>
                <h2 style={{ color: "#FDFBF5" }}>Pillars of Financial Planning</h2>
                <p style={{ color: "rgba(253,251,245,.7)" }}>
                  Whether you are accumulating wealth, planning retirement, or securing family assets, explore structured goal options.
                </p>
              </div>

              <div className="pillars-grid">
                {pillars.map((g, index) => (
                  <Spot key={g._id || index}>
                    <div>
                      <div className="p-icon">{renderIcon(g.icon)}</div>
                      <h3 className="p-title">{g.title}</h3>
                      <p className="p-desc">{g.desc}</p>
                      {g.details && g.details.length > 0 && (
                        <ul className="p-bullets">
                          {g.details.map((d, di) => (
                            <li key={di} className="p-bullet">{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div>
                      <Link to="/contact" className="pill-btn">
                        Plan Your Goal <FaArrowRight size={12} />
                      </Link>
                    </div>
                  </Spot>
                ))}
              </div>
            </div>
          </section>

          {/* Timeline Journey Section */}
          <section className="sec journey-sec">
            <div className="wrap">
              <div className="head">
                <h2>Financial Goal Journey</h2>
                <p>A systematic step-by-step process to transition from goal identification to structured execution and ongoing review.</p>
              </div>

              <div className="journey-roadmap">
                {journeySteps.map((step, idx) => (
                  <div key={step._id || idx} className="journey-card">
                    <span className="step-badge">STEP {step.step || (idx + 1).toString().padStart(2, "0")}</span>
                    <div className="step-ic">{renderIcon(step.icon)}</div>
                    <h4 className="step-t">{step.name}</h4>
                    <p className="step-d">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <CTASection
        title="Ready to Start Planning Your Financial Goals?"
        subtitle="Consult with our experts to map out your long-term milestones with a structured roadmap."
        primaryBtnText="Consult an Advisor"
        primaryBtnLink="/contact"
        secondaryBtnText="Explore All Services"
        secondaryBtnLink="/services"
      />
    </div>
  );
};

export default FinancialGoals;
