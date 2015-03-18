# flatearth

Flatten all your nested deps just like the earth.

## usage

1. Tweet something snarky about nested dependencies
2. Run `npm i flatearth -g && flatearth` in your library with super nested dependencies
3. Hooray! All your dependencies are flat like the earth!
4. **RUN YOUR TEST SUITE**
5. Delete snarky tweet

## example

```shell
$ flatearth
semver@4.3.1 node_modules/semver

chalk@1.0.0 node_modules/chalk
├── escape-string-regexp@1.0.3
├── ansi-styles@2.0.1
├── supports-color@1.3.1
├── strip-ansi@2.0.1 (ansi-regex@1.1.1)
└── has-ansi@1.0.3 (get-stdin@4.0.1, ansi-regex@1.1.1)

cpr@0.4.0 node_modules/cpr
├── rimraf@2.2.8
├── graceful-fs@3.0.6
└── mkdirp@0.5.0 (minimist@0.0.8)

glob@5.0.3 node_modules/glob
├── inherits@2.0.1
├── inflight@1.0.4 (wrappy@1.0.1)
├── once@1.3.1 (wrappy@1.0.1)
└── minimatch@2.0.4 (brace-expansion@1.1.0)

rimraf@2.3.2 node_modules/rimraf
└── glob@4.5.3 (inherits@2.0.1, inflight@1.0.4, once@1.3.1, minimatch@2.0.4)
↑ ansi-styles @ 2.0.1
↑ escape-string-regexp @ 1.0.3
↑ ansi-regex @ 1.1.1
↑ get-stdin @ 4.0.1
↑ has-ansi @ 1.0.3
↑ strip-ansi @ 2.0.1
↑ supports-color @ 1.3.1
↑ graceful-fs @ 3.0.6
↑ minimist @ 0.0.8
↑ mkdirp @ 0.5.0
↑ rimraf @ 2.2.8
↑ wrappy @ 1.0.1
↑ inflight @ 1.0.4
↑ inherits @ 2.0.1
↑ balanced-match @ 0.2.0
↑ concat-map @ 0.0.1
↑ brace-expansion @ 1.1.0
↑ minimatch @ 2.0.4
↑ once @ 1.3.1
↑ glob @ 4.5.3
The earth is flat.
```

Puts the highest package version at the top of your dependency tree:

```shell
$ tree node_modules/ -d
node_modules/
├── ansi-regex
├── ansi-styles
├── balanced-match
├── brace-expansion
├── chalk
├── concat-map
├── cpr
├── escape-string-regexp
├── get-stdin
├── glob
├── graceful-fs
├── has-ansi
├── inflight
├── inherits
├── minimatch
├── minimist
├── mkdirp
├── once
├── rimraf
├── semver
├── strip-ansi
├── supports-color
└── wrappy
```

> Ironic site note: This package seems to run fine after flattening, lol.

# license
(c) 2015 Kyle Robinson Young. MIT License
