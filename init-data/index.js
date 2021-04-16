const {
  createItems,
  deleteItems,
  getItems,
} = require("@keystonejs/server-side-graphql-client");
const { addUsers } = require("./users");
const { addCourses } = require("./courses");

const dropList = async (keystone, listKey) => {
  const allItems = await getItems({
    keystone,
    listKey,
    returnFields: "id",
  });
  const allItemsIds = allItems.map((item) => item.id);
  //   console.log(allItemsIds);

  await deleteItems({ keystone, listKey, items: allItemsIds });
};

module.exports = async (keystone) => {
  // await keystone.adapter.dropDatabase();
  // await dropList(keystone, "User");
  // await addUsers(keystone);
  //   await dropList(keystone, "Course");
  //   await addCourses(keystone);
};
