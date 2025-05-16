// src/components/pages/Report.jsx
import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import "./FacultyDashboard.css";  // reuse existing styles
import "./Report.css";            // new report‐specific styles
import FacultySidebar from "./FacultySidebar";
import { Link } from "react-router-dom";


function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

const Report = () => {
  // ───────── Sidebar / Header State ─────────
  const [isCollapsed, setIsCollapsed]       = useState(false);
  //const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //const [showPopup, setShowPopup]           = useState(false);
  const [statisticsModalVisible, setStatisticsModalVisible] = useState(false);

  const toggleSidebar  = () => setIsCollapsed(!isCollapsed);
  //const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // ───────── Reports Data & State ─────────
  const reports = [
    { name: "Ali Hassan",    id: "S12345", major: "Engineering",      status: "pending",  fileUrl: "/reports/ali.pdf" },
    { name: "Sara Ahmed",    id: "S67890", major: "Business",         status: "accepted", fileUrl: "/reports/sara.pdf" },
    { name: "Omar Naguib",   id: "S24680", major: "Engineering",      status: "rejected", fileUrl: "/reports/omar.pdf" },
    { name: "Mona Soliman",  id: "S13579", major: "Design",           status: "flagged",  fileUrl: "/reports/mona.pdf" },
    { name: "Youssef Kamal", id: "S98765", major: "Computer Science", status: "accepted", fileUrl: "/reports/youssef.pdf" },
    { name: "Layla Hussein", id: "S11223", major: "Engineering",      status: "flagged",  fileUrl: "/reports/layla.pdf" },
    { name: "Karim Adel",    id: "S33445", major: "Business",         status: "rejected", fileUrl: "/reports/karim.pdf" },
  ];
  const majors       = Array.from(new Set(reports.map(r => r.major)));
  const statusesList = ["pending", "accepted", "rejected", "flagged"];

  // build data for the stats modal
  const statusData = statusesList.map(status => ({
    name: status,
    count: reports.filter(r => r.status === status).length
  }));

  // for editable status dropdown per record
  const [studentStatuses, setStudentStatuses] = useState(
    () => reports.reduce((acc, r) => ({ ...acc, [r.id]: r.status }), {})
  );
  const handleStatusChange = (id, newStatus) => {
    setStudentStatuses(prev => ({ ...prev, [id]: newStatus }));
  };

  // filters
  const [reportMajorFilter,  setReportMajorFilter ]  = useState("");
  const [reportStatusFilter, setReportStatusFilter] = useState("");
  const [filteredReports,    setFilteredReports]    = useState(reports);
  const applyReportFilter = () => {
    setFilteredReports(
      reports.filter(r =>
        (!reportMajorFilter  || r.major  === reportMajorFilter) &&
        (!reportStatusFilter || studentStatuses[r.id] === reportStatusFilter)
      )
    );
  };

  // show stats modal
  const generateStatisticsReport = () => setStatisticsModalVisible(true);
  const generateStatistics = () => {
    alert(
      `Total reports: ${filteredReports.length}\n` +
      `Pending: ${filteredReports.filter(r => studentStatuses[r.id]==="pending").length}\n` +
      `Accepted: ${filteredReports.filter(r => studentStatuses[r.id]==="accepted").length}\n` +
      `Rejected: ${filteredReports.filter(r => studentStatuses[r.id]==="rejected").length}\n` +
      `Flagged: ${filteredReports.filter(r => studentStatuses[r.id]==="flagged").length}`
    );
  };

  // detail modals
  const [reportModalVisible,    setReportModalVisible]    = useState(false);
  const [reportModalData,       setReportModalData]       = useState(null);
  const openReportModal = r => {
    setReportModalData(r);
    setReportModalVisible(true);
  };
  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false);
  const [evaluationModalData,    setEvaluationModalData]    = useState(null);
  const openEvaluationModal = r => {
    setEvaluationModalData({
      name:        r.name,
      id:          r.id,
      major:       r.major,
      status:      studentStatuses[r.id],
      companyName: "Example Corp",
      supervisor:  "Dr. John Smith",
      startDate:   "2025-06-01",
      endDate:     "2025-08-31"
    });
    setEvaluationModalVisible(true);
  };

  return (
    <div>
      {/* Sidebar */}
      <FacultySidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        onProfileClick={() => {}}
      />

      {/* Header */}
      <div className="bg-header">
        <div className="header-content">
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
          >☰</button>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="cards-panel narrow-cards">
        <div className="search-wrapper">
          <select
            value={reportMajorFilter}
            onChange={e => setReportMajorFilter(e.target.value)}
          >
            <option value="">All Majors</option>
            {majors.map(m => <option key={m}>{m}</option>)}
          </select>
          <select
            value={reportStatusFilter}
            onChange={e => setReportStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            {statusesList.map(s => <option key={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>)}
          </select>
          <button className="filter-btn" onClick={applyReportFilter}>
            Filter
          </button>
          <button className="filter-btn" onClick={generateStatisticsReport}>
             Statistics Report
          </button>
          <Link
  to="/faculty-dashboard"
  className="filter-btn"
  onClick={generateStatistics}
>
  Generate Statistics
</Link>

        </div>

        {/* Report Cards */}
        <div className="cards-list">
          {filteredReports.map(r => (
            <div key={r.id} className="card">
              <h3>{r.name}</h3>
              <p>ID: {r.id}</p>
              <p>Major: {r.major}</p>
              <label>
                <strong>Status:</strong>{" "}
                <select
                  value={studentStatuses[r.id]}
                  onChange={e => handleStatusChange(r.id, e.target.value)}
                >
                  {statusesList.map(s => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </label>

              <div className="card-actions">
                <a href={r.fileUrl} download className="download-btn">
                  <FaDownload />
                </a>
                <button
                  className="view-btn"
                  onClick={() => openReportModal(r)}
                >
                  View Internship Report
                </button>
                <button
                  className="view-btn"
                  onClick={() => openEvaluationModal(r)}
                >
                  View Evaluation Report
                </button>
              </div>
            </div>
          ))}
          {filteredReports.length === 0 && <p>No reports match your filters.</p>}
        </div>
      </div>

      {/* Internship Report Modal */}
      {reportModalVisible && reportModalData && (
        <Modal onClose={() => setReportModalVisible(false)}>
          <h3>Internship Report for {reportModalData.name}</h3>
          <p>Student ID: {reportModalData.id}</p>
          <p>Major: {reportModalData.major}</p>
        </Modal>
      )}

      {/* Evaluation Report Modal */}
      {evaluationModalVisible && evaluationModalData && (
        <Modal onClose={() => setEvaluationModalVisible(false)}>
          <h3>Evaluation Report for {evaluationModalData.name}</h3>
          <p><strong>Student ID:</strong> {evaluationModalData.id}</p>
          <p><strong>Major:</strong> {evaluationModalData.major}</p>
          <p><strong>Status:</strong> {evaluationModalData.status}</p>
          <hr />
          <p><strong>Company Name:</strong> {evaluationModalData.companyName}</p>
          <p><strong>Supervisor:</strong> {evaluationModalData.supervisor}</p>
          <p><strong>Start Date:</strong> {evaluationModalData.startDate}</p>
          <p><strong>End Date:</strong> {evaluationModalData.endDate}</p>
        </Modal>
      )}

      {/* Statistics Report Modal */}
      {statisticsModalVisible && (
        <Modal onClose={() => setStatisticsModalVisible(false)}>
          <h3>Statistics Report</h3>
          <ul style={{ paddingLeft: 20 }}>
            <li>
              <strong>Report Status:</strong>
              <ul>
                {statusData.map(d => (
                  <li key={d.name}>
                    {d.name.charAt(0).toUpperCase()+d.name.slice(1)}: {d.count}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <div style={{ textAlign: "right", marginTop: 16 }}>
            <button
              className="filter-btn"
              onClick={() => setStatisticsModalVisible(false)}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Report;
