
// src/components/CompanyDashboard.jsx
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import HabibaSidebar from "./HabibaSidebar";
import "./CompanyDashboard.css";
import { FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import AvailableInternships3 from "./AvailableInternships3";
import "./AvailableInternship3.css";
import { FaChevronDown } from "react-icons/fa";




export default function CompanyDashboard() {
  const location = useLocation();
  const isInternships = location.pathname.includes("/company-dashboard/internships");
  const isApplications = location.pathname.includes("/company-dashboard/applications");
  const isCurrentInterns = location.pathname.includes("/company-dashboard/current-interns");
  const isScad = location.pathname.includes("/scad-internships");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  //const [showPopup, setShowPopup]           = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  

  // applications state now includes startDate and endDate
  const [applications, setApplications] = useState([
    {
      id: 1,
      post: "Frontend Developer Intern",
      name: "Alice Johnson",
      status: "Finalized",
      startDate: "2025-05-01",
      endDate:   "2025-08-01",
      email: "alice.johnson@example.com",
      phone: "+20 100 123 4567",
      university: "German University in Cairo",
      major: "Media Engineering & Technology",
      gpa: "3.7",
      appliedOn: "2025-04-15",
      skills: ["React", "JavaScript", "CSS"]
    },
    {
      id: 2,
      post: "Backend API Intern",
      name: "Bob Smith",
      status: "Accepted",
      startDate: "2025-06-01",
      endDate:   "2025-09-01",
      email: "bob.smith@example.com",
      phone: "+20 101 234 5678",
      university: "Cairo University",
      major: "Computer Science",
      gpa: "3.9",
      appliedOn: "2025-04-10",
      skills: ["Node.js", "Express", "MongoDB"]
    },
    {
      id: 3,
      post: "UI/UX Design Intern",
      name: "Carol Lee",
      status: "Rejected",
      startDate: "2025-05-20",
      endDate:   "2025-08-20",
      email: "carol.lee@example.com",
      phone: "+20 102 345 6789",
      university: "Ain Shams University",
      major: "Graphic Design",
      gpa: "3.5",
      appliedOn: "2025-04-12",
      skills: ["Figma", "Sketch", "User Research"]
    },
    {
      id: 4,
      post: "Data Analyst Intern",
      name: "David Kim",
      status: "Finalized",
      startDate: "2025-04-20",
      endDate:   "2025-07-20",
      email: "david.kim@example.com",
      phone: "+20 103 456 7890",
      university: "Alexandria University",
      major: "Statistics",
      gpa: "3.8",
      appliedOn: "2025-04-18",
      skills: ["Python", "Pandas", "SQL"]
    },
    {
      id: 5,
      post: "DevOps Intern",
      name: "Eva Patel",
      status: "Accepted",
      startDate: "2025-05-10",
      endDate:   "2025-08-10",
      email: "eva.patel@example.com",
      phone: "+20 104 567 8901",
      university: "Helwan University",
      major: "Information Technology",
      gpa: "3.6",
      appliedOn: "2025-04-08",
      skills: ["Docker", "Kubernetes", "CI/CD"]
    }
  ]);

  const [selectedAppId, setSelectedAppId] = useState(null);
  const [searchTerm, setSearchTerm]       = useState("");
  const [filterType, setFilterType]       = useState("");
  const [filterMode, setFilterMode]       = useState("");
  const [filterTypeOpen, setFilterTypeOpen] = useState(false);
  const [filterModeOpen, setFilterModeOpen] = useState(false);
  const [filterPost, setFilterPost]         = useState("");
  
  
  //const [showProfilePopup, setShowProfilePopup] = useState(false);

  // Dummy data for current interns  



  const toggleDropdown = () => setIsDropdownOpen(o => !o);

  const internships = [
    { id: 1, title: "Frontend Developer Intern", description: "Build React components for our dashboard.", types: ["Paid, 2000/month"],types2: ["Hybrid"], totalapplicants: ["2 Applicants "] },
    { id: 2, title: "Backend API Intern",        description: "Design and implement RESTful APIs.",         types: ["Unpaid"], types2: ["Remote"], totalapplicants: ["3 Applicants "] },
    { id: 3, title: "UI/UX Design Intern",       description: "Create wireframes and prototypes.",           types: ["Paid, 5000/month"],types2: ["Hybrid"], totalapplicants: ["1 Applicant"] },
    { id: 4, title: "Data Analyst Intern",       description: "Analyze usage metrics and generate reports.", types: ["Unpaid"], types2: ["On-Site"], totalapplicants: ["2 Applicants"] },
    { id: 5, title: "DevOps Intern",             description: "Support CI/CD pipeline maintenance.",         types: ["Unpaid"], types2: ["On-Site"], totalapplicants: ["4 Applicants "] }
  ];

  const user = {
    name: "Siemens",
    email: "contact@siemens.com",
    role: "Company Admin",
    location: "Cairo Office",
    phone: "+20 2 1234 5678"
  };
  const dummyCurrentInterns = [
    { name: "Alice Johnson",      status: "Current Intern",       jobTitle: "Frontend Developer Intern" },
    { name: "Bob Smith",          status: "Internship Complete",  jobTitle: "Backend API Intern" },
    { name: "Carol Lee",          status: "Current Intern",       jobTitle: "UI/UX Design Intern" },
    { name: "David Kim",          status: "Current Intern",       jobTitle: "Data Analyst Intern" },
    { name: "Eva Patel",          status: "Internship Complete",  jobTitle: "DevOps Intern" }
  ];
  const [internsSearch, setInternsSearch]       = useState("");
const [internsFilter, setInternsFilter]       = useState("");
const [selectedInternIndex,] = useState(null);
// ── Evaluation modal state ──
const [showEvalModal, setShowEvalModal] = useState(false);
const [evalInternIdx, setEvalInternIdx] = useState(null);
const [evaluations, setEvaluations]     = useState({});



  const filteredInternships = internships
    .filter(i =>
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(i => (filterType === "" ? true : i.types.includes(filterType)))
    .filter(i => (filterMode === "" ? true : i.types2.includes(filterMode)));

  const posts = Array.from(new Set(applications.map(a => a.post)));
  const filteredApplications = filterPost
    ? applications.filter(a => a.post === filterPost)
    : applications;

  const selectedApp = applications.find(a => a.id === selectedAppId);
  // ─── Helpers for auto-updating status ─────────────────────────────
const computeStatus = app => {
  const today = new Date().toISOString().split("T")[0];
  if (today >= app.startDate && today <= app.endDate) return "Current Intern";
  if (today > app.endDate)                           return "Internship Complete";
  return null;
};

const autoUpdateStatus = id => {
  setApplications(apps =>
    apps.map(a =>
      a.id === id
        ? { ...a, status: computeStatus(a) || a.status }
        : a
    )
  );
};
const downloadCardPDF = (title, fields) => {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  doc.setFontSize(18);
  doc.text(title, 40, 40);

  doc.setFontSize(12);
  let y = 80;
  Object.entries(fields).forEach(([label, value]) => {
    doc.text(`${label}: ${value}`, 40, y);
    y += 20;
  });

  doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
};



  return (
    <div className="company22-company-dashboard-wrapper scad-wrapper">
      {/* pass the profile-opener into the sidebar */}
      <HabibaSidebar onProfileClick={() => setShowPopup(true)} />

      <div className="company22-main-content">
     
        
     {/* Only show the purple header if NOT on SCAD */}
{!isScad && (
  <div className="company22-bg-header">
    <div className="company22-header-content">
   
      {/* Profile box only when NOT in internships, applications, current interns, or SCAD */}
      {!isInternships && !isApplications && !isCurrentInterns && (
        <div className="company22-profile-box" onClick={toggleDropdown}>
          <FaUserCircle size={30} color="#4C3D40" />
          <span className="company22-profile-name">{user.name}</span>
          {isDropdownOpen && (
            <div className="company22-dropdown-menu">
              <div
                className="company22-dropdown-item"
                onClick={() => {
                  setShowPopup(true);
                  setIsDropdownOpen(false);
                }}
              >
                Profile
              </div>
              <Link
                to="/login"
                className="company22-dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                Log Out
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  </div>
)}


        <div className="company22-dashboard-content">
        {isCurrentInterns && (
  <div className="company22-cards-panel">
    {/* header with search, filter, and evaluate button */}
    <div
      className="company22-internships-header"
      style={{ display: "flex", alignItems: "center", gap: "12px" }}
    >
      {/* Search by name or job title */}
      <input
        type="text"
        placeholder="Search by name or job title…"
        className="company22-search-input"
        value={internsSearch}
        onChange={e => setInternsSearch(e.target.value)}
        style={{ maxWidth: "200px" }}
      />

      {/* Filter by status */}
      <select
        className="company22-post-filter-select"
        value={internsFilter}
        onChange={e => setInternsFilter(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="Current Intern">Current Intern</option>
        <option value="Internship Complete">Internship Complete</option>
      </select>

      
    </div>

    {/* the list of filtered interns */}
    <div className="company22-cards-list">
  {dummyCurrentInterns
    .filter(i =>
      (i.name.toLowerCase().includes(internsSearch.toLowerCase()) ||
        i.jobTitle.toLowerCase().includes(internsSearch.toLowerCase())) &&
      (internsFilter === "" || i.status === internsFilter)
    )
    .map((i, idx) => (
      <div
        key={idx}
        className="company22-card"
        style={{
          position: "relative",  // make room for absolute icon
          border:
            idx === selectedInternIndex
              ? "2px solid #4C3D40"
              : "1px solid rgba(0,0,0,0.1)",
          cursor:
            i.status === "Internship Complete" ? "pointer" : "default"
        }}
      >
        {/* Download PDF icon */}
        <FaDownload
          size={18}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            color: "#4C3D40",
            cursor: "pointer"
          }}
          onClick={() =>
            downloadCardPDF(i.name, {
              Status: i.status,
              "Job Title": i.jobTitle
            })
          }
        />

        {/* Card content */}
        <p style={{ color: "#4C3D40", fontSize: "22px", fontWeight: "bold" }}>
          {i.name}
        </p>
        <p style={{ color: "#4C3D40", fontSize: "16px" }}>
          Status: {i.status}
        </p>
        <p style={{ color: "#4C3D40", fontSize: "16px" }}>
          Job Title: {i.jobTitle}
        </p>

        {/* Evaluate button for completed interns */}
        {i.status === "Internship Complete" && (
          <button
            className="company22-filter-btn"
            onClick={() => {
              setEvalInternIdx(idx);
              setShowEvalModal(true);
            }}
          >
            Evaluate
          </button>
        )}
      </div>
    ))}
</div>


  </div>
)}


  {/* No special panel for current interns — sidebar, bg-header and background remain */}
  

          {/* default project cards */}
          {!isInternships && !isApplications && !isCurrentInterns && !isScad && (
  <>
    {/* existing three cards */}
    <div className="company22-projects-ui-card" style={{ left: "370px", top: "150px" }}>
      <h3>Heritage</h3>
      <p>175+ Years of Innovations</p>
    </div>
    <div className="company22-projects-ui-card" style={{ left: "730px", top: "150px" }}>
      <h3>Global Reach</h3>
      <p>Active in 190+ Countries</p>
    </div>
    <div className="company22-projects-ui-card" style={{ left: "1150px", top: "150px" }}>
      <h3>Tech Leadership</h3>
      <p>Pioneers in Automation & AI</p>
    </div>

    {/* new row of five Siemens info‐cards */}
    <div
      className="company22-projects-ui-card"
      style={{
        left: "370px",
        top: "380px",
        width: "700px",
        height: "60px",
        backgroundColor: "#FFFFFF",
        padding: "20px",
      }}
    >
      <h3>Sustainability</h3>
      <p>Carbon-Neutral Operations by 2030, Reduce CO₂ emissions by 50%</p>
    </div>
    <div
      className="company22-projects-ui-card"
      style={{
        left: "370px",
        top: "500px",
        width: "700px",
        height: "60px",
        backgroundColor: "#FFFFFF",
        padding: "20px",
      }}
    >
      <h3>Financial Performance</h3>
      <p>2024 Revenue: €63 B (+7 % YoY), +7% YoY Growth</p>
    </div>
    <div
      className="company22-projects-ui-card"
      style={{
        left: "370px",
        top: "630px",
        width: "700px",
        height: "60px",
        backgroundColor: "#FFFFFF",
        padding: "20px",
      }}
    >
      <h3>R&amp;D Investment</h3>
      <p>€6 B Invested in Innovation,25 % of Revenue into R&D</p>
    </div>
    <div
      className="company22-projects-ui-card"
      style={{
        left: "370px",
        top: "760px",
        width: "700px",
        height: "60px",
        backgroundColor: "#FFFFFF",
        padding: "20px",
      }}
    >
      <h3>Global Workforce</h3>
      <p>300 000+ Employees Worldwide,Diversity Index: 45 % Women in Leadership</p>
    </div>
    <div
      className="company22-projects-ui-card"
      style={{
        left: "370px",
        top: "890px",
        width: "700px",
        height: "60px",
        backgroundColor: "#FFFFFF",
        padding: "20px",
      }}
    >
      <h3>Digitalization &amp; IoT</h3>
      <p>MindSphere® on 1.2 M Connected Devices,Connected Devices: 1.2 Million</p>
    </div>
  </>
)}

          

          {/* internships panel */}
          {isInternships && (
            <div className="company22-cards-panel">
              
              <div className="company22-internships-header">
                <input
                  type="text"
                  placeholder="Search internships..."
                  className="company22-search-input"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="company22-filter-container">
                <button
  className="filter-btn"
  onClick={() => setFilterTypeOpen(o => !o)}
>
  Type{filterType ? `: ${filterType}` : ""}
  <FaChevronDown size={12} style={{ marginLeft: 6, color: "rgba(255,255,255,0.8)" }} />
</button>
                  {filterTypeOpen && (
                    <div className="company22-filter-menu">
                      <div className="company22-filter-item" onClick={() => { setFilterType(""); setFilterTypeOpen(false); }}>All Types</div>
                      <div className="company22-filter-item" onClick={() => { setFilterType("Paid"); setFilterTypeOpen(false); }}>Paid</div>
                      <div className="company22-filter-item" onClick={() => { setFilterType("Unpaid"); setFilterTypeOpen(false); }}>Unpaid</div>
                    </div>
                  )}
                </div>
                <div className="company22-filter-container">
                <button
  className="company22-filter-btn"
  onClick={() => setFilterModeOpen(o => !o)}
>
  Mode{filterMode ? `: ${filterMode}` : ""}
  <FaChevronDown size={12} style={{ marginLeft: 6, color: "rgba(255,255,255,0.8)" }} />
</button>
                  {filterModeOpen && (
                    <div className="company22-filter-menu">
                      <div className="company22-filter-item" onClick={() => { setFilterMode(""); setFilterModeOpen(false); }}>All Modes</div>
                      <div className="company22-filter-item" onClick={() => { setFilterMode("Hybrid"); setFilterModeOpen(false); }}>Hybrid</div>
                      <div className="company22-filter-item" onClick={() => { setFilterMode("Remote"); setFilterModeOpen(false); }}>Remote</div>
                      <div className="company22-filter-item" onClick={() => { setFilterMode("On-Site"); setFilterModeOpen(false); }}>On-Site</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="company22-cards-list">
  {filteredInternships.map(intern => (
    <div key={intern.id} className="card">
      <h3>{intern.title}</h3>
      <p>{intern.description}</p>
      <div
        className="company22-card-actions"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0px",
          paddingLeft: "0px"
        }}
      >
        <p className="card-type">{intern.types.join(", ")}</p>
        <p className="card-mode">{intern.types2.join(", ")}</p>
        <p className="card-applicants">{intern.totalapplicants.join(", ")}</p>
      </div>
    </div>
  ))}
</div>

            </div>
          )}

          {/* applications panel */}
          {isApplications && (
            <div className="company22-cards-panel">
              
              <div className="company22-internships-header">
                <select
                  className="post-filter-btn"
                  value={filterPost}
                  onChange={e => setFilterPost(e.target.value)}
                >
                  <option value="">All Posts</option>
                  {posts.map(post => (
                    <option key={post} value={post}>{post}</option>
                  ))}
                </select>
              </div>
              <div className="company22-cards-list">
                {filteredApplications.map(app => (
                  <div key={app.id} className="company22-card">
                    <h3>{app.post}</h3>
                    <p>Applicant: {app.name}</p>
                    <label className="status-label" style={{ margin: "8px 0" }}>
                    
                      Status:{" "}
                      <select
                        className="status-select"
                        value={app.status}
                        onChange={e => {
                          const newStatus = e.target.value;
                          setApplications(applications.map(a =>
                            a.id === app.id ? { ...a, status: newStatus } : a
                          ));
                        }}
                      >
                        <option value="Finalized">Finalized</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </label>
                    <div className="company22-card-actions">
                      
  {/* Intern-status dropdown, styled just like your filter-buttons */}
  <select
    className="filter-btn intern-select intern-btn"
    onClick={() => autoUpdateStatus(app.id)}
    value={app.status === "Current Intern" || app.status === "Internship Complete" ? app.status : ""}
    onChange={e => {
      setApplications(applications.map(a =>
        a.id === app.id ? { ...a, status: e.target.value } : a
      ));
    }}
  >
    <option value="" disabled>
      Intern…
    </option>
    <option value="Current Intern">Current Intern</option>
    <option value="Internship Complete">Internship Complete</option>
  </select>

  {/* your existing View Details button, unchanged */}
  <button
    className="filter-btn view-details-btn"
    onClick={() => setSelectedAppId(app.id)}
  >
    View Details
  </button>
</div>



                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Profile popup */}
{showPopup && (
  <div
    className="company22-modal-overlay"
    onClick={() => setShowPopup(false)}
  >
    <div
      className="company22-modal-box"
      onClick={e => e.stopPropagation()}
    >
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Location:</strong> {user.location}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <button
        className="company22-close-btn"
        onClick={() => setShowPopup(false)}
      >
        Close
      </button>
    </div>
  </div>
)}


      {/* Applicant Details popup */}
      {selectedApp && (
        <div className="company22-modal-overlay">
          <div className="company22-modal-box">
            <h2>Applicant Details</h2>
            <p><strong>Post:</strong> {selectedApp.post}</p>
            <p><strong>Name:</strong> {selectedApp.name}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>
            <p><strong>Email:</strong> {selectedApp.email}</p>
            <p><strong>Phone:</strong> {selectedApp.phone}</p>
            <p><strong>University:</strong> {selectedApp.university}</p>
            <p><strong>Major:</strong> {selectedApp.major}</p>
            <p><strong>GPA:</strong> {selectedApp.gpa}</p>
            <p><strong>Applied On:</strong> {selectedApp.appliedOn}</p>
            <p><strong>Skills:</strong> {selectedApp.skills.join(", ")}</p>
            <button className="close-btn" onClick={() => setSelectedAppId(null)}>
              Close
            </button>
          </div>
        </div>
        
      )}
    {showEvalModal && evalInternIdx != null && (
  <div className="company22-modal-overlay" onClick={() => setShowEvalModal(false)}>
    <div className="company22-modal-box" onClick={e => e.stopPropagation()}>
      <h2 style={{ color: "#4C3D40" }}>
        Evaluate {dummyCurrentInterns[evalInternIdx].name}
      </h2>

      {/* Read current values */}
      <p><strong>Score:</strong> {evaluations[evalInternIdx]?.score ?? "—"}</p>
      <p><strong>Notes:</strong> {evaluations[evalInternIdx]?.notes ?? "—"}</p>

      {/* Create/Update inputs */}
      <label style={{ display: "block", margin: "8px 0" }}>
        Score:
        <input
          type="number"
          value={evaluations[evalInternIdx]?.score || ""}
          onChange={e => {
            setEvaluations(ev => ({
              ...ev,
              [evalInternIdx]: {
                ...ev[evalInternIdx],
                score: e.target.value
              }
            }));
          }}
          className="company22-search-input"
          style={{ maxWidth: "80px" }}
        />
      </label>
      <label style={{ display: "block", margin: "8px 0" }}>
        Notes:
        <textarea
          rows={4}
          value={evaluations[evalInternIdx]?.notes || ""}
          onChange={e => {
            setEvaluations(ev => ({
              ...ev,
              [evalInternIdx]: {
                ...ev[evalInternIdx],
                notes: e.target.value
              }
            }));
          }}
          className="company22-search-input"
        />
      </label>

      {/* Save & Delete */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <button className="company22-filter-btn" onClick={() => setShowEvalModal(false)}>
          Save
        </button>
        <button
          className="company22-filter-btn"
          onClick={() => {
            setEvaluations(ev => {
              const copy = { ...ev };
              delete copy[evalInternIdx];
              return copy;
            });
          }}
        >
          Delete
        </button>
      </div>

      <button className="company22-close-btn" onClick={() => setShowEvalModal(false)}>
        Close
      </button>
    </div>
  </div>
)}
{isScad && (
  <div className="company22-cards-panel">
  <AvailableInternships3 />
</div>
)}


    </div>
  );
}

