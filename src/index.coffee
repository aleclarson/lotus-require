
Path = require "path"

Module = require "./Module"
lotus = require "./lotus"

lotus.isLoaded = Module.isLoaded
lotus.isFile = Module.isFile
lotus.resolve = Module.resolve
lotus.toAbsolute = Module._getLotusPath

lotus.relative = (path, parentPath) ->
  path = Module.resolve path, parentPath
  return null if not path
  Path.relative lotus.path, path

module.exports = lotus
