import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const RecruiterProfileContext = createContext();

const API_URL = "https://hireezee.co.in/api/admin-recruiter-full-details";

export const RecruiterProfileProvider = ({ children }) => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================
  // Fetch Recruiter Profiles
  // ==========================
  const fetchRecruiters = async () => {
    try {
      setLoading(true);

      const res = await axios.get(API_URL);
      const data = res.data?.recruiters || [];

      const formatted = data.map((item) => {
        const plan = item.current_plan?.plan_name || "Free";

        return {
          id: item.recruiter_id,

          // --- School Details ---
          schoolImage: item.school_profile?.school_image || "",
          schoolName: item.school_profile?.school_name || "N/A",
          schoolEmail: item.school_profile?.school_email || "N/A",
          schoolPhone: item.school_profile?.school_phone_number || "N/A",
          schoolAddress: item.school_profile?.school_address || "N/A",

          // --- Recruiter Info ---
          phoneNumber: item.phone_number || "N/A",
          isLogin: item.is_login ? "Yes" : "No",
          isDetailsCompleted: item.is_school_details_completed ? "Yes" : "No",
          signupDate: new Date(item.signup_date).toLocaleDateString(),

          // FIXED → backend field name matches UI
          current_plan: item.current_plan || null,
          membership: plan,

          // --- Job Posts ---
          jobPosts: item.job_posts || [],

          // First pincode (fallback)
          pincode: item.job_posts?.[0]?.pincode?.pincode || "N/A",

          // --- Stats ---
          totalJobs: item.stats?.total_job_posts || 0,
          openJobs: item.stats?.open_job_posts || 0,
          totalApplications: item.stats?.total_applications || 0,
          selectedCandidates: item.stats?.selected_candidates || 0,
        };
      });

      setRecruiters(formatted);
    } catch (err) {
      console.error("❌ Failed to fetch recruiters:", err);
      toast.error("Failed to load recruiter profiles");
      setRecruiters([]);
    } finally {
      setLoading(false);
    }
  };

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
