

// import React from "react";
// import HeroSection from "./HeroSection";
// import CTASection from "../components/CTASection";
// import { Link } from "react-router-dom";
// import {
//   FaMoneyCheckAlt,
//   FaShieldAlt,
//   FaChartPie,
//   FaCoins,
//   FaChartLine,
//   FaBriefcase,
//   FaMapMarkedAlt,
//   FaArrowRight,
//   FaUmbrella,
//   FaGraduationCap,
//   FaHome,
//   FaUserTie,
//   FaHandshake,
//   FaEye,
//   FaBullseye,
// } from "react-icons/fa";

// const Home = () => {
//   const servicePreviews = [
//     { title: "Loans & Financing", icon: <FaMoneyCheckAlt />, desc: "Personal, business, and home loan guidance tailored to eligibility.", path: "/services#loans" },
//     { title: "Insurance Solutions", icon: <FaShieldAlt />, desc: "Life, health, and motor risk coverage to safeguard your future.", path: "/services#insurance" },
//     { title: "Mutual Funds & SIPs", icon: <FaChartPie />, desc: "Disciplined wealth accumulation and systematic investment planning.", path: "/services#mutual-funds" },
//     { title: "Wealth Management", icon: <FaCoins />, desc: "Multi-asset allocation across equity, debt, and gold instruments.", path: "/services#wealth-management" },
//     { title: "Stocks & Equity", icon: <FaChartLine />, desc: "Neutral insights and market services for long-term equity planning.", path: "/services#stocks-equity" },
//     { title: "Portfolio Management", icon: <FaBriefcase />, desc: "Periodic portfolio reviews, risk alignment, and rebalancing.", path: "/services#portfolio-management" },
//     { title: "Land Links (Chalukya)", icon: <FaMapMarkedAlt />, desc: "Residential, agricultural land options and legal title verification.", path: "/chalukya-developers" },
//   ];

//   const goalPreviews = [
//     { title: "Wealth Creation", icon: <FaChartLine />, text: "Long-term compounding through structured multi-asset planning." },
//     { title: "Retirement", icon: <FaUmbrella />, text: "Post-employment financial independence and regular income focus." },
//     { title: "Education", icon: <FaGraduationCap />, text: "Preparing financially for higher education goals." },
//     { title: "Home & Property", icon: <FaHome />, text: "Down-payment savings and loan eligibility checks." },
//     { title: "Business Growth", icon: <FaBriefcase />, text: "Capital planning and commercial funding guidance." },
//     { title: "Family Protection", icon: <FaShieldAlt />, text: "Health coverage and emergency fund security." },
//   ];

//   const whyChooseUs = [
//     { title: "Experienced Guidance", desc: "Structured assistance from knowledgeable consultants dedicated to your success.", icon: <FaUserTie /> },
//     { title: "Transparent Approach", desc: "Open communication regarding products, terms, eligibility, and risk considerations.", icon: <FaEye /> },
//     { title: "Goal-Oriented Planning", desc: "Financial strategies tailored around specific milestones such as retirement or property.", icon: <FaBullseye /> },
//     { title: "Relationship-Focused", desc: "We prioritize long-term client relationships over transactional interactions.", icon: <FaHandshake /> },
//   ];

//   return (
//     <div className="investnow-home">
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');

//         .investnow-home {
//           --primary: #073B2A;
//           --secondary: #0B6045;
//           --accent: #D4AF37;
//           --bg: #F5F8F6;
//           --ivory: #FBF8F1;
//           --text: #17231E;
//           --muted: #5B6B63;
//           --hairline: rgba(7, 59, 42, 0.14);
//           --gold-wash: rgba(212, 175, 55, 0.12);

//           background-color: var(--bg);
//           color: var(--text);
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }

//         .investnow-home h2,
//         .investnow-home h3,
//         .investnow-home h4 {
//           font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
//         }

//         .section-padding { padding: 96px 5%; position: relative; }
//         .container { max-width: 1200px; margin: 0 auto; }

//         /* Letterhead-style section header: serif title, thin gold rule, italic kicker */
//         .section-header {
//           max-width: 640px;
//           margin: 0 auto 56px auto;
//           text-align: center;
//         }

//         .section-kicker {
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           font-family: 'Fraunces', serif;
//           font-style: italic;
//           font-weight: 500;
//           font-size: 15px;
//           color: var(--accent);
//           margin-bottom: 14px;
//         }

//         .section-kicker::before,
//         .section-kicker::after {
//           content: '';
//           width: 26px;
//           height: 1px;
//           background: var(--accent);
//           opacity: 0.6;
//         }

//         .section-title {
//           font-size: 36px;
//           font-weight: 600;
//           color: var(--primary);
//           line-height: 1.22;
//           margin-bottom: 16px;
//           letter-spacing: -0.01em;
//         }

//         .section-subtitle {
//           font-size: 16px;
//           color: var(--muted);
//           line-height: 1.65;
//         }

//         .gold-rule {
//           width: 64px;
//           height: 2px;
//           margin: 0 auto 60px auto;
//           background: linear-gradient(90deg, transparent, var(--accent), transparent);
//         }

//         /* Services grid — quiet panels, restrained gold edge, no card-kit sameness */
//         .preview-grid-4 {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 1px;
//           background: var(--hairline);
//           border: 1px solid var(--hairline);
//           margin-bottom: 40px;
//         }

//         .preview-card {
//           background: var(--ivory);
//           padding: 36px 26px;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           transition: background 0.35s ease, color 0.35s ease;
//           position: relative;
//         }

//         .preview-card:hover {
//           background: var(--primary);
//         }

//         .preview-icon {
//           width: 46px;
//           height: 46px;
//           border: 1px solid var(--accent);
//           color: var(--accent);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 19px;
//           margin-bottom: 20px;
//           transition: background 0.35s ease;
//         }

//         .preview-card:hover .preview-icon { background: rgba(212, 175, 55, 0.14); }

//         .preview-title {
//           font-size: 18px;
//           font-weight: 600;
//           color: var(--primary);
//           margin-bottom: 10px;
//           transition: color 0.35s ease;
//         }

//         .preview-card:hover .preview-title { color: #FDFBF5; }

//         .preview-desc {
//           font-size: 13.5px;
//           color: var(--muted);
//           line-height: 1.6;
//           margin-bottom: 22px;
//           transition: color 0.35s ease;
//         }

//         .preview-card:hover .preview-desc { color: rgba(253, 251, 245, 0.72); }

//         .preview-link {
//           color: var(--secondary);
//           font-weight: 600;
//           font-size: 13px;
//           text-decoration: none;
//           display: inline-flex;
//           align-items: center;
//           gap: 7px;
//           transition: color 0.25s ease, gap 0.25s ease;
//         }

//         .preview-card:hover .preview-link { color: var(--accent); }
//         .preview-link:hover { gap: 10px; }

//         .view-all-link {
//           text-align: center;
//           margin-top: 40px;
//         }

//         .view-all-link a {
//           font-family: 'Fraunces', serif;
//           font-style: italic;
//           font-size: 17px;
//           color: var(--primary);
//           text-decoration: none;
//           border-bottom: 1px solid var(--accent);
//           padding-bottom: 4px;
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//         }

//         /* Goals — ledger rows rather than boxed cards */
//         .goals-preview-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//         }

//         .goal-preview-card {
//           padding: 30px 24px;
//           display: flex;
//           align-items: flex-start;
//           gap: 18px;
//           border-top: 1px solid var(--hairline);
//           border-right: 1px solid var(--hairline);
//         }

//         .goal-preview-card:nth-child(3n) { border-right: none; }
//         .goal-preview-card:nth-child(-n+3) { border-top: 1px solid var(--hairline); }

//         .goal-icon-sm {
//           width: 42px;
//           height: 42px;
//           border-radius: 50%;
//           border: 1px solid var(--primary);
//           color: var(--primary);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 18px;
//           flex-shrink: 0;
//         }

//         .goal-pv-title {
//           font-family: 'Fraunces', serif;
//           font-size: 17px;
//           font-weight: 600;
//           color: var(--primary);
//           margin-bottom: 5px;
//         }

//         .goal-pv-text {
//           font-size: 13.5px;
//           color: var(--muted);
//           line-height: 1.6;
//         }

//         /* Why choose us — centered, quieter, gold divider beneath icon */
//         .why-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 40px;
//         }

//         .why-card {
//           text-align: center;
//         }

//         .why-icon {
//           width: 54px;
//           height: 54px;
//           border-radius: 50%;
//           background: var(--gold-wash);
//           color: var(--accent);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 21px;
//           margin: 0 auto 18px auto;
//         }

//         .why-title {
//           font-size: 17px;
//           font-weight: 600;
//           color: var(--primary);
//           margin-bottom: 10px;
//         }

//         .why-desc {
//           font-size: 13.5px;
//           color: var(--muted);
//           line-height: 1.65;
//         }

//         @media (max-width: 1024px) {
//           .preview-grid-4 { grid-template-columns: repeat(2, 1fr); }
//           .goals-preview-grid { grid-template-columns: repeat(2, 1fr); }
//           .goal-preview-card:nth-child(2n) { border-right: none; }
//           .goal-preview-card:nth-child(-n+2) { border-top: 1px solid var(--hairline); }
//           .why-grid { grid-template-columns: repeat(2, 1fr); }
//         }

//         @media (max-width: 600px) {
//           .section-padding { padding: 64px 6%; }
//           .preview-grid-4, .goals-preview-grid, .why-grid { grid-template-columns: 1fr; }
//           .goal-preview-card { border-right: none !important; }
//           .section-title { font-size: 28px; }
//         }
//       `}</style>

//       {/* Hero Section */}
//       <HeroSection />

//       {/* Services Preview Section */}
//       <section className="section-padding">
//         <div className="container">
//           <div className="section-header">
//             <span className="section-kicker">Services, at a glance</span>
//             <h2 className="section-title">Financial solutions built around your goals</h2>
//             <p className="section-subtitle">
//               From everyday loan requirements and insurance to long-term wealth growth and land acquisition support.
//             </p>
//           </div>

//           <div className="preview-grid-4">
//             {servicePreviews.map((s, idx) => (
//               <div key={idx} className="preview-card">
//                 <div>
//                   <div className="preview-icon">{s.icon}</div>
//                   <h3 className="preview-title">{s.title}</h3>
//                   <p className="preview-desc">{s.desc}</p>
//                 </div>
//                 <div>
//                   <Link to={s.path} className="preview-link">
//                     Explore Service <FaArrowRight style={{ fontSize: "11px" }} />
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="view-all-link">
//             <Link to="/services">
//               View all financial services <FaArrowRight style={{ fontSize: "13px" }} />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Financial Goals Preview Section */}
//       <section className="section-padding" style={{ background: "var(--ivory)" }}>
//         <div className="container">
//           <div className="section-header">
//             <span className="section-kicker">Goal-based planning</span>
//             <h2 className="section-title">Financial goals, clearly planned</h2>
//             <p className="section-subtitle">
//               Map out your personal and corporate milestones with structured wealth planning.
//             </p>
//           </div>

//           <div className="goals-preview-grid">
//             {goalPreviews.map((g, idx) => (
//               <div key={idx} className="goal-preview-card">
//                 <div className="goal-icon-sm">{g.icon}</div>
//                 <div>
//                   <h4 className="goal-pv-title">{g.title}</h4>
//                   <p className="goal-pv-text">{g.text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="view-all-link" style={{ marginTop: "48px" }}>
//             <Link to="/financial-goals">
//               Explore goal journey & roadmap <FaArrowRight style={{ fontSize: "13px" }} />
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Why Choose INVESTNOW Section */}
//       <section className="section-padding">
//         <div className="container">
//           <div className="section-header">
//             <span className="section-kicker">Our commitment</span>
//             <h2 className="section-title">Why clients choose INVESTNOW</h2>
//             <p className="section-subtitle">
//               We prioritize transparency, long-term relationships, and personalized financial consultation.
//             </p>
//           </div>

//           <div className="why-grid">
//             {whyChooseUs.map((w, idx) => (
//               <div key={idx} className="why-card">
//                 <div className="why-icon">{w.icon}</div>
//                 <h3 className="why-title">{w.title}</h3>
//                 <p className="why-desc">{w.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Bottom CTA Section */}
//       <CTASection
//         title="Plan today. Build tomorrow."
//         subtitle="Financial solutions designed around your goals, priorities, and future security."
//         primaryBtnText="Explore Our Services"
//         primaryBtnLink="/services"
//         secondaryBtnText="Talk to Us"
//         secondaryBtnLink="/contact"
//       />
//     </div>
//   );
// };

// export default Home;


import React, { useState, useRef } from "react";
import HeroSection from "./HeroSection";
import CTASection from "../components/CTASection";
import { Link } from "react-router-dom";
import {
  FaMoneyCheckAlt, FaShieldAlt, FaChartPie, FaCoins, FaChartLine, FaBriefcase,
  FaMapMarkedAlt, FaArrowRight, FaUmbrella, FaGraduationCap, FaHome,
  FaUserTie, FaHandshake, FaEye, FaBullseye,
} from "react-icons/fa";

const services = [
  { title: "Mutual funds & SIPs", icon: <FaChartPie />, desc: "Disciplined wealth accumulation through systematic investment planning, built to compound over the long run.", path: "/services#mutual-funds", feature: true },
  { title: "Loans & financing", icon: <FaMoneyCheckAlt />, desc: "Personal, business, and home loan guidance matched to your eligibility.", path: "/services#loans" },
  { title: "Insurance", icon: <FaShieldAlt />, desc: "Life, health, and motor cover to protect what you've built.", path: "/services#insurance" },
  { title: "Wealth management", icon: <FaCoins />, desc: "Multi-asset allocation across equity, debt, and gold.", path: "/services#wealth-management" },
  { title: "Stocks & equity", icon: <FaChartLine />, desc: "Neutral insights for long-term equity planning.", path: "/services#stocks-equity" },
  { title: "Portfolio management", icon: <FaBriefcase />, desc: "Regular reviews, risk alignment, and rebalancing so your portfolio stays on course.", path: "/services#portfolio-management", wide: true },
  { title: "Land links (Chalukya)", icon: <FaMapMarkedAlt />, desc: "Residential and agricultural land options, with legal title verification.", path: "/chalukya-developers", wide: true },
];

const goals = [
  { title: "Wealth creation", icon: <FaChartLine />, text: "Long-term compounding through structured multi-asset planning.", pct: 82 },
  { title: "Retirement", icon: <FaUmbrella />, text: "Post-employment financial independence with a focus on regular income.", pct: 68 },
  { title: "Education", icon: <FaGraduationCap />, text: "Prepare financially for higher education, years before the fees arrive.", pct: 54 },
  { title: "Home & property", icon: <FaHome />, text: "Down-payment savings and loan eligibility checks.", pct: 74 },
  { title: "Business growth", icon: <FaBriefcase />, text: "Capital planning and commercial funding guidance.", pct: 60 },
  { title: "Family protection", icon: <FaShieldAlt />, text: "Health coverage and an emergency fund that holds.", pct: 90 },
];

const why = [
  { title: "Experienced guidance", desc: "Knowledgeable consultants who work through your plan with you.", icon: <FaUserTie /> },
  { title: "Transparent approach", desc: "Clear talk on products, terms, eligibility, and risk.", icon: <FaEye /> },
  { title: "Goal-oriented planning", desc: "Strategies built around milestones like retirement or property.", icon: <FaBullseye /> },
  { title: "Relationship-focused", desc: "We value long-term clients over one-off transactions.", icon: <FaHandshake /> },
];

const ticker = ["Loans", "Insurance", "Mutual funds", "SIPs", "Wealth management", "Stocks", "Portfolio reviews", "Land links"];

const Spot = ({ className = "", children, ...rest }) => {
  const ref = useRef(null);
  const move = (e) => {
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

const GrowthChart = () => (
  <svg className="chart" viewBox="0 0 400 180" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="inGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#D4AF37" stopOpacity="0.45" />
        <stop offset="1" stopColor="#D4AF37" stopOpacity="0" />
      </linearGradient>
    </defs>
    {[45, 90, 135].map((y) => (
      <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,.07)" strokeDasharray="3 6" />
    ))}
    <path className="chart-area" d="M0 150 C50 140 70 120 110 122 S170 90 210 86 S290 60 320 44 S375 22 400 14 L400 180 L0 180Z" fill="url(#inGold)" />
    <path className="chart-line" pathLength="1" d="M0 150 C50 140 70 120 110 122 S170 90 210 86 S290 60 320 44 S375 22 400 14" fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
    <circle className="chart-dot" cx="400" cy="14" r="5" fill="#D4AF37" />
    <circle className="chart-pulse" cx="400" cy="14" r="5" fill="none" stroke="#D4AF37" />
  </svg>
);

const Ring = ({ pct }) => {
  const r = 54, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 140 140" className="ring" aria-hidden="true">
      <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(212,175,55,.18)" strokeWidth="8" />
      <circle
        key={pct} cx="70" cy="70" r={r} fill="none" stroke="#D4AF37" strokeWidth="8" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} transform="rotate(-90 70 70)"
        style={{ "--c": c, animation: "ringIn 1.1s cubic-bezier(.2,.7,.2,1) both" }}
      />
    </svg>
  );
};

const Home = () => {
  const [active, setActive] = useState(0);
  const g = goals[active];

  return (
    <div className="inv">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');

        .inv {
          --primary:#073B2A; --secondary:#0B6045; --accent:#D4AF37; --bg:#F5F8F6;
          --ivory:#FBF8F1; --text:#17231E; --muted:#5B6B63; --deep:#0A1310;
          background:var(--bg); color:var(--text);
          font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
          overflow-x:hidden;
        }
        .inv h2,.inv h3,.inv h4 { font-family:'Fraunces',Georgia,serif; margin:0; }
        .inv .wrap { max-width:1200px; margin:0 auto; }
        .inv section.sec { padding:110px 5%; position:relative; }
        .inv a:focus-visible,.inv button:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }

        .head { max-width:680px; margin-bottom:56px; }
        .head h2 { font-size:clamp(30px,4vw,46px); font-weight:600; line-height:1.15; letter-spacing:-.015em; margin-bottom:16px; }
        .head p { font-size:16.5px; line-height:1.7; margin:0; max-width:56ch; }
        .head.center { margin-left:auto; margin-right:auto; text-align:center; }
        .head.center p { margin-left:auto; margin-right:auto; }

        /* ticker */
        .ticker { background:var(--accent); color:var(--deep); overflow:hidden; white-space:nowrap; padding:15px 0; }
        .ticker-track { display:inline-flex; gap:34px; animation:slide 34s linear infinite; }
        .ticker span { display:inline-flex; align-items:center; gap:34px; font-family:'Fraunces',serif; font-size:19px; font-weight:500; font-style:italic; }
        .ticker svg { width:14px; height:14px; flex-shrink:0; }
        @keyframes slide { to { transform:translateX(-50%); } }

        /* services (dark) */
        .sv { background:#0A1310; color:#FDFBF5; isolation:isolate; }
        .sv::before {
          content:''; position:absolute; inset:0; z-index:-1;
          background:
            radial-gradient(600px 400px at 85% 0%, rgba(11,96,69,.45), transparent 70%),
            radial-gradient(500px 400px at 0% 100%, rgba(212,175,55,.15), transparent 70%);
        }
        .sv-grid-bg { position:absolute; inset:0; z-index:-1; opacity:.4; width:100%; height:100%; }
        .sv .head h2 { color:#FDFBF5; }
        .sv .head p { color:rgba(253,251,245,.8); }

        .bento { display:grid; grid-template-columns:repeat(4,1fr); grid-auto-rows:minmax(210px,auto); gap:18px; }
        .spot {
          --mx:50%; --my:50%;
          position:relative; overflow:hidden; border-radius:22px; padding:28px;
          background:linear-gradient(165deg, rgba(16, 42, 33, 0.8), rgba(8, 24, 18, 0.95));
          border:1px solid rgba(212, 175, 55, 0.22);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          display:flex; flex-direction:column; justify-content:space-between;
          transition:all .3s ease;
        }
        .spot::before {
          content:''; position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .3s;
          background:radial-gradient(320px circle at var(--mx) var(--my), rgba(212,175,55,.25), transparent 60%);
        }
        .spot:hover { border-color:#D4AF37; transform:translateY(-4px); box-shadow:0 16px 36px rgba(212, 175, 55, 0.2); }
        .spot:hover::before { opacity:1; }
        .spot > * { position:relative; }
        .b-feature { grid-column:span 2; grid-row:span 2; padding:34px; }
        .b-wide { grid-column:span 2; }
        .b-icon {
          width:48px; height:48px; border-radius:14px; display:grid; place-items:center; font-size:20px;
          color:var(--accent); background:rgba(212,175,55,.12); border:1px solid rgba(212,175,55,.3); margin-bottom:18px;
        }
        .b-title { font-size:21px; font-weight:600; margin-bottom:8px !important; color:#FDFBF5; }
        .b-feature .b-title { font-size:30px; }
        .b-desc { font-size:14.5px; line-height:1.6; color:rgba(253,251,245,.66); margin:0 0 18px; max-width:44ch; }
        .b-link { color:var(--accent); font-weight:600; font-size:14px; text-decoration:none; display:inline-flex; align-items:center; gap:8px; transition:gap .25s; }
        .b-link:hover { gap:13px; }
        .chart { width:100%; height:150px; margin:6px 0 20px; overflow:visible; }
        .chart-line { stroke-dasharray:1; stroke-dashoffset:1; animation:draw 2.4s .3s ease-out forwards; }
        .chart-area { opacity:0; animation:fade 1.2s 1.4s forwards; }
        .chart-dot { opacity:0; animation:fade .4s 2.5s forwards; }
        .chart-pulse { transform-origin:400px 14px; opacity:0; animation:pulse 2.2s 2.6s infinite; }
        @keyframes draw { to { stroke-dashoffset:0; } }
        @keyframes fade { to { opacity:1; } }
        @keyframes pulse { 0% { transform:scale(1); opacity:.9; } 100% { transform:scale(4); opacity:0; } }

        /* goals */
        .gl { background:var(--ivory); }
        .gl-shell { display:grid; grid-template-columns:1fr 1.05fr; gap:28px; align-items:stretch; }
        .gl-list { display:flex; flex-direction:column; gap:8px; }
        .gl-item {
          display:flex; align-items:center; gap:16px; text-align:left; width:100%; cursor:pointer;
          padding:16px 18px; border-radius:16px; border:1px solid rgba(7,59,42,.15); background:#ffffff;
          font:inherit; color:#073B2A; transition:all .25s; box-shadow: 0 2px 8px rgba(7,59,42,.04);
        }
        .gl-item:hover { border-color:var(--accent); background:#FAFBF9; }
        .gl-item .gi { width:40px; height:40px; border-radius:12px; display:grid; place-items:center; background:rgba(7,59,42,.08); color:#073B2A; font-size:17px; flex-shrink:0; transition:all .25s; }
        .gl-item strong { font-family:'Fraunces',Georgia,serif; font-size:18px; font-weight:700; flex:1; color:#073B2A !important; display:block; }
        .gl-item svg { color:#073B2A; flex-shrink:0; }
        .gl-item.on { background:#073B2A; color:#FFFFFF; border-color:#073B2A; transform:translateX(8px); box-shadow: 0 8px 24px rgba(7,59,42,.2); }
        .gl-item.on strong { color:#FFFFFF !important; }
        .gl-item.on svg { color:#D4AF37; }
        .gl-item.on .gi { background:#D4AF37; color:#073B2A; }
        .gl-panel {
          position:relative; overflow:hidden; border-radius:28px; padding:44px; color:#FDFBF5;
          background:radial-gradient(500px 300px at 90% 0%, rgba(212,175,55,.22), transparent 70%), linear-gradient(150deg,var(--primary),var(--deep));
          display:flex; flex-direction:column; justify-content:center; min-height:380px;
        }
        .ring { width:150px; height:150px; margin-bottom:22px; }
        .ring-wrap { position:relative; width:150px; }
        .ring-wrap b { position:absolute; inset:0; display:grid; place-items:center; font-family:'Fraunces',serif; font-size:32px; color:var(--accent); font-weight:600; }
        @keyframes ringIn { from { stroke-dashoffset:var(--c); } }
        .gl-panel h3 { font-size:32px; margin-bottom:10px; font-weight:600; }
        .gl-panel p { color:rgba(253,251,245,.75); font-size:16px; line-height:1.65; margin:0 0 24px; max-width:40ch; }
        .gl-panel .note { font-size:12.5px; color:rgba(253,251,245,.5); margin:-8px 0 22px; }
        .pill-link {
          align-self:flex-start; display:inline-flex; align-items:center; gap:10px; text-decoration:none;
          background:var(--accent); color:var(--deep); font-weight:600; font-size:14px; padding:12px 22px; border-radius:999px; transition:transform .25s, box-shadow .25s;
        }
        .pill-link:hover { transform:translateY(-2px); box-shadow:0 10px 26px rgba(212,175,55,.35); }

        /* why */
        .wy { background:var(--bg); }
        .wy-shell { display:grid; grid-template-columns:.9fr 1.1fr; gap:60px; align-items:center; }
        .wy .head { margin-bottom:0; }
        .wy .head h2 { color:var(--primary); }
        .wy .head p { color:var(--muted); }
        .orbit { position:relative; width:min(100%,320px); aspect-ratio:1; margin-top:44px; }
        .orbit svg { width:100%; height:100%; }
        .orbit .spin { transform-origin:160px 160px; animation:spin 40s linear infinite; }
        .orbit .spin2 { transform-origin:160px 160px; animation:spin 60s linear infinite reverse; }
        @keyframes spin { to { transform:rotate(360deg); } }
        .wy-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        .wy-card {
          background:#fff; border:1px solid rgba(7,59,42,.1); border-radius:22px; padding:28px; position:relative; overflow:hidden;
          transition:transform .3s, box-shadow .3s, border-color .3s;
        }
        .wy-card:nth-child(even) { transform:translateY(28px); }
        .wy-card:hover { border-color:var(--accent); box-shadow:0 18px 40px rgba(7,59,42,.12); }
        .wy-card::after { content:''; position:absolute; left:0; bottom:0; height:3px; width:0; background:var(--accent); transition:width .4s; }
        .wy-card:hover::after { width:100%; }
        .wy-ic { width:48px; height:48px; border-radius:50%; display:grid; place-items:center; font-size:19px; color:var(--deep); background:var(--accent); margin-bottom:18px; }
        .wy-card h3 { font-size:19px; color:var(--primary); margin-bottom:8px; font-weight:600; }
        .wy-card p { margin:0; font-size:14px; line-height:1.65; color:var(--muted); }

        @media (max-width:1024px) {
          .bento { grid-template-columns:repeat(2,1fr); }
          .b-feature,.b-wide { grid-column:span 2; }
          .b-feature { grid-row:auto; }
          .gl-shell,.wy-shell { grid-template-columns:1fr; }
          .orbit { display:none; }
        }
        @media (max-width:600px) {
          .inv section.sec { padding:72px 6%; }
          .bento,.wy-grid { grid-template-columns:1fr; }
          .b-feature,.b-wide { grid-column:auto; }
          .wy-card:nth-child(even) { transform:none; }
          .gl-panel { padding:30px; }
          .gl-item.on { transform:none; }
        }
        @media (prefers-reduced-motion:reduce) {
          .inv *,.inv *::before,.inv *::after { animation:none !important; transition:none !important; }
          .chart-line { stroke-dashoffset:0; } .chart-area,.chart-dot { opacity:1; }
        }
      `}</style>

      <HeroSection />

      {/* Ticker */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={i}>
              {t}
              <svg viewBox="0 0 20 20"><path d="M10 0l2.4 7.6L20 10l-7.6 2.4L10 20l-2.4-7.6L0 10l7.6-2.4z" fill="currentColor" /></svg>
            </span>
          ))}
        </div>
      </div>

      {/* Services bento */}
      <section className="sec sv">
        <svg className="sv-grid-bg" aria-hidden="true">
          <defs>
            <pattern id="inGrid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M56 0H0V56" fill="none" stroke="rgba(255,255,255,.05)" />
            </pattern>
            <radialGradient id="inFade" cx="50%" cy="30%" r="70%">
              <stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="inMask"><rect width="100%" height="100%" fill="url(#inFade)" /></mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#inGrid)" mask="url(#inMask)" />
        </svg>
        <div className="wrap">
          <div className="head">
            <h2>Financial solutions built around your goals</h2>
            <p>From everyday loans and insurance to long-term wealth growth and land acquisition support, all in one place.</p>
          </div>

          <div className="bento">
            {services.map((s) => (
              <Spot key={s.title} className={s.feature ? "b-feature" : s.wide ? "b-wide" : ""}>
                <div>
                  <div className="b-icon">{s.icon}</div>
                  <h3 className="b-title">{s.title}</h3>
                  <p className="b-desc">{s.desc}</p>
                </div>
                <div>
                  {s.feature && <GrowthChart />}
                  <Link to={s.path} className="b-link">Explore service <FaArrowRight size={12} /></Link>
                </div>
              </Spot>
            ))}
          </div>
          <div style={{ marginTop: 40, textAlign: "center" }}>
            <Link to="/services" className="pill-link" style={{ display: "inline-flex" }}>
              See all financial services <FaArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="sec gl">
        <div className="wrap">
          <div className="head">
            <h2 style={{ color: "var(--primary)" }}>Pick a goal. We'll plan the route.</h2>
            <p style={{ color: "var(--muted)" }}>Choose what matters most to you and see how we approach it.</p>
          </div>
          <div className="gl-shell">
            <div className="gl-list" role="tablist">
              {goals.map((x, i) => (
                <button
                  key={x.title} role="tab" aria-selected={i === active}
                  className={`gl-item ${i === active ? "on" : ""}`}
                  onClick={() => setActive(i)} onMouseEnter={() => setActive(i)}
                >
                  <span className="gi">{x.icon}</span>
                  <strong>{x.title}</strong>
                  <FaArrowRight size={12} />
                </button>
              ))}
            </div>
            <div className="gl-panel" role="tabpanel">
              <div className="ring-wrap">
                <Ring pct={g.pct} />
                <b>{g.icon}</b>
              </div>
              <h3>{g.title}</h3>
              <p>{g.text}</p>
              <Link to="/financial-goals" className="pill-link">
                Explore goal journey <FaArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="sec wy">
        <div className="wrap wy-shell">
          <div>
            <div className="head">
              <h2>Why clients choose INVESTNOW</h2>
              <p>We put transparency, long-term relationships, and personal consultation first.</p>
            </div>
            <div className="orbit" aria-hidden="true">
              <svg viewBox="0 0 320 320">
                <circle cx="160" cy="160" r="150" fill="none" stroke="rgba(7,59,42,.15)" strokeDasharray="2 8" className="spin" />
                <circle cx="160" cy="160" r="105" fill="none" stroke="rgba(212,175,55,.6)" className="spin2" strokeDasharray="60 20" />
                <circle cx="160" cy="160" r="62" fill="#073B2A" />
                <path d="M160 128l26 10v18c0 16-11 28-26 34-15-6-26-18-26-34v-18z" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinejoin="round" />
                <path d="M148 160l9 9 16-18" fill="none" stroke="#D4AF37" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <g className="spin">
                  <circle cx="160" cy="10" r="7" fill="#D4AF37" />
                  <circle cx="310" cy="160" r="5" fill="#0B6045" />
                  <circle cx="55" cy="266" r="6" fill="#D4AF37" />
                </g>
              </svg>
            </div>
          </div>
          <div className="wy-grid">
            {why.map((w) => (
              <div key={w.title} className="wy-card">
                <div className="wy-ic">{w.icon}</div>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Plan today. Build tomorrow."
        subtitle="Financial solutions designed around your goals, priorities, and future security."
        primaryBtnText="Explore Our Services"
        primaryBtnLink="/services"
        secondaryBtnText="Talk to Us"
        secondaryBtnLink="/contact"
      />
    </div>
  );
};

export default Home;