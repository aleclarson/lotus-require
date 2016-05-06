
# lotus-require v1.0.0 [![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

1. Specify a directory of your local packages.

2. Remove relative paths. 

When `process.env.LOTUS` is `true`, absolute paths will check your local package directory before each `node_modules` directory.

usage
-----

If you're on OSX, go into your `~/.bashrc` and paste these lines.

```sh
export LOTUS="true"
export LOTUS_PATH="$HOME/dev/modules"
```

If `LOTUS` isn't equal to `true`, everything goes back to working normally.

The `LOTUS_PATH` must be defined for this library to work.

Now, wherever you want to use local packages during development, just import this library!

```JavaScript
require("lotus-require")
```

Once required, this library will maintain a subset of `Module.prototype` that includes `require`, `optional`, `exists`, and `cached`.

```JavaScript
// Check "$LOTUS_PATH/my-local-package" before every "node_modules" directory.
var pkg = module.require("my-local-package")

// Don't throw an Error if the package doesn't exist. But still throw an Error if something else goes wrong.
var pkgOrNull = module.optional("my-local-package")

// Can this package be loaded?
var isLoadable = module.exists("my-local-package")

// Is the package already loaded?
var isLoaded = module.cached("my-local-package")
```

Feel free to use `require` instead of `module.require`.

```JavaScript
var pkg = require("my-local-package")
```

And that's all there is to it!

&nbsp;

install
-------

Be sure you don't want the [`lotus`](https://github.com/aleclarson/lotus) library before you install this package.

```sh
npm install --save aleclarson/lotus-require#1.0.0
```
