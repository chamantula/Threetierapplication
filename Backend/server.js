const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt'); // For password hashing
const saltRounds = 10; // Salt rounds for password hashing

const app = express();
const port = 3000;

app.use(bodyParser.json());

const config = {
  user: 'sa',
  password: 'Harish@23',
  server: '192.168.29.161',
  database: 'tempdb',
  options: {
    encrypt: false, // Use encryption (for Azure SQL, remove this if not needed)
  },
};

// Function to connect to MSSQL
const connectToDatabase = async () => {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server');
  } catch (error) {
    console.error('Error connecting to SQL Server:', error);
  }
};

// Connect to the MSSQL database
connectToDatabase();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// Route for user registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists
    const checkQuery = `SELECT * FROM Users WHERE Username = @username`;
    const checkRequest = new sql.Request().input('username', sql.NVarChar, username);
    const checkResult = await checkRequest.query(checkQuery);

    if (checkResult.recordset.length > 0) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the user into the database
    const insertQuery = `INSERT INTO Users (Username, Password) VALUES (@username, @password)`;
    const insertRequest = new sql.Request()
      .input('username', sql.NVarChar, username)
      .input('password', sql.NVarChar, hashedPassword);

    await insertRequest.query(insertQuery);

    res.status(200).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Registration failed.' });
  }
});

// Route for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Retrieve user data from the database
    const query = `SELECT * FROM Users WHERE Username = @username`;
    const request = new sql.Request().input('username', sql.NVarChar, username);
    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: 'Login failed. User not found.' });
    }

    const user = result.recordset[0];

    // Compare the hashed password with the provided password
    const isPasswordMatch = await bcrypt.compare(password, user.Password);

    if (isPasswordMatch) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Login failed. Incorrect password.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Login failed.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

