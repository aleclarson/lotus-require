
Path = require "path"

Module = require "./Module"
lotus = require "./lotus"

lotus.isLoaded = Module.isLoaded
lotus.isFile = Module.isFile
lotus.resolve = Module.resolve
lotus.toAbsolute = Module._getLotusPath

lotus.relative = (path, parentPath) ->

  # Resolve `path` relative to the `parentPath`
  if arguments.length > 1
    path = Module.resolve path, parentPath

  # Failed to resolve `path`
  return null if typeof path isnt "string"

  # Return a path relative to `lotus.path`
  return Path.relative lotus.path, path

module.exports = lotus
