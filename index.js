// Required libraries
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

//Create a new instance of express
const app = express();

// Set up the middleware
app.use(cors());
app.use(bodyParser.json());

// Create a connection pool for MySQL database
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'cs665_project'
});


// Define API endpoints
app.get('/employees', (req, res) => {
  pool.query('SELECT * FROM employees', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

app.get('/departments', (req, res) => {
  pool.query('SELECT * FROM departments', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

app.get('/salaries', (req, res) => {
  pool.query('SELECT * FROM salaries', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

app.get('/timesheets', (req, res) => {
  pool.query('SELECT * FROM timesheets', (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

app.post('/employees', (req, res) => {
  console.log("Lol")
  // const { first_name, last_name, email, phone_number, hire_date, job_title, department_id } = req.body;
  pool.query(req.body, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

app.post('/departments', (req, res) => {
  console.log("Lol")
  // const { first_name, last_name, email, phone_number, hire_date, job_title, department_id } = req.body;
  pool.query(req.body, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

app.post('/salaries', (req, res) => {
  console.log("Lol")
  // const { first_name, last_name, email, phone_number, hire_date, job_title, department_id } = req.body;
  pool.query(req.body, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

app.post('/timesheets', (req, res) => {
  console.log("Lol")
  // const { first_name, last_name, email, phone_number, hire_date, job_title, department_id } = req.body;
  pool.query(req.body, (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json(results);
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
