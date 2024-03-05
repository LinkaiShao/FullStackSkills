const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'V200399PV200399P.p',
  database: 'trysql'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON request bodies
app.use(express.json());

// Insert data endpoint
app.post('/insert', (req, res) => {
    const { first_name, last_name, hourly_pay, hire_date } = req.body;
    const sql = 'INSERT INTO employees (first_name, last_name, hourly_pay, hire_date) VALUES (?, ?, ?, ?)';
    connection.query(sql, [first_name, last_name, hourly_pay, hire_date], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error inserting data' });
      }
      console.log('Data inserted successfully');
      res.json({ message: 'Data inserted successfully' });
    });
  });
  

// Update data endpoint
app.put('/update', (req, res) => {
    const { new_hourly_pay, first_name, last_name } = req.body;
    const sql = 'UPDATE employees SET hourly_pay = ? WHERE first_name = ? AND last_name = ?';
    connection.query(sql, [new_hourly_pay, first_name, last_name], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error updating data' });
      }
      console.log('Data updated successfully');
      res.json({ message: 'Data updated successfully' });
    });
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
