import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EmployeeTable from "../components/EmployeeTable";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const load = () => {
    API.get("/employees").then((res) => setEmployees(res.data));
  };

  useEffect(() => {
    load();
  }, []);

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    
    if (confirmDelete) {
      try {
        await API.delete(`/employees/${id}`);
        load(); // Refresh the list after successful deletion
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee. Please try again.");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>Employee List</h2>
        <EmployeeTable employees={employees} onDelete={deleteEmployee} />
      </div>
    </div>
  );
};

export default EmployeeList;
