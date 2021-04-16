//基础List Level Access

//1.仅管理员有权限
const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin);

//2.auth对象对自身有权限
const userIsItemForList = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }

  return { id: user.id };
};

module.exports = {
  userIsAdmin,
  userIsItemForList,
};
