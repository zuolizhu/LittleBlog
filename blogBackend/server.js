const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const mongoose = require('mongoose');

/* Controllers */
const register = require('./controllers/register');
const signin = require('./controllers/signin');

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


app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, bcrypt);
});

app.post('/register', (req, res) => {
	register.handleRegister(req, res, bcrypt);
});

app.listen(3000, () => {
	console.log('Blog back end server is running on port 3000');
});