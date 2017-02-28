# firebase-init

Firebase Initializer with configuration variable via config file, environment variable, package, npm or cli

## Install

```js
npm install firebase-init --save
```

## Supported ```firebase``` config variables

- ```url```: full firebase url, ex: ```https://example.firebaseio.com```
- ```name```: firebase name, ex: ```example```
- ```token```: custom authentication token
- ```custom```: custom authentication data, optional with ```token```
- ```path```: child path within firebase url

Or as individual variables

- ```firebase.url```: full firebase url, ex: ```https://example.firebaseio.com```
- ```firebase.name```: firebase name, ex: ```example```
- ```firebase.token```: custom authentication token
- ```firebase.custom```: custom authentication data, optional with ```token```
- ```firebase.path```: child path within firebase url

## Use

### Config via passed in values

```js
var Firebase = require('firebase-init')
var config = {
  "firebase": {
    "url":  "https://example.firebaseio.com"
  }
}
Firebase(config, function(error, initializedFirebaseReference) {
  if (error) throw error
  // start using initializedFirebaseReference
})
```


### Config via cli parameter:

```sh
node app.js --firebase.url https://example.firebaseio.com
```

Example NodeJS:

```js
var Firebase = require('firebase-init')
Firebase(function(error, initializedFirebaseReference) {
  if (error) throw error
  // start using initializedFirebaseReference
})
```


### Config via environment variable

```sh
firebase.url=https://example.firebaseio.com
firebase.token=dda8c65b-b0ea-423d-9a44-e17c4f6f09a9

node app.js
```

### Ignore case

This will also work

```sh
FIREBASE.URL=https://example.firebaseio.com
FIREBASE.TOKEN=dda8c65b-b0ea-423d-9a44-e17c4f6f09a9
```

### Value via JSON config value

```sh
config='{ "firebase": {"name":"example", "token":"dda8c65b-b0ea-423d-9a44-e17c4f6f09a9" }}'
```

### Config via JSON config file

```sh
config='pathTo/myConfig.json'
```

```myConfig.json``` :

```js
{
  "firebase": {
    "name":  "example-store",
    "token": "dda8c65b-b0ea-423d-9a44-e17c4f6f09a9",
    "custom": {
      uid:      "eastcoast-manager",
      isAdmin : true
    },
    "path": "east-coast/inventory"
  }
}
```

### Config via [JSONIC](http://github.com/rjrodger/jsonic) simplified JSON

```sh
firebase=name:example,token:e27d9f2a29b7

node app.js
```

or

```sh
node app.js --firebase=name:example,token:e27d9f2a29b7
```
<!-- EXAMPLES:BEGIN -->
## Examples

### [Read test](examples/read-test.js)

```js
var FirebaseInit = require('firebase-init')
  , config = {
    name: 'pub',
    path: 'AWS/zone/ap-northeast-1/city'
  }

FirebaseInit(config, function (err, firebaseRef) {
  firebaseRef.once('value', function(dataSnapshot) {
    console.log(dataSnapshot.val()) // Tokyo
    process.exit(0)
  }, function(err) {
    console.log(err)
    process.exit(0)
  })
})
```

### [Read test2](examples/read-test2.js)

```js
var FirebaseInit = require('firebase-init')
  , config       = 'name:pub,path:AWS/zone/ap-northeast-1/city' // jsonic


FirebaseInit(config, function (err, firebaseRef) {
  firebaseRef.once('value', function(dataSnapshot) {
    console.log(dataSnapshot.val()) // Tokyo
    process.exit(0)
  }, function(err) {
    console.log(err)
    process.exit(0)
  })
})
```
<!-- EXAMPLES:END -->
## License: MIT
