
{ statSync } = require "fs"
Module = require "module"
Path = require "path"
has = require "has"

lotus = require "./lotus"

exports.requireModule = Module::require

# This is separate from `Module._cache` because it does not actually load the module's code.
exports.moduleCache = Object.create null

exports.createModule = (path) ->
  mod = new Module path
  mod.filename = path
  mod.paths = Module._nodeModulePaths Path.dirname path
  exports.moduleCache[path] = mod

exports.getModule = (path) ->
  return if !path? or (path[0] isnt "/")
  mod = Module._cache[path]
  mod ?= exports.moduleCache[path]
  mod ?= exports.createModule path
  mod

exports.isFile = (path) ->
  throw Error "'path' must be absolute: " + path if path[0] isnt "/"
  try stats = statSync path
  stats?.isFile()

exports.isModuleName = (id) ->
  (id[0] isnt ".") and (id[0] isnt "/")

# The 'package.json' relative to a specific filepath.
exports.packageCache = Object.create null

# TODO: Is this necessary?
exports.packageCache.repl = "repl"

exports.findPackage = (path) ->
  throw Error "'path' cannot be relative: " + path if path[0] is "."
  return exports.packageCache[path] if has exports.packageCache, path
  dir = path
  loop
    dir = Path.dirname dir
    break if dir is "/"
    if exports.isFile dir + "/package.json"
      exports.packageCache[path] = dir
      return dir
  null

# The packages that depend on 'lotus-require' or 'lotus'.
exports.dependerCache = Object.create null

exports.requiresLotus = (depender, path) ->
  return yes if lotus.forceAll
  pkg = exports.findPackage depender.filename
  (pkg isnt null) and (has exports.dependerCache, pkg)

exports.inLotusPath = (id) ->
  Path.join lotus.path, id

exports.cacheDepender = (depender, path) ->
  pkg = exports.findPackage depender.filename
  exports.dependerCache[pkg] = yes if pkg isnt null
  depender.filename

exports.cacheTrueDepender = (parent, path) ->
  return unless parent? and path[0] isnt "." and lotus.regex.test path
  while lotus.regex.test parent.filename
    exports.cacheDepender parent, path
    path = parent.filename
    parent = parent.parent
    return unless parent?
  exports.cacheDepender parent, path

exports.toAbsolutePath = (id, depender) ->
  return Path.resolve id unless depender?
  throw Error "'depender' must be a file: " + depender unless exports.isFile depender
  Path.resolve Path.dirname(depender), id
