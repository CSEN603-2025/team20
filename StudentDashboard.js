import React, { useState } from 'react';
import FacultySidebar from '../pages/FacultySidebar';
import './StudentDashboard.css';
import { FaUserCircle } from 'react-icons/fa';

const StudentDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Dummy data for the user
  const user = {
    name: "John Doe",
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle navigation to Profile page
  const goToProfile = () => {
    window.location.href = '/profile'; // Redirect to the Profile page
    setIsDropdownOpen(false); // Close the dropdown after clicking
  };

  // Handle navigation to Login page (Logout functionality)
  const handleLogout = () => {
    window.location.href = '/login'; // Redirect to the Login page
    setIsDropdownOpen(false); // Close the dropdown after clicking
  };

  return (
    <div className='student-dashboard-wrapper'>
      {/* Full-width background */}
      <div className="student-dashboard-bg" />

      <div className={`sidebar-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <FacultySidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      </div>

      <div className={`student-dashboard-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
        {/* Profile Box */}
        <div className='profile-box' onClick={toggleDropdown}>
          <FaUserCircle size={30} color='#4C3D40' />
          <span className='profile-name'>{user.name}</span>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className='dropdown-menu'>
              <div className='dropdown-item' onClick={goToProfile}>Profile</div>
              <div className='dropdown-item' onClick={handleLogout}>Log Out</div>
            </div>
          )}
          
        </div>
        <div className="projects-ui-card" style={{ left: "359px", top: "150px" }}>
            <h3>Project Title 1</h3>
            <p>First project description.</p>
          </div>

          <div className="projects-ui-card" style={{ left: "770px", top: "150px" }}>
            <h3>Project Title 2</h3>
            <p>Second project description.</p>
          </div>

          <div className="projects-ui-card" style={{ left: "1200px", top: "150px" }}>
            <h3>Project Title 3</h3>
            <p>Third project description.</p>
          </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
