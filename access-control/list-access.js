const { createAddAccess, createOrAccess } = require("./access-compose");
const { userIsAdmin, userIsItem } = require("./access-basic");

//组合权限，由基础权限合成
const userIsAdminOrIsItem = createOrAccess(userIsAdmin, userIsItem);

//-----------------------------分割线------------------------------
//具体列表权限控制，由基础权限与组合权限针对CRUD设置而成

//User
const UserListAccess = {
  // read: userIsAdminOrIsItem,
  // update: userIsAdminOrIsItem,
  // create: userIsAdmin,
  // delete: userIsAdmin,
  auth: true,
};

module.exports = {
  UserListAccess,
};
