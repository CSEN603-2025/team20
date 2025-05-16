import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import FacultySidebar from '../pages/FacultySidebar2';
import './Assessment.css';

const Assessment = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [score, setScore] = useState(null);
  const [isAssessmentCompleted, setIsAssessmentCompleted] = useState(false);
  const [postedToProfile, setPostedToProfile] = useState(false);

  // Sample data for online assessments
  useEffect(() => {
    const mockAssessments = [
      { id: 1, title: 'JavaScript Fundamentals', duration: '30 mins', level: 'Beginner' },
      { id: 2, title: 'React Basics', duration: '45 mins', level: 'Intermediate' },
      { id: 3, title: 'Data Structures and Algorithms', duration: '1 hour', level: 'Advanced' },
      { id: 4, title: 'Cybersecurity Essentials', duration: '40 mins', level: 'Intermediate' },
    ];
    setAssessments(mockAssessments);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const startAssessment = (assessment) => {
    setSelectedAssessment(assessment);
    setIsAssessmentCompleted(false);
    setScore(null);
    setPostedToProfile(false);
  };

  const completeAssessment = () => {
    const generatedScore = Math.floor(Math.random() * 51) + 50;
    setScore(generatedScore);
    setIsAssessmentCompleted(true);
  };

  const postToProfile = () => {
    if (isAssessmentCompleted) {
      setPostedToProfile(true);
    }
  };

  return (
    <div className='assessment-wrapper'>
      

      {/* 🔹 Profile Icon and Dropdown */}
      <div className="profile-wrapper">
        <div className="profile-box" onClick={toggleDropdown}>
          <FaUserCircle size={24} />
          <span className="profile-name">John Doe</span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">Logout</div>
          </div>
        )}
      </div>

      {/* 🔹 Sidebar */}
      <div className={`sidebar-container ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <FacultySidebar 
          isCollapsed={isSidebarCollapsed} 
          toggleSidebar={toggleSidebar} 
        />
      </div>

      <div className={`student-dashboard-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
        <div className="welcome-message">
          <h2>📝 Online Assessments</h2>
        </div>

        <div className="assessment-grid">
          <div className="assessment-list">
            <h3>Available Assessments</h3>
            {assessments.map((assessment) => (
              <div className="assessment-item" key={assessment.id}>
                <div>
                  <strong>{assessment.title}</strong>
                  <p>{assessment.duration} | {assessment.level}</p>
                </div>
                <button className="start-btn" onClick={() => startAssessment(assessment)}>Start</button>
              </div>
            ))}
          </div>

          <div className="assessment-details">
            {selectedAssessment ? (
              <div>
                <h3>{selectedAssessment.title}</h3>
                {!isAssessmentCompleted ? (
                  <button className="complete-btn" onClick={completeAssessment}>
                    Complete Assessment
                  </button>
                ) : (
                  <div className="assessment-results">
                    <p><strong>Score:</strong> {score}/100</p>
                    {!postedToProfile ? (
                      <button className="post-btn" onClick={postToProfile}>
                        Post to Profile
                      </button>
                    ) : (
                      <p className="posted-notice">✅ Posted to Profile!</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="select-assessment">Select an assessment to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
