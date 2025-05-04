import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from '/Users/jana/Desktop/GUC/Semester 6/Software Engineering/Milestone 2/guc-internship-system/src/components/pages/HomePage.js';
import LoginPage from '/Users/jana/Desktop/GUC/Semester 6/Software Engineering/Milestone 2/guc-internship-system/src/components/pages/LoginPage';
import RegisterPage from '/Users/jana/Desktop/GUC/Semester 6/Software Engineering/Milestone 2/guc-internship-system/src/components/pages/RegisterPage';
import CompanyDashboard from '/Users/jana/Desktop/GUC/Semester 6/Software Engineering/Milestone 2/guc-internship-system/src/components/pages/CompanyDashboard';
import FacultyDashboard from '/Users/jana/Desktop/GUC/Semester 6/Software Engineering/Milestone 2/guc-internship-system/src/components/pages/FacultyDashboard';
import SCADashboard from '/Users/jana/Desktop/GUC/Semester 6/Software Engineering/Milestone 2/guc-internship-system/src/components/pages/SCADashboard';
import StudentDashboard from '/Users/jana/Desktop/GUC/Semester 6/Software Engineering/Milestone 2/guc-internship-system/src/components/pages/StudentDashboard';
import ProStudentDashboard from '/Users/jana/Desktop/GUC/Semester 6/Software Engineering/Milestone 2/guc-internship-system/src/components/pages/ProStudentDashboard';
import NotFoundPage from '/Users/jana/Desktop/GUC/Semester 6/Software Engineering/Milestone 2/guc-internship-system/src/components/pages/NotFoundPage';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard Routes */}
        <Route path="/company-dashboard" element={<CompanyDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/scad-dashboard" element={<SCADashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/pro-student-dashboard" element={<ProStudentDashboard />} />

        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;

