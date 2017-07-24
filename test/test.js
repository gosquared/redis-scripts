let createScripts = require('../')
let Redis = require('redis');
let redis = Redis.createClient();
let redisScripts = createScripts(redis);
let expect = require('chai').expect;
let promisify = require('util').promisify;

describe('hmsetex', () => {
  function runhmsetex() {
    // hmsetex
    let { hmsetex } = redisScripts;
    let key = 'key';
    let fields = { some_field: 'test', another_field: 'foo' };
    return hmsetex(key, fields);
  }

  before(cb => redis.del('key', cb));
  after(cb => redis.del('key', cb));

  it('should not set key if key does not exist', async () => {
    let result = await runhmsetex();
    expect(result).to.be.null;
    let exists = promisify(redis.exists).bind(redis);
    result = await exists('key');
    expect(result).to.equal(0);
  })

  it('should set if key exists', async () => {
    let fields = { test: 1 };
    let hmset = promisify(redis.hmset).bind(redis);
    let result = await hmset('key', fields);
    expect(result).to.be.ok;
    result = await runhmsetex();
    expect(result).to.be.ok;
    let hgetall = promisify(redis.hgetall).bind(redis);
    result = await hgetall('key');
    expect(result).to.deep.equal({ some_field: 'test', another_field: 'foo', test: "1" });
  })
});

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
