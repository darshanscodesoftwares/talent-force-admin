import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {FaFileInvoiceDollar,FaFilter} from "react-icons/fa";
import { IoPeopleSharp } from "react-icons/io5";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { RiEqualizer2Fill } from "react-icons/ri";
import { HiMiniBriefcase } from "react-icons/hi2";
import { SlLogout } from "react-icons/sl"; 
import "./Sidebar.css";
import logo from "../assets/logo-design.png";

function Sidebar() {

    const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault(); // stop NavLink default
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // clear any session/localStorage if you use
      navigate("/"); // redirect to login
    }
  };

  return (
    <aside className="sidebar">
      <nav>
        <img src={logo} alt="template Logo" className="sidebar-logo" />
        {/* General */}
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

        {/* Seeker App */}
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

        {/* Recruiter App */}
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

        {/* Other */}
        <div className="sidebar-section">
          <p className="section-title">OTHER</p>
          <ul>
            <li>
              <a href="/" onClick={handleLogout} className="nav-link">
                <SlLogout className="icon" /> Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
