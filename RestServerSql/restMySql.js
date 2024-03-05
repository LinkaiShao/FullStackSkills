const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'V200399PV200399P.p',
  database: 'trysql'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Data to insert
const employeeData = {
  employee_id: 1,
  first_name: 'John',
  last_name: 'Doe',
  hourly_pay: 20.50,
  hire_date: '2024-02-25'
};

// SQL query to insert data
const query = 'INSERT INTO employees SET ?';

// Insert data into the employees table
connection.query(query, employeeData, (err, results) => {
  if (err) {
    console.error('Error inserting data:', err);
    return;
  }
  console.log('Data inserted successfully');
  // Close the connection
  connection.end();
});
