import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./WorkTypeFilter.css";
import WorkTypeAddModal from "./WorkTypeAddModal.jsx";
import { WorkTypeContext } from "../UseContexts/RecruiterUseContext/JobPostContext/WorkTypeContext.jsx";

export default function WorkTypeFilter() {
  const navigate = useNavigate();
  const { workTypes, loading, addWorkType, deleteWorkType } =
    useContext(WorkTypeContext);

  const [hiddenRows, setHiddenRows] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // ✅ Save new WorkType
  const handleSaveAdd = async (newItem) => {
    await addWorkType(newItem);
    setIsAddModalOpen(false);
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteWorkType(id);
      setHiddenRows((prev) => prev.filter((hid) => hid !== id));
    } catch (err) {
      console.error("Error deleting work type:", err);
    }
  };

  // ✅ Toggle hide/show row
  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  // ✅ Format API date
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="worktypefilter-container">
      <div className="worktypefilter-rec">
        <div className="worktypefilter-section">
          {/* Header */}
          <div className="worktypefilter-header">
            <h2
              className="worktypefilter-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> Work Type List
            </h2>
            <button
              className="worktypefilter-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Work Type
            </button>
          </div>

          {/* Loader */}
          {loading && <p>Loading work types...</p>}

          {/* Table */}
          {!loading && (
            <div className="worktypefilter-table-container">
              <table className="worktypefilter-table">
                <thead>
                  <tr>
                    <th>Work Type</th>
                    <th>Posted on</th>
                    <th>Updated on</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {workTypes.map((workType) => (
                    <tr
                      key={workType.id}
                      className={
                        hiddenRows.includes(workType.id) ? "hidden-row" : ""
                      }
                    >
                      <td>{workType.job_type}</td>
                      <td>{formatDate(workType.created_at)}</td>
                      <td>{formatDate(workType.updated_at)}</td>
                      <td className="worktypefilter-actions">
                        {/* <button
                          className="worktypefilter-btn view-btn"
                          onClick={() => toggleHideRow(workType.id)}
                        >
                          {hiddenRows.includes(workType.id) ? (
                            <FaRegEyeSlash />
                          ) : (
                            <FaRegEye />
                          )}
                        </button> */}
                        <button
                          className="worktypefilter-btn delete-btn"
                          onClick={() => handleDelete(workType.id)}
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
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
