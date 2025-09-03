// src/editpages/AddExperienceModal.jsx
import React, { useState } from "react";
import "./AddExperienceModal.css";

export default function AddExperienceModal({ isOpen, onClose, onSave }) {
  const [specification, setSpecification] = useState("");

  const handleSubmit = () => {
    if (specification.trim()) {
      onSave({ specification });
      setSpecification("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="addExperienceModal-overlay">
      <div className="addExperienceModal-content">
        <h3>Add Experience</h3>
        <div className="addExperienceModal-field">
          <label>Experience</label>
          <input
            type="text"
            value={specification}
            onChange={(e) => setSpecification(e.target.value)}
            placeholder="Enter experience"
          />
        </div>

        <div className="addExperienceModal-actions">
          <button className="addExperienceModal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="addExperienceModal-save-btn" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
