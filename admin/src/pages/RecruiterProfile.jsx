import { IoIosPeople } from "react-icons/io";

import { FaSchool, FaWhatsapp } from "react-icons/fa";
import { HiCurrencyRupee } from "react-icons/hi2";
import "./RecruiterProfile.css";
import { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RecruiterProfileLoader from "../Loader/Loader.jsx";
import { RecruiterProfileContext } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext.jsx";
import { useDashboardMetrics } from "../UseContexts/GeneralUseContext/DashBoardContext/DashboardMetricDataContext.jsx";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

import { FaAngleDown, FaAngleUp, FaUserCheck } from "react-icons/fa6";

export default function RecruiterProfile() {
  // ✅ ALL HOOKS MUST BE AT THE TOP — ALWAYS
  const { recruiters, loading, softdelete } = useContext(
    RecruiterProfileContext
  );
  const { metrics, loadingMetrics, errorMetrics } = useDashboardMetrics();
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [searchFilters, setSearchFilters] = useState({
    schoolName: "",
    phoneNumber: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    schoolName: "",
    phoneNumber: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pagesToShow = 7;
  const recruitersPerPage = 50;
  const navigate = useNavigate();
  const location = useLocation();

  const topScrollRef = useRef(null);
  const tableScrollRef = useRef(null);

  // Pagination calculations (pure JS, safe)
  const indexOfLast = currentPage * recruitersPerPage;
  const indexOfFirst = indexOfLast - recruitersPerPage;

  // const currentRecruiters = recruiters.slice(indexOfFirst, indexOfLast);

  const filteredRecruiters = recruiters.filter((r) => {
    return (
      (!appliedFilters.schoolName ||
        r.schoolName
          ?.toLowerCase()
          .includes(appliedFilters.schoolName.toLowerCase())) &&
      (!appliedFilters.phoneNumber ||
        r.phoneNumber?.includes(appliedFilters.phoneNumber))
    );
  });

  const currentRecruiters = filteredRecruiters.slice(indexOfFirst, indexOfLast);

  // const totalPages = Math.ceil(recruiters.length / recruitersPerPage);

  const totalPages = Math.ceil(filteredRecruiters.length / recruitersPerPage);

  const totalRecords = filteredRecruiters.length;

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

  const maxLeft = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  const maxRight = Math.min(maxLeft + pagesToShow - 1, totalPages);

  /*-----------------------------------------------------*/
  // const totalRecords = recruiters.length;

  const startRecord =
    totalRecords === 0 ? 0 : (currentPage - 1) * recruitersPerPage + 1;

  const endRecord = Math.min(currentPage * recruitersPerPage, totalRecords);

  /*-----------------------------------------------------*/

  const [selectedRecruiters, setSelectedRecruiters] = useState([]);

  const currentPageIds = currentRecruiters.map((r) => r.id);

  const allSelected =
    currentPageIds.length > 0 &&
    currentPageIds.every((id) => selectedRecruiters.includes(id));

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = Number(params.get("page"));

    if (pageFromUrl && pageFromUrl >= 1) {
      setCurrentPage(pageFromUrl);
    }
  }, [location.search]);

  // Save scroll position before navigation
  const saveScrollPosition = () => {
    let scrollY = 0;

    if (document.documentElement.scrollTop > 0) {
      scrollY = document.documentElement.scrollTop;
    } else if (document.body.scrollTop > 0) {
      scrollY = document.body.scrollTop;
    } else if (window.scrollY > 0) {
      scrollY = window.scrollY;
    }

    const allElements = document.querySelectorAll("*");
    allElements.forEach((el) => {
      const style = window.getComputedStyle(el);
      if (
        (style.overflowY === "auto" || style.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight
      ) {
        if (el.scrollTop > 0) {
          scrollY = el.scrollTop;
        }
      }
    });

    sessionStorage.setItem("recruiterProfileScrollY", scrollY.toString());
    sessionStorage.setItem("recruiterProfilePage", currentPage.toString());
    sessionStorage.setItem("recruiterProfileFilters", JSON.stringify(appliedFilters));
  };

  // Restore scroll position when returning
  useEffect(() => {
    const savedScrollY = sessionStorage.getItem("recruiterProfileScrollY");
    const savedPage = sessionStorage.getItem("recruiterProfilePage");
    const savedFilters = sessionStorage.getItem("recruiterProfileFilters");

    if (savedScrollY || savedPage || savedFilters) {
      if (savedFilters) {
        try {
          const parsedFilters = JSON.parse(savedFilters);
          setAppliedFilters(parsedFilters);
        } catch (e) {
          // Silently fail if filters can't be parsed
        }
      }

      if (savedPage && parseInt(savedPage) !== currentPage) {
        setCurrentPage(parseInt(savedPage));
      }

      if (savedScrollY) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const targetScroll = parseInt(savedScrollY);

            window.scrollTo(0, targetScroll);
            document.documentElement.scrollTop = targetScroll;
            document.body.scrollTop = targetScroll;

            const allElements = document.querySelectorAll("*");
            allElements.forEach((el) => {
              const style = window.getComputedStyle(el);
              if (
                (style.overflowY === "auto" || style.overflowY === "scroll") &&
                el.scrollHeight > el.clientHeight
              ) {
                el.scrollTop = targetScroll;
              }
            });

            sessionStorage.removeItem("recruiterProfileScrollY");
            sessionStorage.removeItem("recruiterProfilePage");
            sessionStorage.removeItem("recruiterProfileFilters");
          }, 50);
        });
      }
    }
  }, [location.pathname]);

  const handleDownload = () => {
    // If no recruiters selected, download all filtered recruiters (bulk download)
    const dataToExport = selectedRecruiters.length === 0 ? filteredRecruiters : recruiters.filter((r) =>
      selectedRecruiters.includes(r.id)
    );

    if (dataToExport.length === 0) {
      toast.warning("No recruiters to download.");
      return;
    }

    const excelData = dataToExport.map((r) => ({
      School: r.schoolName || "N/A",
      Email: r.schoolEmail || "N/A",
      Phone: r.phoneNumber || "N/A",
      Pincode: r.jobPosts?.[0]?.pincode?.pincode || "N/A",
      Membership: r.current_plan?.plan_name || "N/A",
      UserType: r.userType,
      LoginDate: r.loginDate,
      LoginTime: r.loginTime,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Recruiters");
    const fileName = selectedRecruiters.length === 0 ? "all_recruiters.xlsx" : "selected_recruiters.xlsx";
    XLSX.writeFile(workbook, fileName);

    const message = selectedRecruiters.length === 0
      ? `Downloaded all ${dataToExport.length} recruiters successfully`
      : `Downloaded ${dataToExport.length} recruiter(s) successfully`;
    toast.success(message);
  };

  const handleSoftDelete = async (id) => {
    await softdelete(id);
  };

  useEffect(() => {
    const top = topScrollRef.current;
    const table = tableScrollRef.current;

    if (!top || !table) return;

    const syncTop = () => {
      table.scrollLeft = top.scrollLeft;
    };

    const syncTable = () => {
      top.scrollLeft = table.scrollLeft;
    };

    top.addEventListener("scroll", syncTop);
    table.addEventListener("scroll", syncTable);

    return () => {
      top.removeEventListener("scroll", syncTop);
      table.removeEventListener("scroll", syncTable);
    };
  }, []);

  useEffect(() => {
    if (tableScrollRef.current && topScrollRef.current) {
      const tableWidth =
        tableScrollRef.current.querySelector("table").scrollWidth;

      topScrollRef.current.firstChild.style.width = tableWidth + "px";
    }
  }, [recruiters]);

  // ❗ CONDITIONAL RETURNS MUST COME AFTER ALL HOOKS
  if (loading || loadingMetrics) return <RecruiterProfileLoader />;

  if (errorMetrics) return <p>Error loading metrics...</p>;

  return (
    <div className="recruiterprofile-container">
      {/* ===== TOP ROW WITH SMALL CARDS ===== */}
      <div className="recruiterprofile-top-row">
        <div className="recruiterprofile-small-cards">
          <div className="recruiterprofile-cards-container">
            {/* Total Recruiters */}
            <div className="recruiterprofile-card">
              <div className="recruiterprofile-card-body">
                <div className="recruiterprofile-card-left">
                  <div className="recruiterprofile-card-icon">
                    <IoIosPeople />
                  </div>
                  <h4>Total Recruiters</h4>
                </div>
                <p className="recruiterprofile-amount">{recruiters.length}</p>
              </div>
            </div>

            {/* Active Users */}
            <div className="recruiterprofile-card">
              <div className="recruiterprofile-card-body">
                <div className="recruiterprofile-card-left">
                  <div className="recruiterprofile-card-icon">
                    <FaUserCheck />
                  </div>
                  <h4>Active Users</h4>
                </div>
                <p className="recruiterprofile-amount">
                  {recruiters.filter((r) => r.isLogin === "Yes").length}
                </p>
              </div>
            </div>

            {/* Subscribed Users */}
            <div className="recruiterprofile-card">
              <div className="recruiterprofile-card-body">
                <div className="recruiterprofile-card-left">
                  <div className="recruiterprofile-card-icon">
                    <HiCurrencyRupee />
                  </div>
                  <h4>Subscribed Users</h4>
                </div>
                <p className="recruiterprofile-amount">
                  {metrics?.subscribed_recruiters ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RECRUITER LIST TABLE ===== */}
      <div className="recruiterprofile-rec-seek">
        <div className="recruiterprofile-section">
          <div className="recruiter-header-btn">
            <h2>Recruiter Profiles List</h2>

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
                Advanced Search{" "}
                {searchModalOpen ? <FaAngleUp /> : <FaAngleDown />}
              </button>
            </div>
          </div>

          <div className="recruiterprofile-pagination">
            <span className="pagination-range">
              {startRecord}-{endRecord} of {totalRecords}
            </span>

            <button
              disabled={currentPage === 1}
              onClick={() => {
                const prev = currentPage - 1;
                setCurrentPage(prev);
                navigate(`?page=${prev}`, { replace: true });
              }}
            >
              ❮
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => {
                const next = currentPage + 1;
                setCurrentPage(next);
                navigate(`?page=${next}`, { replace: true });
              }}
            >
              ❯
            </button>
          </div>

          <div className="recruiter-table-wrapper">
            {/* Top Scroll */}
            <div className="top-scroll" ref={topScrollRef}>
              <div className="top-scroll-inner"></div>
            </div>

            <div
              className="recruiterprofile-table-container"
              ref={tableScrollRef}
            >
              <table className="recruiterprofile-table">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        onChange={() => {
                          if (allSelected) {
                            // ❌ unselect only current page
                            setSelectedRecruiters((prev) =>
                              prev.filter((id) => !currentPageIds.includes(id))
                            );
                          } else {
                            // ✅ select only current page
                            setSelectedRecruiters((prev) => [
                              ...new Set([...prev, ...currentPageIds]),
                            ]);
                          }
                        }}
                      />
                    </th>
                    <th>School</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Pincode</th>
                    <th>Membership</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRecruiters.map((recruiter) => (
                    <tr
                      key={recruiter.id}
                      className="recruiterprofile-row"
                      // onClick={() =>
                      //   navigate(`/dashboard/recruiter-profile/${recruiter.id}`)
                      // }
                      onClick={() => {
                        saveScrollPosition();
                        navigate(
                          `/dashboard/recruiter-profile/${recruiter.id}`,
                          {
                            state: {
                              from: `/dashboard/recruiter-profile?page=${currentPage}`,
                            },
                          }
                        );
                      }}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRecruiters.includes(recruiter.id)}
                          readOnly
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => {
                            setSelectedRecruiters((prev) =>
                              prev.includes(recruiter.id)
                                ? prev.filter((id) => id !== recruiter.id)
                                : [...prev, recruiter.id]
                            );
                          }}
                        />
                      </td>
                      {/* School */}
                      <td>
                        <div className="recruiter-school-cell">
                          {recruiter.schoolImage ? (
                            <img
                              src={recruiter.schoolImage}
                              alt={recruiter.schoolName}
                              className="school-logo"
                            />
                          ) : (
                            <FaSchool className="school-logo" />
                          )}

                          <div className="recruiter-school-info">
                            <div className="school-name">
                              {recruiter.schoolName}
                            </div>
                            <div className="user-type">
                              {recruiter.userType}
                            </div>
                            <div className="login-date">
                              {recruiter.loginDate}
                            </div>
                            <div className="login-time">
                              {recruiter.loginTime}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td>{recruiter.schoolEmail}</td>

                      {/* Phone */}
                      <td>
                        <a
                          href={`https://wa.me/${recruiter.phoneNumber?.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whatsapp-phone-link"
                          onClick={(e) => e.stopPropagation()}
                          title="Open WhatsApp"
                        >
                          <FaWhatsapp size={16} />
                          {recruiter.phoneNumber || "N/A"}
                        </a>
                      </td>

                      {/* Pincode */}
                      {/* <td>{recruiter.job_posts?.[0]?.pincode?.pincode || "N/A"}</td>
                       */}
                      <td>
                        {recruiter.jobPosts?.[0]?.pincode?.pincode || "N/A"}
                      </td>

                      {/* Membership */}
                      <td>
                        {(() => {
                          const plan = recruiter.current_plan?.plan_name;

                          if (!plan) return <span>N/A</span>;

                          return plan.toLowerCase() === "trial" ? (
                            <span className="recruiterprofile-membership basic">
                              {plan}
                            </span>
                          ) : (
                            <span className="recruiterprofile-membership advanced">
                              {plan}
                            </span>
                          );
                        })()}
                      </td>
                      <td onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="delete-btn-table"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSoftDelete(recruiter.id);
                          }}
                        >
                          Delete
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
  );
}
