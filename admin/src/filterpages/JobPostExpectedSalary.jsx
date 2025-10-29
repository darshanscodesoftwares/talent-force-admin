import React, { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./JobPostExpectedSalary.css";
import { ExpectedSalaryContext } from "../UseContexts/SeekerUseContext/ExpectedSalaryContext";

export default function JobPostExpectedSalary() {
  const navigate = useNavigate();
  const { salaries, deleteSalary, loading } = useContext(ExpectedSalaryContext);

  // Track hidden rows
  const [hiddenRows, setHiddenRows] = useState([]);

  const toggleHideRow = (id) => {
    if (hiddenRows.includes(id)) {
      setHiddenRows(hiddenRows.filter((hid) => hid !== id));
    } else {
      setHiddenRows([...hiddenRows, id]);
    }
  };

  if (loading) {
    return <div className="jobpostexpectedsalary-loading">Loading...</div>;
  }

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
                <IoChevronBackOutline /> Expected Salary List
              </h2>
            </div>
          </div>

          <div className="jobpostexpectedsalary-table-container">
            <table className="jobpostexpectedsalary-table">
              <thead>
                <tr>
                  <th>Salary Range</th>
                  <th>Min Value</th>
                  <th>Max Value</th>
                  <th>Posted On</th>
                  <th>Created By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {salaries.map((item) => (
                  <tr
                    key={item.id}
                    className={hiddenRows.includes(item.id) ? "hidden-row" : ""}
                  >
                    <td>{item.salary}</td>
                    <td>{item.min_value}</td>
                    <td>{item.max_value}</td>
                    <td>{new Date(item.created_at).toLocaleDateString()}</td>
                    <td>{item.createdBy}</td>
                    <td className="jobpostexpectedsalary-actions">
                      <button
                        className="jobpostexpectedsalary-btn view-btn"
                        onClick={() => toggleHideRow(item.id)}
                      >
                        {hiddenRows.includes(item.id) ? (
                          <FaRegEyeSlash />
                        ) : (
                          <FaRegEye />
                        )}
                      </button>
                      <button
                        className="jobpostexpectedsalary-btn delete-btn"
                        onClick={() => deleteSalary(item.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {salaries.length === 0 && (
              <p className="jobpostexpectedsalary-empty">No expected salaries found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
