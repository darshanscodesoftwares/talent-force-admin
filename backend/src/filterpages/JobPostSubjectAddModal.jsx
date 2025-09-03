import React, { useState } from "react";
import "./jobPostSubjectAddModal.css";

export default function JobPostSubjectAddModal({ isOpen, onClose, onSave }) {
  const [subject, setSubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;
    onSave({
      name: subject,
      postedOn: new Date().toLocaleDateString(),
      createdBy: "Admin",
    });
    setSubject("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add Job Post Subject</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
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
