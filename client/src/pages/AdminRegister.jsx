import React, { useState } from "react";
import { apiUrl } from "../api";
import { Link, useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(apiUrl("/api/admin/register"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccess("Admin registered successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/investnowlogin");
      }, 1500);
    } catch (err) {
      setError(err.message || "Something went wrong during registration.");
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
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: "450px", width: "100%", background: "#FFFFFF" }}>
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
            <h3 className="fw-bold" style={{ color: "#073B2A" }}>Admin Register</h3>
            <p className="text-muted small">Create a new admin account for InvestNow</p>
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
            <div className="mb-3">
              <label className="form-label fw-semibold" style={{ color: "#17231E" }}>Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg rounded-3 fs-6"
                placeholder="Enter full name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ borderColor: "#DCE8E1" }}
              />
            </div>

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
              <label className="form-label fw-semibold" style={{ color: "#17231E" }}>Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-lg rounded-3 fs-6"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ borderColor: "#DCE8E1" }}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold" style={{ color: "#17231E" }}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-control form-control-lg rounded-3 fs-6"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
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
                "Register Admin"
              )}
            </button>
          </form>

          <div className="text-center mt-4 pt-2 border-top">
            <p className="small text-muted mb-0">
              Already have an admin account?{" "}
              <Link to="/investnowlogin" className="fw-semibold text-decoration-none" style={{ color: "#0B6045" }}>
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
