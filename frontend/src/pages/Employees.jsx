import { useEffect, useState } from "react";
import API from "../services/api";

const Employees = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await API.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchEmployees();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Employee List</h2>

      <ul>
        {employees.map((emp) => (
          <li key={emp.id}>
            {emp.name} - {emp.email} - {emp.department}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Employees;