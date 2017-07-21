# redis-scripts
[GoSquared](https://gosquared.com/) is customer analytics and chat platform. We've worked with Redis in real time systems and have developed scripts for it along the way.

    npm install --save redis @gosquared/redis-scripts

```javascript
let createScripts = require('@gosquared/redis-scripts')
let redis = require('redis');
let redisScripts = createScripts(redis);

// hmsetex
let { hmsetex } = redisScripts;
let key = 'your-key';
let fields = { some_field: 'test', another_field: 'foo' };
hmsetex(key, fields).then(handleResult).catch(handleError); 
```
