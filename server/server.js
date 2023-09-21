// const express = require('express');
// const bodyParser = require('body-parser');
// const db = require('./db'); // Import your CockroachDB connection

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware for parsing JSON requests
// app.use(bodyParser.json());

// // Sample array to store skills (replace with a database)
// const skills = [];

// // API endpoint to fetch skills
// app.get('/api/skills', (req, res) => {
//   res.json(skills);
// });

// // API endpoint to add a skill
// // Example Express.js route for posting skills to CockroachDB
// app.post('/api/skills', async (req, res) => {
//   try {
//     const { event_id, skills } = req.body;

//     // Insert skills into CockroachDB using SQL queries
//     await db.none('INSERT INTO skills (event_id, skill) VALUES ($1, $2)', [
//       event_id,
//       skills,
//     ]);

//     res.json({ message: 'Skills inserted into CockroachDB successfully' });
//   } catch (error) {
//     console.error('Error inserting skills into CockroachDB:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
