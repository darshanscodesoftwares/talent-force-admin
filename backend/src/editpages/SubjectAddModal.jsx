import React, { useState } from "react";
import "./SubjectAddModal.css";

export default function SubjectAddModal({ isOpen, onClose, onSave }) {
  const [subject, setSubject] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) return;

    onSave({
      name: subject,
      postedOn: new Date().toLocaleDateString(),
      createdBy: "Admin",
    });

    setSubject("");
  };

  if (!isOpen) return null;

  return (
    <div className="subject-modal-overlay">
      <div className="subject-modal-content">
        <h3>Add Subject</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <div className="subject-modal-actions">
            <button type="submit" className="subject-save-btn">
              Save
            </button>
            <button
              type="button"
              className="subject-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
