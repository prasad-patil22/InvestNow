import React, { useState } from "react";
import { apiUrl } from "../api";
import PageHero from "../components/PageHero";
import CTASection from "../components/CTASection";
import { FaPhoneAlt, FaEnvelope, FaUserTie, FaMapMarkerAlt, FaCheckCircle, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
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

    if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
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
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        setFeedback({ type: "success", text: result.message || "Thank you! Your enquiry has been submitted successfully." });
        setFormData({ fullName: "", phone: "", email: "", service: "Mutual Funds", message: "" });
      } else {
        setFeedback({ type: "danger", text: result.message || "Failed to submit enquiry." });
      }
    } catch (err) {
      console.error(err);
      setFeedback({ type: "danger", text: "Unable to connect to server. Please try again later." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ct-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap');

        .ct-page {
          --primary:#073B2A; --secondary:#0B6045; --accent:#D4AF37; --bg:#F5F8F6;
          --ivory:#FBF8F1; --text:#17231E; --muted:#5B6B63; --deep:#04241A;
          background:var(--bg); color:var(--text); overflow-x:hidden;
          font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
        }
        .ct-page h2,.ct-page h3,.ct-page h4 { font-family:'Fraunces',Georgia,serif; margin:0; }
        .ct-page .wrap { max-width:1200px; margin:0 auto; }
        .ct-page section.sec { padding:104px 5%; position:relative; }

        .head { max-width:660px; margin-bottom:56px; }
        .head h2 { font-size:clamp(30px,4vw,44px); font-weight:600; line-height:1.15; letter-spacing:-.015em; margin-bottom:14px; color:var(--primary); }
        .head p { font-size:16.5px; line-height:1.7; margin:0; color:var(--muted); max-width:56ch; }

        /* 3 Contact Cards */
        .cards-grid-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:60px; }
        .contact-card {
          background:#fff; border:1px solid rgba(7,59,42,.12); border-radius:24px; padding:35px 26px;
          text-align:center; transition:transform .3s, box-shadow .3s, border-color .3s; position:relative; overflow:hidden;
        }
        .contact-card:hover { border-color:var(--accent); transform:translateY(-4px); box-shadow:0 16px 36px rgba(7,59,42,.08); }
        .contact-card::after { content:''; position:absolute; left:0; bottom:0; height:3px; width:0; background:var(--accent); transition:width .4s; }
        .contact-card:hover::after { width:100%; }

        .contact-icon-box {
          width:52px; height:52px; border-radius:50%; background:var(--accent); color:var(--deep);
          display:grid; place-items:center; font-size:20px; margin:0 auto 20px;
        }
        .contact-card-title { font-size:20px; font-weight:600; color:var(--primary); margin-bottom:10px; }
        .contact-card-text { font-size:14px; color:var(--muted); line-height:1.6; }
        .contact-card-text a { color:var(--primary); text-decoration:none; font-weight:600; transition:color .25s; }
        .contact-card-text a:hover { color:var(--accent); }

        /* Form & Info Split Grid */
        .contact-grid { display:grid; grid-template-columns:1.2fr 0.8fr; gap:36px; align-items:start; margin-bottom:60px; }

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

        .info-card {
          background:linear-gradient(150deg,var(--primary),var(--deep)); color:#FDFBF5;
          padding:44px; border-radius:28px; border-left:4px solid var(--accent); position:relative; overflow:hidden;
        }
        .info-card-title { font-size:26px; font-weight:600; color:#FDFBF5; margin-bottom:16px; }
        .info-card-text { font-size:15px; color:rgba(253,251,245,.8); line-height:1.65; margin-bottom:28px; }

        .info-item { display:flex; align-items:flex-start; gap:16px; margin-bottom:22px; font-size:14.5px; color:rgba(253,251,245,.9); }
        .info-icon { color:var(--accent); font-size:19px; margin-top:3px; flex-shrink:0; }

        .map-container {
          width:100%; border-radius:28px; overflow:hidden; box-shadow:0 14px 36px rgba(7,59,42,.08);
          border:1px solid rgba(7,59,42,.12); background:#fff;
        }

        @media (max-width:992px) {
          .cards-grid-3 { grid-template-columns:1fr; }
          .contact-grid { grid-template-columns:1fr; }
        }
        @media (max-width:600px) {
          .ct-page section.sec { padding:70px 6%; }
          .form-card, .info-card { padding:28px 20px; }
        }
      `}</style>

      {/* Hero Header */}
      <PageHero
        title="Let's Start a Conversation"
        subtitle="Get in touch with our team of financial consultants to discuss your goals, requirements, or service queries."
        badge="GET IN TOUCH"
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <section className="sec">
        <div className="wrap">
          {/* 3 Contact Cards */}
          <div className="cards-grid-3">
            {/* Phone */}
            <div className="contact-card">
              <div className="contact-icon-box"><FaPhoneAlt /></div>
              <h3 className="contact-card-title">Phone Numbers</h3>
              <div className="contact-card-text">
                <a href="tel:+917975347138">+91 79753 47138</a><br />
                <a href="tel:+919980292567">+91 99802 92567</a>
              </div>
            </div>

            {/* Email */}
            <div className="contact-card">
              <div className="contact-icon-box"><FaEnvelope /></div>
              <h3 className="contact-card-title">Email Address</h3>
              <div className="contact-card-text">
                <a href="mailto:meetinvenstnow@gmail.com">meetinvenstnow@gmail.com</a><br />
                <span style={{ fontSize: "12.5px", color: "var(--muted)" }}>Official Customer Support</span>
              </div>
            </div>

            {/* Contact Person */}
            <div className="contact-card">
              <div className="contact-icon-box"><FaUserTie /></div>
              <h3 className="contact-card-title">Direct Contact</h3>
              <div className="contact-card-text">
                <strong>Prashanth</strong><br />
                <a href="tel:+919743333355">+91 97433 33355</a>
              </div>
            </div>
          </div>

          {/* Form & Info Grid */}
          <div className="contact-grid">
            {/* Form */}
            <div className="form-card">
              <h3 style={{ fontSize: "26px", color: "var(--primary)", marginBottom: "8px" }}>
                Send Us an Enquiry
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "15px", marginBottom: "26px", lineHeight: "1.6" }}>
                Please fill in your details below and a financial consultant will connect with you.
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
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                  <label className="form-label">Service Interested In *</label>
                  <select
                    className="form-select"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  >
                    <option value="Mutual Funds">Mutual Funds & SIPs</option>
                    <option value="Insurance">Insurance Coverage</option>
                    <option value="Loans">Loans & Financing</option>
                    <option value="Wealth Management">Wealth Management</option>
                    <option value="Stocks & Equity">Stocks & Equity</option>
                    <option value="Portfolio Management">Portfolio Management</option>
                    <option value="Land Links">Land Links / Chalukya Developers</option>
                    <option value="Financial Consultation">General Consultation</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Details *</label>
                  <textarea
                    rows="4"
                    className="form-textarea"
                    placeholder="Provide details about your financial enquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                <button type="submit" disabled={submitting} className="submit-btn">
                  {submitting ? "Submitting Enquiry..." : <><FaPaperPlane size={13} /> Send Enquiry</>}
                </button>
              </form>
            </div>

            {/* Corporate Info Card */}
            <div className="info-card">
              <h3 className="info-card-title">Corporate Office</h3>
              <p className="info-card-text">
                Visit our office or reach out to our corporate advisors for in-person consultation and portfolio evaluation.
              </p>

              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div>
                  <strong>Address:</strong><br />
                  INVESTNOW FINANCIAL SERVICES PRIVATE LIMITED<br />
                  Kundapura, Karnataka – 576201
                </div>
              </div>

              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <div>
                  <strong>Email:</strong><br />
                  meetinvenstnow@gmail.com
                </div>
              </div>

              <div className="info-item">
                <FaPhoneAlt className="info-icon" />
                <div>
                  <strong>Call Center:</strong><br />
                  +91 79753 47138 | +91 99802 92567
                </div>
              </div>

              <div className="info-item">
                <FaUserTie className="info-icon" />
                <div>
                  <strong>Key Representative:</strong><br />
                  Prashanth (+91 97433 33355)
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Location Section */}
          <div className="head" style={{ marginBottom: "26px" }}>
            <h2>Find Us on Google Maps</h2>
          </div>

          <div className="map-container">
            <iframe
              title="INVESTNOW Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.102377372332!2d74.6868!3d13.6264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDM3JzM1LjAiTiA3NMKwNDEnMTIuNSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Schedule a Personal Meeting"
        subtitle="Our advisors are available for one-on-one consultation at your convenience."
        primaryBtnText="Call Us"
        primaryBtnLink="tel:+917975347138"
        secondaryBtnText="Explore Services"
        secondaryBtnLink="/services"
      />
    </div>
  );
};

export default ContactUs;
