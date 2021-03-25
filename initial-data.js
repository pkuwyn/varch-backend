const { createItems } = require("@keystonejs/server-side-graphql-client");

module.exports = async (keystone) => {
  // Reset the database each time for init
  await keystone.adapter.dropDatabase();
  await createItems({
    keystone,
    listKey: "User",
    items: [
      {
        data: {
          name: "admin",
          password: "12345678",
          email: "me@wynwhy.com",
          isAdmin: true,
        },
      },
      {
        data: {
          name: "normal_user",
          password: "12345678",
          email: "me2@wynwhy.com",
          isAdmin: false,
        },
      },
    ],
  });
};
