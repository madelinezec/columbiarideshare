# CONVAR

Get configuration variable via config file, environment variable, package, npm or cli with optional required error handling

## Install

```js
npm install convar --save
```

## Use

```js
var convar = require('convar')
  , token  = convar('token') // e27d9f2a29b7
```

Required values pass in error message or Error

```js
var convar = require('convar')
  , token  = convar('token', 'Missing access token') // e27d9f2a29b7
  , url    = convar('url',   new Error('Missing URL'))
```


### Value via command line

```sh
node app.js --token e27d9f2a29b7 --node_env dev
```

### Conditional flags

```sh
node app.js --debug
```

```app.js``` :

```js
var convar = require('convar')
  , debug  = convar('debug') // true
```

### Value via environment variable

```sh
token=e27d9f2a29b7
node_dev=dev

node app.js
```

### Ignore case

This will also work

```sh
TOKEN=e27d9f2a29b7
NODE_ENV=dev
```

### Value via JSON config

```sh
config='{ "token":"e27d9f2a29b7", "NODE_ENV":"dev" }'
```

### Value via [JSONIC](http://github.com/rjrodger/jsonic) simplified JSON

```sh
config=token:e27d9f2a29b7,NODE_ENV:dev
```

### JSON or [JSONIC](http://github.com/rjrodger/jsonic) variables

```sh
node app.js --config token:e27d9f2a29b7,NODE_ENV:dev --firebase url:https://example.firebaseio.com,token:e27d9f2a29b7e27d9f2a29b7
```

```js
var convar = require('convar')
  , token  = convar('token')        // e27d9f2a29b7
  , fbUrl  = convar('firebase').url // example.firebaseio.com
```

### JSON config file

```config.json``` file:

```js
{
  "token": "e27d9f2a29b7",
  "NODE_ENV": "dev",
  "firebase": {
    "url":   "https://example.firebaseio.com",
    "token": "e27d9f2a29b7e27d9f2a29b7"
  }
}
```

```config``` parameter is a file if it isn't JSON or [JSONIC](http://github.com/rjrodger/jsonic) and a string that contains ```.json```

```sh
node app.js --config config.json
```

## Prefixed values

Example with ```yo_``` prefix

```sh
node app.js --yo_token e27d9f2a29b7
```

Use

```js
var convar = require('convar')
convar.prefix('yo_')
var token  = convar('token')        // e27d9f2a29b7
```

## Package values

```js
var convar = require('convar')
console.log(convar.package.version) // 1.0.0
```

## License: MIT
