// const nodemailer = require("nodemailer");

// const sendEmail = async (options) => {
//   //  create a transporter
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   // Define options

//   const mailOptions = {
//     from: "Abdelrahman Mostafa 👻 <abdo2e@gmail.com>", // sender address
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   //send mail to user

//   await transporter.sendMail(mailOptions);
// };

// module.exports=sendEmail

const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // define options of user

  const mailOptions = {
    from: "Abdelrahman Mostafa <abdo2e@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html
  };

  // actually send mail to user

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
