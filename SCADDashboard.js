import React, { useState, useRef, useEffect } from "react";
import "./SCADDashboard.css";

export default function SCADDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(c => !c);

  const [activePanel, setActivePanel] = useState("pending");

  // ─── Pending Companies ──────────────────────────────────────────────
  const companies = [
    { name: "Siemens",    industry: "Technology",         email: "siemens@work.com",   size: 1000 },
    { name: "Orange",     industry: "Telecommunications", email: "orange@work.com",    size: 3000 },
    { name: "Eva Pharma", industry: "Pharmaceutical",     email: "evapharma@work.com",  size: 200  },
  ];
  const allIndustries = Array.from(new Set(companies.map(c => c.industry)));
  const [selectedIndustries, setSelectedIndustries] = useState(allIndustries);
  const [companyFilter, setCompanyFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const [statuses, setStatuses] = useState(
    companies.reduce((acc, c) => ({ ...acc, [c.email]: "Accept" }), {})
  );

  useEffect(() => {
    const onOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", onOutside);
    return () => window.removeEventListener("mousedown", onOutside);
  }, []);

  const toggleIndustry = ind =>
    setSelectedIndustries(prev =>
      prev.includes(ind) ? prev.filter(x => x !== ind) : [...prev, ind]
    );
  const allSelected = selectedIndustries.length === allIndustries.length;
  const toggleAllIndustries = () =>
    setSelectedIndustries(allSelected ? [] : allIndustries);
  const onStatusChange = (email, val) =>
    setStatuses(prev => ({ ...prev, [email]: val }));
  const visibleCompanies = companies.filter(c =>
    c.name.toLowerCase().includes(companyFilter.toLowerCase()) &&
    selectedIndustries.includes(c.industry)
  );

  // ─── Internship Listings ────────────────────────────────────────────
  const internships = [
    {
      company: "Acme Corp",
      position: "Software Engineer Intern",
      duration: "3 months",
      major: "Computer Science",
      type: "Full Time",
      paid: "Paid",
    },
    {
      company: "Beta LLC",
      position: "Business Analyst Intern",
      duration: "6 weeks",
      major: "Business",
      type: "Part Time",
      paid: "Unpaid",
    },
  ];
  const [internFilter, setInternFilter] = useState("");
  const facets = {
    company:  Array.from(new Set(internships.map(i => i.company))),
    duration: Array.from(new Set(internships.map(i => i.duration))),
    major:    Array.from(new Set(internships.map(i => i.major))),
    type:     Array.from(new Set(internships.map(i => i.type))),
    paid:     Array.from(new Set(internships.map(i => i.paid))),
  };
  const [selectedFacets, setSelectedFacets] = useState({
    company:  [...facets.company],
    duration: [...facets.duration],
    major:    [...facets.major],
    type:     [...facets.type],
    paid:     [...facets.paid],
  });
  const [facetDropdownOpen, setFacetDropdownOpen] = useState(false);
  const facetRef = useRef();

  useEffect(() => {
    const onOutside = e => {
      if (facetRef.current && !facetRef.current.contains(e.target)) {
        setFacetDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", onOutside);
    return () => window.removeEventListener("mousedown", onOutside);
  }, []);

  const toggleFacet = (field, val) =>
    setSelectedFacets(prev => ({
      ...prev,
      [field]: prev[field].includes(val)
        ? prev[field].filter(x => x !== val)
        : [...prev[field], val]
    }));
  const allFieldsSelected = Object.values(selectedFacets).every(
    (arr, i) => arr.length === Object.values(facets)[i].length
  );
  const toggleAllFacets = () => {
    if (allFieldsSelected) {
      setSelectedFacets({ company: [], duration: [], major: [], type: [], paid: [] });
    } else {
      setSelectedFacets({
        company:  [...facets.company],
        duration: [...facets.duration],
        major:    [...facets.major],
        type:     [...facets.type],
        paid:     [...facets.paid],
      });
    }
  };
  const displayedInterns = internships.filter(i => {
    const t = internFilter.toLowerCase();
    const matchesText =
      i.company.toLowerCase().includes(t) ||
      i.position.toLowerCase().includes(t) ||
      i.duration.toLowerCase().includes(t) ||
      i.major.toLowerCase().includes(t) ||
      i.type.toLowerCase().includes(t) ||
      i.paid.toLowerCase().includes(t);
    const matchesFacets = Object.entries(selectedFacets).every(
      ([f, arr]) => arr.includes(i[f])
    );
    return matchesText && matchesFacets;
  });

  // ─── Details Modal ─────────────────────────────────────────
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);
  const openModal = item => {
    setModalData({ ...item, location: "Giza Office", hours: "9:00 AM – 5:00 PM" });
    setModalVisible(true);
  };

  // ─── Reports ───────────────────────────────────────────────
  const reports = [
    { name: "Ali Hassan", id: "S12345", major: "Engineering", status: "pending",  fileUrl: "/reports/ali.pdf" },
    { name: "Sara Ahmed", id: "S67890", major: "Business",    status: "accepted", fileUrl: "/reports/sara.pdf" },
    { name: "Omar Naguib",id: "S24680", major: "Engineering", status: "rejected", fileUrl: "/reports/omar.pdf" },
    { name: "Mona Soliman",id: "S13579", major: "Design",      status: "pending",  fileUrl: "/reports/mona.pdf" },
  ];
  const [reportMajorFilter, setReportMajorFilter] = useState("");
  const [reportStatusFilter, setReportStatusFilter] = useState("");
  const majors = Array.from(new Set(reports.map(r => r.major)));
  const statusesList = ["pending", "accepted", "rejected"];
  const [filteredReports, setFilteredReports] = useState(reports);
  const applyReportFilter = () => {
    setFilteredReports(
      reports.filter(r =>
        (!reportMajorFilter   || r.major === reportMajorFilter) &&
        (!reportStatusFilter  || r.status === reportStatusFilter)
      )
    );
  };

  return (
    <div className={`scad-wrapper${isCollapsed ? " collapsed" : ""}`}>
      <aside className={`sidebar-dark${isCollapsed ? " collapsed" : ""}`}>
        <div className="sidebar-title-container">
          <p className="sidebar-title">SCAD Dashboard</p>
          <button
            className="toggle-btn"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          />
        </div>

        {!isCollapsed && (
          <>
            <button
              className={`sidebar-item${activePanel === "pending" ? " active" : ""}`}
              onClick={() => setActivePanel("pending")}
            >
              Pending Companies
            </button>
            <button
              className={`sidebar-item${activePanel === "listings" ? " active" : ""}`}
              onClick={() => setActivePanel("listings")}
            >
              Internship Listings
            </button>
            <button
              className={`sidebar-item${activePanel === "reports" ? " active" : ""}`}
              onClick={() => setActivePanel("reports")}
            >
              Reports
            </button>
          </>
        )}
      </aside>

      <div className="main-content">
        <div className="top-bar">
          <h1 className="dashboard-title">Welcome to the pro SCAD Dashboard!</h1>
        </div>
        <div className="dashboard-content">
          {activePanel === "pending" && (
            <div className="cards-panel">
              <div className="content-container" ref={dropdownRef}>
                <div className="search-wrapper">
                  <input
                    className="search-input"
                    placeholder="Search companies"
                    value={companyFilter}
                    onChange={e => setCompanyFilter(e.target.value)}
                  />
                  <button className="filter-btn" onClick={() => setDropdownOpen(o => !o)}>
                    Filter
                  </button>
                </div>
                {dropdownOpen && (
                  <div className="facet-dropdown">
                    <button className="toggle-all" onClick={toggleAllIndustries}>
                      {allSelected ? "Clear All" : "Select All"}
                    </button>
                    {allIndustries.map(ind => (
                      <label key={ind} className="facet-option">
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
                <div className="cards-list">
                  {visibleCompanies.map(c => (
                    <div key={c.email} className="card">
                      <h3>{c.name}</h3>
                      <p>Industry: {c.industry}</p>
                      <p>Email: {c.email}</p>
                      <p>Size: {c.size}</p>
                      <select
                        className="card-select"
                        value={statuses[c.email]}
                        onChange={e => onStatusChange(c.email, e.target.value)}
                      >
                        <option>Accept</option>
                        <option>Reject</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activePanel === "listings" && (
            <div className="cards-panel">
              <div className="content-container" ref={facetRef}>
                <div className="search-wrapper">
                  <input
                    className="search-input"
                    placeholder="Search internships"
                    value={internFilter}
                    onChange={e => setInternFilter(e.target.value)}
                  />
                  <button className="filter-btn" onClick={() => setFacetDropdownOpen(o => !o)}>
                    Filter
                  </button>
                </div>
                {facetDropdownOpen && (
                  <div className="facet-dropdown">
                    <button className="toggle-all" onClick={toggleAllFacets}>
                      {allFieldsSelected ? "Clear All" : "Select All"}
                    </button>
                    {Object.entries(facets).map(([f, opts]) => (
                      <div key={f} className="facet-group">
                        <strong className="facet-label">{f}</strong>
                        <div className="facet-options">
                          {opts.map(opt => (
                            <label key={opt} className="facet-option">
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
                <div className="cards-list">
                  {displayedInterns.map((i, idx) => (
                    <div key={idx} className="card">
                      <h3>{i.company}</h3>
                      <p>Position: {i.position}</p>
                      <p>Duration: {i.duration}</p>
                      <p>Major: {i.major}</p>
                      <p>
                        {i.type} • {i.paid}
                      </p>
                      <button className="view-btn" onClick={() => openModal(i)}>
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activePanel === "reports" && (
            <div className="cards-panel">
              <div className="content-container">
                <div className="search-wrapper">
                  <select
                    value={reportMajorFilter}
                    onChange={e => setReportMajorFilter(e.target.value)}
                  >
                    <option value="">All Majors</option>
                    {majors.map(m => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <select
                    value={reportStatusFilter}
                    onChange={e => setReportStatusFilter(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    {statusesList.map(s => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <button className="filter-btn" onClick={applyReportFilter}>
                    Filter
                  </button>
                </div>
                <div className="cards-list">
                  {filteredReports.map(r => (
                    <div key={r.id} className="card">
                      <h3>{r.name}</h3>
                      <p>ID: {r.id}</p>
                      <p>Major: {r.major}</p>
                      <p>Status: {r.status}</p>
                      <a href={r.fileUrl} download className="download-btn">
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {modalVisible && (
            <div className="modal-overlay" onClick={() => setModalVisible(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setModalVisible(false)}>
                  ×
                </button>
                <h3>{modalData.company}</h3>
                <p>Position: {modalData.position}</p>
                <p>Duration: {modalData.duration}</p>
                <p>Major: {modalData.major}</p>
                <p>
                  {modalData.type} • {modalData.paid}
                </p>
                <p>Location: {modalData.location}</p>
                <p>Working Hours: {modalData.hours}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
