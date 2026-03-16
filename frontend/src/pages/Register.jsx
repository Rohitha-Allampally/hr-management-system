import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        alert("Registration successful! Please login.");
        navigate("/");
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
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
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Register</h2>
        
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

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
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

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
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

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
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
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "500" }}>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
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

          <button type="submit" disabled={isLoading} style={{
            width: "100%",
            padding: "12px",
            backgroundColor: isLoading ? "#ccc" : "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: isLoading ? "not-allowed" : "pointer",
            marginBottom: "15px"
          }}>
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ color: "#666" }}>
            Already have an account?{" "}
            <Link to="/" style={{ color: "#0066cc", textDecoration: "none", fontWeight: "600" }}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
