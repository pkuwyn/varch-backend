//https://github.com/keystonejs/keystone-discussions-archive/discussions/54
const FormData = require("form-data");
const fetch = require("node-fetch");
const request = require("request");
const graphqlUri = "http://localhost/admin/api";
const coverImageUrl =
  "https://en.gravatar.com/userimage/18405287/42d1f0e4b3ec1cdefe5bd89a571bab49.jpg?size=600";

module.exports = async () => {
  console.log("file upload");

  const body = new FormData();

  body.append(
    "operations",
    JSON.stringify({
      query: `
        mutation createCourseWithImage($data: CoursesCreateInput) {
          createCourse(data: $data) {
            name
   
          }
        }
      `,
      variables: {
        data: {
          name: "course with cover",
          summary: "test course with cover summary",
          category: "C1",
          coverImage: null,
        },
      },
    })
  );

  body.append("map", JSON.stringify({ 0: [`variables.data.coverImage`] }));

  body.append("0", request(coverImageUrl));

  await fetch(graphqlUri, {
    method: "POST",
    body,
  });
};
