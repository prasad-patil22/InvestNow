import React, { useState, useEffect } from "react";
import { apiUrl } from "../api";
import { Link } from "react-router-dom";
import {
  FaInfoCircle,
  FaConciergeBell,
  FaBullseye,
  FaBuilding,
  FaEnvelopeOpenText,
  FaArrowRight,
  FaSync,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaLayerGroup
} from "react-icons/fa";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    aboutItems: 0,
    servicesCount: 0,
    goalPillars: 0,
    goalSteps: 0,
    chalukyaSolutions: 0,
    chalukyaSteps: 0,
    totalEnquiries: 0,
    pendingEnquiries: 0,
    repliedEnquiries: 0
  });

  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(false);
    try {
      const token = localStorage.getItem("adminToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      // Fetch all endpoint data concurrently
      const [aboutRes, servicesRes, goalsRes, chalukyaRes, enquiriesRes] = await Promise.all([
        fetch(apiUrl("/api/about")).catch(() => null),
        fetch(apiUrl("/api/services")).catch(() => null),
        fetch(apiUrl("/api/financial-goals")).catch(() => null),
        fetch(apiUrl("/api/chalukya")).catch(() => null),
        fetch(apiUrl("/api/enquiries"), { headers }).catch(() => null)
      ]);

      let aboutCount = 0;
      if (aboutRes && aboutRes.ok) {
        const data = await aboutRes.json();
        if (data.data) {
          aboutCount = (data.data.coreValues?.length || 0) + (data.data.whyChooseUs?.length || 0) + (data.data.leadership?.length || 0);
        }
      }

      let serviceCount = 0;
      if (servicesRes && servicesRes.ok) {
        const data = await servicesRes.json();
        serviceCount = Array.isArray(data.data) ? data.data.length : 0;
      }

      let goalPillarsCount = 0;
      let goalStepsCount = 0;
      if (goalsRes && goalsRes.ok) {
        const data = await goalsRes.json();
        if (data.data) {
          goalPillarsCount = data.data.pillars?.length || 0;
          goalStepsCount = data.data.journeySteps?.length || 0;
        }
      }

      let chalukyaSolCount = 0;
      let chalukyaStepCount = 0;
      if (chalukyaRes && chalukyaRes.ok) {
        const data = await chalukyaRes.json();
        if (data.data) {
          chalukyaSolCount = data.data.landSolutions?.length || 0;
          chalukyaStepCount = data.data.landJourney?.length || 0;
        }
      }

      let totalEnq = 0;
      let pendingEnq = 0;
      let repliedEnq = 0;
      let recentList = [];

      if (enquiriesRes && enquiriesRes.ok) {
        const data = await enquiriesRes.json();
        const list = data.data || [];
        totalEnq = list.length;
        pendingEnq = list.filter((e) => e.status === "Pending" || !e.status).length;
        repliedEnq = list.filter((e) => e.status === "Replied").length;
        recentList = list.slice(0, 5);
      }

      setStats({
        aboutItems: aboutCount,
        servicesCount: serviceCount,
        goalPillars: goalPillarsCount,
        goalSteps: goalStepsCount,
        chalukyaSolutions: chalukyaSolCount,
        chalukyaSteps: chalukyaStepCount,
        totalEnquiries: totalEnq,
        pendingEnquiries: pendingEnq,
        repliedEnquiries: repliedEnq
      });

      setRecentEnquiries(recentList);
    } catch (err) {
      console.error("Failed to load dashboard statistics:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const adminPages = [
    {
      title: "Manage About Us",
      path: "/admin/about",
      icon: <FaInfoCircle />,
      countText: `${stats.aboutItems} Total Sections & Core Values`,
      desc: "Edit company history, mission statement, leadership team, and core values.",
      color: "#073B2A"
    },
    {
      title: "Manage Services",
      path: "/admin/services",
      icon: <FaConciergeBell />,
      countText: `${stats.servicesCount} Active Wealth Services`,
      desc: "Add, update, or reorganize financial services, features, and investment offerings.",
      color: "#0B6045"
    },
    {
      title: "Manage Financial Goals",
      path: "/admin/financial-goals",
      icon: <FaBullseye />,
      countText: `${stats.goalPillars} Pillars | ${stats.goalSteps} Roadmap Steps`,
      desc: "Customize financial planning pillars and the interactive goal roadmap for users.",
      color: "#D4AF37"
    },
    {
      title: "Manage Chalukya Developers",
      path: "/admin/chalukya",
      icon: <FaBuilding />,
      countText: `${stats.chalukyaSolutions} Land Solutions | ${stats.chalukyaSteps} Journey Steps`,
      desc: "Control land plot offerings, property advantages, and the step-by-step land roadmap.",
      color: "#073B2A"
    },
    {
      title: "Service Requests & Enquiries",
      path: "/admin/enquiries",
      icon: <FaEnvelopeOpenText />,
      countText: `${stats.totalEnquiries} Messages (${stats.pendingEnquiries} Pending)`,
      desc: "Review guest messages, respond via Nodemailer email, and track inquiry status.",
      color: "#0B6045"
    }
  ];

  return (
    <div className="admin-dash-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');

        .admin-dash-page {
          --primary: #073B2A;
          --secondary: #0B6045;
          --accent: #D4AF37;
          --bg: #F5F8F6;
          --ivory: #FBF8F1;
          --text: #17231E;
          --muted: #5B6B63;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--text);
        }

        .dash-header {
          background: linear-gradient(135deg, #073B2A 0%, #0B6045 100%);
          color: #FFFFFF;
          padding: 32px 36px;
          border-radius: 20px;
          margin-bottom: 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 30px rgba(7,59,42,0.15);
        }

        .dash-header h1 {
          font-family: 'Fraunces', serif;
          font-size: 32px;
          font-weight: 600;
          margin: 0 0 8px 0;
          color: #FDFBF5;
        }

        .dash-header p {
          margin: 0;
          font-size: 15px;
          color: rgba(253,251,245,0.85);
        }

        .refresh-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent);
          color: #073B2A;
          border: none;
          padding: 10px 20px;
          border-radius: 999px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .refresh-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(212,175,55,0.35);
        }

        /* Stats Strip */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 36px;
        }

        .stat-card {
          background: #FFFFFF;
          border: 1px solid rgba(7,59,42,0.12);
          border-radius: 18px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          box-shadow: 0 4px 16px rgba(7,59,42,0.04);
          transition: transform 0.25s, box-shadow 0.25s;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 26px rgba(7,59,42,0.08);
          border-color: var(--accent);
        }

        .stat-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: rgba(212,175,55,0.12);
          color: var(--primary);
          display: grid;
          place-items: center;
          font-size: 22px;
          border: 1px solid rgba(212,175,55,0.3);
          flex-shrink: 0;
        }

        .stat-val {
          font-family: 'Fraunces', serif;
          font-size: 28px;
          font-weight: 600;
          color: var(--primary);
          line-height: 1;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 13.5px;
          color: var(--muted);
          font-weight: 500;
        }

        /* Section Heading */
        .sec-title {
          font-family: 'Fraunces', serif;
          font-size: 24px;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Access Tiles Grid */
        .pages-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .page-tile {
          background: #FFFFFF;
          border: 1px solid rgba(7,59,42,0.12);
          border-radius: 20px;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(7,59,42,0.03);
        }

        .page-tile::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 4px;
          width: 0;
          background: var(--accent);
          transition: width 0.3s ease;
        }

        .page-tile:hover {
          transform: translateY(-4px);
          border-color: var(--accent);
          box-shadow: 0 14px 32px rgba(7,59,42,0.09);
        }

        .page-tile:hover::after {
          width: 100%;
        }

        .tile-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
        }

        .tile-ic {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: var(--bg);
          color: var(--primary);
          display: grid;
          place-items: center;
          font-size: 20px;
          border: 1px solid rgba(7,59,42,0.15);
        }

        .page-tile:hover .tile-ic {
          background: var(--primary);
          color: var(--accent);
          border-color: var(--primary);
        }

        .tile-badge {
          font-size: 12px;
          font-weight: 600;
          background: rgba(11,96,69,0.08);
          color: var(--secondary);
          padding: 4px 12px;
          border-radius: 999px;
          border: 1px solid rgba(11,96,69,0.2);
        }

        .tile-title {
          font-family: 'Fraunces', serif;
          font-size: 20px;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 8px;
        }

        .tile-desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.55;
          margin-bottom: 22px;
        }

        .tile-foot {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--secondary);
        }

        .page-tile:hover .tile-foot {
          color: var(--primary);
        }

        /* Enquiries Table */
        .enq-card {
          background: #FFFFFF;
          border: 1px solid rgba(7,59,42,0.12);
          border-radius: 20px;
          padding: 28px;
          box-shadow: 0 6px 20px rgba(7,59,42,0.03);
        }

        .table-responsive {
          overflow-x: auto;
        }

        .custom-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .custom-table th {
          background: var(--bg);
          color: var(--primary);
          font-weight: 600;
          font-size: 13.5px;
          padding: 14px 18px;
          border-bottom: 1px solid rgba(7,59,42,0.12);
        }

        .custom-table td {
          padding: 16px 18px;
          border-bottom: 1px solid rgba(7,59,42,0.08);
          font-size: 14px;
          color: var(--text);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12.5px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 999px;
        }

        .status-pending {
          background: rgba(212,175,55,0.15);
          color: #8A6D0B;
          border: 1px solid rgba(212,175,55,0.4);
        }

        .status-replied {
          background: rgba(11,96,69,0.12);
          color: var(--secondary);
          border: 1px solid rgba(11,96,69,0.3);
        }

        .action-link {
          color: var(--primary);
          font-weight: 600;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .action-link:hover {
          color: var(--secondary);
          text-decoration: underline;
        }

        .loader-wrap {
          text-align: center;
          padding: 60px 20px;
        }

        .spinner {
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .pages-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 650px) {
          .dash-header { flex-direction: column; align-items: flex-start; gap: 16px; }
          .stats-grid { grid-template-columns: 1fr; }
          .pages-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Header Banner */}
      <div className="dash-header">
        <div>
          <h1>Admin Control Dashboard</h1>
          <p>Overview of system statistics, content management modules, and guest service requests.</p>
        </div>
        <button onClick={fetchDashboardData} className="refresh-btn">
          <FaSync size={13} /> Refresh Data
        </button>
      </div>

      {loading ? (
        <div className="loader-wrap">
          <svg className="spinner" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(212,175,55,.2)" strokeWidth="5" />
            <path d="M28 6a22 22 0 0 1 22 22" fill="none" stroke="#D4AF37" strokeWidth="5" strokeLinecap="round" />
          </svg>
          <p style={{ marginTop: "16px", color: "var(--muted)", fontWeight: 500 }}>Fetching live database statistics...</p>
        </div>
      ) : error ? (
        <div className="enq-card" style={{ textAlign: "center", padding: "40px 20px" }}>
          <FaExclamationTriangle size={36} style={{ color: "var(--accent)", marginBottom: "12px" }} />
          <h3 style={{ color: "var(--primary)" }}>Failed to Load Dashboard Data</h3>
          <p style={{ color: "var(--muted)" }}>Could not connect to the backend server. Please verify your internet or server connection.</p>
          <button onClick={fetchDashboardData} className="refresh-btn" style={{ marginTop: "12px" }}>
            <FaSync /> Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Top Key Metrics Strip */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrap">
                <FaConciergeBell />
              </div>
              <div>
                <div className="stat-val">{stats.servicesCount}</div>
                <div className="stat-label">Wealth Services</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap">
                <FaBullseye />
              </div>
              <div>
                <div className="stat-val">{stats.goalPillars + stats.goalSteps}</div>
                <div className="stat-label">Financial Goal Elements</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap">
                <FaBuilding />
              </div>
              <div>
                <div className="stat-val">{stats.chalukyaSolutions + stats.chalukyaSteps}</div>
                <div className="stat-label">Chalukya Land Items</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrap" style={{ background: stats.pendingEnquiries > 0 ? "rgba(212,175,55,0.2)" : "rgba(11,96,69,0.12)" }}>
                <FaEnvelopeOpenText style={{ color: stats.pendingEnquiries > 0 ? "#8A6D0B" : "#0B6045" }} />
              </div>
              <div>
                <div className="stat-val">{stats.totalEnquiries}</div>
                <div className="stat-label">{stats.pendingEnquiries} Pending Requests</div>
              </div>
            </div>
          </div>

          {/* Quick Access Modules Grid */}
          <h2 className="sec-title">
            <FaLayerGroup size={20} style={{ color: "var(--accent)" }} /> Admin Management Modules
          </h2>
          <div className="pages-grid">
            {adminPages.map((page, idx) => (
              <Link key={idx} to={page.path} className="page-tile">
                <div>
                  <div className="tile-top">
                    <div className="tile-ic">{page.icon}</div>
                    <span className="tile-badge">{page.countText}</span>
                  </div>
                  <div className="tile-title">{page.title}</div>
                  <div className="tile-desc">{page.desc}</div>
                </div>
                <div className="tile-foot">
                  Access Management <FaArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>

          {/* Recent Guest Enquiries & Messages */}
          <div className="enq-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 className="sec-title" style={{ margin: 0 }}>
                <FaEnvelopeOpenText size={20} style={{ color: "var(--accent)" }} /> Recent Guest Enquiries & Support Messages
              </h2>
              <Link to="/admin/enquiries" className="action-link">
                View All Messages ({stats.totalEnquiries}) <FaArrowRight size={12} />
              </Link>
            </div>

            {recentEnquiries.length === 0 ? (
              <p style={{ color: "var(--muted)", textStyle: "italic", margin: 0 }}>No guest enquiries found in the database.</p>
            ) : (
              <div className="table-responsive">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Guest Name</th>
                      <th>Email / Contact</th>
                      <th>Service Category</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentEnquiries.map((enq) => (
                      <tr key={enq._id}>
                        <td style={{ fontSize: "13px", color: "var(--muted)" }}>
                          {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : "N/A"}
                        </td>
                        <td>
                          <strong>{enq.fullName}</strong>
                        </td>
                        <td>
                          <div>{enq.email}</div>
                          <small style={{ color: "var(--muted)" }}>{enq.phone}</small>
                        </td>
                        <td>
                          <span style={{ fontWeight: 500 }}>{enq.service || "General Inquiry"}</span>
                        </td>
                        <td>
                          {enq.status === "Replied" ? (
                            <span className="status-badge status-replied">
                              <FaCheckCircle size={11} /> Replied
                            </span>
                          ) : (
                            <span className="status-badge status-pending">
                              <FaClock size={11} /> Pending
                            </span>
                          )}
                        </td>
                        <td>
                          <Link to="/admin/enquiries" className="action-link">
                            Reply <FaArrowRight size={11} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
