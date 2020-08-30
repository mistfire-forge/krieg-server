const { client, q } = require('../DBConnector.js')

const schema = {
    body: {
        type: 'object',
        required: ['gameName'],
        properties: {
            gameName: { type: 'string' },
        },
    },
}

module.exports = fastify => {
    fastify.post(
        '/create-new-game',
        {
            schema,
            preValidation: [fastify.authenticate],
        },
        async request => {
            console.log(request.user) // TODO
            const body = request.body

            let response
            try {
                const playerRef = q.Ref(q.Collection('users'), request.user.id)
                response = await client.query(
                    q.Create(q.Collection('games'), {
                        data: {
                            name: body.gameName,
                            host: playerRef,
                            complete: false,
                            players: [playerRef],
                        },
                    })
                )
            } catch (err) {
                return {
                    success: false,
                    error: {
                        message: 'Could not create game',
                        details: err,
                    },
                }
            }

            // TODO Add game to host's ongoing games list

            return {
                success: true,
                content: {
                    gameId: response.ref.id,
                },
            }
        }
    )
}
