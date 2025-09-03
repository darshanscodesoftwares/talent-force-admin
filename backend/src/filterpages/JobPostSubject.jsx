import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./jobPostSubject.css";
import { jobPostSubjectFilter as initialJobPostSubjectFilter } from "../data/contentData.js";
import JobPostSubjectAddModal from "./JobPostSubjectAddModal.jsx";

export default function JobPostSubjectFilter() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(initialJobPostSubjectFilter);
  const [hiddenRows, setHiddenRows] = useState([]); // track hidden rows

  // Add Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAdd = () => setIsAddModalOpen(true);

  const handleSaveAdd = (newItem) => {
    setFilters([...filters, { id: Date.now(), ...newItem }]);
    setIsAddModalOpen(false);
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filters.slice(startIndex, startIndex + itemsPerPage);

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
    <div className="jobpostsubjectfilter-container">
      <div className="jobpostsubjectfilter-rec">
        <div className="jobpostsubjectfilter-section">
          {/* Header */}
          <div className="jobpostsubjectfilter-title-button">
            <h2
              className="jobpostsubjectfilter-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> Job Post Subject Filters
            </h2>
            <button
              className="jobpostsubjectfilter-add-btn"
              onClick={handleAdd}
            >
              Add Subject
            </button>
          </div>

          {/* Table */}
          <div className="jobpostsubjectfilter-table-container">
            <table className="jobpostsubjectfilter-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((subject) => (
                  <tr
                    key={subject.id}
                    className={hiddenRows.includes(subject.id) ? "hidden-row" : ""}
                  >
                    <td>{subject.name}</td>
                    <td>{subject.postedOn}</td>
                    <td>{subject.createdBy}</td>
                    <td className="jobpostsubjectfilter-actions">
                      <button
                        className="jobpostsubjectfilter-btn view-btn"
                        onClick={() => toggleHideRow(subject.id)}
                      >
                        {hiddenRows.includes(subject.id) ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button>
                      <button
                        className="jobpostsubjectfilter-btn delete-btn"
                        onClick={() => handleDelete(subject.id)}
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
        <JobPostSubjectAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}
    </div>
  );
}
