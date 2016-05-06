
Module = require "module"
Path = require "path"

lotus = require "./lotus"

$ = require "./disabled"
{ exists, resolve } = require "./enabled"
{ cacheTrueDepender } = require "./helpers"

lotus.exists = (id, depender) ->
  if lotus.isEnabled then exists id, depender
  else $.exists id, depender

lotus.resolve = (id, depender) ->
  if lotus.isEnabled then resolve id, depender
  else $.resolve id, depender

lotus.relative = (id, depender) ->
  Path.relative lotus.path, lotus.resolve id, depender

lotus.methods =
  if lotus.isEnabled then require "./enabled"
  else require "./disabled"

for key in Object.keys lotus.methods
  Module.prototype[key] = lotus.methods[key]

module.exports = lotus

# TODO: Is this necessary?
cacheTrueDepender module.parent, module.filename
