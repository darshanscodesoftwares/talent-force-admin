import React, { useState, useEffect } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Education.css";
import { educationFilter } from "../data/contentData.js";
import { EducationLoader } from "../Loader/Loader.jsx"

export default function Education() {
  const navigate = useNavigate();
    const [loading, setLoading] = useState(true)

  // Handle Edit Navigation
  const handleEdit = (filterName) => {
    if (filterName === "Highest Education") {
      navigate("/dashboard/highest-education");
    } else if (filterName === "Teaching Qualification") {
      navigate("/dashboard/teaching-qualification");
    }
  };

    // remove this before production
    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 400);
      return () => clearTimeout(timer);
    }, []);

  if (loading) return <EducationLoader />

  return (
    <div className="education-container">
      <div className="education-rec">
        <div className="education-section">
          {/* Header */}
          <div className="education-title-button">
            <h2
              className="education-title"
              onClick={() => navigate("/dashboard/job-post-filter")}
            >
              <IoChevronBackOutline /> Education List
            </h2>
          </div>

          {/* Table */}
          <div className="education-table-container">
            <table className="education-table">
              <thead>
                <tr>
                  <th>Filter</th>
                  <th>Posted on</th>
                  <th>Created by</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {educationFilter.map((item) => (
                  <tr key={item.id}>
                    <td>{item.filter}</td>
                    <td>{item.postedOn}</td>
                    <td>{item.createdBy}</td>
                    <td className="education-actions">
                      <button
                        className="education-btn edit-btn"
                        onClick={() => handleEdit(item.filter)}
                      >
                        <BiSolidEdit />
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
