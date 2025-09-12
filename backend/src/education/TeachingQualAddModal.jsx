import React, { useState } from "react";
import "./TeachingQualAddModal.css";

export default function TeachingQualAddModal({ isOpen, onClose, onSave }) {
  const [qualificationName, setQualificationName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!qualificationName.trim()) return;

    // 👇 match API schema
    const newItem = {
      qualification_name: qualificationName,
    };

    onSave(newItem); // calls addTeachingQual from context
    setQualificationName(""); // reset
    onClose(); // close modal
  };

  if (!isOpen) return null;

  return (
    <div className="teachingqualif-modal-overlay">
      <div className="teachingqualif-modal-content">
        <h2>Add Teaching Qualification</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Qualification"
            value={qualificationName}
            onChange={(e) => setQualificationName(e.target.value)}
          />

          <div className="teachingqualif-modal-actions">
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
