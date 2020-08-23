const keys = require('./keys')
const redis = require('redis')
const redisConfig = {
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000,
}

console.log(redisConfig)
const redisClient = redis.createClient(redisConfig)

const sub = redisClient.duplicate()
sub.on('message', (err, values) => {
  console.log(values)
})

function fib(index) {
  console.log('fibbing')
  if (index < 2) return 1
  return fib(index - 1) + fib(index - 2)
}

sub.on('error', error => {
  console.error(error)
})

sub.on('message', (channel, message) => {
  console.log("Subscriber received message in channel '" + channel + "': " + message)
  redisClient.hset('values', message, fib(parseInt(message)))
})

sub.subscribe('insert')
