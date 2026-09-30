import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// Layouts & Shared
import GuestLayout from "./Guestlayout/Guestlayout";
import Home from "./Guestlayout/Home";

// Pages
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import FinancialGoals from "./pages/FinancialGoals";
import CustomerSupport from "./pages/CustomerSupport";
import ContactUs from "./pages/ContactUs";
import TrustCompliance from "./pages/TrustCompliance";
import RegulatoryInformation from "./pages/RegulatoryInformation";
import RiskDisclosures from "./pages/RiskDisclosures";
import TransparencyDisclosures from "./pages/TransparencyDisclosures";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import ChalukyaDevelopers from "./pages/ChalukyaDevelopers";

// Admin & Auth
import AdminLayout from "./AdminLayout/AdminLayout";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminForgotPassword from "./pages/AdminForgotPassword";
import AdminDashboard from "./pages/AdminDashboard";
import ManageAboutUs from "./pages/ManageAboutUs";
import ManageFinancialGoals from "./pages/ManageFinancialGoals";
import ManageChalukya from "./pages/ManageChalukya";
import ManageEnquiries from "./pages/ManageEnquiries";
import ProtectedRoute from "./components/ProtectedRoute";
import ServiceManage from "./pages/ServiceManage";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Guest Layout Routes */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="services" element={<Services />} />
          <Route path="financial-goals" element={<FinancialGoals />} />
          <Route path="customer-support" element={<CustomerSupport />} />
          <Route path="contact" element={<ContactUs />} />
          <Route path="trust-compliance" element={<TrustCompliance />} />
          <Route path="regulatory-information" element={<RegulatoryInformation />} />
          <Route path="risk-disclosures" element={<RiskDisclosures />} />
          <Route path="transparency" element={<TransparencyDisclosures />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-and-conditions" element={<TermsConditions />} />
          <Route path="chalukya-developers" element={<ChalukyaDevelopers />} />
        </Route>

        {/* Admin Auth Public Routes */}
        <Route path="/investnowlogin" element={<AdminLogin />} />
        <Route path="/investnowregi" element={<AdminRegister />} />
        <Route path="/investnowforgotpassword" element={<AdminForgotPassword />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="about" element={<ManageAboutUs />} />
            <Route path="manage-about" element={<ManageAboutUs />} />
            <Route path="services" element={<ServiceManage />} />
            <Route path="manage-services" element={<ServiceManage />} />
            <Route path="financial-goals" element={<ManageFinancialGoals />} />
            <Route path="manage-financial-goals" element={<ManageFinancialGoals />} />
            <Route path="chalukya" element={<ManageChalukya />} />
            <Route path="manage-chalukya" element={<ManageChalukya />} />
            <Route path="enquiries" element={<ManageEnquiries />} />
            <Route path="guest-messages" element={<ManageEnquiries />} />
          </Route>
          <Route path="/Principal" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="manage-about" element={<ManageAboutUs />} />
            <Route path="manage-financial-goals" element={<ManageFinancialGoals />} />
            <Route path="manage-chalukya" element={<ManageChalukya />} />
            <Route path="guest-messages" element={<ManageEnquiries />} />
            <Route path="*" element={<AdminDashboard />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
