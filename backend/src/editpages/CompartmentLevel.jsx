import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./compartmentlevel.css";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoChevronBackOutline } from "react-icons/io5";
import { compartmentLevelFilter } from "../data/contentData.js";

const CompartmentLevel = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState(compartmentLevelFilter);
  const [hiddenRows, setHiddenRows] = useState([]); // track hidden rows

  // --- Pagination logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(levels.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = levels.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    setLevels(levels.filter((item) => item.id !== id));
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
    <div className="compartment-container">
      <div className="compartment-rec">
        <div className="compartment-section">
          {/* Header */}
          <div className="title-button">
            <h2
              className="compartment-title back-title"
              onClick={() => navigate("/dashboard/seeker-search-filter")}
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <IoChevronBackOutline /> Compartment / Level List
            </h2>
          </div>

          {/* Table */}
          <div className="compartment-table-container">
            <table className="compartment-table">
              <thead>
                <tr>
                  <th>Compartment / Level</th>
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
                    <td>{item.level}</td>
                    <td>{item.postedOn}</td>
                    <td>{item.createdBy}</td>
                    <td className="compartment-actions">
                      <button
                        className="compartment-btn view-btn"
                        onClick={() => toggleHideRow(item.id)}
                      >
                        {hiddenRows.includes(item.id) ? <FaRegEyeSlash /> : <FaEye />}
                      </button>
                      {/* Optional Delete */}
                      {/* <button
                        className="compartment-btn delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        <RiDeleteBin6Line />
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination controls */}
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
    </div>
  );
};

export default CompartmentLevel;
