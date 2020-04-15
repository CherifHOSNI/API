const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');

var passport = require('passport'),
    jwt = require('jsonwebtoken');

var hookJWTStategy = require('./middlewares/passeportStrategy')

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//hook up http logger
app.use(morgan('dev'));

//hook up passport
app.use(passport.initialize());
hookJWTStategy(passport);

const db = require("./models/index");

db.sequelize.sync({force: true}).then(() => {
//db.sequelize.sync().then(() => {
    console.log('Drop and Resync Db');
});


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my data API." });
});


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app, passport);
require('./routes/team.routes')(app, passport);
require('./routes/game.routes')(app, passport);
require('./routes/odds.routes')(app, passport);


// set port, listen for requests
const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
