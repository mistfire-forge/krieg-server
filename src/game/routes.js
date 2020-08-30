const GameManager = require('./manager.js')

module.exports = fastify => {
    GameManager(fastify)
}
