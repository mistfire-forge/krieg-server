const newAccountsRoute = require('./newAccounts.js')
const loginRoute = require('./login.js')
const startNewGame = require('./startNewGame.js')

module.exports = fastify => {
    newAccountsRoute(fastify)
    loginRoute(fastify)
    startNewGame(fastify)
}
