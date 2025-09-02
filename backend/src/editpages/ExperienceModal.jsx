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
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit Experience</h3>
        <form onSubmit={handleSubmit}>
          <label>Experience</label>
          <input
            type="text"
            value={expValue}
            onChange={(e) => setExpValue(e.target.value)}
          />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceModal;
