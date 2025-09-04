import React from "react";
import "./SeekerFilterModal.css";
import { seekerData } from "../data/contentData.js";

export default function SeekerFilterModal({ filters, setFilters, onClose }) {
  // 🔹 Extract unique specialization values
  const specializations = [...new Set(seekerData.map((s) => s.Specialization))];

  // Handle Apply
  const handleApply = () => {
    onClose(); // close modal after applying filters
  };

  return (
    <div className="seeker-filter-modal-overlay">
      <div className="seeker-filter-modal-content">
        <div className="seeker-filter-modal-header">
          <h2>Advanced Search Filters</h2>
          <button className="seeker-filter-close-btn" onClick={onClose}>✖</button>
        </div>

        {/* Specialization */}
        <label>
          Specialization:
          <select
            value={filters.specialization}
            onChange={(e) =>
              setFilters({ ...filters, specialization: e.target.value })
            }
          >
            <option value="">All</option>
            {specializations.map((spec, i) => (
              <option key={i} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </label>

        {/* Pincode */}
        <label>
          Pincode:
          <input
            type="text"
            value={filters.pincode}
            maxLength={6} // remove extra space
            onChange={(e) => {
              // Only digits
              const val = e.target.value.replace(/\D/g, "");
              setFilters({ ...filters, pincode: val });
            }}
            placeholder="e.g., 608502"
          />
        </label>

        {/* Status */}
        <label>
          Status:
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All</option>
            <option value="Seeking">Seeking</option>
            <option value="Not Seeking">Not Seeking</option>
          </select>
        </label>

        {/* Actions */}
        <div className="seeker-filter-modal-actions">
          <button
            className="seeker-filter-clear-btn"
            onClick={() => setFilters({ specialization: "", pincode: "", status: "" })}
          >
            Clear
          </button>
          <button className="seeker-filter-apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
