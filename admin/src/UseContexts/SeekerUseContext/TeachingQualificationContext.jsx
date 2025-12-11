// src/UseContexts/SeekerUseContext/TeachingQualificationContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const TeachingQualificationContext = createContext();

const API_URL = "http://69.62.74.30:8000/api/admin/course/teaching-qualification";

export const TeachingQualificationProvider = ({ children }) => {
  const [teachingQual, setTeachingQual] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch
  const fetchTeachingQual = async () => {
    try {
      const res = await axios.get(API_URL);
      setTeachingQual(res.data.results || []);
    } catch (err) {
      console.error("Failed to fetch teaching qualifications:", err);
      toast.error("Failed to load teaching qualifications");
    } finally {
      setLoading(false);
    }
  };

  // add
  const addTeachingQual = async (newItem) => {
    try {
      await axios.post(API_URL, newItem);
      await fetchTeachingQual();
      toast.success("Qualification added successfully");
    } catch (err) {
      console.error("Failed to add qualification:", err);
      toast.error("Failed to add qualification");
    }
  };

  // update
  const updateTeachingQual = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      await fetchTeachingQual();
      toast.success("Qualification updated successfully");
    } catch (err) {
      console.error("Failed to update qualification:", err);
      toast.error("Failed to update qualification");
    }
  };

  // delete
  const deleteTeachingQual = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTeachingQual((prev) => prev.filter((q) => q.id !== id));
      toast.success("Qualification deleted successfully");
    } catch (err) {
      console.error("Failed to delete qualification:", err);
      toast.error("Failed to delete qualification");
    }
  };

  useEffect(() => {
    fetchTeachingQual();
  }, []);

  return (
    <TeachingQualificationContext.Provider
      value={{
        teachingQual,
        loading,
        addTeachingQual,
        updateTeachingQual,
        deleteTeachingQual,
      }}
    >
      {children}
    </TeachingQualificationContext.Provider>
  );
};

export default TeachingQualificationProvider;