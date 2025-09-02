import React from "react";
import "./SubscriptionModal.css";

const SubscriptionModal = ({ isOpen, onClose, onSave, subscription }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Subscription Information</h3>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(subscription);
          }}
        >
          <label>Name</label>
          <input type="text" defaultValue={subscription?.name} />

          <label>Price</label>
          <input type="text" defaultValue={subscription?.price} />

          <label>Timespan</label>
          <input type="text" defaultValue={subscription?.timespan} />

          <label>Content</label>
          <textarea defaultValue={subscription?.content}></textarea>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionModal;
