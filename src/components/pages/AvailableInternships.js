import React, { useState, useEffect } from "react";
import "./AvailableInternships.css";
import CSidebar from "./CSidebar";
import { FaSearch } from "react-icons/fa";
import { Search } from "lucide-react";

const AvailableInternships = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [internships, setInternships] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("");
  const [selectedPaid, setSelectedPaid] = useState("");
  const [selectedInternship, setSelectedInternship] = useState(null);

  // Dummy internships data
  useEffect(() => {
    const dummyData = [
      { id: 1, title: "Software Developer", company: "Google", duration: "3 months", paid: "Paid", industry: "Technology", salary: "$2000/month", skills: "JavaScript, React, Node.js", description: "Develop web applications using modern JavaScript frameworks." },
      { id: 2, title: "Data Analyst", company: "Microsoft", duration: "6 months", paid: "Unpaid", industry: "Finance", salary: "-", skills: "SQL, Excel, Data Visualization", description: "Analyze financial data and generate reports." },
      { id: 3, title: "Product Manager", company: "Amazon", duration: "4 months", paid: "Paid", industry: "E-commerce", salary: "$3000/month", skills: "Management, Agile, Leadership", description: "Manage product lifecycle and coordinate with teams." },
      { id: 4, title: "UX Designer", company: "Apple", duration: "2 months", paid: "Unpaid", industry: "Technology", salary: "-", skills: "Figma, Sketch, Adobe XD", description: "Design user-friendly interfaces and prototypes." }
    ];
    setInternships(dummyData);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // ✅ Apply button uses window.location.href instead of navigate
  const handleApplyClick = () => {
    window.location.href = `/apply-internship`;
  };

  // ✅ Filtering logic
  const filteredInternships = internships.filter((internship) => {
    return (
      (internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedIndustry === "" || internship.industry === selectedIndustry) &&
      (selectedDuration === "" || internship.duration === selectedDuration) &&
      (selectedPaid === "" || internship.paid === selectedPaid)
    );
  });

  return (
    <div className="internships-page-wrapper">
      <CSidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <div className={`available-internships-container ${isSidebarCollapsed ? "collapsed" : ""}`}>
        <h2 style={{ textAlign: "center", margin: "24px 0", fontWeight: 700 }}>
          Available Internships in SCAD
        </h2>

        {/* 🔎 Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by job title or company name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span style={{ marginLeft: "8px", color: "#888", fontSize: "1.2rem", display: "flex", alignItems: "center" }}>
            <Search size={20} />
          </span>
        </div>
{/* 🔄 Filters */}
<div className="filters">
  <div>
    <label htmlFor="industry-select">Industry</label>
    <select id="industry-select" onChange={(e) => setSelectedIndustry(e.target.value)} value={selectedIndustry}>
      <option value="">All Industries</option>
      <option value="Technology">Technology</option>
      <option value="Finance">Finance</option>
      <option value="E-commerce">E-commerce</option>
    </select>
  </div>

  <div>
    <label htmlFor="duration-select">Duration</label>
    <select id="duration-select" onChange={(e) => setSelectedDuration(e.target.value)} value={selectedDuration}>
      <option value="">Any Duration</option>
      <option value="3 months">3 months</option>
      <option value="6 months">6 months</option>
      <option value="4 months">4 months</option>
      <option value="2 months">2 months</option>
    </select>
  </div>

  <div>
    <label htmlFor="paid-select">Paid/Unpaid</label>
    <select id="paid-select" onChange={(e) => setSelectedPaid(e.target.value)} value={selectedPaid}>
      <option value="">Any Type</option>
      <option value="Paid">Paid</option>
      <option value="Unpaid">Unpaid</option>
    </select>
  </div>
</div>
{/* 📝 Popup Modal */}
{selectedInternship && (
  <div className="modal" onClick={() => setSelectedInternship(null)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={() => setSelectedInternship(null)}>✖</button>
      <h2>{selectedInternship.title} at {selectedInternship.company}</h2>
      <p><strong>Duration:</strong> {selectedInternship.duration}</p>
      <p><strong>Paid:</strong> {selectedInternship.paid}</p>
      <p><strong>Salary:</strong> {selectedInternship.salary}</p>
      <p><strong>Industry:</strong> {selectedInternship.industry}</p>
      <p><strong>Skills Required:</strong> {selectedInternship.skills}</p>
      <p><strong>Description:</strong> {selectedInternship.description}</p>
    </div>
  </div>
)}

        {/* 📋 Internships List */}
        <div className="internships-list">
          {filteredInternships.map((internship) => (
            <div key={internship.id} className="internship-card">
              <h3>{internship.title}</h3>
              <p>{internship.company}</p>
              <p>{internship.duration}</p>
              <p>{internship.paid}</p>
              <p>{internship.industry}</p>
              <div className="card-footer">
                <button onClick={() => setSelectedInternship(internship)}>View Details</button>
                <button onClick={() => handleApplyClick(internship.id)} className="apply-button">
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default AvailableInternships;