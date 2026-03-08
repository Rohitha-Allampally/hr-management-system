import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Please login to view your profile</div>;
  }

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>My Profile</h2>
        <div style={{ 
          backgroundColor: "white", 
          padding: "30px", 
          borderRadius: "8px", 
          marginTop: "20px",
          maxWidth: "600px"
        }}>
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <div style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              backgroundColor: "#0066cc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "36px",
              color: "white",
              fontWeight: "bold"
            }}>
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <h3 style={{ margin: "0", color: "#333" }}>{user.name}</h3>
            <p style={{ color: "#666", margin: "5px 0" }}>{user.email}</p>
          </div>

          <div style={{ borderTop: "1px solid #eee", paddingTop: "20px" }}>
            <h4 style={{ marginBottom: "15px", color: "#333" }}>Profile Information</h4>
            
            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>
                Full Name
              </label>
              <p style={{ margin: "0", padding: "8px 12px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
                {user.name}
              </p>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>
                Email Address
              </label>
              <p style={{ margin: "0", padding: "8px 12px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
                {user.email}
              </p>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>
                User ID
              </label>
              <p style={{ margin: "0", padding: "8px 12px", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
                {user.id}
              </p>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px", color: "#555" }}>
                Account Status
              </label>
              <p style={{ margin: "0", padding: "8px 12px", backgroundColor: "#e8f5e8", color: "#2e7d32", borderRadius: "4px", display: "inline-block" }}>
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
