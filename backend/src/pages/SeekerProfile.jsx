import { IoIosPeople } from "react-icons/io";
import { FaUserClock, FaUserCheck, FaAngleDown } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import "./SeekerProfile.css";
import { useState } from "react";
import { seekerData } from "../data/contentData.js";
import { useNavigate } from "react-router-dom";
import SeekerFilterModal from "../editpages/SeekerFilterModal.jsx"; // Import modal

// ✅ Import for Excel Export
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function SeekerProfile() {
  const [seekers] = useState(seekerData);
  const [currentPage, setCurrentPage] = useState(1);
  const seekersPerPage = 8;
  const [selectedSeekers, setSelectedSeekers] = useState([]);
  const navigate = useNavigate();

  // ✅ Columns
  const allColumns = [
    { key: "user", label: "User" },
    { key: "Specialization", label: "Specialization" },
    { key: "mail", label: "Email" },
    { key: "phoneNo", label: "Phone" },
    { key: "pincodeNo", label: "Pincode" },
    { key: "status", label: "Status" },
  ];

  const [visibleColumns, setVisibleColumns] = useState(allColumns.map(c => c.key));
  const [tempColumns, setTempColumns] = useState(allColumns.map(c => c.key));
  const [filterOpen, setFilterOpen] = useState(false);

  // 🔹 Filters
  const [filters, setFilters] = useState({ specialization: "", pincode: "", status: "" });

  // 🔹 Modal state
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // 🔹 Filtering Logic
  const filteredSeekers = seekers.filter((s) => {
    return (
      (filters.specialization ? s.Specialization.toLowerCase().includes(filters.specialization.toLowerCase()) : true) &&
      (filters.pincode ? s.pincodeNo.includes(filters.pincode) : true) &&
      (filters.status ? s.status === filters.status : true)
    );
  });

  const indexOfLast = currentPage * seekersPerPage;
  const indexOfFirst = indexOfLast - seekersPerPage;
  const currentSeekers = filteredSeekers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSeekers.length / seekersPerPage);

  // ✅ Excel Export
  const handleDownload = () => {
    if (selectedSeekers.length === 0) return alert("Select at least one seeker.");
    const exportData = seekers
      .filter((s) => selectedSeekers.includes(s.id))
      .map((seeker) => {
        const row = {};
        visibleColumns.forEach((colKey) => {
          row[allColumns.find(c => c.key === colKey).label] = seeker[colKey];
        });
        return row;
      });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Seekers");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "selected_seekers.xlsx");
  };

  // ✅ Selection
  const allSelected = currentSeekers.length > 0 && currentSeekers.every(s => selectedSeekers.includes(s.id));
  const handleSelectAll = () => {
    if (allSelected) setSelectedSeekers(prev => prev.filter(id => !currentSeekers.some(s => s.id === id)));
    else setSelectedSeekers(prev => [...new Set([...prev, ...currentSeekers.map(s => s.id)])]);
  };
  const handleSelectOne = (id) => {
    setSelectedSeekers(prev => prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]);
  };

  return (
    <div className="seekerprofile-container">

      {/* Top Cards */}
      <div className="seekerprofile-top-row">
        <div className="seekerprofile-small-cards">
          <div className="seekerprofile-cards-container">
            <div className="seekerprofile-card">
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon"><IoIosPeople /></div>
                  <h4>Total Users</h4>
                </div>
                <p className="seekerprofile-amount">15,000</p>
              </div>
            </div>
            <div className="seekerprofile-card">
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon"><FaUserCheck /></div>
                  <h4>Active Users</h4>
                </div>
                <p className="seekerprofile-amount">13,000</p>
              </div>
            </div>
            <div className="seekerprofile-card">
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon"><FaUserClock /></div>
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
          <div className="seekerprofile-section-header">
            <h2>Seeker Profiles List</h2>
            <div className="seekerprofile-header-buttons">

              {/* Reset Table */}
              {/* <button className="seekerprofile-reset-btn" onClick={() => {
                setFilters({ specialization: "", pincode: "", status: "" });
                setVisibleColumns(allColumns.map(c => c.key));
                setTempColumns(allColumns.map(c => c.key));
                setCurrentPage(1);
              }}>Reset Table</button> */}

              {/* Download */}
              <button className="seekerprofile-add-btn" onClick={handleDownload}>Download</button>

              {/* Filter Columns */}
              {/* <button className="seekerprofile-filter-btn" onClick={() => setFilterOpen(prev => !prev)}>
                <div className="title-icon2">Filter Columns <FaAngleDown /></div>
              </button> */}

              {/* 🔹 Advanced Search Modal */}
              <button className="seekerprofile-search-btn" onClick={() => setSearchModalOpen(true)}>
                <div className="title-icon2">Advanced Search <FaAngleDown /></div>
              </button>

            </div>
          </div>

          {/* Column Filter Panel */}
          {filterOpen && (
            <div className="column-filter-panel">
              <button className="column-filter-close-btn" onClick={() => setFilterOpen(false)}>✖</button>
              <div className="column-filter-header"><h4>Select Columns to Display:</h4></div>
              {allColumns.map(col => (
                <label key={col.key} className="column-checkbox">
                  <input type="checkbox" checked={tempColumns.includes(col.key)} onChange={() =>
                    setTempColumns(prev => prev.includes(col.key) ? prev.filter(c => c !== col.key) : [...prev, col.key])
                  }/>
                  {col.label}
                </label>
              ))}
              <div className="filter-actions1">
                <button className="column-reset-btn" onClick={() => setTempColumns(allColumns.map(c => c.key))}>Reset</button>
                <button className="column-apply-btn" onClick={() => { setVisibleColumns(tempColumns); setFilterOpen(false); }}>Apply</button>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="seekerprofile-table-container">
            <table className="seekerprofile-table">
              <thead>
                <tr>
                  <th><input type="checkbox" checked={allSelected} onChange={handleSelectAll}/></th>
                  {allColumns.filter(c => visibleColumns.includes(c.key)).map(col => <th key={col.key}>{col.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {currentSeekers.map(seeker => (
                  <tr key={seeker.id} className="seekerprofile-row" onClick={() => navigate(`/dashboard/seeker-profile/${seeker.id}`)} style={{ cursor: "pointer" }}>
                    <td onClick={(e) => { e.stopPropagation(); handleSelectOne(seeker.id); }}>
                      <input type="checkbox" checked={selectedSeekers.includes(seeker.id)} readOnly />
                    </td>
                    {allColumns.filter(c => visibleColumns.includes(c.key)).map(col => (
                      <td key={col.key}>
                        {col.key === "user" ? <><FaUserCircle className="school-logo"/> {seeker[col.key]}</> : seeker[col.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="seekerprofile-pagination">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage-1)}>Prev</button>
              {[...Array(totalPages)].map((_, i) => (
                <button key={i} className={currentPage === i+1 ? "active" : ""} onClick={() => setCurrentPage(i+1)}>{i+1}</button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage+1)}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Render Modal */}
      {searchModalOpen && (
        <SeekerFilterModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setSearchModalOpen(false)}
        />
      )}
    </div>
  );
}
