import React, { useContext, useState } from "react";
import { SubscribedContext } from "../UseContexts/RecruiterUseContext/SubscribedContext/SubscribedRecruiterContext";
import "./SubscribedRecruiterList.css";
import { FaAngleDown, FaAngleUp, FaUserCheck } from "react-icons/fa6";
import * as XLSX from "xlsx";

import { toast } from "react-toastify";

const SubscribedRecruiterList = () => {
  const { loading, subscribed } = useContext(SubscribedContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [selectedRecruiters, setSelectedRecruiters] = useState([]);

  const [searchFilters, setSearchFilters] = useState({
    schoolName: "",
    phoneNumber: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    schoolName: "",
    phoneNumber: "",
  });

  const handleApplySearch = () => {
    setAppliedFilters(searchFilters);
    setCurrentPage(1);
    setSearchModalOpen(false);
  };

  const handleClearSearch = () => {
    setSearchFilters({
      schoolName: "",
      phoneNumber: "",
    });

    setAppliedFilters({
      schoolName: "",
      phoneNumber: "",
    });

    setCurrentPage(1);
  };

  const filteredRecruiters = subscribed.filter((rec) => {
    const schoolMatch =
      appliedFilters.schoolName === "" ||
      rec.school_name
        ?.toLowerCase()
        .includes(appliedFilters.schoolName.toLowerCase());

    const phoneMatch =
      appliedFilters.phoneNumber === "" ||
      rec.school_phone
        ?.toLowerCase()
        .includes(appliedFilters.phoneNumber.toLowerCase());

    return schoolMatch && phoneMatch;
  });

  const recruitersPerPage = 15;

  const totalRecords = filteredRecruiters.length;

  const totalPages = Math.ceil(totalRecords / recruitersPerPage);

  // Pagination calculations (pure JS, safe)
  const indexOfLast = currentPage * recruitersPerPage;
  const indexOfFirst = indexOfLast - recruitersPerPage;

  const currentRecruiters = filteredRecruiters.slice(indexOfFirst, indexOfLast);

  const handleDownload = () => {
    // ✅ Force user to select first
    if (selectedRecruiters.length === 0) {
      toast.warning("Please select at least one recruiter");
      return;
    }

    const selectedData = filteredRecruiters.filter((r) =>
      selectedRecruiters.includes(r.recruiter_id)
    );

    const excelData = selectedData.map((r) => ({
      School: r.school_name || "N/A",
      Email: r.school_email || "N/A",
      Phone: r.school_phone || "N/A",
      Pincode: r.pincode || "N/A",
      Membership: r.plan?.plan_name || "N/A",
      Status: r.plan?.status || "N/A",
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Recruiters");
    XLSX.writeFile(workbook, "Subscribed_Recruiters.xlsx");

    toast.success(`Downloaded ${selectedData.length} recruiter(s)`);
  };

  const handleSelectOne = (id) => {
    setSelectedRecruiters((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const pageIds = currentRecruiters.map((r) => r.recruiter_id);
      setSelectedRecruiters(pageIds);
    } else {
      setSelectedRecruiters([]);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <div className="recruiterprofile-container">
        {/* ===== RECRUITER LIST TABLE ===== */}
        <div className="recruiterprofile-rec-seek">
          <div className="recruiterprofile-section">
            <div className="recruiter-header-btn">
              <h2>Recruiter List</h2>

              {/* download recruiter  */}
              <div className="recruiter-header-buttons">
                <button
                  onClick={handleDownload}
                  className="seekerprofile-add-btn"
                >
                  Download
                </button>
                <button
                  onClick={() => setSearchModalOpen((prev) => !prev)}
                  className="seekerprofile-search-btn"
                >
                  Advanced Search
                  {searchModalOpen ? <FaAngleUp /> : <FaAngleDown />}
                </button>
              </div>
            </div>

            <div className="recruiterprofile-pagination">
              <span className="pagination-range">
                {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ❮
              </button>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                ❯
              </button>
            </div>

            <div className="recruiter-table-wrapper">
              <div className="recruiterprofile-table-container">
                <table className="recruiterprofile-table">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          checked={
                            currentRecruiters.length > 0 &&
                            currentRecruiters.every((r) =>
                              selectedRecruiters.includes(r.recruiter_id)
                            )
                          }
                          onChange={handleSelectAll}
                        />
                      </th>

                      <th>School</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Pincode</th>
                      <th>Membership</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredRecruiters.length === 0 ? (
                      <tr>
                        <td colSpan="7">No subscribed recruiters found</td>
                      </tr>
                    ) : (
                      currentRecruiters.map((rec) => (
                        <tr
                          key={rec.recruiter_id}
                          className="recruiterprofile-row"
                        >
                          {/* Checkbox */}
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedRecruiters.includes(
                                rec.recruiter_id
                              )}
                              onChange={() => handleSelectOne(rec.recruiter_id)}
                            />
                          </td>

                          {/* School */}
                          <td>
                            <div className="recruiter-school-cell">
                              {rec.school_image && (
                                <img
                                  src={rec.school_image}
                                  alt="school"
                                  className="school-logo"
                                />
                              )}

                              <div className="recruiter-school-info">
                                <div className="school-name">
                                  {rec.school_name || "N/A"}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Email */}
                          <td>{rec.school_email || "N/A"}</td>

                          {/* Phone */}
                          <td>{rec.school_phone || "N/A"}</td>

                          {/* Pincode */}
                          <td>{rec.pincode || "N/A"}</td>

                          {/* Membership */}
                          <td>{rec.plan?.plan_name || "N/A"}</td>

                          {/* Status */}
                          <td>{rec.plan?.status || "N/A"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {searchModalOpen && (
          <div
            className="recruiter-modal-overlay"
            onClick={() => setSearchModalOpen(false)}
          >
            <div
              className="recruiter-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="recruiter-modal-close-btn"
                onClick={() => setSearchModalOpen(false)}
              >
                &times;
              </button>
              <h2 className="recruiter-modal-title">Advanced Search</h2>
              <div className="recruiter-modal-body">
                <div className="recruiter-search-field-group">
                  <label className="recruiter-search-label">School Name</label>
                  <input
                    type="text"
                    className="recruiter-search-input"
                    placeholder="School Name"
                    value={searchFilters.schoolName}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        schoolName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="recruiter-search-field-group">
                  <label className="recruiter-search-label">Phone Number</label>
                  <input
                    type="text"
                    className="recruiter-search-input"
                    placeholder="Phone Number"
                    value={searchFilters.phoneNumber}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="recruiter-search-actions">
                  <button
                    type="button"
                    className="recruiter-search-btn-clear"
                    onClick={handleClearSearch}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="recruiter-search-btn-apply"
                    onClick={handleApplySearch}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubscribedRecruiterList;
