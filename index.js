var fs = require('fs')
var path = require('path')
var glob = require('glob')
var semver = require('semver')
var cpr = require('cpr')
var rimraf = require('rimraf')
var chalk = require('chalk')

function FlatEarth(cwd) {
  if (!(this instanceof FlatEarth)) return new FlatEarth(cwd)
  this.cwd = cwd || process.cwd()
  this.highest = Object.create(null)
}
module.exports = FlatEarth

FlatEarth.prototype.gather = function(done) {
  // Only nested deps
  glob('node_modules/*/node_modules/**/package.json', { cwd: this.cwd }, function(err, files) {
    if (err) return done(err)
    done(null, files)
  })
}

FlatEarth.prototype.findHighest = function(filepath) {
  try {
    var pkg = require(filepath)
    if (!semver.valid(pkg.version)) {
      console.error('Invalid semver [' + pkg.version + '] for ' + pkg.name)
      pkg.version = '0.0.0'
    }
    if (this.highest[pkg.name]) {
      if (semver.gt(pkg.version, this.highest[pkg.name].version)) {
        this.highest[pkg.name] = {
          path: filepath,
          version: pkg.version,
        }
        return this.highest[pkg.name]
      }
    }
    this.highest[pkg.name] = {
      path: filepath,
      version: pkg.version,
    }
    return this.highest[pkg.name]
  } catch (err) {
    console.error('Could not read ' + filepath)
  }
}

FlatEarth.prototype.thereCanBeOnlyOne = function(done) {
  var pkgs = Object.keys(this.highest)
  var len = pkgs.length

  function cb() {
    len--
    if (len < 1) done(null)
  }

  for (var i = 0; i < pkgs.length; i++) {
    var name = pkgs[i]
    var pkg = this.highest[name]

    var origpath = path.dirname(pkg.path)
    var flatpath = path.resolve(this.cwd, 'node_modules', name)

    console.log(chalk.cyan('↑') + ' ' + name + ' @ ' + chalk.green(pkg.version))

    cpr(origpath, flatpath, function(err, files) {
      if (err) return cb(err)
      process.nextTick(cb)
    })
  }
}

FlatEarth.prototype.ughNestedDeps = function(done) {
  glob('node_modules/*/node_modules/*', { cwd: this.cwd }, function(err, files) {
    if (err) return done(err)
    var len = files.length
    function cb() {
      len--
      if (len < 1) done(null)
    }
    for (var i = 0; i < files.length; i++) {
      rimraf(path.dirname(files[i]), cb)
    }
  })
}

FlatEarth.prototype.run = function(done) {
  var self = this
  this.gather(function(err, files) {
    if (err) return done(err)
    if (files.length < 1) return done(null)
    for (var i = 0; i < files.length; i++) {
      self.findHighest(path.resolve(self.cwd, files[i]))
    }
    self.thereCanBeOnlyOne(function(err) {
      if (err) return done(err)
      self.ughNestedDeps(done)
    })
  })
}
