const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Backend server is up!'));

app.get('/test', (req, res) => res.send('test works'));

app.listen(port, () => console.log(`Backend is running on port ${port}!`));