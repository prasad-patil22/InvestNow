import React, { useState, useEffect, useRef } from "react";
import { apiUrl } from "../api";
import CTASection from "../components/CTASection";
import {
  FaMapMarkedAlt,
  FaTree,
  FaBuilding,
  FaFileContract,
  FaCheckCircle,
  FaSearch,
  FaClipboardCheck,
  FaHandshake,
  FaPhoneAlt,
  FaArrowRight,
  FaLayerGroup,
  FaExclamationTriangle,
  FaSync,
  FaPaperPlane,
  FaShieldAlt,
  FaCompass
} from "react-icons/fa";

const renderIcon = (iconName) => {
  switch (iconName) {
    case "FaMapMarkedAlt":
      return <FaMapMarkedAlt />;
    case "FaTree":
      return <FaTree />;
    case "FaBuilding":
      return <FaBuilding />;
    case "FaFileContract":
      return <FaFileContract />;
    case "FaSearch":
      return <FaSearch />;
    case "FaLayerGroup":
      return <FaLayerGroup />;
    case "FaClipboardCheck":
      return <FaClipboardCheck />;
    case "FaHandshake":
      return <FaHandshake />;
    default:
      return <FaMapMarkedAlt />;
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

const ChalukyaDevelopers = () => {
  const [chalukyaData, setChalukyaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Enquiry Form State
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState({ type: "", text: "" });

  const fetchChalukyaContent = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(apiUrl("/api/chalukya"));
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      const result = await res.json();
      if (result.success && result.data) {
        setChalukyaData(result.data);
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Failed to fetch Chalukya resources:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChalukyaContent();
  }, []);

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    setFormFeedback({ type: "", text: "" });

    if (!form.fullName || !form.email || !form.phone || !form.message) {
      setFormFeedback({ type: "danger", text: "Please fill in all required fields." });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(apiUrl("/api/enquiries"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          service: "Chalukya Land Enquiry",
          message: form.message
        })
      });

      const result = await res.json();

      if (res.ok) {
        setFormFeedback({ type: "success", text: result.message || "Enquiry submitted successfully! Our team will get back to you soon." });
        setForm({ fullName: "", email: "", phone: "", message: "" });
      } else {
        setFormFeedback({ type: "danger", text: result.message || "Failed to submit enquiry." });
      }
    } catch (err) {
      console.error(err);
      setFormFeedback({ type: "danger", text: "Unable to connect to server. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  const getSortedItems = (array) => {
    if (!array || !Array.isArray(array)) return [];
    return [...array].sort((a, b) => (a.priority || 0) - (b.priority || 0));
  };

  const landSolutions = getSortedItems(chalukyaData?.landSolutions);
  const whyConsider = getSortedItems(chalukyaData?.whyConsider);
  const landJourney = getSortedItems(chalukyaData?.landJourney);

  return (
    <div className="cd-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');

        .cd-page {
          --primary:#073B2A; --secondary:#0B6045; --accent:#D4AF37; --bg:#F5F8F6;
          --ivory:#FBF8F1; --text:#17231E; --muted:#5B6B63;
          background:var(--bg); color:var(--text); overflow-x:hidden;
          font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
        }
        .cd-page h1,.cd-page h2,.cd-page h3,.cd-page h4,.cd-page h5 { font-family:'Fraunces',Georgia,serif; margin:0; }
        .cd-page .wrap { max-width:1200px; margin:0 auto; }
        .cd-page section.sec { padding:90px 5%; position:relative; }

        .head { max-width:660px; margin-bottom:48px; }
        .head h2 { font-size:clamp(30px,4vw,44px); font-weight:600; line-height:1.15; letter-spacing:-.015em; margin-bottom:14px; color:var(--primary); }
        .head p { font-size:16.5px; line-height:1.7; margin:0; color:var(--muted); max-width:56ch; }

        /* Bright Light Hero Section */
        .chalukya-hero {
          background:linear-gradient(135deg, #FBF8F1 0%, #F5F8F6 60%, #E8F0EC 100%);
          color:var(--text); padding:90px 5% 80px; position:relative; overflow:hidden; border-bottom:1px solid rgba(7,59,42,0.12);
        }
        .chalukya-hero-bg-svg {
          position:absolute; inset:0; width:100%; height:100%; pointer-events:none; opacity:0.6;
        }
        .chalukya-hero-container {
          max-width:1200px; margin:0 auto; display:grid; grid-template-columns:1.1fr 0.9fr; gap:50px; align-items:center; position:relative; z-index:1;
        }
        .chalukya-badge {
          display:inline-flex; align-items:center; gap:8px; background:rgba(212,175,55,0.12); border:1px solid rgba(212,175,55,0.4);
          color:var(--primary); font-family:'Fraunces',serif; font-style:italic; font-size:14px; font-weight:600;
          padding:6px 18px; border-radius:999px; margin-bottom:20px; letter-spacing:.02em;
        }
        .chalukya-hero-title {
          font-size:clamp(36px,5vw,54px); font-weight:600; color:var(--primary); margin-bottom:12px; line-height:1.12; letter-spacing:-.02em;
        }
        .chalukya-hero-subtitle { font-family:'Fraunces',serif; font-style:italic; font-size:22px; color:var(--secondary); font-weight:500; margin-bottom:20px; }
        .chalukya-hero-desc { font-size:16.5px; color:var(--muted); line-height:1.7; margin-bottom:34px; max-width:560px; }

        .chalukya-btn-group { display:flex; gap:16px; flex-wrap:wrap; }
        .btn-earth-primary {
          background:var(--primary); color:#FFFFFF; padding:14px 30px; border-radius:999px; font-size:15px; font-weight:600;
          text-decoration:none; display:inline-flex; align-items:center; gap:10px; transition:all .25s; border:1px solid var(--primary);
        }
        .btn-earth-primary:hover { background:var(--secondary); transform:translateY(-2px); box-shadow:0 10px 24px rgba(7,59,42,.2); }
        .btn-earth-outline {
          background:#FFFFFF; color:var(--primary); border:1px solid rgba(7,59,42,.3); padding:14px 28px; border-radius:999px;
          font-size:15px; font-weight:600; text-decoration:none; display:inline-flex; align-items:center; gap:10px; transition:all .25s;
        }
        .btn-earth-outline:hover { background:var(--ivory); border-color:var(--accent); color:var(--primary); transform:translateY(-2px); }

        .photo-frame { position:relative; padding:0 20px 20px 0; }
        .photo-frame::before { content:''; position:absolute; inset:20px 0 0 20px; border:2px solid var(--accent); border-radius:28px; }
        .photo-frame img { position:relative; width:100%; aspect-ratio:4/3.2; object-fit:cover; border-radius:28px; box-shadow:0 20px 40px rgba(7,59,42,.1); }

        /* Light Solutions Section */
        .solutions-sec { background:var(--ivory); position:relative; border-bottom:1px solid rgba(7,59,42,0.08); }
        .solutions-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; position:relative; z-index:1; }
        .spot {
          --mx:50%; --my:50%; position:relative; overflow:hidden; border-radius:24px; padding:36px;
          background:#FFFFFF; border:1px solid rgba(7,59,42,.12);
          box-shadow:0 8px 24px rgba(7,59,42,0.04);
          transition:all .3s ease;
        }
        .spot::before {
          content:''; position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .3s;
          background:radial-gradient(400px circle at var(--mx) var(--my),rgba(212,175,55,.15),transparent 60%);
        }
        .spot:hover { border-color:var(--accent); transform:translateY(-4px); box-shadow:0 16px 36px rgba(7,59,42,0.08); }
        .spot:hover::before { opacity:1; }
        .spot > * { position:relative; }

        .s-icon {
          width:52px; height:52px; border-radius:16px; display:grid; place-items:center; font-size:22px;
          color:var(--primary); background:rgba(7,59,42,.06); border:1px solid rgba(212,175,55,.4); margin-bottom:18px;
        }
        .spot:hover .s-icon { background:var(--primary); color:var(--accent); border-color:var(--primary); }
        .s-title { font-size:23px; font-weight:600; color:var(--primary); margin:0 0 10px; }
        .s-desc { font-size:14.5px; line-height:1.65; color:var(--muted); margin:0 0 20px; }
        .s-bullets { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:10px; }
        .s-bullet { display:flex; align-items:center; gap:10px; font-size:13.5px; color:var(--text); font-weight:500; }
        .bullet-check { color:var(--secondary); font-size:14px; flex-shrink:0; }

        /* Why Consider Cards */
        .why-sec { background:var(--bg); border-bottom:1px solid rgba(7,59,42,0.08); }
        .why-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
        .wcard {
          background:#FFFFFF; border:1px solid rgba(7,59,42,.12); border-radius:24px; padding:32px;
          transition:transform .3s, box-shadow .3s, border-color .3s; position:relative; overflow:hidden;
        }
        .wcard:hover { border-color:var(--accent); transform:translateY(-4px); box-shadow:0 16px 36px rgba(7,59,42,.08); }
        .wcard::after { content:''; position:absolute; left:0; bottom:0; height:3px; width:0; background:var(--accent); transition:width .4s; }
        .wcard:hover::after { width:100%; }
        .w-icon-badge {
          width:42px; height:42px; border-radius:12px; background:rgba(212,175,55,.12); color:var(--primary);
          display:grid; place-items:center; font-size:18px; margin-bottom:16px; border:1px solid rgba(212,175,55,.3);
        }
        .w-title { font-size:19px; font-weight:600; color:var(--primary); margin-bottom:10px; }
        .w-desc { font-size:14px; line-height:1.65; color:var(--muted); margin:0; }

        /* Land Journey Roadmap */
        .journey-sec { background:var(--ivory); position:relative; }
        .journey-connector-svg {
          position:absolute; top:54%; left:5%; right:5%; width:90%; height:40px; pointer-events:none; z-index:0;
        }
        .journey-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:18px; margin-top:40px; position:relative; z-index:1; }
        .jcard {
          background:#FFFFFF; border:1px solid rgba(7,59,42,.12); border-radius:24px; padding:28px 18px; text-align:center;
          display:flex; flex-direction:column; align-items:center; transition:all .3s; box-shadow:0 6px 18px rgba(7,59,42,.03);
        }
        .jcard:hover { border-color:var(--accent); transform:translateY(-4px); box-shadow:0 16px 36px rgba(7,59,42,.08); }
        .step-badge {
          font-family:'Fraunces',serif; font-size:12px; font-weight:600; color:var(--primary); background:rgba(212,175,55,.2);
          border:1px solid rgba(212,175,55,.4); padding:4px 12px; border-radius:999px; margin-bottom:14px;
        }
        .step-ic {
          width:48px; height:48px; border-radius:50%; border:1.5px solid var(--primary); color:var(--primary);
          background:var(--bg); display:grid; place-items:center; font-size:19px; margin-bottom:14px; transition:all .3s;
        }
        .jcard:hover .step-ic { background:var(--primary); color:var(--accent); border-color:var(--primary); }
        .step-title { font-size:16px; font-weight:600; color:var(--primary); margin-bottom:8px; }
        .step-desc { font-size:13px; line-height:1.5; color:var(--muted); margin:0; }

        /* Disclaimer Box */
        .disclaimer-box {
          background:#FFFFFF; border:1.5px solid var(--accent); padding:24px 30px; border-radius:20px;
          font-size:13.5px; color:var(--text); line-height:1.65; margin-top:54px; text-align:center; max-width:860px; margin-left:auto; margin-right:auto;
          box-shadow:0 8px 24px rgba(7,59,42,.04); display:flex; align-items:center; gap:16px; justify-content:center;
        }
        .disclaimer-icon { color:var(--accent); font-size:28px; flex-shrink:0; }

        /* Form styling */
        .form-sec { background:var(--bg); }
        .form-card {
          background:#FFFFFF; border:1px solid rgba(7,59,42,.14); border-radius:28px; padding:44px; box-shadow:0 18px 40px rgba(7,59,42,.06);
        }
        .form-label { font-size:14px; font-weight:600; color:var(--primary); margin-bottom:6px; display:block; }
        .form-input,.form-textarea {
          width:100%; box-sizing:border-box; background:var(--bg); border:1px solid rgba(7,59,42,.16);
          border-radius:12px; padding:12px 16px; font-size:14.5px; color:var(--text); font-family:inherit; transition:border-color .25s, box-shadow .25s;
        }
        .form-input:focus,.form-textarea:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px rgba(212,175,55,.2); }
        .form-input[disabled] { background:rgba(7,59,42,.05); color:var(--muted); cursor:not-allowed; }

        .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px; }
        .form-full { grid-column:span 2; }

        .alert-box { padding:14px 20px; border-radius:14px; font-size:14px; margin-bottom:24px; font-weight:500; }
        .alert-danger { background:rgba(217,83,79,.12); border:1px solid rgba(217,83,79,.3); color:#c9302c; }
        .alert-success { background:rgba(11,96,69,.12); border:1px solid rgba(11,96,69,.3); color:var(--primary); }

        .form-submit-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:10px;
          background:var(--primary); color:#FFFFFF; font-weight:600; font-size:15px; border:none; cursor:pointer;
          padding:14px 36px; border-radius:999px; transition:all .25s;
        }
        .form-submit-btn:hover { background:var(--secondary); transform:translateY(-2px); box-shadow:0 10px 24px rgba(7,59,42,.25); }

        /* States */
        .state { max-width:560px; margin:90px auto; text-align:center; padding:52px 32px; background:#fff; border-radius:28px; border:1px solid rgba(7,59,42,.1); }
        .state h3 { font-size:26px; color:var(--primary); margin:18px 0 10px; }
        .state p { color:var(--muted); line-height:1.65; margin:0 0 24px; font-size:15px; }
        .state .warn { font-size:38px; color:var(--accent); }
        .retry { display:inline-flex; align-items:center; gap:10px; border:none; cursor:pointer; background:var(--primary); color:#FFF; font:600 14px 'Inter',sans-serif; padding:13px 24px; border-radius:999px; transition:all .25s; }
        .retry:hover { background:var(--secondary); transform:translateY(-2px); }
        .loader { width:56px; height:56px; animation:spin 1.1s linear infinite; margin:0 auto; }
        @keyframes spin { to { transform:rotate(360deg); } }

        @media (max-width:1024px) {
          .chalukya-hero-container { grid-template-columns:1fr; text-align:center; }
          .chalukya-hero-desc { margin-left:auto; margin-right:auto; }
          .chalukya-btn-group { justify-content:center; }
          .solutions-grid { grid-template-columns:1fr; }
          .why-grid,.journey-grid { grid-template-columns:repeat(2,1fr); }
          .form-grid { grid-template-columns:1fr; }
          .form-full { grid-column:auto; }
          .journey-connector-svg { display:none; }
        }
        @media (max-width:600px) {
          .cd-page section.sec { padding:70px 6%; }
          .why-grid,.journey-grid { grid-template-columns:1fr; }
          .form-card { padding:28px 20px; }
          .disclaimer-box { flex-direction:column; text-align:center; }
        }
      `}</style>

      {/* Sub-brand Dedicated Hero Section - Bright Light Theme with SVG Blueprint Grid */}
      <div className="chalukya-hero">
        <svg className="chalukya-hero-bg-svg" aria-hidden="true">
          <defs>
            <pattern id="lightPlotGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(7,59,42,0.06)" strokeWidth="1" />
              <circle cx="60" cy="0" r="2" fill="rgba(212,175,55,0.4)" />
              <path d="M 15 15 L 45 15 L 45 45 L 15 45 Z" fill="none" stroke="rgba(7,59,42,0.03)" strokeWidth="1" strokeDasharray="3 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lightPlotGrid)" />
        </svg>

        <div className="chalukya-hero-container">
          <div>
            <span className="chalukya-badge">
              <FaCompass style={{ color: "#D4AF37" }} /> PROPERTY & LAND SERVICES
            </span>
            <h1 className="chalukya-hero-title">CHALUKYA DEVELOPERS</h1>
            <div className="chalukya-hero-subtitle">Your Land, Your Future. Our Support.</div>
            <p className="chalukya-hero-desc">
              Dedicated land support, plot identification, agricultural land assistance, and property documentation services within the INVESTNOW ecosystem.
            </p>
            <div className="chalukya-btn-group">
              <a href="#solutions" className="btn-earth-primary">
                Explore Land Opportunities <FaArrowRight size={12} />
              </a>
              <a href="#enquiry-form" className="btn-earth-outline">
                Enquire Now <FaPhoneAlt size={12} />
              </a>
            </div>
          </div>

          <div className="photo-frame">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop"
              alt="Land Plot Opportunities"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="state" role="status">
          <svg className="loader" viewBox="0 0 56 56" aria-hidden="true">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(212,175,55,.2)" strokeWidth="5" />
            <path d="M28 6a22 22 0 0 1 22 22" fill="none" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <h3>Loading Chalukya Developers content...</h3>
        </div>
      ) : error ? (
        <div className="state" role="alert">
          <FaExclamationTriangle className="warn" />
          <h3>Unable to load resources</h3>
          <p>We couldn't reach the server to fetch Chalukya Developers data. Please check your connection or try again.</p>
          <button className="retry" onClick={fetchChalukyaContent}><FaSync /> Try again</button>
        </div>
      ) : (
        <>
          {/* Light Solutions Grid */}
          <section className="sec solutions-sec" id="solutions">
            <div className="wrap">
              <div className="head">
                <h2>Land & Property Solutions</h2>
                <p>
                  Chalukya Developers functions as the dedicated land and property arm associated with INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED.
                </p>
              </div>

              <div className="solutions-grid">
                {landSolutions.map((s, idx) => (
                  <Spot key={s._id || idx}>
                    <div className="s-icon">{renderIcon(s.icon)}</div>
                    <h3 className="s-title">{s.title}</h3>
                    <p className="s-desc">{s.desc}</p>
                    {s.features && s.features.length > 0 && (
                      <ul className="s-bullets">
                        {s.features.map((f, fi) => (
                          <li key={fi} className="s-bullet">
                            <FaCheckCircle className="bullet-check" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Spot>
                ))}
              </div>
            </div>
          </section>

          {/* Why Consider Section */}
          <section className="sec why-sec">
            <div className="wrap">
              <div className="head">
                <h2>Why Consider Chalukya Developers</h2>
                <p>Transparent documentation, clear titles, and relationship-based property assistance.</p>
              </div>

              <div className="why-grid">
                {whyConsider.map((w, idx) => (
                  <div key={w._id || idx} className="wcard">
                    <div className="w-icon-badge">
                      <FaShieldAlt />
                    </div>
                    <h4 className="w-title">{w.title}</h4>
                    <p className="w-desc">{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Land Journey Section with Roadmap connector SVG */}
          <section className="sec journey-sec">
            <svg className="journey-connector-svg" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 50 20 Q 250 -10, 450 20 T 850 20 T 950 20" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            <div className="wrap">
              <div className="head">
                <h2>The Land Journey</h2>
                <p>A structured 5-step process ensuring clarity from requirement search to title documentation.</p>
              </div>

              <div className="journey-grid">
                {landJourney.map((j, idx) => (
                  <div key={j._id || idx} className="jcard">
                    <span className="step-badge">STEP {j.step || (idx + 1).toString().padStart(2, "0")}</span>
                    <div className="step-ic">{renderIcon(j.icon)}</div>
                    <h5 className="step-title">{j.title}</h5>
                    <p className="step-desc">{j.text}</p>
                  </div>
                ))}
              </div>

              <div className="disclaimer-box">
                <FaShieldAlt className="disclaimer-icon" />
                <div>
                  <strong>Important Legal Notice:</strong> Property availability, title deeds, land approvals, pricing, and legal encumbrance status should be independently verified by buyers prior to executing any financial transaction or land purchase.
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Land Enquiry / Service Request Form */}
          <section className="sec form-sec" id="enquiry-form">
            <div className="wrap" style={{ maxWidth: "840px" }}>
              <div className="head center" style={{ textAlign: "center", margin: "0 auto 40px" }}>
                <h2>Chalukya Land Service Request & Enquiry</h2>
                <p style={{ margin: "0 auto" }}>
                  Fill out the form below to enquire about available land parcels, plot verification, or property documentation assistance.
                </p>
              </div>

              {formFeedback.text && (
                <div className={`alert-box alert-${formFeedback.type}`} role="alert">
                  {formFeedback.text}
                </div>
              )}

              <form onSubmit={handleEnquirySubmit} className="form-card">
                <div className="form-grid">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Your full name"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="yourname@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Enquiry Subject</label>
                    <input
                      type="text"
                      className="form-input"
                      value="Chalukya Land Plot Enquiry"
                      disabled
                    />
                  </div>
                  <div className="form-full">
                    <label className="form-label">Enquiry / Message Details *</label>
                    <textarea
                      className="form-textarea"
                      rows="4"
                      placeholder="Specify your budget, preferred location, land type (residential, commercial, agricultural), or documentation requirements..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "24px" }}>
                  <button type="submit" disabled={submitting} className="form-submit-btn">
                    {submitting ? "Submitting..." : <><FaPaperPlane size={13} /> Submit Land Enquiry</>}
                  </button>
                </div>
              </form>
            </div>
          </section>
        </>
      )}

      {/* CTA Section */}
      <CTASection
        title="Looking for Land Opportunities?"
        subtitle="Contact Chalukya Developers for property enquiries and documentation guidance."
        primaryBtnText="Enquire Now"
        primaryBtnLink="/contact"
        secondaryBtnText="Contact Support"
        secondaryBtnLink="/customer-support"
      />
    </div>
  );
};

export default ChalukyaDevelopers;
