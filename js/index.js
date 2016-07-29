var Module, Path, lotus;

Path = require("path");

Module = require("./Module");

lotus = require("./lotus");

lotus.isLoaded = Module.isLoaded;

lotus.isFile = Module.isFile;

lotus.resolve = Module.resolve;

lotus.toAbsolute = Module._getLotusPath;

lotus.relative = function(path, parentPath) {
  if (arguments.length > 1) {
    path = Module.resolve(path, parentPath);
  }
  if (typeof path !== "string") {
    return null;
  }
  return Path.relative(lotus.path, path);
};

module.exports = lotus;

//# sourceMappingURL=map/index.map
