import React, { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./SeekerSearchFilter.css";

// import centralized data
import { seekerSearchPages, seekerFilterRoutes } from "../data/contentData.js";

export default function SeekerSearchFilter() {
  const [filterList, setFilterList] = useState(seekerSearchPages);
  const navigate = useNavigate();

  const handleEdit = (filter) => {
    const path = seekerFilterRoutes[filter.specifications];
    if (path) navigate(path);
  };

  const handleDelete = (id) => {
    setFilterList(filterList.filter((f) => f.id !== id));
  };

  return (
    <div className="seekerfilter-container">
      <div className="seekerfilter-rec-seek">
        <div className="seekerfilter-section">
          <h2>All Seeker Filters List</h2>
          <div className="seekerfilter-table-container">
            <button className="seekerfilter-add-btn">Add Filter</button>
            <table className="seekerfilter-table">
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
                    <td className="seekerfilter-actions">
                      <button
                        className="seekerfilter-btn view-btn"
                        onClick={() => console.log("View", filter)}
                      >
                        <FaRegEye />
                      </button>

                      {filter.specifications !== "Location" && (
                        <button
                          className="seekerfilter-btn edit-btn"
                          onClick={() => handleEdit(filter)}
                        >
                          <BiSolidEdit />
                        </button>
                      )}

                      {/* <button
                        className="seekerfilter-btn delete-btn"
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
