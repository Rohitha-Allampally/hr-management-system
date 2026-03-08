import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await API.get("/employees");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Calculate statistics
  const totalEmployees = employees.length;
  const departments = [...new Set(employees.map(emp => emp.department).filter(dept => dept))];
  const totalDepartments = departments.length;
  
  // Count employees per department
  const departmentStats = departments.map(dept => ({
    name: dept,
    count: employees.filter(emp => emp.department === dept).length
  }));

  if (loading) {
    return (
      <div>
        <Navbar />
        <Sidebar />
        <div style={{ marginLeft: "220px", padding: "20px" }}>
          <h2>Dashboard</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>Dashboard</h2>
        
        {/* Summary Cards */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
          <div style={{ 
            backgroundColor: "white", 
            padding: "20px", 
            borderRadius: "8px", 
            flex: 1,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>Total Employees</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#0066cc", margin: "0" }}>
              {totalEmployees}
            </p>
          </div>

          <div style={{ 
            backgroundColor: "white", 
            padding: "20px", 
            borderRadius: "8px", 
            flex: 1,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>Total Departments</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#28a745", margin: "0" }}>
              {totalDepartments}
            </p>
          </div>
        </div>

        {/* Department-wise breakdown */}
        <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <h3 style={{ marginBottom: "20px", color: "#333" }}>Employees by Department</h3>
          
          {departmentStats.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "15px" }}>
              {departmentStats.map((dept, index) => (
                <div key={index} style={{
                  padding: "15px",
                  border: "1px solid #e9ecef",
                  borderRadius: "6px",
                  backgroundColor: "#f8f9fa"
                }}>
                  <h4 style={{ margin: "0 0 8px 0", color: "#495057" }}>{dept.name}</h4>
                  <p style={{ 
                    fontSize: "20px", 
                    fontWeight: "bold", 
                    color: "#6c757d", 
                    margin: "0" 
                  }}>
                    {dept.count} employee{dept.count !== 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#6c757d", fontStyle: "italic" }}>
              No departments found. Add employees with department information to see the breakdown.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
