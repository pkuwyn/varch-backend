const { userIsAdmin } = require("./access-basic");

//仅管理员可CU，已获取ListAccess的人可R
//适用于 isAdmin verified
const cuForAdminOnly = {
  read: true,
  create: userIsAdmin,
  update: userIsAdmin,
};

//仅管理员可以U,已获取ListAccess的人可以CR，
//适用于 email
const uForAdminOnly = {
  read: true,
  create: true,
  update: userIsAdmin,
};

module.exports = { cuForAdminOnly, uForAdminOnly };
