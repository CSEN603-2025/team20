import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import FacultySidebar from '../pages/FacultySidebar';
import './StudentDashboard.css';

const StudentDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [totalInternshipMonths, setTotalInternshipMonths] = useState(2); // Assume initial state, can be fetched from API
  const navigate = useNavigate();
  const dropdownRef = useRef(null);  // <-- Define dropdownRef

  // 👉 Check if user qualifies for PRO
  useEffect(() => {
    if (totalInternshipMonths >= 3) {
      alert("Congratulations! You've completed 3 months of internships and earned your PRO badge!");
      navigate('/pro-student-dashboard');
    }
  }, [totalInternshipMonths, navigate]);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // Toggle Dropdown with Click Outside Detection
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  // Add event listener for clicks outside dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    navigate('/login');
  };

  const addInternshipMonth = () => {
    // 🟢 Simulating internship completion
    setTotalInternshipMonths((prev) => prev + 1);
  };

  return (
    <div className='student-dashboard-wrapper'>
      <div className="student-dashboard-bg" />

      <div className="profile-wrapper" ref={dropdownRef}>
        <div className='profile-box' onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
          <FaUserCircle size={30} color='#4C3D40' />
          <span className='profile-name'>John Doe</span>
        </div>
        {isDropdownOpen && (
          <div className='dropdown-menu'>
            <div
              className='dropdown-item'
              onClick={() => {
                setIsDropdownOpen(false);
                navigate('/profile');
              }}
            >
              Profile
            </div>
            <div
              className='dropdown-item'
              onClick={() => {
                setIsDropdownOpen(false);
                handleLogout();
              }}
            >
              Log Out
            </div>
          </div>
        )}
      </div>

      <div className={`sidebar-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <FacultySidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      </div>

      <div className={`student-dashboard-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
        {/* 🔹 Welcome Message */}
        <div className="welcome-message">
          <h2>Welcome back, John Doe!</h2>
        </div>

        {/* 🔹 Card Layout */}
        <div className="dashboard-cards">
          <div className="projects-ui-card card1">
            <h3>My Internships</h3>
            <p>Explore your active and completed internships.</p>
            <p><strong>Total Internship Months:</strong> {totalInternshipMonths}</p>
            <button onClick={addInternshipMonth}>Complete One More Month</button>
          </div>

          <div className="projects-ui-card card2">
            <h3>Internship Reports</h3>
            <p>Manage your reports and view feedback.</p>
          </div>

          <div className="projects-ui-card card3">
            <h3>Notifications</h3>
            <p>Stay updated with the latest information.</p>
          </div>
        </div>

       {/* 🔹 Suggested Companies Section */}
<div className="suggested-companies">
  <h2>
    <span role="img" aria-label="light bulb">💡</span> Suggested Companies
  </h2>
  <p>Based on your job interests, industry preferences, and recommendations from past interns:</p>

  <ul className="company-list">
    <li className="company-item">
      <strong>Google</strong> - Software Development, AI Research
    </li>
    <li className="company-item">
      <strong>Microsoft</strong> - Cloud Computing, Cybersecurity
    </li>
    <li className="company-item">
      <strong>Amazon</strong> - E-commerce, Cloud Infrastructure
    </li>
    <li className="company-item">
      <strong>IBM</strong> - AI Solutions, Data Analytics
    </li>
    <li className="company-item">
      <strong>Deloitte</strong> - Consulting, Business Solutions
    </li>
  </ul>
</div>

      </div>
    </div>
  );
};

export default StudentDashboard;
