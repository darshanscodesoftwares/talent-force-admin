import React, { useState } from "react";
import "./ExperienceModal.css";

const ExperienceModal = ({ isOpen, onClose, onSave, experience }) => {
  const [expValue, setExpValue] = useState(experience?.specification || "");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...experience, specification: expValue });
  };

  return (
    <div className="experienceModal-overlay">
      <div className="experienceModal-content">
        <h3>Edit Experience</h3>
        <form onSubmit={handleSubmit}>
          <label>Experience</label>
          <input
            type="text"
            value={expValue}
            onChange={(e) => setExpValue(e.target.value)}
          />

          <div className="experienceModal-actions">
            <button type="button" className="experienceModal-cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="experienceModal-save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceModal;
