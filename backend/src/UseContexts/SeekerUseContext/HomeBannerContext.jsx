// src/UseContexts/SeekerUseContext/HomeBannerContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create Context
export const HomeBannerContext = createContext();

const HomeBannerProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://192.168.29.163:8000/api/banners");
      setBanners(response.data);
    } catch (err) {
      setError(err.message || "Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  // ✅ add a banner
  const addBanner = async (newBannerData) => {
    try {
      const response = await axios.post("http://192.168.29.163:8000/api/banners", newBannerData);
      setBanners((prev) => [...prev, response.data]); // update list
    } catch (err) {
      console.error("Failed to add banner:", err);
    }
  };

  return (
    <HomeBannerContext.Provider value={{ banners, loading, error, addBanner }}>
      {children}
    </HomeBannerContext.Provider>
  );
};

export default HomeBannerProvider;
