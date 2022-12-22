# exp-logger

Simple logger package to unify how logging is done with (configurable) remapping

___
## defaults
* trace -> DEBUG  
* debug -> DEBUG  
* info -> INFO  
* warn -> WARNING  
* error -> ERROR  
* fatal -> CRITICAL

___
## optional 
if you want to add more logging / platform specific labels you can configure it by adding it to a config file 

```json
{
    ...
    "logging": {
        "severityLabels": [
            {
                "label": "foo",
                "newLabel": "bar"
            }
        ]
    }
    ...
}
```

change the location of the test log
default is `./logs/test.log`  
You can change the location with either a config or env variable.  
ENV: `LOG_LOCATION=./foo/bar/biz.log`
config: 
```json
"logging": {
    "testLog": "./foo/bar/biz.log"
}
```