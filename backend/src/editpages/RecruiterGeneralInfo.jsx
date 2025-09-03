// src/editpages/RecruiterGeneralInfo.jsx
import "./RecruiterGeneralInfo.css";
import { FaSchool } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { recruiterJobsData } from "../data/contentData.js"; // import jobs schema

export default function RecruiterGeneralInfo() {
  const navigate = useNavigate();
  const { id } = useParams(); // get recruiter.id from URL

  return (
    <div className="recruitergeneralinfo-container">
      {/* Header */}
      <div className="recruitergeneralinfo-header">
        <h2
          onClick={() => navigate("/dashboard/recruiter-profile")}
          className="recruitergeneralinfo-back"
        >
          <IoChevronBackOutline className="back-icon" />
          <span>Recruiter Information</span>
        </h2>
        <button className="block-btn">Block User</button>
      </div>

      {/* Profile Icon */}
      <div className="recruitergeneralinfo-icon">
        <FaSchool className="profile-icon" />
        {/* <p className="recruiter-id">Recruiter ID: {id}</p> */}
      </div>

      {/* Form */}
      <form className="recruitergeneralinfo-form">
        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label>School Name</label>
            <input type="text" placeholder="CK CBSE" />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>Address</label>
            <input type="text" placeholder="13 Sitco Street..." />
          </div>
        </div>

        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label>Email Id</label>
            <input type="email" placeholder="Ckschool@gmail.com" />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>Number</label>
            <input type="text" placeholder="+91-9876543210" />
          </div>
        </div>

        {/* Detail Cards */}
        <div className="detailCard-wrap">
          <div className="detail-card">
            <h2>30</h2>
            <span>Total</span>
            <span>Job Posts</span>
          </div>

          <div className="detail-card">
            <h2>13</h2>
            <span>Open</span>
            <span>Job Posts</span>
          </div>

          <div className="detail-card">
            <h2>950</h2>
            <span>Total</span>
            <span>Applicants</span>
          </div>

          <div className="detail-card">
            <h2>30</h2>
            <span>Selected</span>
            <span>Candidates</span>
          </div>

          <div className="detail-card">
            <h2>150</h2>
            <span>Recommend</span>
            <span>Invite-AI</span>
          </div>
        </div>
      </form>

      {/* Job Postings Table */}
      <div className="recruiter-jobs-section">
        <h3>Job Postings</h3>
        <div className="recruiter-jobs-table-container">
          <table className="recruiter-jobs-table">
            <thead>
              <tr>
                <th>Job Name</th>
                <th>Posted Date</th>
                <th>Applicants</th>
                <th>AI-Invite</th>
                <th>Selected</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recruiterJobsData.map((job) => (
                <tr key={job.id} className="recruiter-jobs-row">
                  <td>{job.jobName}</td>
                  <td>{job.postedDate}</td>
                  <td>{job.applicants}</td>
                  <td>{job.alInvite}</td>
                  <td>{job.selected}</td>
                  <td
                    className={`job-status ${
                      job.status === "Active"
                        ? "active"
                        : job.status === "Closed"
                        ? "closed"
                        : "expired"
                    }`}
                  >
                    {job.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
