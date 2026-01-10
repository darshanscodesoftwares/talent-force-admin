import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import HomeBannerProvider from "./UseContexts/SeekerUseContext/HomeBannerContext";
import SubjectProvider from "./UseContexts/RecruiterUseContext/JobPostContext/SubjectContext";
import WorkTypeProvider from "./UseContexts/RecruiterUseContext/JobPostContext/WorkTypeContext";
import EndDateProvider from "./UseContexts/RecruiterUseContext/JobPostContext/EndDateContext";
import HighestEducationProvider from "./UseContexts/SeekerUseContext/HighestEducationContext";
import TeachingQualificationProvider from "./UseContexts/SeekerUseContext/TeachingQualificationContext";
import CompartmentLevelProvider from "./UseContexts/RecruiterUseContext/JobPostContext/CompartmentContext";
import EducationQualificationProvider from "./UseContexts/RecruiterUseContext/JobPostContext/EducationQualificationContext";
import SeekerEduQualificationProvider from "./UseContexts/SeekerUseContext/SeekerEduQualificationContext";
import ExperienceProvider from "./UseContexts/SeekerUseContext/ExperienceContext";
import ExpectedSalaryProvider from "./UseContexts/SeekerUseContext/ExpectedSalaryContext";
import SeekerProfileProvider from "./UseContexts/SeekerUseContext/SeekerProfileContent";
import GeneralInformationProvider from "./UseContexts/SeekerUseContext/GeneralInformationContext";
import LanguageProvider from "./UseContexts/SeekerUseContext/LanguageContext";
import ProficiencyProvider from "./UseContexts/SeekerUseContext/ProficiencyContext";
import RecruiterProfileProvider from "./UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext";
import RecruiterJobPostsProvider from "./UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterJobPostsContext";
import SubscriptionPlanProvider from "./UseContexts/GeneralUseContext/SubscriptionPlansContext/SubscriptionPlanContext";
import DashboardGraphProvider from "./UseContexts/GeneralUseContext/DashBoardContext/DashboardGraphContext";
import DashboardMetricProvider from "./UseContexts/GeneralUseContext/DashBoardContext/DashboardMetricDataContext";
import HomeBannerRecruiterProvider from "./UseContexts/SeekerUseContext/HomeBannerRecruiterProvider";
import SeekerTermsConditionContext from "./UseContexts/SeekerTerms&ConditionContext/SeekerTermsConditionContext";
import SeekerPrivacyPolicyContext from "./UseContexts/SeekerTerms&ConditionContext/SeekerPrivacyPolicyContext";
import RecruiterTermsConditionContext from "./UseContexts/RecruiterTerms&ConditionContext/RecruiterTermsConditionContext";
import RecruiterPrivacyPolicyContext from "./UseContexts/RecruiterTerms&ConditionContext/RecruiterPrivacyPolicyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RecruiterPrivacyPolicyContext>
    <RecruiterTermsConditionContext>
      <SeekerPrivacyPolicyContext>
        <SeekerTermsConditionContext>
          <HomeBannerRecruiterProvider>
            <DashboardMetricProvider>
              <DashboardGraphProvider>
                <SubscriptionPlanProvider>
                  <RecruiterJobPostsProvider>
                    <RecruiterProfileProvider>
                      <ProficiencyProvider>
                        <LanguageProvider>
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
                        </LanguageProvider>
                      </ProficiencyProvider>
                    </RecruiterProfileProvider>
                  </RecruiterJobPostsProvider>
                </SubscriptionPlanProvider>
              </DashboardGraphProvider>
            </DashboardMetricProvider>
          </HomeBannerRecruiterProvider>
        </SeekerTermsConditionContext>
      </SeekerPrivacyPolicyContext>
    </RecruiterTermsConditionContext>
  </RecruiterPrivacyPolicyContext>
);
