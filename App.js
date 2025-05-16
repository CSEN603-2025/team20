import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import CompanyDashboard from './components/pages/CompanyDashboard';
import FacultyDashboard from './components/pages/FacultyDashboard';
import SCADashboard from './components/pages/SCADashboard';
import StudentDashboard from './components/pages/StudentDashboard';
import ProStudentDashboard from './components/pages/ProStudentDashboard';
import NotFoundPage from './components/pages/NotFoundPage';
import Report from './components/pages/Report';
import Profile from './components/pages/Profile';
import AvailableInternships from './components/pages/AvailableInternships';
import ApplyInternship from './components/pages/ApplyInternship';
import InternshipReports from './components/pages/InternshipReports';
import Notification from './components/pages/Notification';
import InternshipVideo from './components/pages/InternshipVideo';
import MyInternships from './components/pages/MyInternships';
import VideoCall from './components/pages/VideoCall';
import MyInternships2 from './components/pages/MyInternships2';
import Profile2 from './components/pages/Profile2';
import AvailableInternships2 from './components/pages/AvailableInternships2';
import InternshipReports2 from './components/pages/InternshipReports2';
import Notification2 from './components/pages/Notification2';
import Assessment from './components/pages/Assessment';
import Workshops from './components/pages/Workshops';
import AvailableInternships3 from './components/pages/AvailableInternships3';
import JobPosts from './components/pages/JobPosts';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/internships" element={<AvailableInternships />} />
        <Route path="/apply-internship" element={<ApplyInternship />} />
        <Route path="/my-internships" element={<MyInternships />} />
        <Route path="/my-internships2" element={<MyInternships2 />} />
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="/internship-reports" element={<InternshipReports />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/internship-video" element={<InternshipVideo />} />
        <Route path="/internship-reports2" element={<InternshipReports2 />} />
        <Route path="/notifications2" element={<Notification2 />} />
        <Route path="/profile2" element={<Profile2 />} />
        <Route path="/internships2" element={<AvailableInternships2 />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/jobposts" element={<JobPosts />} />
        {/* Dashboard Routes */}
        <Route path="/company-dashboard/*" element={<CompanyDashboard />} />
        <Route path="/faculty-dashboard/*" element={<FacultyDashboard />} />
      
        <Route path="/scad-dashboard" element={<SCADashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/pro-student-dashboard" element={<ProStudentDashboard />} />
        <Route path="/internships3" element={<AvailableInternships3 />} />
        {/* New Routes */}
        <Route path="/scad-internships" element={<CompanyDashboard />} />
        <Route path="/faculty-dashboard-report" element={<Report />} />
        
        {/* 404 Fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
