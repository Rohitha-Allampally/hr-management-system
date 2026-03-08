import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.links}>
        <NavLink to="/dashboard" style={styles.link}>
          Dashboard
        </NavLink>
        <NavLink to="/employees" style={styles.link}>
          Employees
        </NavLink>
        <NavLink to="/add" style={styles.link}>
          Add Employee
        </NavLink>
      </div>

      <div>
        <span style={{ color: "white", marginRight: "15px" }}>
          {user?.name}
        </span>
        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#1976d2",
  },
  button: {
    padding: "5px 10px",
    cursor: "pointer",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};

export default Navbar;