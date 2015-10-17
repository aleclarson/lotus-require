
var lotus = global.LOTUS_REQUIRE;

var helpers = require('./js/src/helpers');

if (lotus) {
  helpers.cacheTrueDepender(module.parent, module.filename);
} else {
  lotus = require('./js/src/index');
  lotus.parent = helpers.cacheTrueDepender(module.parent, module.filename);
  lotus.dependers = helpers.dependerCache;
  Object.defineProperty(global, 'LOTUS_REQUIRE', {
    get: function() { return lotus }
  });
}

module.exports = lotus;
