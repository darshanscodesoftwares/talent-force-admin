import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./TeachingQualification.css";
import { teachingQualificationDegrees } from "../data/contentData.js";
import TeachingQualAddModal from "./TeachingQualAddModal.jsx";
import TeachingQualEditModal from "./TeachingQualEditModal.jsx";

export default function TeachingQualification() {
  const navigate = useNavigate();
  const [data, setData] = useState(teachingQualificationDegrees);
  const [hiddenRows, setHiddenRows] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editValue, setEditValue] = useState(null);

  // Save from Add Modal
  const handleSaveAdd = (newItem) => {
    setData((prev) => [...prev, { id: Date.now(), ...newItem }]);
    setIsAddModalOpen(false);
  };

  // Save from Edit Modal
  const handleSaveEdit = (updatedItem) => {
    setData((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setIsEditModalOpen(false);
  };

  // Delete
  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    setHiddenRows((prev) => prev.filter((hid) => hid !== id));
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  const toggleHideRow = (id) => {
    setHiddenRows((prev) =>
      prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
    );
  };

  return (
    <div className="teachingqualif-container">
      <div className="teachingqualif-rec">
        <div className="teachingqualif-section">
          {/* Header */}
          <div className="teachingqualif-title-button">
            <h2
              className="teachingqualif-title"
              onClick={() => navigate("/dashboard/education")}
            >
              <IoChevronBackOutline /> Teaching Qualification List
            </h2>
            <button
              className="teachingqualif-add-btn"
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Qualification
            </button>
          </div>

          {/* Table */}
          <div className="teachingqualif-table-container">
            <table className="teachingqualif-table">
              <thead>
                <tr>
                  <th>Degree</th>
                  <th>Posted on</th>
                  <th>Updated on</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr
                    key={item.id}
                    className={
                      hiddenRows.includes(item.id) ? "hidden-row" : ""
                    }
                  >
                    <td>{item.degree}</td>
                    <td>{item.postedOn}</td>
                    <td>{item.updatedOn}</td>
                    <td className="teachingqualif-actions">
                      <button
                        className="teachingqualif-btn view-btn"
                        onClick={() => toggleHideRow(item.id)}
                      >
                        {hiddenRows.includes(item.id) ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button>
                      <button
                        className="teachingqualif-btn edit-btn"
                        onClick={() => {
                          setEditValue(item);
                          setIsEditModalOpen(true);
                        }}
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        className="teachingqualif-btn delete-btn"
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
        <TeachingQualAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <TeachingQualEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
          value={editValue}
          setValue={setEditValue}
        />
      )}
    </div>
  );
}
