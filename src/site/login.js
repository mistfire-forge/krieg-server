const argon2 = require('argon2')
const { getUser } = require('../DBConnector.js')
const generateAndSetTokens = require('./setTokens.js')

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

const badVerifyMessage = {
    complete: false,
    message: 'Could not verify username',
}

module.exports = fastify => {
    fastify.post('/login', { schema }, async (request, reply) => {
        const { username, password } = request.body

        // TODO: Verify password
        let user
        try {
            user = await getUser(username)
        } catch (err) {
            return badVerifyMessage
        }

        try {
            if (!(await argon2.verify(user.data.passwordHash, password))) {
                return badVerifyMessage
            }
        } catch (err) {
            console.error('Internal Argon2 error', err)
            return badVerifyMessage
        }

        // TODO: Check for token blacklist

        // TODO: Log IP

        return generateAndSetTokens(fastify, reply, username)
    })

    fastify.get('/refresh', (request, reply) => {
        const decoded = fastify.jwt.verify(request.cookies.refresh)

        // TODO: Check for token blacklist
        return generateAndSetTokens(fastify, reply, decoded.username)
    })
}
