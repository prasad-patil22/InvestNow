import React, { useState } from "react";
import { apiUrl } from "../api";
import { Link } from "react-router-dom";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your registered admin email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(apiUrl("/api/admin/forgot-password"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password.");
      }

      setSuccess(data.message || "A new password has been sent to your email address!");
      setEmail("");
    } catch (err) {
      setError(err.message || "Something went wrong while resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        background: "linear-gradient(135deg, #073B2A, #0B6045)",
        padding: "20px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: "420px", width: "100%", background: "#FFFFFF" }}>
        <div className="card-body p-4 p-sm-5">
          <div className="text-center mb-4">
            <Link to="/">
              <img 
                src="/logo.png" 
                alt="INVESTNOW Logo" 
                className="img-fluid mb-3"
                style={{ width: "55px", height: "55px", borderRadius: "50%", objectFit: "contain", border: "2px solid #D4AF37", background: "#FFFFFF", padding: "4px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/logo.jpeg";
                }}
              />
            </Link>
            <h3 className="fw-bold" style={{ color: "#073B2A" }}>Forgot Password</h3>
            <p className="text-muted small">
              Enter your registered email address and we will generate a new password and send it to your email.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small rounded-3 mb-3" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="alert alert-success py-2 small rounded-3 mb-3" role="alert">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: "#17231E" }}>Registered Admin Email</label>
              <input
                type="email"
                className="form-control form-control-lg rounded-3 fs-6"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderColor: "#DCE8E1" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 btn-lg rounded-3 fs-6 fw-bold shadow-sm"
              style={{ background: "#D4AF37", borderColor: "#D4AF37", color: "#FFFFFF" }}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                "Send New Password"
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-2 border-top">
            <p className="small text-muted mb-0">
              Remember your password?{" "}
              <Link to="/investnowlogin" className="fw-semibold text-decoration-none" style={{ color: "#0B6045" }}>
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
