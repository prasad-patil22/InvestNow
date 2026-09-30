import React, { useState, useEffect } from "react";
import { apiUrl } from "../api";
import {
  FaSave,
  FaPlus,
  FaTrash,
  FaInfoCircle,
  FaSpinner
} from "react-icons/fa";

const ICON_OPTIONS = [
  { label: "Shield / Trust (FaShieldAlt)", value: "FaShieldAlt" },
  { label: "Eye / Transparency (FaEye)", value: "FaEye" },
  { label: "Handshake / Integrity (FaHandshake)", value: "FaHandshake" },
  { label: "User Check / Focus (FaUserCheck)", value: "FaUserCheck" },
  { label: "User Tie / Professional (FaUserTie)", value: "FaUserTie" },
  { label: "Chart / Growth (FaChartLine)", value: "FaChartLine" },
  { label: "Briefcase / Solutions (FaBriefcase)", value: "FaBriefcase" },
  { label: "Bullseye / Target (FaBullseye)", value: "FaBullseye" },
  { label: "Users / Family (FaUsers)", value: "FaUsers" },
  { label: "Lightbulb / Ideas (FaLightbulb)", value: "FaLightbulb" },
  { label: "Building / Corporate (FaBuilding)", value: "FaBuilding" },
  { label: "Home / Property (FaHome)", value: "FaHome" },
  { label: "Check Circle / Mission (FaCheckCircle)", value: "FaCheckCircle" }
];

const ManageAboutUs = () => {
  const [activeTab, setActiveTab] = useState("visionMission");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [vision, setVision] = useState("");
  const [mission, setMission] = useState([]);
  const [newMissionItem, setNewMissionItem] = useState("");

  const [coreValues, setCoreValues] = useState([]);
  const [whyChooseUs, setWhyChooseUs] = useState([]);
  const [whoWeServe, setWhoWeServe] = useState([]);

  // Card Form State for Adding New Cards
  const [newCard, setNewCard] = useState({
    title: "",
    desc: "",
    icon: "FaShieldAlt",
    priority: 1
  });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const res = await fetch(apiUrl("/api/about"));
      const result = await res.json();

      if (res.ok && result.data) {
        setVision(result.data.vision || "");
        setMission(result.data.mission || []);
        setCoreValues(result.data.coreValues || []);
        setWhyChooseUs(result.data.whyChooseUs || []);
        setWhoWeServe(result.data.whoWeServe || []);
      } else {
        setMessage({ type: "danger", text: result.message || "Failed to load About Us data." });
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
      const res = await fetch(apiUrl("/api/about"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          vision,
          mission,
          coreValues,
          whyChooseUs,
          whoWeServe
        })
      });

      const result = await res.json();

      if (res.ok) {
        setMessage({ type: "success", text: "About Us page content saved successfully!" });
        if (result.data) {
          setVision(result.data.vision || "");
          setMission(result.data.mission || []);
          setCoreValues(result.data.coreValues || []);
          setWhyChooseUs(result.data.whyChooseUs || []);
          setWhoWeServe(result.data.whoWeServe || []);
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

  // Mission Handlers
  const handleAddMission = () => {
    if (!newMissionItem.trim()) return;
    setMission([...mission, newMissionItem.trim()]);
    setNewMissionItem("");
  };

  const handleRemoveMission = (index) => {
    setMission(mission.filter((_, i) => i !== index));
  };

  const handleMissionChange = (index, value) => {
    const updated = [...mission];
    updated[index] = value;
    setMission(updated);
  };

  // Card Management Helper Functions
  const getListByTab = () => {
    if (activeTab === "coreValues") return coreValues;
    if (activeTab === "whyChooseUs") return whyChooseUs;
    if (activeTab === "whoWeServe") return whoWeServe;
    return [];
  };

  const setListByTab = (newList) => {
    if (activeTab === "coreValues") setCoreValues(newList);
    if (activeTab === "whyChooseUs") setWhyChooseUs(newList);
    if (activeTab === "whoWeServe") setWhoWeServe(newList);
  };

  const handleAddCard = () => {
    if (!newCard.title.trim() || !newCard.desc.trim()) {
      alert("Please provide both Title and Description for the card.");
      return;
    }

    const currentList = getListByTab();
    const cardToAdd = { ...newCard, priority: Number(newCard.priority) || currentList.length + 1 };
    
    // Auto sort by priority
    const updatedList = [...currentList, cardToAdd].sort((a, b) => a.priority - b.priority);
    setListByTab(updatedList);

    setNewCard({ title: "", desc: "", icon: "FaShieldAlt", priority: currentList.length + 2 });
  };

  const handleDeleteCard = (index) => {
    const currentList = getListByTab();
    const updatedList = currentList.filter((_, i) => i !== index);
    setListByTab(updatedList);
  };

  const handleCardFieldChange = (index, field, value) => {
    const currentList = getListByTab();
    const updatedList = [...currentList];
    updatedList[index] = {
      ...updatedList[index],
      [field]: field === "priority" ? Number(value) : value
    };
    
    // Sort automatically if priority changes
    if (field === "priority") {
      updatedList.sort((a, b) => a.priority - b.priority);
    }
    
    setListByTab(updatedList);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5 text-center">
        <div>
          <FaSpinner className="spinner-border text-success mb-3 fs-2" style={{ color: "#0B6045" }} />
          <p className="fw-semibold" style={{ color: "#073B2A" }}>Loading About Us page management settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="manage-about-container p-3 p-md-4">
      <style>{`
        .manage-about-container {
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

        .page-header-box h2 {
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

        .card-item-box {
          background: #F5F8F6;
          border: 1px solid #DCE8E1;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          transition: border-color 0.2s ease;
        }

        .card-item-box:hover {
          border-color: #D4AF37;
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
      `}</style>

      {/* Header Banner */}
      <div className="page-header-box d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h2 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <FaInfoCircle style={{ color: "#D4AF37" }} /> Manage About Us Page Content
          </h2>
          <p className="mb-0 text-white-50 fs-6">
            Dynamically update Vision, Mission, Core Values, Why Partner With Us, and Who We Serve sections for guest visitors.
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
          className={`nav-tab-btn ${activeTab === "visionMission" ? "active" : ""}`}
          onClick={() => setActiveTab("visionMission")}
        >
          Vision & Mission
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "coreValues" ? "active" : ""}`}
          onClick={() => setActiveTab("coreValues")}
        >
          Core Values Cards ({coreValues.length})
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "whyChooseUs" ? "active" : ""}`}
          onClick={() => setActiveTab("whyChooseUs")}
        >
          Why Partner With Us Cards ({whyChooseUs.length})
        </button>
        <button
          className={`nav-tab-btn ${activeTab === "whoWeServe" ? "active" : ""}`}
          onClick={() => setActiveTab("whoWeServe")}
        >
          Who We Serve Cards ({whoWeServe.length})
        </button>
      </div>

      {/* TAB 1: Vision & Mission */}
      {activeTab === "visionMission" && (
        <div>
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-light fw-bold text-dark py-3" style={{ borderBottom: "2px solid #DCE8E1" }}>
              1. Our Vision Statement
            </div>
            <div className="card-body p-4">
              <label className="form-label fw-semibold text-dark">Vision Text</label>
              <textarea
                className="form-control form-control-lg rounded-3 fs-6"
                rows="3"
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                placeholder="Enter vision statement..."
              />
            </div>
          </div>

          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-header bg-light fw-bold text-dark py-3" style={{ borderBottom: "2px solid #DCE8E1" }}>
              2. Our Mission Bullet Points
            </div>
            <div className="card-body p-4">
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control form-control-lg rounded-3 fs-6"
                  placeholder="Add a new mission statement point..."
                  value={newMissionItem}
                  onChange={(e) => setNewMissionItem(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddMission();
                    }
                  }}
                />
                <button className="btn btn-green px-4 fw-bold" type="button" onClick={handleAddMission}>
                  <FaPlus className="me-1" /> Add Point
                </button>
              </div>

              <div className="mission-list-wrapper">
                {mission.length === 0 ? (
                  <p className="text-muted fst-italic">No mission points added yet.</p>
                ) : (
                  mission.map((item, index) => (
                    <div key={index} className="input-group mb-2 shadow-sm rounded-3">
                      <span className="input-group-text bg-white text-muted fw-bold">{index + 1}</span>
                      <input
                        type="text"
                        className="form-control fs-6"
                        value={item}
                        onChange={(e) => handleMissionChange(index, e.target.value)}
                      />
                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() => handleRemoveMission(index)}
                        title="Delete Point"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2, 3, 4: Card Management */}
      {activeTab !== "visionMission" && (
        <div>
          {/* Add New Card Box */}
          <div className="card border-0 shadow-sm rounded-4 mb-4" style={{ background: "#F5F8F6", border: "1px solid #DCE8E1" }}>
            <div className="card-header bg-white fw-bold text-dark py-3" style={{ borderBottom: "2px solid #DCE8E1" }}>
              <FaPlus className="me-2 text-warning" style={{ color: "#D4AF37" }} />
              Add New Card to {activeTab === "coreValues" ? "Core Values" : activeTab === "whyChooseUs" ? "Why Partner With Us" : "Who We Serve"}
            </div>
            <div className="card-body p-4">
              <div className="row g-3">
                <div className="col-md-5">
                  <label className="form-label fw-semibold">Card Title</label>
                  <input
                    type="text"
                    className="form-control rounded-3"
                    placeholder="e.g. Integrity, Experienced Guidance"
                    value={newCard.title}
                    onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Icon</label>
                  <select
                    className="form-select rounded-3"
                    value={newCard.icon}
                    onChange={(e) => setNewCard({ ...newCard, icon: e.target.value })}
                  >
                    {ICON_OPTIONS.map((opt) => (
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
                    value={newCard.priority}
                    onChange={(e) => setNewCard({ ...newCard, priority: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold">Card Description</label>
                  <textarea
                    className="form-control rounded-3"
                    rows="2"
                    placeholder="Short descriptive summary..."
                    value={newCard.desc}
                    onChange={(e) => setNewCard({ ...newCard, desc: e.target.value })}
                  />
                </div>
                <div className="col-12 text-end">
                  <button className="btn btn-green fw-bold px-4 shadow-sm" type="button" onClick={handleAddCard}>
                    <FaPlus className="me-2" /> Add Card
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* List of Existing Cards */}
          <h5 className="fw-bold mb-3" style={{ color: "#073B2A" }}>
            Existing Cards ({getListByTab().length})
          </h5>

          {getListByTab().length === 0 ? (
            <div className="text-center p-4 bg-light rounded-4 text-muted">
              No cards added in this section yet. Use the form above to add your first card.
            </div>
          ) : (
            getListByTab().map((card, idx) => (
              <div key={idx} className="card-item-box">
                <div className="row g-3 align-items-center">
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-muted mb-1">Card Title</label>
                    <input
                      type="text"
                      className="form-control rounded-3 fw-bold"
                      value={card.title}
                      onChange={(e) => handleCardFieldChange(idx, "title", e.target.value)}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small fw-semibold text-muted mb-1">Icon</label>
                    <select
                      className="form-select rounded-3"
                      value={card.icon || "FaShieldAlt"}
                      onChange={(e) => handleCardFieldChange(idx, "icon", e.target.value)}
                    >
                      {ICON_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-2 col-6">
                    <label className="form-label small fw-semibold text-muted mb-1">Priority Order</label>
                    <input
                      type="number"
                      className="form-control rounded-3 fw-bold text-center"
                      min="1"
                      value={card.priority || idx + 1}
                      onChange={(e) => handleCardFieldChange(idx, "priority", e.target.value)}
                    />
                  </div>

                  <div className="col-md-2 col-6 text-end">
                    <label className="form-label small fw-semibold text-muted d-block mb-1">Action</label>
                    <button
                      type="button"
                      className="btn btn-outline-danger w-100 rounded-3 d-flex align-items-center justify-content-center gap-1"
                      onClick={() => handleDeleteCard(idx)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-semibold text-muted mb-1">Description</label>
                    <textarea
                      className="form-control rounded-3"
                      rows="2"
                      value={card.desc}
                      onChange={(e) => handleCardFieldChange(idx, "desc", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))
          )}
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

export default ManageAboutUs;
