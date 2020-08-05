const newAccountRoute = require('./newAccounts.js')

module.exports = fastify => {
    fastify.get('/', async (request, reply) => {
        return 'Hi from server'
    })

    newAccountRoute(fastify)

    fastify.post('/login', async (request, reply) => {
        console.log(request.body)

        return true
    })
}
