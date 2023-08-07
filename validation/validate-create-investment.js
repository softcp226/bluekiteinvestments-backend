// const Joi = require("joi");
// const validate_create_investment = (req) => {
//   const schema = Joi.object({
//     user: Joi.string().required().max(1000),
//     amount: Joi.number().required().min(0),
//     currency: Joi.string().required().max(1000),
//     return_time: Joi.string().required().max(1000),
//     profit: Joi.number().required().min(0),
//   });
//   const result = schema.validate({
//     user: req.user,
//     amount: req.investment_amount,
//     currency: req.currency,
//     return_time: req.return_time,
//     profit: req.profit,
//   });
//   if (result.error) return result.error.message;
//   return true;
// };
// module.exports = validate_create_investment;




const Joi = require("joi");
const validate_create_investment = (req) => {
  const schema = Joi.object({
    user: Joi.string().required().max(1000),
    amount: Joi.number().required().min(0),
    completion_time: Joi.string().required(),
    investment_plan: Joi.string().required().max(1000),
    // return_time: Joi.string().required().max(1000),
    profit: Joi.number().required().min(0),
  });
  const result = schema.validate({
    user: req.user,
    amount: req.investment_amount,
    completion_time: req.completion_time,
    investment_plan: req.investment_plan,
    // return_time: req.return_time,
    profit: req.profit,
  });
  if (result.error) return result.error.message;
  return true;
};
module.exports = validate_create_investment;
