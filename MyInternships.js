import React, { useState } from "react";
import "./MyInternships.css";
import FacultySidebar from "./FacultySidebar";

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
    comments: "Great learning experience, highly recommended.",
    evaluation: null,
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
    comments: "Waiting for feedback.",
    evaluation: null,
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
    comments: "Unfortunately, it was not a good fit.",
    evaluation: null,
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
    comments: "Shortlisted but not yet confirmed.",
    evaluation: null,
  }
];

const MyInternships = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [internships, setInternships] = useState(internshipsData);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState("");
  const [pastAndCurrentFilter, setPastAndCurrentFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [evaluation, setEvaluation] = useState("");
  const [recommend, setRecommend] = useState(false);

  // Toggle the sidebar collapse state
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  // Handle card click to show modal with internship details
  const handleCardClick = (internship) => {
    setSelectedInternship(internship);
    if (internship.evaluation) {
      setEvaluation(internship.evaluation.text);
      setRecommend(internship.evaluation.recommend);
    } else {
      setEvaluation("");
      setRecommend(false);
    }
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInternship(null);
  };

  // Handle filter change
  const handleFilterChange = (e) => setFilterType(e.target.value);
  const handlePastAndCurrentFilterChange = (e) => setPastAndCurrentFilter(e.target.value);
  const handleDateFilterChange = (e) => setDateFilter(e.target.value);

  // Reset all filters
  const handleResetFilters = () => {
    setFilterType("");
    setPastAndCurrentFilter("");
    setDateFilter("");
  };

  // Save Evaluation
  const handleSaveEvaluation = () => {
    const updatedInternships = internships.map((internship) =>
      internship.id === selectedInternship.id
        ? {
            ...internship,
            evaluation: {
              text: evaluation,
              recommend: recommend,
            }
          }
        : internship
    );
    setInternships(updatedInternships);
    closeModal();
  };

  // Delete Evaluation
  const handleDeleteEvaluation = () => {
    const updatedInternships = internships.map((internship) =>
      internship.id === selectedInternship.id ? { ...internship, evaluation: null } : internship
    );
    setInternships(updatedInternships);
    closeModal();
  };

  // Filters
  const filteredAppliedInternships = internships.filter((internship) =>
    filterType ? internship.applicationStatus === filterType : internship.type === "applied"
  );

  const filteredActiveOrCompleted = internships.filter((internship) => {
    const typeMatch = pastAndCurrentFilter ? internship.type === pastAndCurrentFilter : internship.type !== "applied";
    const dateMatch = dateFilter ? new Date(internship.date) >= new Date(dateFilter) : true;
    return typeMatch && dateMatch;
  });

  return (
    <div className="my-internships-wrapper">
      <FacultySidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <div className={`my-internships-content ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <h2>My Current and Past Internships</h2>

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
            </div>
          ))}
        </div>

        {isModalOpen && selectedInternship && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>Evaluate Internship at {selectedInternship.company}</h2>
              <textarea
                value={evaluation}
                placeholder="Write your evaluation here..."
                onChange={(e) => setEvaluation(e.target.value)}
              />
              <label>
                <input
                  type="checkbox"
                  checked={recommend}
                  onChange={(e) => setRecommend(e.target.checked)}
                />
                I recommend this company to others
              </label>
              <div>
                <button onClick={handleSaveEvaluation} className="save-btn">Save Evaluation</button>
                <button onClick={handleDeleteEvaluation} className="delete-btn">Delete Evaluation</button>
                <button onClick={closeModal} className="close-btn">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInternships;
