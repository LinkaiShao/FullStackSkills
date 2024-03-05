const express = require('express');
const mysql = require('mysql');

const app = express();

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'V200399PV200399P.p',
  database: 'trysql'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Middleware to parse JSON bodies
app.use(express.json());

// Define endpoint to insert employee
app.post('/employees', (req, res) => {
  const employeeData = req.body;

  const query = 'INSERT INTO employees SET ?';
  connection.query(query, employeeData, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Data inserted successfully');
    res.status(201).json({ message: 'Employee inserted successfully' });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
