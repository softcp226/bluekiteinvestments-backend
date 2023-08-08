// const fetch = require("isomorphic-fetch");
// const fetch_user = async (user_form) => {
//   const formdata = new FormData();
//   formdata.append("first_name", user_form.first_name);
//   try {
//     const response = await fetch("http://localhost:3000/api/user/register", {
//       method: "POST",
//       // headers:{"content-type":"application/json"},
//       // body:JSON.stringify(user_form)
//       body: formdata,
//     });
//     const result = await response.json();
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

// fetch_user({ first_name: "firstname" });

// const {
//   create_mail_options,
//   transporter,
// } = require("./mailer/reg_success_mail");

// const callmailer=async()=>{
//   first_name = "nsam";
//   last_name = "chidera";
//   account_type = "savings account";
//   account_number = "35636829298278";
//   account_pin = 2002;
//   const result = await sendEmail({
//     first_name,
//     last_name,
//     account_type,
//     account_number,
//     account_pin,
//   });
//   console.log(result);
// }
// callmailer()

// let account_number=Math.random(2553633.37333)
// console.log(Math.ceil(account_number))
// let account_number = Math.floor(Math.random() * 11000000000);
// console.log(account_number);
// let token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjI0ZDRlYjAwZGNkMzEyODZkY2YyOWVmIiwiaWF0IjoxNjQ5MzIwMjA4fQ.J8OMVS9ZbLaWQfxf0WqygcgMRg28ys1OjSVHW53MeuE";

// const fetch = require("isomorphic-fetch");
// const fetch_user = async (user_form) => {
//   try {
//     const response = await fetch(
//       "http://localhost:3000/api/user/transaction/complete",
//       {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify(user_form),
//       }
//     );
//     const result = await response.json();
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
// fetch_user({
//   token,
//   user: "62523139f9e62082fa19191f",
//   otp: "10704",
// });

// fetch_user({
//   token,
//   user: "62523139f9e62082fa19191f",
//   account_number: "7167883745",
//   amount: 200,
//   description: "transfer used for tea payment2",
//   // loan_amount: "2500",
//   // loan_type: "car loan",
//   // duration: "57",
//   // loan_details: "first loan",
// });
//   let otp = Math.floor(Math.random() * 11000);
// console.log(otp)

// var os = require("os");

// var networkInterfaces = os.networkInterfaces();

// console.log(networkInterfaces);

// let currentdate = new Date();
// let datetime = `${currentdate.getDate()}/${
//   currentdate.getMonth() + 1
// }/${currentdate.getFullYear()} @ ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

// let currentdate = new Date();
// let datetime = `${currentdate.getFullYear()}-${
//   currentdate.getMonth() + 1
// }-${currentdate.getDate()} ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

const hashpassword = require("./admin-hash/hashPassword");
const Admin = require("./model/admin");
const create_admin = async (user_name, password) => {
  const hashed_password = await hashpassword(password);
  const admin = await new Admin({
    user_name,
    password: hashed_password,
  });
  const result = await admin.save();
  console.log(result);
};
create_admin("superadmin", "blueskiteinvestments1@1");

// const User = require("./model/user");
// const fetch_user = async () => {
//   let user = await User.findById("627d8dfe2d38e80d22eaf2c8");
//   if (!user) console.log("no user with that id");
//   console.log(user);
//   // let result = await user.set({ final_balance: 10000 });
//   // await result.save();
//   // console.log(result);
// };
// fetch_user();

// let currentdate = new Date();
// currentdate.setDate(currentdate.getDate() + 7);

// let datetime = `${currentdate.getFullYear()}-${
//   currentdate.getMonth() + 1
// }-${currentdate.getDate()} -  ${currentdate.getHours()}: ${currentdate.getMinutes()} : ${currentdate.getSeconds()}`;

// console.log(datetime);
// var currentdate = new Date();
// var datetime =
//   currentdate.getDate() +
//   "/" +
//   (currentdate.getMonth() + 1) +
//   "/" +
//   currentdate.getFullYear() +
//   " @ " +
//   currentdate.getHours() +
//   ":" +
//   currentdate.getMinutes() +
//   ":" +
//   currentdate.getSeconds();

// var date = new Date();

// add a day
let date = new Date();
date.setDate(date.getDate() + 1);
let end_date = date.getTime();

let up_date = new Date();
up_date.setDate(up_date.getDate());
let today = up_date.getTime();

console.log(end_date <= today);
console.log(today);
console.log(end_date);
// var d1 = new Date();
// var d2 = new Date();
// d2.setDate(currentdate.getDate() + 7);
// var same = d1.getTime() === d2.getTime();
// var notSame = d1.getTime() >= d2.getTime();
