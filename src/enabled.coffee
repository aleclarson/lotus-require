
has = require "has"

{ isModuleName, requiresLotus, inLotusPath } = require "./helpers"

$ = require "./disabled"

exports.require = (id, depender) ->
  exports.optional.call this, id, depender, (error) ->
    error.format =
      stack:
        filter: (frame) -> frame.isUserCreated()
        exclude: ["**/lotus-require/**"]
    throw error

exports.optional = (id, depender, onFail) ->
  if (not has arguments, 2) and (depender instanceof Function)
    onFail = depender
    depender = null
  if isModuleName(id) and requiresLotus(this, id)
    result = $.optional.call this, inLotusPath id
  result ?= $.optional.call this, id, depender, =>
    onFail? Error "Cannot find module '#{id}' from '#{@filename}'"
  result

exports.cached = (id, depender) ->
  result = $.cached inLotusPath id if isModuleName id
  result or $.cached id, depender

exports.exists = (id, depender) ->
  result = $.exists inLotusPath id if isModuleName id
  result or $.exists id, depender

exports.resolve = (id, depender) ->
  result = $.resolve inLotusPath id if isModuleName id
  result or $.resolve id, depender
