import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./compartmentlevel.css";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoChevronBackOutline } from "react-icons/io5";
import { compartmentLevelFilter } from "../data/contentData.js";

const CompartmentLevel = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState(compartmentLevelFilter);

  // --- Pagination logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // show 9 rows per page
  const totalPages = Math.ceil(levels.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = levels.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    setLevels(levels.filter((item) => item.id !== id));
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
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <IoChevronBackOutline /> Compartment / Level List
            </h2>
            {/* <button className="compartment-add-btn">+ Add Compartment / Level</button> */}
          </div>

          {/* Table */}
          <div className="compartment-table-container">
            <table className="compartment-table">
              <thead>
                <tr>
                  {/* <th></th> */}
                  <th>Compartment / Level</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id}>
                    {/* <td>
                      <input type="checkbox" />
                    </td> */}
                    <td>{item.level}</td>
                    <td>{item.postedOn}</td>
                    <td>{item.createdBy}</td>
                    <td className="compartment-actions">
                      <button className="compartment-btn view-btn">
                        <FaEye />
                      </button>
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
