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
        // TODO Verify and Return JWT
    })
}
