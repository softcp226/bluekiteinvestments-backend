// const mongoose = require("mongoose");
// const connect = require("./dbConnector");
// connect("connected to transaction database");
// require("./user");

// const investment_schema = mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "user",
//     required: true,
//   },
//   transaction_date: {
//     type: String,
//     required: true,
//   },
//   refrence_number: {
//     type: String,
//     required: true,
//   },
//   amount: {
//     type: Number,
//     required: true,
//   },
//   currency: {
//     type: String,
//     required: true,
//   },
//   return_time: {
//     type: String,
//     required: true,
//   },

//   profit: {
//     type: Number,
//     default: 0,
//   },
//   pending_profit: {
//     type: Number,
//     required: true,
//   },
//   investment_end_date: {
//     type: String,
//     required: true,
//   },

//   loss: {
//     type: Number,
//     default: 0,
//   },
//   show_loss: {
//     type: Boolean,
//     required: true,
//     default: false,
//   },
// });

// const Investment = mongoose.model("investment", investment_schema);
// module.exports = Investment;























const mongoose = require("mongoose");
const connect = require("./dbConnector");
connect("connected to transaction database");
require("./user");

const investment_schema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  transaction_date: {
    type: String,
    required: true,
  },
  refrence_number: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  completion_time: {
    type: String,
    required: true,
  },
  investment_plan: {
    type: String,
    required: true,
  },
  // return_time: {
  //   type: String,
  //   required: true,
  // },

  profit: {
    type: Number,
    default: 0,
  },
  pending_profit: {
    type: Number,
    required: true,
  },
  investment_end_date: {
    type: String,
    required: true,
  },

  loss: {
    type: Number,
    default: 0,
  },
  show_loss: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Investment = mongoose.model("investment", investment_schema);
module.exports = Investment;
