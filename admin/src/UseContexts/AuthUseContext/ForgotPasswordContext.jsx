import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

export const ForgotPasswordContext = createContext();

export const ForgotPasswordProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Shared request helper: always resolves to { ok, message }
  const post = useCallback(
    async (path, body) => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${API_BASE_URL}/api/admin/forgot-password/${path}`,
          body
        );
        return { ok: true, message: response.data.message };
      } catch (error) {
        console.error("Forgot password request failed:", error);
        return {
          ok: false,
          message:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        };
      } finally {
        setLoading(false);
      }
    },
    [API_BASE_URL]
  );

  // Step 1: send OTP to the admin email
  const sendOtp = useCallback((email) => post("send-otp", { email }), [post]);

  // Resend uses the same backend logic as send
  const resendOtp = useCallback(
    (email) => post("resend-otp", { email }),
    [post]
  );

  // Step 2: check the OTP
  const verifyOtp = useCallback(
    (email, otp) => post("verify-otp", { email, otp }),
    [post]
  );

  // Step 3: set the new password
  const resetPassword = useCallback(
    (email, newPassword, confirmPassword) =>
      post("reset", {
        email,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }),
    [post]
  );

  return (
    <ForgotPasswordContext.Provider
      value={{ loading, sendOtp, resendOtp, verifyOtp, resetPassword }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
};

export const useForgotPassword = () => useContext(ForgotPasswordContext);
