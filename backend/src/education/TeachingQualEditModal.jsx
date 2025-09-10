import React, { useState } from "react";
import "./TeachingQualEditModal.css";

export default function TeachingQualificationEditModal({ isOpen, onClose, onSave, value }) {
  const [degree, setDegree] = useState(value?.degree || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!degree.trim()) return;

    onSave({
      ...value,
      degree,
      updatedOn: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="teachingqualif-modal-overlay">
      <div className="teachingqualif-modal-content">
        <h2>Edit Teaching Qualification</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Qualification"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />

          <div className="teachingqualif-modal-actions">
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
