// GeneralInformation.jsx
import "./GeneralInformation.css";
import { FaUserCircle } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { FaFilePdf } from "react-icons/fa6";
import { seekerData } from "../data/contentData.js"; // import the seeker data

export default function GeneralInformation() {
    const navigate = useNavigate();
    const { id } = useParams(); // get seeker id from URL
    const seeker = seekerData.find((s) => s.id === parseInt(id));

    if (!seeker) {
        return <p>Seeker not found!</p>;
    }

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
                        <input type="text" value={seeker.user} readOnly />
                    </div>
                    <div className="generalinfo-field">
                        <label>Specialization</label>
                        <input type="text" value={seeker.Specialization} readOnly />
                    </div>
                </div>

                <div className="generalinfo-row">
                    <div className="generalinfo-field">
                        <label>Email ID</label>
                        <input type="email" value={seeker.mail} readOnly />
                    </div>
                    <div className="generalinfo-field">
                        <label>Phone Number</label>
                        <input type="text" value={seeker.phoneNo} readOnly />
                    </div>
                </div>
                <div className="generalinfo-row">
                    <div className="generalinfo-field">
                        <label>Highest Qualification (UG/PG)</label>
                        <input type="text" value={`Bsc-biology`} readOnly />
                    </div>
                    <div className="generalinfo-field">
                        <label>Teaching Qualification</label>
                        <input type="text" value={`B.ED`} readOnly />
                    </div>
                </div>


                <div className="generalinfo-row-resume">
                    <div className="generalinfo-field-resume">
                        <label>Resume</label>
                        <a
                            href={seeker.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="resume-link"
                        >
                            <FaFilePdf className="pdf-icon" />
                            <div className="resume-info">
                                <span className="resume-text">Resume</span>
                                <span className="resume-size">500 KB</span>
                            </div>
                        </a>
                    </div>

                </div>
            </form>
        </div>
    );
}
