//基础List Level Access

//1.仅管理员有权限
const userIsAdmin = ({ authentication: { item: user } }) =>
  Boolean(user && user.isAdmin);
//2.auth对象对自身有权限
const userIsItem = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }

  // Instead of a boolean, you can return a GraphQL query:
  // https://www.keystonejs.com/api/access-control#graphqlwhere
  return { id: user.id };
};



//基础Field Level Access
//1.不可修改





module.exports = {
  userIsAdmin,
  userIsItem,
};
