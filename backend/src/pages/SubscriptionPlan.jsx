import { IoIosPeople } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { TbCoinRupeeFilled } from "react-icons/tb";
import "./SubscriptionPlan.css";
import { useState } from "react";
import { subscribers as initialSubscribers } from "../data/contentData.js";

import SubscriptionModal from "../editpages/SubscriptionModal.jsx";
import SubscriptionAddModal from "../editpages/SubscriptionAddModal.jsx";

export default function SubscriptionPlan() {
  const [subscribers, setSubscribers] = useState(initialSubscribers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Edit subscription
  const handleEdit = (sub) => {
    setSelectedSub(sub);
    setIsModalOpen(true);
  };

  const handleSave = (updatedSub) => {
    setSubscribers((prev) =>
      prev.map((s) => (s.id === updatedSub.id ? updatedSub : s))
    );
    setIsModalOpen(false);
    setSelectedSub(null);
  };

  // Add subscription
  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveAdd = (newSub) => {
    setSubscribers([...subscribers, { id: Date.now(), ...newSub }]);
    setIsAddModalOpen(false);
  };

  // Delete subscription
  const handleDelete = (id) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="subscription-container">
      {/* Top Cards */}
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
                <p className="subscription-amount">{`200`}</p>
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
                <p className="subscription-amount">
                  {subscribers.reduce((acc, sub) => {
                    const priceNum = Number(sub.price.replace(/[^0-9]/g, ""));
                    return acc + (isNaN(priceNum) ? 0 : priceNum);
                  }, 0)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Table */}
      <div className="subscription-rec-seek">
        <div className="subscription-section">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Subscription List</h2>
            <button className="subscription-add-btn" onClick={handleAdd}>
              Add Subscription
            </button>
          </div>
          <div className="subscription-table-container">
            <table className="subscription-table">
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Membership</th>
                  <th>Price</th>
                  <th>Posted On</th>
                  <th>Timespan</th>
                  <th>Content</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.name}</td>
                    <td>
                      {sub.membership === "Free-Trial" && (
                        <span className="subscription-membership free">🎁 Free-Trial</span>
                      )}
                      {sub.membership === "Basic" && (
                        <span className="subscription-membership basic">● Basic</span>
                      )}
                      {sub.membership === "Advance" && (
                        <span className="subscription-membership advanced">👑 Advance</span>
                      )}
                      {sub.membership === "Premium" && (
                        <span className="subscription-membership premium">⭐ Premium</span>
                      )}
                      {sub.membership === "Enterprise" && (
                        <span className="subscription-membership enterprise">🏢 Enterprise</span>
                      )}
                    </td>

                    <td>{sub.price}</td>
                    <td>{sub.postedOn}</td>
                    <td>{sub.timespan}</td>
                    <td>
                      <ul className="subscription-content-list">
                        {sub.content.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="subscription-actions">
                      <button className="subscription-btn edit-btn" onClick={() => handleEdit(sub)}>
                        <BiSolidEdit />
                      </button>
                      <button className="subscription-btn delete-btn" onClick={() => handleDelete(sub.id)}>
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

      {/* Edit Modal */}
      {isModalOpen && (
        <SubscriptionModal
          subscription={selectedSub}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Add Modal */}
      {isAddModalOpen && (
        <SubscriptionAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleSaveAdd}
        />
      )}
    </div>
  );
}
