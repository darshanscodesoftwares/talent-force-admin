import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./JobPostExpectedSalary.css";
import { jobPostExpectedSalary as initialJobPostExpectedSalary } from "../data/contentData.js";

export default function JobPostExpectedSalary() {
  const navigate = useNavigate();
  const [salaryList, setSalaryList] = useState(initialJobPostExpectedSalary);

  // Track hidden rows
  const [hiddenRows, setHiddenRows] = useState([]);

  const handleDelete = (id) => {
    setSalaryList(salaryList.filter((f) => f.id !== id));
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
    <div className="jobpostexpectedsalary-container">
      <div className="jobpostexpectedsalary-rec">
        <div className="jobpostexpectedsalary-section">
          <div className="title-button">
            <div className="jobpostexpectedsalary-header">
              <h2
                className="jobpostexpectedsalary-title"
                onClick={() => navigate("/dashboard/job-post-filter")}
              >
                <IoChevronBackOutline /> Job Post Expected Salary
              </h2>
            </div>
          </div>

          <div className="jobpostexpectedsalary-table-container">
            <table className="jobpostexpectedsalary-table">
              <thead>
                <tr>
                  <th>Expected Salary</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {salaryList.map((item) => (
                  <tr
                    key={item.id}
                    className={hiddenRows.includes(item.id) ? "hidden-row" : ""}
                  >
                    <td>{item.expectedSalary}</td>
                    <td>{item.postedOn}</td>
                    <td>{item.createdBy}</td>
                    <td className="jobpostexpectedsalary-actions">
                      <button
                        className="jobpostexpectedsalary-btn view-btn"
                        onClick={() => toggleHideRow(item.id)}
                      >
                        {hiddenRows.includes(item.id) ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <button
                        className="jobpostexpectedsalary-btn delete-btn"
                        onClick={() => handleDelete(item.id)}
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
