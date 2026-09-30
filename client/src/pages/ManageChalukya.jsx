import React, { useState, useEffect } from "react";
import { apiUrl } from "../api";
import {
  FaSave,
  FaPlus,
  FaTrash,
  FaMapMarkedAlt,
  FaSpinner
} from "react-icons/fa";

const CHALUKYA_ICON_OPTIONS = [
  { label: "Map / Location (FaMapMarkedAlt)", value: "FaMapMarkedAlt" },
  { label: "Tree / Agriculture (FaTree)", value: "FaTree" },
  { label: "Building / Commercial (FaBuilding)", value: "FaBuilding" },
  { label: "Contract / Legal (FaFileContract)", value: "FaFileContract" },
  { label: "Search / Requirement (FaSearch)", value: "FaSearch" },
  { label: "Layer / Plot Search (FaLayerGroup)", value: "FaLayerGroup" },
  { label: "Clipboard Check / Evaluation (FaClipboardCheck)", value: "FaClipboardCheck" },
  { label: "Handshake / Closing (FaHandshake)", value: "FaHandshake" }
];

const ManageChalukya = () => {
  const [activeTab, setActiveTab] = useState("solutions");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [landSolutions, setLandSolutions] = useState([]);
  const [whyConsider, setWhyConsider] = useState([]);
  const [landJourney, setLandJourney] = useState([]);

  // New Solution Form State
  const [newSolution, setNewSolution] = useState({
    title: "",
    desc: "",
    icon: "FaMapMarkedAlt",
    features: [""],
    priority: 1
  });

  // New Why Form State
  const [newWhy, setNewWhy] = useState({
    title: "",
    desc: "",
    priority: 1
  });

  // New Journey Step Form State
  const [newStep, setNewStep] = useState({
    step: "01",
    title: "",
    text: "",
    icon: "FaSearch",
    priority: 1
  });

  useEffect(() => {
    fetchChalukyaData();
  }, []);

  const fetchChalukyaData = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl("/api/chalukya"));
      const result = await res.json();

      if (res.ok && result.data) {
        setLandSolutions(result.data.landSolutions || []);
        setWhyConsider(result.data.whyConsider || []);
        setLandJourney(result.data.landJourney || []);
      } else {
        setMessage({ type: "danger", text: result.message || "Failed to load Chalukya Developers data." });
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
      const res = await fetch(apiUrl("/api/chalukya"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          landSolutions,
          whyConsider,
          landJourney
        })
      });

      const result = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "Chalukya Developers page content saved successfully!" });
        if (result.data) {
          setLandSolutions(result.data.landSolutions || []);
          setWhyConsider(result.data.whyConsider || []);
          setLandJourney(result.data.landJourney || []);
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

  // --- SOLUTIONS HANDLERS ---
  const handleAddSolution = () => {
    if (!newSolution.title.trim() || !newSolution.desc.trim()) {
      alert("Please enter Title and Description for the Land Solution.");
      return;
    }

    const cleanFeatures = newSolution.features.filter((f) => f.trim() !== "");
    const itemToAdd = {
      ...newSolution,
      features: cleanFeatures,
      priority: Number(newSolution.priority) || landSolutions.length + 1
    };

    const updatedList = [...landSolutions, itemToAdd].sort((a, b) => a.priority - b.priority);
    setLandSolutions(updatedList);

    setNewSolution({
      title: "",
      desc: "",
      icon: "FaMapMarkedAlt",
      features: [""],
      priority: landSolutions.length + 2
    });
  };

  const handleDeleteSolution = (index) => {
    setLandSolutions(landSolutions.filter((_, i) => i !== index));
  };

  const handleSolutionFieldChange = (index, field, value) => {
    const updated = [...landSolutions];
    updated[index] = {
      ...updated[index],
      [field]: field === "priority" ? Number(value) : value
    };

    if (field === "priority") {
      updated.sort((a, b) => a.priority - b.priority);
    }

    setLandSolutions(updated);
  };

  const handleFeatureChange = (solutionIndex, featureIndex, value) => {
    const updated = [...landSolutions];
    const features = [...updated[solutionIndex].features];
    features[featureIndex] = value;
    updated[solutionIndex].features = features;
    setLandSolutions(updated);
  };

  const handleAddFeature = (solutionIndex) => {
    const updated = [...landSolutions];
    updated[solutionIndex].features.push("");
    setLandSolutions(updated);
  };

  const handleRemoveFeature = (solutionIndex, featureIndex) => {
    const updated = [...landSolutions];
    updated[solutionIndex].features = updated[solutionIndex].features.filter((_, i) => i !== featureIndex);
    setLandSolutions(updated);
  };

  // --- WHY CONSIDER HANDLERS ---
  const handleAddWhy = () => {
    if (!newWhy.title.trim() || !newWhy.desc.trim()) {
      alert("Please enter Title and Description.");
      return;
    }

    const itemToAdd = {
      ...newWhy,
      priority: Number(newWhy.priority) || whyConsider.length + 1
    };

    const updatedList = [...whyConsider, itemToAdd].sort((a, b) => a.priority - b.priority);
    setWhyConsider(updatedList);

    setNewWhy({ title: "", desc: "", priority: whyConsider.length + 2 });
  };

  const handleDeleteWhy = (index) => {
    setWhyConsider(whyConsider.filter((_, i) => i !== index));
  };

  const handleWhyFieldChange = (index, field, value) => {
    const updated = [...whyConsider];
    updated[index] = {
      ...updated[index],
      [field]: field === "priority" ? Number(value) : value
    };

    if (field === "priority") {
      updated.sort((a, b) => a.priority - b.priority);
    }

    setWhyConsider(updated);
  };

  // --- JOURNEY HANDLERS ---
  const handleAddJourney = () => {
    if (!newStep.title.trim() || !newStep.text.trim()) {
      alert("Please enter Step Title and Description.");
      return;
    }

    const stepToAdd = {
      ...newStep,
      priority: Number(newStep.priority) || landJourney.length + 1
    };

    const updatedList = [...landJourney, stepToAdd].sort((a, b) => a.priority - b.priority);
    setLandJourney(updatedList);

    const nextStepNum = (landJourney.length + 2).toString().padStart(2, "0");
    setNewStep({
      step: nextStepNum,
      title: "",
      text: "",
      icon: "FaSearch",
      priority: landJourney.length + 2
    });
  };

  const handleDeleteJourney = (index) => {
    setLandJourney(landJourney.filter((_, i) => i !== index));
  };

  const handleJourneyFieldChange = (index, field, value) => {
    const updated = [...landJourney];
    updated[index] = {
      ...updated[index],
      [field]: field === "priority" ? Number(value) : value
    };

    if (field === "priority") {
      updated.sort((a, b) => a.priority - b.priority);
    }

    setLandJourney(updated);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5 text-center">
        <div>
          <FaSpinner className="spinner-border text-success mb-3 fs-2" style={{ color: "#0B6045" }} />
          <p className="fw-semibold" style={{ color: "#073B2A" }}>Loading Chalukya Developers settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-chalukya-container p-3 p-md-4">
      <style>{`
        .manage-chalukya-container {
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

        .manage-chalukya-container .page-header-box h2 {
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

        .roadmap-admin-card {
          background: #F5F8F6;
          border: 2px dashed #DCE8E1;
          border-radius: 14px;
          padding: 20px;
          position: relative;
          margin-bottom: 20px;
        }
      `}</style>

      {/* Header Banner */}
      <div className="page-header-box d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <FaMapMarkedAlt style={{ color: "#D4AF37" }} /> Manage Chalukya Developers
          </h2>
          <p className="mb-0 text-white-50 fs-6">
            Dynamically update About Chalukya Developers cards, Why Consider cards, and The Land Journey steps.
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
          className={`nav-tab-btn ${activeTab === "solutions" ? "active" : ""}`}
          onClick={() => setActiveTab("solutions")}
        >
          About Chalukya Land Solutions ({landSolutions.length})
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "why" ? "active" : ""}`}
          onClick={() => setActiveTab("why")}
        >
          Why Consider Chalukya Cards ({whyConsider.length})
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "journey" ? "active" : ""}`}
          onClick={() => setActiveTab("journey")}
        >
          The Land Journey Steps ({landJourney.length})
        </button>
      </div>

      {/* TAB 1: About Chalukya Land Solutions Cards */}
      {activeTab === "solutions" && (
        <div>
          {/* Add New Solution Form */}
          <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: "#F5F8F6", border: "1px solid #DCE8E1" }}>
            <div className="card-header bg-white fw-bold text-dark py-3" style={{ borderBottom: "2px solid #DCE8E1" }}>
              <FaPlus className="me-2" style={{ color: "#D4AF37" }} /> Add New Land Solution Card
            </div>
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Solution Title</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="e.g. Residential Plots, Legal Support"
                    value={newSolution.title}
                    onChange={(e) => setNewSolution({ ...newSolution, title: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Icon</label>
                  <select
                    className="form-select rounded-3"
                    value={newSolution.icon}
                    onChange={(e) => setNewSolution({ ...newSolution, icon: e.target.value })}
                  >
                    {CHALUKYA_ICON_OPTIONS.map((opt) => (
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
                    value={newSolution.priority}
                    onChange={(e) => setNewSolution({ ...newSolution, priority: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Description</label>
                  <textarea
                    className="form-control rounded-3"
                    rows="2"
                    placeholder="Short description..."
                    value={newSolution.desc}
                    onChange={(e) => setNewSolution({ ...newSolution, desc: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Feature Checklist Bullet Points</label>
                  {newSolution.features.map((feat, fIdx) => (
                    <div key={fIdx} className="input-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Feature ${fIdx + 1}...`}
                        value={feat}
                        onChange={(e) => {
                          const updated = [...newSolution.features];
                          updated[fIdx] = e.target.value;
                          setNewSolution({ ...newSolution, features: updated });
                        }}
                      />
                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() => {
                          const updated = newSolution.features.filter((_, i) => i !== fIdx);
                          setNewSolution({ ...newSolution, features: updated });
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn btn-sm btn-outline-secondary mt-1"
                    type="button"
                    onClick={() => setNewSolution({ ...newSolution, features: [...newSolution.features, ""] })}
                  >
                    <FaPlus className="me-1" /> Add Feature Point
                  </button>
                </div>
                <div className="col-12 text-end">
                  <button className="btn btn-green fw-bold px-4 shadow-sm" type="button" onClick={handleAddSolution}>
                    <FaPlus className="me-2" /> Add Land Solution
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* List of Existing Solutions */}
          <h5 className="fw-bold mb-3" style={{ color: "#073B2A" }}>Existing Land Solutions ({landSolutions.length})</h5>
          {landSolutions.map((sol, sIdx) => (
            <div key={sIdx} className="card border-0 shadow-sm rounded-4 mb-3" style={{ border: "1px solid #DCE8E1" }}>
              <div className="card-body p-4">
                <div className="row g-3 align-items-center">
                  <div className="col-md-5">
                    <label className="form-label small fw-semibold text-muted mb-1">Title</label>
                    <input
                      type="text"
                      className="form-control fw-bold rounded-3"
                      value={sol.title}
                      onChange={(e) => handleSolutionFieldChange(sIdx, "title", e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-muted mb-1">Icon</label>
                    <select
                      className="form-select rounded-3"
                      value={sol.icon || "FaMapMarkedAlt"}
                      onChange={(e) => handleSolutionFieldChange(sIdx, "icon", e.target.value)}
                    >
                      {CHALUKYA_ICON_OPTIONS.map((opt) => (
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
                      value={sol.priority || sIdx + 1}
                      onChange={(e) => handleSolutionFieldChange(sIdx, "priority", e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 col-6 text-end">
                    <label className="form-label small fw-semibold text-muted d-block mb-1">Action</label>
                    <button
                      className="btn btn-outline-danger w-100 rounded-3"
                      onClick={() => handleDeleteSolution(sIdx)}
                    >
                      <FaTrash className="me-1" /> Delete
                    </button>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted mb-1">Description</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="2"
                      value={sol.desc}
                      onChange={(e) => handleSolutionFieldChange(sIdx, "desc", e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted mb-1">Features Checklist</label>
                    {(sol.features || []).map((feat, fIdx) => (
                      <div key={fIdx} className="input-group mb-2">
                        <input
                          type="text"
                          className="form-control"
                          value={feat}
                          onChange={(e) => handleFeatureChange(sIdx, fIdx, e.target.value)}
                        />
                        <button
                          className="btn btn-outline-danger"
                          type="button"
                          onClick={() => handleRemoveFeature(sIdx, fIdx)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn btn-sm btn-outline-secondary mt-1"
                      type="button"
                      onClick={() => handleAddFeature(sIdx)}
                    >
                      <FaPlus className="me-1" /> Add Feature Point
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Why Consider Chalukya Cards */}
      {activeTab === "why" && (
        <div>
          {/* Add New Why Card */}
          <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: "#F5F8F6", border: "1px solid #DCE8E1" }}>
            <div className="card-header bg-white fw-bold text-dark py-3" style={{ borderBottom: "2px solid #DCE8E1" }}>
              <FaPlus className="me-2" style={{ color: "#D4AF37" }} /> Add New Why Consider Card
            </div>
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label fw-semibold">Card Title</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="e.g. Land-Focused Assistance"
                    value={newWhy.title}
                    onChange={(e) => setNewWhy({ ...newWhy, title: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Priority Order</label>
                  <input
                    type="number"
                    className="form-control rounded-3"
                    min="1"
                    value={newWhy.priority}
                    onChange={(e) => setNewWhy({ ...newWhy, priority: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Card Description</label>
                  <textarea
                    className="form-control rounded-3"
                    rows="2"
                    placeholder="Describe why clients should choose Chalukya..."
                    value={newWhy.desc}
                    onChange={(e) => setNewWhy({ ...newWhy, desc: e.target.value })}
                  />
                </div>
                <div className="col-12 text-end">
                  <button className="btn btn-green fw-bold px-4 shadow-sm" type="button" onClick={handleAddWhy}>
                    <FaPlus className="me-2" /> Add Card
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* List of Existing Why Cards */}
          <h5 className="fw-bold mb-3" style={{ color: "#073B2A" }}>Why Consider Cards ({whyConsider.length})</h5>
          {whyConsider.map((w, wIdx) => (
            <div key={wIdx} className="card border-0 shadow-sm rounded-4 mb-3" style={{ border: "1px solid #DCE8E1" }}>
              <div className="card-body p-4">
                <div className="row g-3 align-items-center">
                  <div className="col-md-8">
                    <label className="form-label small fw-semibold text-muted mb-1">Title</label>
                    <input
                      type="text"
                      className="form-control fw-bold rounded-3"
                      value={w.title}
                      onChange={(e) => handleWhyFieldChange(wIdx, "title", e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 col-6">
                    <label className="form-label small fw-semibold text-muted mb-1">Priority</label>
                    <input
                      type="number"
                      className="form-control fw-bold text-center rounded-3"
                      min="1"
                      value={w.priority || wIdx + 1}
                      onChange={(e) => handleWhyFieldChange(wIdx, "priority", e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 col-6 text-end">
                    <label className="form-label small fw-semibold text-muted d-block mb-1">Action</label>
                    <button
                      className="btn btn-outline-danger w-100 rounded-3"
                      onClick={() => handleDeleteWhy(wIdx)}
                    >
                      <FaTrash className="me-1" /> Delete
                    </button>
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted mb-1">Description</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="2"
                      value={w.desc}
                      onChange={(e) => handleWhyFieldChange(wIdx, "desc", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: The Land Journey Steps */}
      {activeTab === "journey" && (
        <div>
          {/* Add New Journey Step */}
          <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: "#F5F8F6", border: "1px solid #DCE8E1" }}>
            <div className="card-header bg-white fw-bold text-dark py-3" style={{ borderBottom: "2px solid #DCE8E1" }}>
              <FaPlus className="me-2" style={{ color: "#D4AF37" }} /> Add New Land Journey Step
            </div>
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-2">
                  <label className="form-label fw-semibold">Step Number</label>
                  <input
                    type="text"
                    className="form-control rounded-3 text-center fw-bold"
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
                    placeholder="e.g. Requirement, Documentation"
                    value={newStep.title}
                    onChange={(e) => setNewStep({ ...newStep, title: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Icon</label>
                  <select
                    className="form-select rounded-3"
                    value={newStep.icon}
                    onChange={(e) => setNewStep({ ...newStep, icon: e.target.value })}
                  >
                    {CHALUKYA_ICON_OPTIONS.map((opt) => (
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
                  <label className="form-label fw-semibold">Step Description</label>
                  <textarea
                    className="form-control rounded-3"
                    rows="2"
                    placeholder="Step process instructions..."
                    value={newStep.text}
                    onChange={(e) => setNewStep({ ...newStep, text: e.target.value })}
                  />
                </div>
                <div className="col-12 text-end">
                  <button className="btn btn-green fw-bold px-4 shadow-sm" type="button" onClick={handleAddJourney}>
                    <FaPlus className="me-2" /> Add Journey Step
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* List of Existing Journey Steps */}
          <h5 className="fw-bold mb-3" style={{ color: "#073B2A" }}>The Land Journey Steps ({landJourney.length})</h5>
          {landJourney.map((j, jIdx) => (
            <div key={jIdx} className="roadmap-admin-card">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-success px-3 py-2 fs-6">
                  STEP {j.step || (jIdx + 1).toString().padStart(2, "0")}
                </span>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteJourney(jIdx)}
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
                    value={j.step}
                    onChange={(e) => handleJourneyFieldChange(jIdx, "step", e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-muted">Step Title</label>
                  <input
                    type="text"
                    className="form-control fw-bold rounded-3"
                    value={j.title}
                    onChange={(e) => handleJourneyFieldChange(jIdx, "title", e.target.value)}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-semibold text-muted">Icon</label>
                  <select
                    className="form-select rounded-3"
                    value={j.icon || "FaSearch"}
                    onChange={(e) => handleJourneyFieldChange(jIdx, "icon", e.target.value)}
                  >
                    {CHALUKYA_ICON_OPTIONS.map((opt) => (
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
                    value={j.priority || jIdx + 1}
                    onChange={(e) => handleJourneyFieldChange(jIdx, "priority", e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-semibold text-muted">Description</label>
                  <textarea
                    className="form-control rounded-3"
                    rows="2"
                    value={j.text}
                    onChange={(e) => handleJourneyFieldChange(jIdx, "text", e.target.value)}
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

export default ManageChalukya;
