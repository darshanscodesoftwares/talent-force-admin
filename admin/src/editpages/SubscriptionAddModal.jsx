import React, { useState } from "react";
import "./SubscriptionAddModal.css";
import { membershipSchemas } from "../data/contentData.js";

export default function SubscriptionAddModal({ isOpen, onClose, onSave }) {
  const formatDate = (date) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("en-GB", options);
  };

  const emptyForm = {
    name: "",
    membership: "",
    price: "",
    timespan: "",
    content: [""],
    postedOn: formatDate(new Date()),
  };

  const [form, setForm] = useState(emptyForm);
  const [previousForm, setPreviousForm] = useState(emptyForm); // store last state

  if (!isOpen) return null;

  // Membership input change (handles schema + custom)
  const handleMembershipChange = (e) => {
    const membership = e.target.value.trim();

    setPreviousForm(form); // backup current form before change

    if (membershipSchemas[membership]) {
      setForm({
        ...membershipSchemas[membership],
        membership,
        postedOn: formatDate(new Date()),
      });
    } else if (membership === "") {
      setForm(emptyForm);
    } else {
      setForm({
        ...emptyForm,
        name: membership,
        membership,
      });
    }
  };

  const handleCancelMembership = () => {
    setForm(previousForm); // restore previous state
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContentChange = (index, value) => {
    const newContent = [...form.content];
    newContent[index] = value;
    setForm({ ...form, content: newContent });
  };

  const handleAddContentLine = () => {
    setForm({ ...form, content: [...form.content, ""] });
  };

  const handleRemoveContentLine = (index) => {
    const newContent = form.content.filter((_, i) => i !== index);
    setForm({ ...form, content: newContent.length ? newContent : [""] });
  };

  const handleReset = () => {
    setForm(emptyForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, postedOn: formatDate(new Date()) });
    setForm(emptyForm); // reset after save
  };

  return (
    <div className="subscriptionaddmodal-overlay">
      <div className="subscriptionaddmodal-content">
        <h3>Add Subscription</h3>
        <form onSubmit={handleSubmit}>
          <label>Membership</label>
          <div className="membership-row">
            <input
              list="membership-options"
              name="membership"
              value={form.membership}
              onChange={handleMembershipChange}
              placeholder="Choose or type new"
            />
            {form.membership && (
              <button
                type="button"
                className="cancel-membership-btn"
                onClick={handleCancelMembership}
              >
                ✕
              </button>
            )}
          </div>
          <datalist id="membership-options">
            {Object.keys(membershipSchemas).map((key) => (
              <option key={key} value={key} />
            ))}
          </datalist>

          <label>Plan Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Price</label>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <label>Timespan</label>
          <select
            name="timespan"
            value={form.timespan}
            onChange={handleChange}
            required
          >
            <option value="">Select Timespan</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Annual">Annual</option>
            <option value="Lifetime">Lifetime</option>
          </select>

          <label>Content</label>
          {form.content.map((line, idx) => (
            <div key={idx} className="content-line">
              <input
                type="text"
                value={line}
                onChange={(e) => handleContentChange(idx, e.target.value)}
                placeholder="Enter content line"
              />
              <button
                type="button"
                className="remove-content-btn"
                onClick={() => handleRemoveContentLine(idx)}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-content-btn"
            onClick={handleAddContentLine}
          >
            Add Line
          </button>

          <div className="subscriptionaddmodal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="reset-btn" onClick={handleReset}>
              Reset
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
