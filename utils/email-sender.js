const mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
});

const sendVerifyEmail = (verifyCode) => {
  const data = {
    from: "虚拟仿真田野考古 <me@samples.mailgun.org>",
    to: "me@wynwhy.com",
    subject: "虚拟仿真田野考古 邮箱验证223",
    text: `[虚拟仿真田野考古] 您的邮箱验证码为 ${verifyCode} , 如非本人操作，请忽略本邮件`,
  };
  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
};
const sendPasswordResetEmail = (verifyCode) => {
  const data = {
    from: "虚拟仿真田野考古 <me@samples.mailgun.org>",
    to: "me@wynwhy.com",
    subject: "虚拟仿真田野考古 密码修改",
    text: `[虚拟仿真田野考古] 您修改密码需要的验证码为 ${verifyCode} , 如非本人操作，请忽略本邮件`,
  };
  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
};

module.exports = {
  sendVerifyEmail,
  sendPasswordResetEmail,
};
