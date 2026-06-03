import React, { useState, useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./JobPostSubject.css";
import JobPostJobRoleAddModal from "./JobPostJobRoleAddModal.jsx";
import { JobRoleContext } from "../UseContexts/RecruiterUseContext/JobPostContext/JobRoleContext.jsx";

export default function JobPostJobRoleFilter() {
  const navigate = useNavigate();
  const { jobRoles, loading, error, deleteJobRole } = useContext(JobRoleContext);

  const [hiddenRows, setHiddenRows] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Save from Add Modal
  const handleSaveAdd = async (newItem) => {
    setIsAddModalOpen(false);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteJobRole(id);
      setHiddenRows((prev) => prev.filter((hid) => hid !== id));
    } catch (err) {
      console.error("Error deleting job role:", err);
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil((jobRoles?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    jobRoles?.slice(startIndex, startIndex + itemsPerPage) || [];

  // Format Dates
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
    <div className="jobpostsubjectfilter-container">
      <div className="jobpostsubjectfilter-rec">
        <div className="jobpostsubjectfilter-section">
          {/* Header */}
          <div className="jobpostsubjectfilter-title-button">
            <h2
              className="jobpostsubjectfilter-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> Job Role List
            </h2>
            <button
              className="jobpostsubjectfilter-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Job Role
            </button>
          </div>

          {/* Loader / Error */}
          {loading && <p className="loading">Loading job roles...</p>}
          {error && <p className="error">{error}</p>}

          {/* Table */}
          <div className="jobpostsubjectfilter-table-container">
            <table className="jobpostsubjectfilter-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Job Role</th>
                  <th>Posted on</th>
                  <th>Updated on</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((role, index) => (
                  <tr
                    key={role.id}
                    className={
                      hiddenRows.includes(role.id) ? "hidden-row" : ""
                    }
                  >
                    <td>{startIndex + index + 1}</td>
                    <td>{role.title}</td>
                    <td>{formatDate(role.created_at)}</td>
                    <td>{formatDate(role.updated_at)}</td>
                    <td className="jobpostsubjectfilter-actions">
                      <button
                        className="jobpostsubjectfilter-btn delete-btn"
                        onClick={() => handleDelete(role.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {!loading && jobRoles?.length === 0 && (
              <p className="empty">No job roles found.</p>
            )}

            {/* Pagination */}
            {jobRoles?.length > itemsPerPage && (
              <div className="pagination">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    className={currentPage === index + 1 ? "active" : ""}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <JobPostJobRoleAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}
    </div>
  );
}
