import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./jobPostEndDateFilter.css";
import { endDateFilter as initialEndDateFilter } from "../data/contentData.js";
import JobPostEndDateAddModal from "./JobPostEndDateAddModal.jsx";

export default function JobPostEndDateFilter() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(initialEndDateFilter);

  // Add Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Track hidden rows
  const [hiddenRows, setHiddenRows] = useState([]);

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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filters.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="jobpostenddatefilter-container">
      <div className="jobpostenddatefilter-rec">
        <div className="jobpostenddatefilter-section">
          {/* Header */}
          <div className="jobpostenddatefilter-title-button">
            <h2
              className="jobpostenddatefilter-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> Job Post End Date Filters
            </h2>
            <button
              className="jobpostenddatefilter-add-btn"
              onClick={handleAdd}
            >
              Add End Date
            </button>
          </div>

          {/* Table */}
          <div className="jobpostenddatefilter-table-container">
            <table className="jobpostenddatefilter-table">
              <thead>
                <tr>
                  <th>End Date</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((filter) => (
                  <tr
                    key={filter.id}
                    className={hiddenRows.includes(filter.id) ? "hidden-row" : ""}
                  >
                    <td>{filter.endDate}</td>
                    <td>{filter.postedOn}</td>
                    <td>{filter.createdBy}</td>
                    <td className="jobpostenddatefilter-actions">
                      <button
                        className="jobpostenddatefilter-btn view-btn"
                        onClick={() => toggleHideRow(filter.id)}
                      >
                        {hiddenRows.includes(filter.id) ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <button
                        className="jobpostenddatefilter-btn delete-btn"
                        onClick={() => handleDelete(filter.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
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
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <JobPostEndDateAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}
    </div>
  );
}
