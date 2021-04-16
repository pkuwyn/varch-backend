const { Text, File, Virtual } = require("@keystonejs/fields");

//用户自定义媒体文件存储设置
const path = require("path");
const { LocalFileAdapter } = require("@keystonejs/file-adapters");
const fileAdapter = new LocalFileAdapter({
  src: path.join(__dirname, "../media/customFiles"),
  path: "/media/customFiles",
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

    //文档配置
    label: "名称",
    adminDoc: "媒体名称,便于检索,可不设置",
    schemaDoc: "媒体名称",
  },

  file: {
    type: File,
    adapter: fileAdapter,
    isRequired: true,

    hooks: {
      beforeChange: beforeChange("file", fileAdapter),
    },

    //文档配置
    label: "文件",
    adminDoc: "上传媒体文件，资源根据需要压缩后上传",
    schemaDoc: "媒体文件",
  },

  customTag: {
    type: Text,

    //文档配置
    label: "标签",
    adminDoc: "自定义标签，便于过滤管理上传的媒体资源",
    schemaDoc: "标签，便于过滤",
  },

  fileUrl: {
    type: Virtual,
    resolver: (item) => {
      return `http://${process.env.HOST}${
        process.env.PORT !== "80" ? ":" + process.env.PORT : ""
      }/media/customFiles/${item.file.filename}`;
    },

    //文档配置
    label: "媒体文件链接",
    adminDoc: "媒体文件链接，只读属性，方便复制使用",
    schemaDoc: "媒体文件链接",
  },
};

module.exports = {
  fields,

  //列表级权限控制
  access: ContentListAccess,

  //模型url 标签显示 文档内容设置
  path: "files",
  adminDoc: "自定义媒体文件管理，用于上传在自定义编辑内容中使用的媒体资源",
  label: "媒体管理",
  plural: "媒体",
  singular: "媒体",

  //GraphQL 接口名称与文档设置
  schemaDoc: "媒体文件",
  itemQueryName: "File",
  listQueryName: "Files",

  //后台列表设置
  adminConfig: {
    defaultColumns: "fileUrl,tag,file,createdAt",
    defaultPageSize: 20,
    defaultSort: "createdAt",
    maximumPageSize: 50,
  },

  //后台标签名称
  labelField: "name",

  //文件清理设置
  hooks: {
    afterDelete: afterDelete(["file"], fileAdapter),
  },

  //插件设置
  plugins: [atTracking({})],
};
