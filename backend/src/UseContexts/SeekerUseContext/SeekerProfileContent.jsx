// src/contexts/SeekerProfileContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const SeekerProfileContext = createContext();

export const SeekerProfileProvider = ({ children }) => {
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all seekers (for table)
  const fetchSeekers = async () => {
    try {
      const res = await fetch("http://192.168.29.163:8000/api/user/setting-full-profile", {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjYzODQ1ODIwNjAiLCJpYXQiOjE3NTQ1NjYwNDgsImV4cCI6MTc4NjEwMjA0OH0.3iSWyeNJxfoYxU9QsQIuBIjd9xbO0OaE-CoWhbtPM4s", 
          // Replace with actual token
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        const seekerItem = {
          id: data.profile.profile.id,
          name: data.profile.profile.name,
          phone: data.profile.profile.phone,
          email: data.profile.profile.email,
          pincode: data.profile.address.pincode,
          specialization: data.profile.education?.[0]?.specialization || "",
          status: "",
          fullProfile: data.profile, // keep full profile for later use
        };
        setSeekers([seekerItem]);
      }
    } catch (err) {
      console.error("Error fetching seekers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add Seeker (example)
  const addSeeker = (newSeeker) => {
    setSeekers(prev => [...prev, newSeeker]);
  };

  // Edit Seeker (example)
  const editSeeker = (id, updatedData) => {
    setSeekers(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
  };

  // Get seeker by id (for GeneralInformation)
  const getSeekerById = (id) => {
    return seekers.find(s => s.id === parseInt(id));
  };

  useEffect(() => {
    fetchSeekers();
  }, []);

  return (
    <SeekerProfileContext.Provider value={{
      seekers,
      loading,
      fetchSeekers,
      addSeeker,
      editSeeker,
      getSeekerById,
    }}>
      {children}
    </SeekerProfileContext.Provider>
  );
};

export default SeekerProfileProvider;