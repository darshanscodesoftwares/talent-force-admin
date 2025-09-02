import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();

  // Map exact route paths
  const titles = {
    "/dashboard": "Dashboard",
    "/dashboard/subscription-plan": "Subscription Plans",
    "/dashboard/home-banner": "Home Banner",
    "/dashboard/seeker-search-filter": "Seeker Search Filter",
    "/dashboard/seeker-profile": "Seeker Profile",
    "/dashboard/job-post-filter": "Job Post Filter",
    "/dashboard/recruiter-profile": "Recruiter Profile",
  };

  let currentTitle = "Talent Force Admin";

  // Check if pathname starts with "/dashboard/home-banner"
  if (location.pathname.startsWith("/dashboard/add-banner")) {
    currentTitle = "Home Banner";
  } else {
    currentTitle = titles[location.pathname] || "Talent Force Admin";
  }

  return (
    <header className="header">
      <h1>{currentTitle}</h1>
    </header>
  );
}

export default Header;
