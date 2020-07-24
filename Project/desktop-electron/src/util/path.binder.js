const path = require("path");

// Params: ...paths: array
const list = (...paths) => {
  let actualPath = "";
  paths.forEach((item_Path, index) => {
    actualPath = path.join(actualPath, item_Path);
  });

  return actualPath;
};

// Params: path: object -> 'main': string and 'child': object
// Return: actualPath: array
const obj = (obj_Path) => {
  const main = obj_Path.main;
  const child = obj_Path.child;
  const actualPath = [main];

  Object.values(child).forEach((childPath, index) => {
    actualPath.push(path.join(main, childPath));
  });

  return actualPath;
};

module.exports = { list, obj };
