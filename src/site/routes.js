const newAccountsRoute = require('./newAccounts.js')
const loginRoute = require('./login.js')

module.exports = fastify => {
    newAccountsRoute(fastify)
    loginRoute(fastify)
}
