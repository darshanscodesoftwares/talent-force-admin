import { IoIosPeople } from "react-icons/io";
import { FaUserClock } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import "./SeekerProfile.css";
import { useState } from "react";
import { seekerData } from "../data/contentData.js";
import { useNavigate } from "react-router-dom";

export default function SeekerProfile() {
  const [seekers] = useState(seekerData);
  const [currentPage, setCurrentPage] = useState(1);
  const seekersPerPage = 5;

  // Track selected checkboxes
  const [selectedSeekers, setSelectedSeekers] = useState([]);

  // Track visible columns
  const allColumns = [
    { key: "user", label: "User" },
    { key: "Specialization", label: "Specialization" },
    { key: "mail", label: "Email" },
    { key: "phoneNo", label: "Phone" },
    { key: "pincodeNo", label: "Pincode" },
    { key: "status", label: "Status" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.map((col) => col.key)
  );

  // Track if filter panel is open
  const [filterOpen, setFilterOpen] = useState(false);

  // Pagination
  const indexOfLast = currentPage * seekersPerPage;
  const indexOfFirst = indexOfLast - seekersPerPage;
  const currentSeekers = seekerData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(seekerData.length / seekersPerPage);

  const navigate = useNavigate();

  const allSelected =
    currentSeekers.length > 0 &&
    currentSeekers.every((s) => selectedSeekers.includes(s.id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedSeekers((prev) =>
        prev.filter((id) => !currentSeekers.some((s) => s.id === id))
      );
    } else {
      setSelectedSeekers((prev) => [
        ...new Set([...prev, ...currentSeekers.map((s) => s.id)]),
      ]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedSeekers((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="seekerprofile-container">
      {/* Top cards */}
      <div className="seekerprofile-top-row">
        <div className="seekerprofile-small-cards">
          <div className="seekerprofile-cards-container">
            {/* Card 1 */}
            <div className="seekerprofile-card">
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon">
                    <IoIosPeople />
                  </div>
                  <h4>Total Users</h4>
                </div>
                <p className="seekerprofile-amount">15,000</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="seekerprofile-card">
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon">
                    <FaUserCheck />
                  </div>
                  <h4>Active Users</h4>
                </div>
                <p className="seekerprofile-amount">13,000</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="seekerprofile-card">
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon">
                    <FaUserClock />
                  </div>
                  <h4>In-Active Users</h4>
                </div>
                <p className="seekerprofile-amount">500</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="seekerprofile-rec-seek">
        <div className="seekerprofile-section">
          {/* Header with Download & Filter */}
          <div className="seekerprofile-section-header">
            <h2>Seeker Profiles List</h2>
            <div className="seekerprofile-header-buttons">
              <button
                className="seekerprofile-add-btn"
                onClick={() => navigate("/dashboard/seeker-profile/download")}
              >
                Download
              </button>
              <button
                className="seekerprofile-filter-btn"
                onClick={() => setFilterOpen((prev) => !prev)}
              >
                Filter Columns
              </button>
            </div>
          </div>

          {/* Column Filter Panel */}
          {filterOpen && (
            <div className="column-filter-panel">
              <h4>Select Columns to Display:</h4>
              {allColumns.map((col) => (
                <label key={col.key} className="column-checkbox">
                  <input
                    type="checkbox"
                    checked={visibleColumns.includes(col.key)}
                    onChange={() =>
                      setVisibleColumns((prev) =>
                        prev.includes(col.key)
                          ? prev.filter((c) => c !== col.key)
                          : [...prev, col.key]
                      )
                    }
                  />
                  {col.label}
                </label>
              ))}
            </div>
          )}

          {/* Table */}
          <div className="seekerprofile-table-container">
            <table className="seekerprofile-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {allColumns
                    .filter((col) => visibleColumns.includes(col.key))
                    .map((col) => (
                      <th key={col.key}>{col.label}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {currentSeekers.map((seeker) => (
                  <tr
                    key={seeker.id}
                    className="seekerprofile-row"
                    onClick={() =>
                      navigate(`/dashboard/seeker-profile/${seeker.id}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <td
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOne(seeker.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSeekers.includes(seeker.id)}
                        readOnly
                      />
                    </td>
                    {allColumns
                      .filter((col) => visibleColumns.includes(col.key))
                      .map((col) => (
                        <td key={col.key}>
                          {col.key === "user" ? (
                            <>
                              <FaUserCircle className="school-logo" />{" "}
                              {seeker[col.key]}
                            </>
                          ) : (
                            seeker[col.key]
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="seekerprofile-pagination">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
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
