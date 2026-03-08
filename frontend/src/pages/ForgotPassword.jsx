import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    // Check if user exists
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email);

    if (!user) {
      setError("No account found with this email address");
      return;
    }

    // In a real app, this would send an email. For demo, we'll show reset form directly
    setMessage("Account found! You can now reset your password.");
    setShowResetForm(true);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Update password in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userIndex = users.findIndex(u => u.email === email);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem("users", JSON.stringify(users));
      setMessage("Password reset successful! You can now login with your new password.");
      setShowResetForm(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>
          {showResetForm ? "Reset Password" : "Forgot Password"}
        </h2>

        {error && (
          <div style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "20px",
            fontSize: "14px"
          }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{
            backgroundColor: "#e8f5e8",
            color: "#2e7d32",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "20px",
            fontSize: "14px"
          }}>
            {message}
          </div>
        )}

        {!showResetForm ? (
          <form onSubmit={handleEmailSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <button type="submit" style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#0066cc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "15px"
            }}>
              Send Reset Link
            </button>
          </form>
        ) : (
          <form onSubmit={handlePasswordReset}>
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  fontSize: "16px",
                  boxSizing: "border-box"
                }}
              />
            </div>

            <button type="submit" style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#0066cc",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              marginBottom: "15px"
            }}>
              Reset Password
            </button>
          </form>
        )}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ color: "#666" }}>
            Remember your password?{" "}
            <Link to="/" style={{ color: "#0066cc", textDecoration: "none", fontWeight: "600" }}>
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
