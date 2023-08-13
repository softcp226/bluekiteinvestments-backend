const express = require("express");
const Router = express.Router();
const verifyToken = require("../secure-admin-api/verifyToken");
const Withdrawal_request = require("../model/withdrawal_request");
const Transaction = require("../model/transaction");
const User = require("../model/user");
const Admin = require("../model/admin");
const validate_admin_fetchuser = require("../validation/validate-admin-fetchuser");
const validate_withdrawal_request = require("../validation/validate-admin-delete-withdrawal");

const {
  create_mail_options,
  transporter,
} = require("../mailer/approve_withdrawal");

const {
  withdrawal_mail_options,
  withdrawal_transaporter,
} = require("../mailer/cancel_withdrawal");

Router.post("/", verifyToken, async (req, res) => {
  const request_isvalid = validate_admin_fetchuser(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });

  try {
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });
    const withdrawal = await Withdrawal_request.find().populate("user");
    if (withdrawal.length < 1)
      return res.status(400).json({
        error: true,
        errMessage: "No one has initiated a withdraw transaction at the moment",
      });
    res.status(200).json({ error: false, message: withdrawal });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/withdrawal/approve", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_withdrawal_request(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    const withdrawal_request = await Withdrawal_request.findById(
      req.body.withdrawal_request,
    ).populate("user");
    if (!withdrawal_request)
      return res.status(400).json({
        error: true,
        errMessage: "The withdrawal you tried to approve no longer exist",
      });

    const transaction = await Transaction.findById(
      withdrawal_request.withdrawal_transaction,
    );

    if (!transaction)
      return res.status(400).json({
        error: true,
        errMessage:
          "There was an issue with the withdrawal you tried to approve ",
      });
    transaction.set({ status: "success" });
    await transaction.save();

    await Withdrawal_request.findByIdAndDelete(req.body.withdrawal_request);

    transporter.sendMail(
      create_mail_options({
        first_name: withdrawal_request.user.first_name,
        last_name: withdrawal_request.user.last_name,
        amount: transaction.debit,
        reciever: withdrawal_request.user.email,
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
    res.status(200).json({ error: false, message: "success" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});

Router.post("/withdrawal/disapprove", verifyToken, async (req, res) => {
  try {
    const request_isvalid = validate_withdrawal_request(req.body);
    if (request_isvalid != true)
      return res.status(400).json({ error: true, errMessage: request_isvalid });
    const admin = await Admin.findById(req.body.admin);
    if (!admin)
      return res.status(403).json({
        error: true,
        errMessage: "Forbidden!, please login again to access this api",
      });

    const withdrawal_request = await Withdrawal_request.findById(
      req.body.withdrawal_request,
    );
    const user = await User.findById(withdrawal_request.user);
    if (!user) {
      await Withdrawal_request.findByIdAndDelete(req.body.withdrawal_request);

      return res.status(400).json({
        error: true,
        errMessage:
          "There was an issue with the withdrawal you tried to disapprove, seems the user has been deleted ",
      });
    }
    if (!withdrawal_request)
      return res.status(400).json({
        error: true,
        errMessage: "The withdrawal you tried to approve no longer exist",
      });

    const transaction = await Transaction.findById(
      withdrawal_request.withdrawal_transaction,
    );

    if (!transaction) {
      await Withdrawal_request.findByIdAndDelete(req.body.withdrawal_request);
      return res.status(400).json({
        error: true,
        errMessage:
          "There was an issue with the withdrawal you tried to approve ",
      });
    }

    user.set({
      final_balance:
        user.final_balance + parseInt(withdrawal_request.withdrawal_amount),
    });
    transaction.set({ status: "failed" });
    Promise.all([await user.save(), await transaction.save()]);
    await Withdrawal_request.findByIdAndDelete(req.body.withdrawal_request);

   withdrawal_transaporter.sendMail(
      withdrawal_mail_options({
        first_name: withdrawal_request.user.first_name,
        last_name: withdrawal_request.user.last_name,
        amount: transaction.debit,
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
    res.status(200).json({ error: false, message: "success" });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});


module.exports=Router