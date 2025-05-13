// HabibaSidebar.jsx
import React, { useState, useEffect } from "react";
import "./HabibaSideBar.css";
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
  { name: "Apply for Internship", icon: <FileText size={20} />, link: "/apply-internship" },
  { name: "Internship Reports", icon: <FileText size={20} />, link: "/internship-reports" },
  { name: "Profile", icon: <User size={20} />, link: "/profile" },
  { name: "Notifications", icon: <Bell size={20} />, link: "/notifications" },
  { name: "Internship Video", icon: <Video size={20} />, link: "/internship-video" },
];

const HabibaSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveLink(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

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
            <li
              key={link}
              title={isCollapsed ? name : ""}
              className={activeLink === link ? "active" : ""}
            >
              <a
                href={link}
                onClick={(e) => {
                  e.preventDefault();
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
  );
};

export default HabibaSidebar;
