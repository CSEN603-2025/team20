import React, { useState, useRef, useEffect } from "react";
import "./SCADDashboard.css";

const SCADDashboard = () => {
  const companies = [
    { name: "Siemens", industry: "Technology", email: "Siemens@work.com", size: 1000 },
    { name: "Orange", industry: "Telecommunications", email: "Orange@work.com", size: 3000 },
    { name: "Eva Pharma", industry: "Pharmaceutical", email: "Evapharma@work.com", size: 200 },
  ];

  // Industry filter setup
  const allIndustries = Array.from(new Set(companies.map((c) => c.industry)));
  const [selectedIndustries, setSelectedIndustries] = useState(allIndustries);
  const [filter, setFilter] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, []);

  const toggleIndustry = (ind) =>
    setSelectedIndustries((prev) =>
      prev.includes(ind) ? prev.filter((x) => x !== ind) : [...prev, ind]
    );
  const allSelected = selectedIndustries.length === allIndustries.length;
  const toggleAll = () =>
    setSelectedIndustries(allSelected ? [] : allIndustries);

  // Accept/Reject status
  const [statuses, setStatuses] = useState(() =>
    companies.reduce((acc, c) => {
      acc[c.email] = "Accept";
      return acc;
    }, {})
  );
  const onStatusChange = (email, newStatus) =>
    setStatuses((prev) => ({ ...prev, [email]: newStatus }));

  // Panel open/closed (moved to top-level)
  const [panelOpen, setPanelOpen] = useState(true);

  // Filter & split
  const visible = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(filter.trim().toLowerCase()) &&
      selectedIndustries.includes(c.industry)
  );
  const accepted = visible.filter((c) => statuses[c.email] === "Accept");
  const rejected = visible.filter((c) => statuses[c.email] === "Reject");

  return (
    <div className="scad-wrapper">
      <aside className="sidebar-dark">
        <div className="sidebar-title-container">
          <p className="sidebar-title">Faculty Dashboard</p>

          {/* NEW: Toggle button under the title */}
          <button
          className="panel-toggle-btn"
          onClick={() => setPanelOpen((o) => !o)}
          >
           Pending Companies
        </button>
        </div>
      </aside>

      <div className="main-content">
        <div className="top-bar">
          <h1 className="dashboard-title">Welcome to the pro SCAD Dashboard!</h1>
        </div>

        <div className="dashboard-content">
          {panelOpen && (
            <>
              {/* SEARCH + FILTER ROW */}
              <div className="datatable-header">
                <h2 className="section-title">Pending Companies</h2>
                <div className="search-wrapper">
                  <svg className="search-icon" viewBox="0 0 24 24" aria-hidden>
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 
                             16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 
                             0 3.09-.59 4.23-1.57l.27.28v.79l5 
                             4.99L20.49 19l-4.99-5zm-6 
                             0C8.01 14 6 11.99 6 9.5S8.01 
                             5 10.5 5 15 7.01 15 9.5 
                             12.99 14 10.5 14z"/>
                  </svg>
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search companies"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  />
                </div>
              </div>

              {/* MAIN PENDING TABLE */}
              <table className="Companies_datatable">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th ref={dropdownRef} className="industry-header">
                      <span>Industry</span>
                      <button
                        className="filter-btn"
                        onClick={() => setDropdownOpen((o) => !o)}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path d="M3 5h18l-7 7v7l-4-2v-5z" fill="#555"/>
                        </svg>
                      </button>
                      {dropdownOpen && (
                        <div className="filter-dropdown">
                          <button className="toggle-all" onClick={toggleAll}>
                            {allSelected ? "Clear All" : "Select All"}
                          </button>
                          <ul>
                            {allIndustries.map((ind) => (
                              <li key={ind}>
                                <label>
                                  <input
                                    type="checkbox"
                                    checked={selectedIndustries.includes(ind)}
                                    onChange={() => toggleIndustry(ind)}
                                  />{" "}
                                  {ind}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </th>
                    <th>Email</th>
                    <th>Company size</th>
                    <th>Acceptance/Rejection</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((c) => (
                    <tr key={c.email}>
                      <td>{c.name}</td>
                      <td>{c.industry}</td>
                      <td>{c.email}</td>
                      <td>{c.size}</td>
                      <td>
                        <select
                          value={statuses[c.email]}
                          onChange={(e) =>
                            onStatusChange(c.email, e.target.value)
                          }
                        >
                          <option>Accept</option>
                          <option>Reject</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {visible.length === 0 && (
                <p className="no-results">No companies found.</p>
              )}

              {/* ACCEPTED & REJECTED TABLES */}
              <div className="dual-tables-container">
                <div className="mini-table-card">
                  <h3 className="mini-table-title">Accepted Companies</h3>
                  <table className="Companies_datatable">
                    <thead>
                      <tr><th>Name</th><th>Email</th></tr>
                    </thead>
                    <tbody>
                      {accepted.map((c) => (
                        <tr key={c.email}>
                          <td>{c.name}</td>
                          <td>{c.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mini-table-card">
                  <h3 className="mini-table-title">Rejected Companies</h3>
                  <table className="Companies_datatable">
                    <thead>
                      <tr><th>Name</th><th>Email</th></tr>
                    </thead>
                    <tbody>
                      {rejected.map((c) => (
                        <tr key={c.email}>
                          <td>{c.name}</td>
                          <td>{c.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SCADDashboard;
