//https://github.com/keystonejs/keystone-discussions-archive/discussions/54
//https://www.drewtown.dev/post/uploading-images-and-files-to-keystone-js-via-the-graphql-api/

const FormData = require("form-data");
const fetch = require("cross-fetch");
const request = require("request");
const fs = require("fs");
const graphqlUri = "http://localhost/admin/api";

const courses = require("./courses");
const courseIdMap = {};

const addCourse = async (course, imageFolder) => {
  console.log(`start add Course ${course.name}...`);
  console.log(courseIdMap);
  const fatherId = course.father ? courseIdMap[course.father] : undefined;
  console.log(fatherId);
  const body = new FormData();

  body.append(
    "operations",
    JSON.stringify({
      query: `
        mutation createCourseWithImage($data: CourseCreateInput) {
          createCourse(data: $data) {
            name
            id
          }
        }
      `,
      variables: {
        data: {
          name: course.name,
          summary: course.summary,
          category: course.category,
          learningTime: course.learningTime,
          father: fatherId ? { connect: { id: fatherId } } : undefined,
          coverImage: null,
        },
      },
    })
  );

  body.append("map", JSON.stringify({ 1: [`variables.data.coverImage`] }));
  body.append("1", fs.createReadStream(`${imageFolder}/${course.coverImage}`));

  try {
    const res = await fetch(graphqlUri, {
      method: "POST",
      body,
    });
    const data = await res.json();
    console.log(data);
    courseIdMap[data.data.createCourse.name] = data.data.createCourse.id;
  } catch (error) {
    console.log(error);
  }
};

const blockedCourseAdd = async () => {
  for (let index = 0; index < courses.length; index++) {
    let course = courses[index];
    await addCourse(course, "./courses/coverImages");
  }
  // console.log(courseIdMap);
  console.log("finish");
};
// courses.forEach((course) => addCourse(course, "./courses/coverImages"));

// console.log(courseIdMap);

blockedCourseAdd();
