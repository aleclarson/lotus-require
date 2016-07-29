var FS, Module, Path, internalDefine, lotus, moduleCache;

Module = require("module");

Path = require("path");

FS = require("fs");

lotus = require("./lotus");

module.exports = Module;

Module.isLoaded = function(path, parentPath) {
  path = Module.resolve(path, parentPath);
  if (path && Module._cache[path]) {
    return true;
  }
  return false;
};

Module.isFile = function(path, parentPath) {
  path = Module.resolve(path, parentPath);
  return path !== null;
};

Module.resolve = function(path, parentPath) {
  var mod;
  if (path[0] === ".") {
    if (!Module._isFile(parentPath)) {
      return null;
    }
    path = Path.resolve(Path.dirname(parentPath), path);
  } else if (path[0] !== "/") {
    mod = Module._getLotusPath(path, parentPath);
    if (mod) {
      return mod;
    }
  }
  return Module._getModulePath(path, parentPath);
};

moduleCache = Object.create(null);

internalDefine = function(key, value) {
  return Object.defineProperty(Module, key, {
    value: value
  });
};

internalDefine("_isFile", function(path) {
  var stats;
  if (typeof path !== "string") {
    throw TypeError("'path' must be a string!");
  }
  if (!Path.isAbsolute(path)) {
    throw Error("'path' must be absolute: '" + path + "'");
  }
  try {
    stats = FS.statSync(path);
  } catch (error1) {}
  return stats && stats.isFile();
});

internalDefine("_getModulePath", function(path, parentPath) {
  var error, parent;
  if (parentPath) {
    parent = Module._getModule(parentPath);
  }
  try {
    return Module._resolveFilename(path, parent);
  } catch (error1) {
    error = error1;
    return null;
  }
});

internalDefine("_getLotusPath", function(path, parentPath) {
  if (parentPath && lotus._isExcluded(parentPath)) {
    return;
  }
  path = Path.resolve(lotus.path, path);
  return Module._getModulePath(path, parentPath);
});

internalDefine("_getModule", function(path) {
  var mod;
  if (!Path.isAbsolute(path)) {
    throw Error("'path' must be absolute: '" + path + "'");
  }
  mod = Module._cache[path];
  if (mod) {
    delete moduleCache[path];
    return mod;
  }
  mod = moduleCache[path];
  if (mod) {
    return mod;
  }
  mod = new Module(path);
  mod.filename = path;
  mod.paths = Module._nodeModulePaths(Path.dirname(path));
  return moduleCache[path] = mod;
});

//# sourceMappingURL=map/Module.map
