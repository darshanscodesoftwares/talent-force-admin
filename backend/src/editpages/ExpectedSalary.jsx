import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./expectedSalary.css";
import { expectedSalaryFilter } from "../data/contentData";
import AddSalaryModal from "./AddSalaryModal";
import EditSalaryModal from "./EditSalaryModal";

export default function ExpectedSalary() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(expectedSalaryFilter);
  const [hiddenRows, setHiddenRows] = useState([]); // track hidden rows

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filters.slice(startIndex, startIndex + itemsPerPage);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newRange, setNewRange] = useState("");
  const [editId, setEditId] = useState(null);

  // Handlers
  const handleAddSalary = () => {
    if (!newRange.trim()) return;
    const newSalary = {
      id: filters.length + 1,
      range: newRange,
      postedOn: new Date().toLocaleDateString(),
      createdBy: "Admin",
    };
    setFilters([...filters, newSalary]);
    setNewRange("");
    setShowAddModal(false);
  };

  const handleEditSalary = (id, currentRange) => {
    setEditId(id);
    setNewRange(currentRange);
    setShowEditModal(true);
  };

  const handleUpdateSalary = () => {
    setFilters(
      filters.map((f) => (f.id === editId ? { ...f, range: newRange } : f))
    );
    setShowEditModal(false);
    setNewRange("");
    setEditId(null);
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
    <div className="expectedSalary-container">
      <div className="expectedSalary-rec">
        <div className="expectedSalary-section">
          {/* Header */}
          <div className="title-button">
            <h2
              className="expectedSalary-title"
              onClick={() => navigate("/dashboard/seeker-search-filter")}
            >
              <IoChevronBackOutline /> Expected Salary List
            </h2>
            <button
              className="expectedSalary-add-btn"
              onClick={() => setShowAddModal(true)}
            >
              Add Salary Range
            </button>
          </div>

          {/* Table */}
          <div className="expectedSalary-table-container">
            <table className="expectedSalary-table">
              <thead>
                <tr>
                  <th>Salary Range</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((salary) => (
                  <tr
                    key={salary.id}
                    className={hiddenRows.includes(salary.id) ? "hidden-row" : ""}
                  >
                    <td>{salary.range}</td>
                    <td>{salary.postedOn}</td>
                    <td>{salary.createdBy}</td>
                    <td className="expectedSalary-actions">
                      <button
                        className="expectedSalary-btn view-btn"
                        onClick={() => toggleHideRow(salary.id)}
                      >
                        {hiddenRows.includes(salary.id) ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button>
                      <button
                        className="expectedSalary-btn edit-btn"
                        onClick={() => handleEditSalary(salary.id, salary.range)}
                      >
                        <BiSolidEdit />
                      </button>
                      {/* <button
                        className="expectedSalary-btn delete-btn"
                        onClick={() => handleDelete(salary.id)}
                      >
                        <AiOutlineDelete />
                      </button> */}
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

      {/* Modals */}
      {showAddModal && (
        <AddSalaryModal
          onClose={() => setShowAddModal(false)}
          onCreate={handleAddSalary}
          newRange={newRange}
          setNewRange={setNewRange}
        />
      )}
      {showEditModal && (
        <EditSalaryModal
          onClose={() => setShowEditModal(false)}
          onSave={handleUpdateSalary}
          newRange={newRange}
          setNewRange={setNewRange}
        />
      )}
    </div>
  );
}
