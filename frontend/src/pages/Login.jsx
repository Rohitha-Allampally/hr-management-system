import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
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
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>HRMS Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px"
              }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "16px"
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
            cursor: "pointer"
          }}>
            Login
          </button>
        </form>

        {/* Demo Credentials Section */}
        <div style={{
          marginTop: "25px",
          padding: "15px",
          backgroundColor: "#f0f7ff",
          borderRadius: "4px",
          borderLeft: "4px solid #0066cc"
        }}>
          <p style={{ margin: "0 0 10px 0", fontWeight: "600", color: "#333" }}>Demo Credentials:</p>
          <div style={{ marginBottom: "10px" }}>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin@hrms.com", "admin123")}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#e3f2fd",
                border: "1px solid #90caf9",
                borderRadius: "4px",
                fontSize: "13px",
                color: "#0066cc",
                cursor: "pointer",
                marginBottom: "5px"
              }}
            >
              Admin: admin@hrms.com / admin123
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => handleDemoLogin("test@hrms.com", "test123")}
              style={{
                width: "100%",
                padding: "8px",
                backgroundColor: "#e3f2fd",
                border: "1px solid #90caf9",
                borderRadius: "4px",
                fontSize: "13px",
                color: "#0066cc",
                cursor: "pointer"
              }}
            >
              Test: test@hrms.com / test123
            </button>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p style={{ color: "#666", marginBottom: "10px" }}>
            <Link to="/forgot-password" style={{ color: "#0066cc", textDecoration: "none", fontWeight: "600" }}>
              Forgot Password?
            </Link>
          </p>
          <p style={{ color: "#666" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#0066cc", textDecoration: "none", fontWeight: "600" }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
