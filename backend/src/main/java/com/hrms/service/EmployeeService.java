package com.hrms.service;

import com.hrms.model.Employee;
import com.hrms.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repository;

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public List<Employee> getAllEmployeesByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return repository.findById(id);
    }

    public Optional<Employee> getEmployeeByIdAndUserId(Long id, Long userId) {
        return repository.findById(id).filter(emp -> emp.getUserId().equals(userId));
    }

    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    public Employee saveEmployeeForUser(Employee employee, Long userId) {
        employee.setUserId(userId);
        return repository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee updated) {
        return repository.findById(id).map(emp -> {
            emp.setFirstName(updated.getFirstName());
            emp.setLastName(updated.getLastName());
            emp.setEmail(updated.getEmail());
            emp.setDepartment(updated.getDepartment());
            emp.setSalary(updated.getSalary());
            emp.setJoiningDate(updated.getJoiningDate());
            return repository.save(emp);
        }).orElse(null);
    }

    public Employee updateEmployeeForUser(Long id, Employee updated, Long userId) {
        return repository.findById(id).filter(emp -> emp.getUserId().equals(userId)).map(emp -> {
            emp.setFirstName(updated.getFirstName());
            emp.setLastName(updated.getLastName());
            emp.setEmail(updated.getEmail());
            emp.setDepartment(updated.getDepartment());
            emp.setSalary(updated.getSalary());
            emp.setJoiningDate(updated.getJoiningDate());
            return repository.save(emp);
        }).orElse(null);
    }

    public void deleteEmployee(Long id) {
        repository.deleteById(id);
    }

    public boolean deleteEmployeeForUser(Long id, Long userId) {
        Optional<Employee> employee = repository.findById(id);
        if (employee.isPresent() && employee.get().getUserId().equals(userId)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}
