import React from "react";
import { Routes, Route } from "react-router-dom";

// auth
import Login from "/src/auth/Login";

// layout
import MainLayout from "/src/layout/MainLayout";

// pages
import Dashboard from "/src/pages/Dashboard";
import HomeBanner from "/src/pages/HomeBanner";
import JobPostFilter from "/src/pages/JobPostFilter";
import Logout from "/src/pages/Logout";
import RecruiterProfile from "/src/pages/RecruiterProfile";
import SeekerProfile from "/src/pages/SeekerProfile";
import SeekerSearchFilter from "/src/pages/SeekerSearchFilter";
import SubscriptionPlan from "/src/pages/SubscriptionPlan";

// editpages
import AddBanner from "/src/editpages/AddBanner";
import EditBanner from "/src/editpages/EditBanner";

// seekerSearchFilter filters
import ExperienceFilter from "./editpages/ExperienceFilter";
import EducationQualification from "./editpages/EducationQualification";
import CompartmentLevel from "./editpages/CompartmentLevel";
import Subject from "./editpages/Subject";
import ExpectedSalary from "./editpages/ExpectedSalary";

// seekerProfile
import GeneralInformation from "./editpages/GeneralInformation.jsx";

// recruiterProfile
import RecruiterGeneralInfo from "./editpages/RecruiterGeneralInfo.jsx";

const App = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Login />} />

      {/* Protected routes */}
      <Route path="/dashboard" element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        {/* main pages */}
        <Route path="home-banner" element={<HomeBanner />} />
        <Route path="job-post-filter" element={<JobPostFilter />} />
        <Route path="recruiter-profile" element={<RecruiterProfile />} />
        <Route path="seeker-profile" element={<SeekerProfile />} />
        <Route path="seeker-search-filter" element={<SeekerSearchFilter />} />
        <Route path="subscription-plan" element={<SubscriptionPlan />} />
        <Route path="logout" element={<Logout />} />

        {/* edit pages (nested under home-banner) */}
        <Route path="home-banner/add" element={<AddBanner />} />
        <Route path="home-banner/edit/:id" element={<EditBanner />} />

        {/* seeker filters nested */}
        <Route path="seeker-filters/experience" element={<ExperienceFilter />} />
        <Route path="seeker-filters/education" element={<EducationQualification />} />
        <Route path="seeker-filters/compartment" element={<CompartmentLevel />} />
        <Route path="/dashboard/seeker-filters/subject" element={<Subject />} />
        <Route path="/dashboard/seeker-filters/salary" element={<ExpectedSalary />} />
         
        {/* seeker profile nested */}
        <Route path="/dashboard/seeker-profile/:id" element={<GeneralInformation />} />

        {/* recruiter profile nested */}
        <Route path="/dashboard/recruiter-profile/:id" element={<RecruiterGeneralInfo />} />

      </Route>
    </Routes>
  );
};

export default App;
