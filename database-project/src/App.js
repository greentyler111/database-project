// Required libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import './css/bootstrap.min.css';

var tableSrc = "/departments";
var queryText = "Nothing So Far";
var queryRes = "Nothing So Far";
var resData = {};
const TABLE_SRC_MAP = {"/employees": 0, "/departments": 1, "/salaries": 2, "/timesheets": 3};
const CRUD_STATEMENTS = [
  [`INSERT INTO Employees
  VALUES (4298, "Andrew Tate", "342-320-4201", "Social Media Influencer", 10);`,`INSERT INTO Departments
  VALUES (10, "Operations", "Bucharest", "2022-11-05");`,`INSERT INTO Salaries
  VALUES (3108, 1000000000.00, "2022-11-02", "2024-11-02", 4298);`,`INSERT INTO Timesheets
  VALUES (3198, "2023-03-02", "2024-03-16", 336.0, 4298);`],
  [`SELECT * FROM Employees WHERE EmployeeID = 4298;`,`SELECT * FROM Departments WHERE DepartmentID = 10;`,`SELECT * FROM Salaries WHERE SalaryID = 3108;`,`SELECT * FROM Timesheets WHERE TimesheetID = 3198;`],
  [`UPDATE Employees SET JobTitle = 'Prisoner' WHERE EmployeeID = 4298;`,`UPDATE Departments SET Location = 'Prison Cell' WHERE DepartmentID = 10;`,`UPDATE Salaries SET SalaryRate = 0.00 WHERE SalaryID = 3108;`,`UPDATE Timesheets SET HoursWorked = 1000.00 WHERE TimesheetID = 3198;`],
  [`DELETE FROM Employees WHERE EmployeeID = 4298;`,`DELETE FROM Departments WHERE DepartmentID = 10;`,`DELETE FROM Salaries WHERE SalaryID = 3108;`,`DELETE FROM Timesheets WHERE TimesheetID = 3198;`]
];

function Main() {

  const [tableData, setTableData] = useState(["", [queryText, queryRes]]);
  //const [resText, setResText] = useState(['Nothing So Far', 'Nothing So Far']);

  const performTableDataUpdate = () => {
    axios.get('http://localhost:5000' + tableSrc)
      .then(response => {
        resData = response.data;
        if (queryRes == "") queryRes = "Sucessfully retrieved " + resData.length + " entries";
        let resDataHeaderHTML = "";
        let resDataDataHTML = "";
        let objKeys = [];
        if (resData.length == 0) return setTableData([resDataHeaderHTML, [queryText, queryRes], resDataDataHTML]);
        for (let key in Object.keys(resData[0])) {
          objKeys.push(Object.keys(resData[0])[key]);
          resDataHeaderHTML += "<th>" + objKeys[key] + "</th>";
        }
        for (let i = 0; i < resData.length; ++i) {
          resDataDataHTML += "<tr>";
          for (let key in objKeys) {
            resDataDataHTML += "<td>" + resData[i][objKeys[key]] + "</td>";
          }
        }
        setTableData([resDataHeaderHTML, [queryText, queryRes], resDataDataHTML]);
      })
      .catch(error => {
        queryRes = "Database returned error";
        setTableData([resData, [queryText, queryRes]]);
        console.error(error);
      });
  }

  useEffect(() => {
    axios.get('http://localhost:5000' + tableSrc)
      .then(response => {
        queryRes = JSON.stringify(response.data);
        setTableData([resData, [queryText, queryRes]]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSelectChange = (e) => {
    queryRes = "";
    tableSrc = '/' + e.target.value.toLowerCase();
    queryText = "SELECT * FROM " + tableSrc.charAt(1).toUpperCase() + tableSrc.substring(2);
    performTableDataUpdate();
  }

  const handleButtonClick = async (tableEntry) => {
    // console.log(tableEntry);
    queryRes = "";
    queryText = CRUD_STATEMENTS[tableEntry][TABLE_SRC_MAP[tableSrc]];
    await axios.post('http://localhost:5000' + tableSrc, {queryText})
      .then(response => {
        queryRes = JSON.stringify(response.data);
      })
      .catch(error => {
        queryRes = "Database returned error";
        console.error(error);
      });
    performTableDataUpdate();
  }

  return (
    <div id="container">
    <div class="flex-xl-column flex-wrap">
    <div class="p-2 d-flex align-items-baseline q">
      <h4>Query ran: </h4><span class="queryBlock">{tableData[1][0]}</span>
      <h4>Query results: </h4><span class="queryBlock">{tableData[1][1]}</span>
    </div>
    <div class="d-flex align-items-baseline p-2 q">
      <select class="form-select form-select-lg mb-3" id="currentDatabase" onChange={handleSelectChange}>
        <option value="Departments">Departments</option>
        <option value="Employees">Employees</option>
        <option value="Salaries">Salaries</option>
        <option value="Timesheets">Timesheets</option>
      </select>
      <button class="btn btn-primary" onClick={() => handleButtonClick(0)}>Create New Record</button>
      <button class="btn btn-primary" onClick={() => handleButtonClick(1)}>Read A Record</button>
      <button class="btn btn-primary" onClick={() => handleButtonClick(2)}>Update A Record</button>
      <button class="btn btn-primary" onClick={() => handleButtonClick(3)}>Delete A Record</button>
    </div>
    <div class="d-flex align-items-baseline p-2">
    <h1>{tableSrc.charAt(1).toUpperCase() + tableSrc.substring(2)} List</h1>
    <br />
    <table class="table table-striped">
      <thead>
        <tr dangerouslySetInnerHTML={{__html: tableData[0]}}>
        </tr>
      </thead>
      <tbody dangerouslySetInnerHTML={{__html: tableData[2]}}>
      </tbody>
    </table>
    </div>
    </div>
    </div>
  );
}



export default Main;
