import React, { useState, useEffect, useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaUserCircle, FaSchool } from "react-icons/fa";
import { HiMiniBriefcase } from "react-icons/hi2";
import { MdPeopleAlt } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { LuIndianRupee } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import { DashboardLoader } from "../Loader/Loader";
import { SeekerProfileContext } from "../UseContexts/SeekerUseContext/SeekerProfileContent.jsx";
import { RecruiterProfileContext } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext.jsx";
import { useDashboardGraph } from "../UseContexts/GeneralUseContext/DashBoardContext/DashboardGraphContext.jsx";
import { useDashboardMetrics } from "../UseContexts/GeneralUseContext/DashBoardContext/DashboardMetricDataContext.jsx";

const Dashboard = () => {
  const navigate = useNavigate();

  // ---- ALL HOOKS MUST BE AT TOP ---- //
  const { seekers, loading: seekerLoading } = useContext(SeekerProfileContext);
  const { recruiters, loading: recruiterLoading } = useContext(RecruiterProfileContext);

  const {
    graphData,
    selectedYear,
    maxScale,
    loading: graphLoading,
    hasData,
    fetchGraphData,
    setSelectedYear,
  } = useDashboardGraph();

  const { metrics, loadingMetrics, errorMetrics } = useDashboardMetrics();

  // small loader delay for UI
  const [loadingUI, setLoadingUI] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoadingUI(false), 400);
    return () => clearTimeout(timer);
  }, []);

  // ---- COMBINED LOADING ---- //
  if (
    loadingUI ||
    seekerLoading ||
    recruiterLoading ||
    graphLoading ||
    loadingMetrics
  ) {
    return <DashboardLoader />;
  }

  // ---- ERROR STATE ---- //
  if (errorMetrics) {
    return <p>Error loading dashboard metrics: {errorMetrics}</p>;
  }

  // ---- UI ---- //
  return (
    <div className="dashboard-container">

      {/* --- TOP ROW CARDS --- */}
      <div className="top-row">
        <div className="small-cards">

          {/* Total Seekers */}
          <div className="card">
            <div className="card-body">
              <div className="card-icon"><IoIosPeople /></div>
              <div className="font-num">
                <h4>Total Seeker</h4>
                <p><span className="amount">{metrics?.total_users ?? 0}</span></p>
              </div>
            </div>
            <div className="card-footer">
              <button onClick={() => navigate("/dashboard/seeker-profile")}>
                View More
              </button>
            </div>
          </div>

          {/* Total Recruiters */}
          <div className="card">
            <div className="card-body">
              <div className="card-icon"><HiMiniBriefcase /></div>
              <div className="font-num">
                <h4>Total Recruiter</h4>
                <p><span className="amount">{metrics?.total_recruiters ?? 0}</span></p>
              </div>
            </div>
            <div className="card-footer">
              <button onClick={() => navigate("/dashboard/recruiter-profile")}>
                View More
              </button>
            </div>
          </div>

          {/* Subscribed Users */}
          <div className="card-2">
            <div className="card-body2">
              <div className="card-icon2"><MdPeopleAlt /></div>
              <div className="font-num2">
                <h4>Subscribed Users</h4>
                <p><span className="amount2">{metrics?.subscribed_recruiters ?? 0}</span></p>
              </div>
            </div>
          </div>

          {/* Total Revenue */}
          <div className="card-2">
            <div className="card-body2">
              <div className="card-icon2"><TbCoinRupeeFilled /></div>
              <div className="font-num2">
                <h4>Total Revenue</h4>
                <p className="currency-wrap">
                  <span className="currency2"><LuIndianRupee /></span>
                  <span className="amount2">{metrics?.total_revenue ?? "0.00"}</span>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* --- GRAPH SECTION --- */}
        <div className="graph-box">
          <h3>User Active - {selectedYear}</h3>

          {!hasData ? (
            <div className="no-data-overlay">
              <p>No data available for {selectedYear}</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={graphData}
                margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                barSize={8}
              >
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#6666668b" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6666668b" }}
                  domain={[0, maxScale]}
                  tickCount={8}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip contentStyle={{ fontSize: "13px" }} />
                <Legend
                  iconType="circle"
                  iconSize={6}
                  wrapperStyle={{ fontSize: "12px", color: "#666" }}
                  formatter={(value) => <span style={{ color: "#666" }}>{value}</span>}
                />
                <Bar dataKey="recruiter" fill="#e5671eff" radius={[20, 20, 20, 20]} />
                <Bar dataKey="seeker" fill="#3dca5eff" radius={[20, 20, 20, 20]} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* --- Year Selector --- */}
          <div className="year-selector">
            <button
              className={`year-nav-btn prev ${selectedYear > 2024 ? "enabled" : ""}`}
              onClick={() => {
                const newYear = selectedYear - 1;
                if (newYear >= 2024) {
                  setSelectedYear(newYear);
                  fetchGraphData(newYear);
                }
              }}
              disabled={selectedYear <= 2024}
            >
              ← {selectedYear - 1}
            </button>

            <span className="year-current">{selectedYear}</span>

            <button
              className={`year-nav-btn next ${selectedYear < 2025 ? "enabled" : ""}`}
              onClick={() => {
                const newYear = selectedYear + 1;
                if (newYear <= 2025) {
                  setSelectedYear(newYear);
                  fetchGraphData(newYear);
                }
              }}
              disabled={selectedYear >= 2025}
            >
              {selectedYear + 1} →
            </button>
          </div>
        </div>
      </div>

      {/* --- Recruiters + Seekers Section --- */}
      <div className="rec-seek">
        {/* --- Recruiters Table --- */}
        <div className="dashboard-section">
          <div className="title-button2 flex justify-between">
            <h2>All Recruiter List</h2>
            <div className="card-footer2">
              <button onClick={() => navigate("/dashboard/recruiter-profile")}>
                View More
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="recruiter-table">
              <thead>
                <tr>
                  <th>School</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Pincode</th>
                  <th>Membership</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.slice(0, 5).map((rec) => (
                  <tr
                    key={rec.id}
                    className="recruiterprofile-row"
                    onClick={() => navigate(`/dashboard/recruiter-profile/${rec.id}`)}
                  >
                    <td>
                      <div className="icon-school">
                        {rec.schoolImage ? (
                          <img
                            src={rec.schoolImage}
                            alt={rec.schoolName}
                            className="school-logo"
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              marginRight: "8px",
                              objectFit: "cover",
                            }}
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <FaSchool className="school-logo" />
                        )}
                        {rec.schoolName}
                      </div>
                    </td>
                    <td>{rec.schoolEmail}</td>
                    <td>{rec.phoneNumber}</td>
                    <td>{rec.jobPosts?.[0]?.pincode?.pincode || "N/A"}</td>
                    <td>
                      {rec.membership === "Advanced" ? (
                        <span className="membership advanced">👑 Advanced</span>
                      ) : (
                        <span className="membership basic">● Basic</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Seekers Table --- */}
        <div className="dashboard-section">
          <div className="title-button2 flex justify-between">
            <h2>All Seeker List</h2>
            <div className="card-footer2">
              <button onClick={() => navigate("/dashboard/seeker-profile")}>
                View More
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="recruiter-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Specialization</th>
                  <th>Mail ID</th>
                  <th>Phone</th>
                  <th>Pincode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {seekers.slice(0, 5).map((seeker) => (
                  <tr
                    key={seeker.id}
                    className="seekerprofile-row"
                    onClick={() => navigate(`/dashboard/seeker-profile/${seeker.id}`)}
                  >
                    <td>
                      <div className="icon-school">
                        {seeker.profile_img ? (
                          <img
                            src={seeker.profile_img}
                            alt={seeker.name}
                            className="seekerprofile-avatar"
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              marginRight: "8px",
                              objectFit: "cover",
                            }}
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        ) : (
                          <FaUserCircle className="school-logo" />
                        )}
                        {seeker.name}
                      </div>
                    </td>
                    <td>{seeker.specialization || "N/A"}</td>
                    <td>{seeker.email || "N/A"}</td>
                    <td>{seeker.phone || "N/A"}</td>
                    <td>{seeker.pincode || "N/A"}</td>
                    <td>
                      {seeker.status === "Seeking" ? (
                        <span className="status seeking">Seeking</span>
                      ) : (
                        <span className="status not-seeking">Not Seeking</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
