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
  formatLog  // pino formatter.log function, passed down to pino as is
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

## Format the log object 
To change the shape of the log object to match gcp error-reporting structure or similiar, use formatLog

```js
const expLogger = require('@bonniernews/exp-logger');

const logger = expLogger({
    formatLog: (obj) => {
        if (!obj.err) {
           return obj;
        }
        const stackTrace = obj.err?.stack;
        return {
            ...obj,
            ...(stackTrace && { stack_trace: stackTrace }),
        };
    }
);

logger.error(new Error('Something wrong'));

```
