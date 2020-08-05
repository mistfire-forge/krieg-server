const newAccountRoute = require('./newAccounts.js')

module.exports = fastify => {
    newAccountRoute(fastify)
}
