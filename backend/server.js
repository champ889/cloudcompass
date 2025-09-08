// backend/server.js

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const fs = require('fs'); 
const path = require('path');

// Initialize the app
const app = express();

// Set the port
const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();

// Middleware
if (process.env.NODE_ENV !== "production") {
app.use(cors());
}
app.use(express.json());
app.use('/icons', express.static(path.join(__dirname, 'icons')));

// Add the new API route here
app.get('/api/services', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'cloudServices.json');
  
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred');
    }
    try {
      res.json(JSON.parse(data));
    } catch (error) {
      console.error('Error parsing JSON:', error);
      res.status(500).send('Error parsing JSON');
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});