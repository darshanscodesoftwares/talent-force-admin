// src/UseContexts/JobPostUseContext/SubjectContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const SubjectContext = createContext();

const API_URL = "http://192.168.29.163:8000/api/job-categories";

const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch subjects (GET)
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);

      // Since API returns an array directly, just set it
      setSubjects(res.data?.result || []);
    } catch (err) {
      setError(err.message || "Failed to fetch subjects");
      toast.error("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Add new subject (POST)
  const addSubject = async (newSubject) => {
    try {
      await axios.post(API_URL, newSubject);
      await fetchSubjects();
      toast.success("Subject added successfully");
    } catch (err) {
      console.error("Failed to add subject:", err.response?.data || err.message);
      toast.error("Failed to add subject");
      throw err;
    }
  };

  // ✅ Delete subject (DELETE)
  const deleteSubject = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchSubjects();
      toast.success("Subject deleted successfully");
    } catch (err) {
      console.error("Failed to delete subject:", err.response?.data || err.message);
      toast.error("Failed to delete subject");
      throw err;
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        loading,
        error,
        fetchSubjects,
        addSubject,
        deleteSubject,
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
};

export default SubjectProvider;
