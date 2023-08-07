const express = require("express");
const Router = express.Router();
const User = require("../model/user");
const verifyToken = require("../token/verifyToken");
const validate_create_investment = require("../validation/validate-create-investment");
const create_investment = require("../shape-model/create-investment");
const {
  create_mail_options,
  transporter,
} = require("../mailer/investment_email");

Router.post("/", verifyToken, async (req, res) => {
  console.log(req.body);
  const request_isvalid = validate_create_investment(req.body);
  if (request_isvalid != true)
    return res.status(400).json({ error: true, errMessage: request_isvalid });
  try {
    const user = await User.findById(req.body.user);
    if (!user)
      return res.status(404).json({
        error: true,
        errMessage: "invalid request, please login to create an investment",
      });

    if (parseInt(req.body.investment_amount) > user.final_balance)
      return res.status(400).json({
        error: true,
        errMessage:
          "Insufficient fund, please deposit more fund to your wallet to create an investment",
      });

    if (parseInt(req.body.investment_amount) < 1500)
      return res.status(400).json({
        error: true,
        errMessage:
          "You have exceeded your trading limit for the basic plan, please deposit atleast $1,500 into your account to continue trading on the premium plan",
      });

    // if (parseInt(req.body.investment_amount) < parseInt(user.min_investment))
    //   return res.status(403).json({
    //     error: true,
    //     errMessage: `Your min trading amount has been raised to ${user.min_investment}. you can only create trades that are more than ${user.min_investment} at the moment `,
    //   });

    //     if(user.created_same_investment_ealier >=1 && parseInt(req.body.investment_amount) < parseInt(user.prev_investment) * 2)return res
    //       .status(403)
    //       .json({
    //         error: true,
    //         errMessage: `you cant create trade that are less than $${
    //           parseInt(user.prev_investment) * 2
    //         } `,
    //       });
    //     if (
    //       parseInt(user.created_same_investment_ealier) >= 2
    //     ){

    //       if(      parseInt(req.body.investment_amount) < parseInt(user.prev_investment) * 3
    // ){return res.status(403).json({
    //   error: true,
    //   errMessage: `you can no longer create trades that are less than $${
    //     user.prev_investment * 3
    //   }. Your account has upgraded`,
    // });
    // }
    //     }

    //       // if (parseInt(user.prev_investment) > 0){
    //  if (
    //    parseInt(user.prev_investment * 2) >= parseInt(req.body.investment_amount)
    //  ) {
    //    user.set({
    //      created_same_investment_ealier: ++user.created_same_investment_ealier,
    //    });
    // //  }else{
    // //   user.set({
    // //     created_same_investment_ealier: --user.created_same_investment_ealier,
    // //   });
    //  }
    //       // }

    //     // const check_created_same_investment_earlier = () => {
    //     //   if (user.created_same_investment_ealier >= 2) return 0;
    //     //   if (
    //     //     parseInt(user.prev_investment * 2) <=
    //     //     parseInt(req.body.investment_amount)
    //     //   )
    //     //     return ++user.created_same_investment_ealier;
    //     // };

    user.set({
      active_investment:
        parseInt(user.active_investment) + parseInt(req.body.investment_amount),
      final_balance: user.final_balance - parseInt(req.body.investment_amount),

      // created_same_investment_ealier: check_created_same_investment_earlier(),
      // prev_investment:
      //   parseInt(user.prev_investment) <
      //   parseInt(req.body.investment_amount / 2)
      //     ? parseInt(req.body.investment_amount / 2)
      //     : parseInt(user.prev_investment),
    });
    await user.save();
    // console.log(user.parseInt);
    await create_investment(req);

    transporter.sendMail(
      create_mail_options({
        first_name: user.first_name,
        last_name: user.last_name,
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

    res.status(200).json({
      error: false,
      message: "success!, you just created an investment",
    });
  } catch (error) {
    res.status(400).json({ error: true, errMessage: error.message });
  }
});
module.exports = Router;
