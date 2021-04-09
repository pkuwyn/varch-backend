//生成列表权限的组合权限函数

//创建满足两个权限的组合权限
function createAddAccess(acc1, acc2) {
  return (auth) => {
    return Boolean(acc1(auth) && acc2(auth));
  };
}

//创建满足任意一个权限的组合权限
function createOrAccess(acc1, acc2) {
  return (auth) => {
    return acc1(auth) ? true : acc2(auth);
  };
}

module.exports = {
  createAddAccess,
  createOrAccess,
};
