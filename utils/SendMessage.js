const nodemailer = require('nodemailer');
const gmailPW = process.env.GMAIL_PW;


module.exports = (userName, userEmail, subj, msg) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'homemade.hrla14@gmail.com',
          pass: gmailPW
      }
  });
  
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Team Homemade" <homemade.hrla14@gmail.com>', // sender address
      to: `${userEmail}`, // list of receivers
      subject: `${subj}`, // Subject line
      text: `${msg}` // plain text body
      
  };
  
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  }); 

}

