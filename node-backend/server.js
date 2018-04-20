const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
var logger = require('morgan');
require('dotenv').config()


mongoose.Promise = require('bluebird');

mongoose.connect(process.env.mongoUrl);


// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+ process.env.mongoUrl);
});
// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

const app = express();




const port = process.env.PORT || 8080;


app.use(logger('dev'));


// CORS Middleware
app.use(cors());


// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

const users = require('./routes/users');
const confirmation = require('./routes/confirmation');
const posts = require('./routes/posts');

app.use('/users', users);
app.use('/confirmation', confirmation);
app.use('/posts', posts);




// Index Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './angular-src/dist/index.html'));
//   res.send('Hello from not / endpoint');
// });

// Start Server
// app.listen(port, () => {
//   console.log('Server started on port '+port);
// });
module.exports = app;