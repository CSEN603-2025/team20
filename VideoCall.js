import React, { useState, useEffect, useRef } from "react";
import FacultySidebar from "./FacultySidebar2"; // Import your existing sidebar
import "./VideoCall.css";

const dummyUsers = [
  { id: 1, name: "SCAD Officer", role: "officer", online: true },
  { id: 2, name: "Student A", role: "student", online: false },
];

const VideoCall = () => {
  // States
  const [, setAppointments] = useState([]); // all appointments requested
  const [myAppointments, setMyAppointments] = useState([]); // for current user
  const [user,] = useState({ id: 2, name: "Student A", role: "student" }); // current logged user
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [, setAppointmentStatus] = useState(""); // accepted/rejected/pending
  const [notifications, setNotifications] = useState([]);
  const [incomingCall, setIncomingCall] = useState(null); // incoming call appointment id
  const [inCall, setInCall] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micMuted, setMicMuted] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [otherUserOnline, setOtherUserOnline] = useState(false);

  // Refs for media streams (simulation)
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  // Simulate fetching appointments from server on load
  useEffect(() => {
    // Dummy appointments: some pending, some accepted
    const initialAppointments = [
      { id: 1, studentId: 2, officerId: 1, topic: "Career Guidance", status: "pending" },
      { id: 2, studentId: 2, officerId: 1, topic: "Report Clarifications", status: "accepted" },
    ];
    setAppointments(initialAppointments);

    // Filter my appointments (assuming logged user is Student A)
    setMyAppointments(initialAppointments.filter(app => app.studentId === user.id));

    // Set other user online status
    const otherUserId = user.role === "student" ? initialAppointments[0]?.officerId : initialAppointments[0]?.studentId;
    const other = dummyUsers.find(u => u.id === otherUserId);
    setOtherUserOnline(other?.online || false);
  }, [user]);

  // Notification helper
  const addNotification = (message) => {
    setNotifications((prev) => [...prev, { id: Date.now(), message }]);
  };
  useEffect(() => {
    let timer;
    if (inCall) {
      // Automatically leave after 30 seconds
      timer = setTimeout(() => {
        addNotification("SCAD Officer left the call");
        setInCall(false);
        setVideoEnabled(true);
        setMicMuted(false);
        setScreenSharing(false);
      }, 10000); // 30000 ms = 10 seconds
    }
    return () => clearTimeout(timer);
  }, [inCall]);
  
  // Request appointment handler (student)
  const requestAppointment = (topic) => {
    if (!topic) return;
    const newApp = {
      id: Date.now(),
      studentId: user.id,
      officerId: 1, // Assuming SCAD officer is id=1
      topic,
      status: "pending",
    };
    setAppointments((prev) => [...prev, newApp]);
    setMyAppointments((prev) => [...prev, newApp]);
    addNotification(`Appointment requested for "${topic}"`);
  };

  // Officer accepts or rejects appointment
  const handleAppointmentResponse = (appId, accept) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status: accept ? "accepted" : "rejected" } : app))
    );

    if (accept) {
      addNotification("Your appointment was accepted.");
      setAppointmentStatus("accepted");
    } else {
      addNotification("Your appointment was rejected.");
      setAppointmentStatus("rejected");
    }
  };

  // Check if user can call (only if appointment accepted)
  const canCall = (app) => app && app.status === "accepted";

  // Simulate incoming call (for demo)
  //const simulateIncomingCall = (app) => {
    //setIncomingCall(app);
  //};

  // Accept incoming call
  const acceptCall = () => {
    setInCall(true);
    setIncomingCall(null);
    addNotification("Call started");
  };

  // Reject incoming call
  const rejectCall = () => {
    setIncomingCall(null);
    addNotification("Call rejected");
  };

  // Start call (if user has accepted appointment)
  const startCall = (app) => {
    if (canCall(app)) {
      setSelectedAppointment(app);
      setInCall(true);
      addNotification("Call started");
    } else {
      alert("You must have an accepted appointment to start a call.");
    }
  };

  // Leave call
  const leaveCall = () => {
    setInCall(false);
    setSelectedAppointment(null);
    setVideoEnabled(true);
    setMicMuted(false);
    setScreenSharing(false);
    addNotification("You left the call");
  };

  // Toggle video
  const toggleVideo = () => setVideoEnabled((v) => !v);

  // Toggle mic
  const toggleMic = () => setMicMuted((m) => !m);

  // Toggle screen sharing (simulation)
  const toggleScreenShare = () => setScreenSharing((s) => !s);

  return (
    <div className="video-call-container">
      <FacultySidebar isCollapsed={false} toggleSidebar={() => {}} />

      <div className="main-content">
        <h2>Video Call Appointments</h2>

        {/* Notifications */}
        <div className="notifications">
          {notifications.map((note) => (
            <div key={note.id} className="notification">
              {note.message}
            </div>
          ))}
        </div>

        {/* Appointment Request Section (only for students) */}
        {user.role === "student" && (
          <div className="appointment-request">
            <h3>Request Appointment</h3>
            <select id="topicSelect">
              <option value="">Select topic</option>
              <option value="Career Guidance">Career Guidance</option>
              <option value="Report Clarifications">Report Clarifications</option>
            </select>
            <button
              onClick={() => {
                const topic = document.getElementById("topicSelect").value;
                requestAppointment(topic);
              }}
            >
              Request
            </button>
          </div>
        )}

        {/* Appointments List */}
        <div className="appointments-list">
          <h3>Your Appointments</h3>
          {myAppointments.length === 0 && <p>No appointments requested.</p>}
          <ul>
            {myAppointments.map((app) => (
              <li key={app.id} className={`appointment ${app.status}`}>
                <span>
                  Topic: <strong>{app.topic}</strong> | Status: {app.status}
                </span>

                {/* If user is officer, show accept/reject buttons */}
                {user.role === "officer" && app.status === "pending" && (
                  <span>
                    <button onClick={() => handleAppointmentResponse(app.id, true)}>Accept</button>
                    <button onClick={() => handleAppointmentResponse(app.id, false)}>Reject</button>
                  </span>
                )}

                {/* If appointment accepted and user is student, allow call */}
                {user.role === "student" && canCall(app) && (
                  <button onClick={() => startCall(app)}>Start Call</button>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Online status of other user */}
        {selectedAppointment && (
          <div className="online-status">
            Other user is {otherUserOnline ? <span className="online">Online</span> : <span className="offline">Offline</span>}
          </div>
        )}

        {/* Incoming Call Notification */}
        {incomingCall && (
          <div className="incoming-call">
            <p>Incoming call for appointment on "{incomingCall.topic}"</p>
            <button onClick={acceptCall}>Accept</button>
            <button onClick={rejectCall}>Reject</button>
          </div>
        )}

        {/* In Call UI */}
        {inCall && (
          <div className="call-controls">
            
            <div className="video-section">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                className={`video-box ${videoEnabled ? "" : "disabled"}`}
              ></video>
              <video
                ref={remoteVideoRef}
                autoPlay
                className={`video-box remote ${otherUserOnline ? "" : "disabled"}`}
              ></video>
            </div>

            <div className="controls">
              <button onClick={toggleVideo}>{videoEnabled ? "Disable Video" : "Enable Video"}</button>
              <button onClick={toggleMic}>{micMuted ? "Unmute Mic" : "Mute Mic"}</button>
              <button onClick={toggleScreenShare}>
                {screenSharing ? "Stop Screen Share" : "Share Screen"}
              </button>
              <button onClick={leaveCall}>Leave Call</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
