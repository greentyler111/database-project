### Database Description
# Database in 3NF
# Tables:
```
*Departments* Table with attributes:
· DepartmentID (Primary Key)
· Name
· Location
· CreationDate

*Employees* Table with attributes:
· EmployeeID (Primary Key)
· Name
· PhoneNumber
· JobTitle
· DepartmentID (Foreign Key)
with foreign key constraint DepartmentID REFERENCES Departments(DepartmentID)

*Salaries* Table with attributes:
· SalaryID (Primary Key)
· SalaryRate
· StartDate
· EndDate
· EmployeeID (Foreign Key)
with foreign key constraint EmployeeID REFERENCES Employees(EmployeeID)

*Timesheets* Table with attributes:
· TimesheetID (Primary Key)
· StartDate
· EndDate
· HoursWorked
· EmployeeID (Foreign Key)
with foreign key constraint EmployeeID REFERENCES Employees(EmployeeID)
```


# Functional Dependencies:
```
In *Departments* Table:
DepartmentID -> Name, Location, CreationDate

In *Employees* Table:
EmployeeID -> Name, PhoneNumber, JobTitle, DepartmentID

In *Salaries* Table:
SalaryID -> SalaryRate, StartDate, EndDate, EmployeeID

In *Timesheets* Table:
TimesheetID -> StartDate, EndDate, HoursWorked, EmployeeID
```

# Sample Rows of Data From *Employees* Table
```
EmployeeID    Name               PhoneNumber     JobTitle       DepartmentID
1234          Felix Kjellberg    321-192-1029    Youtuber       1
5678          Bobby Fischer      312-210-3109    Chess Player   2
```
