// server.js

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'banner_db'
});

// Establish the database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    process.exit(1); // Exit if connection fails
  } else {
    console.log('Database connected successfully');
  }
});

// Create database and table if they don't exist
db.query('CREATE DATABASE IF NOT EXISTS banner_db;', (err) => {
  if (err) {
    console.error('Error creating database:', err);
    return;
  }
  db.query('USE banner_db;', (err) => {
    if (err) {
      console.error('Error selecting database:', err);
      return;
    }
    db.query(`CREATE TABLE IF NOT EXISTS banner (
      id INT AUTO_INCREMENT PRIMARY KEY, 
      description TEXT, 
      link VARCHAR(255), 
      timer INT, 
      isVisible BOOLEAN
    );`, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Database and table setup completed');
      }
    });
  });
});

// API endpoint to get banner data
app.get('/api/banner', (req, res) => {
  db.query('SELECT * FROM banner WHERE id = 1', (err, results) => {
    if (err) {
      console.error('Error fetching banner data:', err);
      res.status(500).json({ error: 'Database query failed' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'Banner not found' });
      return;
    }
    const banner = results[0];
    const endTime = new Date().getTime() + (banner.timer * 1000); // Assuming timer is in seconds
    res.json({
      description: banner.description,
      endTime: endTime,
      link: banner.link,
      isVisible: banner.isVisible
    });
  });
});

// API endpoint to update banner data
app.post('/api/banner', (req, res) => {
  const { description, link, timer, isVisible } = req.body;
  db.query('UPDATE banner SET description = ?, link = ?, timer = ?, isVisible = ? WHERE id = 1', 
    [description, link, timer, isVisible], (err) => {
    if (err) {
      console.error('Error updating banner data:', err);
      res.status(500).json({ error: 'Database update failed' });
      return;
    }
    res.send('Banner updated');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
