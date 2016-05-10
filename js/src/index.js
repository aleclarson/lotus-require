var Module, Path, i, key, len, lotus, methods, ref;

Path = require("path");

lotus = require("./lotus");

methods = lotus.isEnabled ? require("./enabled") : require("./disabled");

lotus.exists = function(id, depender) {
  return methods.exists(id, depender);
};

lotus.resolve = function(id, depender) {
  return methods.resolve(id, depender);
};

lotus.relative = function(id, depender) {
  return Path.relative(lotus.path, methods.resolve(id, depender));
};

Object.defineProperties(lotus, {
  _methods: {
    value: methods
  },
  _helpers: {
    value: require("./helpers")
  }
});

Module = require("module");

ref = Object.keys(methods);
for (i = 0, len = ref.length; i < len; i++) {
  key = ref[i];
  Module.prototype[key] = methods[key];
}

module.exports = lotus;

//# sourceMappingURL=../../map/src/index.map
