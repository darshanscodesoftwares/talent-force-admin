import { IoIosPeople } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa6";
import { FaSchool } from "react-icons/fa";
import { HiCurrencyRupee } from "react-icons/hi2";
import "./RecruiterProfile.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RecruiterProfileLoader from "../Loader/Loader.jsx";
import { RecruiterProfileContext } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext.jsx";

export default function RecruiterProfile() {
  const { recruiters, loading } = useContext(RecruiterProfileContext);
  const [currentPage, setCurrentPage] = useState(1);
  const recruitersPerPage = 5;
  const navigate = useNavigate();

  // Calculate pagination
  const indexOfLast = currentPage * recruitersPerPage;
  const indexOfFirst = indexOfLast - recruitersPerPage;
  const currentRecruiters = recruiters.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(recruiters.length / recruitersPerPage);

  // ✅ Loader based on context data
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <RecruiterProfileLoader />;

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

            {/* Active Users (login enabled) */}
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

            {/* Subscribed Users (placeholder for now) */}
            <div className="recruiterprofile-card">
              <div className="recruiterprofile-card-body">
                <div className="recruiterprofile-card-left">
                  <div className="recruiterprofile-card-icon">
                    <HiCurrencyRupee />
                  </div>
                  <h4>Subscribed Users</h4>
                </div>
                <p className="recruiterprofile-amount">
                  {recruiters.filter((r) => r.membership === "Advanced").length || 0}
                </p>
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
                    onClick={() =>
                      navigate(`/dashboard/recruiter-profile/${recruiter.id}`)
                    }
                  >
                    {/* SCHOOL NAME + IMAGE */}
                    <td>
                      <div className="icon-school">
                        {recruiter.schoolImage ? (
                          <img
                            src={recruiter.schoolImage}
                            alt={recruiter.schoolName}
                            className="school-logo"
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              marginRight: "8px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <FaSchool className="school-logo" />
                        )}
                        {recruiter.schoolName}
                      </div>
                    </td>

                    {/* EMAIL */}
                    <td>{recruiter.schoolEmail}</td>

                    {/* PHONE */}
                    <td>{recruiter.phoneNumber}</td>

                    {/* PINCODE */}
                    <td>
                      {recruiter.jobPosts?.[0]?.pincode?.pincode || "N/A"}
                    </td>

                    {/* MEMBERSHIP */}
                    <td>
                      {recruiter.membership === "Advanced" ? (
                        <span className="recruiterprofile-membership advanced">
                          👑 Advanced
                        </span>
                      ) : (
                        <span className="recruiterprofile-membership basic">● Basic</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ===== PAGINATION ===== */}
            <div className="recruiterprofile-pagination">
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
