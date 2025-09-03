import React, { useState } from "react";
import "./EducationAddModal.css";

export default function EducationAddModal({ isOpen, onClose, onSave }) {
  const [qualification, setQualification] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!qualification) return;
    onSave({
      qualification,
      postedOn: new Date().toLocaleDateString(),
      createdBy: "Admin",
    });
    setQualification("");
  };

  if (!isOpen) return null;

  return (
    <div className="education-modal-overlay">
      <div className="education-modal-content">
        <h3>Add Education Qualification</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
          <div className="education-modal-actions">
            <button type="submit" className="education-save-btn">
              Save
            </button>
            <button
              type="button"
              className="education-cancel-btn"
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
