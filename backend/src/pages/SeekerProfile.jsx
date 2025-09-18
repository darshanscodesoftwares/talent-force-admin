import { useContext, useState } from "react";
import { SeekerProfileContext } from "../UseContexts/SeekerUseContext/SeekerProfileContent.jsx";
import { useNavigate } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { FaUserClock, FaUserCheck } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import SeekerFilterModal from "../editpages/SeekerFilterModal.jsx";
import { SeekerProfileLoader } from "../Loader/Loader.jsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./SeekerProfile.css";

export default function SeekerProfile() {
  const { seekers, loading } = useContext(SeekerProfileContext);
  const [currentPage, setCurrentPage] = useState(1);
  const seekersPerPage = 10;
  const [selectedSeekers, setSelectedSeekers] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    specialization: "",
    pincode: "",
    status: "",
  });
  const navigate = useNavigate();

  const allColumns = [
    { key: "name", label: "User" },
    { key: "specialization", label: "Specialization" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "pincode", label: "Pincode" },
    { key: "status", label: "Status" },
  ];
  const [visibleColumns, setVisibleColumns] = useState(allColumns.map(c => c.key));

  // 🔹 Apply filters
  const filteredSeekers = seekers.filter((s) => {
    return (
      (!filters.specialization || s.specialization === filters.specialization) &&
      (!filters.pincode || s.pincode === filters.pincode) &&
      (!filters.status || s.status === filters.status)
    );
  });

  // 🔹 Pagination
  const indexOfLast = currentPage * seekersPerPage;
  const indexOfFirst = indexOfLast - seekersPerPage;
  const currentSeekers = filteredSeekers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSeekers.length / seekersPerPage);

  // 🔹 Selection
  const allSelected = currentSeekers.length > 0 && currentSeekers.every(s => selectedSeekers.includes(s.id));
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedSeekers(prev => prev.filter(id => !currentSeekers.some(s => s.id === id)));
    } else {
      setSelectedSeekers(prev => [...new Set([...prev, ...currentSeekers.map(s => s.id)])]);
    }
  };
  const handleSelectOne = (id) => {
    setSelectedSeekers(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  // 🔹 Excel Export
  const handleDownload = () => {
    if (selectedSeekers.length === 0) return alert("Select at least one seeker.");
    const exportData = seekers
      .filter((s) => selectedSeekers.includes(s.id))
      .map((s) => {
        const row = {};
        visibleColumns.forEach(colKey => {
          row[allColumns.find(c => c.key === colKey).label] = s[colKey];
        });
        return row;
      });
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Seekers");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "selected_seekers.xlsx");
  };

  if (loading) return <SeekerProfileLoader />;

  return (
    <div className="seekerprofile-container">

      {/* Top Cards */}
      <div className="seekerprofile-top-row">
        <div className="seekerprofile-small-cards">
          <div className="seekerprofile-cards-container">

            {/* Card 1 */}
            <div className="seekerprofile-card">
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon"><IoIosPeople /></div>
                  <h4>Total Users</h4>
                </div>
                <p className="seekerprofile-amount">{seekers.length}</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="seekerprofile-card">
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon"><FaUserCheck /></div>
                  <h4>Active Users</h4>
                </div>
                <p className="seekerprofile-amount">
                  {seekers.filter(s => s.status === "Seeking").length}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="seekerprofile-card">
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon"><FaUserClock /></div>
                  <h4>Inactive Users</h4>
                </div>
                <p className="seekerprofile-amount">
                  {seekers.filter(s => s.status === "Not Seeking").length}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="seekerprofile-section-header">
        <h2>Seeker Profiles List ({filteredSeekers.length})</h2>
        <div className="seekerprofile-header-buttons">
          <button onClick={handleDownload} className="seekerprofile-add-btn">Download</button>
          <button
            onClick={() => setSearchModalOpen((prev) => !prev)}
            className="seekerprofile-search-btn"
          >
            Advanced Search{" "}
            {searchModalOpen ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="seekerprofile-table-container">
        <table className="seekerprofile-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={allSelected} onChange={handleSelectAll} />
              </th>
              {allColumns.filter(c => visibleColumns.includes(c.key)).map(col => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentSeekers.map(seeker => (
              <tr
                key={seeker.id}
                className="seekerprofile-row"
                onClick={() => navigate(`/dashboard/seeker-profile/${seeker.id}`)}
              >
                <td onClick={e => { e.stopPropagation(); handleSelectOne(seeker.id); }}>
                  <input type="checkbox" checked={selectedSeekers.includes(seeker.id)} readOnly />
                </td>
                {allColumns.filter(c => visibleColumns.includes(c.key)).map(col => (
                  <td key={col.key}>
                    {col.key === "name" ? (
                      <>
                        {seeker.profile_img ? (
                          <img
                            src={seeker.profile_img}
                            alt={seeker.name}
                            className="seekerprofile-avatar"
                          />
                        ) : (
                          <FaUserCircle className="school-logo" />
                        )}
                        {seeker[col.key]}
                      </>
                    ) : seeker[col.key] || ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="seekerprofile-pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Search Modal */}
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
