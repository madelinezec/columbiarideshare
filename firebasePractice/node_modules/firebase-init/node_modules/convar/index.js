"use strict";

var envar      = require('envar')  // alexindigo/node-envar. envar.prefix('my_app_'). envar.defaults({})
  , jsonic     = require('jsonic') // rjrodger/jsonic
  , toType     = function(obj) {
      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }
  , _          = require('lodash')
  , fs         = require('fs')
  , path       = require('path')
  , packpath   = require('packpath')
  , pkg        = '/package.json'
  , appPath    = path.dirname(require.main.filename) + pkg // check first
  , selfPath   = packpath.self() + pkg // check next
  , parentPath = packpath.parent() + pkg // check next
  , pwdPath    = process.env.PWD + pkg // check last
  , pkgPath    = fs.existsSync(appPath) ? appPath : fs.existsSync(selfPath) ? selfPath : fs.existsSync(parentPath) ? parentPath : fs.existsSync(pwdPath) ? pwdPath : false
  , pck        = (pkgPath) ? require(pkgPath) : {}
;

function convar(name, requiredMessage, exitCode, logger) {
  var val = envar(name) || envar(name.toUpperCase()) || envar(name.toLowerCase())
  if (requiredMessage && typeof val === 'undefined') {
    var type = toType(requiredMessage)
    if ('string' !== type && 'error' !== type) {
      requiredMessage = name + ' required via default, config, environment variable, package, npm or cli'
    }
    logger = logger || console.log
    if (exitCode) {
      logger(requiredMessage)
      process.exit(exitCode)
    } else {
      logger(requiredMessage)
      if ('error' != type) requiredMessage = new Error(requiredMessage)
      throw requiredMessage
    }
  }
  if ('string' === typeof val && (val.substr(0,1) == "{" || val.indexOf('://') < 0)) {
    try {
      var json = jsonic(val)
      val      = json
    } catch(e) { }
  }
  return val
}

convar.package = _.cloneDeep(pck) // default config details from package.json
var CONFIG = envar('config') || { } // config file path or empty default
if ('string' == typeof CONFIG && fs.existsSync(CONFIG) && CONFIG.indexOf('.json') > 0) {
  CONFIG = jsonic(fs.readFileSync(CONFIG))
}
envar.import(CONFIG)



// envar pass-thru
convar.import   = envar.import
convar.defaults = envar.defaults
convar.order    = envar.order
convar.prefix   = envar.prefix
convar.npm      = envar.npm
convar.node_env = envar('node_env') || 'production'

convar.isProduction = function() {
  return 'prod' === this.node_env.substr(0,4)
}
convar.isDevelopment = function() {
  return 'dev' === this.node_env.substr(0,3)
}
convar.isStage = function() {
  return 'stage' === this.node_env.substr(0,5)
}
convar.isCanary = function() {
  return 'canary' === this.node_env.substr(0,6)
}

module.exports  = convar
