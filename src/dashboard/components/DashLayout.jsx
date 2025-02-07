import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./style/dashlayout.css";
import { FaHome, FaNewspaper, FaUsers, FaVideo, FaInbox, FaSignOutAlt } from "react-icons/fa";

export default function DashLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: "/dashboard", icon: <FaHome />, label: "Dashboard" },
    { path: "/dashboard/post", icon: <FaNewspaper />, label: "Posts" },
    { path: "/dashboard/users", icon: <FaUsers />, label: "Users" },
    { path: "/dashboard/messages", icon: <FaInbox />, label: "Messages" }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="dashboard-container">
      <div className={`dashboard-sidebar ${isMenuOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Moreen</h2>
          <button className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
          
          <button className="logout-button" onClick={handleLogout}>
            <span className="nav-icon"><FaSignOutAlt /></span>
            <span className="nav-label">Logout</span>
          </button>
        </nav>
      </div>

      <div className={`dashboard-content ${isMenuOpen ? 'shifted' : ''}`}>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
}