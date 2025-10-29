import { useSubscriptionPlans } from "../UseContexts/GeneralUseContext/SubscriptionPlansContext/SubscriptionPlanContext.jsx";
import SubscriptionPlanLoader from "../Loader/Loader.jsx";
import SubscriptionModal from "../editpages/SubscriptionModal.jsx";
import SubscriptionAddModal from "../editpages/SubscriptionAddModal.jsx";
import { IoIosPeople } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { TbCoinRupeeFilled } from "react-icons/tb";
import "./SubscriptionPlan.css";
import { useState } from "react";

export default function SubscriptionPlan() {
  const { subscriptions, loading, error } = useSubscriptionPlans();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (loading) return <SubscriptionPlanLoader />;
  if (error) return <p>Error loading subscriptions: {error}</p>;

  const handleEdit = (sub) => {
    setSelectedSub(sub);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    // optional: handle delete via API later
    console.log("Delete", id);
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
                  <div className="subscription-card-icon"><IoIosPeople /></div>
                  <h4>Subscribed Users</h4>
                </div>
                <p className="subscription-amount">100</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="subscription-card">
              <div className="subscription-card-body">
                <div className="subscription-card-left">
                  <div className="subscription-card-icon"><TbCoinRupeeFilled /></div>
                  <h4>Total Revenue</h4>
                </div>
                <p className="subscription-amount">45000</p>
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
            <button className="subscription-add-btn" onClick={() => setIsAddModalOpen(true)}>
              Add Subscription
            </button>
          </div>

          <div className="subscription-table-container">
            <table className="subscription-table">
              <thead>
                <tr>
                  <th>Plan Name</th>
                  <th>Price</th>
                  <th>Timespan</th>
                  <th>Posted On</th>
                  <th>Content</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.name}</td>
                    <td>{sub.price}</td>
                    <td>{sub.timespan}</td>
                    <td>{sub.created_at}</td>
                    <td>
                      <ul className="subscription-content-list">
                        {sub.content.map((item, i) => <li key={i}>{item}</li>)}
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

      {/* Modals */}
      {isModalOpen && (
        <SubscriptionModal
          subscription={selectedSub}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={() => setIsModalOpen(false)}
        />
      )}

      {isAddModalOpen && (
        <SubscriptionAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={() => setIsAddModalOpen(false)}
        />
      )}
    </div>
  );
}
