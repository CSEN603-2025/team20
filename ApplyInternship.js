import React, { useState } from "react";
import "./ApplyInternship.css";

const majors = ["Computer Science", "Business Administration", "Electrical Engineering"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];

const ApplyInternship = () => {
  // State Management
  const [formData, setFormData] = useState({
    name: "",
    major: "",
    semester: "",
    documents: [],
  });
  const [applications, setApplications] = useState([]);

  // Handling Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handling File Change
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, documents: files });
  };

  // Submit Form Logic
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.major || !formData.semester) {
      alert("Please fill all required fields!");
      return;
    }

    const newApplication = {
      ...formData,
      status: "Pending",
      id: applications.length + 1,
    };

    setApplications([...applications, newApplication]);
    alert("Application submitted successfully!");

    // Reset form
    setFormData({ name: "", major: "", semester: "", documents: [] });
  };

  return (
    <div className="apply-internship-container">
      <h2>Apply for Internship</h2>
      <form onSubmit={handleSubmit} className="apply-form">
        
        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Major Dropdown */}
        <select name="major" value={formData.major} onChange={handleChange} required>
          <option value="">Select Major</option>
          {majors.map((major, index) => (
            <option key={index} value={major}>
              {major}
            </option>
          ))}
        </select>

        {/* Semester Dropdown */}
        <select name="semester" value={formData.semester} onChange={handleChange} required>
          <option value="">Select Semester</option>
          {semesters.map((semester, index) => (
            <option key={index} value={semester}>
              Semester {semester}
            </option>
          ))}
        </select>

        {/* Document Upload */}
        <div className="document-upload-section">
          <h4>📂 Upload Supporting Documents</h4>
          <p className="document-description">
            (Upload any extra documents such as certificates, cover letters, CV, or other documents that showcase your fit for the internship)
          </p>
          <input
            type="file"
            name="documents"
            multiple
            onChange={handleFileChange}
          />
        </div>

        {/* Displaying uploaded documents */}
        {formData.documents.length > 0 && (
          <div className="document-list">
            <h4>Uploaded Documents:</h4>
            <ul>
              {formData.documents.map((doc, index) => (
                <li key={index}>{doc.name}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit">Submit Application</button>
      </form>

     
      
    </div>
  );
};

export default ApplyInternship;
