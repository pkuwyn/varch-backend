const { createItems } = require("@keystonejs/server-side-graphql-client");

const commonFields = {
  password: "12345678",
};

module.exports = async (keystone) => {
  // Reset the database each time for init
  await keystone.adapter.dropDatabase();
  await createItems({
    keystone,
    listKey: "User",
    items: [
      {
        data: {
          ...commonFields,
          name: "admin",
          email: "me@wynwhy.com",
          isAdmin: true,
        },
      },
      {
        data: {
          ...commonFields,
          name: "normal_user",
          email: "me2@wynwhy.com",
          isAdmin: false,
        },
      },

      {
        data: {
          ...commonFields,
          name: "user2",
          email: "2@wynwhy.com",
          isAdmin: false,
        },
      },
    ],
  });
};
