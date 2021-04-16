const path = require("path");

// const courses = [
//   {
//     learningTime: 15,
//     name: "testCourse1",
//     summary: "test course1 summary",
//     category: "C1",
//     coverImage: "test.jpg",
//   },
//   {
//     learningTime: 15,
//     name: "testCourse2",
//     summary: "test course2 summary",
//     category: "C1",
//     coverImage: "test.jpg",
//   },
//   {
//     learningTime: 15,
//     name: "testCourse3",
//     summary: "test course3 summary",
//     category: "C2",
//     coverImage: "test.jpg",
//     father: "testCourse1",
//   },
//   {
//     learningTime: 15,
//     name: "testCourse4",
//     summary: "test course4 summary",
//     category: "C3",
//     coverImage: "test.jpg",
//     father: "testCourse1",
//   },
//   {
//     learningTime: 15,
//     name: "testCourse5",
//     summary: "test course5 summary",
//     category: "C3",
//     coverImage: "test.jpg",
//     father: "testCourse2",
//   },
// ];

const courses = [
  {
    name: "什么是田野考古",
    summary: "",
    father: "",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "田野考古的前期准备",
    summary: "",
    father: "",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "田野考古的野外工作",
    summary: "",
    father: "",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "田野考古的室内工作",
    summary: "",
    father: "",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "编写考古报告",
    summary: "",
    father: "",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "考古工地的管理",
    summary: "",
    father: "",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "什么是考古学",
    summary: "",
    father: "什么是田野考古",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "为什么要进行田野考古",
    summary: "",
    father: "什么是田野考古",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "怎么进行田野考古工作",
    summary: "",
    father: "什么是田野考古",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "为什么盗掘令人憎恶",
    summary: "",
    father: "什么是田野考古",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "考古调查",
    summary: "",
    father: "田野考古的野外工作",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "考古发掘",
    summary: "",
    father: "田野考古的野外工作",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "理论",
    summary: "",
    father: "考古发掘",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "方法",
    summary: "",
    father: "考古发掘",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "发掘资料采集",
    summary: "",
    father: "考古发掘",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "记录",
    summary: "",
    father: "考古发掘",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "遗址、遗物、遗迹的保护",
    summary: "",
    father: "考古发掘",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "资料整理",
    summary: "",
    father: "田野考古的室内工作",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "室内整理",
    summary: "",
    father: "资料整理",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "考古绘图",
    summary: "",
    father: "资料整理",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "考古摄影",
    summary: "",
    father: "资料整理",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "要求",
    summary: "",
    father: "编写田野考古报告",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "体例、设计、方法",
    summary: "",
    father: "编写田野考古报告",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "工作人员",
    summary: "",
    father: "考古工地的管理",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
  {
    name: "考古工作者的素养",
    summary: "",
    father: "考古工地的管理",
    category: "C1",
    learningTime: 10,
    coverImage: "test.jpg",
  },
];
module.exports = courses;
