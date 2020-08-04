import { FastifyInstance } from 'fastify'

export const registerSiteHandlers = (fastify: FastifyInstance): void => {
    fastify.get('/', async (request, reply) => {
        return 'Hi from server'
    })

    fastify.post('/login', async (request, reply) => {
        console.log(request.body)

        return true
    })
}
