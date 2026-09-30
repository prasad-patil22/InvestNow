// import React, { useState, useEffect } from "react";
// import PageHero from "../components/PageHero";
// import CTASection from "../components/CTASection";
// import {
//   FaShieldAlt,
//   FaHandshake,
//   FaEye,
//   FaBullseye,
//   FaUserCheck,
//   FaLightbulb,
//   FaCheckCircle,
//   FaUserTie,
//   FaUsers,
//   FaBuilding,
//   FaBriefcase,
//   FaHome,
//   FaChartLine,
//   FaExclamationTriangle,
//   FaSync,
//   FaSpinner
// } from "react-icons/fa";

// const renderIcon = (iconName) => {
//   switch (iconName) {
//     case "FaShieldAlt":
//       return <FaShieldAlt />;
//     case "FaEye":
//       return <FaEye />;
//     case "FaHandshake":
//       return <FaHandshake />;
//     case "FaUserCheck":
//       return <FaUserCheck />;
//     case "FaUserTie":
//       return <FaUserTie />;
//     case "FaChartLine":
//       return <FaChartLine />;
//     case "FaBriefcase":
//       return <FaBriefcase />;
//     case "FaBullseye":
//       return <FaBullseye />;
//     case "FaUsers":
//       return <FaUsers />;
//     case "FaLightbulb":
//       return <FaLightbulb />;
//     case "FaBuilding":
//       return <FaBuilding />;
//     case "FaHome":
//       return <FaHome />;
//     case "FaCheckCircle":
//       return <FaCheckCircle />;
//     default:
//       return <FaShieldAlt />;
//   }
// };

// const AboutUs = () => {
//   const [aboutData, setAboutData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const fetchAboutContent = async () => {
//     setLoading(true);
//     setError(false);
//     try {
//       const res = await fetch(apiUrl("/api/about"));
//       if (!res.ok) {
//         throw new Error(`Server returned status ${res.status}`);
//       }
//       const result = await res.json();
//       if (result.success && result.data) {
//         setAboutData(result.data);
//       } else {
//         setError(true);
//       }
//     } catch (err) {
//       console.error("Failed to fetch About Us resources:", err);
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAboutContent();
//   }, []);

//   // Helper function to sort cards by priority (ascending)
//   const getSortedCards = (cardsArray) => {
//     if (!cardsArray || !Array.isArray(cardsArray)) return [];
//     return [...cardsArray].sort((a, b) => (a.priority || 0) - (b.priority || 0));
//   };

//   const coreValues = getSortedCards(aboutData?.coreValues);
//   const whyChooseUs = getSortedCards(aboutData?.whyChooseUs);
//   const whoWeServe = getSortedCards(aboutData?.whoWeServe);
//   const visionText = aboutData?.vision || "";
//   const missionList = aboutData?.mission || [];

//   return (
//     <div className="about-page">
//       <style>{`
//         .about-page {
//           background-color: #F5F8F6;
//           color: #17231E;
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//         }

//         .section-padding {
//           padding: 70px 5%;
//         }

//         .container {
//           max-width: 1200px;
//           margin: 0 auto;
//         }

//         .section-header {
//           text-align: center;
//           max-width: 750px;
//           margin: 0 auto 50px auto;
//         }

//         .section-label {
//           color: #D4AF37;
//           font-size: 13px;
//           font-weight: 700;
//           text-transform: uppercase;
//           letter-spacing: 1.5px;
//           margin-bottom: 8px;
//           display: block;
//         }

//         .section-title {
//           font-size: 34px;
//           font-weight: 800;
//           color: #073B2A;
//           line-height: 1.25;
//           margin-bottom: 14px;
//         }

//         .section-subtitle {
//           font-size: 16px;
//           color: #5B6B63;
//           line-height: 1.6;
//         }

//         /* Intro Grid */
//         .intro-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 50px;
//           align-items: center;
//         }

//         .intro-card {
//           background: #FFFFFF;
//           padding: 40px;
//           border-radius: 16px;
//           border: 1px solid #DCE8E1;
//           box-shadow: 0 8px 30px rgba(7, 59, 42, 0.05);
//         }

//         .intro-title {
//           font-size: 26px;
//           font-weight: 800;
//           color: #073B2A;
//           margin-bottom: 18px;
//         }

//         .intro-text {
//           font-size: 15px;
//           color: #5B6B63;
//           line-height: 1.7;
//           margin-bottom: 20px;
//         }

//         .solutions-tags {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 10px;
//           margin-top: 20px;
//         }

//         .tag-pill {
//           background: rgba(7, 59, 42, 0.06);
//           color: #073B2A;
//           border: 1px solid rgba(7, 59, 42, 0.15);
//           padding: 6px 14px;
//           border-radius: 20px;
//           font-size: 13px;
//           font-weight: 600;
//         }

//         /* Vision & Mission Split */
//         .vision-mission-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 30px;
//           margin-top: 50px;
//         }

//         .vision-card {
//           background: linear-gradient(135deg, #073B2A 0%, #0B6045 100%);
//           color: #FFFFFF;
//           padding: 45px;
//           border-radius: 16px;
//           position: relative;
//           border-left: 5px solid #D4AF37;
//         }

//         .vision-icon {
//           font-size: 36px;
//           color: #D4AF37;
//           margin-bottom: 20px;
//         }

//         .vision-title {
//           font-size: 24px;
//           font-weight: 800;
//           color: #FFFFFF;
//           margin-bottom: 14px;
//         }

//         .vision-text {
//           font-size: 17px;
//           color: #F5F8F6;
//           line-height: 1.7;
//           font-style: italic;
//         }

//         .mission-card {
//           background: #FFFFFF;
//           padding: 45px;
//           border-radius: 16px;
//           border: 1px solid #DCE8E1;
//           box-shadow: 0 8px 30px rgba(7, 59, 42, 0.05);
//         }

//         .mission-title {
//           font-size: 24px;
//           font-weight: 800;
//           color: #073B2A;
//           margin-bottom: 20px;
//         }

//         .mission-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//         }

//         .mission-item {
//           display: flex;
//           align-items: flex-start;
//           gap: 12px;
//           font-size: 15px;
//           color: #5B6B63;
//           line-height: 1.5;
//         }

//         .mission-icon {
//           color: #D4AF37;
//           font-size: 18px;
//           margin-top: 2px;
//           flex-shrink: 0;
//         }

//         /* Values Grid */
//         .cards-grid-3 {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 25px;
//         }

//         .feature-card {
//           background: #FFFFFF;
//           padding: 30px;
//           border-radius: 14px;
//           border: 1px solid #DCE8E1;
//           transition: all 0.3s ease;
//         }

//         .feature-card:hover {
//           transform: translateY(-4px);
//           box-shadow: 0 12px 30px rgba(7, 59, 42, 0.08);
//           border-color: #D4AF37;
//         }

//         .card-icon-box {
//           width: 50px;
//           height: 50px;
//           border-radius: 10px;
//           background: rgba(212, 175, 55, 0.12);
//           color: #D4AF37;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 22px;
//           margin-bottom: 20px;
//         }

//         .card-title {
//           font-size: 18px;
//           font-weight: 700;
//           color: #073B2A;
//           margin-bottom: 10px;
//         }

//         .card-desc {
//           font-size: 14px;
//           color: #5B6B63;
//           line-height: 1.6;
//         }

//         /* Error state styling */
//         .error-container {
//           padding: 80px 20px;
//           text-align: center;
//           background: #FFFFFF;
//           border-radius: 16px;
//           margin: 50px auto;
//           max-width: 600px;
//           border: 1px solid #DCE8E1;
//           box-shadow: 0 8px 30px rgba(7, 59, 42, 0.05);
//         }

//         @media (max-width: 992px) {
//           .intro-grid, .vision-mission-grid { grid-template-columns: 1fr; }
//           .cards-grid-3 { grid-template-columns: repeat(2, 1fr); }
//         }

//         @media (max-width: 600px) {
//           .cards-grid-3 { grid-template-columns: 1fr; }
//           .section-title { font-size: 26px; }
//           .vision-card, .mission-card, .intro-card { padding: 30px 20px; }
//         }
//       `}</style>

//       {/* Page Hero Header */}
//       <PageHero
//         title="Building Confidence Through Smarter Financial Decisions"
//         subtitle="Professional financial solutions designed around your goals, priorities and future."
//         badge="ABOUT INVESTNOW"
//         breadcrumbs={[{ label: "About Us" }]}
//       />

//       {/* Main Content Area */}
//       {loading ? (
//         <section className="section-padding text-center">
//           <div className="container py-5">
//             <FaSpinner className="spinner-border text-success fs-1 mb-3" style={{ color: "#0B6045" }} />
//             <h4 className="fw-bold" style={{ color: "#073B2A" }}>Loading About Us content...</h4>
//           </div>
//         </section>
//       ) : error ? (
//         <section className="section-padding">
//           <div className="container">
//             <div className="error-container">
//               <FaExclamationTriangle className="text-warning display-4 mb-3" style={{ color: "#D4AF37" }} />
//               <h3 className="fw-bold text-danger mb-2">Unable to load resources</h3>
//               <p className="text-muted mb-4 fs-6">
//                 We are currently unable to reach the server or fetch the requested resources. Please check your network connection or backend service status.
//               </p>
//               <button
//                 onClick={fetchAboutContent}
//                 className="btn px-4 py-2 fw-bold text-white shadow-sm"
//                 style={{ background: "#073B2A", borderRadius: "8px" }}
//               >
//                 <FaSync className="me-2" /> Try Again
//               </button>
//             </div>
//           </div>
//         </section>
//       ) : (
//         <>
//           {/* Company Introduction Section */}
//           <section className="section-padding" id="intro">
//             <div className="container">
//               <div className="intro-grid">
//                 <div className="intro-card">
//                   <span className="section-label">WHO WE ARE</span>
//                   <h2 className="intro-title">INVESTNOW Financial Services Pvt. Ltd.</h2>
//                   <p className="intro-text">
//                     INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED is a professional financial-services organization dedicated to helping individuals, families, and businesses plan, grow, and protect their financial well-being.
//                   </p>
//                   <p className="intro-text">
//                     We provide a comprehensive range of structured financial services designed to cater to diverse monetary requirements, from everyday loan requirements and insurance coverage to long-term wealth growth and land acquisition assistance.
//                   </p>

//                   <div className="solutions-tags">
//                     <span className="tag-pill">Loans</span>
//                     <span className="tag-pill">Insurance</span>
//                     <span className="tag-pill">Mutual Funds</span>
//                     <span className="tag-pill">Wealth Management</span>
//                     <span className="tag-pill">Stocks & Equity</span>
//                     <span className="tag-pill">Portfolio Management</span>
//                     <span className="tag-pill">Corporate Finance</span>
//                     <span className="tag-pill">Banking Services</span>
//                     <span className="tag-pill">Land Links</span>
//                     <span className="tag-pill">Financial Consultation</span>
//                   </div>
//                 </div>

//                 <div>
//                   <img
//                     src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop"
//                     alt="INVESTNOW Team Consultation"
//                     style={{
//                       width: "100%",
//                       height: "auto",
//                       borderRadius: "16px",
//                       boxShadow: "0 15px 35px rgba(7, 59, 42, 0.12)",
//                       border: "4px solid #FFFFFF",
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* Vision & Mission Grid */}
//               <div className="vision-mission-grid" id="vision">
//                 <div className="vision-card">
//                   <FaEye className="vision-icon" />
//                   <h3 className="vision-title">Our Vision</h3>
//                   <p className="vision-text">
//                     "{visionText}"
//                   </p>
//                 </div>

//                 <div className="mission-card">
//                   <h3 className="mission-title">Our Mission</h3>
//                   <ul className="mission-list">
//                     {missionList.map((mItem, idx) => (
//                       <li key={idx} className="mission-item">
//                         <FaCheckCircle className="mission-icon" />
//                         <span>{mItem}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Core Values Section */}
//           <section className="section-padding" style={{ background: "#FFFFFF" }}>
//             <div className="container">
//               <div className="section-header">
//                 <span className="section-label">OUR PRINCIPLES</span>
//                 <h2 className="section-title">Core Values That Guide Us</h2>
//                 <p className="section-subtitle">
//                   Every consultation, solution, and recommendation we offer is grounded in our fundamental corporate values.
//                 </p>
//               </div>

//               <div className="cards-grid-3">
//                 {coreValues.map((v, i) => (
//                   <div key={v._id || i} className="feature-card">
//                     <div className="card-icon-box">{renderIcon(v.icon)}</div>
//                     <h3 className="card-title">{v.title}</h3>
//                     <p className="card-desc">{v.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Why Choose Us Section */}
//           <section className="section-padding" id="why-us">
//             <div className="container">
//               <div className="section-header">
//                 <span className="section-label">THE INVESTNOW ADVANTAGE</span>
//                 <h2 className="section-title">Why Partner With Us</h2>
//                 <p className="section-subtitle">
//                   Discover how our structured, relationship-focused approach makes financial management clear and efficient.
//                 </p>
//               </div>

//               <div className="cards-grid-3">
//                 {whyChooseUs.map((w, i) => (
//                   <div key={w._id || i} className="feature-card">
//                     <div className="card-icon-box">{renderIcon(w.icon)}</div>
//                     <h3 className="card-title">{w.title}</h3>
//                     <p className="card-desc">{w.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* Who We Serve Section */}
//           <section className="section-padding" id="who-we-serve" style={{ background: "#FFFFFF" }}>
//             <div className="container">
//               <div className="section-header">
//                 <span className="section-label">OUR CLIENTELE</span>
//                 <h2 className="section-title">Who We Serve</h2>
//                 <p className="section-subtitle">
//                   We cater to a wide spectrum of clients seeking reliable financial management and property support.
//                 </p>
//               </div>

//               <div className="cards-grid-3">
//                 {whoWeServe.map((s, i) => (
//                   <div key={s._id || i} className="feature-card">
//                     <div className="card-icon-box">{renderIcon(s.icon)}</div>
//                     <h3 className="card-title">{s.title}</h3>
//                     <p className="card-desc">{s.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>
//         </>
//       )}

//       {/* Final CTA Banner */}
//       <CTASection
//         title="Let's Build Your Financial Roadmap"
//         subtitle="Schedule a consultation with our experienced financial consultants to evaluate your financial requirements."
//         primaryBtnText="Contact Us"
//         primaryBtnLink="/contact"
//         secondaryBtnText="Explore Services"
//         secondaryBtnLink="/services"
//       />
//     </div>
//   );
// };

// export default AboutUs;




import React, { useState, useEffect, useRef } from "react";
import { apiUrl } from "../api";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import {
  FaShieldAlt, FaHandshake, FaEye, FaBullseye, FaUserCheck, FaLightbulb,
  FaCheckCircle, FaUserTie, FaUsers, FaBuilding, FaBriefcase, FaHome,
  FaChartLine, FaExclamationTriangle, FaSync,
} from "react-icons/fa";

const icons = {
  FaShieldAlt: <FaShieldAlt />, FaEye: <FaEye />, FaHandshake: <FaHandshake />,
  FaUserCheck: <FaUserCheck />, FaUserTie: <FaUserTie />, FaChartLine: <FaChartLine />,
  FaBriefcase: <FaBriefcase />, FaBullseye: <FaBullseye />, FaUsers: <FaUsers />,
  FaLightbulb: <FaLightbulb />, FaBuilding: <FaBuilding />, FaHome: <FaHome />,
  FaCheckCircle: <FaCheckCircle />,
};
const renderIcon = (n) => icons[n] || <FaShieldAlt />;

const tags = ["Loans", "Insurance", "Mutual Funds", "Wealth Management", "Stocks & Equity", "Portfolio Management", "Corporate Finance", "Banking Services", "Land Links", "Financial Consultation"];

const Spot = ({ className = "", children }) => {
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return <div ref={ref} onMouseMove={move} className={`spot ${className}`}>{children}</div>;
};

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchAboutContent = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch(apiUrl("/api/about"));
      if (!res.ok) throw new Error(`Server returned status ${res.status}`);
      const result = await res.json();
      if (result.success && result.data) setAboutData(result.data);
      else setError(true);
    } catch (err) {
      console.error("Failed to fetch About Us resources:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAboutContent(); }, []);

  const getSortedCards = (arr) =>
    !arr || !Array.isArray(arr) ? [] : [...arr].sort((a, b) => (a.priority || 0) - (b.priority || 0));

  const coreValues = getSortedCards(aboutData?.coreValues);
  const whyChooseUs = getSortedCards(aboutData?.whyChooseUs);
  const whoWeServe = getSortedCards(aboutData?.whoWeServe);
  const visionText = aboutData?.vision || "";
  const missionList = aboutData?.mission || [];

  return (
    <div className="ab">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');

        .ab {
          --primary:#073B2A; --secondary:#0B6045; --accent:#D4AF37; --bg:#F5F8F6;
          --ivory:#FBF8F1; --text:#17231E; --muted:#5B6B63; --deep:#0A1310;
          background:var(--bg); color:var(--text); overflow-x:hidden;
          font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
        }
        .ab h2,.ab h3,.ab h4 { font-family:'Fraunces',Georgia,serif; margin:0; }
        .ab .wrap { max-width:1200px; margin:0 auto; }
        .ab section.sec { padding:104px 5%; position:relative; }
        .ab button:focus-visible { outline:2px solid var(--accent); outline-offset:3px; }

        .head { max-width:660px; margin-bottom:52px; }
        .head h2 { font-size:clamp(30px,4vw,44px); font-weight:600; line-height:1.15; letter-spacing:-.015em; margin-bottom:14px; color:var(--primary); }
        .head p { font-size:16.5px; line-height:1.7; margin:0; color:var(--muted); max-width:56ch; }
        .dark .head h2 { color:#FDFBF5; }
        .dark .head p { color:rgba(253,251,245,.8); }

        /* intro */
        .intro { display:grid; grid-template-columns:1.05fr .95fr; gap:64px; align-items:center; }
        .intro h2 { font-size:clamp(30px,3.6vw,42px); font-weight:600; line-height:1.15; color:var(--primary); margin-bottom:20px; letter-spacing:-.015em; }
        .intro p { font-size:16px; line-height:1.75; color:var(--muted); margin:0 0 16px; max-width:58ch; }
        .tags { display:flex; flex-wrap:wrap; gap:9px; margin-top:26px; }
        .tag { padding:8px 16px; border-radius:999px; font-size:13px; font-weight:500; color:var(--primary); background:#fff; border:1px solid rgba(7,59,42,.14); transition:all .25s; }
        .tag:hover { background:var(--primary); color:var(--accent); border-color:var(--primary); }
        .photo { position:relative; padding:0 22px 22px 0; }
        .photo::before { content:''; position:absolute; inset:22px 0 0 22px; border:2px solid var(--accent); border-radius:28px; }
        .photo img { position:relative; display:block; width:100%; aspect-ratio:4/4.4; object-fit:cover; border-radius:28px; box-shadow:0 24px 50px rgba(7,59,42,.18); }
        .photo-badge { position:absolute; left:-18px; bottom:60px; background:var(--primary); color:#FDFBF5; border-radius:18px; padding:14px 18px; display:flex; align-items:center; gap:12px; box-shadow:0 14px 30px rgba(7,59,42,.3); }
        .photo-badge svg { width:34px; height:34px; flex-shrink:0; }
        .photo-badge b { font-family:'Fraunces',serif; font-size:16px; font-weight:600; display:block; line-height:1.2; }
        .photo-badge small { font-size:12px; color:rgba(253,251,245,.65); }

        /* vision + mission */
        .vm { display:grid; grid-template-columns:1fr 1fr; gap:22px; margin-top:80px; }
        .vision { position:relative; overflow:hidden; border-radius:28px; padding:48px; color:#FDFBF5; background:linear-gradient(150deg,var(--primary),#0A1310); }
        .vision-art { position:absolute; right:-70px; top:-70px; width:300px; opacity:.9; animation:spin 60s linear infinite; }
        .vision h3 { font-size:28px; font-weight:600; margin-bottom:16px; position:relative; }
        .vision p { font-family:'Fraunces',serif; font-style:italic; font-size:20px; line-height:1.6; color:rgba(253,251,245,.9); margin:0; position:relative; max-width:34ch; }
        .vision-ic { width:52px; height:52px; border-radius:16px; display:grid; place-items:center; font-size:22px; color:#0A1310; background:var(--accent); margin-bottom:26px; position:relative; }
        .mission { border-radius:28px; padding:48px; background:#fff; border:1px solid rgba(7,59,42,.1); }
        .mission h3 { font-size:28px; font-weight:600; color:var(--primary); margin-bottom:24px; }
        .mission ul { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:0; }
        .mission li { display:flex; gap:14px; align-items:flex-start; padding:16px 0; border-top:1px solid rgba(7,59,42,.1); font-size:15px; line-height:1.6; color:var(--muted); }
        .mission li:first-child { border-top:none; padding-top:0; }
        .mission li svg { color:var(--accent); font-size:19px; margin-top:2px; flex-shrink:0; }

        /* values (dark bento) */
        .dark { background:#0A1310; color:#FDFBF5; isolation:isolate; }
        .dark::before { content:''; position:absolute; inset:0; z-index:-1; background:radial-gradient(600px 400px at 90% 0%,rgba(11,96,69,.45),transparent 70%),radial-gradient(500px 400px at 0% 100%,rgba(212,175,55,.15),transparent 70%); }
        .dgrid { position:absolute; inset:0; z-index:-1; width:100%; height:100%; opacity:.4; }
        .vgrid { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        .spot { --mx:50%; --my:50%; position:relative; overflow:hidden; border-radius:22px; padding:30px; background:linear-gradient(165deg, rgba(16, 42, 33, 0.8), rgba(8, 24, 18, 0.95)); border:1px solid rgba(212, 175, 55, 0.22); box-shadow:0 10px 30px rgba(0,0,0,0.35); transition:all .3s ease; }
        .spot::before { content:''; position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .3s; background:radial-gradient(320px circle at var(--mx) var(--my),rgba(212,175,55,.25),transparent 60%); }
        .spot:hover { border-color:#D4AF37; transform:translateY(-4px); box-shadow:0 16px 36px rgba(212,175,55,.2); }
        .spot:hover::before { opacity:1; }
        .spot > * { position:relative; }
        .spot:nth-child(4n+1) { grid-column:span 2; }
        .v-ic { width:48px; height:48px; border-radius:14px; display:grid; place-items:center; font-size:20px; color:var(--accent); background:rgba(212,175,55,.12); border:1px solid rgba(212,175,55,.3); margin-bottom:18px; }
        .spot h3 { font-size:21px; font-weight:600; margin-bottom:8px; color:#FDFBF5; }
        .spot p { margin:0; font-size:14.5px; line-height:1.65; color:rgba(253,251,245,.8); max-width:46ch; }

        /* why */
        .why { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        .wcard { background:#fff; border:1px solid rgba(7,59,42,.1); border-radius:22px; padding:30px; position:relative; overflow:hidden; transition:transform .3s, box-shadow .3s, border-color .3s; }
        .wcard:nth-child(3n+2) { transform:translateY(26px); }
        .wcard:hover { border-color:var(--accent); box-shadow:0 18px 40px rgba(7,59,42,.12); }
        .wcard::after { content:''; position:absolute; left:0; bottom:0; height:3px; width:0; background:var(--accent); transition:width .4s; }
        .wcard:hover::after { width:100%; }
        .w-ic { width:48px; height:48px; border-radius:50%; display:grid; place-items:center; font-size:19px; color:var(--deep); background:var(--accent); margin-bottom:18px; }
        .wcard h3 { font-size:19px; font-weight:600; color:var(--primary); margin-bottom:8px; }
        .wcard p { margin:0; font-size:14px; line-height:1.65; color:var(--muted); }

        /* serve */
        .serve { background:var(--ivory); }
        .slist { display:flex; flex-direction:column; border-top:1px solid rgba(7,59,42,.15); }
        .srow { display:grid; grid-template-columns:64px 1fr 1.3fr 40px; gap:26px; align-items:center; padding:26px 8px; border-bottom:1px solid rgba(7,59,42,.15); transition:all .3s; }
        .srow:hover { background:var(--primary); padding-left:24px; padding-right:24px; border-radius:18px; border-color:transparent; }
        .s-ic { width:56px; height:56px; border-radius:50%; display:grid; place-items:center; font-size:22px; color:var(--primary); border:1px solid var(--primary); transition:all .3s; }
        .srow h3 { font-size:23px; font-weight:600; color:var(--primary); transition:color .3s; }
        .srow p { margin:0; font-size:14.5px; line-height:1.6; color:var(--muted); transition:color .3s; }
        .s-arrow { width:22px; color:var(--accent); opacity:0; transform:translateX(-8px); transition:all .3s; }
        .srow:hover .s-ic { background:var(--accent); border-color:var(--accent); color:var(--deep); }
        .srow:hover h3 { color:#FDFBF5; }
        .srow:hover p { color:rgba(253,251,245,.72); }
        .srow:hover .s-arrow { opacity:1; transform:none; }

        /* states */
        .state { max-width:560px; margin:90px auto; text-align:center; padding:52px 32px; background:#fff; border-radius:28px; border:1px solid rgba(7,59,42,.1); }
        .state h3 { font-size:26px; color:var(--primary); margin:18px 0 10px; }
        .state p { color:var(--muted); line-height:1.65; margin:0 0 24px; font-size:15px; }
        .state .warn { font-size:38px; color:var(--accent); }
        .retry { display:inline-flex; align-items:center; gap:10px; border:none; cursor:pointer; background:var(--accent); color:var(--deep); font:600 14px 'Inter',sans-serif; padding:13px 24px; border-radius:999px; transition:transform .25s, box-shadow .25s; }
        .retry:hover { transform:translateY(-2px); box-shadow:0 10px 26px rgba(212,175,55,.35); }
        .loader { width:56px; height:56px; animation:spin 1.1s linear infinite; }
        @keyframes spin { to { transform:rotate(360deg); } }

        @media (max-width:992px) {
          .intro,.vm { grid-template-columns:1fr; }
          .vgrid,.why { grid-template-columns:repeat(2,1fr); }
          .spot:nth-child(4n+1) { grid-column:auto; }
          .wcard:nth-child(3n+2) { transform:none; }
          .srow { grid-template-columns:56px 1fr 30px; }
          .srow p { grid-column:2 / 4; grid-row:2; }
        }
        @media (max-width:600px) {
          .ab section.sec { padding:70px 6%; }
          .vgrid,.why { grid-template-columns:1fr; }
          .vision,.mission { padding:32px 24px; }
          .photo-badge { left:8px; }
        }
        @media (prefers-reduced-motion:reduce) {
          .ab *,.ab *::before,.ab *::after { animation:none !important; transition:none !important; }
        }
      `}</style>

      <PageHero
        title="Building Confidence Through Smarter Financial Decisions"
        subtitle="Professional financial solutions designed around your goals, priorities and future."
        badge="ABOUT INVESTNOW"
        breadcrumbs={[{ label: "About Us" }]}
      />

      {loading ? (
        <div className="state" role="status">
          <svg className="loader" viewBox="0 0 56 56" aria-hidden="true">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(212,175,55,.2)" strokeWidth="5" />
            <path d="M28 6a22 22 0 0 1 22 22" fill="none" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <h3>Loading About Us content...</h3>
        </div>
      ) : error ? (
        <div className="state" role="alert">
          <FaExclamationTriangle className="warn" />
          <h3>Unable to load resources</h3>
          <p>We couldn't reach the server to fetch this page. Check your network connection or backend service status, then try again.</p>
          <button className="retry" onClick={fetchAboutContent}><FaSync /> Try again</button>
        </div>
      ) : (
        <>
          {/* Intro + vision / mission */}
          <section className="sec" id="intro">
            <div className="wrap">
              <div className="intro">
                <div>
                  <h2>INVESTNOW Financial Services Pvt. Ltd.</h2>
                  <p>INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED is a professional financial-services organization dedicated to helping individuals, families, and businesses plan, grow, and protect their financial well-being.</p>
                  <p>We provide a comprehensive range of structured financial services designed to cater to diverse monetary requirements, from everyday loan requirements and insurance coverage to long-term wealth growth and land acquisition assistance.</p>
                  <div className="tags">{tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
                </div>
                <div className="photo">
                  <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop" alt="INVESTNOW team consultation" />
                  <div className="photo-badge">
                    <svg viewBox="0 0 34 34" aria-hidden="true">
                      <path d="M17 3l11 4.4v8.2c0 7-4.7 12.4-11 15.4C10.700 28 6 22.600 6 15.600V7.400z" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinejoin="round" />
                      <path d="M11.500 17l4 4 7-8" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div><b>Relationship-first</b><small>Advice built to last</small></div>
                  </div>
                </div>
              </div>

              <div className="vm" id="vision">
                <div className="vision">
                  <svg className="vision-art" viewBox="0 0 300 300" fill="none" aria-hidden="true">
                    <circle cx="150" cy="150" r="140" stroke="rgba(212,175,55,.35)" strokeDasharray="3 9" />
                    <circle cx="150" cy="150" r="100" stroke="rgba(212,175,55,.5)" strokeDasharray="70 24" />
                    <circle cx="150" cy="150" r="60" stroke="rgba(255,255,255,.18)" />
                    <circle cx="150" cy="10" r="6" fill="#D4AF37" />
                  </svg>
                  <div className="vision-ic"><FaEye /></div>
                  <h3>Our vision</h3>
                  <p>"{visionText}"</p>
                </div>
                <div className="mission">
                  <h3>Our mission</h3>
                  <ul>
                    {missionList.map((m, i) => (
                      <li key={i}><FaCheckCircle /><span>{m}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Core values */}
          <section className="sec dark">
            <svg className="dgrid" aria-hidden="true">
              <defs>
                <pattern id="abGrid" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M56 0H0V56" fill="none" stroke="rgba(255,255,255,.05)" /></pattern>
                <radialGradient id="abFade" cx="50%" cy="30%" r="70%"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#000" /></radialGradient>
                <mask id="abMask"><rect width="100%" height="100%" fill="url(#abFade)" /></mask>
              </defs>
              <rect width="100%" height="100%" fill="url(#abGrid)" mask="url(#abMask)" />
            </svg>
            <div className="wrap">
              <div className="head">
                <h2>Core values that guide us</h2>
                <p>Every consultation, solution, and recommendation we offer is grounded in these values.</p>
              </div>
              <div className="vgrid">
                {coreValues.map((v, i) => (
                  <Spot key={v._id || i}>
                    <div className="v-ic">{renderIcon(v.icon)}</div>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </Spot>
                ))}
              </div>
            </div>
          </section>

          {/* Why partner */}
          <section className="sec" id="why-us">
            <div className="wrap">
              <div className="head">
                <h2>Why partner with us</h2>
                <p>A structured, relationship-focused approach that keeps financial management clear and efficient.</p>
              </div>
              <div className="why" style={{ paddingBottom: 26 }}>
                {whyChooseUs.map((w, i) => (
                  <div key={w._id || i} className="wcard">
                    <div className="w-ic">{renderIcon(w.icon)}</div>
                    <h3>{w.title}</h3>
                    <p>{w.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Who we serve */}
          <section className="sec serve" id="who-we-serve">
            <div className="wrap">
              <div className="head">
                <h2>Who we serve</h2>
                <p>Clients who want reliable financial management and property support, from individuals to businesses.</p>
              </div>
              <div className="slist">
                {whoWeServe.map((s, i) => (
                  <div key={s._id || i} className="srow">
                    <div className="s-ic">{renderIcon(s.icon)}</div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <svg className="s-arrow" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                      <path d="M4 11h14M12 5l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <CTASection
        title="Let's Build Your Financial Roadmap"
        subtitle="Schedule a consultation with our experienced financial consultants to evaluate your financial requirements."
        primaryBtnText="Contact Us"
        primaryBtnLink="/contact"
        secondaryBtnText="Explore Services"
        secondaryBtnLink="/services"
      />
    </div>
  );
};

export default AboutUs;