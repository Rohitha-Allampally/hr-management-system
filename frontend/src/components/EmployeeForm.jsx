import React from "react";

const EmployeeForm = ({ employee, onChange, onSubmit, submitText }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={employee.firstName}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={employee.lastName}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Department:</label>
        <input
          type="text"
          name="department"
          value={employee.department}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Salary:</label>
        <input
          type="number"
          name="salary"
          value={employee.salary}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <label>Joining Date:</label>
        <input
          type="date"
          name="joiningDate"
          value={employee.joiningDate}
          onChange={onChange}
          required
        />
      </div>
      <button type="submit">{submitText}</button>
    </form>
  );
};

export default EmployeeForm;
