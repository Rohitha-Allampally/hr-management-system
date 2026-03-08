import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.sidebar}>
      <h4>Menu</h4>

      <button onClick={() => navigate("/dashboard")} style={styles.link}>
        Dashboard
      </button>

      <button onClick={() => navigate("/profile")} style={styles.link}>
        My Profile
      </button>

      <button onClick={() => navigate("/employees")} style={styles.link}>
        Employees
      </button>

      <button onClick={() => navigate("/add")} style={styles.link}>
        Add Employee
      </button>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "200px",
    height: "100vh",
    backgroundColor: "#f4f4f4",
    padding: "15px",
    position: "fixed",
  },
  link: {
    display: "block",
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
    cursor: "pointer",
  },
};

export default Sidebar;