// src/UseContexts/SeekerUseContext/HomeBannerContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const HomeBannerContext = createContext();

// Provider Component
 const HomeBannerProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("http://192.168.29.163:8000/api/banners");
        setBanners(response.data); // ✅ store API data
      } catch (err) {
        setError(err.message || "Failed to fetch banners");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return (
    <HomeBannerContext.Provider value={{ banners, loading, error }}>
      {children}
    </HomeBannerContext.Provider>
  );
};

export default HomeBannerProvider