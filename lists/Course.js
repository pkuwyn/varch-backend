const {
  Text,
  Relationship,
  Select,
  File,
  Integer,
  Virtual,
} = require("@keystonejs/fields");
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce");

//coverImage封面图存储设置
const path = require("path");
const { LocalFileAdapter } = require("@keystonejs/file-adapters");
const fileAdapter = new LocalFileAdapter({
  src: path.join(__dirname, "../media/course/coverImages"),
  path: "/media/course/coverImages",
});

//plugins
const { atTracking } = require("@keystonejs/list-plugins");

//Access Control
const { ContentListAccess } = require("../access-control/list-access");

const fields = {
  name: {
    type: Text,
    isRequired: true,
    isUnique: true,

    //文档配置
    label: "名称",
    adminDoc: "设置教学单元的名称，不可重复",
    schemaDoc: "教学单元的名称",
  },

  summary: {
    type: Text,
    isRequired: true,
    isMultiline: true,

    //文档配置
    label: "摘要",
    adminDoc: "课程内容摘要",
    schemaDoc: "课程内容摘要",
  },

  coverImage: {
    type: File,
    adapter: fileAdapter,
    // isRequired: true,

    //文档配置
    label: "封面图",
    adminDoc: "设置本课程封面图，用于前端页面展示，使用方形图片避免裁切",
    schemaDoc: "课程封面图",
  },

  content: {
    type: Wysiwyg,

    //文档配置
    label: "正文",
    adminDoc: "课程正文内容，直接在富文本编辑器中撰写",
    schemaDoc: "课程正文",
  },

  preQuestions: {
    type: Relationship,
    ref: "Question",
    many: true,

    //文档配置
    label: "课程引导题",
    adminDoc: "课程引导题，支持多道题目，依据题目的排序属性决定顺序",
    schemaDoc: "课程引导题",
  },

  questions: {
    type: Relationship,
    ref: "Question",
    many: true,

    //文档配置
    label: "课程测试题",
    adminDoc: "课程测试题，支持多道题目，依据题目的排序属性决定顺序",
    schemaDoc: "课程测试题",
  },

  father: {
    type: Relationship,
    ref: "Course.children",
    many: false,

    //文档配置
    label: "父级课程",
    adminDoc: "父级课程，每个课程仅有一个父级课程",
    schemaDoc: "父级课程",
  },

  children: {
    type: Relationship,
    ref: "Course.father",
    many: true,
    //只读字段，自动根据父级课程确定
    adminConfig: {
      isReadOnly: true,
    },

    //文档配置
    label: "子课程",
    adminDoc:
      "子课程列表，只读属性，设置对应课程的父级课程后，自动匹配其子课程",
    schemaDoc: "子课程",
  },

  isMinimal: {
    type: Virtual,
    graphQLReturnType: `Boolean`,
    resolver: async (item, args, context) => {
      const { data, errors } = await context.executeGraphQL({
        query: `
                  query{
                      Course(where:{id:"${item.id}"}){
                        children {id}
                      }
                    }
                  `,
      });
      console.log(data.Course.children.length === 0);
      return data.Course.children.length === 0;
    },

    //文档配置
    label: "是否为最小教学单元",
    adminDoc: "是否为最小教学单元，只读字段，根据子课程自动计算",
    schemaDoc: "是否为最小教学单元",
  },

  category: {
    type: Select,
    options: [
      { value: "C1", label: "田野考古基础" },
      { value: "C2", label: "田野考古工具" },
      { value: "C3", label: "圆明园考古工作" },
    ],
    isRequired: true,
    defaultValue: "C1",

    //文档配置
    label: "类型",
    adminDoc: "课程类型，默认为田野考古基础",
    schemaDoc: "课程类型",
  },

  learningTime: {
    type: Integer,
    isRequired: true,
    defaultValue: 10,

    //权限控制

    //文档配置
    label: "学习时间",
    adminDoc: "预期学习时间（分钟）默认为10分钟",
    schemaDoc: "学习时间",
  },
};

module.exports = {
  fields,

  //列表级权限控制
  access: ContentListAccess,

  //模型url 标签显示 文档内容设置
  path: "courses",
  adminDoc: "课程单元内容管理，可新建课程单元、编辑修改已有课程内容",
  label: "课程管理",
  plural: "课程",
  singular: "课程",

  //GraphQL 接口名称与文档设置
  schemaDoc: "课程",
  itemQueryName: "Course",
  listQueryName: "Courses",

  //后台列表设置
  adminConfig: {
    defaultColumns: "coverImage,category,createdAt",
    defaultPageSize: 20,
    defaultSort: "createdAt",
    maximumPageSize: 50,
  },

  //后台标签名称
  labelField: "name",

  //插件设置
  plugins: [atTracking({})],
};
