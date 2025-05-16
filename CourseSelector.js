import React from "react";
import "./CourseSelector.css";

const CourseSelector = ({ selectedCourses, courses, onChange }) => {
  const handleCourseSelection = (course) => {
    if (selectedCourses.includes(course)) {
      onChange(selectedCourses.filter((c) => c !== course));
    } else {
      onChange([...selectedCourses, course]);
    }
  };

  return (
    <div className="course-selector">
      <h4>Select Courses that helped you:</h4>
      <div className="course-list">
        {courses.map((course) => (
          <label key={course} className="course-item">
            <input
              type="checkbox"
              checked={selectedCourses.includes(course)}
              onChange={() => handleCourseSelection(course)}
            />
            {course}
          </label>
        ))}
      </div>
    </div>
  );
};

export default CourseSelector;
