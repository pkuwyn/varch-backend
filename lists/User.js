const {
  Text,
  Checkbox,
  Password,
  Relationship,
  Select,
} = require("@keystonejs/fields");

//plugins
const { atTracking } = require("@keystonejs/list-plugins");
// const {loggingListConfig} = require("../plugins/logging-list-config");

//Access Control
const { UserListAccess } = require("../access-control/list-access");
const { loggingListConfig } = require("../plugins/logging-plugins");

//utils
const { emailValidator } = require("../utils/field-validators");

module.exports = {
  //模型字段
  fields: {
    //邮箱
    email: {
      //功能设置
      type: Text,

      isRequired: true,
      isUnique: true,

      //权限控制

      //文档配置
      label: "邮箱",
      adminDoc: "邮箱是登陆凭据，不可重复",
      schemaDoc: "邮箱",

      //field hooks
      hooks: {
        // Hooks for create and update operations
        validateInput: emailValidator,
      },
    },

    //昵称
    name: {
      //功能设置
      type: Text,
      isRequired: true,
      defaultValue: "未设置昵称",
      isUnique: false,

      //权限控制

      //文档配置
      label: "昵称",
      adminDoc: "设置昵称，可重复 ",
      schemaDoc: "昵称",
    },

    //密码
    password: {
      type: Password,
    },

    //是否为管理员
    isAdmin: {
      type: Checkbox,
    },
  },

  //列表级权限控制
  access: UserListAccess,

  // access: {
  //   auth: true,
  // },

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
