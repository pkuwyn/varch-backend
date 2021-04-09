const logger = require("node-color-log");

const isEmail = require("validator/lib/isEmail");

async function emailValidator({
  addFieldValidationError,
  originalInput: { email },
  context: { authedItem: user },
}) {
  logger
    .color("blue")
    .bgColor("yellow")
    .log(`${JSON.stringify(user)} -- validating input -- ${email}`);

  //管理员可以故意设置不正确格式的邮箱
  if (isEmail(email) ? true : Boolean(user && user.isAdmin)) {
    return;
  } else {
    logger.color("red").error("email uncorrect");
    addFieldValidationError("邮箱格式不正确");
  }
}

module.exports = {
  emailValidator,
};
