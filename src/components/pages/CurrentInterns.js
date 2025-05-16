import React, { useState } from "react";
import "./Cards.css";
import CSidebar from "./CSidebar";
import "./AllApplicants.css";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaSave } from "react-icons/fa";

const ApplicantCard = ({ applicant }) => {
  const [state, setState] = useState(applicant.state);
  const [phase, setPhase] = useState(applicant.internshipPhase);
  const [evaluation, setEvaluation] = useState(applicant.evaluation || "");
  const [showEvalActions, setShowEvalActions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempEvaluation, setTempEvaluation] = useState(evaluation);

  const stateOptions = ["Finalized", "Accepted", "Rejected"];
  const phaseOptions = ["Current Intern", "Internship Complete"];

  // Handler for Save
  const handleSave = () => {
    setEvaluation(tempEvaluation);
    setIsEditing(false);
    setShowEvalActions(false);
  };

  // Handler for Delete
  const handleDelete = () => {
    setEvaluation("");
    setTempEvaluation("");
    setIsEditing(false);
    setShowEvalActions(false);
  };

  // Handler for Edit
  const handleEdit = () => {
    setIsEditing(true);
    setShowEvalActions(true);
  };

  // Handler for Add
  const handleAdd = () => {
    setIsEditing(true);
    setShowEvalActions(true);
  };

  // Handler for Cancel (when clicking Save/Delete/Edit)
  const handleCancel = () => {
    setIsEditing(false);
    setShowEvalActions(false);
    setTempEvaluation(evaluation);
  };

  return (
    <div
      className="internship-card"
      style={{
        width: "60vw",
        minWidth: "400px",
        maxWidth: "800px",
        margin: "12px auto",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start"
      }}
    >
      <h3>{applicant.name}</h3>
      <p><strong>Email:</strong> {applicant.email}</p>
      <p><strong>Internship:</strong> {applicant.internship}</p>

      <div className="field-group">
        <label>
          <strong>State: </strong>
          <select value={state} onChange={(e) => setState(e.target.value)} className="select-input">
            {stateOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="field-group">
        <label>
          <strong>Internship Phase: </strong>
          <select value={phase} onChange={(e) => setPhase(e.target.value)} className="select-input">
            {phaseOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      {phase === "Internship Complete" && (
        <div className="field-group" style={{ width: "100%", marginTop: "12px" }}>
          <strong>Evaluation:</strong>
          {/* Show Add button only if no evaluation and not editing */}
          {!showEvalActions && !evaluation && (
            <button
              style={{
                background: "#4c3d40",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "6px 16px",
                marginLeft: "16px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
              onClick={handleAdd}
            >
              <FaPlus /> Add
            </button>
          )}

          {/* If actions are shown, show textarea and action buttons */}
          {showEvalActions && (
            <div style={{ width: "100%", marginTop: "10px" }}>
              <textarea
                value={tempEvaluation}
                onChange={e => setTempEvaluation(e.target.value)}
                rows={3}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  resize: "vertical",
                  marginBottom: "10px",
                  fontSize: "1rem"
                }}
                placeholder="Write evaluation here..."
                autoFocus
                disabled={!isEditing}
              />
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  style={{
                    background: "#4c3d40",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                  onClick={handleSave}
                  type="button"
                >
                  <FaSave /> Save
                </button>
                <button
                  style={{
                    background: "#b23b3b",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                  onClick={handleDelete}
                  type="button"
                >
                  <FaTrash /> Delete
                </button>
                <button
                  style={{
                    background: "#888",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                  onClick={handleCancel}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* If evaluation exists and not editing, show evaluation and Edit button */}
          {!showEvalActions && evaluation && (
            <div style={{ width: "100%", marginTop: "10px" }}>
              <div
                style={{
                  background: "#f6eef0",
                  borderRadius: "4px",
                  padding: "10px",
                  marginBottom: "8px",
                  color: "#4c3d40"
                }}
              >
                {evaluation}
              </div>
              <button
                style={{
                  background: "#4c3d40",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  padding: "6px 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px"
                }}
                onClick={handleEdit}
                type="button"
              >
                <FaEdit /> Edit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CurrentInterns = () => {
  const [dummyApplicants] = useState([
    {
      id: 1,
      name: "Sarah Youssef",
      email: "sarah.youssef@guc.edu.eg",
      state: "Accepted",
      internshipPhase: "Current Intern",
      internship: "Frontend Development",
      educationLevel: "Undergraduate",
      year: "3rd Year",
      college: "Engineering",
      department: "Computer Science",
      evaluation: ""
    },
    {
      id: 2,
      name: "Mohamed Nabil",
      email: "mohamed.nabil@guc.edu.eg",
      state: "Finalized",
      internshipPhase: "Internship Complete",
      internship: "Backend Development",
      educationLevel: "Graduate",
      year: "5th Year",
      college: "Computer Science & Engineering",
      department: "Software Engineering",
      evaluation: "Excellent backend work and proactive communication."
    },
    {
    id: 3,
    name: "Laila Mahmoud",
    email: "laila.mahmoud@guc.edu.eg",
    state: "Finalized",
    internshipPhase: "Internship Complete",
    internship: "UI/UX Design",
    educationLevel: "Graduate",
    year: "5th Year",
    college: "Applied Arts",
    department: "Interface Design",
    evaluation: "Creative designs with excellent attention to user experience."
  },
  {
    id: 4,
    name: "Ahmed Samir",
    email: "ahmed.samir@guc.edu.eg",
    state: "Accepted",
    internshipPhase: "Current Intern",
    internship: "DevOps",
    educationLevel: "Undergraduate",
    year: "4th Year",
    college: "Computer Science & Engineering",
    department: "Networks",
    evaluation: ""
  },
  {
    id: 5,
    name: "Dina Adel",
    email: "dina.adel@guc.edu.eg",
    state: "Finalized",
    internshipPhase: "Internship Complete",
    internship: "AI Research",
    educationLevel: "Graduate",
    year: "5th Year",
    college: "Computer Science & Engineering",
    department: "Artificial Intelligence",
    evaluation: "Showed strong research capabilities and critical thinking."
  },
  {
    id: 6,
    name: "Youssef Hany",
    email: "youssef.hany@guc.edu.eg",
    state: "Pending",
    internshipPhase: "Interview Scheduled",
    internship: "Cybersecurity",
    educationLevel: "Undergraduate",
    year: "3rd Year",
    college: "Computer Science & Engineering",
    department: "Information Security",
    evaluation: ""
  },
  {
    id: 7,
    name: "Nour El Din Hassan",
    email: "nour.hassan@guc.edu.eg",
    state: "Finalized",
    internshipPhase: "Internship Complete",
    internship: "Data Analysis",
    educationLevel: "Graduate",
    year: "5th Year",
    college: "Management Technology",
    department: "Business Informatics",
    evaluation: "Delivered detailed reports and valuable insights from data."
  },
  {
    id: 8,
    name: "Mona Saeed",
    email: "mona.saeed@guc.edu.eg",
    state: "Accepted",
    internshipPhase: "Current Intern",
    internship: "Mobile App Development",
    educationLevel: "Undergraduate",
    year: "4th Year",
    college: "Computer Science & Engineering",
    department: "Software Engineering",
    evaluation: ""
  }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterPhase, setFilterPhase] = useState("");

  const filteredApplicants = dummyApplicants.filter(applicant =>
    (applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterPhase === "" || applicant.internshipPhase === filterPhase)
  );

  return (
    <div className="sidebar-layout">
      <CSidebar />
      <main className="main-content">
        <div
          style={{
            display: "flex",
            alignItems: "center", // Center vertically
            justifyContent: "center", // Center horizontally
            margin: "0 auto 32px auto", // Add space after the text
            maxWidth: "900px",
            width: "100%",
            paddingTop: "24px"
          }}
        >
          <h2
            className="center-heading"
            style={{
              textAlign: "center",
              margin: 0,
              fontWeight: 700,
              width: "100%"
            }}
          >
            Current Interns
          </h2>
        </div>

        {/* Search Bar */}
        <div
          className="search-bar"
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "750px",
            margin: "0 auto 24px auto",
            width: "100%"
          }}
        >
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
          <FaSearch style={{ marginLeft: "8px", color: "#888", fontSize: "1.2rem" }} />
        </div>

        {/* Phase Filter */}
        <div className="filters" style={{ maxWidth: "900px", margin: "0 auto 24px auto" }}>
          <label htmlFor="phase-filter"><strong>Internship Phase</strong></label>
          <select
            id="phase-filter"
            value={filterPhase}
            onChange={e => setFilterPhase(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc", marginLeft: "10px" }}
          >
            <option value="">All Phases</option>
            <option value="Current Intern">Current Intern</option>
            <option value="Internship Complete">Internship Complete</option>
          </select>
        </div>

        <div
          className="internships-list"
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto"
          }}
        >
          {filteredApplicants.map(applicant => (
            <ApplicantCard key={applicant.id} applicant={applicant} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default CurrentInterns;
