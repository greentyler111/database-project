###CRUD Statements
#Create Some New Records
```
INSERT INTO Employees
VALUES (4298, "Andrew Tate", "342-320-4201", "Social Media Influencer", 10);

INSERT INTO Departments
VALUES (10, "Operations", "Bucharest", 4298);

INSERT INTO Salaries
VALUES (3108, 1000000000.00, "2022-11-02", "2024-11-02", 4298);

INSERT INTO Timesheets
VALUES (3198, "2023-03-02", "2024-03-16", 336.0, 4298);
```


#Read Some Records
```
SELECT * FROM Employees WHERE EmployeeID = 4298;

SELECT * FROM Departments WHERE DepartmentID = 10;

SELECT * FROM Salaries WHERE SalaryID = 3108;

SELECT * FROM Timesheets WHERE TimesheetID = 3198;
```


#Update Some Records
```
UPDATE Employees SET JobTitle = 'Prisoner' WHERE id = 4298;

UPDATE Departments SET Location = 'Prison Cell' WHERE id = 10;

UPDATE Salaries SET SalaryRate = 0.00 WHERE id = 3108;

UPDATE Timesheets SET HoursWorked = 1000.00 WHERE id = 3198;
```

#Delete Some Records
```
DELETE FROM Timesheets WHERE id = 3198;

DELETE FROM Salaries WHERE id = 3108;

DELETE FROM Departments WHERE id = 10;

DELETE FROM Employees WHERE id = 4298;
```
