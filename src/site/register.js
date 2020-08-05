const newAccountRoute = require('./newAccounts.js')

module.exports = fastify => {
    newAccountRoute(fastify)

    fastify.post('/login', async (request, reply) => {
        console.log(request.body)

        return true
    })
}
