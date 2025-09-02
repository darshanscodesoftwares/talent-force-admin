// GeneralInformation.jsx
import "./GeneralInformation.css";
import { FaUserCircle } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function GeneralInformation() {
    const navigate = useNavigate();

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
                <button className="block-btn">Block User</button>
            </div>
            {/* Profile Icon */}
            <div className="generalinfo-icon">
                <FaUserCircle className="profile-icon" />
            </div>

            {/* Form */}
            <form className="generalinfo-form">
                <div className="generalinfo-row">
                    <div className="generalinfo-field">
                        <label>Name</label>
                        <input type="text" placeholder="Enter full name" />
                    </div>
                    <div className="generalinfo-field">
                        <label>Address</label>
                        <input type="text" placeholder="Enter address" />
                    </div>
                </div>

                <div className="generalinfo-row">
                    <div className="generalinfo-field">
                        <label>Email ID</label>
                        <input type="email" placeholder="Enter email" />
                    </div>
                    <div className="generalinfo-field">
                        <label>Phone Number</label>
                        <input type="text" placeholder="Enter phone number" />
                    </div>
                </div>

                <div className="generalinfo-row">
                    <div className="generalinfo-field">
                        <label>Highest Qualification (UG/PG)</label>
                        <input type="text" placeholder="Enter qualification" />
                    </div>
                    <div className="generalinfo-field">
                        <label>Teaching Qualification</label>
                        <input type="text" placeholder="Enter teaching qualification" />
                    </div>
                </div>

                <div className="generalinfo-row">
                    <div className="generalinfo-field full">
                        <label>Resume</label>
                        <input type="file" accept="application/pdf" />
                    </div>
                </div>
            </form>
        </div>
    );
}
