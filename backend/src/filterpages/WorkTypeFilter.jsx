import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./WorkTypeFilter.css";
import { workTypeFilter as initialWorkTypeFilter } from "../data/contentData.js";
import WorkTypeAddModal from "./WorkTypeAddModal.jsx";

export default function WorkTypeFilter() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(initialWorkTypeFilter);
  const [hiddenRows, setHiddenRows] = useState([]);

  // Add Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAdd = () => setIsAddModalOpen(true);

  const handleSaveAdd = (newItem) => {
    setFilters([...filters, { id: Date.now(), ...newItem }]);
    setIsAddModalOpen(false);
  };

  const handleDelete = (id) => {
    setFilters(filters.filter((f) => f.id !== id));
    setHiddenRows(hiddenRows.filter((hid) => hid !== id));
  };

  const toggleHideRow = (id) => {
    if (hiddenRows.includes(id)) {
      setHiddenRows(hiddenRows.filter((hid) => hid !== id));
    } else {
      setHiddenRows([...hiddenRows, id]);
    }
  };

  return (
    <div className="worktypefilter-container">
      <div className="worktypefilter-rec">
        <div className="worktypefilter-section">
          <div className="worktypefilter-header">
            <h2
              className="worktypefilter-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> Job Post Work Type Filters
            </h2>
            <button className="worktypefilter-add-btn" onClick={handleAdd}>
              Add Work Type
            </button>
          </div>

          <div className="worktypefilter-table-container">
            <table className="worktypefilter-table">
              <thead>
                <tr>
                  <th>Work Type</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filters.map((filter) => (
                  <tr
                    key={filter.id}
                    className={hiddenRows.includes(filter.id) ? "hidden-row" : ""}
                  >
                    <td>{filter.type}</td>
                    <td>{filter.postedOn}</td>
                    <td>{filter.createdBy}</td>
                    <td className="worktypefilter-actions">
                      <button
                        className="worktypefilter-btn view-btn"
                        onClick={() => toggleHideRow(filter.id)}
                      >
                        {hiddenRows.includes(filter.id) ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <button
                        className="worktypefilter-btn delete-btn"
                        onClick={() => handleDelete(filter.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <WorkTypeAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}
    </div>
  );
}
