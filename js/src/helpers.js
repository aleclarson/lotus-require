var Module, Path, has, lotus, statSync;

statSync = require("fs").statSync;

Module = require("module");

Path = require("path");

has = require("has");

lotus = require("./lotus");

exports.requireModule = Module.prototype.require;

exports.moduleCache = Object.create(null);

exports.createModule = function(path) {
  var mod;
  mod = new Module(path);
  mod.filename = path;
  mod.paths = Module._nodeModulePaths(Path.dirname(path));
  return exports.moduleCache[path] = mod;
};

exports.getModule = function(path) {
  var mod;
  if ((path == null) || (path[0] !== "/")) {
    return;
  }
  mod = Module._cache[path];
  if (mod == null) {
    mod = exports.moduleCache[path];
  }
  if (mod == null) {
    mod = exports.createModule(path);
  }
  return mod;
};

exports.isFile = function(path) {
  var stats;
  if (path[0] !== "/") {
    throw Error("'path' must be absolute: " + path);
  }
  try {
    stats = statSync(path);
  } catch (error) {}
  return stats != null ? stats.isFile() : void 0;
};

exports.isModuleName = function(id) {
  return (id[0] !== ".") && (id[0] !== "/");
};

exports.packageCache = Object.create(null);

exports.packageCache.repl = "repl";

exports.findPackage = function(path) {
  var dir;
  if (path[0] === ".") {
    throw Error("'path' cannot be relative: " + path);
  }
  if (has(exports.packageCache, path)) {
    return exports.packageCache[path];
  }
  dir = path;
  while (true) {
    dir = Path.dirname(dir);
    if (dir === "/") {
      break;
    }
    if (exports.isFile(dir + "/package.json")) {
      exports.packageCache[path] = dir;
      return dir;
    }
  }
  return null;
};

exports.dependerCache = Object.create(null);

exports.requiresLotus = function(depender, path) {
  var pkg;
  if (lotus.forceAll) {
    return true;
  }
  pkg = exports.findPackage(depender.filename);
  return (pkg !== null) && (has(exports.dependerCache, pkg));
};

exports.inLotusPath = function(id) {
  return Path.join(lotus.path, id);
};

exports.cacheDepender = function(depender, path) {
  var pkg;
  pkg = exports.findPackage(depender.filename);
  if (pkg !== null) {
    exports.dependerCache[pkg] = true;
  }
  return depender.filename;
};

exports.cacheTrueDepender = function(parent, path) {
  if (!((parent != null) && path[0] !== "." && lotus.regex.test(path))) {
    return;
  }
  while (lotus.regex.test(parent.filename)) {
    exports.cacheDepender(parent, path);
    path = parent.filename;
    parent = parent.parent;
    if (parent == null) {
      return;
    }
  }
  return exports.cacheDepender(parent, path);
};

exports.toAbsolutePath = function(id, depender) {
  if (depender == null) {
    return Path.resolve(id);
  }
  if (!exports.isFile(depender)) {
    throw Error("'depender' must be a file: " + depender);
  }
  return Path.resolve(Path.dirname(depender), id);
};

//# sourceMappingURL=../../map/src/helpers.map
