import React from "react";
import "./HomePage.css";
import logo from '../../assets/Logo.png';
import student from '../../assets/Student.png';
const HomePage = () => {
  return (
    <div className="homepage-container">
      {/* Left Image */}
      <div className="homepage-left">
        <img src={student} alt="Internship visual" />
      </div>

      {/* Right Section */}
      <div className="homepage-right">
        {/* Logo (absolute, stays in place) */}
        <img src={logo} alt="GUC Logo" className="homepage-logo" />

        {/* Wrapper for text + buttons (this is what we'll move) */}
        <div className="homepage-content-wrapper">
          <div className="homepage-content">
            <h1>Welcome!</h1>
            <p className="homepage-subtext">Select an option to proceed</p>
          </div>

          <div className="homepage-buttons">
            <button onClick={() => window.location.href = '/login'}>Login</button>
            <button onClick={() => window.location.href = '/register'}>Register as Company</button>
          </div>
          <div className="homepage-quote">
  <p>"Your internship journey starts here — submit, track, and get approved."</p>
</div> 
        </div>
      </div>
    </div>
  );
};

export default HomePage;
