import React, { useState, useEffect } from "react";
import { apiUrl } from "../api";
import {
  FaSave,
  FaPlus,
  FaTrash,
  FaBullseye,
  FaSpinner
} from "react-icons/fa";

const GOAL_ICON_OPTIONS = [
  { label: "Chart / Wealth (FaChartLine)", value: "FaChartLine" },
  { label: "Umbrella / Retirement (FaUmbrella)", value: "FaUmbrella" },
  { label: "Graduation / Education (FaGraduationCap)", value: "FaGraduationCap" },
  { label: "Home / Property (FaHome)", value: "FaHome" },
  { label: "Briefcase / Business (FaBriefcase)", value: "FaBriefcase" },
  { label: "Shield / Protection (FaShieldAlt)", value: "FaShieldAlt" },
  { label: "Bullseye / Target (FaBullseye)", value: "FaBullseye" },
  { label: "Clipboard / Assessment (FaClipboardList)", value: "FaClipboardList" },
  { label: "Cogs / Planning (FaCogs)", value: "FaCogs" },
  { label: "Check Double / Execute (FaCheckDouble)", value: "FaCheckDouble" },
  { label: "Sync / Review (FaSyncAlt)", value: "FaSyncAlt" }
];

const ManageFinancialGoals = () => {
  const [activeTab, setActiveTab] = useState("pillars");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [pillars, setPillars] = useState([]);
  const [journeySteps, setJourneySteps] = useState([]);

  // New Pillar Form State
  const [newPillar, setNewPillar] = useState({
    title: "",
    desc: "",
    icon: "FaChartLine",
    details: [""],
    priority: 1
  });

  // New Journey Step Form State
  const [newStep, setNewStep] = useState({
    step: "01",
    name: "",
    icon: "FaBullseye",
    text: "",
    priority: 1
  });

  useEffect(() => {
    fetchFinancialGoalsData();
  }, []);

  const fetchFinancialGoalsData = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl("/api/financial-goals"));
      const result = await res.json();

      if (res.ok && result.data) {
        setPillars(result.data.pillars || []);
        setJourneySteps(result.data.journeySteps || []);
      } else {
        setMessage({ type: "danger", text: result.message || "Failed to load Financial Goals data." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Unable to connect to backend server." });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setMessage({ type: "", text: "" });
    setSaving(true);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(apiUrl("/api/financial-goals"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          pillars,
          journeySteps
        })
      });

      const result = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Financial Goals page content saved successfully!" });
        if (result.data) {
          setPillars(result.data.pillars || []);
          setJourneySteps(result.data.journeySteps || []);
        }
      } else {
        setMessage({ type: "danger", text: result.message || "Failed to save content." });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "danger", text: "Error saving data to server." });
    } finally {
      setSaving(false);
    }
  };

  // --- PILLAR CARDS HANDLERS ---
  const handleAddPillar = () => {
    if (!newPillar.title.trim() || !newPillar.desc.trim()) {
      alert("Please provide both Title and Description for the Goal Pillar.");
      return;
    }

    const cleanDetails = newPillar.details.filter((d) => d.trim() !== "");
    const pillarToAdd = {
      ...newPillar,
      details: cleanDetails,
      priority: Number(newPillar.priority) || pillars.length + 1
    };

    const updatedList = [...pillars, pillarToAdd].sort((a, b) => a.priority - b.priority);
    setPillars(updatedList);

    setNewPillar({
      title: "",
      desc: "",
      icon: "FaChartLine",
      details: [""],
      priority: pillars.length + 2
    });
  };

  const handleDeletePillar = (index) => {
    setPillars(pillars.filter((_, i) => i !== index));
  };

  const handlePillarFieldChange = (index, field, value) => {
    const updated = [...pillars];
    updated[index] = {
      ...updated[index],
      [field]: field === "priority" ? Number(value) : value
    };

    if (field === "priority") {
      updated.sort((a, b) => a.priority - b.priority);
    }

    setPillars(updated);
  };

  const handlePillarDetailChange = (pillarIndex, detailIndex, value) => {
    const updated = [...pillars];
    const details = [...updated[pillarIndex].details];
    details[detailIndex] = value;
    updated[pillarIndex].details = details;
    setPillars(updated);
  };

  const handleAddPillarDetail = (pillarIndex) => {
    const updated = [...pillars];
    updated[pillarIndex].details.push("");
    setPillars(updated);
  };

  const handleRemovePillarDetail = (pillarIndex, detailIndex) => {
    const updated = [...pillars];
    updated[pillarIndex].details = updated[pillarIndex].details.filter((_, i) => i !== detailIndex);
    setPillars(updated);
  };

  // --- JOURNEY STEPS ROADMAP HANDLERS ---
  const handleAddStep = () => {
    if (!newStep.name.trim() || !newStep.text.trim()) {
      alert("Please provide both Step Title and Description for the Journey Roadmap Step.");
      return;
    }

    const stepToAdd = {
      ...newStep,
      priority: Number(newStep.priority) || journeySteps.length + 1
    };

    const updatedList = [...journeySteps, stepToAdd].sort((a, b) => a.priority - b.priority);
    setJourneySteps(updatedList);

    const nextStepNum = (journeySteps.length + 2).toString().padStart(2, "0");
    setNewStep({
      step: nextStepNum,
      name: "",
      icon: "FaBullseye",
      text: "",
      priority: journeySteps.length + 2
    });
  };

  const handleDeleteStep = (index) => {
    setJourneySteps(journeySteps.filter((_, i) => i !== index));
  };

  const handleStepFieldChange = (index, field, value) => {
    const updated = [...journeySteps];
    updated[index] = {
      ...updated[index],
      [field]: field === "priority" ? Number(value) : value
    };

    if (field === "priority") {
      updated.sort((a, b) => a.priority - b.priority);
    }

    setJourneySteps(updated);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5 text-center">
        <div>
          <FaSpinner className="spinner-border text-success mb-3 fs-2" style={{ color: "#0B6045" }} />
          <p className="fw-semibold" style={{ color: "#073B2A" }}>Loading Financial Goals management settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-goals-container p-3 p-md-4">
      <style>{`
        .manage-goals-container {
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

        .manage-goals-container .page-header-box h2 {
          color: #FFFFFF;
        }

        .nav-tabs-custom {
          border-bottom: 2px solid #DCE8E1;
          margin-bottom: 24px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .nav-tab-btn {
          background: transparent;
          border: none;
          padding: 12px 20px;
          font-weight: 600;
          color: #5B6B63;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 6px 6px 0 0;
        }

        .nav-tab-btn:hover {
          color: #0B6045;
          background: rgba(11, 96, 69, 0.05);
        }

        .nav-tab-btn.active {
          color: #073B2A;
          border-bottom-color: #D4AF37;
          background: rgba(212, 175, 55, 0.08);
        }

        .btn-gold {
          background: #D4AF37;
          color: #FFFFFF;
          border: none;
          font-weight: 700;
        }

        .btn-gold:hover {
          background: #B8941F;
          color: #FFFFFF;
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

        /* Roadmap step visual preview box for admin */
        .roadmap-admin-card {
          background: #F5F8F6;
          border: 2px dashed #DCE8E1;
          border-radius: 14px;
          padding: 20px;
          position: relative;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }

        .roadmap-admin-card:hover {
          border-color: #D4AF37;
          background: #FFFFFF;
          box-shadow: 0 8px 25px rgba(7, 59, 42, 0.08);
        }

        .step-badge-admin {
          background: #073B2A;
          color: #D4AF37;
          font-weight: 800;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
        }
      `}</style>

      {/* Header Banner */}
      <div className="page-header-box d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <FaBullseye style={{ color: "#D4AF37" }} /> Manage Financial Goals Page
          </h2>
          <p className="mb-0 text-white-50 fs-6">
            Easily manage Pillars of Financial Planning and the Financial Goal Journey roadmap steps.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-gold btn-lg d-flex align-items-center gap-2 px-4 shadow-sm"
        >
          {saving ? <FaSpinner className="spinner-border spinner-border-sm" /> : <FaSave />}
          {saving ? "Saving..." : "Save All Changes"}
        </button>
      </div>

      {/* Alert Messages */}
      {message.text && (
        <div className={`alert alert-${message.type} alert-dismissible fade show rounded-3 mb-4`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ type: "", text: "" })}></button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="nav-tabs-custom">
        <button
          className={`nav-tab-btn ${activeTab === "pillars" ? "active" : ""}`}
          onClick={() => setActiveTab("pillars")}
        >
          Pillars of Financial Planning Cards ({pillars.length})
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "roadmap" ? "active" : ""}`}
          onClick={() => setActiveTab("roadmap")}
        >
          Financial Goal Journey Roadmap Steps ({journeySteps.length})
        </button>
      </div>

      {/* TAB 1: Pillars of Financial Planning Cards */}
      {activeTab === "pillars" && (
        <div>
          {/* Add New Pillar Form */}
          <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: "#F5F8F6", border: "1px solid #DCE8E1" }}>
            <div className="card-header bg-white fw-bold text-dark py-3" style={{ borderBottom: "2px solid #DCE8E1" }}>
              <FaPlus className="me-2" style={{ color: "#D4AF37" }} /> Add New Financial Goal Pillar Card
            </div>
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Pillar Title</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="e.g. Wealth Creation, Retirement Planning"
                    value={newPillar.title}
                    onChange={(e) => setNewPillar({ ...newPillar, title: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Icon</label>
                  <select
                    className="form-select rounded-3"
                    value={newPillar.icon}
                    onChange={(e) => setNewPillar({ ...newPillar, icon: e.target.value })}
                  >
                    {GOAL_ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold">Priority Order</label>
                  <input
                    type="number"
                    className="form-control rounded-3"
                    min="1"
                    value={newPillar.priority}
                    onChange={(e) => setNewPillar({ ...newPillar, priority: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control rounded-3"
                    rows="2"
                    placeholder="Summary of the goal pillar..."
                    value={newPillar.desc}
                    onChange={(e) => setNewPillar({ ...newPillar, desc: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Feature Bullet Points</label>
                  {newPillar.details.map((detail, dIdx) => (
                    <div key={dIdx} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Feature detail ${dIdx + 1}...`}
                        value={detail}
                        onChange={(e) => {
                          const updated = [...newPillar.details];
                          updated[dIdx] = e.target.value;
                          setNewPillar({ ...newPillar, details: updated });
                        }}
                      />
                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() => {
                          const updated = newPillar.details.filter((_, i) => i !== dIdx);
                          setNewPillar({ ...newPillar, details: updated });
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn btn-sm btn-outline-secondary mt-1"
                    type="button"
                    onClick={() => setNewPillar({ ...newPillar, details: [...newPillar.details, ""] })}
                  >
                    <FaPlus className="me-1" /> Add Bullet Point
                  </button>
                </div>
                <div className="col-12 text-end">
                  <button className="btn btn-green fw-bold px-4 shadow-sm" type="button" onClick={handleAddPillar}>
                    <FaPlus className="me-2" /> Add Pillar Card
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* List of Existing Pillars */}
          <h5 className="fw-bold mb-3" style={{ color: "#073B2A" }}>
            Existing Goal Pillars ({pillars.length})
          </h5>

          {pillars.map((pillar, pIdx) => (
            <div key={pIdx} className="card border-0 shadow-sm rounded-4 mb-3" style={{ border: "1px solid #DCE8E1" }}>
              <div className="card-body p-4">
                <div className="row g-3 align-items-center">
                  <div className="col-md-5">
                    <label className="form-label small fw-semibold text-muted mb-1">Title</label>
                    <input
                      type="text"
                      className="form-control fw-bold rounded-3"
                      value={pillar.title}
                      onChange={(e) => handlePillarFieldChange(pIdx, "title", e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-muted mb-1">Icon</label>
                    <select
                      className="form-select rounded-3"
                      value={pillar.icon || "FaChartLine"}
                      onChange={(e) => handlePillarFieldChange(pIdx, "icon", e.target.value)}
                    >
                      {GOAL_ICON_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-1 col-6">
                    <label className="form-label small fw-semibold text-muted mb-1">Priority</label>
                    <input
                      type="number"
                      className="form-control fw-bold text-center rounded-3"
                      min="1"
                      value={pillar.priority || pIdx + 1}
                      onChange={(e) => handlePillarFieldChange(pIdx, "priority", e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 col-6 text-end">
                    <label className="form-label small fw-semibold text-muted d-block mb-1">Action</label>
                    <button
                      className="btn btn-outline-danger w-100 rounded-3"
                      onClick={() => handleDeletePillar(pIdx)}
                    >
                      <FaTrash className="me-1" /> Delete
                    </button>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted mb-1">Description</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="2"
                      value={pillar.desc}
                      onChange={(e) => handlePillarFieldChange(pIdx, "desc", e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted mb-1">Feature Bullet Points</label>
                    {(pillar.details || []).map((detail, dIdx) => (
                      <div key={dIdx} className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={detail}
                          onChange={(e) => handlePillarDetailChange(pIdx, dIdx, e.target.value)}
                        />
                        <button
                          className="btn btn-outline-danger"
                          type="button"
                          onClick={() => handleRemovePillarDetail(pIdx, dIdx)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn btn-sm btn-outline-secondary mt-1"
                      type="button"
                      onClick={() => handleAddPillarDetail(pIdx)}
                    >
                      <FaPlus className="me-1" /> Add Bullet Point
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Financial Goal Journey Roadmap Steps */}
      {activeTab === "roadmap" && (
        <div>
          {/* Add New Journey Step Form */}
          <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: "#F5F8F6", border: "1px solid #DCE8E1" }}>
            <div className="card-header bg-white fw-bold text-dark py-3" style={{ borderBottom: "2px solid #DCE8E1" }}>
              <FaPlus className="me-2" style={{ color: "#D4AF37" }} /> Add New Journey Step (Roadmap Sequence)
            </div>
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-2">
                  <label className="form-label fw-semibold">Step Number</label>
                  <input
                    type="text"
                    className="form-control rounded-3 fw-bold text-center"
                    placeholder="e.g. 01, 02"
                    value={newStep.step}
                    onChange={(e) => setNewStep({ ...newStep, step: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Step Title</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="e.g. Goal Identification, Assessment"
                    value={newStep.name}
                    onChange={(e) => setNewStep({ ...newStep, name: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Icon</label>
                  <select
                    className="form-select rounded-3"
                    value={newStep.icon}
                    onChange={(e) => setNewStep({ ...newStep, icon: e.target.value })}
                  >
                    {GOAL_ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <label className="form-label fw-semibold">Priority Order</label>
                  <input
                    type="number"
                    className="form-control rounded-3 text-center"
                    min="1"
                    value={newStep.priority}
                    onChange={(e) => setNewStep({ ...newStep, priority: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Step Description / Instructions</label>
                  <textarea
                    className="form-control rounded-3"
                    rows="2"
                    placeholder="Describe what happens in this step..."
                    value={newStep.text}
                    onChange={(e) => setNewStep({ ...newStep, text: e.target.value })}
                  />
                </div>
                <div className="col-12 text-end">
                  <button className="btn btn-green fw-bold px-4 shadow-sm" type="button" onClick={handleAddStep}>
                    <FaPlus className="me-2" /> Add Roadmap Step
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Roadmap Visual Admin Flow */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0" style={{ color: "#073B2A" }}>
              Financial Goal Journey Roadmap Steps ({journeySteps.length})
            </h5>
            <small className="text-muted fw-semibold">Shown step number-wise on guest layout</small>
          </div>

          {journeySteps.map((step, sIdx) => (
            <div key={sIdx} className="roadmap-admin-card">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="step-badge-admin">
                  STEP {step.step || (sIdx + 1).toString().padStart(2, "0")}
                </span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteStep(sIdx)}
                >
                  <FaTrash className="me-1" /> Delete Step
                </button>
              </div>

              <div className="row g-3">
                <div className="col-md-2">
                  <label className="form-label small fw-semibold text-muted">Step #</label>
                  <input
                    type="text"
                    className="form-control fw-bold text-center rounded-3"
                    value={step.step}
                    onChange={(e) => handleStepFieldChange(sIdx, "step", e.target.value)}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-muted">Step Name / Title</label>
                  <input
                    type="text"
                    className="form-control fw-bold rounded-3"
                    value={step.name}
                    onChange={(e) => handleStepFieldChange(sIdx, "name", e.target.value)}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-muted">Icon</label>
                  <select
                    className="form-select rounded-3"
                    value={step.icon || "FaBullseye"}
                    onChange={(e) => handleStepFieldChange(sIdx, "icon", e.target.value)}
                  >
                    {GOAL_ICON_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-2">
                  <label className="form-label small fw-semibold text-muted">Priority</label>
                  <input
                    type="number"
                    className="form-control fw-bold text-center rounded-3"
                    min="1"
                    value={step.priority || sIdx + 1}
                    onChange={(e) => handleStepFieldChange(sIdx, "priority", e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-semibold text-muted">Step Description</label>
                  <textarea
                    className="form-control rounded-3"
                    rows="2"
                    value={step.text}
                    onChange={(e) => handleStepFieldChange(sIdx, "text", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Save Action */}
      <div className="d-flex justify-content-end mt-4 pt-3 border-top">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn btn-gold btn-lg d-flex align-items-center gap-2 px-4 shadow"
        >
          {saving ? <FaSpinner className="spinner-border spinner-border-sm" /> : <FaSave />}
          {saving ? "Saving Changes..." : "Save All Changes"}
        </button>
      </div>
    </div>
  );
};

export default ManageFinancialGoals;
