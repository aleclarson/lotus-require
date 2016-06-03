
Module = require "module"
Path = require "path"
FS = require "fs"

lotus = require "./lotus"

module.exports = Module

# Has this module path been imported?
Module.isLoaded = (path, parentPath) ->
  path = Module.resolve path, parentPath
  return yes if path and Module._cache[path]
  return no

# Does a module exist at this path?
Module.isFile = (path, parentPath) ->
  path = Module.resolve path, parentPath
  return path isnt null

# Returns the absolute path for a dependency.
# Returns null if the path cannot be resolved.
Module.resolve = (path, parentPath) ->

  if path[0] is "."
    return null if not Module._isFile parentPath
    path = Path.resolve Path.dirname(parentPath), path

  else if path[0] isnt "/"
    mod = Module._getLotusPath path, parentPath
    return mod if mod

  return Module._getModulePath path, parentPath

#
# Helpers
#

moduleCache = Object.create null

internalDefine = (key, value) ->
  Object.defineProperty Module, key, { value }

internalDefine "_isFile", (path) ->

  if typeof path isnt "string"
    throw TypeError "'path' must be a string!"

  if not Path.isAbsolute path
    throw Error "'path' must be absolute: '#{path}'"

  try stats = FS.statSync path
  return stats and stats.isFile()

internalDefine "_getModulePath", (path, parentPath) ->
  parent = Module._getModule parentPath if parentPath
  try return Module._resolveFilename path, parent
  catch error then return null

internalDefine "_getLotusPath", (path, parentPath) ->
  return if parentPath and lotus._isExcluded parentPath
  path = Path.resolve lotus.path, path
  return Module._getModulePath path, parentPath

internalDefine "_getModule", (path) ->

  if not Path.isAbsolute path
    throw Error "'path' must be absolute: '#{path}'"

  mod = Module._cache[path]
  if mod
    delete moduleCache[path]
    return mod

  mod = moduleCache[path]
  return mod if mod

  mod = new Module path
  mod.filename = path
  mod.paths = Module._nodeModulePaths Path.dirname path
  return moduleCache[path] = mod
