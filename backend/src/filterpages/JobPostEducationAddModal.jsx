import React, { useState } from "react";
import "./jobPostEducationAddModal.css";

export default function JobPostEducationAddModal({ isOpen, onClose, onSave }) {
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
    <div className="modal-overlay-education">
      <div className="modal-content-education">
        <h3>Add Education Qualification</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter qualification"
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
          />
          <div className="modal-actions-education">
            <button type="submit" className="save-btn-education">
              Save
            </button>
            <button
              type="button"
              className="cancel-btn-education"
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
