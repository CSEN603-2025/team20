import React, { useState } from "react";
import "./LoginPage.css";
import logo from '../../assets/Logo.png';
import student from '../../assets/Student.png';
import { useNavigate } from 'react-router-dom';

// Dummy data for users
const DUMMY_USERS = [
  { email: "contact@siemens.com", password: "company123", role: "company" },
  { email: "faculty@guc.edu.eg", password: "faculty123", role: "faculty" },
  { email: "student@student.guc.edu.eg", password: "student123", role: "student" },
  { email: "prostudent@student.guc.edu.eg", password: "prostudent123", role: "pro-student" },
  { email: "scad@student.guc.edu.eg", password: "scad123", role: "scad" }
];

const roleToRoute = {
  company: "/company-dashboard",
  faculty: "/faculty-dashboard",
  student: "/student-dashboard",
  "pro-student": "/pro-student-dashboard",
  scad: "/scad-dashboard",
};

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    // Find the user
    const user = DUMMY_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      navigate(roleToRoute[user.role]);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="homepage-container">
      <div className="homepage-left">
        <img src={student} alt="Internship visual" />
      </div>

      <div className="homepage-right">
        <img src={logo} alt="GUC Logo" className="homepage-logo" />

        <div className="homepage-content-wrapper">
          <div className="homepage-content">
            <h1>Welcome!</h1>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="login-input"
              required
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="login-input"
              required
            />
            {error && <p className="login-error">{error}</p>}
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
        </div>

        <div className="homepage-quote">
          <p>"Your internship journey starts here — submit, track, and get approved."</p>
        </div> 
      </div>
    </div>
  );
};

export default LoginPage;
