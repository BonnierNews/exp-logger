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
```
## example
```js

const logger = require('@bonniernews/exp-logger')()

logger.info("Hello world")

/* 
-- expected output
[15:19:13.240] INFO: Hello world
*/
```