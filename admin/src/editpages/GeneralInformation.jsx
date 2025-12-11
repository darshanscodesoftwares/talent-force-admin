import "./GeneralInformation.css";
import { FaUserCircle } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaFilePdf } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { GeneralInformationContext } from "../UseContexts/SeekerUseContext/GeneralInformationContext";

export default function GeneralInformation() {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ dynamic user id from URL
  const { users, loading } = useContext(GeneralInformationContext);

  if (loading) return <p className="loading-text">Loading...</p>;

  // 🔑 find the right profile based on dynamic id
  const profile = users.find((u) => u.id === parseInt(id));

  if (!profile) return <p className="loading-text">Profile not found!</p>;

  return (
    <div className="generalinfo-container">
      {/* Header */}
      <div className="generalinfo-header">
        <h2
          onClick={() => navigate("/dashboard/seeker-profile")}
          className="generalinfo-back"
        >
          <IoChevronBackOutline className="back-icon" />
          <span>General Information</span>
        </h2>
        {/* <button className="block-btn">Block User</button> */}
      </div>

      {/* Profile Icon */}
      <div className="generalinfo-icon">
        {profile.profile_img ? (
          <img
            src={profile.profile_img}
            alt={`${profile.user}'s profile`}
            className="profile-img"
          />
        ) : (
          <FaUserCircle className="profile-icon" />
        )}
      </div>

      {/* Form */}
      <form className="generalinfo-form">
        <div className="generalinfo-row">
          <div className="generalinfo-field">
            <label>Name</label>
            <input type="text" value={profile.user} readOnly />
          </div>
          <div className="generalinfo-field">
            <label>Specialization</label>
            <input type="text" value={profile.specialization} readOnly />
          </div>
        </div>

        <div className="generalinfo-row">
          <div className="generalinfo-field">
            <label>Email ID</label>
            <input type="email" value={profile.mail} readOnly />
          </div>
          <div className="generalinfo-field">
            <label>Phone Number</label>
            <input type="text" value={profile.phoneNo} readOnly />
          </div>
        </div>

        <div className="generalinfo-row">
          <div className="generalinfo-field">
            <label>Highest Qualification (UG/PG)</label>
            <input type="text" value={profile.highestQualification} readOnly />
          </div>
          <div className="generalinfo-field">
            <label>Teaching Qualification</label>
            <input type="text" value={profile.teachingQualification} readOnly />
          </div>
        </div>

        {/* Resume */}
        <div className="generalinfo-row-resume">
          <div className="generalinfo-field-resume">
            <label>Resume</label>
            {profile.resume ? (
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-link"
              >
                <FaFilePdf className="pdf-icon" />
                <div className="resume-info">
                  <span className="resume-text">{profile.user}_resume.pdf</span>
                  <span className="resume-size">500 KB</span>
                </div>
              </a>
            ) : (
              <p className="resume-missing">No resume uploaded</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
