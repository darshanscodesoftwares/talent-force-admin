import { IoIosPeople } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { TbCoinRupeeFilled } from "react-icons/tb";
import "./SubscriptionPlan.css";
import { useState } from "react";
import { subscribers } from "../data/contentData.js";

import SubscriptionModal from "../editpages/SubscriptionModal.jsx";

export default function SubscriptionPlan() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);

  const handleEdit = (sub) => {
    setSelectedSub(sub);
    setIsModalOpen(true);
  };

  const handleSave = (updatedSub) => {
    console.log("Save clicked with:", updatedSub);
    setIsModalOpen(false);
    setSelectedSub(null);
    // later: update state/data with new values
  };

  const handleDelete = (id) => {
    console.log("Delete clicked for:", id);
    // later: remove sub from state
  };

  return (
    <div className="subscription-container">
      <div className="subscription-top-row">
        <div className="subscription-small-cards">

          <div className="subscription-cards-container">

            {/* Card 1 */}
            <div className="subscription-card">
              <div className="subscription-card-body">
                <div className="subscription-card-left">
                  <div className="subscription-card-icon">
                    <IoIosPeople />
                  </div>
                  <h4>Subscribed Users</h4>
                </div>
                <p className="subscription-amount">200</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="subscription-card">
              <div className="subscription-card-body">
                <div className="subscription-card-left">
                  <div className="subscription-card-icon">
                    <TbCoinRupeeFilled />
                  </div>
                  <h4>Total Revenue</h4>
                </div>
                <p className="subscription-amount">50,000</p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <div className="subscription-rec-seek">
        {/* Recruiter List Table */}
        <div className="subscription-section">
          <h2>Subscription List</h2>
          <div className="subscription-table-container">
            <table className="subscription-table">
              <thead>
                <tr>
                  {/* <th></th> */}
                  <th>Plan Name</th>
                  <th>Membership</th>
                  <th>Price</th>
                  <th>Posted On</th>
                  <th>Created By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id}>
                    {/* <td><input type="checkbox" /></td> */}
                    <td>{sub.name}</td>
                    <td>
                      {sub.membership === "Advance" ? (
                        <span className="subscription-membership advanced">👑 Advance</span>
                      ) : (
                        <span className="subscription-membership basic">● Basic</span>
                      )}
                    </td>
                    <td>{sub.price}</td>
                    <td>{sub.postedOn}</td>
                    <td>{sub.createdBy}</td>
                    <td className="subscription-actions">
                      <button
                        className="subscription-btn edit-btn"
                        onClick={() => handleEdit(sub)}
                      >
                        <BiSolidEdit />
                      </button>
                      <button
                        className="subscription-btn delete-btn"
                        onClick={() => handleDelete(sub.id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <SubscriptionModal
          subscription={selectedSub}
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
