// // db.js

// const pgp = require('pg-promise')();

// // Connection string for CockroachDB
// const connectionString = 'postgresql://edison:SZ5ZOI7Lo6xqs3oXpiAChw@poorer-cyclops-5356.g8z.cockroachlabs.cloud:26257/test?sslmode=verify-full';

// const db = pgp(connectionString);
// db.none(`
//   CREATE TABLE IF NOT EXISTS skills ( 
//     id SERIAL PRIMARY KEY,
//     event_id INT NOT NULL
//   )
// `)
//   .then(() => {
//     console.log('Table "skills" has been initialized.');
//   })
//   .catch((error) => {
//     console.error('Error initializing "skills" table:', error);
//   });

// db.connect()
//   .then((obj) => {
//     console.log('Connected to the database');
//     obj.done(); // Release the connection
//   })
//   .catch((error) => {
//     console.error('Error connecting to the database:', error);
//   });


// module.exports = db;
