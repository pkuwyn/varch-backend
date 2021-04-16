const { sendVerifyEmail } = require("../utils/email-sender");
// emailSender(12345678);

const randomNumber = require("random-number-csprng");
const isEmail = require("validator/lib/isEmail");
const { runCustomQuery } = require("@keystonejs/server-side-graphql-client");

//生成6位安全验证码
const generateVerifyCode = async () => {
  const number = await randomNumber(100000, 999999);
  console.log(number);
  return number;
};

//验证邮箱是否存在
const isEmailExist = async (email, keystone) => {
  const data = await runCustomQuery({
    keystone,
    query: `query checkEmail($email:String!){
        allUsers(where:{email:$email}){
          id name
        }
      }`,
    variables: { email },
  });
  //   console.log(data.allUsers);
  return data.allUsers.length !== 0;
};

module.exports = (keystone) => ({
  types: [
    {
      type: "type VerifyEmailOutput {success:Boolean! , data:String }",
    },
  ],
  queries: [],
  mutations: [
    {
      schema: `sendVerifyEmail(email:String!):VerifyEmailOutput`,
      resolver: async (obj, { email, ...args }, context, info) => {
        //格式错误的邮箱，返回错误
        if (!isEmail(email)) {
          return { success: false, data: "not valid email" };
        }
        const emailExist = await isEmailExist(email, keystone);

        //未注册邮箱，返回错误
        if (!emailExist) {
          return { success: false, data: "email not exist" };
        }

        //生成安全验证码
        const vCode = await generateVerifyCode();

        //mailgun 发送邮件
        await sendVerifyEmail(vCode);
        return { success: true, data: "email send" };
      },
    },
  ],
});
