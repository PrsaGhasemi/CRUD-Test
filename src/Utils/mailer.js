const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transportDetail = smtpTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },    
    tls: {
        rejectUnauthorized: false,
        ciphers : 'SSLv3'
    },
  });

  exports.sendMail = async (email,message) => {
    const transporter = nodemailer.createTransport(transportDetail);
    transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: email,
        text: message,
        subject: "Verification Mail",
        })
  };
