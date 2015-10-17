
parseBool = require "parse-bool"

lotus = exports

lotus.path = process.env.LOTUS_PATH

throw Error "Missing '$LOTUS_PATH' environment variable" unless lotus.path?

lotus.regex = /(^|\/)(lotus-require|lotus)(\/|$)/

lotus.isEnabled = parseBool(process.env.LOTUS) is yes
