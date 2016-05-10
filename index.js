
var LOTUS_REQUIRE, lotus;

LOTUS_REQUIRE = Symbol.for('lotus-require');
lotus = global[LOTUS_REQUIRE];

if (lotus) {
  lotus._helpers.cacheTrueDepender(module.parent, module.filename);
} else {
  lotus = require('./js/src/index');
  lotus.parent = lotus._helpers.cacheTrueDepender(module.parent, module.filename);
  lotus.dependers = lotus._helpers.dependerCache;
  global[LOTUS_REQUIRE] = lotus;
}

module.exports = lotus;
