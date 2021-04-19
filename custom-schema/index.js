const sendEmail = require("../utils/email-sender");

const randomNumber = require("random-number-csprng");
const isEmail = require("validator/lib/isEmail");
const {
  runCustomQuery,
  updateItem,
} = require("@keystonejs/server-side-graphql-client");
const logger = require("node-color-log");

//验证码存储器
function VCodeRestore() {
  this.store = {};
  this.setCode = function (email, vCode) {
    this.store[email] = vCode;
    vCodeRestore.log();
  };
  this.getCode = function (email) {
    return this.store.hasOwnProperty(email) ? this.store[email] : undefined;
  };
  this.deleteCode = function (email) {
    this.store[email] = undefined;
  };
  this.log = function () {
    logger.color("blue").bgColor("yellow").log(JSON.stringify(this));
  };
}
const vCodeRestore = new VCodeRestore();

//生成6位安全验证码
const generateVerifyCode = async () => {
  const number = await randomNumber(100000, 999999);
  console.log(number);
  return String(number);
};

//验证邮箱是否存在
const getEmailUserId = async (email, keystone) => {
  const data = await runCustomQuery({
    keystone,
    query: `query checkEmail($email:String!){
        allUsers(where:{email:$email}){
          id name
        }
      }`,
    variables: { email },
  });

  if (data.allUsers.length === 0) {
    return undefined;
  } else {
    return data.allUsers[0].id;
  }
};

//自定义schema
module.exports = (keystone) => ({
  types: [
    {
      type: "type SendEmailOutput {success:Boolean! , message:String }",
    },
    {
      type: "enum EmailType {VERIFY,RESET }",
    },
    {
      type: "type VerifyEmailOutput {success:Boolean! , message:String }",
    },
    {
      type: "type ResetPasswordOutput {success:Boolean! , message:String }",
    },
  ],
  queries: [],
  mutations: [
    //发送邮件验证码,类型由type确定
    {
      schema: `sendVerifyCode(email:String!,type:EmailType!):SendEmailOutput`,
      resolver: async (obj, { email, type }, context, info) => {
        //格式错误的邮箱，返回错误
        if (!isEmail(email)) {
          return { success: false, message: "not valid email" };
        }

        //未注册邮箱，返回错误
        const userId = await getEmailUserId(email, keystone);
        if (!userId) {
          return { success: false, message: "email not exist" };
        }

        //生成安全验证码
        const vCode = await generateVerifyCode();

        //mailgun 发送邮件
        sendEmail(vCode, email, type);

        //存储验证码
        vCodeRestore.setCode(email, vCode);
        return { success: true, message: "email send" };
      },
    },

    //验证邮箱
    {
      schema: `verifyEmail(email:String!,vCode:String!):VerifyEmailOutput`,
      resolver: async (obj, { email, vCode }, context, info) => {
        //格式错误的邮箱，返回错误
        if (!isEmail(email)) {
          return { success: false, message: "not valid email" };
        }

        //未注册邮箱，返回错误
        const userId = await getEmailUserId(email, keystone);
        if (!userId) {
          return { success: false, message: "email not exist" };
        }

        const code = vCodeRestore.getCode(email);
        //未发送验证码邮件，返回错误，请用户先发送验证码邮件
        if (!code) {
          return { success: false, message: "email verify code not send yet" };
        }

        //验证码输入错误，返回错误，请用户先发送验证码邮件
        if (code !== vCode) {
          return { success: false, message: "verify code wrong" };
        }

        //验证码正确，修改用户verified属性
        try {
          await updateItem({
            keystone,
            listKey: "User",
            item: {
              id: userId,
              data: { verified: true },
            },
            returnFields: "id verified",
          });
          vCodeRestore.deleteCode(email);
        } catch (error) {
          return { success: false, message: "error" };
        }
        return { success: true, message: "email verified" };
      },
    },

    //修改密码
    {
      schema: `resetPassword(email:String!,vCode:String!,newPassword:String!):ResetPasswordOutput`,
      resolver: async (obj, { email, vCode, newPassword }, context, info) => {
        //格式错误的邮箱，返回错误
        if (!isEmail(email)) {
          return { success: false, message: "not valid email" };
        }

        //未注册邮箱，返回错误
        const userId = await getEmailUserId(email, keystone);
        if (!userId) {
          return { success: false, message: "email not exist" };
        }

        const code = vCodeRestore.getCode(email);
        //未发送验证码邮件，返回错误，请用户先发送验证码邮件
        if (!code) {
          return { success: false, message: "email verify code not send yet" };
        }

        //验证码输入错误，返回错误，请用户先发送验证码邮件
        if (code !== vCode) {
          return { success: false, message: "verify code wrong" };
        }

        if (newPassword.length < 8) {
          return { success: false, message: "password too weak" };
        }

        //验证码正确，修改用户password
        try {
          await updateItem({
            keystone,
            listKey: "User",
            item: {
              id: userId,
              data: { password: newPassword },
            },
            returnFields: "id password_is_set",
          });
          vCodeRestore.deleteCode(email);
        } catch (error) {
          return { success: false, message: "error" };
        }
        return { success: true, message: "password reset" };
      },
    },
  ],
});
