var Module, cacheTrueDepender, escapeStringRegexp, getModule, has, isFile, isModuleName, ref, requireModule, toAbsolutePath;

escapeStringRegexp = require("escape-string-regexp");

Module = require("module");

has = require("has");

ref = require("./helpers"), requireModule = ref.requireModule, getModule = ref.getModule, isFile = ref.isFile, isModuleName = ref.isModuleName, toAbsolutePath = ref.toAbsolutePath, cacheTrueDepender = ref.cacheTrueDepender;

exports.require = function(id, depender) {
  var mod;
  mod = this;
  if (depender != null) {
    if (isFile(depender)) {
      mod = getModule(depender);
    } else {
      throw Error("Cannot find module '" + depender + "'");
    }
  }
  return requireModule.call(mod, id);
};

exports.optional = function(id, depender, onFail) {
  var error, regex, result;
  if ((arguments.length === 2) && (depender instanceof Function)) {
    onFail = depender;
    depender = null;
  }
  try {
    result = exports.require.call(this, id, depender);
  } catch (error1) {
    error = error1;
    regex = RegExp("Cannot find module '" + (escapeStringRegexp(id)) + "'");
    if (regex.test(error.message)) {
      if (typeof onFail === "function") {
        onFail(error);
      }
    } else {
      throw error;
    }
    result = null;
  }
  if (result !== null) {
    cacheTrueDepender(this, id);
  }
  return result;
};

exports.cached = function(id, depender) {
  var path;
  path = exports.resolve(id, depender);
  return (path != null) && (Module._cache[path] != null);
};

exports.exists = function(id, depender) {
  return exports.resolve(id, depender) != null;
};

exports.resolve = function(id, depender) {
  var dependerModule, error, path;
  if ((depender != null) && isModuleName(id)) {
    if (!isFile(depender)) {
      throw Error("Cannot find module '" + depender + "'");
    }
    dependerModule = getModule(depender);
  }
  if (id[0] === ".") {
    id = toAbsolutePath(id, depender);
  }
  try {
    path = Module._resolveFilename(id, dependerModule);
  } catch (error1) {
    error = error1;
    path = null;
  }
  return path;
};

//# sourceMappingURL=../../map/src/disabled.map
