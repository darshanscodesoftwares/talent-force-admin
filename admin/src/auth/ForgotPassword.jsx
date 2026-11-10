import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import "./ForgotPassword.css";
import { CiAt } from "react-icons/ci";
import { GoLock } from "react-icons/go";
import { PiEyeBold, PiEyeSlashBold } from "react-icons/pi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminLogo from "../assets/adminlogo.png";
import { useForgotPassword } from "../UseContexts/AuthUseContext/ForgotPasswordContext";

const STEPS = ["email", "otp", "reset"];
const MIN_PASSWORD_LENGTH = 8;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { loading, sendOtp, resendOtp, verifyOtp, resetPassword } =
    useForgotPassword();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const stepIndex = STEPS.indexOf(step);

  // Step 1: email -> OTP
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const result = await sendOtp(email);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setStep("otp");
  };

  // Step 2: OTP -> new password
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP sent to your email.");
      return;
    }
    const result = await verifyOtp(email, otp);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    setStep("reset");
  };

  // Step 3: new password -> back to login
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    const result = await resetPassword(email, newPassword, confirmPassword);
    if (!result.ok) {
      setError(result.message);
      return;
    }
    toast.success("Password updated. Please sign in.", {
      position: "top-right",
      autoClose: 1500,
    });
    setTimeout(() => navigate("/"), 1500);
  };

  const handleResend = async () => {
    const result = await resendOtp(email);
    toast[result.ok ? "info" : "error"](result.message, {
      position: "top-right",
      autoClose: 1500,
    });
  };

  return (
    <>
      <div className="login-container">
        <div className="greet-card">
          <img src={adminLogo} alt="TalentForce Logo" className="login-logo" />

          <div className="login-title-wrap">
            <h2 className="login1">Forgot Password</h2>
            <h2 className="login2">
              {step === "email" && "Enter your admin email to receive an OTP"}
              {step === "otp" && "Enter the OTP sent to your email"}
              {step === "reset" && "Create a new password"}
            </h2>
          </div>

          <div className="login-card">
            <div className="fp-steps" aria-label={`Step ${stepIndex + 1} of 3`}>
              {STEPS.map((s, i) => (
                <span
                  key={s}
                  className={`fp-step-dot${i <= stepIndex ? " active" : ""}`}
                />
              ))}
            </div>

            {step === "email" && (
              <form className="login-form" onSubmit={handleEmailSubmit}>
                <div className="form-group input-with-icon">
                  <label>Email</label>
                  <div className="input-wrapper">
                    <CiAt className="input-icon" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                {error && <p className="fp-error">{error}</p>}

                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </form>
            )}

            {step === "otp" && (
              <form className="login-form" onSubmit={handleOtpSubmit}>
                <p className="fp-hint">
                  We sent a 6-digit code to <strong>{email}</strong>.
                </p>

                <div className="form-group">
                  <label>OTP</label>
                  <div className="input-wrapper">
                    <input
                      className="fp-otp-input"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      placeholder="000000"
                      required
                    />
                  </div>
                </div>

                {error && <p className="fp-error">{error}</p>}

                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <div className="fp-actions end">
                  <button
                    type="button"
                    className="fp-link-btn"
                    onClick={handleResend}
                    disabled={loading}
                  >
                    Resend OTP
                  </button>
                </div>
              </form>
            )}

            {step === "reset" && (
              <form className="login-form" onSubmit={handleResetSubmit}>
                <div className="form-group input-with-icon">
                  <label>New password</label>
                  <div className="input-wrapper">
                    <GoLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter a new password"
                      autoComplete="new-password"
                      required
                    />
                    <span
                      className="eye-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <PiEyeSlashBold /> : <PiEyeBold />}
                    </span>
                  </div>
                </div>

                <div className="form-group input-with-icon">
                  <label>Confirm password</label>
                  <div className="input-wrapper">
                    <GoLock className="input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter the new password"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                </div>

                {error && <p className="fp-error">{error}</p>}

                <button type="submit" className="login-btn" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}
          </div>

          <div className="fp-actions" style={{ width: 350 }}>
            <Link to="/" className="forgot-link">
              Back to sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Toastify container */}
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
