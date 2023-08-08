const express = require("express");
const Router = express.Router();
const verifyToken_01 = require("../token/verifyToken_01");
const validate_user = require("../validation/validate_user");
const User = require("../model/user");
const hashPassword = require("../hash/hashPassword");
const {
  create_mail_options,
  transporter,
} = require("../mailer/reg_success_mail");
const cloudinary = require("../file_handler/cloudinary");
const upload = require("../file_handler/multer");
const genToken = require("../token/genToken");
const fs = require("fs");

Router.post("/", upload.any("passport"), verifyToken_01, async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const request_isvalid = validate_user(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });
  try {
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(400).json({
        error: true,
        errMessage: "an unexpected error occured please register again",
      });

    const uploader = async (path) => await cloudinary.uploads(path, "passport");
    let passport_url;
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      passport_url = newPath;
      fs.unlinkSync(path);
    }
    console.log(passport_url);
    if (passport_url.error)
      return res.status(400).json({
        error: true,
        errMessage:
          "Something went wrong in the server while trying to upload your passport, please check passport and try again",
      });

    const password = await hashPassword(req.body.password);

    const user_result = user.set({
      // referral_link: user._id,
      referral_link:`https://bluekiteinvestments.com?${user._id}`,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      passport: passport_url.url,
      password,
    });
    await user_result.save();
    const token = genToken(user_result._id);

    transporter.sendMail(
      create_mail_options({
        first_name: user_result.first_name,
        last_name: user_result.last_name,
        reciever: user.email,
      }),
      (err, info) => {
        if (err) return console.log(err.message);
        console.log(info);
        // return res.status(400).json({
        //   error: true,
        //   errMessage: `Encounterd an error while trying to send an email to you: ${err.message}, try again`,
        // });
      },
    );

    res
      .status(200)
      .json({ error: false, message: { user: user_result._id }, token });
    console.log(user);
    console.log("success");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
