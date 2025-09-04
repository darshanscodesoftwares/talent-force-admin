import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaFileInvoiceDollar, FaFilter } from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiEqualizer2Fill } from "react-icons/ri";
import { HiMiniBriefcase } from "react-icons/hi2";
import { SlLogout } from "react-icons/sl";
import "./Sidebar.css";
import logo from "../assets/talentforce.png";

import LogoutModal from "../editpages/LogoutModal"; // import modal

function Sidebar() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // state to show modal

  const handleLogout = () => {
    // Close modal and logout
    setShowLogoutModal(false);
    localStorage.removeItem("authToken"); // optional
    navigate("/");
    toast.success("Logged out successfully!");
  };

  return (
    <aside className="sidebar">
      <nav>
        <img src={logo} alt="template Logo" className="sidebar-logo" />

        {/* GENERAL */}
        <div className="sidebar-section">
          <p className="section-title">GENERAL</p>
          <ul>
            <li>
              <NavLink to="/dashboard" end className="nav-link">
                <TbLayoutDashboardFilled className="icon-b" /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/subscription-plan" className="nav-link">
                <FaFileInvoiceDollar className="icon" /> Subscription Plans
              </NavLink>
            </li>
          </ul>
        </div>

        {/* SEEKER APP */}
        <div className="sidebar-section">
          <p className="section-title">SEEKER APP</p>
          <ul>
            <li>
              <NavLink to="/dashboard/home-banner" className="nav-link">
                <SiHomeassistantcommunitystore className="icon" /> Home Banner
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/seeker-search-filter" className="nav-link">
                <FaFilter className="icon" /> Seeker Search Filter
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/seeker-profile" className="nav-link">
                <IoPeopleSharp className="icon" /> Seeker Profile
              </NavLink>
            </li>
          </ul>
        </div>

        {/* RECRUITER APP */}
        <div className="sidebar-section">
          <p className="section-title">RECRUITER APP</p>
          <ul>
            <li>
              <NavLink to="/dashboard/job-post-filter" className="nav-link">
                <RiEqualizer2Fill className="icon-b" /> Job Post Filter
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/recruiter-profile" className="nav-link">
                <HiMiniBriefcase className="icon" /> Recruiter Profile
              </NavLink>
            </li>
          </ul>
        </div>

        {/* OTHER */}
        <div className="sidebar-section">
          <p className="section-title">OTHER</p>
          <ul>
            <li>
              <button
                onClick={() => setShowLogoutModal(true)}
                className="logout-btn"
              >
                <SlLogout className="icon" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      />
    </aside>
  );
}

export default Sidebar;
