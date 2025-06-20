import nodemailer, { Transporter, SendMailOptions } from 'nodemailer';

// MailDev SMTP config
const transporter: Transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false, // no TLS for MailDev
  ignoreTLS: true,
});

const mailOptions: SendMailOptions = {
  from: '"Test App" <test@example.com>',
  to: 'user@example.com',
    subject: 'Test Email',
  text: 'Hello from Node.js!',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error sending email:', error);
  }

  console.log('Email sent:', info.response);
  });