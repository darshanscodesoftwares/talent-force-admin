// src/editpages/RecruiterGeneralInfo.jsx
import "./RecruiterGeneralInfo.css";
import { FaUserCircle } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

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
        <button className="block-btn">Block Recruiter</button>
      </div>

      {/* Profile Icon */}
      <div className="recruitergeneralinfo-icon">
        <FaUserCircle className="profile-icon" />
        <p className="recruiter-id">Recruiter ID: {id}</p>
      </div>

      {/* Form */}
      <form className="recruitergeneralinfo-form">
        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label>Company Name</label>
            <input type="text" placeholder="Enter company name" />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>Recruiter Name</label>
            <input type="text" placeholder="Enter recruiter name" />
          </div>
        </div>

        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label>Email</label>
            <input type="email" placeholder="Enter recruiter email" />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>Phone</label>
            <input type="text" placeholder="Enter phone number" />
          </div>
        </div>

        <div className="recruitergeneralinfo-row">
          <div className="recruitergeneralinfo-field">
            <label>Address</label>
            <input type="text" placeholder="Enter address" />
          </div>
          <div className="recruitergeneralinfo-field">
            <label>Membership</label>
            <input type="text" placeholder="Basic / Advanced" />
          </div>
        </div>
      </form>
    </div>
  );
}
