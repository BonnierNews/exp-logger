# exp-logger

Simple logger package to unify how logging is done with (configurable) remapping 

[NPM](https://www.npmjs.com/package/@bonniernews/exp-logger)
___
## defaults
* trace -> DEBUG  
* debug -> DEBUG  
* info -> INFO  
* warn -> WARNING  
* error -> ERROR  
* fatal -> CRITICAL

___
## options
```js
  logLevel // defaults to info
  mixin  // pino mixins, passed down to pino as is
  shouldPrettyPrint // defaults to false
  severityLabels // add extra label mappings, [ {label: "oldKey", newLabel: "newKey"}]
  logLocation // location of the test log
  setDestination // default is false, set this to true to log to logLocation
```
## example
```js

const logger = require('@bonniernews/exp-logger')({
    shouldPrettyPrint: process.NODE_ENV === "development",
})

```