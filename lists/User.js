const {
  Text,
  Checkbox,
  Password,
  Relationship,
  Select,
  Integer,
} = require("@keystonejs/fields");

//plugins
const { atTracking } = require("@keystonejs/list-plugins");
const logger = require("node-color-log");
// const {loggingListConfig} = require("../plugins/logging-list-config");

//Access Control
const { UserListAccess } = require("../access-control/list-access");
const {
  cuForAdminOnly,
  uForAdminOnly,
} = require("../access-control/field-access");

//hooks
const { emailValidator } = require("../utils/field-validators");

//模型字段
const fields = {
  email: {
    type: Text,
    isRequired: true,
    isUnique: true,

    //权限控制
    access: uForAdminOnly,

    //文档配置
    label: "邮箱",
    adminDoc: "邮箱是登陆凭据，不可重复",
    schemaDoc: "邮箱",

    //field hooks
    hooks: {
      validateInput: emailValidator,
    },
  },

  name: {
    type: Text,
    isRequired: true,
    defaultValue: "未设置昵称",
    isUnique: false,

    //权限控制

    //文档配置
    label: "昵称",
    adminDoc: "设置用户昵称，可重复",
    schemaDoc: "昵称",
  },

  password: {
    type: Password,
  },

  isAdmin: {
    type: Checkbox,
    isRequired: true,
    defaultValue: false,

    //权限控制
    access: cuForAdminOnly,

    //文档配置
    label: "是否为管理员",
    adminDoc:
      "默认用户均为非管理员，用户被设置为管理员后有后台权限，请谨慎设置",
    schemaDoc: "是否为管理员",
  },

  verified: {
    type: Checkbox,
    isRequired: true,
    defaultValue: false,

    //权限控制
    access: cuForAdminOnly,

    //文档配置
    label: "邮箱是否验证",
    adminDoc: "邮箱是否验证，仅管理员可修改，或用户本人通过邮箱验证请求",
    schemaDoc: "邮箱是否验证",
  },

  coursesFinished: {
    type: Relationship,
    ref: "Course",
    many: true,

    //权限控制

    //文档配置
    label: "已完成课程",
    adminDoc: "已完成课程列表，追踪用户课程学习情况",
    schemaDoc: "已完成课程",
  },

  vtoursFinished: {
    type: Relationship,
    ref: "Vtour",
    many: true,

    //权限控制

    //文档配置
    label: "已完成实习",
    adminDoc: "已完成实习列表，追踪用户虚拟实习情况",
    schemaDoc: "已完成实习",
  },

  unityFinished: {
    type: Checkbox,
    isRequired: true,
    defaultValue: false,

    //权限控制

    //文档配置
    label: "是否完成虚拟发掘",
    adminDoc: "是否完成虚拟发掘",
    schemaDoc: "是否完成虚拟发掘",
  },
};

module.exports = {
  fields,

  //列表级权限控制
  access: UserListAccess,

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
  plugins: [atTracking({})],
};
