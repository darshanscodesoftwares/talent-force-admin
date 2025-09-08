import React, { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import "./ExperienceFilter.css";
import { experienceFilters as initialExperienceFilters } from "../data/contentData.js";
import ExperienceModal from "../editpages/ExperienceModal.jsx";
import AddExperienceModal from "../editpages/AddExperienceModal.jsx";

export default function ExperienceFilter() {
  const navigate = useNavigate();
  const [experienceFilters, setExperienceFilters] = useState(initialExperienceFilters);
  const [hiddenRows, setHiddenRows] = useState([]); // track hidden rows

  // Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  // Add Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleDelete = (id) => {
    setExperienceFilters(experienceFilters.filter((f) => f.id !== id));
  };

  const handleEdit = (exp) => {
    setSelectedExp(exp);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveEdit = (updatedExp) => {
    setExperienceFilters((prev) =>
      prev.map((f) => (f.id === updatedExp.id ? updatedExp : f))
    );
    setIsEditModalOpen(false);
    setSelectedExp(null);
  };

  const handleSaveAdd = (newExp) => {
    const newRecord = {
      ...newExp,
      id: Date.now(),
      postedOn: new Date().toISOString().split("T")[0],
      createdBy: "Admin",
    };
    setExperienceFilters((prev) => [...prev, newRecord]);
    setIsAddModalOpen(false);
  };

  const toggleHideRow = (id) => {
    if (hiddenRows.includes(id)) {
      setHiddenRows(hiddenRows.filter((hid) => hid !== id));
    } else {
      setHiddenRows([...hiddenRows, id]);
    }
  };

  return (
    <div className="experiencefilter-container">
      <div className="experiencefilter-rec">
        <div className="experiencefilter-section">
          <div className="title-button">
            <div className="experiencefilter-header">
              <h2
                className="experiencefilter-title"
                onClick={() => navigate("/dashboard/seeker-search-filter")}
              >
                <IoChevronBackOutline /> Experience List
              </h2>
            </div>
            <button className="experiencefilter-add-btn" onClick={handleAdd}>
              Add Experience
            </button>
          </div>

          <div className="experiencefilter-table-container">
            <table className="experiencefilter-table">
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
                    <td>{filter.specification}</td>
                    <td>{filter.postedOn}</td>
                    <td>{filter.createdBy}</td>
                    <td className="experiencefilter-actions">
                      <button
                        className="experiencefilter-btn view-btn"
                        onClick={() => toggleHideRow(filter.id)}
                      >
                        {hiddenRows.includes(filter.id) ? <FaRegEyeSlash /> : <FaRegEye />}
                      </button>
                      <button
                        className="experiencefilter-btn edit-btn"
                        onClick={() => handleEdit(filter)}
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

      {isAddModalOpen && (
        <AddExperienceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}

      {isEditModalOpen && (
        <ExperienceModal
          experience={selectedExp}
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}
