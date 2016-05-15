
var LOTUS = Symbol.for('lotus');
var lotus = global[LOTUS];

if (!lotus) {
  global[LOTUS] = lotus = require('./js/src/index');
}

module.exports = lotus;
