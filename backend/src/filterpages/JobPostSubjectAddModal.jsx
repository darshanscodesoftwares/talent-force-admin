import React, { useState, useContext } from "react";
import "./jobPostSubjectAddModal.css";
import { SubjectContext } from "../UseContexts/RecruiterUseContext/JobPostContext/SubjectContext.jsx";

export default function JobPostSubjectAddModal({ isOpen, onClose }) {
  const [subject, setSubject] = useState("");
  const { addSubject } = useContext(SubjectContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim()) return;

    try {
      await addSubject({
        category_name: subject, // ✅ matches API field
      });
      setSubject("");
      onClose(); // close modal after success
    } catch (error) {
      console.error("Failed to add subject:", error);
    }
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
