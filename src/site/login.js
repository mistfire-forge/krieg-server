const schema = {
    body: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
            username: { type: 'string' },
            password: { type: 'string' },
        },
    },
}

module.exports = fastify => {
    fastify.post('/login', { schema }, (request, reply) => {
        const { username } = request.body

        const token = fastify.jwt.sign(
            { username },
            {
                expiresIn: '2',
            }
        )

        reply.setCookie('refresh', token, {
            // domain: 'https://dev.mistfireforge.com',
            path: '/refresh',
            httpOnly: true,
        })

        return { token }
    })

    fastify.get('/refresh', (request, reply) => {
        console.log(request.ip)
        const decoded = fastify.jwt.verify(request.cookies.refresh)
        console.log(decoded)

        return true
    })
}
