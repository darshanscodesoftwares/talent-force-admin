import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import HomeBannerProvider from "./UseContexts/SeekerUseContext/HomeBannerContext"
import SubjectProvider from "./UseContexts/RecruiterUseContext/JobPostContext/SubjectContext"
import WorkTypeProvider from "./UseContexts/RecruiterUseContext/JobPostContext/WorkTypeContext"
import EndDateProvider from "./UseContexts/RecruiterUseContext/JobPostContext/EndDateContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <EndDateProvider>
  <WorkTypeProvider>
  <SubjectProvider>
  <HomeBannerProvider>
    <App />
  </HomeBannerProvider>
  </SubjectProvider>
  </WorkTypeProvider>
  </EndDateProvider>

);
