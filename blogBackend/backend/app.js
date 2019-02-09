const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const mongoose = require('mongoose');


const postsRoutes = require('./routes/posts');


/* DB connection config */
mongoose.connect('mongodb+srv://goodtogo:1xivK8fPx59jyIYI@meanapp-ewu5f.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
.then(() => {
    console.log("Connected to cloud DB!");
}).catch(() => {
    console.log("Connection failed!");
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/api/posts', postsRoutes);

module.exports = app;