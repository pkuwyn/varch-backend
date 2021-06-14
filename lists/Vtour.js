const {
  Text,
  Relationship,
  Select,
  File,
  Integer,
  Url,
} = require("@keystonejs/fields");
const { Wysiwyg } = require("@keystonejs/fields-wysiwyg-tinymce");

//tourImage封面图存储设置
const path = require("path");
const { LocalFileAdapter } = require("@keystonejs/file-adapters");
const fileAdapter = new LocalFileAdapter({
  src: path.join(__dirname, "../media/vtours/tourImages"),
  path: "/media/vtours/tourImages",
});

//plugins
const { atTracking } = require("@keystonejs/list-plugins");

//hooks
const { beforeChange, afterDelete } = require("../utils/file-hooks");

//Access Control
const { ContentListAccess } = require("../access-control/list-access");

const fields = {
  name: {
    type: Text,
    isRequired: true,
    isUnique: true,

    //文档配置
    label: "名称",
    adminDoc: "设置虚拟实习名称，不可重复",
    schemaDoc: "虚拟实习名称",
  },

  tourType: {
    type: Select,
    isRequired: true,
    options: [
      { value: "pano", label: "全景漫游" },
      { value: "model", label: "三维场景" },
      { value: "html", label: "交互网页" },
    ],
    defaultValue: "model",

    //文档配置
    label: "类型",
    adminDoc: "虚拟实习资源类型，默认为全景漫游",
    schemaDoc: "虚拟实习资源类型",
  },

  url: {
    type: Url,
    isRequired: true,

    //文档配置
    label: "链接",
    adminDoc: "虚拟实习链接，由本条资源发布者提供，可为第三方链接内容",
    schemaDoc: "虚拟实习链接",
  },

  summary: {
    type: Text,
    isRequired: true,
    isMultiline: true,

    //文档配置
    label: "摘要",
    adminDoc: "虚拟实习内容摘要，用于前端页面卡片展示",
    schemaDoc: "虚拟实习内容摘要",
  },

  tourImage: {
    type: File,
    adapter: fileAdapter,
    // isRequired: true,

    hooks: {
      beforeChange: beforeChange("tourImage", fileAdapter),
    },

    //文档配置
    label: "封面图",
    adminDoc: "设置虚拟实习封面图，用于前端页面展示",
    schemaDoc: "虚拟实习封面图",
  },

  content: {
    type: Wysiwyg,

    //文档配置
    label: "教学内容",
    adminDoc: "虚拟实习内容介绍正文",
    schemaDoc: "虚拟实习内容介绍正文",
  },

  questions: {
    type: Relationship,
    ref: "Question",
    many: true,

    //文档配置
    label: "实习测试题",
    adminDoc: "实习测试题，支持多道题目，依据题目的排序属性决定顺序",
    schemaDoc: "实习测试题",
  },

  learningTime: {
    type: Integer,
    isRequired: true,
    defaultValue: 10,

    //文档配置
    label: "学习时间",
    adminDoc: "预期学习时间（分钟）默认为10分钟",
    schemaDoc: "学习时间",
  },

  order: {
    type: Integer,
    isRequired: true,
    defaultValue: 1,

    //权限控制

    //文档配置
    label: "排序",
    adminDoc: "虚拟实习排序，越小越靠前",
    schemaDoc: "虚拟实习排序，越小越靠前",
  },
};

module.exports = {
  fields,

  //列表级权限控制
  access: ContentListAccess,

  //模型url 标签显示 文档内容设置
  path: "vtours",
  adminDoc: "虚拟实习内容管理，可新建实习内容、编辑修改已有实习",
  label: "虚拟实习管理",
  plural: "虚拟实习",
  singular: "虚拟实习",

  //GraphQL 接口名称与文档设置
  schemaDoc: "虚拟实习",
  itemQueryName: "Vtour",
  listQueryName: "Vtours",

  //后台列表设置
  adminConfig: {
    defaultColumns: "name,coverImage,order,tourType,createdAt",
    defaultPageSize: 20,
    defaultSort: "order",
    maximumPageSize: 50,
  },

  //后台标签名称
  labelField: "name",

  //文件清理设置
  hooks: {
    afterDelete: afterDelete(["tourImage"], fileAdapter),
  },

  //插件设置
  plugins: [atTracking({})],
};
