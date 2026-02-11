import "./RecruiterGeneralInfo.css";
import { FaSchool } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useRecruiterJobPosts } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterJobPostsContext.jsx";
import RecruiterProfileLoader from "../Loader/Loader.jsx"; // optional loader
import { useContext } from "react";
import { RecruiterProfileContext } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext.jsx";

export default function RecruiterGeneralInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // recruiter_id from URL
  const { recruiters, loading, error } = useRecruiterJobPosts();

  // const { toggleBlockRecruiter, blockRecruitersList } = useContext(
  //   RecruiterProfileContext
  // );
  const { toggleBlockRecruiter, recruiters: formattedRecruiters } = useContext(
    RecruiterProfileContext
  );

  if (loading) return <RecruiterProfileLoader />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  const recruiter = recruiters.find((r) => r.recruiter_id === Number(id));
  const formattedRecruiter = formattedRecruiters.find(
    (r) => r.id === Number(id)
  );

  // const recruiter = recruiters.find((r) => r.id === Number(id));

  if (!recruiter) return <p>Recruiter not found.</p>;

  const { school_profile, stats, job_posts } = recruiter;

  const handleBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      navigate("/dashboard/recruiter-profile"); // fallback
    }
  };

  return (
    <div className="recruitergeneralinfo-container">
      {/* Header */}
      <div className="recruitergeneralinfo-header">
        <h2 onClick={handleBack} className="recruitergeneralinfo-back">
          <IoChevronBackOutline className="back-icon" />
          <span>Recruiter Information</span>
        </h2>

        <button
          className="block-btn"
          onClick={() =>
            toggleBlockRecruiter(
              formattedRecruiter?.id,
              formattedRecruiter?.status
            )
          }
        >
          {formattedRecruiter?.status === "blocked" ? "Unblock" : "Block"}
        </button>
      </div>

      {/* Profile Icon */}
      <div className="recruitergeneralinfo-icon">
        {school_profile?.school_image ? (
          <img
            src={school_profile.school_image}
            alt={school_profile.school_name}
            className="profile-icon"
            style={{
              width: "90px",
              height: "90px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <FaSchool className="profile-icon" />
        )}
      </div>

      {/* Form */}
      <form className="recruitergeneralinfo-form">
        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label>School Name</label>
            <input
              type="text"
              value={school_profile?.school_name || "N/A"}
              readOnly
            />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>Address</label>
            <input
              type="text"
              value={school_profile?.school_address || "N/A"}
              readOnly
            />
          </div>
        </div>

        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label>Email Id</label>
            <input
              type="email"
              value={school_profile?.school_email || "N/A"}
              readOnly
            />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>Number</label>
            <input
              type="text"
              value={
                school_profile?.school_phone_number ||
                recruiter.phone_number ||
                "N/A"
              }
              readOnly
            />
          </div>
        </div>

        {/* Detail Cards */}
        <div className="detailCard-wrap">
          <div className="detail-card">
            <h2>{stats?.total_job_posts || 0}</h2>
            <span>Total</span>
            <span>Job Posts</span>
          </div>

          <div className="detail-card">
            <h2>{stats?.open_job_posts || 0}</h2>
            <span>Open</span>
            <span>Job Posts</span>
          </div>

          <div className="detail-card">
            <h2>{stats?.total_applications || 0}</h2>
            <span>Total</span>
            <span>Applicants</span>
          </div>

          <div className="detail-card">
            <h2>{stats?.selected_candidates || 0}</h2>
            <span>Selected</span>
            <span>Candidates</span>
          </div>

          <div className="detail-card">
            <h2>{job_posts?.length || 0}</h2>
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
                <th>Subject</th>
                <th>Posted Date</th>
                <th>Applicants</th>
                <th>Selected</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {job_posts && job_posts.length > 0 ? (
                job_posts.map((job) => (
                  <tr key={job.job_post_id} className="recruiter-jobs-row">
                    <td>{job.job_role}</td>
                    <td>{job.subject}</td>
                    <td>{job.post_date}</td>
                    <td>{job.applicants_count}</td>
                    <td>{job.selected_count}</td>
                    <td
                      className={`job-status ${
                        job.current_status === "Active"
                          ? "active"
                          : job.current_status === "Closed"
                          ? "closed"
                          : "expired"
                      }`}
                    >
                      {job.current_status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    style={{ textAlign: "center", color: "#999" }}
                  >
                    No Job Posts Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
