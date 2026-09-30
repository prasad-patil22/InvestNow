import { useState, useEffect } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import {
  FaBars,
  FaEnvelope,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaUserCircle,
  FaInfoCircle,
  FaBullseye,
  FaMapMarkedAlt
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const AdminNavbar = ({ isCollapsed, setIsCollapsed, isMobile, setIsMobileOpen, isMobileOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/investnowlogin");
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FaHome /> },
    { name: 'Manage About', path: '/admin/manage-about', icon: <FaInfoCircle /> },
    { name: 'Manage Financial Goals', path: '/admin/manage-financial-goals', icon: <FaBullseye /> },
    { name: 'Manage Chalukya', path: '/admin/manage-chalukya', icon: <FaMapMarkedAlt /> },
    { name: 'Guest Messages', path: '/admin/guest-messages', icon: <FaEnvelope /> },
    { name: 'Manage Services', path: '/admin/manage-services', icon: <FaEnvelope /> },
    
  ];

  return (
    <>
      <motion.div
        className="admin-sidebar"
        initial={{ x: isMobile ? -300 : 0 }}
        animate={{ 
          x: isMobile && !isMobileOpen ? -300 : 0,
          width: isCollapsed && !isMobile ? 80 : 250
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="logo-container">
          <div className="logo-wrapper">
            <img
              src="/logo.png"
              alt="INVESTNOW Logo"
              className="logo"
              style={{ background: "#FFFFFF", padding: "3px", borderRadius: "50%", border: "1.5px solid #D4AF37", objectFit: "contain" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/logo.jpeg";
              }}
            />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  className="logo-text"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  INVESTNOW
                  <span className="logo-subtext">Financial Services</span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          {/* {!isMobile && (
            <motion.div 
              className="toggle-btn" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </motion.div>
          )} */}
        </div>

        <div className="nav-items">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => isMobile && setIsMobileOpen(false)}
            >
              <div className="nav-icon">{item.icon}</div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span 
                    className="nav-text"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
              {location.pathname === item.path && (
                <motion.div 
                  className="active-indicator"
                  layoutId="activeIndicator"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="sidebar-footer">
          <a href="#logout" onClick={handleLogout} className="logout-btn">
            <FaSignOutAlt />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span 
                  className="logout-text"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </a>
        </div>
      </motion.div>

      {isMobile && isMobileOpen && (
        <div className="sidebar-overlay" onClick={() => setIsMobileOpen(false)}></div>
      )}
    </>
  );
};

const TopBar = ({ isMobile, setIsMobileOpen, isMobileOpen, isCollapsed, setIsCollapsed }) => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        {isMobile ? (
          <button className="menu-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            <FaBars />
          </button>
        ) : (
          <button className="menu-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        )}
        <h1 className="page-title">Principal Dashboard</h1>
      </div>
      
      <div className="top-bar-right">
        {/* <button className="notification-btn">
          <FaBell />
          <span className="notification-badge">3</span>
        </button> */}
        
        <div className="user-menu">
          <div className="user-avatar">
            <FaUserCircle />
          </div>
          <div className="user-details">
            <span className="user-name">Principal</span>
            <span className="user-role">Administrator</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 1024;
      setIsMobile(isNowMobile);
      
      if (isNowMobile) {
        setIsCollapsed(false);
      } else {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="admin-layout">
      <AdminNavbar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed}
        isMobile={isMobile}
        setIsMobileOpen={setIsMobileOpen}
        isMobileOpen={isMobileOpen}
      />
      
      <div className="main-content" style={{ marginLeft: isMobile ? 0 : (isCollapsed ? '80px' : '250px') }}>
        <TopBar 
          isMobile={isMobile} 
          setIsMobileOpen={setIsMobileOpen} 
          isMobileOpen={isMobileOpen}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
        
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>

      <style jsx>{`
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background-color: #F5F8F6;
          position: relative;
        }

        .admin-sidebar {
          height: 100vh;
          background: linear-gradient(180deg, #073B2A 0%, #0B6045 100%);
          color: white;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 1000;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
        }

        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        @media (min-width: 1024px) {
          .sidebar-overlay {
            display: none;
          }
        }

        .logo-container {
          padding: 20px 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          min-height: 80px;
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          overflow: hidden;
        }

        .logo {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
          background: transparent;
          border: 1.5px solid #D4AF37;
        }

        .logo-text {
          font-size: 16px;
          font-weight: bold;
          white-space: nowrap;
          display: flex;
          flex-direction: column;
          line-height: 1.2;
          overflow: hidden;
          color: #D4AF37;
        }

        .logo-subtext {
          font-size: 11px;
          color: #F5F8F6;
          font-weight: normal;
        }

        .toggle-btn {
          color: #cbd5e0;
          transition: all 0.3s ease;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          flex-shrink: 0;
        }

        .toggle-btn:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
        }

        .nav-items {
          padding: 15px 10px;
          overflow-y: auto;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          padding: 12px 15px;
          margin-bottom: 5px;
          border-radius: 8px;
          color: #E2E6EB;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #D4AF37;
        }

        .nav-item.active {
          background: rgba(212, 175, 55, 0.15);
          color: #D4AF37;
        }

        .nav-icon {
          min-width: 30px;
          font-size: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          flex-shrink: 0;
        }

        .nav-text {
          margin-left: 12px;
          white-space: nowrap;
          overflow: hidden;
          z-index: 1;
        }

        .active-indicator {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: #D4AF37;
          border-radius: 0 4px 4px 0;
        }

        .sidebar-footer {
          padding: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .logout-btn {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          border-radius: 8px;
          color: #cbd5e0;
          text-decoration: none;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.05);
          white-space: nowrap;
          overflow: hidden;
        }

        .logout-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
        }

        .logout-text {
          margin-left: 12px;
          overflow: hidden;
        }

        .top-bar {
          height: 70px;
          background: #fff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 25px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .menu-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: none;
          background: #edf2f7;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .menu-toggle:hover {
          background: #e2e8f0;
        }

        .page-title {
          font-size: 20px;
          font-weight: 600;
          color: #2d3748;
        }

        .top-bar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .notification-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: none;
          background: #edf2f7;
          color: #4a5568;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .notification-btn:hover {
          background: #e2e8f0;
        }

        .notification-badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #e53e3e;
          color: white;
          font-size: 10px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #edf2f7;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: #4a5568;
        }

        .user-details {
          display: flex;
          flex-direction: column;
        }

        .user-details .user-name {
          font-weight: 600;
          font-size: 14px;
        }

        .user-details .user-role {
          font-size: 12px;
          color: #718096;
        }

        .main-content {
          flex: 1;
          transition: margin-left 0.3s ease;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .content-wrapper {
          flex: 1;
          padding: 25px;
        }

        @media (max-width: 1023px) {
          .top-bar {
            padding: 0 15px;
          }
          
          .content-wrapper {
            padding: 15px;
          }
          
          .user-details {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 18px;
          }
        }

        @media (max-width: 480px) {
          .top-bar {
            height: 60px;
          }
          
          .content-wrapper {
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;