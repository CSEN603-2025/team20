import React, { useState } from "react";
import "./MyInternships.css";
import FacultySidebar from "./FacultySidebar2";
import { FaUserCircle } from 'react-icons/fa';
const internshipsData = [
  {
    id: 1,
    title: "Software Developer",
    company: "Google",
    status: "Accepted",
    duration: "1 month",
    date: "2024-05-10",
    type: "internship-complete",
    applicationStatus: "Accepted",
    comments: "Great learning experience, highly recommended."
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Microsoft",
    status: "Pending",
    duration: "1 month",
    date: "2025-05-01",
    type: "current-intern",
    applicationStatus: "Pending",
    comments: "Waiting for feedback."
  },
  {
    id: 3,
    title: "Marketing Intern",
    company: "Meta",
    status: "Rejected",
    duration: "2 months",
    date: "2024-11-20",
    type: "applied",
    applicationStatus: "Rejected",
    comments: "Unfortunately, it was not a good fit."
  },
  {
    id: 4,
    title: "Product Manager",
    company: "Amazon",
    status: "Finalized",
    duration: "4 months",
    date: "2025-06-15",
    type: "applied",
    applicationStatus: "Finalized",
    comments: "Shortlisted but not yet confirmed."
  },
  {
  id: 5,
    title: "Cybersecurity Intern",
    company: "IBM",
    status: "Accepted",
    duration: "2 month",
    date: "2023-06-10",
    type: "internship-complete",
    applicationStatus: "Accepted",
    comments: "Great learning experience, highly recommended."
  }

];

const MyInternships = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [pastAndCurrentFilter, setPastAndCurrentFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [internships, setInternships] = useState(internshipsData);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Evaluation inputs
  const [evaluationText, setEvaluationText] = useState("");
  const [recommend, setRecommend] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  // Handle card click for internship detail modal
  const handleCardClick = (internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };

  // Close internship detail modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInternship(null);
  };

  // Filter handlers
  const handleFilterChange = (e) => setFilterType(e.target.value);
  const handlePastAndCurrentFilterChange = (e) => setPastAndCurrentFilter(e.target.value);
  const handleDateFilterChange = (e) => setDateFilter(e.target.value);
  const handleResetFilters = () => {
    setFilterType("");
    setPastAndCurrentFilter("");
    setDateFilter("");
  };

  // Filter applied internships (only those with type 'applied')
  const filteredAppliedInternships = internships.filter(
    (internship) =>
      internship.type === "applied" &&
      (filterType ? internship.applicationStatus === filterType : true)
  );

  // Filter current or completed internships with optional date filter
  const filteredActiveOrCompleted = internships.filter((internship) => {
    const typeMatch = pastAndCurrentFilter ? internship.type === pastAndCurrentFilter : internship.type !== "applied";
    const dateMatch = dateFilter ? new Date(internship.date) >= new Date(dateFilter) : true;
    return typeMatch && dateMatch;
  });

  // Evaluation modal handlers
  const openEvaluationModal = (internship) => {
    setSelectedInternship(internship);
    if (internship.evaluation) {
      setEvaluationText(internship.evaluation.text);
      setRecommend(internship.evaluation.recommend);
    } else {
      setEvaluationText("");
      setRecommend(false);
    }
    setIsEvaluationModalOpen(true);
  };

  const closeEvaluationModal = () => {
    setIsEvaluationModalOpen(false);
    setSelectedInternship(null);
  };

  const saveEvaluation = () => {
    const updated = internships.map((internship) =>
      internship.id === selectedInternship.id
        ? { ...internship, evaluation: { text: evaluationText, recommend } }
        : internship
    );
    setInternships(updated);
    closeEvaluationModal();
  };

  const deleteEvaluation = () => {
    const updated = internships.map((internship) =>
      internship.id === selectedInternship.id ? { ...internship, evaluation: null } : internship
    );
    setInternships(updated);
    closeEvaluationModal();
  };

  return (
    <div className="my-internships-wrapper">
      <FacultySidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <div className={`my-internships-content ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <h2>My Internships</h2>
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
        {/* Applied For Internships Section */}
        <h3>Applied For Internships</h3>

        <div className="my-internships-filter-section">
          <select onChange={handleFilterChange} value={filterType}>
            <option value="">All Statuses</option>
            <option value="Accepted">Accepted</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Finalized">Finalized</option>
          </select>

          <button className="reset-filters-btn" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>

        <div className="my-internships-list">
          {filteredAppliedInternships.map((internship) => (
            <div
              key={internship.id}
              className={`my-internships-card ${internship.status.toLowerCase()}`}
              onClick={() => handleCardClick(internship)}
            >
              <h3>{internship.title}</h3>
              <p><strong>Company:</strong> {internship.company}</p>
              <p><strong>Status:</strong> {internship.status}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Date:</strong> {internship.date}</p>
            </div>
          ))}
        </div>

        {/* Current and Past Internships Section */}
        <h3>My Current and Past Internships</h3>

        <div className="my-internships-filter-section">
          <select onChange={handlePastAndCurrentFilterChange} value={pastAndCurrentFilter}>
            <option value="">All Internships</option>
            <option value="current-intern">Current Internships</option>
            <option value="internship-complete">Completed Internships</option>
          </select>

          <input type="date" value={dateFilter} onChange={handleDateFilterChange} />

          <button className="reset-filters-btn" onClick={handleResetFilters}>
            Reset Filters
          </button>
        </div>

        <div className="my-internships-list">
          {filteredActiveOrCompleted.map((internship) => (
            <div
              key={internship.id}
              className={`my-internships-card ${internship.status.toLowerCase()}`}
              onClick={() => handleCardClick(internship)}
            >
              <h3>{internship.title}</h3>
              <p><strong>Company:</strong> {internship.company}</p>
              <p><strong>Status:</strong> {internship.status}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Date:</strong> {internship.date}</p>

              {/* Show evaluation button ONLY for completed internships */}
              {internship.type === "internship-complete" && (
                <button
                  className="evaluation-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent card modal
                    openEvaluationModal(internship);
                  }}
                >
                  Evaluate Internship
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Internship Detail Modal */}
        {isModalOpen && selectedInternship && (
          <div className="modal-overlay open" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedInternship.title}</h2>
              <p><strong>Company:</strong> {selectedInternship.company}</p>
              <p><strong>Status:</strong> {selectedInternship.status}</p>
              <p><strong>Duration:</strong> {selectedInternship.duration}</p>
              <p><strong>Date:</strong> {selectedInternship.date}</p>
              <p><strong>Comments:</strong> {selectedInternship.comments}</p>
              <button onClick={closeModal} className="close-btn">Close</button>
            </div>
          </div>
        )}

        {/* Evaluation Modal */}
        {isEvaluationModalOpen && selectedInternship && (
          <div className="modal-overlay open" onClick={closeEvaluationModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Evaluate Internship at {selectedInternship.company}</h2>
              <textarea
                value={evaluationText}
                placeholder="Write your evaluation here..."
                onChange={(e) => setEvaluationText(e.target.value)}
                rows={5}
                style={{ width: "100%" }}
              />
              <label style={{ display: "block", marginTop: "1rem" }}>
                <input
                  type="checkbox"
                  checked={recommend}
                  onChange={(e) => setRecommend(e.target.checked)}
                />
                I recommend this company to others
              </label>
              <div style={{ marginTop: "1rem" }}>
                <button onClick={saveEvaluation} className="save-btn">Save Evaluation</button>
                <button onClick={deleteEvaluation} className="delete-btn" style={{ marginLeft: "1rem" }}>Delete Evaluation</button>
                <button onClick={closeEvaluationModal} className="close-btn" style={{ marginLeft: "1rem" }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MyInternships;
