import redis from 'redis'

const { promisify } = require('util')
const client = redis.createClient({})
const hgetAsync = promisify(client.hget).bind(client)
const hsetAsync = promisify(client.hset).bind(client)
const hgetallAsync = promisify(client.hgetall).bind(client)
const flushAsync = promisify(client.flushall).bind(client)

export { hgetAsync, hgetallAsync, hsetAsync, flushAsync }
