var $, Module, Path, cacheTrueDepender, exists, i, key, len, lotus, ref, ref1, resolve;

Module = require("module");

Path = require("path");

lotus = require("./lotus");

$ = require("./disabled");

ref = require("./enabled"), exists = ref.exists, resolve = ref.resolve;

cacheTrueDepender = require("./helpers").cacheTrueDepender;

lotus.exists = function(id, depender) {
  if (lotus.isEnabled) {
    return exists(id, depender);
  } else {
    return $.exists(id, depender);
  }
};

lotus.resolve = function(id, depender) {
  if (lotus.isEnabled) {
    return resolve(id, depender);
  } else {
    return $.resolve(id, depender);
  }
};

lotus.relative = function(id, depender) {
  return Path.relative(lotus.path, lotus.resolve(id, depender));
};

lotus.methods = lotus.isEnabled ? require("./enabled") : require("./disabled");

ref1 = Object.keys(lotus.methods);
for (i = 0, len = ref1.length; i < len; i++) {
  key = ref1[i];
  Module.prototype[key] = lotus.methods[key];
}

module.exports = lotus;

cacheTrueDepender(module.parent, module.filename);

//# sourceMappingURL=../../map/src/index.map
