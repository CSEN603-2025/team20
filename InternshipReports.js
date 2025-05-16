import React, { useState } from "react";
import FacultySidebar from "./FacultySidebar";
import "./InternshipReports.css";

const coursesAvailable = [
  "Web Development",
  "Database Systems",
  "Computer Networks",
  "Software Engineering",
  "Artificial Intelligence",
  "Cloud Computing",
  "Cyber Security",
  "Data Science",
  "Mobile Application Development",
  "Human-Computer Interaction",
];

const initialReports = [
  {
    id: 1,
    title: "My First Internship",
    introduction: "This internship was at XYZ Corp.",
    body: "I learned a lot about web development and team collaboration.",
    coursesHelped: ["Web Development", "Software Engineering"],
    status: "Pending",
    comments: "",
    isFinalized: false,
  },
  {
    id: 2,
    title: "Data Science Internship",
    introduction: "I worked on machine learning models at ABC Analytics.",
    body: "I enhanced my skills in Python and data visualization.",
    coursesHelped: ["Data Science", "Artificial Intelligence"],
    status: "Flagged",
    comments: "Needs more explanation on project impact.",
    isFinalized: false,
  },
];

const InternshipReports = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [reports, setReports] = useState(initialReports);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentReportId, setCurrentReportId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    introduction: "",
    body: "",
    coursesHelped: [],
  });
  const [appealMessage, setAppealMessage] = useState("");
  const [isAppealModalOpen, setIsAppealModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  // Open Create Modal
  const openCreateModal = () => {
    setFormData({ title: "", introduction: "", body: "", coursesHelped: [] });
    setIsEditing(false);
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (report) => {
    if (report.isFinalized) {
      alert("⚠️ You cannot edit a finalized report.");
      return;
    }
    setCurrentReportId(report.id);
    setFormData({
      title: report.title,
      introduction: report.introduction,
      body: report.body,
      coursesHelped: report.coursesHelped,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setFormData({ title: "", introduction: "", body: "", coursesHelped: [] });
  };

  // Handle input change for title, intro, body
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle courses helped selection
  const handleCourseToggle = (course) => {
    setFormData((prev) => {
      const isSelected = prev.coursesHelped.includes(course);
      if (isSelected) {
        return {
          ...prev,
          coursesHelped: prev.coursesHelped.filter((c) => c !== course),
        };
      } else {
        return { ...prev, coursesHelped: [...prev.coursesHelped, course] };
      }
    });
  };

  // Save Report
  const saveReport = () => {
    if (!formData.title || !formData.introduction || !formData.body) {
      alert("⚠️ Please fill all fields.");
      return;
    }
    if (formData.coursesHelped.length === 0) {
      alert("⚠️ Please select at least one course that helped you.");
      return;
    }

    if (isEditing) {
      setReports((prev) =>
        prev.map((r) =>
          r.id === currentReportId ? { ...r, ...formData } : r
        )
      );
      alert("✅ Report updated successfully.");
    } else {
      const newReport = {
        id: Date.now(),
        ...formData,
        status: "Pending",
        comments: "",
        isFinalized: false,
      };
      setReports((prev) => [...prev, newReport]);
      alert("✅ New report created successfully.");
    }
    closeModal();
  };

  // Delete Report
  const deleteReport = (id) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Finalize Report (submit full finalized report)
  const finalizeReport = (id) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isFinalized: true, status: "Approved" } : r
      )
    );
    alert("✅ Report has been finalized and submitted!");
  };

  // Open Appeal Modal
  const openAppealModal = (reportId) => {
    setCurrentReportId(reportId);
    setAppealMessage("");
    setIsAppealModalOpen(true);
  };

  // Submit Appeal
  const submitAppeal = () => {
    if (!appealMessage.trim()) {
      alert("⚠️ Please write an appeal message.");
      return;
    }
    alert(`📝 Appeal Submitted: ${appealMessage}`);
    setIsAppealModalOpen(false);
  };

  return (
    <div className="my-internships-wrapper" style={{ backgroundColor: "#F6EEF0" }}>
      <FacultySidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div className={`my-internships-content ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <h2>My Internship Reports</h2>

        <button onClick={openCreateModal} className="evaluation-btn">
          + Create New Report
        </button>

        <div className="my-internships-list">
          {reports.map((report) => (
            <div
              key={report.id}
              className={`my-internships-card ${report.status.toLowerCase()}`}
              style={{ opacity: report.isFinalized ? 0.7 : 1 }}
            >
              <h3>{report.title}</h3>
              <p><strong>Introduction:</strong> {report.introduction}</p>
              <p><strong>Body:</strong> {report.body}</p>
              <p><strong>Courses Helped:</strong> {report.coursesHelped.join(", ")}</p>
              <p><strong>Status:</strong> {report.status}</p>
              {report.comments && (report.status === "Flagged" || report.status === "Rejected") && (
                <p><strong>Comments:</strong> {report.comments}</p>
              )}

              {!report.isFinalized && (
                <>
                  <button onClick={() => openEditModal(report)}>Edit</button>
                  <button onClick={() => deleteReport(report.id)}>Delete</button>
                  <button onClick={() => finalizeReport(report.id)}>Finalize & Submit</button>
                </>
              )}

              {(report.status === "Flagged" || report.status === "Rejected") && (
                <button onClick={() => openAppealModal(report.id)}>Appeal</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="modal-overlay open">
          <div className="modal-content">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <textarea
              name="introduction"
              placeholder="Introduction"
              value={formData.introduction}
              onChange={handleInputChange}
            />
            <textarea
              name="body"
              placeholder="Body"
              value={formData.body}
              onChange={handleInputChange}
            />

            <div>
              <strong>Select Courses That Helped You:</strong>
              <div style={{ maxHeight: 150, overflowY: "auto", border: "1px solid #ccc", padding: 5 }}>
                {coursesAvailable.map((course) => (
                  <label key={course} style={{ display: "block", margin: "4px 0" }}>
                    <input
                      type="checkbox"
                      checked={formData.coursesHelped.includes(course)}
                      onChange={() => handleCourseToggle(course)}
                    />{" "}
                    {course}
                  </label>
                ))}
              </div>
            </div>

            <button onClick={saveReport}>Save Report</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

      {/* Appeal Modal */}
      {isAppealModalOpen && (
        <div className="modal-overlay open">
          <div className="modal-content">
            <textarea
              placeholder="Write your appeal message..."
              value={appealMessage}
              onChange={(e) => setAppealMessage(e.target.value)}
            />
            <button onClick={submitAppeal}>Submit Appeal</button>
            <button onClick={() => setIsAppealModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipReports;
