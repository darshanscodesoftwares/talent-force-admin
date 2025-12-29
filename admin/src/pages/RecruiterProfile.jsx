import { IoIosPeople } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa6";
import { FaSchool } from "react-icons/fa";
import { HiCurrencyRupee } from "react-icons/hi2";
import "./RecruiterProfile.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterProfileLoader from "../Loader/Loader.jsx";
import { RecruiterProfileContext } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext.jsx";
import { useDashboardMetrics } from "../UseContexts/GeneralUseContext/DashBoardContext/DashboardMetricDataContext.jsx";

export default function RecruiterProfile() {

  // ✅ ALL HOOKS MUST BE AT THE TOP — ALWAYS
  const { recruiters, loading } = useContext(RecruiterProfileContext);
  const { metrics, loadingMetrics, errorMetrics } = useDashboardMetrics();
  const [currentPage, setCurrentPage] = useState(1);
  const pagesToShow = 7;
  const recruitersPerPage = 8;
  const navigate = useNavigate();

  // Pagination calculations (pure JS, safe)
  const indexOfLast = currentPage * recruitersPerPage;
  const indexOfFirst = indexOfLast - recruitersPerPage;
  const currentRecruiters = recruiters.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(recruiters.length / recruitersPerPage);
  const maxLeft = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  const maxRight = Math.min(maxLeft + pagesToShow - 1, totalPages);

  // Scroll to top (safe)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                  <div className="recruiterprofile-card-icon"><IoIosPeople /></div>
                  <h4>Total Recruiters</h4>
                </div>
                <p className="recruiterprofile-amount">{recruiters.length}</p>
              </div>
            </div>

            {/* Active Users */}
            <div className="recruiterprofile-card">
              <div className="recruiterprofile-card-body">
                <div className="recruiterprofile-card-left">
                  <div className="recruiterprofile-card-icon"><FaUserCheck /></div>
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
                  <div className="recruiterprofile-card-icon"><HiCurrencyRupee /></div>
                  <h4>Subscribed Users</h4>
                </div>
                <p className="recruiterprofile-amount">{metrics?.subscribed_recruiters ?? 0}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===== RECRUITER LIST TABLE ===== */}
      <div className="recruiterprofile-rec-seek">
        <div className="recruiterprofile-section">
          <h2>Recruiter Profiles List</h2>

          <div className="recruiterprofile-table-container">
            <table className="recruiterprofile-table">
              <thead>
                <tr>
                  <th>School</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Pincode</th>
                  <th>Membership</th>
                </tr>
              </thead>

              <tbody>
                {currentRecruiters.map((recruiter) => (
                  <tr
                    key={recruiter.id}
                    className="recruiterprofile-row"
                    onClick={() => navigate(`/dashboard/recruiter-profile/${recruiter.id}`)}
                  >

                    {/* School */}
                    <td>
                      <div className="icon-school">
                        {recruiter.schoolImage ? (
                          <img
                            src={recruiter.schoolImage}
                            alt={recruiter.schoolName}
                            className="school-logo"
                            style={{ width: 32, height: 32, borderRadius: "50%", marginRight: 8, objectFit: "cover" }}
                          />
                        ) : (
                          <FaSchool className="school-logo" />
                        )}
                        {recruiter.schoolName}
                      </div>
                    </td>

                    {/* Email */}
                    <td>{recruiter.schoolEmail}</td>

                    {/* Phone */}
                    <td>{recruiter.phoneNumber}</td>

                    {/* Pincode */}
                    <td>{recruiter.job_posts?.[0]?.pincode?.pincode || "N/A"}</td>

                    {/* Membership */}
                    <td>
                      {(() => {
                        const plan = recruiter.current_plan?.plan_name;

                        if (!plan) return <span>N/A</span>;

                        return plan.toLowerCase() === "free" ? (
                          <span className="recruiterprofile-membership basic">{plan}</span>
                        ) : (
                          <span className="recruiterprofile-membership advanced">{plan}</span>
                        );
                      })()}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {/* ===== PAGINATION ===== */}
            <div className="recruiterprofile-pagination">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>

              {Array.from({ length: maxRight - maxLeft + 1 }, (_, i) => {
                const page = maxLeft + i;
                return (
                  <button
                    key={page}
                    className={currentPage === page ? "active" : ""}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                );
              })}

              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
