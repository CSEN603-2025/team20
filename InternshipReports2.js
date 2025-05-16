import React, { useState } from "react";
import FacultySidebar from "./FacultySidebar2";
import "./InternshipReports.css";
import { jsPDF } from "jspdf";

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
    isFinalized: true,
  },
  {
    id: 3,
    title: "Cloud Computing Internship",
    introduction: "Worked at CloudTech Inc. focusing on distributed systems.",
    body: "Gained hands-on experience with AWS and cloud architecture.",
    coursesHelped: ["Cloud Computing", "Software Engineering"],
    status: "Accepted",
    comments: "Excellent report and very thorough.",
    isFinalized: true,
  },
];


const InternshipReports2 = () => {
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

  const openCreateModal = () => {
    setFormData({ title: "", introduction: "", body: "", coursesHelped: [] });
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (report) => {
    if (report.isFinalized) {
      alert("This report is finalized and cannot be edited.");
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

  const closeModal = () => {
    setShowModal(false);
    setFormData({ title: "", introduction: "", body: "", coursesHelped: [] });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  const saveReport = () => {
    if (!formData.title || !formData.introduction || !formData.body) {
      alert("Please fill all fields.");
      return;
    }

    if (isEditing) {
      setReports((prev) =>
        prev.map((r) =>
          r.id === currentReportId ? { ...r, ...formData } : r
        )
      );
      alert("Report updated successfully.");
    } else {
      const newReport = {
        id: Date.now(),
        ...formData,
        status: "Pending",
        comments: "",
        isFinalized: false,
      };
      setReports((prev) => [...prev, newReport]);
      alert("New report created successfully.");
    }

    closeModal();
  };

  const deleteReport = (id) => {
    const reportToDelete = reports.find((r) => r.id === id);
    if (reportToDelete?.isFinalized) {
      alert("Cannot delete a finalized report.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this report?")) {
      setReports((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const openAppealModal = (reportId) => {
    setCurrentReportId(reportId);
    setAppealMessage("");
    setIsAppealModalOpen(true);
  };

  const submitAppeal = () => {
    if (!appealMessage.trim()) {
      alert("Please write an appeal message.");
      return;
    }
    alert(`Appeal Submitted: ${appealMessage}`);
    setIsAppealModalOpen(false);
  };

  // New: Finalize report (disables editing/deleting)
  const finalizeReport = (id) => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, isFinalized: true, status: "Submitted" } : r
      )
    );
    alert("Report finalized and submitted.");
  };

  // New: Download PDF
  const downloadReportAsPDF = (report) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(report.title, 10, 20);

    doc.setFontSize(12);
    doc.text("Introduction:", 10, 40);
    doc.text(report.introduction, 10, 50, { maxWidth: 180 });

    doc.text("Body:", 10, 70);
    doc.text(report.body, 10, 80, { maxWidth: 180 });

    doc.text("Courses Helped:", 10, 100);
    doc.text(report.coursesHelped.join(", "), 10, 110, { maxWidth: 180 });

    doc.text("Status: " + report.status, 10, 130);

    if (report.comments && (report.status === "Flagged" || report.status === "Rejected")) {
      doc.text("Comments:", 10, 150);
      doc.text(report.comments, 10, 160, { maxWidth: 180 });
    }

    doc.save(`${report.title.replace(/\s+/g, "_")}.pdf`);
  };

  return (
    <div
      className="my-internships-wrapper"
      style={{ backgroundColor: "#F6EEF0" }}
    >
      <FacultySidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <div
        className={`my-internships-content ${
          isSidebarCollapsed ? "collapsed" : ""
        }`}
      >
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
              <p>
                <strong>Introduction:</strong> {report.introduction}
              </p>
              <p>
                <strong>Body:</strong> {report.body}
              </p>
              <p>
                <strong>Courses Helped:</strong> {report.coursesHelped.join(", ")}
              </p>
              <p>
                <strong>Status:</strong> {report.status}
              </p>
              {report.comments &&
                (report.status === "Flagged" || report.status === "Rejected") && (
                  <p>
                    <strong>Comments:</strong> {report.comments}
                  </p>
                )}

              <button onClick={() => downloadReportAsPDF(report)}>
                Download PDF
              </button>

              {!report.isFinalized && (
                <>
                  <button onClick={() => openEditModal(report)}>Edit</button>
                  <button onClick={() => deleteReport(report.id)}>Delete</button>
                  <button onClick={() => finalizeReport(report.id)}>
                    Finalize & Submit
                  </button>
                </>
              )}

              {(report.status === "Flagged" || report.status === "Rejected") && (
                <button onClick={() => openAppealModal(report.id)}>Appeal</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for create/edit */}
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

            <div className="courses-checkboxes">
              <p>Select courses that helped during internship:</p>
              {coursesAvailable.map((course) => (
                <label key={course}>
                  <input
                    type="checkbox"
                    checked={formData.coursesHelped.includes(course)}
                    onChange={() => handleCourseToggle(course)}
                  />
                  {course}
                </label>
              ))}
            </div>

            <button onClick={saveReport}>Save Report</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}

      {/* Appeal modal */}
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

export default InternshipReports2;
