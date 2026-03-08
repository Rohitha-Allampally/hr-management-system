import React from "react";
import { Link } from "react-router-dom";

const EmployeeTable = ({ employees, onDelete }) => {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Joining Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.firstName}</td>
            <td>{emp.lastName}</td>
            <td>{emp.email}</td>
            <td>{emp.department}</td>
            <td>{emp.salary}</td>
            <td>{emp.joiningDate}</td>
            <td>
              <Link to={`/edit/${emp.id}`} style={{ marginRight: 8 }}>
                Edit
              </Link>
              <button onClick={() => onDelete(emp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
