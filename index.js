const { Keystone } = require("@keystonejs/keystone");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
// const dotenv = require("dotenv");
// dotenv.config();
//Keystone Apps
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { StaticApp } = require("@keystonejs/app-static");

//utils
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");

//custom import
const initialiseData = require("./init-data");

//config
const adapterConfig = {
  mongoUri: 'mongoUri: "mongodb://localhost:27017/varch-db?ssl=false",',
};
const PROJECT_NAME = "虚拟仿真田野考古";

//plugins
const { logAuth } = require("./plugins/logging-plugins");
//access
const { userIsAdmin } = require("./access-control/access-basic");

//use express-sessions as session store
// const store = new (require("express-sessions"))({
//   storage: "mongodb",
//   host: "localhost", // optional
//   port: 27017, // optional
//   db: "session-db", // optional
//   collection: "sessions", // optional
//   expire: 1000 * 60 * 60 * 24 * 30, // 30 days
// });

// use connect-mongodb-session as session store
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/varch-sessions",
  collection: "connect-mongodb-session",
  expires: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
});

//use connect-mongo as session store
// const MongoStore = require("connect-mongo");
// const store = MongoStore.create({
//   mongoUrl: "mongodb://localhost:27017/connect-mongo",
//   ttl: 30 * 24 * 60 * 60, // 30 days. Default
//   collectionName: "sessions",
//   stringify: false,
// });

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  appVersion: {
    version: "1.0.0",
    addVersionToHttpHeaders: false,
    access: true,
  },

  //初始化测试数据
  onConnect: initialiseData,

  cookie: {
    // secure: process.env.NODE_ENV === "production", // Default to true in production
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: false,
  },
  cookieSecret: process.env.COOKIE_SECRET,
  sessionStore: store,
  queryLimits: {
    maxTotalResults: 1000,
  },
});

//ListSchema
const UserSchema = require("./lists/User.js");
keystone.createList("User", UserSchema);
const CourseSchema = require("./lists/Course.js");
keystone.createList("Course", CourseSchema);
const QuestionSchema = require("./lists/Question.js");
keystone.createList("Question", QuestionSchema);
const CustomFileSchema = require("./lists/CustomFile.js");
keystone.createList("CustomFile", CustomFileSchema);
const VtourSchema = require("./lists/Vtour.js");
keystone.createList("Vtour", VtourSchema);

//auth settings
const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: { protectIdentities: process.env.NODE_ENV === "production" },
  plugins: [logAuth],
});

//custom schema
const customSchemaConfig = require("./custom-schema");
keystone.extendGraphQLSchema(customSchemaConfig(keystone));

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
      //仅管理员可以登陆后台
      isAccessAllowed: userIsAdmin,
    }),
    new StaticApp({
      path: "/media",
      src: "./media",
      fallback: "index.html",
    }),
  ],
  configureExpress: (app) => {
    app.set("trust proxy", true);
  },
};
