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

import { chartData } from "../data/contentData";
import { DashboardLoader } from "../Loader/Loader";

// ✅ Import both contexts
import { SeekerProfileContext } from "../UseContexts/SeekerUseContext/SeekerProfileContent.jsx";
import { RecruiterProfileContext } from "../UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext.jsx";

const Dashboard = () => {
  const navigate = useNavigate();

  // ✅ Get both contexts
  const { seekers, loading: seekerLoading } = useContext(SeekerProfileContext);
  const { recruiters, loading: recruiterLoading } = useContext(RecruiterProfileContext);

  const [loading, setLoading] = useState(true);

  // Temporary loader delay
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  if (loading || seekerLoading || recruiterLoading) return <DashboardLoader />;

  return (
    <div className="dashboard-container">
      {/* --- Top Row Cards --- */}
      <div className="top-row">
        <div className="small-cards">
          {/* Total Seekers */}
          <div className="card">
            <div className="card-body">
              <div className="card-icon"><IoIosPeople /></div>
              <div className="font-num">
                <h4>Total Seeker</h4>
                <p><span className="amount">{seekers.length}</span></p>
              </div>
            </div>
            <div className="card-footer">
              <button onClick={() => navigate("/dashboard/seeker-profile")}>View More</button>
            </div>
          </div>

          {/* Total Recruiters */}
          <div className="card">
            <div className="card-body">
              <div className="card-icon"><HiMiniBriefcase /></div>
              <div className="font-num">
                <h4>Total Recruiter</h4>
                <p><span className="amount">{recruiters.length}</span></p>
              </div>
            </div>
            <div className="card-footer">
              <button onClick={() => navigate("/dashboard/recruiter-profile")}>View More</button>
            </div>
          </div>

          {/* Subscribed Users */}
          <div className="card-2">
            <div className="card-body2">
              <div className="card-icon2"><MdPeopleAlt /></div>
              <div className="font-num2">
                <h4>Subscribed Users</h4>
                <p>
                  <span className="amount2">
                    {recruiters.filter((r) => r.membership === "Advanced").length}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Total Revenue (static placeholder) */}
          <div className="card-2">
            <div className="card-body2">
              <div className="card-icon2"><TbCoinRupeeFilled /></div>
              <div className="font-num2">
                <h4>Total Revenue</h4>
                <p>
                  <span className="currency2"><LuIndianRupee /></span>
                  <span className="amount2">50,000</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Graph Box --- */}
        <div className="graph-box">
          <h3>User Active</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
              barSize={8}
            >
              <CartesianGrid
                stroke="#ccc"
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#6666668b" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6666668b" }}
                domain={[0, 800]}
                tickCount={9}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip contentStyle={{ fontSize: "13px" }} />
              <Legend
                iconType="circle"
                iconSize={6}
                wrapperStyle={{ fontSize: "12px", color: "#666" }}
                formatter={(value) => (
                  <span style={{ color: "#666" }}>{value}</span>
                )}
              />
              <Bar dataKey="recruiter" fill="#e5671eff" radius={[20, 20, 20, 20]} />
              <Bar dataKey="seeker" fill="#3dca5eff" radius={[20, 20, 20, 20]} />
            </BarChart>
          </ResponsiveContainer>
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
        {/* SCHOOL NAME + IMAGE */}
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

        {/* EMAIL */}
        <td>{rec.schoolEmail}</td>

        {/* PHONE */}
        <td>{rec.phoneNumber}</td>

        {/* PINCODE */}
        <td>{rec.jobPosts?.[0]?.pincode?.pincode || "N/A"}</td>

        {/* MEMBERSHIP */}
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
        {/* USER NAME + IMAGE */}
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

        {/* SPECIALIZATION */}
        <td>{seeker.specialization || "N/A"}</td>

        {/* EMAIL */}
        <td>{seeker.email || "N/A"}</td>

        {/* PHONE */}
        <td>{seeker.phone || "N/A"}</td>

        {/* PINCODE */}
        <td>{seeker.pincode || "N/A"}</td>

        {/* STATUS */}
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
