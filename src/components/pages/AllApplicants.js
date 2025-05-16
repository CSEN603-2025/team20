import React, { useState } from "react";
import "./Cards.css";
import CSidebar from "./CSidebar";
import "./AllApplicants.css";
import { FaSearch, FaPlus } from "react-icons/fa";

const ApplicantCard = ({ applicant }) => {
  const [state, setState] = useState(applicant.state);
  const [phase, setPhase] = useState(applicant.internshipPhase);
  const [showDetails, setShowDetails] = useState(false);

  const stateOptions = ["Finalized", "Accepted", "Rejected"];
  const phaseOptions = ["Current Intern", "Internship Complete"];

  return (
    <>
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

        <button className="btn" onClick={() => setShowDetails(true)}>View Details</button>
      </div>

      {/* Modal */}
      {showDetails && (
        <div className="modal-overlay" onClick={() => setShowDetails(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Applicant Details</h3>
            <p><strong>Education Level:</strong> {applicant.educationLevel}</p>
            <p><strong>Year:</strong> {applicant.year}</p>
            <p><strong>College:</strong> {applicant.college}</p>
            <p><strong>Department:</strong> {applicant.department}</p>
            <button onClick={() => setShowDetails(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

const AllApplicants = () => {
  const [dummyApplicants, setDummyApplicants] = useState([
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
      department: "Computer Science"
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
      department: "Software Engineering"
    },
      {
    id: 3,
    name: "Salma Ahmed",
    email: "salma.ahmed@guc.edu.eg",
    state: "Finalized",
    internshipPhase: "Internship Complete",
    internship: "Frontend Development",
    educationLevel: "Graduate",
    year: "5th Year",
    college: "Computer Science & Engineering",
    department: "Computer Vision"
  },
  {
    id: 4,
    name: "Youssef Hassan",
    email: "youssef.hassan@guc.edu.eg",
    state: "In Progress",
    internshipPhase: "Mid Internship",
    internship: "Mobile App Development",
    educationLevel: "Undergraduate",
    year: "4th Year",
    college: "Computer Science & Engineering",
    department: "Software Engineering"
  },
  {
    id: 5,
    name: "Nourhan Magdy",
    email: "nourhan.magdy@guc.edu.eg",
    state: "Pending",
    internshipPhase: "Interview Scheduled",
    internship: "UI/UX Design",
    educationLevel: "Undergraduate",
    year: "3rd Year",
    college: "Applied Arts",
    department: "Interface Design"
  },
  {
    id: 6,
    name: "Omar Khaled",
    email: "omar.khaled@guc.edu.eg",
    state: "Rejected",
    internshipPhase: "Application Reviewed",
    internship: "Cybersecurity",
    educationLevel: "Graduate",
    year: "5th Year",
    college: "Computer Science & Engineering",
    department: "Information Security"
  },
  {
    id: 7,
    name: "Mariam Yasser",
    email: "mariam.yasser@guc.edu.eg",
    state: "Finalized",
    internshipPhase: "Internship Complete",
    internship: "Data Analysis",
    educationLevel: "Graduate",
    year: "5th Year",
    college: "Management Technology",
    department: "Business Informatics"
  },
  {
    id: 8,
    name: "Ahmed Tarek",
    email: "ahmed.tarek@guc.edu.eg",
    state: "In Progress",
    internshipPhase: "Onboarding",
    internship: "DevOps",
    educationLevel: "Undergraduate",
    year: "4th Year",
    college: "Computer Science & Engineering",
    department: "Networks"
  },
  {
    id: 9,
    name: "Laila Mostafa",
    email: "laila.mostafa@guc.edu.eg",
    state: "Pending",
    internshipPhase: "Awaiting Feedback",
    internship: "Project Management",
    educationLevel: "Undergraduate",
    year: "3rd Year",
    college: "Management Technology",
    department: "Business Information Systems"
  },
  {
    id: 10,
    name: "Kareem Adel",
    email: "kareem.adel@guc.edu.eg",
    state: "Finalized",
    internshipPhase: "Internship Complete",
    internship: "Cloud Computing",
    educationLevel: "Graduate",
    year: "5th Year",
    college: "Computer Science & Engineering",
    department: "Software Engineering"
  },
  {
    id: 11,
    name: "Hana Sherif",
    email: "hana.sherif@guc.edu.eg",
    state: "In Progress",
    internshipPhase: "Training Phase",
    internship: "AI Research",
    educationLevel: "Undergraduate",
    year: "4th Year",
    college: "Computer Science & Engineering",
    department: "Artificial Intelligence"
  }
    // Add more applicants as needed
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterInternship, setFilterInternship] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newApplicant, setNewApplicant] = useState({
    name: "",
    email: "",
    internship: "",
    state: "Accepted",
    internshipPhase: "Current Intern",
    educationLevel: "",
    year: "",
    college: "",
    department: ""
  });

  const internshipOptions = [
    "Frontend Development",
    "Backend Development",
    "Data Analysis"
  ];

  const handleAddApplicant = (e) => {
    e.preventDefault();
    setDummyApplicants(prev => [
      ...prev,
      {
        ...newApplicant,
        id: prev.length + 1
      }
    ]);
    setShowAddModal(false);
    setNewApplicant({
      name: "",
      email: "",
      internship: "",
      state: "Accepted",
      internshipPhase: "Current Intern",
      educationLevel: "",
      year: "",
      college: "",
      department: ""
    });
  };

  const filteredApplicants = dummyApplicants.filter(applicant =>
    (applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterInternship === "" || applicant.internship === filterInternship)
  );

  return (
    <div className="sidebar-layout">
      <CSidebar />
      <main className="main-content">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "24px 0" }}>
          <h2 className="center-heading" style={{ textAlign: "center", margin: 0, flex: 1 }}>
            All Applicants
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              background: "#4c3d40",
              color: "#fff",
              border: "none",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "16px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
            }}
            aria-label="Add Applicant"
            title="Add Applicant"
          >
            <FaPlus size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="search-bar" style={{ display: "flex", alignItems: "center", maxWidth: "900px", margin: "0 auto 24px auto" }}>
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "4px",
              maxWidth: "750px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
          <FaSearch style={{ marginLeft: "8px", color: "#888", fontSize: "1.2rem" }} />
        </div>

        {/* Internship Filter */}
        <div className="filters">
          <div>
            <label htmlFor="internship-filter">Internship</label>
            <select
              id="internship-filter"
              value={filterInternship}
              onChange={e => setFilterInternship(e.target.value)}
            >
              <option value="">All Internships</option>
              {internshipOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        <div
          className="internships-list"
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto 0 auto" // Same as search bar margins
          }}
        >
          {filteredApplicants.map(applicant => (
            <ApplicantCard key={applicant.id} applicant={applicant} />
          ))}
        </div>

        {/* Add Applicant Modal */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div
              className="modal-content"
              style={{
                background: "#fff",
                borderRadius: "10px",
                maxWidth: "420px",
                width: "95%",
                margin: "60px auto",
                padding: "32px 24px",
                boxShadow: "0 4px 24px rgba(76,61,64,0.12)",
                color: "#4c3d40"
              }}
              onClick={e => e.stopPropagation()}
            >
              <h3 style={{ marginBottom: "18px", color: "#4c3d40" }}>Add New Applicant</h3>
              <form onSubmit={handleAddApplicant} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <input
                  type="text"
                  placeholder="Name"
                  value={newApplicant.name}
                  onChange={e => setNewApplicant({ ...newApplicant, name: e.target.value })}
                  required
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newApplicant.email}
                  onChange={e => setNewApplicant({ ...newApplicant, email: e.target.value })}
                  required
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <select
                  value={newApplicant.internship}
                  onChange={e => setNewApplicant({ ...newApplicant, internship: e.target.value })}
                  required
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                >
                  <option value="">Select Internship</option>
                  {internshipOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <select
                  value={newApplicant.state}
                  onChange={e => setNewApplicant({ ...newApplicant, state: e.target.value })}
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                >
                  <option value="Accepted">Accepted</option>
                  <option value="Finalized">Finalized</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <select
                  value={newApplicant.internshipPhase}
                  onChange={e => setNewApplicant({ ...newApplicant, internshipPhase: e.target.value })}
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                >
                  <option value="Current Intern">Current Intern</option>
                  <option value="Internship Complete">Internship Complete</option>
                </select>
                <input
                  type="text"
                  placeholder="Education Level"
                  value={newApplicant.educationLevel}
                  onChange={e => setNewApplicant({ ...newApplicant, educationLevel: e.target.value })}
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <input
                  type="text"
                  placeholder="Year"
                  value={newApplicant.year}
                  onChange={e => setNewApplicant({ ...newApplicant, year: e.target.value })}
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <input
                  type="text"
                  placeholder="College"
                  value={newApplicant.college}
                  onChange={e => setNewApplicant({ ...newApplicant, college: e.target.value })}
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={newApplicant.department}
                  onChange={e => setNewApplicant({ ...newApplicant, department: e.target.value })}
                  style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                  <button
                    type="submit"
                    style={{
                      background: "#4c3d40",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "8px 18px",
                      cursor: "pointer"
                    }}
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    style={{
                      background: "#888",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      padding: "8px 18px",
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AllApplicants;
