const logger = require("node-color-log");

//加载List时log出日志名称及配置
const loggingListConfig = (field) => (config, { listKey, keystone }) => {
  logger
    .color("blue")
    .bgColor("yellow")
    .log(`ListName:${listKey}---${JSON.stringify(config[field])}`);
  return config;
};

//用户登陆成功后log登陆信息
const logAuth = ({ hooks, ...options }) => {
  // logger.color("blue").bgColor("yellow").log(options);
  return {
    ...options,
    hooks: {
      afterAuth: async ({ item }) => {
        logger
          .color("blue")
          .bgColor("yellow")
          .log(
            `${item.email} logged in as ${
              item.isAdmin ? "admin" : "normal user"
            }`
          );
      },

      ...hooks,
    },
  };
};

module.exports = {
  loggingListConfig,
  logAuth,
};
