const EmployeeCard = ({ employee }) => {
  return (
    <div style={styles.card}>
      <h4>{employee.name}</h4>
      <p>Email: {employee.email}</p>
      <p>Department: {employee.department}</p>
      <p>Role: {employee.role}</p>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    margin: "10px",
    width: "250px",
  },
};

export default EmployeeCard;