import React, { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./JobPostExperience.css";
import { jobPostExperienceFilters as initialJobPostExperienceFilters } from "../data/contentData.js";

export default function JobPostExperienceFilter() {
  const navigate = useNavigate();
  const [experienceFilters, setExperienceFilters] = useState(initialJobPostExperienceFilters);

  // Track which rows are hidden
  const [hiddenRows, setHiddenRows] = useState([]);

  const handleDelete = (id) => {
    setExperienceFilters(experienceFilters.filter((f) => f.id !== id));
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
    <div className="jobpostexperiencefilter-container">
      <div className="jobpostexperiencefilter-rec">
        <div className="jobpostexperiencefilter-section">
          <div className="title-button">
            <div className="jobpostexperiencefilter-header">
              <h2
                className="jobpostexperiencefilter-title"
                onClick={() => navigate("/dashboard/job-post-filter")}
              >
                <IoChevronBackOutline /> Job Post Experience Filters
              </h2>
            </div>
          </div>

          <div className="jobpostexperiencefilter-table-container">
            <table className="jobpostexperiencefilter-table">
              <thead>
                <tr>
                  <th>Specification</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {experienceFilters.map((filter) => (
                  <tr
                    key={filter.id}
                    className={hiddenRows.includes(filter.id) ? "hidden-row" : ""}
                  >
                    <td>{filter.experience}</td>
                    <td>{filter.postedOn}</td>
                    <td>{filter.createdBy}</td>
                    <td className="jobpostexperiencefilter-actions">
                      <button
                        className="jobpostexperiencefilter-btn view-btn"
                        onClick={() => toggleHideRow(filter.id)}
                      >
                        {hiddenRows.includes(filter.id) ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <button
                        className="jobpostexperiencefilter-btn delete-btn"
                        onClick={() => handleDelete(filter.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
