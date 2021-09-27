const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require('morgan');
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const port = process.env.NODE_ENV || 5000;


// Cors Option
const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
};

// configure
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({limit: '25mb'}));
app.use(cors(corsOptions));

// Header 
//app use
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

// Body/cookie Parsing
app.use(bodyParser.json()); // handle json data
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/', (req, res) => res.status(200).end())
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Mounting Up The Routes
app.use("/api", require("./api/routes/index"));

// No Path Found Middleware
app.use(("*", (req, _, next) => {
    return next({
        error: `Unable To Find Path ${req.protocol}://${req.url}`,
        statusCode: 404
    })
}));

app.listen(port, (err) => {
    if (err) return console.log("Unable To Start Server :(");
    console.log(`Server Is Running On Port ${port}`);
})
