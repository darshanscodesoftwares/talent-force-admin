import React, { useState, useEffect } from "react";
import "./SeekerFilterModal.css";
import axios from "axios";

export default function SeekerFilterModal({ filters = {}, setFilters, onClose }) {
  const [specializations, setSpecializations] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Local state for modal selections
  const [localFilters, setLocalFilters] = useState({
    specialization: filters.specialization || "",
    pincode: filters.pincode || "",
    status: filters.status || "",
  });

  // 🔹 Fetch unique filter values
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://192.168.29.163:8000/api/admin-user-details"
        );
        const users = response.data?.users || [];

        const specs = [
          ...new Set(users.map(u => u.course?.specialization).filter(Boolean))
        ];
        const pins = [
          ...new Set(users.map(u => u.address?.pincode).filter(Boolean))
        ];
        const stats = [
          ...new Set(users.flatMap(u => u.status || []).filter(Boolean))
        ];

        setSpecializations(specs);
        setPincodes(pins);
        setStatuses(stats);
      } catch (err) {
        console.error("Error fetching users:", err);
        setSpecializations([]);
        setPincodes([]);
        setStatuses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // 🔹 Apply selections to parent state
  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  // 🔹 Clear selections
  const handleClear = () => {
    const emptyFilters = { specialization: "", pincode: "", status: "" };
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
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
            value={localFilters.specialization}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, specialization: e.target.value })
            }
          >
            <option value="">All</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              specializations.map((spec, i) => (
                <option key={i} value={spec}>{spec}</option>
              ))
            )}
          </select>
        </label>

        {/* Pincode */}
        <label>
          Pincode:
          <select
            value={localFilters.pincode}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, pincode: e.target.value })
            }
          >
            <option value="">All</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              pincodes.map((pin, i) => (
                <option key={i} value={pin}>{pin}</option>
              ))
            )}
          </select>
        </label>

        {/* Status */}
        <label>
          Status:
          <select
            value={localFilters.status}
            onChange={(e) =>
              setLocalFilters({ ...localFilters, status: e.target.value })
            }
          >
            <option value="">All</option>
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              statuses.map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))
            )}
          </select>
        </label>

        {/* Actions */}
        <div className="seeker-filter-modal-actions">
          <button className="seeker-filter-clear-btn" onClick={handleClear}>Clear</button>
          <button className="seeker-filter-apply-btn" onClick={handleApply}>Apply</button>
        </div>
      </div>
    </div>
  );
}
