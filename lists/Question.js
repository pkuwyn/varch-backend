const {
  Text,
  Relationship,
  Select,
  File,
  Integer,
} = require("@keystonejs/fields");

//questionImage测试题图片存储设置
const path = require("path");
const { LocalFileAdapter } = require("@keystonejs/file-adapters");
const fileAdapter = new LocalFileAdapter({
  src: path.join(__dirname, "../media/question/questionImages"),
  path: "/media/question/questionImages",
});

//plugins
const { atTracking } = require("@keystonejs/list-plugins");

//hooks
const { beforeChange, afterDelete } = require("../utils/file-hooks");

//Access Control
const { ContentListAccess } = require("../access-control/list-access");

//测试题模型字段设置
const fields = {
  name: {
    type: Text,
    // isRequired: true,

    //文档配置
    label: "题目名称",
    adminDoc: "题目名称，方便后台查询",
    schemaDoc: "题目名称，方便后台查询",
  },

  //题干插图
  questionImage: {
    type: File,
    adapter: fileAdapter,

    hooks: {
      beforeChange: beforeChange("questionImage", fileAdapter),
    },

    //文档配置
    label: "题干插图",
    adminDoc: "题干插图，题目无需配图可不设置",
    schemaDoc: "题干插图",
  },

  content: {
    type: Text,
    isRequired: true,
    isMultiline: true,

    //文档配置
    label: "题干",
    adminDoc: "题干内容,必须设置",
    schemaDoc: "题干内容",
  },

  explanation: {
    type: Text,
    isMultiline: true,
    // isRequired: true,

    //文档配置
    label: "答案解析",
    adminDoc: "答案解析，建议填写",
    schemaDoc: "答案解析",
  },
  answer: {
    type: Select,
    options: ["a", "b", "c", "d"],
    isRequired: true,
    defaultValue: "a",

    //文档配置
    label: "正确答案",
    adminDoc: "设置正确选项，单选",
    schemaDoc: "正确选项",
  },
  a: {
    type: Text,
    isRequired: true,
    defaultValue: "",
    isMultiline: true,

    //文档配置
    label: "A",
    adminDoc: "A选项内容",
    schemaDoc: "A选项内容",
  },
  b: {
    type: Text,
    isRequired: true,
    defaultValue: "",
    isMultiline: true,

    //文档配置
    label: "B",
    adminDoc: "B选项内容",
    schemaDoc: "B选项内容",
  },
  c: {
    type: Text,
    isRequired: true,
    defaultValue: "",
    isMultiline: true,

    //文档配置
    label: "C",
    adminDoc: "C选项内容",
    schemaDoc: "C选项内容",
  },
  d: {
    type: Text,
    isRequired: true,
    defaultValue: "",
    isMultiline: true,

    //文档配置
    label: "D",
    adminDoc: "D选项内容",
    schemaDoc: "D选项内容",
  },

  order: {
    type: Integer,
    isRequired: true,
    defaultValue: 1,

    //文档配置
    label: "排序",
    adminDoc: "题目排序，越大越靠前，仅当一个课程或实习对应多道题目时有效",
    schemaDoc: "题目排序，越大越靠前",
  },
};

module.exports = {
  fields,

  //列表级权限控制
  access: ContentListAccess,

  //模型url 标签显示 文档内容设置
  path: "questions",
  adminDoc: "测试题目管理，可以新增题目，修改已有题目内容",
  label: "测试题管理",
  plural: "测试题",
  singular: "测试题",

  //GraphQL 接口名称与文档设置
  schemaDoc: "测试题",
  itemQueryName: "Question",
  listQueryName: "Questions",

  //后台列表设置
  adminConfig: {
    defaultColumns: "answer,order,createdAt",
    defaultPageSize: 20,
    defaultSort: "createdAt",
    maximumPageSize: 50,
  },

  //后台标签名称
  labelField: "name",

  //文件清理设置
  hooks: {
    afterDelete: afterDelete(["questionImage"], fileAdapter),
  },

  //插件设置
  plugins: [atTracking({})],
};
