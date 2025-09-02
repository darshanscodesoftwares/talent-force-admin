import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="hero-section">
          <Outlet /> 
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default MainLayout;
