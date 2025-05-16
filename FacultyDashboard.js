// src/components/pages/FacultyDashboard.jsx
import React, { useState } from "react";
import "./FacultyDashboard.css";
import FacultySidebar from "./FacultySidebar";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

const user = {
  name: "Essam Omar",
};

const FacultyDashboard = () => {
  const [isCollapsed, setIsCollapsed]       = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPopup, setShowPopup]           = useState(false);

  const toggleSidebar  = () => setIsCollapsed(!isCollapsed);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Chart Data
  const statusData = [
    { name: "Accepted", count: 2 },
    { name: "Rejected", count: 2 },
    { name: "Flagged",  count: 2 },
    { name: "Pending",  count: 1 }
  ];
  const reviewTimeData = [
    { company: "TechCorp",      days: 2.5 },
    { company: "Orange Inc.",   days: 3.2 },
    { company: "CreativeWorks", days: 1.8 }
  ];
  const courseUsageData = [
    { course: "Internship 101", count: 3 },
    { course: "Field Project",  count: 2 },
    { course: "Capstone",       count: 1 }
  ];
  const ratingData = [
    { company: "TechCorp",    rating: 4.8 },
    { company: "Orange Inc.", rating: 4.2 },
    { company: "Designify",   rating: 4.6 }
  ];
  const internshipCountData = [
    { company: "TechCorp",    interns: 4 },
    { company: "Orange Inc.", interns: 3 },
    { company: "Designify",   interns: 2 }
  ];
  const chartColors = {
    primary:   "#4C3D40",
    secondary: "#8B5E3C",
    tertiary:  "#A98467",
    quaternary:"#6F4E37"
  };
  
  return (
    <div>
      <FacultySidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        onProfileClick={() => setShowPopup(true)}
      />

      {/* Home Header & Charts */}
      <div className="bg-header">
        <div className="header-content">
          {/* Profile Dropdown */}
          <div
            className={`profile-box ${isCollapsed ? "expanded" : ""}`}
            onClick={toggleDropdown}
          >
            <FaUserCircle size={30} color="#4C3D40" />
            <span className="profile-name">{user.name}</span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={() => setShowPopup(true)}>
                  Profile
                </div>
                <Link to="/login" className="dropdown-item">
                  Log Out
                </Link>
              </div>
            )}
          </div>

          {/* Project Cards */}
          <>
            <div className="projects-ui-card" style={{ left: "330px", top: "30px" }}>
              <h3>Student Status</h3>
              <p>Track student progress and internship approval status.</p>
            </div>
            <div className="projects-ui-card" style={{ left: "700px", top: "30px" }}>
              <h3>Company Details</h3>
              <p>View assigned companies and internship roles for each student.</p>
            </div>
            <div className="projects-ui-card" style={{ left: "1100px", top: "30px" }}>
              <h3>Evaluation Summary</h3>
              <p>Access submitted evaluations and feedback at a glance</p>
            </div>
          </>

          {/* Charts */}
          <div
  style={{
    position: "absolute",
    top: "360px",
    left: "55%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px"
  }}
>
  {/* Row 1 */}
  <div style={{ display: "flex", gap: "20px" }}>
    <div style={{ width: "300px", height: "200px" }}>
      <h4>Reports Status</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={statusData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill={chartColors.primary} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: "300px", height: "200px" }}>
      <h4>Avg Review Time</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={reviewTimeData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="company" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="days" fill={chartColors.secondary} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: "300px", height: "200px" }}>
      <h4>Top Courses</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={courseUsageData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="course" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill={chartColors.tertiary} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Row 2 */}
  <div style={{ display: "flex", gap: "20px", marginTop: "40px" }}>
    <div style={{ width: "300px", height: "200px" }}>
      <h4>Company Ratings</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ratingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="company" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rating" fill={chartColors.quaternary} />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div style={{ width: "300px", height: "200px" }}>
      <h4>Intern Count</h4>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={internshipCountData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="company" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="interns" fill={chartColors.primary} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Profile Modal */}
      {showPopup && (
        <Modal onClose={() => setShowPopup(false)}>
          <h2>Faculty Member Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Title:</strong> Senior Lecturer</p>
          <p><strong>Dept.:</strong> Media Eng. & Tech</p>
          <p><strong>Email:</strong> essam.omar@guc.edu.eg</p>
          <p><strong>Office:</strong> Bldg B, Room 203</p>
          <button className="close-btn" onClick={() => setShowPopup(false)}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default FacultyDashboard;
