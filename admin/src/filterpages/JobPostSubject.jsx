import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./JobPostSubject.css";
import JobPostSubjectAddModal from "./JobPostSubjectAddModal.jsx";
import { SubjectContext } from "../UseContexts/RecruiterUseContext/JobPostContext/SubjectContext.jsx";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function JobPostSubjectFilter() {
  const navigate = useNavigate();
  const {
    subjects,
    loading,
    error,
    addSubject,
    deleteSubject,
    reorderSubjects,
  } = useContext(SubjectContext);

  const [hiddenRows, setHiddenRows] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // ✅ Save from Add Modal
  const handleSaveAdd = async (newItem) => {
    await addSubject(newItem);
    setIsAddModalOpen(false);
  };

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    try {
      await deleteSubject(id);
      setHiddenRows((prev) => prev.filter((hid) => hid !== id)); // remove if hidden
    } catch (err) {
      console.error("Error deleting subject:", err);
    }
  };

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil((subjects?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData =
    subjects?.slice(startIndex, startIndex + itemsPerPage) || [];

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

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index + startIndex;
    const destinationIndex = result.destination.index + startIndex;

    const items = Array.from(subjects);
    const [moved] = items.splice(sourceIndex, 1);
    items.splice(destinationIndex, 0, moved);

    reorderSubjects(
      items.map((item, index) => ({
        ...item,
        order_index: index + 1,
      }))
    );
  };

  return (
    <div className="jobpostsubjectfilter-container">
      <div className="jobpostsubjectfilter-rec">
        <div className="jobpostsubjectfilter-section">
          {/* 🔹 Header */}
          <div className="jobpostsubjectfilter-title-button">
            <h2
              className="jobpostsubjectfilter-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> Subject List
            </h2>
            <button
              className="jobpostsubjectfilter-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Subject
            </button>
          </div>

          {/* 🔹 Loader / Error */}
          {loading && <p className="loading">Loading subjects...</p>}
          {error && <p className="error">⚠️ {error}</p>}

          {/* 🔹 Table */}
          <div className="jobpostsubjectfilter-table-container">
            <table className="jobpostsubjectfilter-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Subject</th>
                  <th>Posted on</th>
                  <th>Updated on</th>
                  <th>Action</th>
                </tr>
              </thead>
              {/* <tbody>
                {paginatedData.map((subject) => (
                  <tr
                    key={subject.id}
                    className={
                      hiddenRows.includes(subject.id) ? "hidden-row" : ""
                    }
                  >
                    <td>{subject.category_name}</td>
                    <td>{formatDate(subject.created_at)}</td>
                    <td>{formatDate(subject.updated_at)}</td>
                    <td className="jobpostsubjectfilter-actions">
                      <button
                        className="jobpostsubjectfilter-btn delete-btn"
                        onClick={() => handleDelete(subject.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody> */}

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="subjects">
                  {(provided) => (
                    <tbody ref={provided.innerRef} {...provided.droppableProps}>
                      {paginatedData.map((subject, index) => (
                        <Draggable
                          key={subject.id}
                          draggableId={subject.id.toString()}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <tr
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={
                                hiddenRows.includes(subject.id)
                                  ? "hidden-row"
                                  : ""
                              }
                              style={{
                                ...provided.draggableProps.style,
                                background: snapshot.isDragging
                                  ? "#f0f9ff"
                                  : "white",
                              }}
                            >
                              {/* ✅ DRAG HANDLE COLUMN */}
                              <td
                                {...provided.dragHandleProps}
                                style={{ cursor: "grab" }}
                              >
                                {startIndex + index + 1}
                              </td>

                              {/* ✅ YOUR EXISTING COLUMNS — UNCHANGED */}
                              <td>{subject.category_name}</td>
                              <td>{formatDate(subject.created_at)}</td>
                              <td>{formatDate(subject.updated_at)}</td>

                              <td className="jobpostsubjectfilter-actions">
                                <button
                                  className="jobpostsubjectfilter-btn delete-btn"
                                  onClick={() => handleDelete(subject.id)}
                                >
                                  <AiOutlineDelete />
                                </button>
                              </td>
                            </tr>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </tbody>
                  )}
                </Droppable>
              </DragDropContext>
            </table>

            {/* 🔹 Empty State */}
            {!loading && subjects?.length === 0 && (
              <p className="empty">No subjects found.</p>
            )}

            {/* 🔹 Pagination */}
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

      {/* 🔹 Add Modal */}
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
