const { transport } = require("../config/mail");
require("dotenv").config();

const useremail = process.env.email;
const FRONT_END_URL = process.env.FRONT_END_URL;

module.exports = async function main(data) {
  let html_new_data = `
  <div
  style="
    background: #f4f6fe;
    max-width: 360px;
    margin: 0 auto;
    border-radius: 30px;
    border: 1px solid #dddddd;
    padding: 50px 25px;
  "
>
  <div
    style="
    text-align: center;
    margin-bottom: 50px;
    "
  >
  <img width="65%" height="38" src="https://palletpalbucket.s3.us-east-2.amazonaws.com/file-1631292264681-320.39014233143615.png" />
  </div>
  <div>
    <h1 style="font-size: 25px; font-weight: 600; font-family: sans-serif">
      Dear ${data.firstName} ${data.lastName},
    </h1>
    <p
      style="
        font-size: 16px;
        font-weight: 400;
        font-family: sans-serif;
        margin-bottom: 45px;
        line-height: 20px;
      "
    >
    Your account on PalletPal has been created. Please verify your
    account by clicking the button below:
    </p>
    <div
      style="text-align:center"
    >
      <a
        href='${FRONT_END_URL}/account/verify-email/${data.token || data.resetPasswordToken}'
        target='_blank'
        style='
          color: #fff;
          padding: 8px 15px;
          font-size: 16px;
          background: #0154f0;
          font-family: sans-serif;
          font-weight: 700;
          border-radius: 8px;
          text-decoration: none;
          text-transform: capitalize;
        '
        >Verify Now</a
      >
    </div>
  </div>
</div>`

  // send mail with defined transport object
  let info = await transport().sendMail({
    from: "<" + useremail + ">", // sender address
    to: data.email, // list of receivers
    subject: "Email Verification for PalletPal", // Subject line
    text: "Here is your Email verification link", // plain text body
    html: html_new_data, // html body
  });
  console.log("Message sent: %s", info);
};