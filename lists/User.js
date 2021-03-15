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
  plural: "用户",
  // itemQueryName: "Person",
  listQueryName: "Users",
};
