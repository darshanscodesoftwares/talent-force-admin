import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import HomeBannerProvider from "./UseContexts/SeekerUseContext/HomeBannerContext"
import SubjectProvider from "./UseContexts/RecruiterUseContext/JobPostContext/SubjectContext"
import WorkTypeProvider from "./UseContexts/RecruiterUseContext/JobPostContext/WorkTypeContext"
import EndDateProvider from "./UseContexts/RecruiterUseContext/JobPostContext/EndDateContext"
import HighestEducationProvider from "./UseContexts/SeekerUseContext/HighestEducationContext";
import TeachingQualificationProvider from "./UseContexts/SeekerUseContext/TeachingQualificationContext";
import CompartmentLevelProvider from "./UseContexts/RecruiterUseContext/JobPostContext/CompartmentContext"
import EducationQualificationProvider from "./UseContexts/RecruiterUseContext/JobPostContext/EducationQualificationContext";
import SeekerEduQualificationProvider from "./UseContexts/SeekerUseContext/SeekerEduQualificationContext"
import ExperienceProvider from "./UseContexts/SeekerUseContext/ExperienceContext"
import ExpectedSalaryProvider from "./UseContexts/SeekerUseContext/ExpectedSalaryContext";
import SeekerProfileProvider from "./UseContexts/SeekerUseContext/SeekerProfileContent";
import GeneralInformationProvider from "./UseContexts/SeekerUseContext/GeneralInformationContext"

ReactDOM.createRoot(document.getElementById("root")).render(

  <GeneralInformationProvider>
    <SeekerProfileProvider>
      <ExpectedSalaryProvider>
        <ExperienceProvider>
          <SeekerEduQualificationProvider>
            <EducationQualificationProvider>
              <CompartmentLevelProvider>
                <TeachingQualificationProvider>
                  <HighestEducationProvider>
                    <EndDateProvider>
                      <WorkTypeProvider>
                        <SubjectProvider>
                          <HomeBannerProvider>
                            <App />
                          </HomeBannerProvider>
                        </SubjectProvider>
                      </WorkTypeProvider>
                    </EndDateProvider>
                  </HighestEducationProvider>
                </TeachingQualificationProvider>
              </CompartmentLevelProvider>
            </EducationQualificationProvider>
          </SeekerEduQualificationProvider>
        </ExperienceProvider>
      </ExpectedSalaryProvider>
    </SeekerProfileProvider>
  </GeneralInformationProvider>

);
