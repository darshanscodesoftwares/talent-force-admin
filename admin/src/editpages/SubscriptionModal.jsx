import React, { useState, useEffect } from "react";
import "./SubscriptionModal.css";

const SubscriptionModal = ({ isOpen, onClose, onSave, subscription }) => {
  if (!isOpen) return null;

  // Local state to handle editable fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [timespan, setTimespan] = useState("");
  const [contentText, setContentText] = useState("");

  useEffect(() => {
    if (subscription) {
      setName(subscription.name || "");
      setPrice(subscription.price || "");
      setTimespan(subscription.timespan || "");
      // Convert array to string with line breaks
      setContentText(subscription.content ? subscription.content.join("\n") : "");
    }
  }, [subscription]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...subscription,
      name,
      price,
      timespan,
      // Convert string back to array
      content: contentText.split("\n").map(item => item.trim()).filter(Boolean),
    });
  };

  return (
    <div className="subscriptionmodal-overlay">
      <div className="subscriptionmodal-content">
        <h3>Subscription Information</h3>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Price</label>
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

          <label>Timespan</label>
          <input type="text" value={timespan} onChange={(e) => setTimespan(e.target.value)} />

          <label>Content</label>
          <textarea
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            placeholder="Enter one feature per line"
          ></textarea>

          <div className="subscriptionmodal-actions">
            <button
              type="button"
              onClick={onClose}
              className="subscriptionmodal-cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="subscriptionmodal-save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionModal;
