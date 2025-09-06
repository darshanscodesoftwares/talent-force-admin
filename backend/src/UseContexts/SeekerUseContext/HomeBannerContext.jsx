// src/UseContexts/SeekerUseContext/HomeBannerContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HomeBannerContext = createContext();

const API_URL = "http://192.168.29.163:8000/api/banners";

const HomeBannerProvider = ({ children }) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Define fetchBanners once, outside useEffect
  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL); // ✅ use correct API
      setBanners(res.data?.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Call it on mount
  useEffect(() => {
    fetchBanners();
  }, []);

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

      let updatedBanner = response.data?.data;

      if (updatedBanner) {
        // Force image reload by appending timestamp
        if (updatedBanner.banner_image) {
          updatedBanner = {
            ...updatedBanner,
            banner_image: `${updatedBanner.banner_image}?t=${Date.now()}`,
          };
        }

        setBanners((prev) =>
          prev.map((b) =>
            b?.id?.toString() === updatedBanner?.id?.toString()
              ? updatedBanner
              : b
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
        updateBanner,
      }}
    >
      {children}
    </HomeBannerContext.Provider>
  );
};

export default HomeBannerProvider;
