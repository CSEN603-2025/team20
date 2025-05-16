import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Briefcase,
  FileText,
  User,
  Users,
  Bell,
  Video,
  Mail,
} from "lucide-react";
import "./CSidebar.css";

const menuItems = [
  { name: "Dashboard", icon: <Home size={20} />, link: "/company-dashboard" },
  { name: "Company Internships", icon: <Briefcase size={20} />, link: "/company-internships" },
    { name: "Available Internships", icon: <FileText size={20} />, link: "/available-internships" },
  { name: "Applicants", icon: <Users size={20} />, link: "/all-applicants" },
    { name: "Current Interns", icon: <User size={20} />, link: "/current-interns" },
  { name: "Scad", icon: <Mail size={20} />, link: "/scad" },
];

const CSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
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
              <Link
                to={link}
                className={`sidebar-link ${location.pathname === link ? "active" : ""}`}
              >
                {icon}
                {!isCollapsed && <span className="sidebar-label">{name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default CSidebar;