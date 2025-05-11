import React from "react";
import "./FacultySidebar1.css";  // Import the CSS file

const FacultySidebar = () => {
  return (
    <div className="sidebar-dark">
      {/* Background element */}
      <div className="sidebar-bg"></div>  {/* New background section */}

      {/* Title inside the sidebar */}
      <div className="sidebar-title-container">
        <p className="sidebar-title">Faculty Dashboard</p>
      </div>

      {/* Optional: Add other sidebar items here */}
    </div>
  );
};

export default FacultySidebar;
