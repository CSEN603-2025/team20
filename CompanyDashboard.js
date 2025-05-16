import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import CSidebar from "./CSidebar";
import "./Company.css";

const CompanyDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const user = {
    name: "Siemens",
    email: "contact@siemens.com",
    role: "Company Admin",
    location: "Cairo Office",
    phone: "+20 2 1234 5678",
  };

  return (
    <div className="company-dashboard-wrapper">
      {/* Sidebar contains the navigation to Company Internship */}
      <CSidebar />

      <div className="main-content">
        {/* Profile section moved to top */}
        <div className="top-profile-section">
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
                <a href="/login" className="dropdown-item">
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="bg-header">
          <div className="header-content">
            {/* Content can go here if needed */}
          </div>
        </div>

        <div className="dashboard-content" style={{ position: "relative" }}>
          <div className="projects-ui-card" style={{ left: "300px", top: "150px" }}>
            <h3>Project Title 1</h3>
            <p>First project description.</p>
          </div>
          <div className="projects-ui-card" style={{ left: "730px", top: "150px" }}>
            <h3>Project Title 2</h3>
            <p>Second project description.</p>
          </div>
          <div className="projects-ui-card" style={{ left: "1150px", top: "150px" }}>
            <h3>Project Title 3</h3>
            <p>Third project description.</p>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="modal-overlay" onClick={() => setShowPopup(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>My Profile</h3>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p><strong>Location:</strong> {user.location}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <button className="btn" onClick={() => setShowPopup(false)} style={{ marginTop: "20px" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CompanyDashboard;