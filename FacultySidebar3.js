

// src/components/FacultySidebar1.jsx
import React from "react";
import "./FacultySidebar1.css";

import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, User, Home } from "lucide-react";
import { FaFileAlt } from "react-icons/fa";

const FacultySidebar = ({ isCollapsed, toggleSidebar, onProfileClick }) => {
  return (
    // Added the 'faculty-sidebar' class here
    <div className={`sidebar-dark faculty-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </div>

      {!isCollapsed && (
        <>
          <div className="sidebar-title-container">
            <p className="sidebar-title">Faculty Dashboard</p>
          </div>
        </>
      )}

      {/* Main Dashboard button */}
      <Link to="/faculty-dashboard" className="internship-link">
        <Home size={20} className="sidebar-icon" />
        <span className={`sidebar-label ${isCollapsed ? "hide-label" : ""}`}>
          Main Dashboard
        </span>
      </Link>

      <Link to="/faculty-dashboard/report" className="internship-link">
        <FaFileAlt className="sidebar-icon" />
        <span className={`sidebar-label ${isCollapsed ? "hide-label" : ""}`}>
          View all internship reports
        </span>
      </Link>

      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          onProfileClick();
        }}
        className="internship-link profile-link"
      >
        <User size={20} className="sidebar-icon" />
        <span className={`sidebar-label ${isCollapsed ? "hide-label" : ""}`}>
          Profile
        </span>
      </Link>
    </div>
  );
};

export default FacultySidebar;
