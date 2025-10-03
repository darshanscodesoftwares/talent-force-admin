import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
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
import Education from "./pages/Education.jsx"

// education
import HighestEducation from "./education/HighestEducation.jsx"
import TeachingQualification from "./education/TeachingQualification.jsx"

// editpages
import AddBanner from "/src/editpages/AddBanner";
import EditBanner from "/src/editpages/EditBanner";

// seekerSearchFilter filters
import ExperienceFilter from "./editpages/ExperienceFilter";
import EducationQualification from "./editpages/EducationQualification";
import CompartmentLevel from "./editpages/CompartmentLevel";
import Subject from "./editpages/Subject";
import ExpectedSalary from "./editpages/ExpectedSalary";
import Languages from "./editpages/Languages.jsx";
import Proficiency from "./editpages/Languages.jsx";


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
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
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
            <Route path="education-filter" element={<Education />} />

            {/* edit pages */}
            <Route path="home-banner/add" element={<AddBanner />} />
            <Route path="home-banner/edit/:id" element={<EditBanner />} />

            <Route path="education" element={<Education />} />
            <Route path="highest-education" element={<HighestEducation />} />
            <Route path="teaching-qualification" element={<TeachingQualification />} />


            {/* seeker filters */}
            <Route path="seeker-search-filter/experience" element={<ExperienceFilter />} />
            <Route path="seeker-search-filter/education" element={<EducationQualification />} />
            <Route path="seeker-search-filter/compartment" element={<CompartmentLevel />} />
            <Route path="seeker-search-filter/subject" element={<Subject />} />
            <Route path="seeker-search-filter/salary" element={<ExpectedSalary />} />
            <Route path="seeker-search-filter/languages" element={<Languages />} />
            <Route path="seeker-search-filter/languages" element={<Proficiency />} />

            {/* recruiter filters */}
            <Route path="recruiter-filters/education" element={<EducationQualification />} />

            {/* profiles */}
            <Route path="seeker-profile/:id" element={<GeneralInformation />} />
            <Route path="recruiter-profile/:id" element={<RecruiterGeneralInfo />} />

            {/* job post filters */}
            <Route path="job-post-filter/experience" element={<JobPostExperienceFilter />} />
            <Route path="job-post-filter/subject" element={<JobPostSubjectFilter />} />
            <Route path="job-post-filter/salary" element={<JobPostExpectedSalary />} />
            <Route path="job-post-filter/compartment" element={<JobPostCompartmentLevel />} />
            <Route path="job-post-filter/education" element={<JobPostEducationQualification />} />
            <Route path="job-post-filter/worktype" element={<WorkTypeFilter />} />
            <Route path="job-post-filter/enddate" element={<JobPostEndDateFilter />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
