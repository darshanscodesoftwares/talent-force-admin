import React, { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./EducationQualification.css";
import { educationQualificationFilter } from "../data/contentData";

export default function EducationQualification() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState(educationQualificationFilter);

  // --- Pagination logic ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // show 6 rows per page
  const totalPages = Math.ceil(filters.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filters.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (id) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  return (
    <div className="education-container">
      <div className="education-rec">
        <div className="education-section">
          <div className="title-button">
            <h2
              className="education-title"
              onClick={() => navigate("/dashboard/seeker-search-filter")}
            >
              <IoChevronBackOutline /> Education Qualification List
            </h2>
            {/* <button className="education-add-btn">+ Add Education</button> */}
          </div>

          <div className="education-table-container">
            <table className="education-table">
              <thead>
                <tr>
                  {/* <th></th> */}
                  <th>Education Qualification</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((filter) => (
                  <tr key={filter.id}>
                    {/* <td>
                      <input type="checkbox" />
                    </td> */}
                    <td>{filter.qualification}</td>
                    <td>{filter.postedOn}</td>
                    <td>{filter.createdBy}</td>
                    <td className="education-actions">
                      <button className="education-btn view-btn">
                        <FaRegEye />
                      </button>
                      {/* <button className="education-btn edit-btn">
                        <BiSolidEdit />
                      </button> */}
                      {/* <button
                        className="education-btn delete-btn"
                        onClick={() => handleDelete(filter.id)}
                      >
                        <AiOutlineDelete />
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
}
