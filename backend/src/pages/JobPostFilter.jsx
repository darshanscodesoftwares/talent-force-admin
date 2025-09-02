import React, { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import "./JobPostFilter.css";
import { jobPostFilter } from "../data/contentData.js";

export default function JobPostFilter() {
  const [filterList, setFilterList] = useState(jobPostFilter);

  const handleEdit = (filter) => {
    console.log("Edit", filter);
  };

  const handleDelete = (id) => {
    setFilterList(filterList.filter((f) => f.id !== id));
  };

  return (
    <div className="jobpostfilter-container">
      <div className="jobpostfilter-rec-seek">
        <div className="jobpostfilter-section">
          <h2>All Job Post Filters List</h2>
          <div className="jobpostfilter-table-container">
            <button className="jobpostfilter-add-btn">Add Filter</button>
            <table className="jobpostfilter-table">
              <thead>
                <tr>
                  {/* <th></th> */}
                  <th>Specification</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              
              <tbody>
                {filterList.map((filter) => (
                  <tr key={filter.id}>
                    {/* <td>
                      <input type="checkbox" />
                    </td> */}
                    <td>{filter.specifications}</td>
                    <td>{filter.postedOn}</td>
                    <td>{filter.createdBy}</td>
                    <td className="jobpostfilter-actions">
                      <button
                        className="jobpostfilter-btn view-btn"
                        onClick={() => console.log("View", filter)}
                      >
                        <FaRegEye />
                      </button>

                      {/* Only show Edit if not in restricted fields */}
                      {!["Job Role", "Pincode", "Number Of Opening"].includes(
                        filter.specifications
                      ) && (
                          <button
                            className="jobpostfilter-btn edit-btn"
                            onClick={() => handleEdit(filter)}
                          >
                            <BiSolidEdit />
                          </button>
                        )}

                      {/* <button
                        className="jobpostfilter-btn delete-btn"
                        onClick={() => handleDelete(filter.id)}
                      >
                        <AiOutlineDelete />
                      </button> */}
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
