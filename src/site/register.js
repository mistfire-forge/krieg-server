const registerNewAccountRoute = require('./newAccounts.js')
const registerLoginRoute = require('./login.js')

module.exports = fastify => {
    registerNewAccountRoute(fastify)
    registerLoginRoute(fastify)
}
