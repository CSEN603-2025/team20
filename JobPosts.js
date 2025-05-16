// JobPosts.jsx
import React, { useState } from "react";
//import "./JobPosts.css"; // optional for wrapper/grid tweaks

export default function JobPosts() {
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    duration: "",
    paid: false,
    salary: "",
    skills: "",
    description: "",
  });

  function resetForm() {
    setForm({
      duration: "",
      paid: false,
      salary: "",
      skills: "",
      description: "",
    });
    setEditing(null);
  }

  // CREATE or UPDATE
  const handleSubmit = () => {
    if (editing) {
      // UPDATE
      setPosts(posts.map(p =>
        p.id === editing.id ? { ...editing, ...form } : p
      ));
    } else {
      // CREATE
      setPosts([...posts, { id: Date.now(), ...form }]);
    }
    resetForm();
  };

  // DELETE
  const handleDelete = id =>
    setPosts(posts.filter(p => p.id !== id));

  // start editing a post
  const startEdit = post => {
    setEditing(post);
    setForm(post);
  };

  return (
    <div className="job-posts-wrapper">
      {/* Form Section */}
      <div className="job-posts-form">
        <h2>{editing ? "Edit" : "New"} Internship Post</h2>

        <label>
          Duration:
          <input
            value={form.duration}
            onChange={e => setForm({ ...form, duration: e.target.value })}
          />
        </label>

        <label>
          Paid:
          <input
            type="checkbox"
            checked={form.paid}
            onChange={e => setForm({ ...form, paid: e.target.checked })}
          />
        </label>

        {form.paid && (
          <label>
            Expected Salary:
            <input
              value={form.salary}
              onChange={e => setForm({ ...form, salary: e.target.value })}
            />
          </label>
        )}

        <label>
          Skills Required:
          <input
            value={form.skills}
            onChange={e => setForm({ ...form, skills: e.target.value })}
          />
        </label>

        <label>
          Description:
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </label>

        <button
          className="internship-link"
          onClick={handleSubmit}
        >
          {editing ? "Save Changes" : "Create Post"}
        </button>

        {editing && (
          <button
            className="dropdown-item"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Read / List Section */}
      <div className="job-posts-list">
        {posts.length === 0 && <p>No job posts yet.</p>}
        {posts.map(post => (
          <div key={post.id} className="projects-ui-card">
            <h3>
              {post.duration} Internship {post.paid ? "(Paid)" : "(Unpaid)"}
            </h3>
            {post.paid && (
              <p><strong>Salary:</strong> {post.salary}</p>
            )}
            <p><strong>Skills:</strong> {post.skills}</p>
            <p>{post.description}</p>

            {/* Update */}
            <button
              className="internship-link"
              onClick={() => startEdit(post)}
            >
              Edit
            </button>

            {/* Delete */}
            <button
              className="dropdown-item"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

