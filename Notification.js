import React, { useState, useEffect } from "react";
import FacultySidebar from "./FacultySidebar";
import "./Notification.css";

const Notifications = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Sample dynamic notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New internship cycle begins next month!",
      type: "info",
      timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
    },
    {
      id: 2,
      message: "Your internship report status has been updated to 'Flagged'.",
      type: "alert",
      timestamp: new Date(Date.now() - 3600000 * 5), // 5 hours ago
    },
    {
      id: 3,
      message: "You can appeal the decision for your internship report.",
      type: "action",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    },
  ]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Utility to format time ago nicely
  const timeAgo = (date) => {
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // seconds
    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  // Example useEffect to simulate adding notifications dynamically
  useEffect(() => {
    // Simulate a notification for internship cycle starting soon (3 days from now)
    const checkCycleStartNotification = () => {
      const now = new Date();
      const cycleStart = new Date();
      cycleStart.setDate(now.getDate() + 3);
      const daysLeft = Math.ceil((cycleStart - now) / (1000 * 60 * 60 * 24));
      if (!notifications.find((n) => n.message.includes("internship cycle starts in"))) {
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now(),
            message: `Internship cycle starts in ${daysLeft} days! Prepare yourself.`,
            type: "info",
            timestamp: new Date(),
          },
        ]);
      }
    };

    // Just call once on mount, you can customize this for real notifications
    checkCycleStartNotification();
  }, []); // empty deps so it runs once

  return (
    <div className="notifications-wrapper" style={{ display: "flex" }}>
      <FacultySidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
      <div
        className={`notifications-content ${isSidebarCollapsed ? "collapsed" : ""}`}
        style={{
          padding: "20px",
          flexGrow: 1,
          backgroundColor: "#fefefe",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px",
          maxWidth: "800px",
          margin: "20px auto",
        }}
      >
        
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Notifications</h2>

        {notifications.length > 0 ? (
          <div className="notification-list" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {notifications
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((note) => (
                <div
                  key={note.id}
                  className={`notification-item ${note.type}`}
                  style={{
                    padding: "15px 20px",
                    borderRadius: "6px",
                    backgroundColor:
                      note.type === "info"
                        ? "#e7f3fe"
                        : note.type === "alert"
                        ? "#fdecea"
                        : "#e8f5e9",
                    borderLeft:
                      note.type === "info"
                        ? "5px solid #2196f3"
                        : note.type === "alert"
                        ? "5px solid #f44336"
                        : "5px solid #4caf50",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    color: "#333",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "1rem",
                  }}
                >
                  <div style={{ flex: 1 }}>{note.message}</div>
                  <div
                    style={{
                      marginLeft: "20px",
                      fontSize: "0.8rem",
                      color: "#666",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {timeAgo(note.timestamp)}
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <p className="no-notifications" style={{ color: "#777", fontStyle: "italic" }}>
            No notifications available.
          </p>
        )}

        <button
          onClick={clearNotifications}
          className="clear-btn"
          style={{
            marginTop: "25px",
            padding: "10px 20px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: "#f44336",
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
            boxShadow: "0 2px 6px rgba(244, 67, 54, 0.5)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d32f2f")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f44336")}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Notifications;
