const { Client } = require('pg');
const express = require('express');

// create an express application
const app = express();
app.use(express.json());
// create a postgresql client
const client = new Client({
    database: 'social-media'
});

// route handlers go here
app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        res.send(result.rows);
    });
});

app.post('/users', (req,res) => {
    const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
    const values = ['kenzie', 'Kenzie Academy is a user experience design and coding school in Indianapolis, Indiana. Our 6-month to 2-year program with 1-year paid apprenticeship is a new alternative to traditional colleges and short-term coding bootcamps.'];
    client.query(text, values, (err, result) => {
        err ? console.log(err) : res.send(result.rows);
});
});

app.get('/users/:id', (req,res) => {
    console.log(req.params)
    const text = 'SELECT * FROM users WHERE id = $1';
    const values = [req.params.id]
    client.query(text, values, (err, result) => {
        err ? console.log(err) : res.send(result.rows);
    });
});
// route handlers go here

// start a server that listens on port 3000 and connects the sql client on success
app.listen(3000, () => {
    client.connect();
});