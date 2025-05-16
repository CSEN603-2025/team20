import React, { useState, useEffect, useRef } from "react";
import FacultySidebar from "./FacultySidebar2"; // Your existing sidebar component
import "./Workshops.css";import jsPDF from "jspdf";

const generatePdf = () => {
  const doc = new jsPDF();
  doc.text("Certificate of Completion", 20, 20);
  doc.text("This certifies that you completed the workshop!", 20, 30);
  doc.save("certificate.pdf");
};

function WorkshopCertificate({ hasCertificate }) {
  if (!hasCertificate) return null;

  return (
    <div className="certificate-section">
     <span>
  <span role="img" aria-label="party popper">🎉</span> Congratulations! You have earned a certificate.
</span>

      <button onClick={generatePdf}>Download Certificate</button>
    </div>
  );
}

const mockWorkshops = [
  {
    id: 1,
    title: "Resume Building Workshop",
    description: "Learn how to build a professional resume that stands out.",
    date: "2025-06-10",
    time: "10:00 AM",
    type: "live",
    registered: false,
    certificateAvailable: false,
    feedbackGiven: false,
    videoUrl: "",
  },
  {
    id: 2,
    title: "Interview Skills",
    description: "Master your interview techniques and gain confidence.",
    date: "2025-06-15",
    time: "3:00 PM",
    type: "pre-recorded",
    registered: true,
    certificateAvailable: true,
    feedbackGiven: false,
    videoUrl:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
  },
  {
    id: 3,
    title: "Networking Basics",
    description: "Learn how to build and maintain your professional network.",
    date: "2025-06-20",
    time: "1:00 PM",
    type: "live",
    registered: true,
    certificateAvailable: false,
    feedbackGiven: true,
    videoUrl: "",
  },
];
  
const Workshops = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [workshops, setWorkshops] = useState(mockWorkshops);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [isLiveModalOpen, setIsLiveModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [notifications, setNotifications] = useState([]);
  const liveVideoRef = useRef(null);
  const chatEndRef = useRef(null);
  const [notes, setNotes] = useState("");
  const [feedbackText, setFeedbackText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  // 🎯 Register for Workshop
  const registerForWorkshop = (id) => {
    setWorkshops((prev) =>
      prev.map((w) => (w.id === id ? { ...w, registered: true } : w))
    );
    // eslint-disable-next-line no-unused-vars
    setNotifications((prev) => [...prev, `You have registered for Workshop ${id}`]);
    alert("You have successfully registered for the workshop!");
  };

  // 🎯 Join Live Workshop
  const joinLiveWorkshop = (workshop) => {
    if (!workshop.registered) {
      alert("Please register first to join this workshop.");
      return;
    }
    setSelectedWorkshop(workshop);
    setIsLiveModalOpen(true);
  };

  // 🎯 Live Modal Video Controls
  const handlePlay = () => {
    if (liveVideoRef.current) liveVideoRef.current.play();
  };

  const handlePause = () => {
    if (liveVideoRef.current) liveVideoRef.current.pause();
  };

  const handleStop = () => {
    if (liveVideoRef.current) {
      liveVideoRef.current.pause();
      liveVideoRef.current.currentTime = 0;
    }
  };

  const closeModal = () => {
    setIsLiveModalOpen(false);
    handleStop();
  };

  // Send message
  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const userMessage = { sender: "You", text: newMessage };
    setChatMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
  };

  // 🎯 Submit Feedback
  const submitFeedback = () => {
    alert("Feedback submitted successfully!");
    setFeedbackText("");
  };
  const viewDetails = (workshop) => {
    alert(
      `Workshop Details:\n\n` +
      `Title: ${workshop.title}\n` +
      `Description: ${workshop.description}\n` +
      `Date: ${workshop.date}\n` +
      `Time: ${workshop.time}\n` +
      `Type: ${workshop.type.toUpperCase()}`
    );
  };
  useEffect(() => {
    if (selectedWorkshop?.type === "live" && isLiveModalOpen) {
      const interval = setInterval(() => {
        const randomMessages = [
          "Attendee 1: This session is amazing!",
          "Attendee 2: I love the insights being shared.",
          "Attendee 3: Can we get the slides after the session?",
          "Attendee 4: Great points mentioned here!",
          "Attendee 5: I am learning so much, thanks!",
        ];
        const randomMessage =
          randomMessages[Math.floor(Math.random() * randomMessages.length)];
        setChatMessages((prev) => [
          ...prev,
          { sender: "Attendee", text: randomMessage },
        ]);
        
        // ADD notification on new attendee message
        setNotifications((prev) => [
          ...prev,
          `New message from attendee in ${selectedWorkshop.title}`,
        ]);
      }, 5000);
  
      return () => clearInterval(interval);
    }
  }, [selectedWorkshop, isLiveModalOpen]);
  

  // You had a function `joinWorkshop` but only `joinLiveWorkshop` is used in the UI.
  // If you want to use joinWorkshop for prerecorded, you can add that logic here as well:
  const joinWorkshop = (workshop) => {
    if (!workshop.registered) {
      alert("Please register first to join this workshop.");
      return;
    }
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  // Fake incoming messages every 5 seconds (for live workshops only)
  useEffect(() => {
    if (selectedWorkshop?.type === "live" && isLiveModalOpen) {
      const interval = setInterval(() => {
        const randomMessages = [
          "Attendee 1: This session is amazing!",
          "Attendee 2: I love the insights being shared.",
          "Attendee 3: Can we get the slides after the session?",
          "Attendee 4: Great points mentioned here!",
          "Attendee 5: I am learning so much, thanks!",
        ];
        const randomMessage =
          randomMessages[Math.floor(Math.random() * randomMessages.length)];
        setChatMessages((prev) => [
          ...prev,
          { sender: "Attendee", text: randomMessage },
        ]);
      }, 5000);

      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [selectedWorkshop, isLiveModalOpen]);

  return (
    <div className="workshops-wrapper">
      <FacultySidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      <main className={`workshops-content ${isSidebarCollapsed ? "collapsed-sidebar" : ""}`}>
        <header>
          <h1>Upcoming Online Career Workshops</h1>
        </header>

        <section className="workshop-list">
          <h2>All Workshops</h2>
          <ul>
            
            {workshops.map((w) => (
              <li key={w.id} className="workshop-item">
                <li key={w.id} className="workshop-item">
  <div className="workshop-title">{w.title}</div>
  <div className="workshop-meta">
    <span>{w.date}</span> at <span>{w.time}</span> |{" "}
    <span className="workshop-type">{w.type.toUpperCase()}</span>
  </div>
  <button disabled={w.registered} onClick={() => registerForWorkshop(w.id)}>
    {w.registered ? "Registered" : "Register"}
  </button>
  <button onClick={() => viewDetails(w)}>View Details</button> {/* NEW */}
  {w.type === "live" ? (
    <button onClick={() => joinLiveWorkshop(w)}>Join Live Workshop</button>
  ) : (
    <button onClick={() => joinWorkshop(w)}>Watch Recording</button>
  )}
</li>
                
               
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* 🚀 LIVE WORKSHOP MODAL */}
      {isLiveModalOpen && (
        <div className="live-modal-overlay">
          <div className="live-modal-content">
            <h2>Live Workshop: {selectedWorkshop?.title}</h2>
            <video
              ref={liveVideoRef}
              controls
              style={{ width: "100%" }}
              src={selectedWorkshop?.videoUrl}
            />
            
            <div className="modal-controls">
              <button onClick={handlePlay}>Play</button>
              <button onClick={handlePause}>Pause</button>
              <button onClick={handleStop}>Stop</button>
              <button onClick={closeModal}>Close</button>
            </div>
            <textarea
              placeholder="Take notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <textarea
              placeholder="Write your feedback here..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />
            <button onClick={submitFeedback}>Submit Feedback</button>

            {/* CHAT SECTION */}
            {selectedWorkshop?.type === "live" && (
              <div className="chat-section">
                <div className="chat-messages">
                  {chatMessages.map((msg, index) => (
                    <p key={index}>
                      <strong>{msg.sender}: </strong>
                      {msg.text}
                    </p>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                <div className="chat-input">
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                  />
                  <button onClick={sendMessage}>Send</button>
                </div>
              </div>
            )}
           
      {/* CHAT SECTION */}
      {selectedWorkshop?.type === "live" && (
        <div className="chat-section">
          {/* chat messages and input */}
        </div>
      )}
        <WorkshopCertificate hasCertificate={selectedWorkshop?.certificateAvailable} />
          </div>
        </div>
      )}

     {/* PRE-RECORDED VIDEO MODAL */}
{isModalOpen && selectedWorkshop?.type === "pre-recorded" && (
  <div className="live-modal-overlay">
    <div className="live-modal-content">
      <h2>Workshop Recording: {selectedWorkshop?.title}</h2>
      <video
        controls
        style={{ width: "100%" }}
        src={selectedWorkshop?.videoUrl}
      />
      <WorkshopCertificate hasCertificate={selectedWorkshop?.certificateAvailable} />
      <button onClick={() => setIsModalOpen(false)}>Close</button>
    </div>
  </div>
)}

    </div>
  );
};

export default Workshops;
