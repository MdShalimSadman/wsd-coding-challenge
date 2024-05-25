const express = require('express');
const path = require('path');
const textRoutes = require('./routes/textRoutes');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', textRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/result', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'result.html'));
});

module.exports = app;
