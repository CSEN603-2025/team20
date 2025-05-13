// CompanyDashboard.jsx
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import HabibaSidebar from "./HabibaSidebar";  // ← your sidebar component
import "./CompanyDashboard.css";

const CompanyDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // Your company/user data
  const user = {
    name: "Siemens",
    email: "contact@siemens.com",
    role: "Company Admin",
    location: "Cairo Office",
    phone: "+20 2 1234 5678",
  };

  return (
    <div className="company-dashboard-wrapper">
      {/* keep the sidebar */}
      <HabibaSidebar />

      {/* the rest of your dashboard */}
      <div className="main-content">
        {/* lilac header with profile */}
        <div className="bg-header">
          <div className="header-content">
            <div className="profile-box" onClick={toggleDropdown}>
              <FaUserCircle size={30} color="#4C3D40" />
              <span className="profile-name">{user.name}</span>

              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <div
                    className="dropdown-item"
                    onClick={() => {
                      setShowPopup(true);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Profile
                  </div>
                  <Link
                    to="/login"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* main dashboard content */}
        <div className="dashboard-content" style={{ position: "relative" }}>
          {/* Project Cards */}
          <div
            className="projects-ui-card"
            style={{ left: "300px", top: "150px" }}
          >
            <h3>Project Title 1</h3>
            <p>First project description.</p>
          </div>
          <div
            className="projects-ui-card"
            style={{ left: "730px", top: "150px" }}
          >
            <h3>Project Title 2</h3>
            <p>Second project description.</p>
          </div>
          <div
            className="projects-ui-card"
            style={{ left: "1150px", top: "150px" }}
          >
            <h3>Project Title 3</h3>
            <p>Third project description.</p>
          </div>

          {/* ←— your existing tables, charts, etc. */}
        </div>
      </div>

      {/* centered modal popup */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>My Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <button
              className="close-btn"
              onClick={() => setShowPopup(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyDashboard;
