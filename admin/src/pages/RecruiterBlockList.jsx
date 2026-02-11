import React from "react";
import "./SeekerProfile.css";

import { useContext, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { RecruiterProfileContext } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext";

const RecruiterBlockList = () => {
  const {
    blockedRecruiters,
    blockRecruitersList,
    loading,
    toggleBlockRecruiter,
  } = useContext(RecruiterProfileContext);

  useEffect(() => {
    blockRecruitersList();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="seekerprofile-container">
        <div className="seekerprofile-table-container">
          <table className="seekerprofile-table">
            <thead>
              <tr>
                <th>School Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {blockedRecruiters.map((user) => (
                <tr key={user.id}>
                  <td>{user.schoolName}</td>
                  <td>{user.schoolPhone}</td>
                  <td>{user.schoolEmail}</td>

                  <td>
                    {user.schoolImage ? (
                      <img
                        src={user.schoolImage}
                        alt="school"
                        width="40"
                        height="40"
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      <FaUserCircle size={40} />
                    )}
                  </td>

                  <td>
                    <span className="status-badge blocked">Blocked</span>
                  </td>

                  <td>
                    <button
                      className="block-btn"
                      onClick={() => toggleBlockRecruiter(user.id, user.status)}
                    >
                      Unblock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RecruiterBlockList;
