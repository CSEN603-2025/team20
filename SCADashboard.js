import React, { useState, useRef, useEffect } from "react";
import "./SCADDashboard.css";
import { 
  FaHome, FaUsers, FaBriefcase, FaBell, FaFileAlt, FaTasks, 
  FaClipboardList, FaChalkboardTeacher, FaCalendarCheck, FaUserPlus, 
  FaBuilding, FaVideo, FaClipboard 
} from 'react-icons/fa';
import { FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import { MdScreenShare, MdStopScreenShare } from 'react-icons/md';
import { 
  ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar 
} from "recharts";

const menuItems = [
  { name: "Dashboard", panelKey: "dashboard", icon: <FaHome size={20} />, link: "/company-dashboard" },
  { name: "Job Posts", panelKey: "jobPosts", icon: <FaFileAlt size={20} />, link: "/job-posts" },
  { name: "Internship Applications", panelKey: "internshipApplications", icon: <FaTasks size={20} />, link: "/internship-applications" },
  { name: "Notifications", panelKey: "notifications", icon: <FaBell size={20} />, link: "/notifications" },
  { name: "Pending Companies", panelKey: "pending", icon: <FaClipboardList size={20} />, link: "/pending-companies" },
  { name: "Accepted Companies", panelKey: "accepted", icon: <FaClipboardList size={20} />, link: "/accepted-companies" },
  { name: "Rejected Companies", panelKey: "rejected", icon: <FaClipboardList size={20} />, link: "/rejected-companies" },
  { name: "Reports", panelKey: "reports", icon: <FaFileAlt size={20} />, link: "/reports" },
  { name: "Students Listings", panelKey: "students", icon: <FaUsers size={20} />, link: "/students-listings" },
  { name: "Workshops", panelKey: "workshops", icon: <FaChalkboardTeacher size={20} />, link: "/workshops" },
  { name: "Video Appointments", panelKey: "videoAppointments", icon: <FaCalendarCheck size={20} />, link: "/video-appointments" },
  { name: "All Students", panelKey: "allStudents", icon: <FaUsers size={20} />, link: "/all-students" },
];

export default function SCADDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(c => !c);

  const [activePanel, setActivePanel] = useState("dashboard"); // Default to "dashboard"

  const [notificationsModalVisible, setNotificationsModalVisible] = useState(false);
  const [videoCallModalVisible, setVideoCallModalVisible] = useState(false);
  const [callUIVisible, setCallUIVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [endedCallModalVisible, setEndedCallModalVisible] = useState(false);

  const [viewAppointmentsVisible, setViewAppointmentsVisible] = useState(false);
  const [dummyAppointments] = useState([
    { name: "Alice Jones", date: "today", time: "14:00", online: true },
    { name: "Shahd Hegazy", date: "25-05-2025", time: "10:30", online: false },
    { name: "Jana Gehad", date: "29-05-2025", time: "09:00", online: false },
    { name: "Jana Gabr", date: "28-03-2026", time: "09:00", online: false },
  ]);

  const companies = [
    { name: "Siemens", industry: "Technology", email: "siemens@work.com", size: 1000, location: "Cairo Office" },
    { name: "Orange", industry: "Telecommunications", email: "orange@work.com", size: 3000, location: "Alexandria HQ" },
    { name: "Eva Pharma", industry: "Pharmaceutical", email: "evapharma@work.com", size: 200, location: "Giza Branch" }
  ];

  const [statuses, setStatuses] = useState(
    companies.reduce((acc, c) => ({ ...acc, [c.email]: "Undecided" }), {})
  );
  const allIndustries = Array.from(new Set(companies.map(c => c.industry)));
  const [selectedIndustries, setSelectedIndustries] = useState(allIndustries);
  const [companyFilter, setCompanyFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const filterRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleIndustry = ind =>
    setSelectedIndustries(prev =>
      prev.includes(ind) ? prev.filter(x => x !== ind) : [...prev, ind]
    );
  const allIndustriesSelected = selectedIndustries.length === allIndustries.length;
  const toggleAllIndustries = () =>
    setSelectedIndustries(allIndustriesSelected ? [] : allIndustries);
  const onStatusChange = (email, val) =>
    setStatuses(prev => ({ ...prev, [email]: val }));

  const pendingCompanies = companies.filter(c => statuses[c.email] === "Undecided");
  const acceptedCompanies = companies.filter(c => statuses[c.email] === "Accept");
  const rejectedCompanies = companies.filter(c => statuses[c.email] === "Reject");
  const visiblePending = pendingCompanies.filter(
    c =>
      c.name.toLowerCase().includes(companyFilter.toLowerCase()) &&
      selectedIndustries.includes(c.industry)
  );

  const [scadStatisticsModalVisible, setSCADStatisticsModalVisible] = useState(false);

  const internships = [
    {
      company: "Acme Corp",
      position: "Software Engineer Intern",
      duration: "3 months",
      major: "Computer Science",
      type: "Full Time",
      paid: "Paid",
      location: "Cairo HQ",
      hours: "9am–5pm",
      skills: ["JavaScript", "React", "Git"],
      salary: "4000"
    },
    {
      company: "Beta LLC",
      position: "Business Analyst Intern",
      duration: "6 weeks",
      major: "Business",
      type: "Part Time",
      paid: "Unpaid",
      location: "Alexandria Office",
      hours: "Flexible",
      skills: ["Excel", "SQL", "Critical Thinking"], 
      salary: "-" 
    }
  ];
  const [internFilter, setInternFilter] = useState("");
  const facets = {
    company: Array.from(new Set(internships.map(i => i.company))),
    duration: Array.from(new Set(internships.map(i => i.duration))),
    major: Array.from(new Set(internships.map(i => i.major))),
    type: Array.from(new Set(internships.map(i => i.type))),
    paid: Array.from(new Set(internships.map(i => i.paid)))
  };
  const [selectedFacets, setSelectedFacets] = useState({
    company: [...facets.company],
    duration: [...facets.duration],
    major: [...facets.major],
    type: [...facets.type],
    paid: [...facets.paid]
  });
  const [facetDropdownOpen, setFacetDropdownOpen] = useState(false);
  const facetRef = useRef(null);

  const toggleFacet = (field, val) =>
    setSelectedFacets(prev => ({
      ...prev,
      [field]: prev[field].includes(val)
        ? prev[field].filter(x => x !== val)
        : [...prev[field], val]
    }));
  const allFacetsSelected = Object.entries(selectedFacets).every(
    ([f, arr]) => arr.length === facets[f].length
  );
  const toggleAllFacets = () =>
    setSelectedFacets(allFacetsSelected
      ? { company: [], duration: [], major: [], type: [], paid: [] }
      : {
          company: [...facets.company],
          duration: [...facets.duration],
          major: [...facets.major],
          type: [...facets.type],
          paid: [...facets.paid]
        });

  const displayedInterns = internships.filter(i => {
    const t = internFilter.toLowerCase();
    const matchesText =
      i.company.toLowerCase().includes(t) ||
      i.position.toLowerCase().includes(t);
    const matchesFacets = Object.entries(selectedFacets).every(
      ([f, arr]) => arr.includes(i[f])
    );
    return matchesText && matchesFacets;
  });

  const reports = [
    { name: "Ali Hassan", id: "S12345", major: "Engineering", status: "pending", fileUrl: "/reports/ali.pdf" },
    { name: "Sara Ahmed", id: "S67890", major: "Business", status: "accepted", fileUrl: "/reports/sara.pdf" },
    { name: "Omar Naguib", id: "S24680", major: "Engineering", status: "rejected", fileUrl: "/reports/omar.pdf" },
    { name: "Mona Soliman", id: "S13579", major: "Design", status: "flagged", fileUrl: "/reports/mona.pdf" },
    { name: "Youssef Kamal", id: "S98765", major: "Computer Science", status: "accepted", fileUrl: "/reports/youssef.pdf" },
    { name: "Layla Hussein", id: "S11223", major: "Engineering", status: "flagged", fileUrl: "/reports/layla.pdf" },
    { name: "Karim Adel", id: "S33445", major: "Business", status: "rejected", fileUrl: "/reports/karim.pdf" },
  ];
  
  const majors = Array.from(new Set(reports.map(r => r.major)));
  const statusesList = ["pending", "accepted", "rejected", "flagged"];
  const [reportMajorFilter, setReportMajorFilter] = useState("");
  const [reportStatusFilter, setReportStatusFilter] = useState("");
  const [filteredReports, setFilteredReports] = useState(reports);
  const applyReportFilter = () =>
    setFilteredReports(
      reports.filter(
        r =>
          (!reportMajorFilter || r.major === reportMajorFilter) &&
          (!reportStatusFilter || r.status === reportStatusFilter)
      )
    );

  const dummyNotifications = [
    { id: 1, text: "Your appointment is accepted by Jana Gehad.", time: "5min ago" },
    { id: 2, text: "New internship listing posted.", time: "1d ago" },
    { id: 3, text: "Reminder: submit your cycle dates.", time: "3d ago" },
  ];

  useEffect(() => {
    let timer;
    if (notificationsModalVisible) {
      timer = setTimeout(() => {
        setVideoCallModalVisible(true);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [notificationsModalVisible]);

  useEffect(() => {
    let timer;
    if (activePanel === "videoAppointments") {
      timer = setTimeout(() => setVideoNotifVisible(true), 5000);
    }
    return () => clearTimeout(timer);
  }, [activePanel]);

  const students = [
    { name: "Ahmed Ali", id: "ST1001", major: "Computer Science", email: "ahmed.ali@guc.edu.eg", status: "pending" },
    { name: "Fatima Omar", id: "ST1002", major: "Information Systems", email: "fatima.omar@guc.edu.eg", status: "accepted" },
    { name: "Mohamed Adel", id: "ST1003", major: "Media Engineering", email: "mohamed.adel@guc.edu.eg", status: "flagged" },
    { name: "Laila Youssef", id: "ST1004", major: "Design", email: "laila.youssef@guc.edu.eg", status: "rejected" }
  ];
  
  const submittedReports = [
    { name: "Laila Hassan", id: "ST2001", major: "Design", email: "laila.hassan@guc.edu.eg", report: "UX Research", submitted: "2025-05-10" },
    { name: "Youssef Nabil", id: "ST2002", major: "CS", email: "youssef.nabil@guc.edu.eg", report: "DBMS Project", submitted: "2025-05-12" },
  ];

  const [showStudentStartPicker, setShowStudentStartPicker] = useState(false);
  const [showStudentEndPicker, setShowStudentEndPicker] = useState(false);
  const [studentStart, setStudentStart] = useState("");
  const [studentEnd, setStudentEnd] = useState("");

  const [companyModalVisible, setCompanyModalVisible] = useState(false);
  const [companyModalData, setCompanyModalData] = useState(null);
  const openSCADCompanyModal = c => { setCompanyModalData(c); setCompanyModalVisible(true); };

  const [internModalVisible, setInternModalVisible] = useState(false);
  const [internModalData, setInternModalData] = useState(null);
  const openSCADInternModal = i => { setInternModalData(i); setInternModalVisible(true); };

  const [studentModalVisible, setStudentModalVisible] = useState(false);
  const [studentModalData, setStudentModalData] = useState(null);
  const openSCADStudentModal = s => { setStudentModalData(s); setStudentModalVisible(true); };

  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportModalData, setReportModalData] = useState(null);
  const openSCADReportModal = r => { setReportModalData(r); setReportModalVisible(true); };

  const [studentStatuses, setStudentStatuses] = useState(
    reports.reduce((acc, r) => ({ ...acc, [r.id]: "" }), {})
  );
  const handleStatusChange = (id, newStatus) => {
    setStudentStatuses(prev => ({ ...prev, [id]: newStatus }));
    if (newStatus === "flagged" || newStatus === "rejected") {
      setCommentingForId(id);
      setCommentInput(studentComments[id] || "");
    }
  };

  const [studentComments, setStudentComments] = useState({});
  const [commentingForId, setCommentingForId] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const commentModalVisible = commentingForId !== null;

  const [workshops, setWorkshops] = useState([
    {
      id: "w1",
      name: "Intro to React",
      description: "Learn the basics of React components, state and props.",
      speakerBio: "Jane Doe, Senior Front-End Engineer at Acme Corp.",
      agenda: "JSX, hooks, props vs state, simple project",
      startDate: "2025-06-01",
      startTime: "10:00",
      endDate: "2025-06-01",
      endTime: "12:00",
      mode: "Online"
    },
    {
      id: "w2",
      name: "Advanced CSS Layouts",
      description: "Flexbox, Grid, and responsive design techniques.",
      speakerBio: "John Smith, UI/UX Architect.",
      agenda: "Flexbox deep dive, CSS Grid, hands-on exercise",
      startDate: "2025-06-03",
      startTime: "14:00",
      endDate: "2025-06-03",
      endTime: "17:00",
      mode: "On ground"
    },
  ]);
  const [workshopModalVisible, setWorkshopModalVisible] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    speakerBio: "",
    agenda: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    mode: ""
  });

  const [evaluationModalVisible, setEvaluationModalVisible] = useState(false);
  const [evaluationModalData, setEvaluationModalData] = useState(null);
  const openSCADEvaluationModal = r => {
    const stud = students.find(s => s.id === r.id) || {};
    setEvaluationModalData({
      name: r.name,
      id: r.id,
      major: r.major,
      email: stud.email || "N/A",
      status: r.status,
      companyName: "Siemens",
      supervisor: "Dr. John Smith",
      startDate: "2025-06-01",
      endDate: "2025-08-31"
    });
    setEvaluationModalVisible(true);
  };

  useEffect(() => {
    const onOutside = e => {
      if (
        filterRef.current && dropdownRef.current &&
        !filterRef.current.contains(e.target) &&
        !dropdownRef.current.contains(e.target)
      ) setDropdownOpen(false);

      if (facetRef.current && !facetRef.current.contains(e.target)) {
        setFacetDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", onOutside);
    return () => window.removeEventListener("mousedown", onOutside);
  }, []);

  const pageTitle =
    activePanel === "statistics" ? "Statistics"
    : activePanel === "allStudents" ? "All Students"
    : activePanel === "students" ? "Student Cycle"
    : activePanel === "workshops" ? "Workshops"
    : activePanel === "pending" ? "Pending Companies"
    : activePanel === "accepted" ? "Accepted Companies"
    : activePanel === "rejected" ? "Rejected Companies"
    : activePanel === "reports" ? "Student Reports"
    : activePanel === "listings" ? "Available Internships"
    : activePanel === "videoAppointments" ? "Video Appointments"
    : activePanel === "dashboard" ? "Welcome to the SCAD Dashboard!"
    : "SCAD Dashboard";

  const panels = [
    { key: "dashboard", label: "Dashboard", icon: <FaHome size={20} /> }, // Added Dashboard entry
    { key: "pending", label: "Pending Companies", icon: <FaBuilding size={20} /> },
    { key: "accepted", label: "Accepted Companies", icon: <FaBuilding size={20} /> },
    { key: "rejected", label: "Rejected Companies", icon: <FaBuilding size={20} /> },
    { key: "listings", label: "Available Internships", icon: <FaClipboard size={20} /> },
    { key: "reports", label: "Internship Reports", icon: <FaClipboard size={20} /> },
    { key: "students", label: "Students Listings", icon: <FaUsers size={20} /> },
    { key: "workshops", label: "Workshops", icon: <FaClipboard size={20} /> },
    { key: "videoAppointments", label: "Video Appointments", icon: <FaVideo size={20} /> },
    { key: "notifications", label: "Notifications", icon: <FaBell size={20} /> },
    { key: "allStudents", label: "All Students", icon: <FaUsers size={20} /> },
  ];

  const [appointmentRequests, setAppointmentRequests] = useState([
    { id: "A1", date: "2025-05-20", time: "14:00", with: "Dr. Smith", status: "pending" },
    { id: "A2", date: "2025-05-22", time: "10:30", with: "Ms. Johnson", status: "pending" }
  ]);

  const [appointmentModalVisible, setAppointmentModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [requestModalVisible, setRequestModalVisible] = useState(false);
  const [requestStudent, setRequestStudent] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [requestTime, setRequestTime] = useState("");
  const [pendingRequestsModalVisible, setPendingRequestsModalVisible] = useState(false);

  const handleViewAppointments = () => {
    setSelectedAppointment(null);
    setAppointmentModalVisible(true);
  };
  const openAppointmentDetail = req => {
    setSelectedAppointment(req);
  };
  const handleAccept = () => {
    setVideoCallModalVisible(false);
    setCallUIVisible(true);
  };
  const handleReject = () => {
    console.log(`Rejected appointment ${selectedAppointment.id}`);
    setAppointmentModalVisible(false);
  };

  const generateStatisticsReport = () => {
    setSCADStatisticsModalVisible(true);
  };

  const generateStatistics = () => {
    setActivePanel("statistics");
  };

  const deleteWorkshop = id => {
    setWorkshops(ws => ws.filter(w => w.id !== id));
  };

  const openWorkshopModal = (ws = null) => {
    if (ws) {
      setFormValues({ ...ws });
      setEditingWorkshop(ws);
    } else {
      setFormValues({
        name: "",
        description: "",
        speakerBio: "",
        agenda: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        mode: ""
      });
      setEditingWorkshop(null);
    }
    setWorkshopModalVisible(true);
  };
  const closeWorkshopModal = () => setWorkshopModalVisible(false);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormValues(fv => ({ ...fv, [name]: value }));
  };

  const saveWorkshop = () => {
    if (editingWorkshop) {
      setWorkshops(ws => ws.map(w => w.id === editingWorkshop.id ? { ...w, ...formValues } : w));
    } else {
      setWorkshops(ws => [...ws, { id: Date.now().toString(), ...formValues }]);
    }
    closeWorkshopModal();
  };

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const statusData = ["pending", "accepted", "rejected", "flagged"].map(s => ({
    name: s.charAt(0).toUpperCase() + s.slice(1),
    count: filteredReports.filter(r => r.status === s).length
  }));

  const reviewTimeData = companies.map(c => ({
    company: c.name,
    days: Math.random() * 10
  }));

  const courseUsageData = [
    { course: "React Basics", count: 12 },
    { course: "NodeJS 101", count: 8 },
    { course: "GraphQL", count: 5 },
  ];

  const ratingData = companies.map(c => ({
    company: c.name,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10
  }));

  const internshipCountData = companies.map(c => ({
    company: c.name,
    interns: internships.filter(i => i.company === c.name).length
  }));

  const [videoNotifVisible, setVideoNotifVisible] = useState(false);
  const [studentStatusFilter, setStudentStatusFilter] = useState("");
  const [selectedInternships, setSelectedInternships] = useState(new Set());
  const toggleSelectInternship = companyName => {
    setSelectedInternships(prev => {
      const copy = new Set(prev);
      if (copy.has(companyName)) copy.delete(companyName);
      else copy.add(companyName);
      return copy;
    });
  };
  const visibleInternships =
    selectedInternships.size > 0
      ? displayedInterns.filter(i => selectedInternships.has(i.company))
      : displayedInterns;

  return (
    <div className={`scad-wrapper${isCollapsed ? " collapsed" : ""}`}>
      <aside className={`scad-sidebar-dark${isCollapsed ? " collapsed" : ""}`}>
        <div className="scad-sidebar-title-container">
          <p className="scad-sidebar-title">SCAD Dashboard</p>
          <button className="scad-toggle-btn" onClick={toggleSidebar} aria-label="Toggle sidebar" />
        </div>
        {panels.map(p => (
          <button
            key={p.key}
            className={`scad-sidebar-item${activePanel === p.key ? " active" : ""}`}
            onClick={() => {
              if (p.key === "notifications") {
                setNotificationsModalVisible(true);
              } else {
                console.log(`Setting active panel to ${p.key}`);
                setActivePanel(p.key);
              }
            }}
          >
            {p.icon}
            <span>{p.label}</span>
          </button>
        ))}
      </aside>

      <div className="scad-main-content">
        <div className="scad-top-bar">
          <h1 className="scad-dashboard-title">{pageTitle}</h1>
        </div>

        <div className="scad-dashboard-content">
          {activePanel === "dashboard" && (
            <div className="scad-content-container">
              <h2>Welcome John Doe!</h2>
              <p>
                This is your central hub for managing companies, internships, student reports, workshops, and more. Use the sidebar to navigate through different sections.
              </p>
            </div>
          )}

          {activePanel === "pending" && (
            <div className="scad-cards-panel scad-narrow-cards">
              <div className="scad-search-wrapper" ref={filterRef}>
                <input
                  className="scad-search-input"
                  placeholder="Search by company name"
                  value={companyFilter}
                  onChange={e => setCompanyFilter(e.target.value)}
                />
                <button className="scad-filter-btn" onClick={() => setDropdownOpen(o => !o)}>
                  Filter
                </button>
              </div>

              {dropdownOpen && (
                <div className="scad-facet-dropdown" ref={dropdownRef}>
                  <button className="scad-toggle-all" onClick={toggleAllIndustries}>
                    {allIndustriesSelected ? "Clear All" : "Select All"}
                  </button>
                  {allIndustries.map(ind => (
                    <label key={ind} className="scad-facet-option">
                      <input
                        type="checkbox"
                        checked={selectedIndustries.includes(ind)}
                        onChange={() => toggleIndustry(ind)}
                      />
                      {ind}
                    </label>
                  ))}
                </div>
              )}

              <div className="scad-cards-list">
                {visiblePending.map(c => (
                  <div key={c.email} className="card">
                    <h3>{c.name}</h3>
                    <p>Industry: {c.industry}</p>
                    <p>Email: {c.email}</p>
                    <p>Size: {c.size}</p>
                    <p>Location: {c.location}</p>

                    <div className="card-actions">
                      <select
                        className="card-select"
                        value={statuses[c.email]}
                        onChange={e => onStatusChange(c.email, e.target.value)}
                      >
                        <option>Undecided</option>
                        <option>Accept</option>
                        <option>Reject</option>
                      </select>
                      <button className="scad-view-btn" onClick={() => openSCADCompanyModal(c)}>
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
                {visiblePending.length === 0 && <p>No pending companies.</p>}
              </div>
            </div>
          )}

          {activePanel === "accepted" && (
            <SCADCompanyList title="Accepted" data={acceptedCompanies} />
          )}
          {activePanel === "rejected" && (
            <SCADCompanyList title="Rejected" data={rejectedCompanies} />
          )}

          {activePanel === "listings" && (
            <div className="scad-cards-panel scad-narrow-cards">
              <div ref={facetRef} style={{ position: "relative" }}>
                <div className="scad-search-wrapper">
                  <input
                    className="scad-search-input"
                    placeholder="Search internships by job title or company name"
                    value={internFilter}
                    onChange={e => setInternFilter(e.target.value)}
                  />
                  <button className="scad-filter-btn" onClick={() => setFacetDropdownOpen(o => !o)}>
                    Filter
                  </button>
                </div>

                {facetDropdownOpen && (
                  <div className="scad-facet-dropdown">
                    <button className="scad-toggle-all" onClick={toggleAllFacets}>
                      {allFacetsSelected ? "Clear All" : "Select All"}
                    </button>

                    {Object.entries(facets).map(([f, opts]) => (
                      <div key={f} className="scad-facet-group">
                        <strong className="scad-facet-label">{f}</strong>
                        <div className="scad-facet-options">
                          {opts.map(opt => (
                            <label key={opt} className="scad-facet-option">
                              <input
                                type="checkbox"
                                checked={selectedFacets[f].includes(opt)}
                                onChange={() => toggleFacet(f, opt)}
                              />
                              {opt}
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="scad-cards-list">
                {visibleInternships.map((i, idx) => (
                  <div key={idx} className="card">
                    <h3>{i.company}</h3>
                    <p>Position: {i.position}</p>
                    <p>Duration: {i.duration}</p>
                    <p>Major: {i.major}</p>
                    <p>{i.type} • {i.paid}</p>

                    <div className="card-actions">
                      <button className="scad-view-btn" onClick={() => openSCADInternModal(i)}>
                        View Details
                      </button>
                      <button
                        className={`scad-view-btn ${selectedInternships.has(i.company) ? "selected" : ""}`}
                        onClick={() => toggleSelectInternship(i.company)}
                      >
                        {selectedInternships.has(i.company)
                          ? "Unselect Internship"
                          : "Select Internship"}
                      </button>
                    </div>
                  </div>
                ))}
                {displayedInterns.length === 0 && <p>No internships found.</p>}
              </div>
            </div>
          )}

          {activePanel === "reports" && (
            <div className="scad-cards-panel scad-narrow-cards">
              <div className="scad-search-wrapper">
                <select value={reportMajorFilter} onChange={e => setReportMajorFilter(e.target.value)}>
                  <option value="">All Majors</option>
                  {majors.map(m => <option key={m}>{m}</option>)}
                </select>
                <select value={reportStatusFilter} onChange={e => setReportStatusFilter(e.target.value)}>
                  <option value="">All Statuses</option>
                  {statusesList.map(s => <option key={s}>{s}</option>)}
                </select>
                <button className="scad-filter-btn" onClick={applyReportFilter}>Filter</button>
                <button className="scad-filter-btn" onClick={generateStatisticsReport}>Statistics Report</button>
                <button className="scad-filter-btn" onClick={generateStatistics}>Generate Statistics</button>
              </div>

              <div className="scad-cards-list">
                {filteredReports.map(r => (
                  <div key={r.id} className="card">
                    <h3>{r.name}</h3>
                    <p>ID: {r.id}</p>
                    <p>Major: {r.major}</p>
                    <label>
                      Status: 
                      <select value={studentStatuses[r.id]} onChange={e => handleStatusChange(r.id, e.target.value)}>
                        <option value="" disabled>-- Select status --</option>
                        {statusesList.map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </label>
                    {studentComments[r.id] && (
                      <p style={{ marginTop: 8, fontStyle: "italic", color: "#a00" }}>
                        <strong>Comment:</strong> {studentComments[r.id]}
                      </p>
                    )}

                    <div className="card-actions">
                      <a href={r.fileUrl} download className="scad-download-btn">Download</a>
                      <button className="scad-view-btn" onClick={() => openSCADReportModal(r)}>
                        View Internship Report
                      </button>
                      <button className="scad-view-btn" onClick={() => openSCADEvaluationModal(r)}>
                        View Evaluation Report
                      </button>
                    </div>
                  </div>
                ))}
                {filteredReports.length === 0 && <p>No reports match your filters.</p>}
              </div>
            </div>
          )}

          {activePanel === "statistics" && (
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 16 }}>
                <button
                  className="scad-filter-btn"
                  onClick={() => setActivePanel("reports")}
                >
                  ← Back to Reports
                </button>
              </div>

              <div style={{ display: "flex", gap: 20 }}>
                <div style={{ width: 300, height: 200 }}>
                  <h4>Reports Status</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statusData}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="name"/>
                      <YAxis allowDecimals={false}/>
                      <Tooltip/>
                      <Legend/>
                      <Bar dataKey="count" fill="#4C3D40"/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ width: 300, height: 200 }}>
                  <h4>Avg Review Time</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reviewTimeData}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="company"/>
                      <YAxis/>
                      <Tooltip/>
                      <Legend/>
                      <Bar dataKey="days" fill="#8B5E3C"/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ width: 300, height: 200 }}>
                  <h4>Top Courses</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={courseUsageData}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="course"/>
                      <YAxis/>
                      <Tooltip/>
                      <Legend/>
                      <Bar dataKey="count" fill="#A98467"/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{ display: "flex", gap: 20, marginTop: 40 }}>
                <div style={{ width: 300, height: 200 }}>
                  <h4>Company Ratings</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ratingData}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="company"/>
                      <YAxis/>
                      <Tooltip/>
                      <Legend/>
                      <Bar dataKey="rating" fill="#C8B4D0"/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ width: 300, height: 200 }}>
                  <h4>Intern Count</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={internshipCountData}>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <XAxis dataKey="company"/>
                      <YAxis/>
                      <Tooltip/>
                      <Legend/>
                      <Bar dataKey="interns" fill="#6F4E37"/>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {evaluationModalVisible && evaluationModalData && (
            <SCADModal onClose={() => setEvaluationModalVisible(false)}>
              <h3>Evaluation Report for {evaluationModalData.name}</h3>
              <p><strong>Student ID:</strong> {evaluationModalData.id}</p>
              <p><strong>Major:</strong> {evaluationModalData.major}</p>
              <p><strong>Email:</strong> {evaluationModalData.email}</p>
              <p><strong>Status:</strong> {evaluationModalData.status}</p>
              <hr />
              <p><strong>Company Name:</strong> {evaluationModalData.companyName}</p>
              <p><strong>Supervisor:</strong> {evaluationModalData.supervisor}</p>
              <p><strong>Start Date:</strong> {evaluationModalData.startDate}</p>
              <p><strong>End Date:</strong> {evaluationModalData.endDate}</p>
            </SCADModal>
          )}

          {videoCallModalVisible && (
            <SCADModal onClose={() => setVideoCallModalVisible(false)}>
              <h3>Incoming Video Call</h3>
              <p><strong>Dr. Smith</strong> is calling you now.</p>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
                <button
                  className="scad-filter-btn accept"
                  onClick={() => {
                    setVideoCallModalVisible(false);
                    setCallUIVisible(true);
                  }}
                >
                  Accept
                </button>
                <button
                  className="scad-filter-btn decline"
                  onClick={() => setVideoCallModalVisible(false)}
                >
                  Decline
                </button>
              </div>
            </SCADModal>
          )}

          {callUIVisible && (
            <SCADModal onClose={() => setCallUIVisible(false)}>
              <h3>In Call: Dr. Smith</h3>
              <div className="scad-call-controls">
                <button
                  onClick={() => setIsMuted(m => !m)}
                  className="scad-icon-btn"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted
                    ? <FaMicrophoneSlash size={24} />
                    : <FaMicrophone size={24} />}
                </button>

                <button
                  onClick={() => setIsVideoEnabled(v => !v)}
                  className="scad-icon-btn"
                  title={isVideoEnabled ? "Disable Camera" : "Enable Camera"}
                >
                  {isVideoEnabled
                    ? <FaVideo size={24} />
                    : <FaVideoSlash size={24} />}
                </button>

                <button
                  onClick={() => setIsScreenSharing(s => !s)}
                  className="scad-icon-btn"
                  title={isScreenSharing ? "Stop Sharing" : "Share Screen"}
                >
                  {isScreenSharing 
                    ? <MdStopScreenShare size={24} /> 
                    : <MdScreenShare size={24} />}
                </button>

                <button
                  onClick={() => {
                    setCallUIVisible(false);
                    setEndedCallModalVisible(true);
                  }}
                  className="scad-icon-btn decline"
                  title="End Call"
                >
                  <FaPhoneSlash size={24}/>
                </button>
              </div>
            </SCADModal>
          )}

          {endedCallModalVisible && (
            <SCADModal onClose={() => setEndedCallModalVisible(false)}>
              <h3>{`Dr. Smith has left the call`}</h3>
              <div style={{ textAlign: "right", marginTop: 12 }}>
                <button 
                  className="scad-filter-btn accept" 
                  onClick={() => setEndedCallModalVisible(false)}
                >
                  OK
                </button>
              </div>
            </SCADModal>
          )}

          {notificationsModalVisible && (
            <SCADModal onClose={() => setNotificationsModalVisible(false)}>
              <h3>Notifications</h3>
              <ul className="scad-notifications-list">
                {dummyNotifications.map(n => (
                  <li key={n.id}>
                    <p>{n.text}</p>
                    <small>{n.time}</small>
                  </li>
                ))}
              </ul>
              <div style={{ textAlign: "right", marginTop: 12 }}>
                <button className="scad-filter-btn" onClick={() => setNotificationsModalVisible(false)}>
                  Close
                </button>
              </div>
            </SCADModal>
          )}

          {activePanel === "students" && (
            <div className="scad-cards-panel scad-narrow-cards">
              <div className="card" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                <div style={{ position: "relative" }}>
                  <button className="scad-filter-btn" onClick={() => setShowStudentStartPicker(s => !s)}>
                    Start Cycle
                  </button>
                  {showStudentStartPicker && (
                    <input
                      type="date"
                      value={studentStart}
                      onChange={e => { setStudentStart(e.target.value); setShowStudentStartPicker(false); }}
                      style={{ position: "absolute", top: 40, left: 0, zIndex: 10 }}
                    />
                  )}
                </div>

                <div style={{ position: "relative" }}>
                  <button className="scad-filter-btn" onClick={() => setShowStudentEndPicker(s => !s)}>
                    End Cycle
                  </button>
                  {showStudentEndPicker && (
                    <input
                      type="date"
                      value={studentEnd}
                      onChange={e => { setStudentEnd(e.target.value); setShowStudentEndPicker(false); }}
                      style={{ position: "absolute", top: 40, left: 0, zIndex: 10 }}
                    />
                  )}
                </div>

                <button className="scad-filter-btn" onClick={() => setActivePanel("allStudents")}>
                  All Students
                </button>
                <button className="scad-filter-btn" onClick={() => setActivePanel("reports")}>
                  Submitted Reports
                </button>
              </div>

              {(studentStart || studentEnd) && (
                <p style={{ marginTop: 8 }}>
                  {studentStart && <>From: {studentStart}{" "}</>}
                  {studentEnd && <>To: {studentEnd}</>}
                </p>
              )}
            </div>
          )}

          {activePanel === "allStudents" && (
            <div className="scad-cards-panel scad-narrow-cards">
              <div className="scad-search-wrapper" style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
                <button
                  className="scad-filter-btn"
                  onClick={() => setActivePanel("students")}
                >
                  Go Back 
                </button>

                <select
                  className="scad-filter-btn"
                  value={studentStatusFilter}
                  onChange={e => setStudentStatusFilter(e.target.value)}
                >
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="flagged">Flagged</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="scad-cards-list">
                {students
                  .filter(s => !studentStatusFilter || s.status === studentStatusFilter)
                  .map(s => (
                    <div key={s.id} className="card">
                      <h3>{s.name}</h3>
                      <p><strong>ID:</strong> {s.id}</p>
                      <p><strong>Major:</strong> {s.major}</p>
                      <p><strong>Email:</strong> {s.email}</p>
                      <p><strong>Status:</strong> {s.status}</p>
                      <button className="scad-view-btn" onClick={() => openSCADStudentModal(s)}>
                        View Details
                      </button>
                    </div>
                  ))
                }
                {students.filter(s => !studentStatusFilter || s.status === studentStatusFilter).length === 0 && (
                  <p>No students match that status.</p>
                )}
              </div>
            </div>
          )}

          {scadStatisticsModalVisible && (
            <SCADModal onClose={() => setSCADStatisticsModalVisible(false)}>
              <h3>Statistics Report</h3>
              <ul style={{ paddingLeft: 20 }}>
                <li>
                  <strong>Report Status:</strong>
                  <ul>
                    {statusData.map(d => (
                      <li key={d.name}>{d.name}: {d.count}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Average Review Time (days):</strong>
                  <ul>
                    {reviewTimeData.map(d => (
                      <li key={d.company}>{d.company}: {d.days.toFixed(1)}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Top Courses:</strong>
                  <ul>
                    {courseUsageData.map(d => (
                      <li key={d.course}>{d.course}: {d.count}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Company Ratings:</strong>
                  <ul>
                    {ratingData.map(d => (
                      <li key={d.company}>{d.company}: {d.rating}</li>
                    ))}
                  </ul>
                </li>
                <li>
                  <strong>Intern Count:</strong>
                  <ul>
                    {internshipCountData.map(d => (
                      <li key={d.company}>{d.company}: {d.interns}</li>
                    ))}
                  </ul>
                </li>
              </ul>
              <div style={{ textAlign: "right", marginTop: 16 }}>
                <button
                  className="scad-filter-btn"
                  onClick={() => setSCADStatisticsModalVisible(false)}
                >
                  Close
                </button>
              </div>
            </SCADModal>
          )}

          {activePanel === "videoAppointments" && (
            <div className="scad-cards-panel scad-narrow-cards">
              <div className="scad-cards-list">
                <div className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px' }}>
                    <button
                      className="scad-filter-btn"
                      onClick={() => setRequestModalVisible(true)}
                    >
                      Request Appointment
                    </button>
                    <button className="scad-filter-btn" onClick={handleViewAppointments}>
                      Appointment Requests
                    </button>
                    <button
                      className="scad-filter-btn"
                      onClick={() => setViewAppointmentsVisible(v => !v)}
                    >
                      View Appointments
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {viewAppointmentsVisible && (
            <SCADModal onClose={() => setViewAppointmentsVisible(false)}>
              <h3>Upcoming Appointments</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {dummyAppointments.map(({ name, date, time, online }) => (
                  <li key={`${name}-${date}-${time}`} style={{ marginBottom: 12 }}>
                    <p>
                      <strong>{name}</strong> — {date} at {time}  
                      <span style={{
                        color: online ? "#28a745" : "#dc3545",
                        fontWeight: "bold"
                      }}>
                        {online ? "Online" : "Offline"}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
              <div style={{ textAlign: "right", marginTop: 12 }}>
                <button className="scad-filter-btn" onClick={() => setViewAppointmentsVisible(false)}>
                  Close
                </button>
              </div>
            </SCADModal>
          )}

          {appointmentModalVisible && (
            <SCADModal onClose={() => setAppointmentModalVisible(false)}>
              {selectedAppointment ? (
                <>
                  <h3>Appointment with {selectedAppointment.with}</h3>
                  <p><strong>Date:</strong> {selectedAppointment.date}</p>
                  <p><strong>Time:</strong> {selectedAppointment.time}</p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                    <button className="scad-filter-btn" onClick={handleAccept}>Accept</button>
                    <button className="scad-filter-btn" onClick={handleReject}>Reject</button>
                  </div>
                </>
              ) : (
                <>
                  <h3>Pending Appointments</h3>
                  {appointmentRequests.map(req => (
                    <div key={req.id} className="card" style={{ marginBottom: 8 }}>
                      <p><strong>{req.with}</strong>: {req.date} at {req.time}</p>
                      <button
                        className="scad-filter-btn"
                        onClick={() => openAppointmentDetail(req)}
                      >
                        View
                      </button>
                    </div>
                  ))}
                </>
              )}
            </SCADModal>
          )}

          {requestModalVisible && (
            <SCADModal onClose={() => setRequestModalVisible(false)}>
              <h3>Request New Appointment</h3>

              <label>
                Student:
                <select
                  value={requestStudent}
                  onChange={e => setRequestStudent(e.target.value)}
                >
                  <option value="" disabled>-- pick a student --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.name}>
                      {s.name} ({s.id})
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Date:
                <input
                  type="date"
                  value={requestDate}
                  onChange={e => setRequestDate(e.target.value)}
                />
              </label>
              <label>
                Time:
                <input
                  type="time"
                  value={requestTime}
                  onChange={e => setRequestTime(e.target.value)}
                />
              </label>

              <div style={{ textAlign: "right", marginTop: 12, display: "flex", gap: 8, justifyContent: "flex-end" }}>
                <button onClick={() => setRequestModalVisible(false)}>
                  Cancel
                </button>
                <button
                  disabled={!requestStudent || !requestDate || !requestTime}
                  onClick={() => {
                    setAppointmentRequests(prev => [
                      ...prev,
                      {
                        id: `A${Date.now()}`,
                        with: requestStudent,
                        date: requestDate,
                        time: requestTime,
                        status: "pending"
                      }
                    ]);
                    setRequestStudent("");
                    setRequestDate("");
                    setRequestTime("");
                    setRequestModalVisible(false);
                    setPendingRequestsModalVisible(true);
                  }}
                >
                  Submit
                </button>
              </div>
            </SCADModal>
          )}

          {pendingRequestsModalVisible && (
            <SCADModal onClose={() => setPendingRequestsModalVisible(false)}>
              <h3>Pending Appointments</h3>
              <ul>
                {appointmentRequests
                  .filter(r => r.status === "pending")
                  .map(r => (
                    <li key={r.id}>
                      <strong>{r.with}</strong> — {r.date} at {r.time}
                    </li>
                  ))}
              </ul>
              <div style={{ textAlign: "right", marginTop: 12 }}>
                <button
                  className="scad-filter-btn"
                  onClick={() => setPendingRequestsModalVisible(false)}
                >
                  Close
                </button>
              </div>
            </SCADModal>
          )}

          {videoNotifVisible && (
            <SCADModal onClose={() => setVideoNotifVisible(false)}>
              <h3><strong>New Notification</strong></h3>
              <p>
                <strong>{dummyAppointments[0].name}</strong> accepted your appointment.
              </p>
              <div style={{ textAlign: 'right', marginTop: 12 }}>
                <button
                  className="scad-filter-btn"
                  onClick={() => setVideoNotifVisible(false)}
                >
                  Close
                </button>
              </div>
            </SCADModal>
          )}

          {activePanel === "workshops" && (
            <div className="scad-cards-panel scad-narrow-cards">
              <div
                className="scad-search-wrapper"
                style={{ justifyContent: 'flex-end', gap: 8 }}
              >
                <button
                  className="scad-filter-btn"
                  onClick={() => openWorkshopModal()}
                >
                  Create Workshop
                </button>
                <button
                  className="scad-filter-btn"
                  onClick={() => setShowOnlineOnly(o => !o)}
                >
                  {showOnlineOnly ? "Show All Workshops" : "Show Online Workshops"}
                </button>
              </div>

              {workshopModalVisible && (
                <SCADModal onClose={closeWorkshopModal}>
                  <h3>{editingWorkshop ? "Edit Workshop" : "Create Workshop"}</h3>

                  <input
                    name="name"
                    value={formValues.name}
                    onChange={handleFormChange}
                    placeholder="Workshop Name"
                  />

                  <textarea
                    name="description"
                    value={formValues.description}
                    onChange={handleFormChange}
                    placeholder="Short Description"
                    rows={2}
                  />

                  <textarea
                    name="speakerBio"
                    value={formValues.speakerBio}
                    onChange={handleFormChange}
                    placeholder="Speaker Bio"
                    rows={3}
                  />

                  <textarea
                    name="agenda"
                    value={formValues.agenda}
                    onChange={handleFormChange}
                    placeholder="Agenda"
                    rows={4}
                  />

                  <div style={{ margin: '8px 0' }}>
                    <label style={{ display: 'block', marginBottom: 4 }}>Mode:</label>
                    <select
                      name="mode"
                      value={formValues.mode}
                      onChange={handleFormChange}
                      style={{ width: '100%', padding: 6, borderRadius: 4 }}
                    >
                      <option value="" disabled>-- Select mode --</option>
                      <option value="Online">Online</option>
                      <option value="On ground">On ground</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <div>
                      <label>Start:</label>
                      <input
                        type="date"
                        name="startDate"
                        value={formValues.startDate}
                        onChange={handleFormChange}
                      />
                      <input
                        type="time"
                        name="startTime"
                        value={formValues.startTime}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div>
                      <label>End:</label>
                      <input
                        type="date"
                        name="endDate"
                        value={formValues.endDate}
                        onChange={handleFormChange}
                      />
                      <input
                        type="time"
                        name="endTime"
                        value={formValues.endTime}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginTop: 12 }}>
                    <button onClick={closeWorkshopModal}>Cancel</button>
                    <button
                      onClick={saveWorkshop}
                      disabled={!formValues.name.trim()}
                    >
                      {editingWorkshop ? "Update" : "Save"}
                    </button>
                  </div>
                </SCADModal>
              )}

              <div className="scad-cards-list">
                {(() => {
                  const filtered = workshops.filter(ws =>
                    !showOnlineOnly || ws.mode === "Online"
                  );
                  if (filtered.length === 0) {
                    return <p>No workshops to display.</p>;
                  }
                  return filtered.map(ws => (
                    <div key={ws.id} className="card">
                      <h3>{ws.name}</h3>
                      <p><strong>Description:</strong> {ws.description}</p>
                      <p><strong>Speaker Bio:</strong> {ws.speakerBio}</p>
                      <p><strong>Agenda:</strong> {ws.agenda}</p>
                      <p><strong>Mode:</strong> {ws.mode}</p>
                      <p>
                        <strong>When:</strong> {ws.startDate} {ws.startTime} – {ws.endDate} {ws.endTime}
                      </p>
                      <div className="card-actions">
                        <button
                          className="scad-view-btn"
                          onClick={() => openWorkshopModal(ws)}
                        >
                          Edit
                        </button>
                        <button
                          className="scad-view-btn"
                          onClick={() => deleteWorkshop(ws.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {companyModalVisible && companyModalData && (
            <SCADModal onClose={() => setCompanyModalVisible(false)}>
              <h3>{companyModalData.name}</h3>
              <p><strong>Industry:</strong> {companyModalData.industry}</p>
              <p><strong>Email:</strong> {companyModalData.email}</p>
              <p><strong>Size:</strong> {companyModalData.size}</p>
              <p><strong>Location:</strong> {companyModalData.location}</p>
            </SCADModal>
          )}

          {internModalVisible && internModalData && (
            <SCADModal onClose={() => setInternModalVisible(false)}>
              <h3>{internModalData.company}</h3>
              <p><strong>Position:</strong> {internModalData.position}</p>
              <p><strong>Duration:</strong> {internModalData.duration}</p>
              <p><strong>Major:</strong> {internModalData.major}</p>
              <p><strong>Type/Paid:</strong> {internModalData.type} • {internModalData.paid}</p>
              <p><strong>Location:</strong> {internModalData.location}</p>
              <p><strong>Hours:</strong> {internModalData.hours}</p>
              <p><strong>Skills:</strong> {internModalData.skills.join(", ")}</p>
              <p><strong>Salary:</strong> {internModalData.salary} </p>
            </SCADModal>
          )}

          {studentModalVisible && studentModalData && (
            <SCADModal onClose={() => setStudentModalVisible(false)}>
              <h3>{studentModalData.name}</h3>
              <p><strong>ID:</strong> {studentModalData.id}</p>
              <p><strong>Major:</strong> {studentModalData.major}</p>
              <p><strong>Email:</strong> {studentModalData.email}</p>
            </SCADModal>
          )}

          {reportModalVisible && reportModalData && (
            <SCADModal onClose={() => setReportModalVisible(false)}>
              <h3>Internship Report for {reportModalData.name}</h3>
            </SCADModal>
          )}

          {commentModalVisible && (
            <SCADModal onClose={() => setCommentingForId(null)}>
              <h3>
                Why is <strong>
                  {reports.find(r => r.id === commentingForId)?.name}
                </strong> {studentStatuses[commentingForId]}?
              </h3>

              <textarea
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
                placeholder="Enter your comment here…"
                rows={4}
                style={{ width: "100%", marginBottom: 12 }}
              />

              <div style={{ textAlign: "right", gap: 8, display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => setCommentingForId(null)}>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setStudentComments(prev => ({
                      ...prev,
                      [commentingForId]: commentInput.trim()
                    }));
                    setCommentingForId(null);
                  }}
                  disabled={!commentInput.trim()}
                >
                  Save
                </button>
              </div>
            </SCADModal>
          )}
        </div>
      </div>
    </div>
  );
}

function SCADCompanyList({ title, data }) {
  return (
    <div className="scad-cards-panel scad-narrow-cards">
      <div className="scad-cards-list">
        {data.map(c => (
          <div key={c.email} className="card">
            <h3>{c.name}</h3>
            <p>Industry: {c.industry}</p>
            <p>Email: {c.email}</p>
            <p>Size: {c.size}</p>
            <p>Location: {c.location}</p>
          </div>
        ))}
        {data.length === 0 && <p>No {title.toLowerCase()} companies.</p>}
      </div>
    </div>
  );
}

function SCADModal({ children, onClose }) {
  return (
    <div className="scad-modal-overlay" onClick={onClose}>
      <div className="scad-modal-content" onClick={e => e.stopPropagation()}>
        <button className="scad-modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}