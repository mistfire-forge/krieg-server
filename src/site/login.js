const argon2 = require('argon2')
const { getUserByEmail } = require('../DBConnector.js')
const generateAndSetTokens = require('./setTokens.js')

const schema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string' },
            password: { type: 'string' },
        },
    },
}

const badVerifyMessage = {
    success: false,
    error: {
        message: 'Could not verify username',
    },
}

module.exports = fastify => {
    fastify.post('/login', { schema }, async (request, reply) => {
        const { email, password } = request.body

        // TODO: Verify password
        let user
        try {
            user = await getUserByEmail(email)
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

        return {
            success: true,
            content: {
                accessToken: generateAndSetTokens(fastify, reply, email),
            },
        }
    })

    fastify.get('/refresh', (request, reply) => {
        const decoded = fastify.jwt.verify(request.cookies.refresh)

        // TODO: Check for token blacklist
        return {
            success: true,
            content: {
                accessToken: generateAndSetTokens(
                    fastify,
                    reply,
                    decoded.username
                ),
            },
        }
    })
}
