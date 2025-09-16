import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GeneralInformationContext = createContext();

export const GeneralInformationProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      // Get token from localStorage (or your auth storage)
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjYzODQ1ODIwNjAiLCJpYXQiOjE3NTQ1NjYwNDgsImV4cCI6MTc4NjEwMjA0OH0.3iSWyeNJxfoYxU9QsQIuBIjd9xbO0OaE-CoWhbtPM4s";
       // recommended
      if (!token) {
        console.error("No token found. User may not be logged in.");
        setProfile(null);
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://192.168.29.163:8000/api/user/setting-full-profile",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "success") {
        const data = response.data.profile;

        // Map API data to simplified structure for GeneralInformation
        const simplifiedProfile = {
          user: data.profile?.name || "",
          phoneNo: data.profile?.phone || "",
          mail: data.profile?.email || "",
          Specialization: data.education?.[0]?.specialization || "",
          highestQualification: data.education?.[0]?.degree || "",
          teachingQualification: data.teaching_experience?.[0]?.degree || "",
          resume: data.profile?.resume_path || null,
        };

        setProfile(simplifiedProfile);
      } else {
        console.error("Failed to fetch profile:", response.data.message);
        setProfile(null);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <GeneralInformationContext.Provider
      value={{ profile, loading, fetchProfile }}
    >
      {children}
    </GeneralInformationContext.Provider>
  );
};

export default GeneralInformationProvider;
