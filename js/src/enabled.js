var $, has, inLotusPath, isModuleName, ref, requiresLotus;

has = require("has");

ref = require("./helpers"), isModuleName = ref.isModuleName, requiresLotus = ref.requiresLotus, inLotusPath = ref.inLotusPath;

$ = require("./disabled");

exports.require = function(id, depender) {
  return exports.optional.call(this, id, depender, function(error) {
    error.format = {
      stack: {
        filter: function(frame) {
          return frame.isUserCreated();
        },
        exclude: ["**/lotus-require/**"]
      }
    };
    throw error;
  });
};

exports.optional = function(id, depender, onFail) {
  var result;
  if ((!has(arguments, 2)) && (depender instanceof Function)) {
    onFail = depender;
    depender = null;
  }
  if (isModuleName(id) && requiresLotus(this, id)) {
    result = $.optional.call(this, inLotusPath(id));
  }
  if (result == null) {
    result = $.optional.call(this, id, depender, (function(_this) {
      return function() {
        return typeof onFail === "function" ? onFail(Error("Cannot find module '" + id + "' from '" + _this.filename + "'")) : void 0;
      };
    })(this));
  }
  return result;
};

exports.cached = function(id, depender) {
  var result;
  if (isModuleName(id)) {
    result = $.cached(inLotusPath(id));
  }
  return result || $.cached(id, depender);
};

exports.exists = function(id, depender) {
  var result;
  if (isModuleName(id)) {
    result = $.exists(inLotusPath(id));
  }
  return result || $.exists(id, depender);
};

exports.resolve = function(id, depender) {
  var result;
  if (isModuleName(id)) {
    result = $.resolve(inLotusPath(id));
  }
  return result || $.resolve(id, depender);
};

//# sourceMappingURL=../../map/src/enabled.map
