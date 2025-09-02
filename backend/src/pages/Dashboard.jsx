import React from "react";
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
import "./Dashboard.css";

import { chartData, recruiters, seekers } from "../data/contentData";


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="top-row">

        <div className="small-cards">
          <div className="card">
            <div className="card-body">
              <div className="card-icon">
                <IoIosPeople />
              </div>
              <div className="font-num">
                <h4>Total Seeker</h4>
                <p>
                  <span className="amount">{`13,902`}</span>
                </p>
              </div>
            </div>
            <div className="card-footer">View More</div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="card-icon">
                <HiMiniBriefcase />
              </div>
              <div className="font-num">
                <h4>Total Recruiter</h4>
                <p>
                  <span className="amount">{`913`}</span>
                </p>
              </div>
            </div>
            <div className="card-footer">View More</div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="card-icon">
                <MdPeopleAlt />
              </div>
              <div className="font-num">
                <h4>Subscribed Users</h4>
                <p>
                  <span className="amount">{`200`}</span>
                </p>
              </div>
            </div>
            <div className="card-footer">View More</div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="card-icon">
                <TbCoinRupeeFilled />
              </div>
              <div className="font-num">
                <h4>Total Revenue</h4>
                <p>
                  <span className="currency"><LuIndianRupee /></span>
                  <span className="amount">{`50,000`}</span>
                </p>
              </div>
            </div>
            <div className="card-footer">View More</div>
          </div>
        </div>


        {/* Graph box */}
        <div className="graph-box">
          <h3>User Active</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
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
                  <span style={{ color: "#666" }}>{value}</span> // text grey
                )}
              />

              <Bar dataKey="seeker" fill="#e5671eff" radius={[20, 20, 20, 20]} />
              <Bar dataKey="recruiter" fill="#3dca5eff" radius={[20, 20, 20, 20]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rec-seek">

        {/* Recruiter List Table */}
        <div className="dashboard-section">
          <h2>All Recruiter List</h2>
          <div className="table-container">
            <table className="recruiter-table">
              <thead>
                <tr>
                  {/* <th></th> */}
                  <th>School Name</th>
                  <th>Mail ID</th>
                  <th>Phone</th>
                  <th>Pincode</th>
                  <th>Membership</th>
                </tr>
              </thead>
              <tbody>
                {recruiters.map((rec) => (
                  <tr key={rec.id}>
                    {/* <td>
                      <input type="checkbox" />
                    </td> */}
                    <td>
                      <FaSchool className="school-logo" /> {rec.school}
                    </td>
                    <td>{rec.email}</td>
                    <td>{rec.phone}</td>
                    <td>{rec.pincode}</td>
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


        {/* Seekers */}
        <div className="dashboard-section">
          <h2>All Seeker List</h2>
          <div className="table-container">
            <table className="recruiter-table">
              <thead>
                <tr>
                  {/* <th></th> */}
                  <th>User Name</th>
                  <th>Specialization</th>
                  <th>Mail ID</th>
                  <th>Phone</th>
                  <th>Pincode</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {seekers.map((seeker) => (
                  <tr key={seeker.id}>
                    {/* <td>
                      <input type="checkbox" />
                    </td> */}
                    <td>
                      <FaUserCircle className="school-logo" /> {seeker.user}
                    </td>
                    <td>{seeker.Specialization}</td>
                    <td>{seeker.mail}</td>
                    <td>{seeker.phoneNo}</td>
                    <td>{seeker.pincodeNo}</td>
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
