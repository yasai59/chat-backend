const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWD,
  },
});

transporter.verify().then(() => {
  console.log("Listo para mandar correos!".green + "📫");
});

module.exports = {
  transporter,
};
