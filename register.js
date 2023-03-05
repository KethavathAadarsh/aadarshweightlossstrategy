const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// database configuration
const config = {
  user: 'HOC\aadarsh',
  password: 'your_password',
  server: 'localhost',
  database: 'registration',
  options: {
    encrypt: true, // required for Azure SQL database
    trustServerCertificate: true // required for Azure SQL database
  }
};

// register route
app.post('/register', (req, res) => {
  const { username, email, contact, password } = req.body;

  // insert data into database
  const query = `INSERT INTO dbo.User (Username, Email, Contact, Password) VALUES ('${username}', '${email}', '${contact}', '${password}')`;

  sql.connect(config, err => {
    if (err) {
      console.log(err);
      res.status(500).send('Database connection error');
    } else {
      // create Request object
      const request = new sql.Request();
      
      // execute query
      request.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send('Registration failed');
        } else {
          console.log(result);
          res.send('Registration successful');
        }
      });
    }
  });
});

// start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
