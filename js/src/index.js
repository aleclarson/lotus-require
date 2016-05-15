var Module, Path, lotus;

Path = require("path");

Module = require("./Module");

lotus = require("./lotus");

lotus.isLoaded = Module.isLoaded;

lotus.isFile = Module.isFile;

lotus.resolve = Module.resolve;

lotus.relative = function(path, parentPath) {
  path = Module.resolve(path, parentPath);
  if (!path) {
    return null;
  }
  return Path.relative(lotus.path, path);
};

module.exports = lotus;

//# sourceMappingURL=../../map/src/index.map
