// src/contexts/SeekerProfileContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const SeekerProfileContext = createContext();

export const SeekerProfileProvider = ({ children }) => {
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);

const fetchSeekers = async () => {
  try {
    setLoading(true);
    const res = await fetch("https://hireezee.co.in/api/admin-user-details", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔹 if token required
      },
    });
    
const data = await res.json();
if (data.status === "success") {
  const seekerItems = data.users.map((user) => ({
    id: user.user_id,
    name: user.profile?.name || "",
    phone: user.profile?.phone || "",
    email: user.profile?.email || "",
    pincode: user.address?.pincode || "",
    specialization: user.course?.specialization || "",
    status: user.status?.[0] || "",
    profile_img: user.profile?.profile_img || "",
    fullProfile: user, // keep full profile for later use
  }));

  setSeekers(seekerItems);
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