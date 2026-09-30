import React, { useState, useEffect, useRef } from "react";
import { apiUrl } from "../api";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import { Link } from "react-router-dom";
import {
  FaMoneyCheckAlt,
  FaShieldAlt,
  FaChartPie,
  FaCoins,
  FaChartLine,
  FaBriefcase,
  FaBuilding,
  FaUniversity,
  FaMapMarkedAlt,
  FaUserTie,
  FaCheckCircle,
  FaArrowRight,
  FaExclamationTriangle,
  FaSync,
} from "react-icons/fa";

const API_URL = apiUrl("/api/services");

const renderServiceIcon = (iconInput) => {
  if (!iconInput) return <FaBriefcase />;
  if (typeof iconInput !== "string") return iconInput;

  const key = iconInput.toLowerCase().trim();
  if (key.includes("loan") || key.includes("money") || key.includes("famoneycheckalt")) return <FaMoneyCheckAlt />;
  if (key.includes("shield") || key.includes("insurance") || key.includes("fashieldalt")) return <FaShieldAlt />;
  if (key.includes("mutual") || key.includes("pie") || key.includes("fachartpie")) return <FaChartPie />;
  if (key.includes("wealth") || key.includes("coin") || key.includes("facoins")) return <FaCoins />;
  if (key.includes("stock") || key.includes("equity") || key.includes("fachartline")) return <FaChartLine />;
  if (key.includes("port") || key.includes("brief") || key.includes("fabriefcase")) return <FaBriefcase />;
  if (key.includes("corp") || key.includes("build") || key.includes("fabuilding")) return <FaBuilding />;
  if (key.includes("bank") || key.includes("univ") || key.includes("fauniversity")) return <FaUniversity />;
  if (key.includes("land") || key.includes("map") || key.includes("famapmarkedalt")) return <FaMapMarkedAlt />;
  if (key.includes("consult") || key.includes("user") || key.includes("fausertie")) return <FaUserTie />;

  if (iconInput.length <= 4) {
    return <span style={{ fontSize: "24px" }}>{iconInput}</span>;
  }

  return <FaBriefcase />;
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

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Server status ${res.status}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.services)) {
        setServices(data.services);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="sv-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');

        .sv-page {
          --primary:#073B2A; --secondary:#0B6045; --accent:#D4AF37; --bg:#F5F8F6;
          --ivory:#FBF8F1; --text:#17231E; --muted:#5B6B63; --deep:#0A1310;
          background:var(--bg); color:var(--text); overflow-x:hidden;
          font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
        }
        .sv-page h2,.sv-page h3,.sv-page h4 { font-family:'Fraunces',Georgia,serif; margin:0; }
        .sv-page .wrap { max-width:1200px; margin:0 auto; }
        .sv-page section.sec { padding:104px 5%; position:relative; }

        .head { max-width:660px; margin-bottom:56px; }
        .head h2 { font-size:clamp(30px,4vw,44px); font-weight:600; line-height:1.15; letter-spacing:-.015em; margin-bottom:14px; color:var(--primary); }
        .head p { font-size:16.5px; line-height:1.7; margin:0; color:var(--muted); max-width:56ch; }
        .dark .head h2 { color:#FDFBF5; }
        .dark .head p { color:rgba(253,251,245,.8); }

        /* Dark Bento Grid for Offerings */
        .dark-sec { background:#0A1310; color:#FDFBF5; isolation:isolate; }
        .dark-sec::before { content:''; position:absolute; inset:0; z-index:-1; background:radial-gradient(600px 400px at 90% 0%,rgba(11,96,69,.45),transparent 70%),radial-gradient(500px 400px at 0% 100%,rgba(212,175,55,.15),transparent 70%); }
        .dgrid-bg { position:absolute; inset:0; z-index:-1; width:100%; height:100%; opacity:.4; }

        .services-bento { display:grid; grid-template-columns:repeat(2,1fr); gap:22px; }
        .spot {
          --mx:50%; --my:50%; position:relative; overflow:hidden; border-radius:24px; padding:36px;
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

        .card-top { display:flex; align-items:center; gap:18px; margin-bottom:18px; }
        .s-icon {
          width:52px; height:52px; border-radius:16px; display:grid; place-items:center; font-size:22px;
          color:var(--accent); background:rgba(212,175,55,.12); border:1px solid rgba(212,175,55,.3); flex-shrink:0;
        }
        .s-title { font-size:24px; font-weight:600; color:#FDFBF5; margin:0; }
        .s-desc { font-size:15px; line-height:1.65; color:rgba(253,251,245,.8); margin:0 0 22px; max-width:52ch; }

        .feature-bullets { list-style:none; padding:0; margin:0 0 28px 0; display:flex; flex-direction:column; gap:12px; }
        .feature-item { display:flex; align-items:center; gap:12px; font-size:14.5px; color:rgba(253,251,245,.9); font-weight:500; }
        .bullet-icon { color:var(--accent); font-size:15px; flex-shrink:0; }

        .card-cta-btn {
          display:inline-flex; align-items:center; gap:8px; color:var(--accent); font-weight:600; font-size:14.5px;
          text-decoration:none; transition:gap .25s, color .25s;
        }
        .card-cta-btn:hover { gap:13px; color:#fff; }

        /* States */
        .state { max-width:560px; margin:90px auto; text-align:center; padding:52px 32px; background:#fff; border-radius:28px; border:1px solid rgba(7,59,42,.1); }
        .state h3 { font-size:26px; color:var(--primary); margin:18px 0 10px; }
        .state p { color:var(--muted); line-height:1.65; margin:0 0 24px; font-size:15px; }
        .state .warn { font-size:38px; color:var(--accent); }
        .retry { display:inline-flex; align-items:center; gap:10px; border:none; cursor:pointer; background:var(--accent); color:var(--deep); font:600 14px 'Inter',sans-serif; padding:13px 24px; border-radius:999px; transition:transform .25s, box-shadow .25s; }
        .retry:hover { transform:translateY(-2px); box-shadow:0 10px 26px rgba(212,175,55,.35); }
        .loader { width:56px; height:56px; animation:spin 1.1s linear infinite; margin:0 auto; }
        @keyframes spin { to { transform:rotate(360deg); } }

        @media (max-width:900px) {
          .services-bento { grid-template-columns:1fr; }
          .spot { padding:28px; }
        }
        @media (max-width:600px) {
          .sv-page section.sec { padding:70px 6%; }
        }
      `}</style>

      <PageHero
        title="Financial Solutions Built Around Your Goals"
        subtitle="From everyday financial requirements to long-term wealth planning, explore our range of services."
        badge="SERVICES OVERVIEW"
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="sec dark-sec">
        <svg className="dgrid-bg" aria-hidden="true">
          <defs>
            <pattern id="svGrid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M56 0H0V56" fill="none" stroke="rgba(255,255,255,.05)" />
            </pattern>
            <radialGradient id="svFade" cx="50%" cy="30%" r="70%">
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="svMask">
              <rect width="100%" height="100%" fill="url(#svFade)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#svGrid)" mask="url(#svMask)" />
        </svg>

        <div className="wrap dark">
          <div className="head">
            <h2>Comprehensive Financial Services</h2>
            <p>We offer structured assistance across multiple financial verticals to help you plan with clarity and security.</p>
          </div>

          {loading ? (
            <div className="state" role="status">
              <svg className="loader" viewBox="0 0 56 56" aria-hidden="true">
                <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(212,175,55,.2)" strokeWidth="5" />
                <path d="M28 6a22 22 0 0 1 22 22" fill="none" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" />
              </svg>
              <h3>Loading services...</h3>
            </div>
          ) : error ? (
            <div className="state" role="alert">
              <FaExclamationTriangle className="warn" />
              <h3>Unable to load resources</h3>
              <p>We couldn't reach the server to fetch our services list. Please check your network or try again.</p>
              <button className="retry" onClick={fetchServices}><FaSync /> Try again</button>
            </div>
          ) : services.length === 0 ? (
            <div className="state">
              <h3>No services available</h3>
              <p>No financial services found at the moment.</p>
            </div>
          ) : (
            <div className="services-bento">
              {services.map((s, index) => (
                <Spot key={s._id || index} id={s.id || `service-${s._id}`}>
                  <div>
                    <div className="card-top">
                      <div className="s-icon">{renderServiceIcon(s.icon)}</div>
                      <h3 className="s-title">{s.title}</h3>
                    </div>
                    <p className="s-desc">{s.description || s.shortDesc}</p>
                    {s.features && s.features.length > 0 && (
                      <ul className="feature-bullets">
                        {s.features.map((f, fi) => (
                          <li key={fi} className="feature-item">
                            <FaCheckCircle className="bullet-icon" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div>
                    {s.learnMoreLink && s.learnMoreLink.startsWith("http") ? (
                      <a href={s.learnMoreLink} target="_blank" rel="noopener noreferrer" className="card-cta-btn">
                        Learn More <FaArrowRight />
                      </a>
                    ) : s.learnMoreLink && s.learnMoreLink.startsWith("/") ? (
                      <Link to={s.learnMoreLink} className="card-cta-btn">
                        Learn More <FaArrowRight />
                      </Link>
                    ) : (
                      <Link to="/contact" className="card-cta-btn">
                        Learn More <FaArrowRight />
                      </Link>
                    )}
                  </div>
                </Spot>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Need Help Choosing the Right Financial Service?"
        subtitle="Our team is ready to answer your queries and guide you toward suitable solutions."
        primaryBtnText="Talk to Us"
        primaryBtnLink="/contact"
        secondaryBtnText="View Financial Goals"
        secondaryBtnLink="/financial-goals"
      />
    </div>
  );
};

export default Services;
