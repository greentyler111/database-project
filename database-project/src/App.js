// Required libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap.min.css';

var tableSrc = "/employees";
var queryText = "Nothing So Far";
var queryRes = "Nothing So Far";
var resData = {};
const TABLE_SRC_MAP = {"/employees": 0, "/departments": 1, "/salaries": 2, "/timesheets": 3};
const CRUD_STATEMENTS = [
  [`INSERT INTO Employees
  VALUES (4298, "Andrew Tate", "342-320-4201", "Social Media Influencer", 10);`,`INSERT INTO Departments
  VALUES (10, "Operations", "Bucharest", 4298);`,`INSERT INTO Salaries
  VALUES (3108, 1000000000.00, "2022-11-02", "2024-11-02", 4298);`,`INSERT INTO Timesheets
  VALUES (3198, "2023-03-02", "2024-03-16", 336.0, 4298);`],
  [`SELECT * FROM Employees WHERE EmployeeID = 4298;`,`SELECT * FROM Departments WHERE DepartmentID = 10;`,`SELECT * FROM Salaries WHERE SalaryID = 3108;`,`SELECT * FROM Timesheets WHERE TimesheetID = 3198;`],
  [`UPDATE Employees SET JobTitle = 'Prisoner' WHERE id = 4298;`,`UPDATE Departments SET Location = 'Prison Cell' WHERE id = 10;`,`UPDATE Salaries SET SalaryRate = 0.00 WHERE id = 3108;`,`UPDATE Timesheets SET HoursWorked = 1000.00 WHERE id = 3198;`],
  [`DELETE FROM Employees WHERE id = 4298;`,`DELETE FROM Departments WHERE id = 10;`,`DELETE FROM Salaries WHERE id = 3108;`,`DELETE FROM Timesheets WHERE id = 3198;`]
];

function Main() {

  const [tableData, setTableData] = useState(["", [queryText, queryRes]]);
  //const [resText, setResText] = useState(['Nothing So Far', 'Nothing So Far']);

  const performTableDataUpdate = () => {
    axios.get(tableSrc)
      .then(response => {
        resData = response.data;
        setTableData([resData, [queryText, queryRes]]);
      })
      .catch(error => {
        queryRes = "Failed to retrieve the table";
        setTableData([resData, [queryText, queryRes]]);
        console.error(error);
      });
  }

  useEffect(() => {
    axios.get(tableSrc)
      .then(response => {
        resData = response.data;
        setTableData([resData, [queryText, queryRes]]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSelectChange = (e) => {
    tableSrc = '/' + e.target.value.toLowerCase();
    performTableDataUpdate();
  }

  const handleButtonClick = (tableEntry) => {
    // console.log(tableEntry);
    queryText = CRUD_STATEMENTS[tableEntry][TABLE_SRC_MAP[tableSrc]];
    axios.post(tableSrc)
      .then(response => {
        queryRes = response.data;
      })
      .catch(error => {
        console.error(error);
      });
    performTableDataUpdate();
  }

  return (
    <div id="container">
    <div class="flex-xl-column flex-wrap">
    <div class="p-2 d-flex align-items-baseline q">
      <h3>Results from the Database</h3>
      <h4>Query ran: </h4><span class="queryBlock">{tableData[1][0]}</span>
      <h4>Query results: </h4><span class="queryBlock">{tableData[1][1]}</span>
    </div>
    <div class="d-flex align-items-baseline p-2 q">
      <h1>CRUD Statements</h1>
      Select Database: <select class="form-select form-select-lg mb-3" id="currentDatabase" onChange={handleSelectChange}>
        <option value="Employees">Employees</option>
        <option value="Departments">Departments</option>
        <option value="Salaries">Salaries</option>
        <option value="Timesheets">Timesheets</option>
      </select>
      <br /><br />
      <button class="btn btn-primary" onClick={() => handleButtonClick(0)}>Create New Record</button>
      <button class="btn btn-primary" onClick={() => handleButtonClick(1)}>Read A Record</button>
      <button class="btn btn-primary" onClick={() => handleButtonClick(2)}>Update A Record</button>
      <button class="btn btn-primary" onClick={() => handleButtonClick(3)}>Delete A Record</button>
    </div>
    <div class="d-flex align-items-baseline p-2">
    <h1>{tableSrc.charAt(1).toUpperCase() + tableSrc.substring(2)} List</h1>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Hire Date</th>
          <th>Job Title</th>
          <th>Department ID</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map(tableData => (
          <tr key={tableData.id}>
            <td>{tableData.id}</td>
            <td>{tableData.first_name} {tableData.last_name}</td>
            <td>{tableData.email}</td>
            <td>{tableData.phone_number}</td>
            <td>{tableData.hire_date}</td>
            <td>{tableData.job_title}</td>
            <td>{tableData.department_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
    </div>
  );
}



export default Main;
