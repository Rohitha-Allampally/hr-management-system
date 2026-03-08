import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import EmployeeForm from "../components/EmployeeForm";

const UpdateEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    salary: "",
    joiningDate: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    API.get(`/employees/${id}`).then((res) => {
      setEmployee(res.data);
    });
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/employees/${id}`, employee);
    navigate("/employees");
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>Update Employee</h2>
        <EmployeeForm
          employee={employee}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitText="Save"
        />
      </div>
    </div>
  );
};

export default UpdateEmployee;
