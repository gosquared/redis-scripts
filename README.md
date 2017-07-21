# redis-scripts
GoSquared is customer analytics and chat platform. We've worked with Redis a lot and have developed scripts for it along the way.

    npm install --save redis @gosquared/redis-scripts

```javascript
let createScripts = require('@gosquared/redis-scripts')
let redis = require('redis');
let redisScripts = createScripts(redis);

// hmsetx
let { hmsetx } = redisScripts;
let key = 'your-key';
let fields = { some_field: 'test', another_field: 'foo' };
hmsetx(key, fields).then(handleResult).catch(handleError); 
```
