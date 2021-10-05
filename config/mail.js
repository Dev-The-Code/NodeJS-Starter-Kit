var nodemailer = require('nodemailer');
require("dotenv").config();

const username = process.env.email;
const password = process.env.password;
const host = process.env.host;

exports.transport = () => {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // create reusable transporter object using the default SMTP transport
    return nodemailer.createTransport({
        host: host,
        connectionTimeout: 60000,
        greetingTimeout: 30000,
        auth: {
            user: username, // generated ethereal user
            pass: password, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
};