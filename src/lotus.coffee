
excludedPatterns = []

lotus =

  path: process.env.LOTUS_PATH or null

  register: (config) ->

    Module = require "./Module"
    loadModule = Module::require
    Module::require = (path) ->
      path = Module.resolve path, @filename
      loadModule.call this, path

    if config.exclude
      lotus._exclude config.exclude
    return

  _exclude: (excluded) ->
    return if not Array.isArray excluded
    for regex in excluded
      regex = RegExp regex if typeof regex is "string"
      continue if not regex instanceof RegExp
      excludedPatterns.push regex
    return

  _isExcluded: (path) ->
    if excludedPatterns.length
      for regex in excludedPatterns
        return yes if regex.test path
    return no

define = Object.defineProperty
for key, value of lotus
  define exports, key, { value, enumerable: key[0] isnt "_" }
