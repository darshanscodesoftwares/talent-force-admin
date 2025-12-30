// src/pages/JobPostEducationAddModal.jsx
import React, { useState, useContext } from "react";
import "./JobPostEducationAddModal.css";
import { EducationQualificationContext } from "../UseContexts/RecruiterUseContext/JobPostContext/EducationQualificationContext";

export default function JobPostEducationAddModal({ isOpen, onClose }) {
  const [qualificationName, setQualificationName] = useState("");
  const [loading, setLoading] = useState(false);
  const { addQualification } = useContext(EducationQualificationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!qualificationName.trim()) return;

    setLoading(true);
    const newItem = {
      education_qualification_list: qualificationName,
    };

    try {
      await addQualification(newItem); // handled in context with toast + fetch
      setQualificationName(""); // reset input
      onClose(); // close modal
    } catch (err) {
      console.error("Error adding qualification:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay-education">
      <div className="modal-content-education">
        <h3>Add Education Qualification</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Qualification"
            value={qualificationName}
            onChange={(e) => setQualificationName(e.target.value)}
            disabled={loading}
          />

          <div className="modal-actions-education">
            <button type="submit" className="save-btn-education" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              className="cancel-btn-education"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
