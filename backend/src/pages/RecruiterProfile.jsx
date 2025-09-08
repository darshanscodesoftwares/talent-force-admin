import { IoIosPeople } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa6";
import { FaSchool } from "react-icons/fa";
import { HiCurrencyRupee } from "react-icons/hi2";
import "./RecruiterProfile.css";
import { useState, useEffect } from "react";
import { recruiterProfile } from "../data/contentData.js";
import { useNavigate } from "react-router-dom";
import RecruiterProfileLoader from "../Loader/Loader.jsx"

export default function RecruiterProfile() {
  const [recruiters] = useState(recruiterProfile);
  const [currentPage, setCurrentPage] = useState(1);
  const recruitersPerPage = 5;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)

  // calculate indexes
  const indexOfLast = currentPage * recruitersPerPage;
  const indexOfFirst = indexOfLast - recruitersPerPage;
  const currentRecruiters = recruiters.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(recruiters.length / recruitersPerPage);

  // remove this before production
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <RecruiterProfileLoader />

  return (
    <div className="recruiterprofile-container">
      {/* Top Row with Small Cards */}
      <div className="recruiterprofile-top-row">
        <div className="recruiterprofile-small-cards">
          <div className="recruiterprofile-cards-container">
            {/* Card 1 */}
            <div className="recruiterprofile-card">
              <div className="recruiterprofile-card-body">
                <div className="recruiterprofile-card-left">
                  <div className="recruiterprofile-card-icon">
                    <IoIosPeople />
                  </div>
                  <h4>Total Recruiters</h4>
                </div>
                <p className="recruiterprofile-amount">{`10,000`}</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="recruiterprofile-card">
              <div className="recruiterprofile-card-body">
                <div className="recruiterprofile-card-left">
                  <div className="recruiterprofile-card-icon">
                    <FaUserCheck />
                  </div>
                  <h4>Active Users</h4>
                </div>
                <p className="recruiterprofile-amount">
                  {`5,000`}
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="recruiterprofile-card">
              <div className="recruiterprofile-card-body">
                <div className="recruiterprofile-card-left">
                  <div className="recruiterprofile-card-icon">
                    <HiCurrencyRupee />
                  </div>
                  <h4>Subscribed Users</h4>
                </div>
                <p className="recruiterprofile-amount">
                  {`3,000`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter List Table */}
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
                    <td>
                      <div className="icon-school">
                        <FaSchool className="school-logo" />
                        {recruiter.school}
                      </div>
                    </td>
                    <td>{recruiter.email}</td>
                    <td>{recruiter.phone}</td>
                    <td>{recruiter.pincode}</td>
                    <td>
                      {recruiter.membership === "Advanced" ? (
                        <span className="recruiterprofile-membership advanced">👑 Advanced</span>
                      ) : (
                        <span className="recruiterprofile-membership basic">● Basic</span>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
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
