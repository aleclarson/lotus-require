
escapeStringRegexp = require "escape-string-regexp"
Module = require "module"
has = require "has"

{ requireModule, getModule, isFile, isModuleName
  toAbsolutePath, cacheTrueDepender } = require "./helpers"

exports.require = (id, depender) ->
  mod = this
  if depender?
    if isFile depender then mod = getModule depender
    else throw Error "Cannot find module '#{depender}'"
  requireModule.call mod, id

exports.optional = (id, depender, onFail) ->
  if (arguments.length is 2) and (depender instanceof Function)
    onFail = depender
    depender = null
  try result = exports.require.call this, id, depender
  catch error
    regex = RegExp "Cannot find module '#{escapeStringRegexp id}'"
    if regex.test error.message then onFail? error
    else throw error
    result = null
  cacheTrueDepender this, id if result isnt null
  result

exports.cached = (id, depender) ->
  path = exports.resolve id, depender
  path? and Module._cache[path]?

exports.exists = (id, depender) ->
  exports.resolve(id, depender)?

exports.resolve = (id, depender) ->
  if depender? and isModuleName id
    throw Error "Cannot find module '#{depender}'" unless isFile depender
    dependerModule = getModule depender
  id = toAbsolutePath id, depender if id[0] is "."
  try path = Module._resolveFilename id, dependerModule
  catch error then path = null
  path
