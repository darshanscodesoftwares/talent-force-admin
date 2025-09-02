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

  // ✅ Track selected checkboxes
  const [selectedSeekers, setSelectedSeekers] = useState([]);

  // calculate indexes
  const indexOfLast = currentPage * seekersPerPage;
  const indexOfFirst = indexOfLast - seekersPerPage;
  const currentSeekers = seekerData.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(seekerData.length / seekersPerPage);

  const navigate = useNavigate();

  // ✅ Check if all current page seekers are selected
  const allSelected =
    currentSeekers.length > 0 &&
    currentSeekers.every((s) => selectedSeekers.includes(s.id));

  // ✅ Toggle select all
  const handleSelectAll = () => {
    if (allSelected) {
      // unselect all from current page
      setSelectedSeekers((prev) =>
        prev.filter((id) => !currentSeekers.some((s) => s.id === id))
      );
    } else {
      // select all from current page
      setSelectedSeekers((prev) => [
        ...new Set([...prev, ...currentSeekers.map((s) => s.id)]),
      ]);
    }
  };

  // ✅ Toggle single row
  const handleSelectOne = (id) => {
    setSelectedSeekers((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <div className="seekerprofile-container">
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

      <div className="seekerprofile-rec-seek">
        {/* Seeker List Table */}
        <div className="seekerprofile-section">
          <div className="seekerprofile-section-header">
            <h2>Seeker Profiles List</h2>
            <button
              className="seekerprofile-add-btn"
              onClick={() => navigate("/dashboard/seeker-profile/download")}
            >
              Download
            </button>
          </div>

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
                  <th>User</th>
                  <th>Specialization</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Pincode</th>
                  <th>Status</th>
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
                    <td>
                      <FaUserCircle className="school-logo" /> {seeker.user}
                    </td>
                    <td>{seeker.Specialization}</td>
                    <td>{seeker.mail}</td>
                    <td>{seeker.phoneNo}</td>
                    <td>{seeker.pincodeNo}</td>
                    <td>
                      <span
                        className={`seekerprofile-status ${
                          seeker.status === "Seeking"
                            ? "seeking"
                            : "not-seeking"
                        }`}
                      >
                        {seeker.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
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
