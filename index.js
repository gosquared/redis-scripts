const _ = require('lodash');
let Scripty = require('node-redis-scripty');

const hmsetex = `
  local key = KEYS[1]
  local args = ARGV
  local call = redis.call

  if call("EXISTS", key) == 0 then
    return nil
  end

  return call("HMSET", key, unpack(args))
`;

module.exports = function(redis) {
  let scripty = new Scripty(redis);

  function hmsetex(key, fields) {
    return new Promise((resolve, reject) => {
      scripty.loadScript('hmsetex', hmsetex, (err, script) => {
        if (err) return reject(err);

        // Make sure any null values are set to '' for redis
        Object.keys(fields).forEach(k => {
          if (fields[k] === null) fields[k] = '';
        });

        let args = _.flatten(_.toPairs(fields));
        let numKeys = 1;
        script.run(numKeys, key, ...args, (err, result) => err ? reject(err) : resolve(result));
      });
    });
  }

  return { hmsetex };
};
