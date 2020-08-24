const argon2 = require('argon2')
const { client, q } = require('../DBConnector.js')
const generateAndSetTokens = require('./setTokens.js')

// const displayNameSchema = {
//     body: {
//         type: 'object',
//         required: ['displayName'],
//         properties: {
//             displayName: { type: 'string' },
//         },
//     },
// }
const registerSchema = {
    body: {
        type: 'object',
        required: ['displayName', 'email', 'password1', 'password2'],
        properties: {
            displayName: { type: 'string' },
            email: { type: 'string' },
            password1: { type: 'string' },
            password2: { type: 'string' },
        },
    },
}

module.exports = fastify => {
    fastify.post('/register', { schema: registerSchema }, (req, reply) => {
        return registerNewAccount(fastify, req, reply)
    })
}

const registerNewAccount = async (server, request, reply) => {
    const { displayName, email, password1, password2 } = request.body

    // TODO: Check against display name and password restrictions

    // First check password match
    if (!!password1.localeCompare(password2)) {
        return {
            success: false,
            error: {
                message: 'Passwords do not match',
            },
        }
    }

    const hash = await argon2.hash(password1)

    let userId
    try {
        const result = await client.query(
            q.Create(q.Collection('users'), {
                data: {
                    displayName,
                    email,
                    passwordHash: hash,
                },
            })
        )

        userId = result.ref.id
    } catch (err) {
        reply.code(500)
        return {
            success: false,
            error: {
                message: 'Could not create user',
                details: err,
            },
        }
    }

    return {
        success: true,
        content: {
            accessToken: generateAndSetTokens(server, reply, userId),
        },
    }
}
