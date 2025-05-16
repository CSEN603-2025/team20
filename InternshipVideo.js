import React from 'react';


const InternshipVideo = () => {
  return (
    <div className="video-container">
      <video controls className="internship-video">
        <source src="internshipvod.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default InternshipVideo;
