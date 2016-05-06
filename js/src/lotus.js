var lotus, parseBool;

parseBool = require("parse-bool");

lotus = exports;

lotus.path = process.env.LOTUS_PATH;

if (lotus.path == null) {
  throw Error("Missing '$LOTUS_PATH' environment variable");
}

lotus.regex = /(^|\/)(lotus-require|lotus)(\/|$)/;

lotus.isEnabled = parseBool(process.env.LOTUS) === true;

lotus.forceAll = false;

//# sourceMappingURL=../../map/src/lotus.map
