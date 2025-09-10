import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./HighestEducation.css";
import HighestEduAddModal from "./HighestEduAddModal.jsx";
import HighestEduEditModal from "./HighestEduEditModal.jsx";
import { highestEducationDegrees as initialDegrees } from "../data/contentData.js";

export default function HighestEducation() {
  const navigate = useNavigate();

  const [degrees, setDegrees] = useState(initialDegrees);

  // Hidden Rows
  const [hiddenRows, setHiddenRows] = useState([]);

  // Add Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // ✅ Handle Add Save
  const handleSaveAdd = (newItem) => {
    setDegrees([
      ...degrees,
      { id: Date.now(), updatedOn: "-", ...newItem },
    ]);
    setIsAddModalOpen(false);
  };

  // ✅ Handle Edit Save
  const handleSaveEdit = (updatedItem) => {
    setDegrees(
      degrees.map((deg) =>
        deg.id === updatedItem.id
          ? {
            ...updatedItem, updatedOn: new Date().toLocaleDateString
              ("en-IN", { year: "numeric", month: "short", day: "numeric" })
          } : deg
      )
    );
    setIsEditModalOpen(false);
    setEditItem(null);
  };

  // ✅ Handle Delete
  const handleDelete = (id) => {
    setDegrees(degrees.filter((deg) => deg.id !== id));
    setHiddenRows((prev) => prev.filter((hid) => hid !== id));
  };

  // ✅ Toggle Hide Row
  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(degrees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = degrees.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="highestedu-container">
      <div className="highestedu-rec">
        <div className="highestedu-section">
          {/* Header */}
          <div className="highestedu-title-button">
            <h2
              className="highestedu-title"
              onClick={() => navigate("/dashboard/education")}
            >
              <IoChevronBackOutline /> Highest Education List
            </h2>
            <button
              className="highestedu-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Degree
            </button>
          </div>

          {/* Table */}
          <div className="highestedu-table-container">
            <table className="highestedu-table">
              <thead>
                <tr>
                  <th>Degree</th>
                  <th>Posted on</th>
                  <th>Updated on</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((deg) => (
                  <tr
                    key={deg.id}
                    className={hiddenRows.includes(deg.id) ? "hidden-row" : ""}
                  >
                    <td>{deg.degree}</td>
                    <td>{deg.postedOn}</td>
                    <td>{deg.updatedOn}</td>
                    <td className="highestedu-actions">
                      {/* 👁️ Toggle Visibility */}
                      <button
                        className="highestedu-btn view-btn"
                        onClick={() => toggleHideRow(deg.id)}
                      >
                        {hiddenRows.includes(deg.id) ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button>

                      {/* ✏️ Edit */}
                      <button
                        className="highestedu-btn edit-btn"
                        onClick={() => {
                          setEditItem(deg);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <BiSolidEdit />
                      </button>

                      {/* 🗑️ Delete */}
                      <button
                        className="highestedu-btn delete-btn"
                        onClick={() => handleDelete(deg.id)}
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
        <HighestEduAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editItem && (
        <HighestEduEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditItem(null);
          }}
          onSave={handleSaveEdit}
          degree={editItem}
        />
      )}
    </div>
  );
}
