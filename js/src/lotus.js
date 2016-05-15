var define, excludedPatterns, key, lotus, value;

excludedPatterns = [];

lotus = {
  path: process.env.LOTUS_PATH || null,
  register: function(config) {
    var Module, loadModule;
    Module = require("./Module");
    loadModule = Module.prototype.require;
    Module.prototype.require = function(path) {
      path = Module.resolve(path, this.filename);
      return loadModule.call(this, path);
    };
    if (config.exclude) {
      lotus._exclude(config.exclude);
    }
  },
  _exclude: function(excluded) {
    var i, len, regex;
    if (!Array.isArray(excluded)) {
      return;
    }
    for (i = 0, len = excluded.length; i < len; i++) {
      regex = excluded[i];
      if (typeof regex === "string") {
        regex = RegExp(regex);
      }
      if (!regex instanceof RegExp) {
        continue;
      }
      excludedPatterns.push(regex);
    }
  },
  _isExcluded: function(path) {
    var i, len, regex;
    if (excludedPatterns.length) {
      for (i = 0, len = excludedPatterns.length; i < len; i++) {
        regex = excludedPatterns[i];
        if (regex.test(path)) {
          return true;
        }
      }
    }
    return false;
  }
};

define = Object.defineProperty;

for (key in lotus) {
  value = lotus[key];
  define(exports, key, {
    value: value,
    enumerable: key[0] !== "_"
  });
}

//# sourceMappingURL=../../map/src/lotus.map
