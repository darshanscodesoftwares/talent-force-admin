import React, { useState } from "react";
import "./HighestEduAddModal.css";

export default function HighestEduAddModal({ isOpen, onClose, onSave }) {
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
    };

    onSave(newItem);
    setDegree("");
  };

  if (!isOpen) return null;

  return (
    <div className="highestedu-modal-overlay">
      <div className="highestedu-modal-content">
        <h2>Add New Degree</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Degree Name"
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
          />

          <div className="highestedu-modal-actions">
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
