import React, { useEffect, useState } from "react";
import "./InternshipDetails.css";

const InternshipDetails = () => {
  const [internship, setInternship] = useState(null);

  // Load internship details from sessionStorage
  useEffect(() => {
    const storedInternship = window.sessionStorage.getItem("selectedInternship");
    if (storedInternship) {
      setInternship(JSON.parse(storedInternship));
    }
  }, []);

  if (!internship) {
    return <p>No internship details found.</p>;
  }

  return (
    <div className="profile-container">
      <button className="go-back-button" onClick={() => window.history.back()}>
        <span role="img" aria-label="Go Back"></span> Go Back
      </button>
      <div className="profile-info">
        <h2>{internship.title}</h2>
        <h3>Company: {internship.company}</h3>
        <p><strong>Duration:</strong> {internship.duration}</p>
        <p><strong>Description:</strong> {internship.description}</p>
      </div>
    </div>
  );
};

export default InternshipDetails;
