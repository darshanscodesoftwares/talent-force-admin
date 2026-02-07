// src/contexts/SeekerProfileContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SeekerProfileContext = createContext();

export const SeekerProfileProvider = ({ children }) => {
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSeekers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin-user-details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔹 if token required
          },
        }
      );

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

          // 🔥 ADD THESE
          user_type: user.user_type || "",
          login_date: user.login_date || "",
          login_time: user.login_time || "",

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
    setSeekers((prev) => [...prev, newSeeker]);
  };

  // Edit Seeker (example)
  const editSeeker = (id, updatedData) => {
    setSeekers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updatedData } : s))
    );
  };

  // Get seeker by id (for GeneralInformation)
  const getSeekerById = (id) => {
    return seekers.find((s) => s.id === parseInt(id));
  };

  const softdelete = async (id) => {
    try {
      // Immediate UI update
      setSeekers((prev) => prev.filter((s) => s.id !== id));

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/delete-user/${id}`
      );
    } catch (error) {
      console.error("Delete failed:", error);
      fetchSeekers(); // rollback
    }
  };

  useEffect(() => {
    fetchSeekers();
  }, []);

  return (
    <SeekerProfileContext.Provider
      value={{
        seekers,
        loading,
        fetchSeekers,
        addSeeker,
        editSeeker,
        getSeekerById,
        softdelete,
      }}
    >
      {children}
    </SeekerProfileContext.Provider>
  );
};

export default SeekerProfileProvider;
