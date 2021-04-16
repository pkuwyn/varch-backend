const { createItems } = require("@keystonejs/server-side-graphql-client");

//data
const commonFields = {
  password: "12345678",
};
usersData = [
  {
    data: {
      ...commonFields,
      name: "admin",
      email: "me@wynwhy.com",
      isAdmin: true,
      verified: true,
    },
  },
  {
    data: {
      ...commonFields,
      name: "normal_user_1",
      email: "me1@wynwhy.com",
      isAdmin: false,
    },
  },
  {
    data: {
      ...commonFields,
      name: "normal_user_2",
      email: "2@wynwhy.com",
      isAdmin: false,
    },
  },

  {
    data: {
      ...commonFields,
      email: "3@wynwhy.com",
      isAdmin: false,
    },
  },
];

const addUsers = async (keystone) => {
  const users = await createItems({
    keystone,
    listKey: "User",
    items: usersData,
    returnFields: `id name`,
  });
  return users;
};

module.exports = {
  usersData,
  addUsers,
};
