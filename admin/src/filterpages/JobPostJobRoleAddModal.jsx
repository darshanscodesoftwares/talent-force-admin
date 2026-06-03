import React, { useState, useContext } from "react";
import "./JobPostSubjectAddModal.css";
import { JobRoleContext } from "../UseContexts/RecruiterUseContext/JobPostContext/JobRoleContext.jsx";

export default function JobPostJobRoleAddModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const { addJobRole } = useContext(JobRoleContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await addJobRole({ title });
      setTitle("");
      onClose();
    } catch (error) {
      console.error("Failed to add job role:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Job Role</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter job role"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="modal-actions">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
