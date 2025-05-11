import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../assets/Logo.png";
import student from "../../assets/Student.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Dummy users for each dashboard role
  const dummyUsers = [
    { email: "student@guc.edu.eg", password: "student1", role: "student" },
    { email: "student1@guc.edu.eg", password: "student2", role: "student" },
    { email: "student2@guc.edu.eg", password: "student", role: "student" },
    { email: "faculty1@guc.edu.eg", password: "faculty1", role: "faculty" },
    { email: "faculty2@guc.edu.eg", password: "faculty2", role: "faculty" },
    { email: "faculty3@guc.edu.eg", password: "faculty3", role: "faculty" },
    { email: "scad1@guc.edu.eg", password: "sca1", role: "scad" },
    { email: "scad2@guc.edu.eg", password: "scad2", role: "scad" },
    { email: "scad3@guc.edu.eg", password: "scad3", role: "scad" },
    { email: "prostudent1@guc.edu.eg", password: "pro1", role: "prostudent" },
    { email: "prostudent2@guc.edu.eg", password: "pro2", role: "prostudent" },
    { email: "prostudent3@guc.edu.eg", password: "pro3", role: "prostudent" },
    { email: "company1@guc.edu.eg", password: "company1", role: "company" },
    { email: "company2@guc.edu.eg", password: "company2", role: "company" },
    { email: "company3@guc.edu.eg", password: "", role: "company" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find user by email and password
    const foundUser = dummyUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Redirect based on the role
      navigate(`/dashboard/${foundUser.role}`);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="homepage-container">
      {/* Left Image */}
      <div className="homepage-left">
        <img src={student} alt="Internship visual" />
      </div>

      {/* Right Section */}
      <div className="homepage-right">
        <img src={logo} alt="GUC Logo" className="homepage-logo" />

        <div className="homepage-content-wrapper">
          <div className="homepage-content">
            <h1>Welcome!</h1>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
