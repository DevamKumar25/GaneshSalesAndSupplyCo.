const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // Your Gmail address from .env
    pass: process.env.GMAIL_PASS, // Your Gmail App Password from .env
  },
});

module.exports = transporter;
