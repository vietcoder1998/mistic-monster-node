import redis from 'redis'

const { promisify } = require('util')
const client = redis.createClient()
const hgetAsync = promisify(client.hget).bind(client)
const hsetAsync = promisify(client.hset).bind(client)
const hgetallAsync = promisify(client.hgetall).bind(client)
const flushAsync = promisify(client.flushall).bind(client)
const hlenAsync = promisify(client.hlen).bind(client)
const lpushAsync = promisify(client.lpush).bind(client)
const hmsetAsync = promisify(client.hmset).bind(client)
const delAsync = promisify(client.del).bind(client)
const lrange = promisify(client.del).bind(client)

export {
    hgetAsync,
    hgetallAsync,
    hsetAsync,
    flushAsync,
    hlenAsync,
    lpushAsync,
    hmsetAsync,
    delAsync,
    lrange,
}
