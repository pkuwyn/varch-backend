const {
  Text,
  Checkbox,
  Password,
  Relationship,
  Select,
} = require("@keystonejs/fields");

module.exports = {
  //模型字段
  fields: {
    //昵称
    name: {
      //功能设置
      type: Text,
      isRequired: true,
      defaultValue: "未设置昵称",
      isUnique: false,

      //权限控制

      //文档配置
      label: "昵称label",
      adminDoc: "昵称 adminDoc ",
      schemaDoc: "昵称 schemaDoc",
    },
    //邮箱
    email: {
      type: Text,
      isUnique: true,
    },

    //密码
    password: {
      type: Password,
    },

    //是否为管理员
    isAdmin: {
      type: Checkbox,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      // access: {
      //   update: access.userIsAdmin,
      // },
    },
  },

  //列表级权限控制
  // access: UserListAccess,

  access: {
    // read: ({
    //   authentication,
    //   listKey,
    //   operation,
    //   originalInput,
    //   gqlName,
    //   itemId,
    //   itemIds,
    // }) => {
    //   console.log(JSON.stringify(authentication.item));
    //   console.log(listKey, operation, originalInput, gqlName, itemId, itemIds);
    //   return { isAdmin: false };
    // },
    // update: userIsAdminOrIsItem,
    // create: userIsAdmin,
    // delete: userIsAdmin,
    auth: true,
  },

  //模型url 标签显示 文档内容设置
  path: "users",
  adminDoc:
    "用户管理，可查询、创建、修改、删除用户信息，可直接搜索昵称，或使用过滤器细粒度查询，可自定义显示标签内容并按标签排序",
  label: "用户管理",
  plural: "用户", //后台卡片名称
  singular: "用户",

  //GraphQL 接口名称与文档设置
  schemaDoc: "用户",
  itemQueryName: "User",
  listQueryName: "Users",

  //后台列表设置
  adminConfig: {
    defaultColumns: "name,isAdmin,createdAt",
    defaultPageSize: 20,
    defaultSort: "createdAt",
    maximumPageSize: 100,
  },

  //后台标签名称
  // labelResolver: (item) => `${item.name} - ${item.email}`,
  labelField: "email",

  //插件设置
  //https://www.keystonejs.com/keystonejs/list-plugins/at-tracking
  plugins: [atTracking({})],
};
