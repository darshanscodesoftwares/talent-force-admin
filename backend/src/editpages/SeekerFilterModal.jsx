import React, { useState, useEffect } from "react";
import "./SeekerFilterModal.css";
import axios from "axios";

export default function SeekerFilterModal({ filters = {}, setFilters, onClose }) {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Ensure filters always has defaults (avoids undefined errors)
  const safeFilters = {
    specialization: filters.specialization || "",
    pincode: filters.pincode || "",
    status: filters.status || "",
  };

  // 🔹 Fetch specializations from API
  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        setLoading(true);
        const token =
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjYzODQ1ODIwNjAiLCJpYXQiOjE3NTQ1NjYwNDgsImV4cCI6MTc4NjEwMjA0OH0.3iSWyeNJxfoYxU9QsQIuBIjd9xbO0OaE-CoWhbtPM4s"; // replace with dynamic storage later

        const response = await axios.get(
          "http://192.168.29.163:8000/api/job-categories",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data?.result?.length) {
          const uniqueSpecs = response.data.result.map(
            (cat) => cat.category_name
          );
          setSpecializations(uniqueSpecs);
        } else {
          setSpecializations([]);
        }
      } catch (err) {
        console.error("Error fetching specializations:", err);
        setSpecializations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  // 🔹 Handle Apply
  const handleApply = () => {
    // Later: you can call API with safeFilters here before closing
    onClose();
  };

  // 🔹 Handle Clear
  const handleClear = () => {
    setFilters({ specialization: "", pincode: "", status: "" });
  };

  return (
    <div className="seeker-filter-modal-overlay">
      <div className="seeker-filter-modal-content">
        <div className="seeker-filter-modal-header">
          <h2>Advanced Search Filters</h2>
          <button className="seeker-filter-close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Specialization */}
        <label>
          Specialization:
          <select
            value={safeFilters.specialization}
            onChange={(e) =>
              setFilters({ ...safeFilters, specialization: e.target.value })
            }
          >
            <option value="">All</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              specializations.map((spec, i) => (
                <option key={i} value={spec}>
                  {spec}
                </option>
              ))
            )}
          </select>
        </label>

        {/* Pincode */}
        <label>
          Pincode:
          <input
            type="text"
            value={safeFilters.pincode}
            maxLength={6}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              setFilters({ ...safeFilters, pincode: val });
            }}
            placeholder="e.g., 608502"
          />
        </label>

        {/* Status */}
        <label>
          Status:
          <select
            value={safeFilters.status}
            onChange={(e) =>
              setFilters({ ...safeFilters, status: e.target.value })
            }
          >
            <option value="">All</option>
            <option value="Seeking">Seeking</option>
            <option value="Not Seeking">Not Seeking</option>
          </select>
        </label>

        {/* Actions */}
        <div className="seeker-filter-modal-actions">
          <button className="seeker-filter-clear-btn" onClick={handleClear}>
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

// specialization dropdown can list all specialization data from 
// users list after new alterations to SeekerProfile API (Users-list of registers API)