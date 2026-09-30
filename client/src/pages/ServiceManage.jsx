import React, { useEffect, useState, useMemo } from "react";
import { apiUrl } from "../api";
import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaSearch,
  FaCheckCircle,
  FaMoneyCheckAlt,
  FaShieldAlt,
  FaChartPie,
  FaCoins,
  FaChartLine,
  FaBriefcase,
  FaBuilding,
  FaUniversity,
  FaMapMarkedAlt,
  FaUserTie,
  FaThLarge,
  FaList,
  FaTimes,
  FaExternalLinkAlt,
  FaLayerGroup,
  FaCheck
} from "react-icons/fa";

const API_URL = apiUrl("/api/services");

// Icon presets for quick selection
const ICON_PRESETS = [
  { label: "Loans", key: "loan", icon: <FaMoneyCheckAlt /> },
  { label: "Insurance", key: "insurance", icon: <FaShieldAlt /> },
  { label: "Mutual Funds", key: "mutual-funds", icon: <FaChartPie /> },
  { label: "Wealth", key: "wealth", icon: <FaCoins /> },
  { label: "Stocks", key: "stocks", icon: <FaChartLine /> },
  { label: "Portfolio", key: "portfolio", icon: <FaBriefcase /> },
  { label: "Corporate", key: "corporate", icon: <FaBuilding /> },
  { label: "Banking", key: "banking", icon: <FaUniversity /> },
  { label: "Land Links", key: "land-links", icon: <FaMapMarkedAlt /> },
  { label: "Consultation", key: "consultation", icon: <FaUserTie /> },
];

const renderIconHelper = (iconInput) => {
  if (!iconInput) return <FaBriefcase />;
  const key = String(iconInput).toLowerCase().trim();
  if (key.includes("loan") || key.includes("money") || key.includes("famoneycheckalt")) return <FaMoneyCheckAlt />;
  if (key.includes("shield") || key.includes("insurance") || key.includes("fashieldalt")) return <FaShieldAlt />;
  if (key.includes("mutual") || key.includes("pie") || key.includes("fachartpie")) return <FaChartPie />;
  if (key.includes("wealth") || key.includes("coin") || key.includes("facoins")) return <FaCoins />;
  if (key.includes("stock") || key.includes("equity") || key.includes("fachartline")) return <FaChartLine />;
  if (key.includes("port") || key.includes("brief") || key.includes("fabriefcase")) return <FaBriefcase />;
  if (key.includes("corp") || key.includes("build") || key.includes("fabuilding")) return <FaBuilding />;
  if (key.includes("bank") || key.includes("univ") || key.includes("fauniversity")) return <FaUniversity />;
  if (key.includes("land") || key.includes("map") || key.includes("famapmarkedalt")) return <FaMapMarkedAlt />;
  if (key.includes("consult") || key.includes("user") || key.includes("fausertie")) return <FaUserTie />;
  if (iconInput.length <= 4) return <span style={{ fontSize: "18px" }}>{iconInput}</span>;
  return <FaBriefcase />;
};

const ServiceManage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'table'
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    icon: "",
    description: "",
    features: [""],
    learnMoreLink: "",
  });

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem("adminToken");
    const headers = { "Content-Type": "application/json" };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  };

  // ===============================
  // FETCH ALL SERVICES
  // ===============================
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.success && Array.isArray(data.services)) {
        setServices(data.services);
      } else {
        showNotification("error", data.message || "Failed to fetch services");
      }
    } catch (error) {
      console.error("Fetch Services Error:", error);
      showNotification("error", "Unable to connect to server. Check backend status.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filtered Services by Search
  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return services;
    const q = searchQuery.toLowerCase().trim();
    return services.filter((s) => {
      const matchTitle = s.title?.toLowerCase().includes(q);
      const matchDesc = s.description?.toLowerCase().includes(q);
      const matchFeatures = s.features?.some((f) => f.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchFeatures;
    });
  }, [services, searchQuery]);

  // Statistics
  const totalFeaturesCount = useMemo(() => {
    return services.reduce((acc, curr) => acc + (curr.features?.length || 0), 0);
  }, [services]);

  // ===============================
  // FORM HANDLERS
  // ===============================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectPresetIcon = (key) => {
    setFormData((prev) => ({
      ...prev,
      icon: key,
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData((prev) => ({
      ...prev,
      features: updated,
    }));
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    if (formData.features.length === 1) return;
    const updated = formData.features.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      features: updated,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      icon: "",
      description: "",
      features: [""],
      learnMoreLink: "",
    });
    setEditingId(null);
  };

  // ===============================
  // ADD / UPDATE SERVICE
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      showNotification("error", "Service Title is required.");
      return;
    }

    if (!formData.description.trim()) {
      showNotification("error", "Service Description is required.");
      return;
    }

    const cleanedFeatures = formData.features
      .map((f) => f.trim())
      .filter((f) => f !== "");

    if (cleanedFeatures.length === 0) {
      showNotification("error", "Please add at least one feature item.");
      return;
    }

    const serviceData = {
      title: formData.title.trim(),
      icon: formData.icon.trim() || "FaBriefcase",
      description: formData.description.trim(),
      features: cleanedFeatures,
      learnMoreLink: formData.learnMoreLink.trim() || "#",
    };

    try {
      setLoading(true);

      let response;
      if (editingId) {
        response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(serviceData),
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(serviceData),
        });
      }

      const data = await response.json();

      if (data.success) {
        const msg = editingId
          ? `Service "${serviceData.title}" updated successfully!`
          : `Service "${serviceData.title}" created successfully!`;
        showNotification("success", msg);

        resetForm();
        fetchServices();
      } else {
        showNotification("error", data.message || "Failed to save service");
      }
    } catch (error) {
      console.error("Save Error:", error);
      showNotification("error", "Failed to communicate with server");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // EDIT SERVICE
  // ===============================
  const handleEdit = (service) => {
    setEditingId(service._id);
    setFormData({
      title: service.title || "",
      icon: service.icon || "",
      description: service.description || "",
      features:
        service.features && service.features.length > 0
          ? [...service.features]
          : [""],
      learnMoreLink: service.learnMoreLink || "",
    });

    const formElement = document.getElementById("service-form-card");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // ===============================
  // DELETE SERVICE
  // ===============================
  const confirmDelete = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const data = await response.json();

      if (data.success) {
        showNotification("success", "Service deleted successfully!");
        if (editingId === id) resetForm();
        setDeleteConfirmId(null);
        fetchServices();
      } else {
        showNotification("error", data.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Delete Error:", error);
      showNotification("error", "Error deleting service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-services-dashboard">
      <style>{`
        .admin-services-dashboard {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #17231E;
          max-width: 1300px;
          margin: 0 auto;
        }

        /* Top Header */
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .header-title-block h1 {
          font-size: 28px;
          font-weight: 800;
          color: #073B2A;
          margin: 0 0 6px 0;
          letter-spacing: -0.5px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .header-badge {
          background: rgba(212, 175, 55, 0.15);
          color: #997819;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .header-subtitle {
          font-size: 14px;
          color: #5B6B63;
          margin: 0;
        }

        /* Stats Strip */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: #FFFFFF;
          border: 1px solid #DCE8E1;
          border-radius: 16px;
          padding: 22px 24px;
          display: flex;
          align-items: center;
          gap: 18px;
          box-shadow: 0 4px 16px rgba(7, 59, 42, 0.04);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: #0B6045;
          border-radius: 4px 0 0 4px;
        }

        .stat-card.gold::after {
          background: #D4AF37;
        }

        .stat-card.accent::after {
          background: #17231E;
        }

        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(7, 59, 42, 0.08);
          border-color: #D4AF37;
        }

        .stat-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: rgba(7, 59, 42, 0.08);
          color: #073B2A;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        .stat-card.gold .stat-icon {
          background: rgba(212, 175, 55, 0.15);
          color: #997819;
        }

        .stat-card.accent .stat-icon {
          background: rgba(23, 35, 30, 0.08);
          color: #17231E;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 800;
          color: #073B2A;
          line-height: 1.1;
          margin-bottom: 2px;
        }

        .stat-label {
          font-size: 13px;
          font-weight: 600;
          color: #5B6B63;
          margin: 0;
        }

        /* Toast Notification */
        .toast-banner {
          padding: 14px 20px;
          border-radius: 12px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
          animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .toast-banner.success {
          background: linear-gradient(135deg, #E6F4EA, #D4EDDA);
          color: #137333;
          border: 1px solid #C3E6CB;
        }

        .toast-banner.error {
          background: linear-gradient(135deg, #FCE8E6, #F8D7DA);
          color: #C5221F;
          border: 1px solid #F5C6CB;
        }

        /* Form Card */
        .service-form-card {
          background: #FFFFFF;
          border-radius: 18px;
          border: 1px solid #DCE8E1;
          padding: 32px;
          margin-bottom: 35px;
          box-shadow: 0 6px 24px rgba(7, 59, 42, 0.04);
          transition: border-color 0.3s ease;
          position: relative;
        }

        .service-form-card.editing {
          border-color: #D4AF37;
          box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
        }

        .form-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 26px;
          padding-bottom: 18px;
          border-bottom: 1px solid #EEF3F0;
        }

        .form-title-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .form-title {
          font-size: 20px;
          font-weight: 800;
          color: #073B2A;
          margin: 0;
        }

        .mode-pill {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.8px;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .mode-pill.create {
          background: rgba(11, 96, 69, 0.1);
          color: #0B6045;
        }

        .mode-pill.edit {
          background: rgba(212, 175, 55, 0.2);
          color: #997819;
        }

        .cancel-edit-btn {
          background: #F5F8F6;
          color: #5B6B63;
          border: 1px solid #DCE8E1;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-edit-btn:hover {
          background: #E8EFEA;
          color: #17231E;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .form-group {
          margin-bottom: 22px;
        }

        .form-group.span-2 {
          grid-column: 1 / -1;
        }

        .field-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          font-weight: 700;
          color: #073B2A;
          margin-bottom: 8px;
        }

        .field-input,
        .field-textarea {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #DCE8E1;
          background: #FAFCFB;
          font-size: 14px;
          color: #17231E;
          box-sizing: border-box;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .field-input:focus,
        .field-textarea:focus {
          outline: none;
          background: #FFFFFF;
          border-color: #0B6045;
          box-shadow: 0 0 0 3px rgba(11, 96, 69, 0.12);
        }

        /* Preset Icon Selector */
        .icon-selector-section {
          margin-top: 10px;
        }

        .preset-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 8px;
        }

        .preset-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid #DCE8E1;
          background: #FFFFFF;
          color: #5B6B63;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .preset-chip:hover {
          background: #F5F8F6;
          border-color: #0B6045;
          color: #073B2A;
        }

        .preset-chip.active {
          background: #073B2A;
          border-color: #073B2A;
          color: #D4AF37;
        }

        /* Dynamic Features Builder */
        .feature-rows-container {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .feature-input-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .feature-num-badge {
          width: 32px;
          height: 38px;
          border-radius: 8px;
          background: rgba(7, 59, 42, 0.06);
          color: #073B2A;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .feature-delete-btn {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #FFF1F0;
          color: #D64545;
          border: 1px solid #FAD2CF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 13px;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .feature-delete-btn:hover {
          background: #D64545;
          color: #FFFFFF;
        }

        .add-feature-pill-btn {
          background: rgba(11, 96, 69, 0.08);
          color: #0B6045;
          border: 1px dashed #0B6045;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          align-self: flex-start;
          margin-top: 6px;
        }

        .add-feature-pill-btn:hover {
          background: #0B6045;
          color: #FFFFFF;
        }

        /* Form Actions */
        .form-cta-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 15px;
          padding-top: 20px;
          border-top: 1px solid #EEF3F0;
        }

        .btn-primary-action {
          background: linear-gradient(135deg, #073B2A 0%, #0B6045 100%);
          color: #FFFFFF;
          border: none;
          padding: 13px 28px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 4px 14px rgba(7, 59, 42, 0.2);
          transition: all 0.25s ease;
        }

        .btn-primary-action:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(7, 59, 42, 0.25);
          background: linear-gradient(135deg, #052D20 0%, #073B2A 100%);
        }

        .btn-primary-action:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn-ghost-action {
          background: #F5F8F6;
          color: #5B6B63;
          border: 1px solid #DCE8E1;
          padding: 13px 24px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-ghost-action:hover {
          background: #E8EFEA;
          color: #17231E;
        }

        /* Services List Section */
        .services-display-card {
          background: #FFFFFF;
          border-radius: 18px;
          border: 1px solid #DCE8E1;
          padding: 30px;
          box-shadow: 0 6px 24px rgba(7, 59, 42, 0.04);
        }

        .list-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .toolbar-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .toolbar-left h2 {
          font-size: 20px;
          font-weight: 800;
          color: #073B2A;
          margin: 0;
        }

        .count-pill {
          background: rgba(7, 59, 42, 0.06);
          color: #073B2A;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }

        .toolbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-box {
          position: relative;
          min-width: 260px;
        }

        .search-box input {
          width: 100%;
          padding: 9px 14px 9px 36px;
          border-radius: 8px;
          border: 1px solid #DCE8E1;
          font-size: 13px;
          background: #FAFCFB;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }

        .search-box input:focus {
          outline: none;
          background: #FFFFFF;
          border-color: #0B6045;
          box-shadow: 0 0 0 3px rgba(11, 96, 69, 0.1);
        }

        .search-icon-pos {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #87958E;
          font-size: 13px;
        }

        .view-toggle-group {
          display: flex;
          border-radius: 8px;
          border: 1px solid #DCE8E1;
          overflow: hidden;
          background: #FAFCFB;
        }

        .view-btn {
          background: transparent;
          border: none;
          padding: 8px 12px;
          color: #87958E;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .view-btn.active {
          background: #073B2A;
          color: #FFFFFF;
        }

        /* GRID VIEW */
        .services-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 22px;
        }

        .admin-service-card {
          background: #FFFFFF;
          border: 1px solid #DCE8E1;
          border-radius: 14px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 14px rgba(7, 59, 42, 0.03);
          transition: all 0.3s ease;
        }

        .admin-service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(7, 59, 42, 0.08);
          border-color: #D4AF37;
        }

        .card-header-flex {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          margin-bottom: 14px;
        }

        .card-icon-bubble {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(7, 59, 42, 0.08);
          color: #073B2A;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .admin-service-card:hover .card-icon-bubble {
          background: #073B2A;
          color: #D4AF37;
        }

        .card-title-block h3 {
          font-size: 18px;
          font-weight: 800;
          color: #073B2A;
          margin: 0 0 4px 0;
        }

        .card-tag {
          font-size: 11px;
          color: #87958E;
          background: #F5F8F6;
          padding: 2px 8px;
          border-radius: 4px;
          display: inline-block;
        }

        .card-desc-text {
          font-size: 13px;
          color: #5B6B63;
          line-height: 1.55;
          margin: 0 0 16px 0;
        }

        .card-features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 18px 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .card-feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #17231E;
          font-weight: 500;
        }

        .card-feature-bullet {
          color: #D4AF37;
          font-size: 11px;
          flex-shrink: 0;
        }

        .card-link-preview {
          font-size: 12px;
          color: #0B6045;
          background: rgba(11, 96, 69, 0.05);
          padding: 6px 10px;
          border-radius: 6px;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 6px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .card-btn-strip {
          display: flex;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid #EEF3F0;
        }

        .btn-card-edit {
          flex: 1;
          background: rgba(11, 96, 69, 0.08);
          color: #0B6045;
          border: none;
          padding: 9px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .btn-card-edit:hover {
          background: #0B6045;
          color: #FFFFFF;
        }

        .btn-card-delete {
          flex: 1;
          background: #FFF1F0;
          color: #D64545;
          border: 1px solid #FAD2CF;
          padding: 9px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .btn-card-delete:hover {
          background: #D64545;
          color: #FFFFFF;
        }

        /* TABLE VIEW */
        .table-wrapper {
          overflow-x: auto;
          border: 1px solid #DCE8E1;
          border-radius: 12px;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
          text-align: left;
        }

        .admin-table th {
          background: #F5F8F6;
          color: #073B2A;
          font-weight: 700;
          padding: 14px 18px;
          border-bottom: 1px solid #DCE8E1;
        }

        .admin-table td {
          padding: 16px 18px;
          border-bottom: 1px solid #EEF3F0;
          vertical-align: middle;
        }

        .admin-table tr:hover td {
          background: #FAFCFB;
        }

        /* Delete Confirmation Dialog */
        .confirm-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .confirm-modal {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 28px;
          max-width: 420px;
          width: 90%;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          text-align: center;
        }

        .confirm-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #FFF1F0;
          color: #D64545;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin: 0 auto 16px auto;
        }

        .confirm-modal h3 {
          font-size: 18px;
          font-weight: 800;
          color: #073B2A;
          margin: 0 0 8px 0;
        }

        .confirm-modal p {
          font-size: 13px;
          color: #5B6B63;
          margin: 0 0 22px 0;
          line-height: 1.5;
        }

        .confirm-btn-bar {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .empty-placeholder {
          text-align: center;
          padding: 50px 20px;
          color: #5B6B63;
        }

        .empty-placeholder h3 {
          font-size: 18px;
          color: #073B2A;
          margin: 0 0 6px 0;
        }

        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
          .services-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* HEADER SECTION */}
      <div className="dash-header">
        <div className="header-title-block">
          <h1>
            Manage Services <span className="header-badge">InvestNow Admin</span>
          </h1>
          <p className="header-subtitle">
            Configure dynamic services cards, icons, descriptions, and feature bullet points shown to clients.
          </p>
        </div>

        <button
          className="btn-primary-action"
          onClick={() => {
            resetForm();
            const el = document.getElementById("service-form-card");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <FaPlus /> Add New Service
        </button>
      </div>

      {/* NOTIFICATION TOAST */}
      {notification && (
        <div className={`toast-banner ${notification.type}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {notification.type === "success" ? <FaCheck /> : <FaTimes />}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontSize: "16px" }}
          >
            ×
          </button>
        </div>
      )}

      {/* STATS STRIP */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaLayerGroup />
          </div>
          <div>
            <div className="stat-value">{services.length}</div>
            <p className="stat-label">Total Active Services</p>
          </div>
        </div>

        <div className="stat-card gold">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div>
            <div className="stat-value">{totalFeaturesCount}</div>
            <p className="stat-label">Total Feature Bullets</p>
          </div>
        </div>

        <div className="stat-card accent">
          <div className="stat-icon">
            <FaBriefcase />
          </div>
          <div>
            <div className="stat-value">{filteredServices.length}</div>
            <p className="stat-label">Filtered / Visible</p>
          </div>
        </div>
      </div>

      {/* ADD / UPDATE SERVICE FORM */}
      <div
        id="service-form-card"
        className={`service-form-card ${editingId ? "editing" : ""}`}
      >
        <div className="form-header-bar">
          <div className="form-title-wrap">
            <h2 className="form-title">
              {editingId ? "Update Service Information" : "Create New Financial Service"}
            </h2>
            <span className={`mode-pill ${editingId ? "edit" : "create"}`}>
              {editingId ? "Editing Service" : "New Service"}
            </span>
          </div>

          {editingId && (
            <button type="button" className="cancel-edit-btn" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            {/* Title */}
            <div className="form-group">
              <label className="field-label">
                <span>Service Title *</span>
                <small style={{ color: "#87958E", fontWeight: 400 }}>e.g. Home Loans</small>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Loans & Financing"
                className="field-input"
                required
              />
            </div>

            {/* Icon Key / Presets */}
            <div className="form-group">
              <label className="field-label">
                <span>Icon Preset / Name</span>
                <small style={{ color: "#87958E", fontWeight: 400 }}>Choose below or type custom</small>
              </label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="e.g. loan, shield, wealth, portfolio"
                className="field-input"
              />
              <div className="preset-grid">
                {ICON_PRESETS.map((preset) => (
                  <button
                    key={preset.key}
                    type="button"
                    className={`preset-chip ${formData.icon === preset.key ? "active" : ""}`}
                    onClick={() => handleSelectPresetIcon(preset.key)}
                  >
                    {preset.icon}
                    <span>{preset.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="form-group span-2">
              <label className="field-label">
                <span>Description *</span>
                <small style={{ color: "#87958E", fontWeight: 400 }}>Clear, client-facing summary</small>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Structured guidance and loan assistance for personal, business, and residential property needs..."
                rows="3"
                className="field-textarea"
                required
              />
            </div>

            {/* Features Builder */}
            <div className="form-group span-2">
              <div className="field-label">
                <span>Key Features / Bullet Points *</span>
                <button
                  type="button"
                  className="add-feature-pill-btn"
                  onClick={addFeature}
                >
                  <FaPlus style={{ fontSize: "11px" }} /> Add Bullet Point
                </button>
              </div>

              <div className="feature-rows-container">
                {formData.features.map((feature, idx) => (
                  <div className="feature-input-row" key={idx}>
                    <div className="feature-num-badge">{idx + 1}</div>
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(idx, e.target.value)}
                      placeholder={`Feature bullet ${idx + 1} (e.g. Personal Loans)`}
                      className="field-input"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        className="feature-delete-btn"
                        onClick={() => removeFeature(idx)}
                        title="Remove feature"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Learn More Link */}
            <div className="form-group span-2">
              <label className="field-label">
                <span>Learn More Destination Link</span>
                <small style={{ color: "#87958E", fontWeight: 400 }}>URL or internal path (e.g. /contact)</small>
              </label>
              <input
                type="text"
                name="learnMoreLink"
                value={formData.learnMoreLink}
                onChange={handleChange}
                placeholder="/contact or https://yourlink.com"
                className="field-input"
              />
            </div>
          </div>

          <div className="form-cta-bar">
            <button
              type="submit"
              className="btn-primary-action"
              disabled={loading}
            >
              {loading ? (
                "Processing..."
              ) : editingId ? (
                <>
                  <FaCheck /> Update Service
                </>
              ) : (
                <>
                  <FaPlus /> Save & Publish Service
                </>
              )}
            </button>

            {editingId && (
              <button
                type="button"
                className="btn-ghost-action"
                onClick={resetForm}
              >
                Clear Form
              </button>
            )}
          </div>
        </form>
      </div>

      {/* EXISTING SERVICES LIST SECTION */}
      <div className="services-display-card">
        <div className="list-toolbar">
          <div className="toolbar-left">
            <h2>Website Services</h2>
            <span className="count-pill">
              {filteredServices.length} {filteredServices.length === 1 ? "Service" : "Services"}
            </span>
          </div>

          <div className="toolbar-right">
            <div className="search-box">
              <FaSearch className="search-icon-pos" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="view-toggle-group">
              <button
                type="button"
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Grid View"
              >
                <FaThLarge />
              </button>
              <button
                type="button"
                className={`view-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
                title="Table View"
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        {loading && services.length === 0 ? (
          <div className="empty-placeholder">
            <h3>Loading services from database...</h3>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="empty-placeholder">
            <h3>No services matched your query</h3>
            <p>Try searching with another keyword or add a new service above.</p>
          </div>
        ) : viewMode === "grid" ? (
          /* GRID VIEW */
          <div className="services-cards-grid">
            {filteredServices.map((service) => (
              <div className="admin-service-card" key={service._id}>
                <div>
                  <div className="card-header-flex">
                    <div className="card-icon-bubble">
                      {renderIconHelper(service.icon)}
                    </div>
                    <div className="card-title-block">
                      <h3>{service.title}</h3>
                      <span className="card-tag">Key: {service.icon || "default"}</span>
                    </div>
                  </div>

                  <p className="card-desc-text">{service.description}</p>

                  <ul className="card-features-list">
                    {service.features?.map((f, i) => (
                      <li key={i} className="card-feature-item">
                        <FaCheckCircle className="card-feature-bullet" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {service.learnMoreLink && (
                    <div className="card-link-preview">
                      <FaExternalLinkAlt style={{ fontSize: "10px" }} />
                      <span>{service.learnMoreLink}</span>
                    </div>
                  )}
                </div>

                <div className="card-btn-strip">
                  <button
                    type="button"
                    className="btn-card-edit"
                    onClick={() => handleEdit(service)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    type="button"
                    className="btn-card-delete"
                    onClick={() => setDeleteConfirmId(service._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Icon</th>
                  <th>Service Title</th>
                  <th>Description</th>
                  <th>Features</th>
                  <th>Link</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service._id}>
                    <td>
                      <div className="card-icon-bubble" style={{ width: "36px", height: "36px", fontSize: "16px" }}>
                        {renderIconHelper(service.icon)}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: "#073B2A" }}>
                      {service.title}
                    </td>
                    <td style={{ maxWidth: "280px", color: "#5B6B63" }}>
                      {service.description.length > 80
                        ? `${service.description.substring(0, 80)}...`
                        : service.description}
                    </td>
                    <td>
                      <span className="count-pill">
                        {service.features?.length || 0} bullets
                      </span>
                    </td>
                    <td style={{ color: "#0B6045", fontSize: "12px" }}>
                      {service.learnMoreLink || "-"}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "8px" }}>
                        <button
                          type="button"
                          className="btn-card-edit"
                          style={{ padding: "6px 12px" }}
                          onClick={() => handleEdit(service)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="btn-card-delete"
                          style={{ padding: "6px 12px" }}
                          onClick={() => setDeleteConfirmId(service._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="confirm-backdrop" onClick={() => setDeleteConfirmId(null)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon-wrap">
              <FaTrash />
            </div>
            <h3>Delete This Service?</h3>
            <p>
              This action cannot be undone. The service will be immediately removed from both the admin dashboard and public website.
            </p>
            <div className="confirm-btn-bar">
              <button
                type="button"
                className="btn-ghost-action"
                onClick={() => setDeleteConfirmId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-card-delete"
                style={{ background: "#D64545", color: "#FFFFFF", padding: "10px 20px" }}
                onClick={() => confirmDelete(deleteConfirmId)}
              >
                Yes, Delete Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManage;