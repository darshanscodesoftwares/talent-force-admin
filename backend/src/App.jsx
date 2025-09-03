import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// auth
import Login from "/src/auth/Login";

// layout
import MainLayout from "/src/layout/MainLayout";

// pages
import Dashboard from "/src/pages/Dashboard";
import HomeBanner from "/src/pages/HomeBanner";
import JobPostFilter from "/src/pages/JobPostFilter";
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

// profiles
import GeneralInformation from "./editpages/GeneralInformation.jsx";
import RecruiterGeneralInfo from "./editpages/RecruiterGeneralInfo.jsx";

// jobPostFilter 
import JobPostExperienceFilter from "./filterpages/JobPostExperience.jsx";
import JobPostSubjectFilter from "./filterpages/JobPostSubject.jsx";
import JobPostExpectedSalary from './filterpages/JobPostExpectedSalary.jsx';
import JobPostCompartmentLevel from "./filterpages/JobPostCompartmentLevel.jsx";
import JobPostEducationQualification from "./filterpages/JobPostEducationQualification.jsx";
import WorkTypeFilter from "./filterpages/WorkTypeFilter.jsx";
import JobPostEndDateFilter from "./filterpages/JobPostEndDateFilter.jsx";

const App = () => {
  return (
    <>
      {/* Toast container - top level */}
      <ToastContainer 
        position="top-right" 
        autoClose={1000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />

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

          {/* edit pages */}
          <Route path="home-banner/add" element={<AddBanner />} />
          <Route path="home-banner/edit/:id" element={<EditBanner />} />

          {/* seeker filters */}
          <Route path="seeker-filters/experience" element={<ExperienceFilter />} />
          <Route path="seeker-filters/education" element={<EducationQualification />} />
          <Route path="seeker-filters/compartment" element={<CompartmentLevel />} />
          <Route path="seeker-filters/subject" element={<Subject />} />
          <Route path="seeker-filters/salary" element={<ExpectedSalary />} />

          {/* recruiter filters */}
          <Route path="recruiter-filters/education" element={<EducationQualification />} />

          {/* nested profiles */}
          <Route path="seeker-profile/:id" element={<GeneralInformation />} />
          <Route path="recruiter-profile/:id" element={<RecruiterGeneralInfo />} />

          {/* job post filters */}
          <Route path="jobpost-filters/experience" element={<JobPostExperienceFilter />} />
          <Route path="jobpost-filters/subject" element={<JobPostSubjectFilter />} />
          <Route path="jobpost-filters/salary" element={<JobPostExpectedSalary />} />
          <Route path="jobpost-filters/compartment" element={<JobPostCompartmentLevel />} />
          <Route path="jobpost-filters/education" element={<JobPostEducationQualification />} />
          <Route path="jobpost-filters/worktype" element={<WorkTypeFilter />} />
          <Route path="jobpost-filters/enddate" element={<JobPostEndDateFilter />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
