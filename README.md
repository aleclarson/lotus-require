
# lotus-require 3.0.0 ![stable](https://img.shields.io/badge/stability-stable-4EBA0F.svg?style=flat)

```coffee
lotus = require "lotus-require"

lotus.path is process.env.LOTUS_PATH # => true

# Overrides 'Module.prototype.require'!
lotus.register
  exclude: [ ".*\\/node_modules\\/.*" ]

# Returns true if the module path has been imported.
lotus.isLoaded path, parentPath

# Returns true if the module path is valid.
lotus.isFile path, parentPath

# Returns the absolute path of the resolved dependency.
lotus.resolve path, parentPath

# Returns the resolved path, but relative to 'lotus.path'!
lotus.relative path, parentPath
```
