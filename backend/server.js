// backend/server.js

const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const path = require('path');


// Initialize the app
const app = express();

// Set the port
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Add the new API route here
app.get('/api/services', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'cloudServices.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    res.json(JSON.parse(data));
  });
});


// A simple test route to make sure the server is working
app.get('/', (req, res) => {
  res.json({ message: "Hello from the CloudCompass backend!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});