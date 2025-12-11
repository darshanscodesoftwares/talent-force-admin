import React, { useState, useEffect } from "react";
import "./SubscriptionModal.css";

export default function SubscriptionModal({ isOpen, onClose, onSave, subscription }) {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [timespan, setTimespan] = useState("");
  const [contentText, setContentText] = useState("");

  useEffect(() => {
    if (subscription) {
      setName(subscription.name || "");
      setPrice(subscription.price || "");
      setTimespan(subscription.timespan || "monthly");   // default
      setContentText(subscription.content.join("\n"));
    }
  }, [subscription]);

  const handleSubmit = async (e) => {
    e.preventDefault();

   await onSave(subscription.id, {
  price: price.trim(),   // ✅ ONLY SEND PRICE
});

    onClose();
  };

  return (
    <div className="subscriptionmodal-overlay">
      <div className="subscriptionmodal-content">
        <h3>Edit Subscription Price</h3>

        <form onSubmit={handleSubmit}>
          {/* <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} /> */}

          <label>Price</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} />

          <div className="subscriptionmodal-actions">
            <button type="button" onClick={onClose} className="subscriptionmodal-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="subscriptionmodal-save-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
