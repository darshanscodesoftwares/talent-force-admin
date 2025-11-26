import React, { useState } from "react";
import "./SubscriptionAddModal.css";

export default function SubscriptionAddModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const emptyForm = {
    name: "",
    price: "",
    timespan: "",
    content: [""], // array of lines
  };

  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContentChange = (index, value) => {
    const updated = [...form.content];
    updated[index] = value;
    setForm({ ...form, content: updated });
  };

  const handleAddLine = () => {
    setForm({ ...form, content: [...form.content, ""] });
  };

  const handleRemoveLine = (index) => {
    const updated = form.content.filter((_, i) => i !== index);
    setForm({ ...form, content: updated.length ? updated : [""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      price: form.price,
      timespan: form.timespan.toLowerCase(),
      content: form.content.filter((c) => c.trim() !== ""),
    };

    await onSave(payload); // POST API call from context
    setForm(emptyForm); // reset form
    onClose();
  };

  const handleReset = () => setForm(emptyForm);

  return (
    <div className="subscriptionaddmodal-overlay">
      <div className="subscriptionaddmodal-content">
        <h3>Add Subscription</h3>

        <form onSubmit={handleSubmit}>
          <label>Plan Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter plan name"
            required
          />

          <label>Price</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 999.00"
            required
          />

          <label>Timespan</label>
          <select
            name="timespan"
            value={form.timespan}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="half-yearly">Half-Yearly</option>
            <option value="annual">Annual</option>
            <option value="lifetime">Lifetime</option>
          </select>

          <label>Content</label>
          {form.content.map((line, idx) => (
            <div key={idx} className="content-line">
              <input
                type="text"
                value={line}
                placeholder="Enter benefit line"
                onChange={(e) => handleContentChange(idx, e.target.value)}
              />
              <button
                type="button"
                className="remove-content-btn"
                onClick={() => handleRemoveLine(idx)}
              >
                ✕
              </button>
            </div>
          ))}

          <button type="button" className="add-content-btn" onClick={handleAddLine}>
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
