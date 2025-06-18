const nodeMailer = require("nodemailer");
require("dotenv").config();

const transporter = nodeMailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendMail = (to, subject, html) => {
  transporter.sendMail({
    from: process.env.MAIL_USER,
    to,
    subject,
    html,
  });
};

module.exports = sendMail;
