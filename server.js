const express = require("express");
const { app } = require("./config/mongoose");
const cors = require("cors");
const path = require("path");
const logger = require('morgan');
const passport = require("passport");
const expressLayout = require("express-ejs-layouts")
const session = require("express-session")
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

// Paasport config
require('./config/passport')(passport)

const port = process.env.NODE_ENV || 4000;

// Cors Option
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
};

// configure
app.use(express.json({ limit: '25mb' }));
app.use(cors(corsOptions));

// Header
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// BodyParser
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false, limit: '25mb' }));

// Logger
app.use(logger('dev'));

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

// EJS
app.use(expressLayout);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => res.status(200).end())
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Mounting Up The Routes
app.use("/api", require("./api/routes/index"));

// No Path Found Middleware
app.use(("*", (req, _, next) => {
    return next({
        error: `Unable To Find Path ${req.protocol}://${req.url}, Kinly review it your path`,
        statusCode: 404
    })
}));

app.listen(port, (err) => {
    if (err) return console.log("Unable To Start Server");
    console.log(`Server Is Running On Port ${port}`);
})