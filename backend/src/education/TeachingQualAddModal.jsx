import React, { useState } from "react";
import "./TeachingQualAddModal.css";

export default function TeachingQualificationAddModal({ isOpen, onClose, onSave }) {
  const [degree, setDegree] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!degree.trim()) return;

    const newItem = {
      degree,
      postedOn: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      updatedOn: "-",
    };

    onSave(newItem);
    setDegree("");
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
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
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
