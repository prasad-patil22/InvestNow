import React, { useState, useEffect } from "react";
import { apiUrl } from "../api";
import {
  FaEnvelope,
  FaReply,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaUser,
  FaPhone,
  FaPaperPlane,
  FaSearch
} from "react-icons/fa";

const ManageEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modal State
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replying, setReplying] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await fetch(apiUrl("/api/enquiries"), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const result = await res.json();

      if (res.ok && result.data) {
        setEnquiries(result.data);
      } else {
        setMessage({ type: "danger", text: result.message || "Failed to load guest messages." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Error connecting to backend server." });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReply = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setReplyText(enquiry.reply || "");
    setMessage({ type: "", text: "" });
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      alert("Please enter a reply message.");
      return;
    }

    setReplying(true);
    setMessage({ type: "", text: "" });

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(apiUrl(`/api/enquiries/${selectedEnquiry._id}/reply`), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ replyText: replyText.trim() })
      });

      const result = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: `Reply sent successfully via email to ${selectedEnquiry.email}!` });
        fetchEnquiries();
        setTimeout(() => {
          setSelectedEnquiry(null);
          setReplyText("");
        }, 1800);
      } else {
        setMessage({ type: "danger", text: result.message || "Failed to send email reply." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Error sending email via Nodemailer." });
    } finally {
      setReplying(false);
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = statusFilter === "All" || item.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery =
      item.fullName.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.service.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5 text-center">
        <div>
          <FaSpinner className="spinner-border text-success mb-3 fs-2" style={{ color: "#0B6045" }} />
          <p className="fw-semibold" style={{ color: "#073B2A" }}>Loading guest messages and enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-enquiries-container p-3 p-md-4">
      <style>{`
        .manage-enquiries-container {
          background-color: #FFFFFF;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(7, 59, 42, 0.06);
          border: 1px solid #DCE8E1;
        }

        .page-header-box {
          background: linear-gradient(135deg, #073B2A, #0B6045);
          color: #FFFFFF;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .manage-enquiries-container .page-header-box h2 {
          color: #FFFFFF;
        }

        .enquiry-card {
          background: #FFFFFF;
          border-radius: 14px;
          border: 1px solid #DCE8E1;
          padding: 20px;
          margin-bottom: 16px;
          transition: all 0.3s ease;
        }

        .enquiry-card:hover {
          box-shadow: 0 8px 25px rgba(7, 59, 42, 0.08);
          border-color: #D4AF37;
        }

        .status-badge-pending {
          background: #FFF3CD;
          color: #856404;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .status-badge-replied {
          background: #D4EDDA;
          color: #155724;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .btn-green {
          background: #073B2A;
          color: #FFFFFF;
          border: none;
          font-weight: 600;
        }

        .btn-green:hover {
          background: #0B6045;
          color: #FFFFFF;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .reply-modal {
          background: #FFFFFF;
          border-radius: 16px;
          maxWidth: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0,0,0,0.25);
        }
      `}</style>

      {/* Header Banner */}
      <div className="page-header-box d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <FaEnvelope style={{ color: "#D4AF37" }} /> Guest Messages & Service Enquiries
          </h2>
          <p className="mb-0 text-white-50 fs-6">
            View customer enquiries and send email responses directly to users via Nodemailer.
          </p>
        </div>

        <button className="btn btn-outline-light rounded-3 px-3" onClick={fetchEnquiries}>
          Refresh Messages
        </button>
      </div>

      {/* Global Alert */}
      {message.text && (
        <div className={`alert alert-${message.type} alert-dismissible fade show rounded-3 mb-4`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ type: "", text: "" })}></button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="row g-3 mb-4 align-items-center">
        <div className="col-md-7">
          <div className="input-group">
            <span className="input-group-text bg-white"><FaSearch className="text-muted" /></span>
            <input
              type="text"
              className="form-control rounded-end"
              placeholder="Search by name, email, phone, service or message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-5 d-flex gap-2 justify-content-md-end">
          <button
            className={`btn ${statusFilter === "All" ? "btn-dark" : "btn-outline-secondary"}`}
            onClick={() => setStatusFilter("All")}
          >
            All ({enquiries.length})
          </button>
          <button
            className={`btn ${statusFilter === "Pending" ? "btn-warning" : "btn-outline-secondary"}`}
            onClick={() => setStatusFilter("Pending")}
          >
            Pending ({enquiries.filter(e => e.status === "Pending").length})
          </button>
          <button
            className={`btn ${statusFilter === "Replied" ? "btn-success" : "btn-outline-secondary"}`}
            onClick={() => setStatusFilter("Replied")}
          >
            Replied ({enquiries.filter(e => e.status === "Replied").length})
          </button>
        </div>
      </div>

      {/* Enquiries List */}
      {filteredEnquiries.length === 0 ? (
        <div className="text-center p-5 bg-light rounded-4 text-muted">
          No guest messages or enquiries found.
        </div>
      ) : (
        filteredEnquiries.map((enquiry) => (
          <div key={enquiry._id} className="enquiry-card">
            <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
              <div>
                <h5 className="fw-bold mb-1" style={{ color: "#073B2A" }}>
                  <FaUser className="me-2 text-muted" /> {enquiry.fullName}
                </h5>
                <div className="d-flex gap-3 text-muted small flex-wrap">
                  <span><FaEnvelope className="me-1" /> {enquiry.email}</span>
                  <span><FaPhone className="me-1" /> {enquiry.phone}</span>
                  <span><FaClock className="me-1" /> {new Date(enquiry.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className={enquiry.status === "Replied" ? "status-badge-replied" : "status-badge-pending"}>
                  {enquiry.status === "Replied" ? <FaCheckCircle className="me-1" /> : <FaClock className="me-1" />}
                  {enquiry.status}
                </span>
              </div>
            </div>

            <div className="mb-3 p-3 bg-light rounded-3">
              <span className="badge bg-secondary mb-2">{enquiry.service}</span>
              <p className="mb-0 text-dark" style={{ whiteSpace: "pre-line" }}>{enquiry.message}</p>
            </div>

            {enquiry.status === "Replied" && enquiry.reply && (
              <div className="mb-3 p-3 rounded-3" style={{ background: "rgba(7, 59, 42, 0.05)", borderLeft: "4px solid #073B2A" }}>
                <p className="small fw-bold text-success mb-1">
                  Replied on {new Date(enquiry.repliedAt).toLocaleString()}:
                </p>
                <p className="mb-0 text-dark small" style={{ whiteSpace: "pre-line" }}>{enquiry.reply}</p>
              </div>
            )}

            <div className="text-end">
              <button
                className="btn btn-green fw-bold px-4 rounded-3 d-inline-flex align-items-center gap-2"
                onClick={() => handleOpenReply(enquiry)}
              >
                <FaReply /> {enquiry.status === "Replied" ? "Send New Reply Email" : "Reply via Email"}
              </button>
            </div>
          </div>
        ))
      )}

      {/* Reply Modal */}
      {selectedEnquiry && (
        <div className="modal-overlay" onClick={() => setSelectedEnquiry(null)}>
          <div className="reply-modal p-4" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <h5 className="fw-bold mb-0" style={{ color: "#073B2A" }}>
                <FaPaperPlane className="me-2 text-warning" style={{ color: "#D4AF37" }} /> Reply to {selectedEnquiry.fullName}
              </h5>
              <button className="btn-close" onClick={() => setSelectedEnquiry(null)}></button>
            </div>

            <div className="mb-3 p-3 bg-light rounded-3">
              <div className="small text-muted mb-1">To: <strong>{selectedEnquiry.email}</strong></div>
              <div className="small text-muted mb-2">Subject: <strong>{selectedEnquiry.service}</strong></div>
              <div className="small text-muted"><strong>Enquiry Message:</strong> "{selectedEnquiry.message}"</div>
            </div>

            <form onSubmit={handleSendReply}>
              <div className="mb-4">
                <label className="form-label fw-semibold">Your Email Response Message</label>
                <textarea
                  className="form-control rounded-3"
                  rows="5"
                  placeholder="Type your response to the user. This will be emailed directly to their inbox via Nodemailer..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4"
                  onClick={() => setSelectedEnquiry(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replying}
                  className="btn btn-green fw-bold px-4 d-flex align-items-center gap-2"
                  style={{ background: "#D4AF37", borderColor: "#D4AF37", color: "#FFFFFF" }}
                >
                  {replying ? <FaSpinner className="spinner-border spinner-border-sm" /> : <FaPaperPlane />}
                  {replying ? "Sending Email..." : "Send Email Reply"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEnquiries;
