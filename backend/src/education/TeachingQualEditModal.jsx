import React, { useState, useEffect } from "react";
import "./TeachingQualEditModal.css";

export default function TeachingQualEditModal({ isOpen, onClose, onSave, value }) {
  const [qualificationName, setQualificationName] = useState("");

  // ✅ Populate input when modal opens
  useEffect(() => {
    if (value) {
      setQualificationName(value.qualification_name || "");
    }
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!qualificationName.trim()) return;

    // ✅ Always preserve the ID when saving
    onSave({
      id: value.id, // explicitly keep ID
      qualification_name: qualificationName,
    });

    onClose(); // close modal after save
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
            value={qualificationName}
            onChange={(e) => setQualificationName(e.target.value)}
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
