import React, { useState } from "react";
import FacultySidebar2 from "./FacultySidebar2";
import "./FacultyDashboard2.css";

const FacultyDashboard2 = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePanel, setActivePanel] = useState("reports");

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  // ─── Dummy Reports Data ─────────────────────────────────────────────
  const reports = [
    { name: "Ali Hassan", id: "S12345", major: "Engineering", status: "pending", fileUrl: "/reports/ali.pdf" },
    { name: "Sara Ahmed", id: "S67890", major: "Business", status: "accepted", fileUrl: "/reports/sara.pdf" },
    { name: "Omar Naguib", id: "S24680", major: "Engineering", status: "rejected", fileUrl: "/reports/omar.pdf" },
    { name: "Mona Soliman", id: "S13579", major: "Design", status: "flagged", fileUrl: "/reports/mona.pdf" },
  
    // ✅ Additional dummy reports
    { name: "Youssef Kamal", id: "S98765", major: "Computer Science", status: "accepted", fileUrl: "/reports/youssef.pdf" },
    { name: "Layla Hussein", id: "S11223", major: "Engineering", status: "flagged", fileUrl: "/reports/layla.pdf" },
    { name: "Karim Adel", id: "S33445", major: "Business", status: "rejected", fileUrl: "/reports/karim.pdf" },
  ];
  

  const majors = Array.from(new Set(reports.map(r => r.major)));
  const statusesList = ["pending", "accepted", "rejected", "flagged"];

  const [reportMajorFilter, setReportMajorFilter] = useState("");
  const [reportStatusFilter, setReportStatusFilter] = useState("");
  const [filteredReports, setFilteredReports] = useState(reports);

  const applyReportFilter = () => {
    setFilteredReports(
      reports.filter(r =>
        (!reportMajorFilter || r.major === reportMajorFilter) &&
        (!reportStatusFilter || r.status === reportStatusFilter)
      )
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <FacultySidebar2
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        activePanel={activePanel}
        setActivePanel={setActivePanel}
      />
      <div
  className="faculty-dashboard"
  style={{
    marginLeft: isCollapsed ? "64px" : "256px",
    padding: "200px 20px 20px 20px", // ⬅️ sets top padding properly
    flex: 1
  }}
>

        {activePanel === "reports" && (
          <div className="reports-panel">
            <div className="search-wrapper">
              <select
                value={reportMajorFilter}
                onChange={e => setReportMajorFilter(e.target.value)}
              >
                <option value="">All Majors</option>
                {majors.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              <select
                value={reportStatusFilter}
                onChange={e => setReportStatusFilter(e.target.value)}
              >
                <option value="">All Statuses</option>
                {statusesList.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <button className="filter-btn" onClick={applyReportFilter}>Filter</button>
            </div>

            <div className="cards-list">
  {filteredReports.map(r => (
    <div key={r.id} className="card">
      <h3>{r.name}</h3>
      <p>ID: {r.id}</p>
      <p>Major: {r.major}</p>
      <p>Status: {r.status}</p>
      <a href={r.fileUrl} download className="coffee-btn" title="Download Report">
  Download
</a>

    </div>
  ))}
</div>

          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard2;
