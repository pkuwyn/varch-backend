const {
  Text,
  Checkbox,
  Password,
  Relationship,
  Select,
} = require("@keystonejs/fields");

module.exports = {
  fields: {
    name: { type: Text },
    email: {
      type: Text,
      isUnique: true,
    },
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      // access: {
      //   update: access.userIsAdmin,
      // },
    },
    password: {
      type: Password,
    },
  },
  // List-level access controls
  access: {
    // read: access.userIsAdminOrOwner,
    // update: access.userIsAdminOrOwner,
    // create: access.userIsAdmin,
    // delete: access.userIsAdmin,User
    auth: true,
  },

  //naming config
  label: "用户标签",
  plural: "用户复数",
  singular: "用户单数",
  itemQueryName: "User",
  listQueryName: "Users",

  schemaDoc: "用户",
  labelResolver: (item) => `${item.name} - ${item.email}`,

  //admin view config
  adminConfig: {
    defaultColumns: "email,isAdmin",
    defaultPageSize: 50,
    defaultSort: "email",
    maximumPageSize: 100,
  },
  adminDoc: "用户列表",
};
