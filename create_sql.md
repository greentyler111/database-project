### SQL Statements to Create Tables
```
CREATE TABLE Departments (
  DepartmentID INT NOT NULL,
  Name CHAR(100) NOT NULL,
  Location CHAR(100),
  CreationDate DATE NOT NULL,
  PRIMARY KEY (DepartmentID)
);

CREATE TABLE Employees (
  EmployeeID INT NOT NULL,
  Name CHAR(100) NOT NULL,
  PhoneNumber CHAR(100),
  JobTitle CHAR(100),
  DepartmentID INT,
  PRIMARY KEY (EmployeeID),
  FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

CREATE TABLE Salaries (
  SalaryID INT NOT NULL,
  SalaryRate DECIMAL(19,2) NOT NULL,
  StartDate DATE NOT NULL,
  EndDate DATE NOT NULL,
  EmployeeID INT,
  PRIMARY KEY (SalaryID),
  FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

CREATE TABLE Timesheets (
  TimesheetID INT NOT NULL,
  StartDate DATE NOT NULL,
  EndDate DATE NOT NULL,
  HoursWorked FLOAT(53) NOT NULL,
  EmployeeID INT,
  PRIMARY KEY (TimesheetID),
  FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);
ALTER TABLE Employees
ADD FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID);
```
