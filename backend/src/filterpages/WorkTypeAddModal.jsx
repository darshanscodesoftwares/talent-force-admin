import React, { useState } from "react";
import "./workTypeAddModal.css";

export default function WorkTypeAddModal({ isOpen, onClose, onSave }) {
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type) return;
    onSave({
      type,
      postedOn: new Date().toLocaleDateString(),
      createdBy: "Admin",
    });
    setType("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-worktype">
      <div className="modal-content-worktype">
        <h3>Add Work Type</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter work type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <div className="modal-actions-worktype">
            <button type="submit" className="save-btn-worktype">
              Save
            </button>
            <button
              type="button"
              className="cancel-btn-worktype"
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
