import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const RecruiterProfileContext = createContext();

const API_URL = "http://69.62.74.30:8000/api/admin-recruiter-full-details";

export const RecruiterProfileProvider = ({ children }) => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all recruiters
  const fetchRecruiters = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      const data = res.data?.recruiters || [];

      const formatted = data.map((item) => ({
        id: item.recruiter_id,
        schoolImage: item.school_profile?.school_image || "",
        schoolName: item.school_profile?.school_name || "N/A",
        schoolEmail: item.school_profile?.school_email || "N/A",
        schoolPhone: item.school_profile?.school_phone_number || "N/A",
        schoolAddress: item.school_profile?.school_address || "N/A",
        phoneNumber: item.phone_number || "N/A",
        isLogin: item.is_login ? "Yes" : "No",
        isDetailsCompleted: item.is_school_details_completed ? "Yes" : "No",
        signupDate: new Date(item.signup_date).toLocaleDateString(),
        totalJobs: item.stats?.total_job_posts || 0,
        openJobs: item.stats?.open_job_posts || 0,
        totalApplications: item.stats?.total_applications || 0,
        selectedCandidates: item.stats?.selected_candidates || 0,
      }));

      setRecruiters(formatted);
    } catch (err) {
      console.error("❌ Failed to fetch recruiters:", err);
      toast.error("Failed to load recruiter profiles");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Auto fetch on mount
  useEffect(() => {
    fetchRecruiters();
  }, []);

  return (
    <RecruiterProfileContext.Provider
      value={{
        recruiters,
        loading,
        fetchRecruiters,
      }}
    >
      {children}
    </RecruiterProfileContext.Provider>
  );
};

export default RecruiterProfileProvider;
