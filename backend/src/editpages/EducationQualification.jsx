import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./EducationQualification.css";
import { jobPostEducationQualificationFilter as initialFilters } from "../data/contentData.js";
import EducationAddModal from "./EducationAddModal.jsx";

export default function JobPostEducationQualification() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(initialFilters);
  const [hiddenRows, setHiddenRows] = useState([]); // track hidden rows

  // Add Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAdd = () => setIsAddModalOpen(true);

  const handleSaveAdd = (newItem) => {
    setFilters([...filters, { id: Date.now(), ...newItem }]);
    setIsAddModalOpen(false);
  };

  const handleDelete = (id) => {
    setFilters(filters.filter((f) => f.id !== id));
    setHiddenRows(hiddenRows.filter((hid) => hid !== id)); // remove from hidden if deleted
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
    <div className="jobposteducation-container">
      <div className="jobposteducation-rec">
        <div className="jobposteducation-section">
          {/* Header */}
          <div className="jobposteducation-title-button">
            <h2
              className="jobposteducation-title"
              onClick={() => navigate("/dashboard/seeker-search-filter")}
            >
              <IoChevronBackOutline /> Job Post Education Qualification
            </h2>

            <button className="jobposteducation-add-btn" onClick={handleAdd}>
              Add Qualification
            </button>
          </div>

          {/* Table */}
          <div className="jobposteducation-table-container">
            <table className="jobposteducation-table">
              <thead>
                <tr>
                  <th>Qualification</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className={hiddenRows.includes(item.id) ? "hidden-row" : ""}
                  >
                    <td>{item.qualification}</td>
                    <td>{item.postedOn}</td>
                    <td>{item.createdBy}</td>
                    <td className="jobposteducation-actions">
                      <button
                        className="jobposteducation-btn view-btn"
                        onClick={() => toggleHideRow(item.id)}
                      >
                        {hiddenRows.includes(item.id) ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <button
                        className="jobposteducation-btn delete-btn"
                        onClick={() => handleDelete(item.id)}
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
        <EducationAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}
    </div>
  );
}
