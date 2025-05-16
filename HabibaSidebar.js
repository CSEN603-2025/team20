// src/components/pages/HabibaSidebar.js
import React, { useState, useEffect } from "react";
import "./FacultySidebar1.css";
import JobPosts from "./JobPosts";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Briefcase,
  FileText,
  User,
  Bell,
  GraduationCap,
  Mail
} from "lucide-react";

// Sidebar menu items
const menuItems = [
  { name: "Dashboard",            icon: <Home size={20} />,          link: "/company-dashboard" },
  { name: "Company Internships",  icon: <Briefcase size={20} />,    link: "/company-dashboard/internships" },
  { name: "SCAD Internships",     icon: <GraduationCap size={20} />, link: "/scad-internships" },   // ← new button
  { name: "Job Posts",            icon: <FileText size={20} />,      link: "/job-posts" },
  { name: "Internship Applications", icon: <FileText size={20} />,  link: "/company-dashboard/applications" },
  { name: "Profile",              icon: <User size={20} />,          link: "/company-dashboard/profile" },
  { name: "Notifications",        icon: <Bell size={20} />,          link: "/notifications" },
  { name: "Email",                icon: <Mail size={20} />,          link: "/email" },
  { name: "Current Interns",      icon: <GraduationCap size={20} />, link: "/company-dashboard/current-interns" },
];

const user = {
  name: 'Siemens',
  email: 'siemens@work.com',
  role: 'Technology',
  location: 'Cairo Office',
  phone: '+20-123-456-789'
};

export default function HabibaSidebar({ onProfileClick }) {
  const [isCollapsed, setIsCollapsed]       = useState(false);
  const [activeLink, setActiveLink]         = useState(window.location.pathname);
  const [showJobPosts, setShowJobPosts]     = useState(false);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [showNotifPopup, setShowNotifPopup] = useState(false);
  const navigate = useNavigate();

  // Keep track of URL changes
  useEffect(() => {
    const handleLocationChange = () => setActiveLink(window.location.pathname);
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  // Toggle sidebar collapse
  const toggleSidebar = () => setIsCollapsed(prev => !prev);

  return (
    <>
      <aside className={`sidebar-dark ${isCollapsed ? "collapsed" : ""}`}>
        {!isCollapsed && (
          <div className="sidebar-title-container">
            <p className="sidebar-title">Company Dashboard</p>
          </div>
        )}

        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <nav className="sidebar-content">
          <ul className="sidebar-menu">
            {menuItems.map(({ name, icon, link }) => (
              <li key={link} title={isCollapsed ? name : ""}>
                <a
                  href={link}
                  className={`internship-link ${activeLink === link ? "active" : ""}`}
                  onClick={e => {
                    e.preventDefault();

                    // Open Profile popup instead of navigating
                    if (link === "/company-dashboard/profile") {
                      onProfileClick();
                      setActiveLink(link);
                      return;
                    }

                    // Handle main dashboard routes
                    if (
                      link === "/company-dashboard" ||
                      link === "/company-dashboard/internships" ||
                      link === "/company-dashboard/applications" ||
                      link === "/company-dashboard/current-interns"||
                      link === "/scad-internships"  
                      
                    ) {
                      navigate(link);
                      setActiveLink(link);
                      return;
                    }

                    // Reset other popups
                    setShowJobPosts(false);
                    setShowEmailPopup(false);
                    setShowNotifPopup(false);

                    // Show JobPosts modal
                    if (link === "/job-posts") {
                      setShowJobPosts(true);
                      setActiveLink(link);
                      return;
                    }

                    // Show Email popup
                    if (link === "/email") {
                      setShowEmailPopup(true);
                      setActiveLink(link);
                      return;
                    }

                    // Show Notifications popup
                    if (link === "/notifications") {
                      setShowNotifPopup(true);
                      setActiveLink(link);
                      return;
                    }

                    // Fallback: push history state
                    window.history.pushState({}, "", link);
                    setActiveLink(link);
                  }}
                >
                  {icon}
                  {!isCollapsed && <span className="sidebar-label">{name}</span>}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Job Posts Modal */}
      {showJobPosts && (
        <div className="modal-overlay" onClick={() => setShowJobPosts(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <JobPosts />
            <button className="close-btn" onClick={() => setShowJobPosts(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Email Popup */}
      {showEmailPopup && (
        <div className="modal-overlay" onClick={() => setShowEmailPopup(false)}>
          <div className="modal-box email-modal" onClick={e => e.stopPropagation()}>
            <div className="email-header">
              <h3 className="email-subject">Subject: Application Update</h3>
              <p className="email-meta">
                <span>From: SCAD Office &lt;scad@scad.edu&gt;</span>
                <span>Date: {new Date().toLocaleString()}</span>
              </p>
            </div>
            <div className="email-body">
              <p>Dear {user.name},</p>
              <p>Your application has been <strong>accepted</strong> by the SCAD office. Congratulations!</p>
              <p>We’re excited to have you on board. If you have any questions, please reply to this email.</p>
              <hr />
              <p>A new application has also been received. You can review it from the dashboard under “Applications.”</p>
            </div>
            <div className="email-actions">
              <button className="btn-reply">Reply</button>
              <button className="btn-archive">Archive</button>
              <button className="close-btn" onClick={() => setShowEmailPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Popup */}
      {showNotifPopup && (
        <div className="modal-overlay" onClick={() => setShowNotifPopup(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <p>1. A new application has been received.</p>
            <button className="close-btn" onClick={() => setShowNotifPopup(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}