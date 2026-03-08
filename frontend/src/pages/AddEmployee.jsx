import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EmployeeForm from "../components/EmployeeForm";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    salary: "",
    joiningDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/employees", employee);
    navigate("/employees");
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>Add Employee</h2>
        <EmployeeForm
          employee={employee}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitText="Add"
        />
      </div>
    </div>
  );
};

export default AddEmployee;
