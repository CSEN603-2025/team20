import React, { useState } from "react";
import CSidebar from "./CSidebar";
import { Search, Plus } from "lucide-react";
import "./Cards.css";
import "./CompanyInternship.css";

  const initialInternships = [
  {
    post: "Frontend Developer Intern",
    duration: "3 months",
    paid: true,
    salary: "3000 EGP",
    skills: "React, CSS, JavaScript",
    description: "Work on frontend features using React and CSS.",
    applicants: 12 // dummy data
  },
  {
    post: "Full Stack Developer Intern",
    duration: "3 months",
    paid: true,
    salary: "40000 EGP",
    skills: "Node.js, React, MongoDB",
    description: "Develop full stack applications with Node and React.",
    applicants: 8 // dummy data
  },
  {
    post: "Backend Developer Intern",
    duration: "6 months",
    paid: false,
    salary: "-",
    skills: "Express, SQL, REST APIs",
    description: "Build and maintain backend RESTful APIs.",
    applicants: 5 // dummy data
  },
  {
    post: "UI/UX Designer Intern",
    duration: "2 months",
    paid: true,
    salary: "2500 EGP",
    skills: "Figma, Adobe XD, User Research",
    description: "Design user interfaces and conduct user research.",
    applicants: 15 // dummy data
  },
  {
    post: "Data Science Intern",
    duration: "4 months",
    paid: true,
    salary: "3500 EGP",
    skills: "Python, Machine Learning, Data Analysis",
    description: "Analyze data and build machine learning models.",
    applicants: 10 // dummy data
  },
  {
    post: "Marketing Intern",
    duration: "3 months",
    paid: false,
    salary: "-",
    skills: "SEO, Content Creation, Social Media",
    description: "Assist in marketing campaigns and content creation.",
    applicants: 20 // dummy data
  }
  
];

const CompanyInternship = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: "", content: "" });
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [internships, setInternships] = useState(initialInternships);

  // Edit modal state
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    post: "",
    duration: "",
    paid: false,
    salary: "",
    skills: "",
    description: "",
    applicants: 0
  });

  // Add modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    post: "",
    duration: "",
    paid: false,
    salary: "",
    skills: "",
    description: "",
    applicants: 0
  });

  const [filterInternship, setFilterInternship] = useState(""); // Add this state

  // Get unique internship titles for filter options
  const internshipOptions = Array.from(new Set(internships.map(i => i.post)));

  // Filter internships by search and filter
  const filteredInternships = internships.filter(
    (internship) =>
      internship.post.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterInternship === "" || internship.post === filterInternship)
  );

  const openModal = (type, content) => {
    setModalContent({ type, content });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Open edit modal
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditForm({ ...internships[index] });
    setMenuOpenIndex(null);
  };

  // Handle edit form change
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Save edit
  const handleEditSave = (e) => {
    e.preventDefault();
    setInternships((prev) =>
      prev.map((item, idx) => (idx === editIndex ? { ...editForm } : item))
    );
    setEditIndex(null);
  };

  // Cancel edit
  const handleEditCancel = () => {
    setEditIndex(null);
  };

  // Handle add form change
  const handleAddChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Save new internship
  const handleAddSave = (e) => {
    e.preventDefault();
    setInternships((prev) => [...prev, { ...addForm }]);
    setAddForm({
      post: "",
      duration: "",
      paid: false,
      salary: "",
      skills: "",
      description: "",
      applicants: 0
    });
    setAddModalOpen(false);
  };

  // Delete internship
  const handleDelete = (index) => {
    setInternships((prev) => prev.filter((_, idx) => idx !== index));
    setMenuOpenIndex(null);
  };

  // Close kebab menu when clicking outside
  React.useEffect(() => {
    const handleClick = () => setMenuOpenIndex(null);
    if (menuOpenIndex !== null) {
      window.addEventListener("click", handleClick);
      return () => window.removeEventListener("click", handleClick);
    }
  }, [menuOpenIndex]);

  return (
    <div className="sidebar-layout">
      <CSidebar />
      <main className="main-content">
        {/* Header with Add icon */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            margin: "0 auto 0 auto",
            maxWidth: "900px",
            width: "100%",
            paddingTop: "24px"
          }}
        >
          <h2
            style={{
              textAlign: "Center",
              margin: 0,
              fontWeight: 700,
              flex: 1 // Take available space, pushes button to right
            }}
          >
            Listed internships available
          </h2>
          <button
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
              marginLeft: "auto",
              marginRight: "0px",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(0,0,0,0.10)"
            }}
            onClick={() => setAddModalOpen(true)}
            aria-label="Add"
            title="Add Internship"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div
          className="search-bar"
          style={{
            display: "flex",
            alignItems: "center",
            maxWidth: "900px",
            margin: "0 auto 24px auto",
            width: "100%"
          }}
        >
          <input
            type="text"
            placeholder="Search internship..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "4px",
              maxWidth: "750px",
              border: "1px solid #ccc",
              fontSize: "1rem"
            }}
          />
          <Search style={{ marginLeft: "8px", color: "#888", fontSize: "1.2rem" }} />
        </div>

        {/* Filter Bar */}
        <div
          className="filters"
          style={{
            maxWidth: "900px",
            margin: "0 auto 24px auto"
          }}
        >
          <label htmlFor="internship-filter"><strong>Internship</strong></label>
          <select
            id="internship-filter"
            value={filterInternship}
            onChange={e => setFilterInternship(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginLeft: "10px"
            }}
          >
            <option value="">All Internships</option>
            {internshipOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div className="internships-list">
          {filteredInternships.map((internship, index) => (
            <div className="internship-card" key={index} style={{ position: "relative" }}>
              {/* Kebab button */}
              <button
                className="kebab-btn"
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "none",
                  border: "none",
                  fontSize: "22px",
                  cursor: "pointer",
                  color: "#4c3d40"
                }}
                onClick={e => {
                  e.stopPropagation();
                  setMenuOpenIndex(menuOpenIndex === index ? null : index);
                }}
                aria-label="More options"
              >
                ⋮
              </button>
              {/* Kebab menu */}
              {menuOpenIndex === index && (
                <div
                  className="kebab-menu"
                  style={{
                    position: "absolute",
                    top: 40,
                    right: 12,
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    zIndex: 10,
                    minWidth: "120px"
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      width: "100%",
                      padding: "10px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#4c3d40"
                    }}
                    onClick={() => handleEdit(index)}
                  >
                    <span role="img" aria-label="edit">📝</span> Edit
                  </button>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      width: "100%",
                      padding: "10px 16px",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "16px",
                      color: "#4c3d40"
                    }}
                    onClick={() => handleDelete(index)}
                  >
                    <span role="img" aria-label="delete">🗑️</span> Delete
                  </button>
                </div>
              )}

              <h3>{internship.post}</h3>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Paid:</strong> {internship.paid ? "Yes" : "No"}</p>
              <p><strong>Salary:</strong> {internship.salary}</p>
              <p><strong>Applicants:</strong> {internship.applicants}</p>

              <div className="button-group">
                <button className="btn" onClick={() => openModal("Skills", internship.skills)}>
                  Skills
                </button>
                <button className="btn" onClick={() => openModal("Description", internship.description)}>
                  Description
                </button>
              </div>
            </div>
          ))}
        </div>

        {addModalOpen && (
          <div className="modal-overlay" onClick={() => setAddModalOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>Add Internship</h3>
              <form className="internship-form" onSubmit={handleAddSave}>
                <label>
                  Title:
                  <input
                    type="text"
                    name="post"
                    value={addForm.post}
                    onChange={handleAddChange}
                    required
                  />
                </label>

                <label>
                  Duration:
                  <input
                    type="text"
                    name="duration"
                    value={addForm.duration}
                    onChange={handleAddChange}
                    required
                  />
                </label>

                <div className="checkbox-label">
                  <input
                    type="checkbox"
                    name="paid"
                    checked={addForm.paid}
                    onChange={handleAddChange}
                  />
                  <span>Paid</span>
                </div>

                <label>
                  Salary:
                  <input
                    type="text"
                    name="salary"
                    value={addForm.salary}
                    onChange={handleAddChange}
                  />
                </label>

                <label>
                  Skills:
                  <input
                    type="text"
                    name="skills"
                    value={addForm.skills}
                    onChange={handleAddChange}
                  />
                </label>

                <label>
                  Description:
                  <textarea
                    name="description"
                    value={addForm.description}
                    onChange={handleAddChange}
                  />
                </label>
                <div className="form-buttons">
                  <button type="submit" className="submit-button">Add</button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setAddModalOpen(false)}
                    style={{
                      background: "#b23b3b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "14px",
                      marginLeft: "8px"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Edit Modal - Only updated form styling */}
        {editIndex !== null && (
          <div className="modal-overlay" onClick={handleEditCancel}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>Edit Internship</h3>
              <form className="internship-form" onSubmit={handleEditSave}>
                <label>
                  Title:
                  <input
                    type="text"
                    name="post"
                    value={editForm.post}
                    onChange={handleEditChange}
                    required
                  />
                </label>

                <label>
                  Duration:
                  <input
                    type="text"
                    name="duration"
                    value={editForm.duration}
                    onChange={handleEditChange}
                    required
                  />
                </label>

                <div className="checkbox-label">
                  <input
                    type="checkbox"
                    name="paid"
                    checked={editForm.paid}
                    onChange={handleEditChange}
                  />
                  <span>Paid</span>
                </div>

                <label>
                  Salary:
                  <input
                    type="text"
                    name="salary"
                    value={editForm.salary}
                    onChange={handleEditChange}
                  />
                </label>

                <label>
                  Skills:
                  <input
                    type="text"
                    name="skills"
                    value={editForm.skills}
                    onChange={handleEditChange}
                  />
                </label>

                <label>
                  Description:
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                  />
                </label>

                <div className="form-buttons">
                  <button type="submit" className="submit-button">Save</button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleEditCancel}
                    style={{
                      background: "#888",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 16px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      fontSize: "14px",
                      marginLeft: "8px"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {modalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>{modalContent.type}</h3>
              <p>{modalContent.content}</p>
              <button className="btn" onClick={closeModal} style={{ marginTop: "20px" }}>
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanyInternship;