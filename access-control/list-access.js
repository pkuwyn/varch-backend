const { createAddAccess, createOrAccess } = require("./access-compose");
const {
  userIsAdmin,
  userIsItemForList: userIsItem,
} = require("./access-basic");

//组合权限，由基础权限合成
const userIsAdminOrIsItem = createOrAccess(userIsAdmin, userIsItem);

//-----------------------------分割线------------------------------
//具体列表权限控制，由基础权限与组合权限针对CRUD设置而成

//用户列表权限
const UserListAccess = {
  read: userIsAdminOrIsItem,
  update: userIsAdminOrIsItem,
  create: true,
  delete: userIsAdmin,
  auth: true,
};

//内容类列表权限设置 Courses Questions CustomFile
const ContentListAccess = {
  read: true,
  update: userIsAdmin,
  create: userIsAdmin,
  delete: userIsAdmin,
};
module.exports = {
  UserListAccess,
  ContentListAccess,
};
