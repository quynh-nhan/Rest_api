const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'truongnguyenquynhnhan@gmail.com',
      pass: 'udwcchvrktnkrhpe'
    }
  });

module.exports = { transporter };
