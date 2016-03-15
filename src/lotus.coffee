
parseBool = require "parse-bool"

lotus = exports

lotus.path = process.env.LOTUS_PATH

throw Error "Missing '$LOTUS_PATH' environment variable" unless lotus.path?

lotus.regex = /(^|\/)(lotus-require|lotus)(\/|$)/

lotus.isEnabled = parseBool(process.env.LOTUS) is yes

# Set this to `yes` if you want `lotus-require` enabled for every module (even ones that don't import `lotus-require`).
lotus.forceAll = no
