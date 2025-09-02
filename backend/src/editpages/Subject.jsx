import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./subject.css";
import { subjectFilter } from "../data/contentData";

export default function Subject() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(subjectFilter);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filters.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filters.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  return (
    <div className="subject-container">
      <div className="subject-rec">
        <div className="subject-section">
          {/* Header */}
          <div className="title-button">
            <h2
              className="subject-title"
              onClick={() => navigate("/dashboard/seeker-search-filter")}
            >
              <IoChevronBackOutline /> Subject List
            </h2>
          </div>

          {/* Table */}
          <div className="subject-table-container">
            <table className="subject-table">
              <thead>
                <tr>
                  {/* <th></th> */}
                  <th>Subject</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((subject) => (
                  <tr key={subject.id}>
                    {/* <td>
                      <input type="checkbox" />
                    </td> */}
                    <td>{subject.name}</td>
                    <td>{subject.postedOn}</td>
                    <td>{subject.createdBy}</td>
                    <td className="subject-actions">
                      <button className="subject-btn view-btn">
                        <FaRegEye />
                      </button>
                      {/* <button
                        className="subject-btn delete-btn"
                        onClick={() => handleDelete(subject.id)}
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
    </div>
  );
}
