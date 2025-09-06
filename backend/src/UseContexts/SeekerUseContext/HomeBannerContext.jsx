// src/UseContexts/SeekerUseContext/HomeBannerContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HomeBannerContext = createContext();

const API_URL = "http://192.168.29.163:8000/api/banners";

const HomeBannerProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch banners on mount
  useEffect(() => {
    fetchBanners();
  }, []);

  // ✅ GET banners
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setBanners(response.data.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  // ✅ POST add banner
  const addBanner = async (formData) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const createdBanner = response.data?.data;
      if (createdBanner) {
        setBanners((prev) => [...prev, createdBanner]);
      }

      return createdBanner;
    } catch (err) {
      console.error("Failed to add banner:", err.response?.data || err.message);
      throw err;
    }
  };

  // ✅ PUT update banner
  const updateBanner = async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedBanner = response.data?.data;
      if (updatedBanner) {
        setBanners((prev) =>
          prev
            .filter(Boolean)
            .map((b) =>
              b?.id?.toString() === updatedBanner?.id?.toString() ? updatedBanner : b
            )
        );
      }

      return updatedBanner;
    } catch (err) {
      console.error("Failed to update banner:", err.response?.data || err.message);
      throw err;
    }
  };

  return (
    <HomeBannerContext.Provider
      value={{
        banners,
        loading,
        error,
        fetchBanners,
        addBanner,
        updateBanner, // 🔹 export update
      }}
    >
      {children}
    </HomeBannerContext.Provider>
  );
};

export default HomeBannerProvider;
