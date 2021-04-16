//Field Hook 更新File Field时删除旧文件
const beforeChange = (fileFieldName, fileAdapter) => async ({
  existingItem,
}) => {
  if (existingItem && existingItem[fileFieldName]) {
    // console.log("field change delete");
    await fileAdapter.delete(existingItem[fileFieldName]);
  }
};

//List Hook 删除item时同步删除文件
const afterDelete = (fileFieldNames, fileAdapter) => async ({
  existingItem,
}) => {
  fileFieldNames.forEach(async (fileFieldName) => {
    if (existingItem[fileFieldName]) {
      // console.log("list file delete");
      await fileAdapter.delete(existingItem[fileFieldName]);
    }
  });
};

module.exports = {
  beforeChange,
  afterDelete,
};
