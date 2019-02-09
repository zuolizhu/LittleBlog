const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');


const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/auth');

/* DB connection config */
mongoose.connect('mongodb+srv://goodtogo:1xivK8fPx59jyIYI@meanapp-ewu5f.mongodb.net/test?retryWrites=true', {useNewUrlParser: true})
.then(() => {
    console.log("Connected to cloud DB!");
}).catch(() => {
    console.log("Connection failed!");
});
mongoose.set('useCreateIndex', true);




const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;