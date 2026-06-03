import React, { useState, useRef, useEffect } from "react";
import "./CustomSelect.css";

export default function CustomSelect({ value, onChange, options, placeholder = "Select an option" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label || placeholder;

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <div
        className="custom-select-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={selectedLabel === placeholder ? "placeholder" : ""}>
          {selectedLabel}
        </span>
        <svg
          className={`custom-select-arrow ${isOpen ? "open" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      {isOpen && (
        <div className="custom-select-dropdown">
          <input
            type="text"
            className="custom-select-search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <div className="custom-select-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`custom-select-option ${
                    value === option.value ? "selected" : ""
                  }`}
                  onClick={() => handleSelect(option.value)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="custom-select-no-results">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
