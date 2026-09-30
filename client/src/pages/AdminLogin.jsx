import React, { useState } from "react";
import { apiUrl } from "../api";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(apiUrl("/api/admin/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password");
      }

      // Store auth info in localStorage
      localStorage.setItem("adminToken", data.token);
      if (data.admin) {
        localStorage.setItem("adminUser", JSON.stringify(data.admin));
      }

      // Navigate to /admin page
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Something went wrong during login.");
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
            <h3 className="fw-bold" style={{ color: "#073B2A" }}>Admin Login</h3>
            <p className="text-muted small">Access your InvestNow admin dashboard</p>
          </div>

          {error && (
            <div className="alert alert-danger py-2 small rounded-3 mb-3" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#17231E" }}>Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control form-control-lg rounded-3 fs-6"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ borderColor: "#DCE8E1" }}
              />
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <label className="form-label fw-semibold mb-0" style={{ color: "#17231E" }}>Password</label>
                <Link
                  to="/investnowforgotpassword"
                  className="small text-decoration-none fw-semibold"
                  style={{ color: "#0B6045" }}
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type="password"
                name="password"
                className="form-control form-control-lg rounded-3 fs-6"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ borderColor: "#DCE8E1" }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn w-100 btn-lg rounded-3 fs-6 fw-bold shadow-sm mt-3"
              style={{ background: "#D4AF37", borderColor: "#D4AF37", color: "#FFFFFF" }}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              ) : (
                "Login to Dashboard"
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-2 border-top">
            <p className="small text-muted mb-0">
              Don't have an admin account?{" "}
              <Link to="/investnowregi" className="fw-semibold text-decoration-none" style={{ color: "#0B6045" }}>
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
