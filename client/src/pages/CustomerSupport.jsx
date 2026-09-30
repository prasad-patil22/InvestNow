import React, { useState } from "react";
import { apiUrl } from "../api";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import { Link } from "react-router-dom";
import {
  FaQuestionCircle,
  FaPhoneAlt,
  FaTools,
  FaBalanceScale,
  FaCheckCircle,
  FaPaperPlane
} from "react-icons/fa";

const CustomerSupport = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Mutual Funds",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", text: "" });

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setFeedback({ type: "danger", text: "Please fill in all required fields." });
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(apiUrl("/api/enquiries"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setFeedback({ type: "success", text: result.message || "Your service request has been submitted successfully!" });
        setFormData({ name: "", phone: "", email: "", service: "Mutual Funds", message: "" });
      } else {
        setFeedback({ type: "danger", text: result.message || "Failed to submit service request." });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: "danger", text: "Unable to connect to server. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="cs-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');

        .cs-page {
          --primary:#073B2A; --secondary:#0B6045; --accent:#D4AF37; --bg:#F5F8F6;
          --ivory:#FBF8F1; --text:#17231E; --muted:#5B6B63; --deep:#04241A;
          background:var(--bg); color:var(--text); overflow-x:hidden;
          font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
        }
        .cs-page h2,.cs-page h3,.cs-page h4 { font-family:'Fraunces',Georgia,serif; margin:0; }
        .cs-page .wrap { max-width:1200px; margin:0 auto; }
        .cs-page section.sec { padding:104px 5%; position:relative; }

        .head { max-width:660px; margin-bottom:56px; }
        .head h2 { font-size:clamp(30px,4vw,44px); font-weight:600; line-height:1.15; letter-spacing:-.015em; margin-bottom:14px; color:var(--primary); }
        .head p { font-size:16.5px; line-height:1.7; margin:0; color:var(--muted); max-width:56ch; }

        /* 4 Cards Grid */
        .cards-grid-4 { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; margin-bottom:60px; }
        .support-card {
          background:#fff; border:1px solid rgba(7,59,42,.12); border-radius:24px; padding:32px 24px;
          display:flex; flex-direction:column; justify-content:space-between; text-align:center;
          transition:transform .3s, box-shadow .3s, border-color .3s; position:relative; overflow:hidden;
        }
        .support-card:hover { border-color:var(--accent); transform:translateY(-4px); box-shadow:0 16px 36px rgba(7,59,42,.08); }
        .support-card::after { content:''; position:absolute; left:0; bottom:0; height:3px; width:0; background:var(--accent); transition:width .4s; }
        .support-card:hover::after { width:100%; }

        .support-icon {
          width:52px; height:52px; border-radius:50%; background:var(--accent); color:var(--deep);
          display:grid; place-items:center; font-size:20px; margin:0 auto 18px;
        }
        .support-card-title { font-size:20px; font-weight:600; color:var(--primary); margin-bottom:10px; }
        .support-card-desc { font-size:14px; color:var(--muted); line-height:1.6; margin-bottom:20px; }

        .support-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:var(--primary); color:#FDFBF5; font-weight:600; font-size:13.5px;
          padding:11px 20px; border-radius:999px; text-decoration:none; transition:all .25s; width:100%; box-sizing:border-box;
        }
        .support-btn:hover { background:var(--accent); color:var(--deep); }

        /* Form & Grievance Split */
        .support-split-grid { display:grid; grid-template-columns:1.2fr 0.8fr; gap:36px; align-items:start; }

        .form-card {
          background:#fff; border:1px solid rgba(7,59,42,.14); border-radius:28px; padding:44px; box-shadow:0 18px 40px rgba(7,59,42,.06);
        }
        .form-group { margin-bottom:20px; }
        .form-label { font-size:14px; font-weight:600; color:var(--primary); margin-bottom:6px; display:block; }
        .form-input,.form-select,.form-textarea {
          width:100%; box-sizing:border-box; background:var(--bg); border:1px solid rgba(7,59,42,.16);
          border-radius:12px; padding:12px 16px; font-size:14.5px; color:var(--text); font-family:inherit; transition:border-color .25s, box-shadow .25s;
        }
        .form-input:focus,.form-select:focus,.form-textarea:focus { outline:none; border-color:var(--accent); box-shadow:0 0 0 3px rgba(212,175,55,.2); }

        .alert-box { padding:14px 20px; border-radius:14px; font-size:14px; margin-bottom:24px; font-weight:500; display:flex; align-items:center; gap:10px; }
        .alert-danger { background:rgba(217,83,79,.12); border:1px solid rgba(217,83,79,.3); color:#c9302c; }
        .alert-success { background:rgba(11,96,69,.12); border:1px solid rgba(11,96,69,.3); color:var(--primary); }

        .submit-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:10px;
          background:var(--accent); color:var(--deep); font-weight:600; font-size:15px; border:none; cursor:pointer;
          padding:14px 36px; border-radius:999px; width:100%; transition:transform .25s, box-shadow .25s;
        }
        .submit-btn:hover { transform:translateY(-2px); box-shadow:0 10px 26px rgba(212,175,55,.35); }

        .grievance-card {
          background:var(--ivory); border:1px solid rgba(7,59,42,.12); border-radius:28px; padding:44px;
        }
        .grievance-title { font-size:24px; font-weight:600; color:var(--primary); margin-bottom:14px; }
        .grievance-text { font-size:14.5px; color:var(--muted); line-height:1.65; margin-bottom:24px; }

        .grievance-step {
          background:#fff; padding:18px 20px; border-radius:16px; border-left:4px solid var(--accent);
          margin-bottom:16px; border-top:1px solid rgba(7,59,42,.08); border-right:1px solid rgba(7,59,42,.08); border-bottom:1px solid rgba(7,59,42,.08);
        }
        .step-heading { font-family:'Fraunces',serif; font-size:16px; font-weight:600; color:var(--primary); margin-bottom:4px; }
        .step-desc { font-size:13.5px; color:var(--muted); line-height:1.5; }

        @media (max-width:1024px) {
          .cards-grid-4 { grid-template-columns:repeat(2,1fr); }
          .support-split-grid { grid-template-columns:1fr; }
        }
        @media (max-width:600px) {
          .cs-page section.sec { padding:70px 6%; }
          .cards-grid-4 { grid-template-columns:1fr; }
          .form-card, .grievance-card { padding:28px 20px; }
        }
      `}</style>

      {/* Page Hero Banner */}
      <PageHero
        title="Support When You Need It"
        subtitle="We are committed to delivering prompt assistance, enquiry resolution, and grievance redressal."
        badge="CUSTOMER CARE"
        breadcrumbs={[{ label: "Customer Support" }]}
      />

      {/* 4 Cards Section */}
      <section className="sec">
        <div className="wrap">
          <div className="head">
            <h2>Support Options</h2>
            <p>Choose the appropriate support channel below for enquiries, phone assistance, service requests, or grievances.</p>
          </div>

          <div className="cards-grid-4">
            {/* Card 1: Enquiry */}
            <div className="support-card" id="enquiry">
              <div>
                <div className="support-icon"><FaQuestionCircle /></div>
                <h3 className="support-card-title">General Enquiry</h3>
                <p className="support-card-desc">Have a question about our services or need guidance? Send us your enquiry.</p>
              </div>
              <div>
                <a href="#service-request" className="support-btn">Submit Enquiry</a>
              </div>
            </div>

            {/* Card 2: Contact Us */}
            <div className="support-card">
              <div>
                <div className="support-icon"><FaPhoneAlt /></div>
                <h3 className="support-card-title">Direct Contact</h3>
                <p className="support-card-desc">Call our representatives directly for immediate phone support.</p>
                <p style={{ fontSize: "13.5px", fontWeight: "600", color: "var(--primary)", margin: "0 0 16px" }}>
                  +91 79753 47138<br />+91 99802 92567
                </p>
              </div>
              <div>
                <Link to="/contact" className="support-btn">View Contact Details</Link>
              </div>
            </div>

            {/* Card 3: Service Request */}
            <div className="support-card">
              <div>
                <div className="support-icon"><FaTools /></div>
                <h3 className="support-card-title">Service Request</h3>
                <p className="support-card-desc">Request policy reviews, portfolio updates, or loan guidance.</p>
              </div>
              <div>
                <a href="#service-request" className="support-btn">Raise Request</a>
              </div>
            </div>

            {/* Card 4: Grievance Redressal */}
            <div className="support-card">
              <div>
                <div className="support-icon"><FaBalanceScale /></div>
                <h3 className="support-card-title">Grievance Redressal</h3>
                <p className="support-card-desc">Raise official concerns or feedback for review by management.</p>
              </div>
              <div>
                <a href="#grievance" className="support-btn">Grievance Process</a>
              </div>
            </div>
          </div>

          {/* Form & Grievance Split Section */}
          <div className="support-split-grid">
            {/* Service Request Form */}
            <div className="form-card" id="service-request">
              <h3 style={{ fontSize: "26px", color: "var(--primary)", marginBottom: "8px" }}>
                Submit Service Request / Enquiry
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "26px", lineHeight: "1.6" }}>
                Fill out the form below and our team will get back to you promptly.
              </p>

              {feedback.text && (
                <div className={`alert-box alert-${feedback.type}`} role="alert">
                  {feedback.type === "success" && <FaCheckCircle />}
                  <span>{feedback.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div className="form-group">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-input"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Select Service *</label>
                  <select
                    className="form-select"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="Mutual Funds">Mutual Funds & SIPs</option>
                    <option value="Insurance">Insurance Solutions</option>
                    <option value="Loans">Loans & Financing</option>
                    <option value="Wealth Management">Wealth Management</option>
                    <option value="Land Links">Land Links / Chalukya Developers</option>
                    <option value="Financial Consultation">General Consultation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Details *</label>
                  <textarea
                    rows="4"
                    className="form-textarea"
                    placeholder="Describe your requirement or question..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" disabled={submitting} className="submit-btn">
                  {submitting ? "Submitting Request..." : <><FaPaperPlane size={13} /> Submit Service Request</>}
                </button>
              </form>
            </div>

            {/* Grievance Redressal Section */}
            <div className="grievance-card" id="grievance">
              <h3 className="grievance-title">Grievance Redressal Mechanism</h3>
              <p className="grievance-text">
                INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED is committed to resolving client concerns transparently and efficiently. If you have any dissatisfaction regarding our services, please follow our resolution steps:
              </p>

              <div className="grievance-step">
                <div className="step-heading">Level 1: Initial Complaint</div>
                <div className="step-desc">Contact your dedicated consultant or email <strong>meetinvenstnow@gmail.com</strong> with your query details.</div>
              </div>

              <div className="grievance-step">
                <div className="step-heading">Level 2: Escalation to Management</div>
                <div className="step-desc">If unresolved within 3 working days, escalate directly to senior management at <strong>+91 97433 33355</strong> (Prashanth).</div>
              </div>

              <div className="grievance-step">
                <div className="step-heading">Level 3: Formal Review</div>
                <div className="step-desc">A formal written response and resolution recommendation will be provided to the client.</div>
              </div>

              <p style={{ fontSize: "12.5px", color: "var(--muted)", marginTop: "24px", lineHeight: "1.6" }}>
                Note: Standard corporate grievance procedures apply. Official regulatory contacts will be updated upon notification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Need Instant Phone Consultation?"
        subtitle="Call our team directly for immediate assistance regarding your financial planning."
        primaryBtnText="Call Us Now"
        primaryBtnLink="/contact"
        secondaryBtnText="View All Services"
        secondaryBtnLink="/services"
      />
    </div>
  );
};

export default CustomerSupport;
