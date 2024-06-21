const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/styles', express.static('public/styles'));

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'authdb',
    password: 'ridho.anjay.1111', 
    port: 5432,
});

client.connect();

// Section Authentication
app.post('/auth', async (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [username, password];

    try {
        const result = await client.query(query, values);
        if (result.rows.length > 0) {
            res.sendFile(__dirname + '/views/success.html');
        } else {
            res.send('Invalid username or password. Please try again.');
        }
    } catch (err) {
        console.error(err);
        res.send('Error occurred. Please try again.');
    }
});

// Section registration
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
    const values = [username, email, password];

    try {
        await client.query(query, values);
        res.sendFile(__dirname + '/views/success.html');
    } catch (err) {
        console.error(err);
        res.send('Please try again.');
    }
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.get('/next', (req, res) => {
    res.sendFile(__dirname + '/views/next.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
