const express = require("express");
const Router = express.Router();
const validateUser = require("../validation/validate_user01");
const genToken = require("../token/genToken_01");
const hashPassword = require("../hash/hashPassword");
const User = require("../model/user");

Router.post("/", async (req, res) => {
  const isvalid = validateUser(req.body);
  if (isvalid != true)
    return res.status(400).json({ error: true, errMessage: isvalid });

  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      // console.log("use", user);
      if (!user.password) {
        user.set({
          email: req.body.email,
          phone_number: req.body.phone_number,
          country: req.body.country,
          // referral_link: `https://www.softjovial.com?${u}`,
          referral_link: `https://bluekiteinvestments.com?`,

          referral: req.body.referral,
        });
        await user.save();
        const token = genToken(user._id);
        return res.status(200).json({
          error: false,
          message: { user: user._id },
          token,
        });
      }
      return res
        .status(400)
        .json({ error: true, errMessage: "User already exist please login" });
    }

    const newUser = await new User({
      email: req.body.email,
      phone_number: req.body.phone_number,
      country: req.body.country,
      // referral_link: `https://www.softjovial.com?${req.body.email}`,
      referral_link: `https://bluekiteinvestments.com?`,

      referral: req.body.referral,
    });

    const result = await newUser.save();
    console.log("user", result);
    const token = genToken(result._id);
    res.status(200).json({
      error: false,
      message: { user: result._id },
      token,
    });
  } catch (err) {
    return res.status(400).json({ error: true, errMessage: err.message });
  }
});

module.exports = Router;
