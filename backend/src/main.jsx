import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import HomeBannerProvider from "./UseContexts/SeekerUseContext/HomeBannerContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <HomeBannerProvider>
    <App />
  </HomeBannerProvider>

);
