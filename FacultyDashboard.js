import React from "react";
import FacultySidebar from "./FacultySidebar";
import profilePic from "../../assets/all-these-are-wonderful-words-letter-f-in-circle--m2H7G6m2G6H7G6Z5.png";
import './FacultyDashboard.css';
import InternshipReportsTable from "./InternshipReportsTable";

const FacultyDashboard = () => {
  return (
    <div className="faculty-dashboard-wrapper">
      <FacultySidebar />

      <div className="dashboard-content">
        <div className="nav-right">
          <img
            src={profilePic}
            alt="Profile"
            className="profile-pic"
          />
        </div>

        <div className="card-active-project">
          {/* Adding the "Internship Reports" section here */}
          <div className="frame-926">
            <span>Internship Reports</span>
            </div>
            <div className="faculty-table">
              <InternshipReportsTable/>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
