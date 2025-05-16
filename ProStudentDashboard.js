import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import FacultySidebar from '../pages/FacultySidebar2';
import './ProStudentDashboard.css';

const ProStudentDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [profileViews, setProfileViews] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  

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

  // Add event listener for clicks outside
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  //const handleLogout = () => {
    //navigate('/login');
  //};

  // Simulated fetch for companies that viewed the profile
  useEffect(() => {
    const fetchedViews = [
      { company: 'Google', date: '2025-05-10' },
      { company: 'Microsoft', date: '2025-05-12' },
      { company: 'Amazon', date: '2025-05-14' },
      { company: 'IBM', date: '2025-05-15' },
    ];
    setProfileViews(fetchedViews);
  }, []);

  // Scroll to Section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
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
    <div className='dropdown-item' onClick={() => {
      setIsDropdownOpen(false);
      navigate('/profile2');
    }}>
      Profile
    </div>
    <div className='dropdown-item' onClick={() => {
      setIsDropdownOpen(false);
      navigate('/login');
    }}>
      Log Out
    </div>
  </div>
)}
    </div>

      {/* Sidebar */}
      <div className={`sidebar-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <FacultySidebar 
          isCollapsed={isSidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
          onNavigate={scrollToSection}
        />
      </div>

      {/* Main Content */}
      <div className={`student-dashboard-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
        
        {/* 🔹 Welcome Message */}
        <div className="welcome-message">
          <h2>Welcome back, Pro John Doe!</h2>
        </div>

        {/* 🔹 Card Layout */}
        <div className="dashboard-cards">
          <div className="projects-ui-card card1">
            <h3>My Internships</h3>
            <p>Explore your active and completed internships.</p>
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
        <div id="suggested-companies" className="suggested-companies">
        <h2><span role="img" aria-label="lightbulb">💡</span> Suggested Companies</h2>
          <p>Based on your job interests, industry preferences, and recommendations from past interns:</p>

          <ul className="company-list">
            <li className="company-item"><strong>Google</strong> - Software Development, AI Research</li>
            <li className="company-item"><strong>Microsoft</strong> - Cloud Computing, Cybersecurity</li>
            <li className="company-item"><strong>Amazon</strong> - E-commerce, Cloud Infrastructure</li>
            <li className="company-item"><strong>IBM</strong> - AI Solutions, Data Analytics</li>
            <li className="company-item"><strong>Deloitte</strong> - Consulting, Business Solutions</li>
          </ul>
        </div>

        {/* 🔹 Companies that Viewed Your Profile */}
        <div id="profile-views-section" className="profile-views-section">
        <h2><span role="img" aria-label="eyes">👀</span> Companies That Viewed My Profile</h2>
          <ul className="profile-view-list">
            {profileViews.length > 0 ? (
              profileViews.map((view, index) => (
                <li key={index} className="profile-view-item">
                  <strong>{view.company}</strong> - Viewed on {view.date}
                </li>
              ))
            ) : (
              <p>No views yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProStudentDashboard;
