import React, { useState } from 'react';
import './RegisterPage.css';
import logo from '../../assets/Logo.png';
import student from '../../assets/Student.png';
import Spinner from '../../components/common/Spinner';

// Dummy data for validation
const DUMMY_DATA = {
  accepted: {
    companyName: "TechCorp",
    industry: "Technology",
    companySize: "500",
    email: "contact@techcorp.com"
  },
  rejected: {
    companyName: "BadCorp",
    industry: "Unknown",
    companySize: "10",
    email: "info@badcorp.com"
  }
};

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const companyName = formData.get("companyName");
    const industry = formData.get("industry");
    const companySize = formData.get("companySize");
    const email = formData.get("email");

    setTimeout(() => {
      setLoading(false);

      // Check against dummy data
      if (
        companyName === DUMMY_DATA.accepted.companyName &&
        industry === DUMMY_DATA.accepted.industry &&
        companySize === DUMMY_DATA.accepted.companySize &&
        email === DUMMY_DATA.accepted.email
      ) {
        alert('Registration Accepted! Welcome to the GUC Internship System. You are now registered as a company.');
        window.location.href = '/login'; // Navigate to AcceptedPage
      } else {
        alert('Registration Rejected! Your legal/tax documents were not verified, You can try again.');
        window.location.href = '/'; // Navigate to RejectedPage
      }
    }, 3000);
  };

  return (
    <div className="register-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <img src={logo} alt="GUC Logo" className="register-logo" />
          <div className="register-content">
            <div className="register-left">
              <img src={student} alt="Internship visual" />
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <h2>Register as a Company</h2>
              <input className="register-input" name="companyName" type="text" placeholder="Company Name" required />
              <input className="register-input" name="industry" type="text" placeholder="Industry" required />
              <input className="register-input" name="companySize" type="text" placeholder="Company Size" required />
              <input className="register-input" name="email" type="email" placeholder="Email" required />
              <input className="register-input" name="password" type="password" placeholder="Password" required />
              <label>Upload Logo:</label>
              <input className="register-input" type="file" accept="image/*" />

              <label>Upload Legal/Tax Documents:</label>
              <input className="register-input" type="file" accept="file/*" />

              <button className="register-button" type="submit">Sign Up</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
