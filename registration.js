const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'registration'
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// handle POST requests to /register
app.post('/register', (req, res) => {
  // extract form data
  const { username, email, contact, password } = req.body;

  // insert user record into database
  pool.query('INSERT INTO users (username, email, contact, password) VALUES (?, ?, ?, ?)',
             [username, email, contact, password],
             (error, results) => {
               if (error) {
                 res.status(500).send(error.message);
               } else {
                 res.send('Registration successful');
               }
             });
});

// start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
