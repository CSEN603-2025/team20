import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./FacultySidebar1.css";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Briefcase,
  FileText,
  User,
  Bell,
  Video,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: <Home size={20} />, link: "/student-dashboard" },
  { name: "Available Internships", icon: <Briefcase size={20} />, link: "/internships" },
  { name: "My Internships", icon: <FileText size={20} />, link: "/my-internships" },
  { name: "Internship Reports", icon: <FileText size={20} />, link: "/internship-reports" },
  { name: "Profile", icon: <User size={20} />, link: "/profile" },
  { name: "Notifications", icon: <Bell size={20} />, link: "/notifications" },
  { name: "Internship Video", icon: <Video size={20} />, link: "/internship-video" },
];

const FacultySidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <div className={`sidebar-dark ${isCollapsed ? "collapsed" : ""}`}>
      {!isCollapsed && (
        <div className="sidebar-title-container">
          <p className="sidebar-title">Student Dashboard</p>
        </div>
      )}

      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </div>

      <div className="sidebar-content">
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              title={isCollapsed ? item.name : ""}
              className={activeLink === item.link ? "active" : ""}
            >
              <a href={item.link} onClick={() => setActiveLink(item.link)}>
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FacultySidebar;
