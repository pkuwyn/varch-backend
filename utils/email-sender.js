const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const sendEmail = (verifyCode, emailAddr, type) => {
  let data;
  if (type === "VERIFY") {
    data = {
      from: "虚拟仿真田野考古 <support@yanyuanwenbo.vip>",
      to: emailAddr,
      subject: "虚拟仿真田野考古 邮箱验证",
      text: `[虚拟仿真田野考古] 您的邮箱验证码为 ${verifyCode} , 如非本人操作，请忽略本邮件`,
    };
  }
  if (type === "RESET") {
    data = {
      from: "虚拟仿真田野考古 <support@yanyuanwenbo.vip>",
      to: emailAddr,
      subject: "虚拟仿真田野考古 密码修改",
      text: `[虚拟仿真田野考古] 您修改密码需要的验证码为 ${verifyCode} , 如非本人操作，请忽略本邮件`,
    };
  }

  mailgun.messages().send(data, (error, body) => {
    console.log(error);
    console.log(body);
  });
};

module.exports = sendEmail;
