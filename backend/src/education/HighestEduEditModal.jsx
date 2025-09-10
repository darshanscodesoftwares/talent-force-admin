import React, { useState } from "react";
import "./HighestEduEditModal.css";

export default function HighestEduEditModal({ isOpen, onClose, onSave, degree }) {
  const [newDegree, setNewDegree] = useState(degree.degree);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newDegree.trim()) return;

    onSave({
      ...degree,
      degree: newDegree,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="highestedu-modal-overlay">
      <div className="highestedu-modal-content">
        <h2>Edit Degree</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Degree Name"
            value={newDegree}
            onChange={(e) => setNewDegree(e.target.value)}
          />

          <div className="highestedu-modal-actions">
            <button type="submit" className="save-btn">
              Update
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
