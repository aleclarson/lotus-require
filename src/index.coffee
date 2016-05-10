
Path = require "path"

lotus = require "./lotus"

methods =
  if lotus.isEnabled then require "./enabled"
  else require "./disabled"

lotus.exists = (id, depender) ->
  methods.exists id, depender

lotus.resolve = (id, depender) ->
  methods.resolve id, depender

lotus.relative = (id, depender) ->
  Path.relative lotus.path, methods.resolve id, depender

Object.defineProperties lotus,
  _methods: { value: methods }
  _helpers: { value: require "./helpers" }

Module = require "module"
for key in Object.keys methods
  Module.prototype[key] = methods[key]

module.exports = lotus
