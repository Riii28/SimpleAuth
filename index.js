const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/styles', express.static('public/styles'));

const client = new Client({
    user: 'postgres', // Ganti dengan username PostgreSQL Anda
    host: 'localhost',
    database: 'authdb',
    password: 'ridho.anjay.1111', // Ganti dengan password PostgreSQL Anda
    port: 5432,
});

client.connect();

app.post('/auth', async (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [username, password];

    try {
        const result = await client.query(query, values);
        if (result.rows.length > 0) {
            const userId = result.rows[0].id; // Ambil userId dari hasil query
            res.redirect(`/success?userId=${userId}`);
        } else {
            res.redirect(`/error?message=Invalid%20username%20or%20password.%20Please%20try%20again.`);
        }
    } catch (err) {
        console.error(err);
        res.redirect(`/error?message=Error%20occurred.%20Please%20try%20again.`);
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    const userQuery = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id';
    const userValues = [username, email, password];

    try {
        const result = await client.query(userQuery, userValues);
        const userId = result.rows[0].id; // Ambil userId dari hasil query
        res.redirect(`/success?userId=${userId}`);
    } catch (err) {
        console.error(err);
        res.redirect(`/error?message=Error%20occurred%20during%20registration.%20Please%20try%20again.`);
    }
});

app.post('/submit-choice', async (req, res) => {
    const { choice, userId } = req.body;
    const validChoices = ['mau', 'ngga'];

    if (!validChoices.includes(choice)) {
        return res.redirect(`/error?message=Invalid%20choice%20value.`);
    }

    if (!userId) {
        return res.redirect(`/error?message=User%20ID%20is%20missing.`);
    }

    const choiceQuery = 'INSERT INTO user_choices (user_id, choice) VALUES ($1, $2)';
    const choiceValues = [userId, choice];

    try {
        await client.query(choiceQuery, choiceValues);

        if (choice === 'ngga') {
            res.redirect(`/ngga`);
        } else {
            res.redirect(`/next2?userId=${userId}`);
        }
    } catch (err) {
        console.error(err);
        res.redirect(`/error?message=Error%20occurred%20during%20submitting%20choice.%20Please%20try%20again.`);
    }
});

app.post('/submit-choice2', async (req, res) => {
    const { choice2, userId } = req.body;
    const validChoices2 = ['pantai', 'puncak', 'mall'];

    if (!validChoices2.includes(choice2)) {
        return res.redirect(`/error?message=Invalid%20choice%20value.`);
    }

    if (!userId) {
        return res.redirect(`/error?message=User%20ID%20is%20missing.`);
    }

    const choiceQuery2 = 'INSERT INTO user_choices2 (user_id, choice) VALUES ($1, $2)';
    const choiceValues2 = [userId, choice2];

    try {
        await client.query(choiceQuery2, choiceValues2);
        res.sendFile(__dirname + '/views/success.html');
    } catch (err) {
        console.error(err);
        res.redirect(`/error?message=Error%20occurred%20during%20submitting%20choice.%20Please%20try%20again.`);
    }
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/views/success.html');
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html');
});

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/next', (req, res) => {
    res.sendFile(__dirname + '/views/next.html');
});

app.get('/next2', (req, res) => {
    res.sendFile(__dirname + '/views/next2.html');
});


app.get('/error', (req, res) => {
    res.sendFile(__dirname + '/views/error.html');
});

app.get('/ngga', (req, res) => {
    res.sendFile(__dirname + '/views/ngga.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
