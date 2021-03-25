const { Keystone } = require("@keystonejs/keystone");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");

//Keystone Apps
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");

//utils
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");

//custom import
const initialiseData = require("./initial-data");

//config
const adapterConfig = {
  mongoUri: 'mongoUri: "mongodb://localhost:27017/varch-db?ssl=false",',
};
const PROJECT_NAME = "虚拟仿真田野考古";

//use express-sessions as session store
// const store = new (require("express-sessions"))({
//   storage: "mongodb",
//   host: "localhost", // optional
//   port: 27017, // optional
//   db: "session-db", // optional
//   collection: "sessions", // optional
//   expire: 1000 * 60 * 60 * 24 * 30, // 30 days
// });

//use connect-mongodb-session as session store
// const session = require("express-session");
// const MongoDBStore = require("connect-mongodb-session")(session);
// const store = new MongoDBStore({
//   uri: "mongodb://localhost:27017/connect_mongodb_session_test",
//   collection: "mySessions",
//   expires: 1000 * 60 * 60 * 24 * 30, // 30 days in milliseconds
// });

//Best Choice
//use connect-mongo as session store
const MongoStore = require("connect-mongo");
const store = MongoStore.create({
  mongoUrl: "mongodb://localhost:27017/connect-mongo",
  ttl: 30 * 24 * 60 * 60, // 30 days. Default
  collectionName: "sessions",
  stringify: false,
});

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  // onConnect: initialiseData,
  cookie: {
    secure: process.env.NODE_ENV === "production", // Default to true in production
    maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    sameSite: false,
  },
  cookieSecret: "developing",
  sessionStore: store,
});

//ListSchema
const UserSchema = require("./lists/User.js");
keystone.createList("User", UserSchema);

//auth settings
const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: { protectIdentities: process.env.NODE_ENV === "production" },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
    }),
  ],
};
