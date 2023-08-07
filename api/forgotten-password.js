const expres = require("express");
const Router = expres.Router();
const User = require("../model/user");
const validate_email = require("../validation/validate_email");
const genToken = require("../token/genToken");
const Recover_password = require("../model/recover-password");

const {
  create_mail_options,
  transporter,
} = require("../mailer/recover-password");

Router.post("/", async (req, res) => {
  const request_isvalid = validate_email(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (!user)
      return res
        .status(200)
        .json({ error: false, message: "Recovery Email successfully sent" });

    let token = genToken(user._id);
    let user_name = req.body.email;
    let reset_link = `https://bluekiteinvestments.com/reset-password.html?${token}?${user_name}`;

    const recover_password = await new Recover_password({
      user: user._id,
      reset_token: `${token}?${user_name}`,
    });
    await recover_password.save();

    transporter.sendMail(
      create_mail_options({
        reciever_mail: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        reset_link,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
        // return res.status(400).json({
        //   error: true,
        //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
        // });
      }
    );
    res
      .status(200)
      .json({ error: false, message: "Recovery Email successfully sent" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
