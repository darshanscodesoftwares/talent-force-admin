import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Subject.css";
import SubjectAddModal from "./SubjectAddModal.jsx";
import { SubjectContext } from "../UseContexts/RecruiterUseContext/JobPostContext/SubjectContext.jsx";

export default function SubjectFilter() {
  const navigate = useNavigate();
  const { subjects, loading, error, addSubject, deleteSubject } =
    useContext(SubjectContext);

  const [hiddenRows, setHiddenRows] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // ✅ Save from Add Modal
  const handleSaveAdd = async (newItem) => {
    await addSubject(newItem); // calls API
    setIsAddModalOpen(false);
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteSubject(id); // calls API
      setHiddenRows((prev) => prev.filter((hid) => hid !== id));
    } catch (err) {
      console.error("Error deleting subject:", err);
    }
  };

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil((subjects?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = subjects?.slice(startIndex, startIndex + itemsPerPage) || [];

  // ✅ Toggle Hide Row
  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  // ✅ Format Dates
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
    <div className="subjectfilter-container">
      <div className="subjectfilter-rec">
        <div className="subjectfilter-section">
          {/* Header */}
          <div className="subjectfilter-title-button">
            <h2
              className="subjectfilter-title"
              onClick={() => navigate("/dashboard/seeker-search-filter")}
            >
              <IoChevronBackOutline /> Subject List
            </h2>
            <button
              className="subjectfilter-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Subject
            </button>
          </div>

          {/* Loader / Error */}
          {loading && <p>Loading subjects...</p>}
          {error && <p className="error">⚠️ {error}</p>}

          {/* Table */}
          <div className="subjectfilter-table-container">
            <table className="subjectfilter-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Posted on</th>
                  <th>Updated on</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((subject) => (
                  <tr
                    key={subject.id}
                    className={hiddenRows.includes(subject.id) ? "hidden-row" : ""}
                  >
                    <td>{subject.category_name}</td>
                    <td>{formatDate(subject.created_at)}</td>
                    <td>{formatDate(subject.updated_at)}</td>
                    <td className="subjectfilter-actions">
                      {/* <button
                        className="subjectfilter-btn view-btn"
                        onClick={() => toggleHideRow(subject.id)}
                      >
                        {hiddenRows.includes(subject.id) ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button> */}
                      <button
                        className="subjectfilter-btn delete-btn"
                        onClick={() => handleDelete(subject.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Empty State */}
            {!loading && subjects?.length === 0 && (
              <p className="empty">No subjects found.</p>
            )}

            {/* Pagination */}
            {subjects?.length > itemsPerPage && (
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
        <SubjectAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}
    </div>
  );
}
