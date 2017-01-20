
var LOTUS = Symbol.for('lotus');
var lotus = global[LOTUS];

if (!lotus) {
  var lotusPath = process.env.LOTUS_PATH;

  // Try using the local version.
  if (lotusPath) {
    lotusPath += '/lotus-require';
    if (__dirname === lotusPath) {
      // We are already using the local version.
    }
    else if (require('fs').existsSync(lotusPath)) {
      lotus = require(lotusPath);
    }
  }

  // Default to using the installed remote version.
  if (!lotus) {
    lotus = require('./js/index');
  }

  global[LOTUS] = lotus;
}

module.exports = lotus;
