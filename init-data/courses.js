const { createItems } = require("@keystonejs/server-side-graphql-client");

//data
const commonFields = {
  learningTime: 15,
};
coursesData = [
  {
    data: {
      ...commonFields,
      name: "testCourse1",
      summary: "test course1 summary",
      category: "C1",
    },
  },
  {
    data: {
      ...commonFields,
      name: "testCourse2",
      summary: "test course2 summary",
      category: "C1",
    },
  },
  {
    data: {
      ...commonFields,
      name: "testCourse3",
      summary: "test course3 summary",
      category: "C2",
    },
  },

  {
    data: {
      ...commonFields,
      name: "testCourse4",
      summary: "test course4 summary",
      category: "C3",
    },
  },
];

const addCourses = async (keystone) => {
  const courses = await createItems({
    keystone,
    listKey: "Course",
    items: coursesData,
    returnFields: `id name`,
  });
  return courses;
};

module.exports = {
  coursesData,
  addCourses,
};
