import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();

  // Get pathname and split into parts
  const pathParts = location.pathname.split("/").filter(Boolean);

  // Default title
  let currentTitle = "Talent Force Admin";

  if (pathParts.length > 0) {
    // Take the last segment and make it readable
    const lastSegment = pathParts[pathParts.length - 1];
    currentTitle = lastSegment
      .replace(/-/g, " ") // replace dashes with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize
  }

  return (
    <header className="header">
      <h1>{currentTitle}</h1>
    </header>
  );
}

export default Header;
