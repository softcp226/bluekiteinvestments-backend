const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { datetime } = require("./system-variables");
// const transporter = nodemailer.createTransport(
//   smtpTransport({
//     host: "mail.softjovibiz",
//     secureConnection: false,
//     tls: {
//       rejectUnauthorized: false,
//     },
//     port: 587,
//     auth: {
//       user: "support@softjovibiz",
//       pass: process.env.mail_password,
//     },
//   }),
// );

let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: false,

  auth: {
    user: process.company_mail,
    pass: process.env.mail_password,
  },
});

let create_mail_options = (userInfo) => {
  return (mailOptions = {
    from: process.env.mail,
    // from:"michelleannschlloser@outlobiz",
    to: userInfo.reciever,
    subject: `Investment Confirmation Notification`,
    //   text:"just wanna know if this works",
    html: `
   <link rel="preconnect" href="https://fonts.googleapbiz" />
<link rel="preconnect" href="https://fonts.gstatbiz" crossorigin />
<link
  href="https://fonts.googleapbiz/css2?family=Nanum+Gothic+Coding&family=Nunito+Sans:ital,wght@0,600;0,700;1,600&family=Nunito:ital,wght@0,200;0,300;1,200&family=Open+Sans&family=Poppins:wght@200&family=Roboto:wght@400;500&display=swap"
  rel="stylesheet"
/>
<main>
 
<style>
@import url('https://fonts.googleapbiz/css2?family=Nanum+Gothic+Coding&family=Nunito+Sans:ital,wght@0,600;0,700;1,600&family=Nunito:ital,wght@0,200;0,300;1,200&family=Open+Sans&family=Poppins:wght@200&family=Roboto:wght@400;500&display=swap');

.maincontainer{
font-family: 'Nanum Gothic Coding', monospace;
font-family: 'Nunito', sans-serif;
font-family: 'Nunito Sans', sans-serif;
font-family: 'Open Sans', sans-serif;
font-family: 'Poppins', sans-serif;
font-family: 'Roboto', sans-serif;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      font-weight: 100;
      line-height: 2.5;
    }
    .cordial {
      font-size: 16px;
    
    }
    .head-txt {
      text-align: center;
      background-color: #142c8e;
      font-size: 20px;
      color: #fff;
    }
    .paragraph-01,
    .paragraph-02 {
      font-size: 15.5px;
      padding: 1px;
    }
    .paragraph-03 {
      font-weight: 400;
      font-size: 15.5px;
      padding: 1px;
      color: green;
    }
    .paragraph-04{
      font-size: 15.5px;
      padding: 1px; 
    }
    .disclaimer{
        font-size: 12px;
        font-weight: 700;
        padding: 0px;
    }
    h1,h2,h4,h5,h6{
        font-size: 18px;
    }
  </style>

    <div style="text-align: center;">
                <img src="https://bluekiteinvestments.com/assets/images/logo'.png"   alt="Company Logo" style="width: 70px; border-radius: 50%;">
                  <h3 style="text-align: center; font-size: 16px; color: #825ee4">BLUEKITE INVESTMENTS</h3>
               </div>

<div class="head-txt">
      
      <h5 style="font-size: 15px;">DEPOSIT CONFIRMATION NOTIFICATION</h5>
    </div>

    <p class="sm-p">
      Dear ${userInfo.first_name} ${userInfo.last_name}, thanks for creating an investment with us 
      on <b>${datetime}</b>.
    We understand that you entrust your financial investment with us. We want to let you know that your investment is safe with us and we are entitled to give you the best service
    </p>
    <p class="sm-p">
    NB:you can view /cancel all your investment anytime from your dashboard/investments.
      For more detailed informations, please contact our customer support or the
      relationship officer that would be assigned to you shortly
    </p>

  
    <h1
      style="
        font-size: 18px;
        text-align: center;
        background: #eee;
        color: #0c0e28 ;
      "
    >
     BLUEKITE INVESTMENTS
    </h1>
    <p class="disclaimer" style="font-size: 12px; font-weight: bolder">
      Disclaimer: this message was automatically generated via bluekite investments
      secured channel,please do not reply to this message all correspondence
      should be addressed to bluekiteinvestments.com or your relationship officer
    </p>
  </div>
</main>
 `,
  });
};
module.exports = { create_mail_options, transporter };
// transporter.sendMail(mailOptions, (err, info) => {
//   if (err)
//     return res
//       .status(400)
//       .json({ error: true, errMessage: `an error occured: ${err.message}` });
//   // console.log(info)
//   return res.status(200).json({ error: false, message: "message sent" });
//   // console.log("message sent",info)
// });

// //   if (err)
// //     return { error: true, errMessage: `an error occured: ${err.message}` };
// //   // console.log(info)
// //   return { error: false, message: "message sent" };
// // });
// };
